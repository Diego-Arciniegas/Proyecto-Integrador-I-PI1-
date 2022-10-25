const models = require('../../models/models.js');
const {Op} = require('sequelize');
const lit = require('sequelize').literal;

const addOrder = async (req, res)=>{
    try{
        
        var shopping_cart = await models.Shopping_carts.findOne({
            where: {
                id_user: req.params.id_user
            },
            include: {
                model: models.Accessories,
                through: {attributes: ['quantity']}
            }
        });

        if(shopping_cart===null){
            return res.json({error: 1, message: "No hay carrito de compra"});
        }

        req.body.id_user = req.params.id_user;
        var order = await models.Orders.create(req.body);

        var total_quantity = 0;
        var price = 0;
        var total_price = 0;

        for(let i=0;i<shopping_cart.accessories.length;i++){
            var {quantity} = shopping_cart.accessories[i].shopping_cart_accessories;
            var {id_accessory} = shopping_cart.accessories[i];
            
            var accessory = await models.Accessories.findOne({where: {id_accessory}});
            accessory_price = (accessory.price - (accessory.price*accessory.discount/100))*parseInt(quantity);
            price += accessory_price;
            total_quantity += quantity;

            if(accessory.stock - parseInt(quantity)<0){
                await models.Order_accessories.destroy({
                    where: {id_order: order.id_order}
                });
                await order.destroy();
                return res.status(200).json({error: 0, message: `No hay stock para el accesorio [${accessory.id_accessory}]:'${accessory.name_accessory}', stock ${accessory.stock}.`});
            }
            await accessory.update({
                stock: (accessory.stock - parseInt(quantity))
            });

            await models.Order_accessories.create({
                id_order: order.id_order,
                id_accessory: shopping_cart.accessories[i].id_accessory,
                quantity: quantity
            });
        }

        var discount = price * (order.discount/100);
        var tax = order.tax/100 + 1;
        total_price = (price - discount) * tax + 4500;

        await order.update({price, total_price, quantity: total_quantity});

        await models.Shopping_cart_accessories.destroy({
            where: {
                id_shopping_cart: shopping_cart.id_shopping_cart
            }
        });

        await shopping_cart.destroy();
        res.status(200).json({error: 0, order});

    }catch(err){
        res.status(400).json({error: err.message});
    }
}

const getOrder = async (req, res)=>{
    try{

        if(req.query.order!==undefined){
            var order = req.query.order.split(',');
            var sql_order = `orders.${order[0]} ${order[1] || "ASC"}`;
        }

        if(req.query.like!==undefined){
            var like = req.query.like.split(',');
            var sql_where = `orders.${like[0]} LIKE '%${like[1]}%'`
        }

        if(req.params.id_user===undefined){
            var orders = await models.Orders.findAll({
                include: [{
                    model: models.Accessories,
                    through: {
                        attributes: ['quantity']
                    }
                }, {
                    model: models.Payment_methods
                },{
                    model: models.Users
                }],
                where: {
                    [Op.and]: lit(sql_where)
                },
                order: lit(sql_order || "orders.id_order")
            });
        }else{
            var orders = await models.Orders.findAll({
                include: [{
                    model: models.Accessories,
                    through: {
                        attributes: ['quantity']
                    }
                }, {
                    model: models.Payment_methods
                },{
                    model: models.Users
                }],
                where: {
                    id_user: req.params.id_user,
                    [Op.and]: lit(sql_where)
                },
                order: lit(sql_order || "orders.id_order")
            });
        }

        res.status(200).json(orders);

    }catch(err){
        res.status(400).json({error: err.message});
    }
}

const getOneOrder = async (req, res)=>{
    try{
        var order = await models.Orders.findOne({
            include: [{
                model: models.Accessories
            }, {
                model: models.Payment_methods
            }, {
                model: models.Users
            }],
            where: {
                id_order: req.params.id_order
            }
        });
        if(order==null) res.status(404).json({error: 1, message: "Factura no encontrada"});
        else res.status(200).json(order);
    }catch(err){
        res.status(400).json({error: err.message});
    }
}

const deleteOrder = async (req, res)=>{
    try{
        await models.Order_accessories.destroy({
            where: {
                id_order: req.params.id_order
            }
        });
        await models.Orders.destroy({
            where: {
                id_order: req.params.id_order
            }
        });
        res.status(200).json({error: 0});
    }catch(err){
        res.status(400).json({error: err.message});
    }
}

const deleteOrderFromUser = async (req, res)=>{
    try{
        var order = await models.Orders.findOne({
            where: {
                id_user: req.params.id_user,
                id_order: req.params.id_order
            }
        });
        if(order===null){
            return res.status(404).json({error: 0, message: `Factura n°${req.params.id_order} del usuario ${req.params.id_user} no encontrada`});
        }
        await models.Order_accessories.destroy({
            where: {
                id_order: req.params.id_order
            }
        });
        await order.destroy({
            where: {
                id_order: req.params.id_order
            }
        });
        res.status(200).json({error: 0});
    }catch(err){
        res.status(200).json({error: err.message});
    }
}

module.exports = {
    addOrder,
    getOrder,
    getOneOrder,
    deleteOrder,
    deleteOrderFromUser
}




