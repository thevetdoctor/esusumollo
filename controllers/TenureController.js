const {Sequelize, Op} = require("sequelize");
const Tenures = require('../models').tenure;
const { response } = require('oba-http-response');
const missingInput = require('../helpers/missingInput');
const { ErrorClone } = require('../helpers/error');

exports.createTenure = async(req, res, next) => {
    let { name, groupId } = req.body;
    try {
        const required = ['name', 'groupId'];
        missingInput(required, req.body);

        let tenure = await Tenures.findOne({ where: {
            name,
            groupId
        }, raw: true});
        
        if(tenure) throw new ErrorClone(404, 'Tenure already exist');
        const newTenure = await Tenures.create({name, groupId});

        response(res, 201, { tenure: newTenure }, null, 'Tenure created successfully');
    } catch(e) {
        next(e);
    }
}

exports.getTenure = async(req, res, next) => {
    const {tenureId} = req.params;
    try {
        const required = ['tenureId'];
        missingInput(required, req.params);

        let tenure = await Tenures.findByPk(tenureId);
        if(!tenure) throw new ErrorClone(404, 'Tenure not found');
        
        response(res, 200, tenure, null, 'Tenure details');
    } catch(e) {
       next(e);
    }
}

