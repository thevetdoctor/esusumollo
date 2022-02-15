const {Sequelize, Op} = require("sequelize");
const Members = require('../models').member;
const { response } = require('oba-http-response');


exports.addMember = async(req, res) => {
    let { userId, name, groupId } = req.body;
    try {
        if(!(userId && name && groupId)) return response(res, 400, null, 'Please supply missing input(s)');

        let member = await Members.findOne({ where: {
            userId,
            groupId
        }, raw: true});
        
        if(member) return response(res, 400, null, 'Member already exist');
        const newMember = await Members.create({userId, name, groupId});

        response(res, 201, { member: newMember }, null, 'Member added successfully');
    } catch(e) {
        response(res, 500, null, e.message, 'Error in adding a member');
    }
}

exports.getMembers = async(req, res) => {
    const {groupId} = req.params;
    try {
        if(!groupId) return response(res, 400, null, 'Please supply missing input(s)');

        let groupMembers = await Members.findAll({where: {groupId}});
        
        response(res, 200, groupMembers, null, 'List of group members');
    } catch(e) {
        response(res, 500, null, e.message, 'Error in getting group members');
    }
}

