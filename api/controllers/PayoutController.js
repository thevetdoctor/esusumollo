const {Sequelize, Op} = require("sequelize");
const Payouts = require('../models').payout;
const { response } = require('oba-http-response');


exports.makePayout = async(req, res) => {
    let { userId, tenureId, amount, cycle } = req.body;
    try {
        if(!(userId && tenureId && amount && cycle)) return response(res, 400, null, 'Please supply missing input(s)');

        let payout = await Payouts.findOne({ where: {
            userId,
            tenureId,
            cycle,
            amount
        }, raw: true});
        
        if(payout) return response(res, 400, null, 'Payout already made');
        const newPayout = await Payouts.create({userId, tenureId, amount, cycle});

        response(res, 201, { payout: newPayout }, null, 'Payout made successfully');
    } catch(e) {
        response(res, 500, null, e.message, 'Error in making payout');
    }
}

exports.getPayout = async(req, res) => {
    const {payoutId} = req.params;
    try {
        if(!payoutId) return response(res, 400, null, 'Please supply missing input(s)');

        let payout = await Payouts.findByPk(payoutId);
        if(!payout) return response(res, 400, null, 'Payout not found');
        
        response(res, 200, payout, null, 'Payout details');
    } catch(e) {
        response(res, 500, null, e.message, 'Error in getting payout details');
    }
}

