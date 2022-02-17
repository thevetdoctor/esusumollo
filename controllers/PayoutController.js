const {Sequelize, Op} = require("sequelize");
const Payouts = require('../models').payout;
const { response } = require('oba-http-response');
const missingInput = require('../helpers/missingInput');
const { ErrorClone } = require('../helpers/error');

exports.makePayout = async(req, res, next) => {
    let { userId, tenureId, amount, cycle } = req.body;
    try {
        const required = ['userId', 'tenureId', 'amount', 'cycle'];
        missingInput(required, req.body);

        let payout = await Payouts.findOne({ where: {
            userId,
            tenureId,
            cycle,
            amount
        }, raw: true});
        
        if(payout) throw new ErrorClone(404, 'Payout already made');
        const newPayout = await Payouts.create({userId, tenureId, amount, cycle});

        response(res, 201, { payout: newPayout }, null, 'Payout made successfully');
    } catch(e) {
        next(e);
    }
}

exports.getPayout = async(req, res, next) => {
    const {payoutId} = req.params;
    try {
        const required = ['payoutId'];
        missingInput(required, req.params);

        let payout = await Payouts.findByPk(payoutId);
        if(!payout) throw new ErrorClone(404, 'Payout not found');
        
        response(res, 200, payout, null, 'Payout details');
    } catch(e) {
        next(e);
    }
}

