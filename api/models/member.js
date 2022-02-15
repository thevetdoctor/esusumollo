'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  member.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: new DataTypes.UUIDV4(),
      unique: true,
      primaryKey: true
    },    
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    groupId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'member',
  });
  return member;
};