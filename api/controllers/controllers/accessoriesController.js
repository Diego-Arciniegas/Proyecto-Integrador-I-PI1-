const models = require('../../models/models.js');
const {Op} = require('sequelize');
const lit = require('sequelize').literal;

// Crear un accessorio
const addAccessories = async (req, res)=>{
    try{

        var accessory = await models.Accessories.create(req.body);

        res.json(accessory);

    }catch(err){
        res.json({error: err.message});
    }
}

// Obtener un accessorio
const getOneAccessory = async (req, res)=>{
    try{

        var accessory = await models.Accessories.findOne({
            where: {
                id_accessory: req.params.id_accessory
            }
        });

        res.json(accessory);

    }catch(err){
        res.json({error: err.message});
    }
}

// Obtener todos los accessorios
const getAccessories = async (req, res)=>{
    try{

        if(req.query.order!==undefined){
            var order = req.query.order.split(',');
            var sql_order = `accessories.${order[0]} ${order[1] || "ASC"}`;
        }

        if(req.query.like!==undefined){
            var like = req.query.like.split(',');
            var sql_where = `accessories.${like[0]} LIKE '%${like[1]}%'`
        }

        var accessories = await models.Accessories.findAll({
            where: {
                [Op.and]: lit(sql_where)
            }, raw: true, nest: true,
            order: lit(sql_order || "accessories.id_accessory")
        });

        if(req.query.id_user!==undefined){
            for(let i=0;i<accessories.length;i++){
                accessories[i].favorite = await models.Favorite_accessories.findOne({
                    where: {
                        id_user: req.query.id_user,
                        id_accessory: accessories[i].id_accessory
                    }, attributes: ['id_user']
                });
            }
        }

        res.json(accessories);

    }catch(err){
        res.json({error: err.message});
    }
}

// Obtener todos los accessorios de una empresa
const getBussinessAccessories = async (req, res)=>{
    try{

        if(req.query.order!==undefined){
            var order = req.query.order.split(',');
            var sql_order = `accessories.${order[0]} ${order[1] || "ASC"}`;
        }

        if(req.query.like!==undefined){
            var like = req.query.like.split(',');
            var sql_where = `accessories.${like[0]} LIKE '%${like[1]}%'`
        }

        var accessories = await models.Accessories.findAll({
            where: {
                id_business: req.params.id_business,
                [Op.and]: lit(sql_where)
            }, raw: true, nest: true,
            order: lit(sql_order || "accessories.id_accessory")
        });

        if(req.query.id_user!==undefined){
            for(let i=0;i<accessories.length;i++){
                accessories[i].favorite = await models.Favorite_accessories.findOne({
                    where: {
                        id_user: req.query.id_user,
                        id_accessory: accessories[i].id_accessory
                    }, attributes: ['id_user']
                });
            }
        }

        res.json(accessories);

    }catch(err){
        res.json({error: err.message});
    }
}

// Editar un accessorio
const editAccessory = async (req, res)=>{
    try{

        await models.Accessories.update(req.body, {
            where: {
                id_accessory: req.params.id_accessory
            }
        });

        var accessory = await models.Accessories.findOne({
            where: {
                id_accessory: req.params.id_accessory
            }
        });

        res.json(accessory);

    }catch(err){
        res.json({error: err.message});
    }
}

// Eliminar un accessorio
const deleteAccessory = async (req, res)=>{
    try{

        await models.Accessories.destroy({
            where: {
                id_accessory: req.params.id_accessory
            }
        });

        res.json({message: 'deleted'});

    }catch(err){
        res.json({error: err.message});
    }
}

const test = async(req, res)=>{
    try{

        var data = await models.Favorite_accessories.findOne({
            where: {
                id_user: 3,
                id_accessory: 5
            }, attributes: ['id_user']
        });

        res.json(data);

    }catch(err){
        res.json({error: err.message});
    }
}

module.exports = {
    addAccessories,
    getOneAccessory,
    getAccessories,
    getBussinessAccessories,
    editAccessory,
    deleteAccessory,
    test
}




