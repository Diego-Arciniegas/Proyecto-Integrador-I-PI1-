const models = require('../../models/models.js');
const {Op, where} = require('sequelize');
const sequelize = require('../../database/database.js');
const lit = require('sequelize').literal;

const eso = require('./productos.json');

// Crear un accessorio
const addAccessories = async (req, res)=>{
    try{
        var accessory = await models.Accessories.create(req.body);
        res.status(200).json(accessory);
    }catch(err){
        res.status(400).json({error: err.message});
    }
}

// Obtener un accessorio
const getOneAccessory = async (req, res)=>{
    try{
        var accessory = await models.Accessories.findByPk(req.params.id_accessory);
        if(accessory) res.status(200).json(accessory);
        else res.status(404).json({error: `The accessory ${req.params.id_accessory}' doenst not exists.`});
    }catch(err){
        res.status(400).json({error: err.message});
    }
}

// Obtener todos los accessorios
const getAccessories = async (req, res)=>{
    try{
        if(req.query.order!=undefined){
            var order = req.query.order.split(',');
            var sql_order = `'${order[0]} ${order[1] || "ASC"}'`;
        }
        if(req.query.like!=undefined){
            var like = req.query.like.split(',');
            var sql_where = `'${like[0]} LIKE "%${like[1]}%"'`
        }

        var accessories = 
            await sequelize.query(`CALL get_acessories(${req.query.id_user || null}, ${sql_order || null}, ${sql_where || null});`);
        res.status(200).json(accessories);
    }catch(err){
        res.status(400).json({error: err.message});
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
        res.status(200).json(accessories);
    }catch(err){
        res.status(400).json({error: err.message});
    }
}

// Editar un accessorio
const editAccessory = async (req, res)=>{
    try{
        if(req.body.price){
            var accessory = await models.Accessories.findByPk(req.params.id_accessory);
            if(accessory.price!=req.body.price){
                await models.Accessories_price_history.create({
                    id_accessory: req.params.id_accessory,
                    old_price: accessory.price,
                    new_price: req.body.price,
                    modified_date: new Date(),
                    id_responsible_user: req.body.id_user
                });
            }
        }else if(req.body.stock){
            var accesory = await models.Accessories.findByPk(req.params.id_accessory);
            if(parseInt(req.body.stock)>accesory.stock){
                var type = 1;
            }else if(parseInt(req.body.stock)<accesory.stock){
                var type = 4;
            }
            if(type){
                if(type==1){
                    var since = "Fabrica";
                    var towards = "Bodega";
                }else{
                    var since = "Bodega";
                    var towards = "Fabrica";
                }

                let quantity = req.body.stock-accesory.stock;
                await models.Accessories_movement_history.create({
                    id_accessory: req.params.id_accessory,
                    quantity,
                    value: quantity*(accesory.price*(100-accesory.discount)/100),
                    date_movement: new Date(),
                    id_responsible_user: req.body.id_user,
                    id_movement_type: type,
                    since, towards
                });
            }
        }

        await models.Accessories.update(req.body, {
            where: {
                id_accessory: req.params.id_accessory
            }
        });
        res.status(200).json({error: 0});
    }catch(err){
        res.status(400).json({error: err.message});
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
        res.status(200).json({error: 0});
    }catch(err){
        res.status(400).json({error: err.message});
    }
}

const getAccessoriesPriceHistory = async (req, res)=>{
    try{
        if(req.query.order!=undefined){
            var order = req.query.order.split(',');
            var sql_order = `Accessories_price_history.${order[0]} ${order[1] || "ASC"}`;
        }

        if(req.query.like!==undefined){
            var like = req.query.like.split(',');
            var sql_where = `${like[0]} LIKE '%${like[1]}%'`
        }

        var history = await models.Accessories_price_history.findAll({
            include:[{
                model: models.Users
            },{
                model: models.Accessories
            }],
            where: {
                [Op.and]: lit(sql_where)
            },
            order: lit(sql_order || "Accessories_price_history.id_accessories_price_history")
        });

        res.status(200).json({error: 0, history});

    }catch(error){
        res.status(400).json({error: error.message});
    }
}

const getAccessoriesMovementHistory = async (req, res)=>{
    try{
        if(req.query.order!=undefined){
            var order = req.query.order.split(',');
            var sql_order = `Accessories_movement_history.${order[0]} ${order[1] || "ASC"}`;
        }
        if(req.query.like!==undefined){
            var like = req.query.like.split(',');
            var sql_where = `${like[0]} LIKE '%${like[1]}%'`
        }
        
        var history = await models.Accessories_movement_history.findAll({
            include:[
                {
                    model: models.Accessories
                },{
                    model: models.Users
                }
            ],
            where: {
                [Op.and]: lit(sql_where)
            },
            order: lit(sql_order || "Accessories_movement_history.id_accessory_movement_history")
        });

        res.status(200).json({error: 0, history});

    }catch(error){
        res.status(400).json({error: error.message});
    }
}

const savexd = async (req, res)=>{
    try{
        for(let i=0;i<eso.length;i++){
            await models.Accessories.create({
                id_accessory: eso[i].ID,
                name_accessory: eso[i].Nombre,
                description: eso[i].Descripcion,
                price: eso[i].Precio,
                stock: eso[i].Stock,
                available: 1,
                image_accesory_path: eso[i].ID,
                discount: 0
            });
        }
        res.json({a:"a"});
    }catch(error){
        res.json({a:error.message});
    }
}


module.exports = {
    addAccessories,
    getOneAccessory,
    getAccessories,
    getBussinessAccessories,
    editAccessory,
    deleteAccessory,
    getAccessoriesPriceHistory,
    getAccessoriesMovementHistory,
    savexd
}




