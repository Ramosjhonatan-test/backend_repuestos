'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Obtener Categoría Motor/Frenos/Suspensión (o crear si no existen)
    const categorias = await queryInterface.sequelize.query(`SELECT id, nombre FROM "categorias"`);
    const proveedores = await queryInterface.sequelize.query(`SELECT id FROM "proveedores" LIMIT 1`);
    
    if (categorias[0].length === 0 || proveedores[0].length === 0) return;

    const catMotor = categorias[0].find(c => c.nombre === 'Motor')?.id || categorias[0][0].id;
    const catFrenos = categorias[0].find(c => c.nombre === 'Frenos')?.id || categorias[0][0].id;
    const provId = proveedores[0][0].id;

    await queryInterface.bulkInsert('productos', [
      // FOTON
      {
        id: uuidv4(),
        categoria_id: catMotor,
        proveedor_id: provId,
        sku: 'FIL-FT-101',
        nombre: 'Filtro de Aceite Metálico - View',
        descripcion: 'Filtro de alta resistencia para Foton View / Tunland.',
        precio: 65.00,
        stock: 40,
        marca_vehiculo: 'Foton',
        modelo_vehiculo: 'View',
        url_imagen: 'https://images.unsplash.com/photo-1634815460515-38fc71801be9?q=80&w=300&auto=format&fit=crop',
        created_at: new Date(),
        updated_at: new Date()
      },
      // SUZUKI CARRY
      {
        id: uuidv4(),
        categoria_id: catFrenos,
        proveedor_id: provId,
        sku: 'PAS-SZ-201',
        nombre: 'Pastillas de Freno Semi-Metálicas',
        descripcion: 'Pastillas de freno para Suzuki Carry / Super Carry. Excelente frenado en bajadas.',
        precio: 180.00,
        stock: 25,
        marca_vehiculo: 'Suzuki',
        modelo_vehiculo: 'Carry',
        url_imagen: 'https://images.unsplash.com/photo-1594731815121-e374d6438090?q=80&w=300&auto=format&fit=crop',
        created_at: new Date(),
        updated_at: new Date()
      },
      // TOYOTA PROBOX
      {
        id: uuidv4(),
        categoria_id: catMotor,
        proveedor_id: provId,
        sku: 'BUJ-TY-301',
        nombre: 'Bujía Denso Iridium Power',
        descripcion: 'Bujía de alto rendimiento para Toyota Probox / Caldina. Mejora el arranque en frío.',
        precio: 110.00,
        stock: 60,
        marca_vehiculo: 'Toyota',
        modelo_vehiculo: 'Probox',
        url_imagen: 'https://images.unsplash.com/photo-1590528732152-0b36e1c6403d?auto=format&fit=crop&q=80&w=300',
        created_at: new Date(),
        updated_at: new Date()
      },
      // NISSAN AD
      {
        id: uuidv4(),
        categoria_id: catMotor,
        proveedor_id: provId,
        sku: 'FIL-NS-401',
        nombre: 'Filtro de Aire - Nissan AD / Sunny',
        descripcion: 'Filtro de aire original para Nissan AD Van. Protege el motor del polvo urbano.',
        precio: 55.00,
        stock: 80,
        marca_vehiculo: 'Nissan',
        modelo_vehiculo: 'AD',
        url_imagen: 'https://images.unsplash.com/photo-1599256631131-72728f14aa9d?q=80&w=300&auto=format&fit=crop',
        created_at: new Date(),
        updated_at: new Date()
      },
      // BAIC
      {
        id: uuidv4(),
        categoria_id: catMotor,
        proveedor_id: provId,
        sku: 'SEN-BA-501',
        nombre: 'Sensor de Oxígeno (Lambda)',
        descripcion: 'Sensor de oxígeno para BAIC MZ40. Optimiza el consumo de combustible en altura.',
        precio: 420.00,
        stock: 10,
        marca_vehiculo: 'BAIC',
        modelo_vehiculo: 'MZ40',
        url_imagen: 'https://images.unsplash.com/photo-1597404294360-feeeda04612e?q=80&w=300&auto=format&fit=crop',
        created_at: new Date(),
        updated_at: new Date()
      },
      // GOLDEN DRAGON
      {
        id: uuidv4(),
        categoria_id: catMotor,
        proveedor_id: provId,
        sku: 'TER-GD-601',
        nombre: 'Termostato de Motor 82°C',
        descripcion: 'Termostato para Minibús Golden Dragon / King Long. Control de temperatura preciso.',
        precio: 130.00,
        stock: 15,
        marca_vehiculo: 'Golden Dragon',
        modelo_vehiculo: 'Minibus',
        url_imagen: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?q=80&w=300&auto=format&fit=crop',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('productos', {
      sku: { [Sequelize.Op.in]: ['FIL-FT-101', 'PAS-SZ-201', 'BUJ-TY-301', 'FIL-NS-401', 'SEN-BA-501', 'TER-GD-601'] }
    });
  }
};
