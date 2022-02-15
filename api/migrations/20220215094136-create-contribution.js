'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('contributions', {
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
      tenureId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      cycle: {
        type: Sequelize.INTEGER,
        allowNull: false
      },   
      amount: {
        type: Sequelize.FLOAT,
        defaultValue: 0.00
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
    await queryInterface.dropTable('contributions');
  }
};