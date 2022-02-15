const {Sequelize, Op} = require("sequelize");
const Groups = require('../models').group;
const Members = require('../models').member;
const Users = require('../models').user;
const { response } = require('oba-http-response');
const { getMembers } = require("./MemberController");


exports.createGroup = async(req, res) => {
    let { userId, name, description } = req.body;
    try {
        if(!(userId && name && description)) return response(res, 400, null, 'Please supply missing input(s)');

        let group = await Groups.findOne({ where: {
            name
        }, raw: true});
        
        if(group) return response(res, 400, null, 'Group already exist');
        const newGroup = await Groups.create({userId, name, description});

        response(res, 201, { group: newGroup }, null, 'Group created successfully');
    } catch(e) {
        console.log(e);
        response(res, 500, null, e.message, 'Error in creating group');
    }
}

exports.getAllGroups = async(req, res) => {
    try {
        let groups = await Groups.findAll({
            where: {
                status: 'public'
            },
            include: [
                {model: Members, as: 'groupmembers'}
            ]
        });
        
        response(res, 200, groups, null, 'List of groups');
    } catch(e) {
        response(res, 500, null, e.message, 'Error in getting groups');
    }
}

exports.getGroupsByUserId = async(req, res) => {
    const {userId} = req.params;
    try {
        if(!userId) return response(res, 400, null, 'Please supply missing input(s)');

        // let groups = await Groups.findAll({
        //     where: {
        //         userId
        //     },
        //     include: [
        //         {model: Users, as: 'members', through: Members
        //     }
        //     ]
        // });
        
        let groups = await Groups.findAll({
            include: [
                {model: Members, as: 'groupmembers',
                where: {
                    userId
                }
            }
            ]
        });
        
        response(res, 200, groups, null, 'List of user\'s groups');
    } catch(e) {
        response(res, 500, null, e.message, 'Error in getting groups for user');
    }
}

exports.updateGroupStatus = async(req, res) => {
    const {groupId} = req.params;
    try {
        if(!groupId) return response(res, 400, null, 'Please supply missing input(s)');

        let group = await Groups.findOne({
            where: {
                id: groupId
            },
            include: [
                {model: Members, as: 'groupmembers'}
            ]
        });
        if(!group) return response(res, 400, null, 'Group not found');
        if(group.status == 'private') {
            await Groups.update({status: 'public'}, {where: {id: groupId}});
        } else {
            await Groups.update({status: 'private'}, {where: {id: groupId}});
        }
        response(res, 200, group, null, 'Group status updated successfully');
    } catch(e) {
        response(res, 500, null, e.message, 'Error in updating group status');
    }
}

exports.activateGroup = async(req, res) => {
    const {groupId} = req.params;
    try {
        if(!groupId) return response(res, 400, null, 'Please supply missing input(s)');

        let group = await Groups.findOne({
            where: {
                id: groupId
            },
            include: [
                {model: Members, as: 'groupmembers'}
            ]
        });
        if(!group) return response(res, 400, null, 'Group not found');
        if(group.isDeleted) {
            await Groups.update({isDeleted: false}, {where: {id: groupId}});
        } else {
            await Groups.update({isDeleted: true}, {where: {id: groupId}});
        }
        response(res, 200, group, null, `Group ${group.isDeleted ? 'deactivated' : 'activated'} successfully`);
    } catch(e) {
        response(res, 500, null, e.message, `Error in ${group.isDeleted ? 'deactivating' : 'activating'} group`);
    }
}
