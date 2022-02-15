const {Sequelize, Op} = require("sequelize");
const Tenures = require('../models').tenure;
const { response } = require('oba-http-response');


exports.createTenure = async(req, res) => {
    let { name, groupId } = req.body;
    try {
        if(!(name && groupId)) return response(res, 400, null, 'Please supply missing input(s)');

        let tenure = await Tenures.findOne({ where: {
            name,
            groupId
        }, raw: true});
        
        if(tenure) return response(res, 400, null, 'Tenure already exist');
        const newTenure = await Tenures.create({name, groupId});

        response(res, 201, { tenure: newTenure }, null, 'Tenure created successfully');
    } catch(e) {
        response(res, 500, null, e.message, 'Error in creating tenure');
    }
}

exports.getTenure = async(req, res) => {
    const {tenureId} = req.params;
    try {
        if(!tenureId) return response(res, 400, null, 'Please supply missing input(s)');

        let tenure = await Tenures.findByPk(tenureId);
        if(!tenure) return response(res, 400, null, 'Tenure not found');
        
        response(res, 200, tenure, null, 'Tenure details');
    } catch(e) {
        response(res, 500, null, e.message, 'Error in getting tenure details');
    }
}

