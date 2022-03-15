/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.js`)[env];
const db = {};
// console.log(config.host, process.env.NODE_ENV, config);
const { ErrorClone } = require('../helpers/error');

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

try {
  sequelize.authenticate()
    .then(() => {
      console.log('Connection to database establised');
    })
    .catch((err) => {
      console.error('Unable to connect to database:', err.message);
      throw new ErrorClone(404, 'Server connection error');
    });
} catch (e) {
  throw new ErrorClone(404, 'DB connection error');
}

// sequelize.sync({ alter: true }).then(() => {
//   console.log("DB refreshed");
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user.hasMany(db.group, {
  foreignKey: 'userId',
});

db.group.belongsTo(db.user, {
  foreignKey: 'userId',
  constraints: false,
});

db.user.belongsToMany(db.group, {
  through: db.member,
  as: 'members',
  foreignKey: 'userId',
});

db.group.belongsToMany(db.user, {
  through: db.member,
  as: 'members',
  foreignKey: 'userId',
});

db.group.hasMany(db.member, {
  as: 'groupmembers',
  foreignKey: 'groupId',
});

db.member.belongsTo(db.group, {
  as: 'groupmembers',
  foreignKey: 'groupId',
});

db.user.hasMany(db.member, {
  as: 'usermembers',
  foreignKey: 'userId',
});

db.member.belongsTo(db.user, {
  as: 'usermembers',
  foreignKey: 'userId',
});

db.group.hasMany(db.tenure, {
  foreignKey: 'groupId',
});

db.tenure.belongsTo(db.group, {
  foreignKey: 'groupId',
});

db.tenure.hasMany(db.contribution, {
  foreignKey: 'tenureId',
});

db.contribution.belongsTo(db.tenure, {
  foreignKey: 'tenureId',
});

db.tenure.hasMany(db.payout, {
  foreignKey: 'tenureId',
});

db.payout.belongsTo(db.tenure, {
  foreignKey: 'tenureId',
});

module.exports = db;
