'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Añadir qr_pago_url a la tabla usuarios
    await queryInterface.addColumn('usuarios', 'qr_pago_url', {
      type: Sequelize.STRING,
      allowNull: true,
    });

    // 2. Añadir 'qr' al ENUM metodo_pago de la tabla facturas
    // Como es PostgreSQL, los ENUMs se crean como tipos personalizados
    // Sequelize crea el tipo enum_facturas_metodo_pago automáticamente
    await queryInterface.sequelize.query("ALTER TYPE enum_facturas_metodo_pago ADD VALUE 'qr';").catch(err => {
      // Si el valor ya existe por una sincronización previa de Sequelize, ignorar el error
      console.log('El valor "qr" ya podría existir en el ENUM:', err.message);
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Eliminar columna qr_pago_url de usuarios
    await queryInterface.removeColumn('usuarios', 'qr_pago_url');
    
    // Nota: PostgreSQL no permite eliminar fácilmente valores de un ENUM.
    // Usualmente se deja el valor o se tiene que recrear el tipo.
  }
};
