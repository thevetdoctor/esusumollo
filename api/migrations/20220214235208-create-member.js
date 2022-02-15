'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('members', {
      id: {
        type: Sequelize.UUID,
        defaultValue: new Sequelize.UUIDV4(),
        unique: true,
        primaryKey: true
      },   
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      groupId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "active"
      },   
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('members');
  }
};