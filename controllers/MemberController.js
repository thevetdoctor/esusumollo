const {Sequelize, Op} = require("sequelize");
const jwt = require('jsonwebtoken');
const Groups = require('../models').group;
const Members = require('../models').member;
const UniqueIds = require('../models').uniqueid;
const { response } = require('oba-http-response');


exports.addMember = async(req, res) => {
    let { userId, groupId } = req.body;
    try {
        if(!(userId && groupId)) return response(res, 400, null, 'Please supply missing input(s)');

        let member = await Members.findOne({ where: {
            userId,
            groupId
        }, raw: true});
        
        if(member) return response(res, 400, null, 'Member already exist');
        const newMember = await Members.create({userId, groupId});

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

exports.generateUniqueIDToAddMember = async(req, res) => {
    let { groupId } = req.body;
    try {
        if(!groupId) return response(res, 400, null, 'Please supply missing input(s)');
        
        const group = await Groups.findByPk(groupId);
        
        if(!group) return response(res, 400, null, 'Group not found');

        // expiry time could be added to the uniqueID
        const uniqueID = jwt.sign({groupId}, process.env.JWT_SECRET);

        await UniqueIds.create({groupId, text: uniqueID});

        response(res, 201, { uniqueID }, null, 'UniqueID generated');
    } catch(e) {
        response(res, 500, null, e.message, 'Error in generating uniqueID');
    }
}

exports.addMemberByUniqueId = async(req, res) => {
    let { userId } = req.body;
    let { uniqueId } = req.params;
    try {
        if(!uniqueId) return response(res, 400, null, 'UniqueID not supplied');
        const uniqueIdExist = await UniqueIds.findOne({
            where: {
                text: uniqueId
            }
        });
        if(!uniqueIdExist) return response(res, 400, null, 'UniqueID not found in record');
        
        jwt.verify(uniqueId, process.env.JWT_SECRET, async(error, data) => {
            if(error) {
                console.log(error.message)
                return response(res, 400, null, 'ID verification Failed');
            }
            if(data) {
                const groupId = data.groupId;
                const group = await Groups.findByPk(groupId);
                if(!group) return response(res, 400, null, 'Group not found');

                let member = await Members.findOne({ where: {
                    userId,
                    groupId
                }, raw: true});
                
                if(member) return response(res, 400, null, 'Member already exist');
                const newMember = await Members.create({userId, groupId});
        
                response(res, 201, { member: newMember }, null, 'Member added successfully');
            }
        });

    } catch(e) {
        response(res, 500, null, e.message, 'Error in generating uniqueID');
    }
}
