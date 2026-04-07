'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const usuarioId = uuidv4();
    const categoriaId = uuidv4();
    const clienteId = uuidv4();
    const proveedorId = uuidv4();

    await queryInterface.bulkInsert('usuarios', [{
      id: usuarioId,
      nombre: 'Administrador',
      email: 'admin@repuestos.com',
      password: '$2b$10$qbespAxCxtgjRAidILxDz.jtqPrENLYQc9uynGe1tDRlZsbybijWm', // admin123
      rol: 'admin',
      activo: true,
      created_at: new Date(),
      updated_at: new Date()
    }]);

    await queryInterface.bulkInsert('categorias', [{
      id: categoriaId,
      nombre: 'Motor',
      descripcion: 'Repuestos para el motor del vehículo',
      activo: true,
      created_at: new Date(),
      updated_at: new Date()
    }]);

    await queryInterface.bulkInsert('clientes', [{
      id: clienteId,
      documento_identidad: '1234567890',
      nombre: 'Consumidor Final',
      email: 'cliente@gmail.com',
      telefono: '0999999999',
      direccion: 'Ciudad, Pais',
      activo: true,
      created_at: new Date(),
      updated_at: new Date()
    }]);

    await queryInterface.bulkInsert('proveedores', [{
      id: proveedorId,
      nombre: 'Distribuidora Bosch',
      nombre_contacto: 'Juan Pérez',
      email: 'ventas@bosch.com',
      telefono: '022222222',
      activo: true,
      created_at: new Date(),
      updated_at: new Date()
    }]);

    await queryInterface.bulkInsert('productos', [{
      id: uuidv4(),
      categoria_id: categoriaId,
      proveedor_id: proveedorId,
      sku: 'BOSCH-001',
      nombre: 'Bujía Iridium',
      descripcion: 'Bujía de alto rendimiento',
      precio: 12.50,
      stock: 100,
      stock_minimo: 10,
      url_imagen: 'https://images.unsplash.com/photo-1590528732152-0b36e1c6403d?auto=format&fit=crop&q=80&w=300',
      activo: true,
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('productos', null, {});
    await queryInterface.bulkDelete('proveedores', null, {});
    await queryInterface.bulkDelete('clientes', null, {});
    await queryInterface.bulkDelete('categorias', null, {});
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
