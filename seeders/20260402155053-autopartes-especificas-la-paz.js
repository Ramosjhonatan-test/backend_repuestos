'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Obtener una categoría y un proveedor existentes
    const categorias = await queryInterface.sequelize.query(`SELECT id FROM "categorias" LIMIT 1`);
    const proveedores = await queryInterface.sequelize.query(`SELECT id FROM "proveedores" LIMIT 1`);
    
    if (categorias[0].length === 0 || proveedores[0].length === 0) return;

    const catId = categorias[0][0].id;
    const provId = proveedores[0][0].id;

    await queryInterface.bulkInsert('productos', [
      {
        id: uuidv4(),
        categoria_id: catId,
        proveedor_id: provId,
        sku: 'FIL-KL-001',
        nombre: 'Filtro de Aire Alto Flujo - Minibus',
        descripcion: 'Filtro de aire optimizado para motores King Long, ideal para la altura de La Paz.',
        precio: 85.00,
        stock: 50,
        marca_vehiculo: 'King Long',
        modelo_vehiculo: 'Minibus',
        url_imagen: 'https://images.unsplash.com/photo-1599256631131-72728f14aa9d?q=80&w=300&auto=format&fit=crop',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        categoria_id: catId,
        proveedor_id: provId,
        sku: 'BOB-KY-002',
        nombre: 'Bobina de Encendido Reforzada',
        descripcion: 'Bobina de encendido Keyton original. Mayor chispa para mejor combustión.',
        precio: 250.00,
        stock: 20,
        marca_vehiculo: 'Keyton',
        modelo_vehiculo: 'Minibus',
        url_imagen: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?q=80&w=300&auto=format&fit=crop',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        categoria_id: catId,
        proveedor_id: provId,
        sku: 'EMP-KY-003',
        nombre: 'Empaque de Culata Laminado',
        descripcion: 'Empaque para Keyton M70 / Minibus. Resistente a altas temperaturas.',
        precio: 120.00,
        stock: 15,
        marca_vehiculo: 'Keyton',
        modelo_vehiculo: 'Minibus',
        url_imagen: 'https://images.unsplash.com/photo-1597404294360-feeeda04612e?q=80&w=300&auto=format&fit=crop',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        categoria_id: catId,
        proveedor_id: provId,
        sku: 'ROD-TY-004',
        nombre: 'Rodamiento de Rueda Delantera',
        descripcion: 'Rodamiento sellado para Toyota Caldina / Probox. Durabilidad extrema.',
        precio: 145.00,
        stock: 30,
        marca_vehiculo: 'Toyota',
        modelo_vehiculo: 'Caldina',
        url_imagen: 'https://images.unsplash.com/photo-1594731815121-e374d6438090?q=80&w=300&auto=format&fit=crop',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: uuidv4(),
        categoria_id: catId,
        proveedor_id: provId,
        sku: 'FIL-TY-005',
        nombre: 'Filtro de Aceite Premium',
        descripcion: 'Filtro original para motores Toyota serie E/G (Caldina, Corolla).',
        precio: 45.00,
        stock: 100,
        marca_vehiculo: 'Toyota',
        modelo_vehiculo: 'Caldina',
        url_imagen: 'https://images.unsplash.com/photo-1634815460515-38fc71801be9?q=80&w=300&auto=format&fit=crop',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('productos', {
      sku: { [Sequelize.Op.in]: ['FIL-KL-001', 'BOB-KY-002', 'EMP-KY-003', 'ROD-TY-004', 'FIL-TY-005'] }
    });
  }
};
