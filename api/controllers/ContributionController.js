const {Sequelize, Op} = require("sequelize");
const Contributions = require('../models').contribution;
const { response } = require('oba-http-response');


exports.makeContribution = async(req, res) => {
    let { userId, tenureId, amount, cycle } = req.body;
    try {
        if(!(userId && tenureId && amount && cycle)) return response(res, 400, null, 'Please supply missing input(s)');

        let contribution = await Contributions.findOne({ where: {
            userId,
            tenureId,
            cycle
        }, raw: true});
        
        if(contribution) return response(res, 400, null, 'Contribution already made');
        const newContribution = await Contributions.create({userId, tenureId, amount, cycle});

        response(res, 201, { contribution: newContribution }, null, 'Contribution made successfully');
    } catch(e) {
        response(res, 500, null, e.message, 'Error in making contribution');
    }
}

exports.getContribution = async(req, res) => {
    const {contributionId} = req.params;
    try {
        if(!contributionId) return response(res, 400, null, 'Please supply missing input(s)');

        let contribution = await Contributions.findByPk(contributionId);
        if(!contribution) return response(res, 400, null, 'Contribution not found');
        
        response(res, 200, contribution, null, 'Contribution details');
    } catch(e) {
        response(res, 500, null, e.message, 'Error in getting contribution details');
    }
}

