'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('productos', 'marca_vehiculo', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'Universal'
    });
    await queryInterface.addColumn('productos', 'modelo_vehiculo', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'Todos'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('productos', 'marca_vehiculo');
    await queryInterface.removeColumn('productos', 'modelo_vehiculo');
  }
};
