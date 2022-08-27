// const { Sequelize, Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const { response } = require('oba-http-response');
const Groups = require('../models').group;
const Members = require('../models').member;
const Users = require('../models').user;
const UniqueIds = require('../models').uniqueid;
const missingInput = require('../helpers/missingInput');
const { ErrorClone } = require('../helpers/error');

exports.addMember = async (req, res, next) => {
  const { newUserId, groupId } = req.body;
  try {
    const required = ['newUserId', 'groupId'];
    missingInput(required, req.body);

    const member = await Members.findOne({
      where: {
        userId: newUserId,
        groupId,
      },
      raw: true,
    });

    if (member) throw new ErrorClone(404, 'Member already exist');
    const newMember = await Members.create({ userId: newUserId, groupId });

    response(res, 201, { member: newMember }, null, 'Member added successfully');
  } catch (e) {
    next(e);
  }
};

exports.getMembers = async (req, res, next) => {
  const { groupId } = req.params;
  try {
    const required = ['groupId'];
    missingInput(required, req.params);

    const groupMembers = await Members.findAll({
      where: { groupId },
      attributes: ['id', 'userId', 'status'],
      include: [
        {
          model: Users,
          as: 'usermembers',
          attributes: ['id', 'username', 'email', 'imageUrl', 'bio', 'location', 'mobile', 'dob'],
        },
      ],
    });

    response(res, 200, groupMembers, null, 'List of group members');
  } catch (e) {
    next(e);
  }
};

exports.generateUniqueIDToAddMember = async (req, res, next) => {
  const { groupId } = req.body;
  try {
    const required = ['groupId'];
    missingInput(required, req.body);

    const group = await Groups.findByPk(groupId);

    if (!group) throw new ErrorClone(404, 'Group not found');

    // expiry time could be added to the uniqueID
    const uniqueID = jwt.sign({ groupId }, process.env.JWT_SECRET);

    await UniqueIds.create({ groupId, text: uniqueID });

    response(res, 201, { uniqueID }, null, 'UniqueID generated');
  } catch (e) {
    next(e);
  }
};

exports.addMemberByUniqueId = async (req, res, next) => {
  const { userId } = req.body;
  const { uniqueId } = req.params;
  try {
    const required = ['userId', 'uniqueId'];
    missingInput(required, { ...req.params, ...req.body });

    const uniqueIdExist = await UniqueIds.findOne({
      where: {
        text: uniqueId,
      },
    });
    if (!uniqueIdExist) throw new ErrorClone(404, 'UniqueID not found in record');

    jwt.verify(uniqueId, process.env.JWT_SECRET, async (error, data) => {
      try {
        if (error) {
          throw new ErrorClone(403, 'ID verification Failed');
        }
        if (data) {
          const { groupId } = data;
          const group = await Groups.findByPk(groupId);
          if (!group) throw new ErrorClone(404, 'Group not found');

          const member = await Members.findOne({
            where: {
              userId,
              groupId,
            },
            raw: true,
          });

          if (member) {
            throw new ErrorClone(404, 'Member already exist');
          }
          const newMember = await Members.create({ userId, groupId });

          response(res, 201, { member: newMember }, null, 'Member added successfully');
        }
      } catch (err) {
        next(err);
      }
    });
  } catch (e) {
    next(e);
  }
};
