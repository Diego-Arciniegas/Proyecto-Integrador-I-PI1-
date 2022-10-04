const models = require('../../models/models.js');
const bc = require('bcrypt');
const vali = require('validator').default;
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");
const lit = require('sequelize').literal;
const nm = require('nodemailer');

const login = async (req, res)=>{
    try{

        var user = await models.Users.findOne({
            where: {
                email: req.body.email 
            }
        });

        if(user===null){
            return res.status(401).json({error: 1, message: 'Correo o contraseña no validos'});
        }
        
        var math = await bc.compare(req.body.password, user.password);

        if(math){
            var expired = new Date();
            expired.setTime(expired.getTime() + 1000*60*60*24);

            var token = jwt.sign({
                id_user: user.id_user,
                expired: expired
            }, process.env.SECRET, {
                expiresIn: '24h'
            });

            res.status(200).json({error: 0, user, token});
        }else{
            res.status(401).json({error: 1, message: 'Usuario o contraseña no validos'});
        }

    }catch(err){
        res.status(400).json({error: err.message});
    }
}

const register = async (req, res)=>{
    try{

        var user_db = await models.Users.findOne({
            where: {
                email: req.body.email
            }
        });

        if(user_db!==null){
            return res.status(401).json({error: 1, message: 'Correo ya registrado'});
        }

        var user_db = await models.Users.findOne({
            where: {
                identification: req.body.identification
            }
        });

        if(user_db!==null){
            return res.status(401).json({error: 2, message: 'Numero de identificación ya registrado'});
        }

        req.body.password = await bc.hash(req.body.password, 10);

        var user = await models.Users.create(req.body);
        var expired = new Date();
        expired.setTime(expired.getTime() + 1000*60*60*24);

        var token = jwt.sign({
            id_user: user.id_user,
            expired: expired
        }, process.env.SECRET, {
            expiresIn: '24h'
        });

        res.status(200).json({error: 0, user, token});

    }catch(err){
        res.status(401).json({error: err.message});
    }
}

const auth = async (req, res)=>{
    try{

        if(req.get('Authorization').split(' ')[0].toLowerCase()!=='bearer'){
            throw "invalid token"
        }

        var token = req.get('Authorization').split(' ')[1];
        
        var decoded = jwt.verify(token, process.env.SECRET);

        res.status(200).json({decoded});

    }catch(err){
        res.status(400).json({error: err.message});
    }
}

const restorePassword = async (req, res)=>{
    try{
        let mailTransporter = nm.createTransport({
            service: 'gmail',
            auth: {
                user: 'accesorios.upb.2022@gmail.com',
                pass: process.env.PASSWORDGMAIL
            }
        });
        
        var token = jwt.sign({
            id_user: req.query.id_user
        }, process.env.SECRET);
        
        
        let mailDetails = {
            from: 'accesorios.upb.2022@gmail.com',
            to: req.query.to,
            subject: 'Restore password',
            text: 'Ingresa al siguiente enlace para continuar con el proceso '+
                  `de restaurar la contraseña: https://www.accessorios.upb.com/resetpassword?token=${token}\n`+
                  '\n\nSi no deseas cambiar la la contraseña has casi omiso a este mensaje'
        };
        
        mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) throw err;
            else res.status(200).json({error: 0, data: data});
        });
        
    }catch(err){
        res.status(400).json({error: err.message});
    }
}

const editUser = async (req, res)=>{
    try{

        await models.Users.update(req.body, {
            where: {
                id_user: req.params.id_user
            }
        });
        res.status(200).json({error: 0});

    }catch(err){
        res.status(400).json({error: err.message});
    }
}

const getUser = async (req, res)=>{
    try{

        if(req.query.order!==undefined){
            var order = req.query.order.split(',');
            var sql_order = `users.${order[0]} ${order[1] || "ASC"}`;
        }

        if(req.query.like!==undefined){
            var like = req.query.like.split(',');
            var sql_where = `users.${like[0]} LIKE '%${like[1]}%'`
        }

        if(req.params.id_user===undefined){
            var users = await models.Users.findAll({
                attributes: {exclude: ['password']},
                where: {
                    [Op.and]: lit(sql_where)
                },
                order: lit(sql_order || "users.id_user")
            });
        }else{
            var user = await models.Users.findOne({
                attributes: {exclude: ['password']},
                where: {
                    id_user: req.params.id_user,
                    [Op.and]: lit(sql_where)
                },
                order: lit(sql_order || "users.id_user")
            });
        }

        res.status(200).json(users || user);

    }catch(err){
        res.status(400).json({error: err.message});
    }
}

module.exports = {
    login,
    register,
    auth,
    getUser,
    restorePassword,
    editUser
}
