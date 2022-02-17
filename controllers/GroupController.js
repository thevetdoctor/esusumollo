const {Sequelize, Op} = require("sequelize");
const Groups = require('../models').group;
const Members = require('../models').member;
const Users = require('../models').user;
const { response } = require('oba-http-response');
const missingInput = require('../helpers/missingInput');
const { ErrorClone } = require('../helpers/error');

exports.createGroup = async(req, res, next) => {
    const { userId, name, description } = req.body;
    try {
        const required = ['userId', 'name', 'description'];
        missingInput(required, req.body);

        let group = await Groups.findOne({ where: {
            name
        }, raw: true});
        
        if(group) throw new ErrorClone(404, 'Group already exist');
        const newGroup = await Groups.create({userId, name, description});

        response(res, 201, { group: newGroup }, null, 'Group created successfully');
    } catch(e) {
        next(e);
    }
}

exports.getAllGroups = async(req, res, next) => {
    try {
        let groups = await Groups.findAll({
            where: {
                status: 'public',
                isDeleted: false
            },
            include: [
                {model: Members, as: 'groupmembers'}
            ]
        });
        
        response(res, 200, groups, null, 'List of groups');
    } catch(e) {
       next(e);
    }
}

exports.getGroupsByUserId = async(req, res, next) => {
    const {userId} = req.params;
    try {
        const required = ['userId'];
        missingInput(required, req.params);

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
                    where: {isDeleted: false},
                    include: [
                                {
                                    model: Members, as: 'groupmembers',
                                    where: {
                                        userId
                                    },
                                    attributes: ['id', 'userId', 'status'],
                                    include: [
                                            {
                                                model: Users, 
                                                as: 'usermembers',
                                                attributes: ['id', 'username', 'email', 'imageUrl', 'bio', 'location', 'mobile', 'dob']
                                            }
                                        ]
                                }
                        ]
        });
        
        response(res, 200, groups, null, 'List of user\'s groups');
    } catch(e) {
        next(e);
    }
}

exports.updateGroupStatus = async(req, res, next) => {
    const {groupId} = req.params;
    try {
        const required = ['groupId'];
        missingInput(required, req.params);

        let group = await Groups.findOne({
            where: {
                id: groupId,
                isDeleted: false
            },
            include: [
                {model: Members, as: 'groupmembers'}
            ]
        });
        if(!group) throw new ErrorClone(404, 'Group not found');
        if(group.status == 'private') {
            await group.update({status: 'public'});
        } else {
            await group.update({status: 'private'});
        }
        response(res, 200, group, null, 'Group status updated successfully');
    } catch(e) {
        next(e);
    }
}

exports.activateGroup = async(req, res, next) => {
    const {groupId} = req.params;
    try {
        const required = ['groupId'];
        missingInput(required, req.params);

        let group = await Groups.findOne({
            where: {
                id: groupId
            },
            include: [
                {model: Members, as: 'groupmembers'}
            ]
        });
        if(!group) throw new ErrorClone(404, 'Group not found');
        if(group.isDeleted) {
            await group.update({isDeleted: false});
        } else {
            await group.update({isDeleted: true});
        }
        response(res, 200, group, null, `Group ${group.isDeleted ? 'deactivated' : 'activated'} successfully`);
    } catch(e) {
        next(e);
    }
}
