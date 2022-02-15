'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('groups', {
      id: {
        type: Sequelize.UUID,
        defaultValue: new Sequelize.UUIDV4(),
        unique: true,
        primaryKey: true
      },    
      userId: {
        type: Sequelize.UUID,
        allowNull: false
      },   
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },   
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },   
      maximumCapacity: {
        type: Sequelize.INTEGER,
        defaultValue: 10
      },   
      status: {
        type: Sequelize.STRING,
        defaultValue: "public"
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
    await queryInterface.dropTable('groups');
  }
};