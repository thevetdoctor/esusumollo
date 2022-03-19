// const { Sequelize, Op } = require('sequelize');
const { response } = require('oba-http-response');
const Tenures = require('../models').tenure;
const missingInput = require('../helpers/missingInput');
const { ErrorClone } = require('../helpers/error');

exports.createTenure = async (req, res, next) => {
  const { name, userId, groupId } = req.body;
  try {
    const required = ['name', 'groupId'];
    missingInput(required, req.body);

    const tenure = await Tenures.findOne({
      where: {
        name,
        userId,
        groupId,
      },
      raw: true,
    });

    if (tenure) throw new ErrorClone(404, 'Tenure already exist');
    const newTenure = await Tenures.create({ name, userId, groupId });

    response(res, 201, { tenure: newTenure }, null, 'Tenure created successfully');
  } catch (e) {
    next(e);
  }
};

exports.getTenure = async (req, res, next) => {
  const { tenureId } = req.params;
  try {
    const required = ['tenureId'];
    missingInput(required, req.params);

    const tenure = await Tenures.findByPk(tenureId);
    if (!tenure) throw new ErrorClone(404, 'Tenure not found');

    response(res, 200, tenure, null, 'Tenure details');
  } catch (e) {
    next(e);
  }
};
