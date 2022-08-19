const models = require('../../models/models.js');

const addBusiness = async (req, res)=>{
    try{

        var business = await models.Business.create(req.body);

        res.json(business);

    }catch(err){
        res.json({error: err.message});
    }
}

const getBusiness = async (req, res)=>{
    try{

        if(req.params.id_business===undefined){
            var business = await models.Business.findAll();
        }else{
            var business = await models.Business.findAll({
                where: {
                    id_business: req.params.id_business
                }
            });
        }

        res.json(business);

    }catch(err){
        res.json({error: err.message});
    }
}

const editBusiness = async (req, res)=>{
    try{

        var business = await models.Business.update(req.body, {
            where: {
                id_business: req.params.id_business
            }
        });

        res.json(business);

    }catch(err){
        res.json({error: err.message});
    }
}

const deleteBusiness = async (req, res)=>{
    try{

        await models.Business.destroy({
            where: {
                id_business: req.params.id_business
            }
        });

        res.json(business);

    }catch(err){
        res.json({error: err.message});
    }
}

module.exports = {
    addBusiness,
    getBusiness,
    editBusiness,
    deleteBusiness
}
