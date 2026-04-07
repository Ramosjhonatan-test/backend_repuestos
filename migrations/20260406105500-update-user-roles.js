'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Para PostgreSQL, necesitamos añadir el valor al tipo enum existente.
    // El nombre por defecto que crea Sequelize es enum_usuarios_rol
    try {
      await queryInterface.sequelize.query('ALTER TYPE "enum_usuarios_rol" ADD VALUE \'cliente\'');
    } catch (e) {
      // Si ya existe (ej: re-ejecución), ignoramos el error
      console.log('El valor "cliente" ya existe en enum_usuarios_rol o no se pudo aplicar.');
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Eliminar un valor de un ENUM en Postgres es difícil y requiere recrear el tipo.
    // Normalmente no se deshacen este tipo de cambios.
  }
};
