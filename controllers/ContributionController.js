const {Sequelize, Op} = require("sequelize");
const Contributions = require('../models').contribution;
const { response } = require('oba-http-response');
const missingInput = require('../helpers/missingInput');
const { ErrorClone } = require('../helpers/error');

exports.makeContribution = async(req, res, next) => {
    let { userId, tenureId, amount, cycle } = req.body;
    try {
        const required = ['userId', 'tenureId', 'amount', 'cycle'];
        missingInput(required, req.body);

        let contribution = await Contributions.findOne({ where: {
            userId,
            tenureId,
            cycle
        }, raw: true});
        
        if(contribution) throw new ErrorClone(404, 'Contribution already made');
        const newContribution = await Contributions.create({userId, tenureId, amount, cycle});

        response(res, 201, { contribution: newContribution }, null, 'Contribution made successfully');
    } catch(e) {
        next(e);
    }
}

exports.getContribution = async(req, res, next) => {
    const {contributionId} = req.params;
    try {
        const required = ['contributionId'];
        missingInput(required, req.params);

        let contribution = await Contributions.findByPk(contributionId);
        if(!contribution) throw new ErrorClone(404, 'Contribution not found');
        
        response(res, 200, contribution, null, 'Contribution details');
    } catch(e) {
        next(e);
    }
}

