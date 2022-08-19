const models = require('../../models/models.js');

const addFavorites = async (req, res)=>{
    try{

        var fav_acc = await models.Favorite_accessories.findOne({
            where: {
                id_user: req.params.id_user,
                id_accessory: req.params.id_accessory
            }
        });

        if(fav_acc!==null){
            return res.json({error: 0, message: 'accessorio ya añadido'});
        }

        var favorite = await models.Favorite_accessories.create({
            id_user: req.params.id_user,
            id_accessory: req.params.id_accessory
        });

        res.json({error: 1, favorite});
    }catch(err){
        res.json({error: err.message});
    }
}

const deleteFavorites = async (req, res)=>{
    try{

        await models.Favorite_accessories.destroy({
            where: {
                id_user: req.params.id_user,
                id_accessory: req.params.id_accessory
            }
        });

        res.json({donde: 'done'});

    }catch(err){
        res.json({error: err.message});
    }
}

const getFavorites = async (req, res)=>{
    try{

        var accessories = await models.Accessories.findAll({
            include: {
                model: models.Favorite_accessories,
                attributes: [],
                where: {
                    id_user: req.params.id_user
                }
            }
        });

        res.json(accessories);

    }catch(err){
        res.json({error: err.message});
    }
}

module.exports = {
    addFavorites,
    deleteFavorites,
    getFavorites
}

