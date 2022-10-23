const models = require('../../models/models.js');


// Crear un carrito de compra
const addShoppingCart = async (req, res)=>{
    try{

        var shopping_cart = await models.Shopping_carts.findOne({
            where: {
                id_user: req.params.id_user
            }
        });

        if(shopping_cart!==null){
            return res.json({error: 1, message: 'carrito de compra ya creado'});
        }

        var shopping_cart = await models.Shopping_carts.create({
            id_user: req.params.id_user
        });

        res.status(200).json({error: 0, shopping_cart});

    }catch(err){
        res.status(400).json({error: err.message});
    }
}

// Obtener el carrito de compra con todos sus accessorios
const getShoppingCart = async (req, res)=>{
    try{

        var shopping_cart = await models.Shopping_carts.findOne({
            where: {
                id_user: req.params.id_user
            }
        });

        if(shopping_cart===null){
            return res.json({error: 0, message: `El usuario ${req.params.id_user} no tiene un carrito de compras creado`});
        }

        var accessories = await models.Accessories.findAll({
            include: {
                model: models.Shopping_carts,
                where: {
                    id_shopping_cart: shopping_cart.id_shopping_cart
                }
            }, raw: true, nest: true
        });

        var total_price = 0;

        for(let i=0;i<accessories.length;i++){
            var {price, discount} = accessories[i];
            var {quantity} = accessories[i].shopping_carts.shopping_cart_accessories;
            var accesories_price = (price - (price*discount/100)) * quantity;
            
            total_price += accesories_price;
            delete accessories[i].shopping_carts;
            accessories[i].quantity = quantity;
            accessories[i].total_price = accesories_price;
        }

        res.status(200).json({error: 1, shopping_cart, accessories, price: total_price});

    }catch(err){
        res.status(400).json({error: err.message});
    }
}

const getShoppingCartAccesories = async (req, res)=>{
    try{

        var accessories = await models.Accessories.findAll({
            include: {
                model: models.Shopping_carts,
                where: {
                    id_user: req.params.id_user
                }
            }
        });

        res.status(200).json({error: 0, accessories});

    }catch(err){
        res.status(400).json({error: err.message});
    }
}

const getOneShoppingCartAccesory = async (req, res)=>{
    try{

        var accesory = await models.Accessories.findOne({
            include: {
                model: models.Shopping_carts,
                where: {
                    id_user: req.params.id_user
                }
            },raw: true, nest: true,
            where: {
                id_accessory: req.params.id_accessory
            }
        });

        if(accesory===null) return res.status(200).json({error: 200, accesory});
        accesory.quantity = accesory.shopping_carts.shopping_cart_accessories.quantity;
        delete accesory.shopping_carts;

        res.status(200).json({error: 0, accesory});

    }catch(err){
        res.status(400).json({error: err.message});
    }
}

// Eliminar el carrito de compra
const deleteShoppingCart = async (req, res)=>{
    try{
        var sc = await models.Shopping_carts.findOne({
            where: {
                id_user: req.params.id_user
            }
        });

        await models.Shopping_cart_accessories.destroy({
            where: {id_shopping_cart: sc.id_shopping_cart}
        });

        await models.Shopping_carts.destroy({
            where: {id_shopping_cart: sc.id_shopping_cart}
        });

        
        res.status(200).json({message: 'deleted'});

    }catch(err){
        res.status(400).json({error: err.message});
    }
}

// Añadir un tipo de accessorio al carrito de compra
const addAccessory = async (req, res)=>{
    try{
        var quantity = (req.query.quantity) ? parseInt(req.query.quantity) : 1;

        var shopping_cart = await models.Shopping_carts.findOne({
            where: {
                id_user: req.params.id_user
            }
        });

        if(shopping_cart===null){
            return res.json({error: 0, message: `El usuario ${req.params.id_user} no tiene un carrito de compras creado`});
        }

        var accessory = await models.Shopping_cart_accessories.findOne({
            where: {
                id_shopping_cart: shopping_cart.id_shopping_cart,
                id_accessory: req.params.id_accessory
            }
        });

        if(accessory===null){
            await models.Shopping_cart_accessories.create({
                id_shopping_cart: shopping_cart.id_shopping_cart,
                id_accessory: req.params.id_accessory,
                quantity: quantity
            });
        }else{
            await accessory.update({
                quantity: accessory.quantity + quantity
            });
        }

        res.status(200).json(shopping_cart);

    }catch(err){
        res.status(400).json({error: err.message});
    }
}

// Eliminar un accessorio del carrito de compra
const deleteAccesory = async (req, res)=>{
    try{

        var shopping_cart = await models.Shopping_carts.findOne({
            where: {
                id_user: req.params.id_user
            }
        });
        
        if(shopping_cart===null){
            return res.json({error: 0, message: `El usuario ${req.params.id_user} no tiene un carrito de compras creado`});
        }

        await models.Shopping_cart_accessories.destroy({
            where: {
                id_shopping_cart: shopping_cart.id_shopping_cart,
                id_accessory: req.params.id_accessory
            }
        }); 

        res.status(200).json({done: 'done'});
    }catch(err){
        res.status(400).json({error: err.message});
    }
}

module.exports = {
    addShoppingCart,
    getShoppingCart,
    getOneShoppingCartAccesory,
    getShoppingCartAccesories,
    deleteShoppingCart,
    addAccessory,
    deleteAccesory
}




