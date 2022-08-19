const models = require('../../models/models.js');

const addAddress = async (req, res)=>{
    try{
        
        if(req.params.id_user!==undefined){
            var address_db = await models.Address.findOne({
                include: {
                    model: models.Users,
                    where: {
                        id_user: req.params.id_user
                    }
                }
            });
            if(address_db!==null){
                return res.json({
                    error: 0, 
                    message: `Direccion ya agregada para el usuario ${req.params.id_user}, id_address: ${address_db.id_address}`
                }); 
            }
            var address = await models.Address.create(req.body);
            await models.Users.update({
                id_address: address.id_address
            }, {
                where: {
                    id_user: req.params.id_user
                }
            });
            
        }else if(req.params.id_business!==undefined){
            var address_db = await models.Address.findOne({
                include: {
                    model: models.Business,
                    where: {
                        id_user: req.params.id_user
                    }
                }
            });
            if(address_db!==null){
                return res.json({
                    error: 0, 
                    message: `Direccion ya agregada para la empresa ${req.params.id_business}, id_address: ${address_db.id_address}`
                });
            }
            var address = await models.Address.create(req.body);
            await models.Business.update({
                id_address: address.id_address
            }, {
                where: {
                    id_business: req.params.id_business
                }
            });
        }else{
            return res.json({error: 1, message: 'No se selecciono un usuario o empresa'});
        }


        res.json({error: 2, address});
    }catch(err){
        res.json({error: err.message});
    }
}

const getAddress = async (req, res)=>{
    try{

        if(req.params.id_user!==undefined){
            var address = await models.Address.findOne({
                include: {
                    model: models.Users,
                    where: {
                        id_user: req.params.id_user
                    }, attributes: []
                }
            });
        }else if(req.params.id_business!==undefined){
            var address = await models.Address.findOne({
                include: {
                    model: models.Business,
                    where: {
                        id_user: req.params.id_business
                    }, attributes: []
                }
            });
        }else{
            var address = await models.Address.findAll();
        }

        res.json(address);

    }catch(err){
        res.json({error: err.message});
    }
}

const editAddress = async (req, res)=>{
    try{
        if(req.params.id_user!==undefined){
            var address = await models.Address.findOne({
                include: {
                    model: models.Users,
                    where: {
                        id_user: req.params.id_user
                    },attributes: []
                }
            });
        }else if(req.params.id_business!==undefined){
            var address = await models.Address.findOne({
                include: {
                    model: models.Business,
                    where: {
                        id_user: req.params.id_business
                    },attributes: []
                }
            });
        }else{
            res.json({error: 0, message: 'Usuario o empresa no seleccionada'});
        }
        await address.update(req.body);

        res.json(address);

    }catch(err){
        res.json({error: err.message});
    }
}

const deleteAddress = async (req, res)=>{
    try{

        if(req.params.id_user!==undefined){
            var user = await models.Users.findOne({
                where: {
                    id_user: req.params.id_user
                }
            });
            var id_address = user.id_address;
            await user.update({id_address: null});
            await models.Address.destroy({where: {id_address}});
        }else if(req.params.id_business!==undefined){
            var business = await models.Business.findOne({
                where: {
                    id_business: req.params.id_business
                }
            });
            var id_address = business.id_address;
            await business.update({id_address: null});
            await models.Address.destroy({where: {id_address}});
        }else{
            return res.json({error: 0, message: 'Usuario o empresa no seleccionada'});
        }

        res.json({donde: 'done'});

    }catch(err){
        res.json({error: err.message});
    }
}

module.exports = {
    addAddress,
    getAddress,
    editAddress,
    deleteAddress
}
