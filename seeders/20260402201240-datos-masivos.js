'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Generar IDs para usar en las relaciones
    const categoriaIds = Array.from({ length: 10 }, () => uuidv4());
    const proveedorIds = Array.from({ length: 10 }, () => uuidv4());

    // 10 Categorías
    const categoriasBase = [
      'Lubricantes', 'Filtros', 'Frenos', 'Suspensión', 'Baterías', 
      'Neumáticos', 'Iluminación', 'Transmisión', 'Refrigeración', 'Accesorios'
    ];
    
    await queryInterface.bulkInsert('categorias', categoriasBase.map((nombre, i) => ({
      id: categoriaIds[i],
      nombre,
      descripcion: `Descripción de la categoría ${nombre}`,
      activo: true,
      created_at: new Date(),
      updated_at: new Date()
    })));

    // 10 Clientes
    await queryInterface.bulkInsert('clientes', Array.from({ length: 10 }, (_, i) => ({
      id: uuidv4(),
      documento_identidad: `10000000${i}`,
      nombre: `Cliente Demo ${i + 1}`,
      email: `cliente${i + 1}@garaze.com`,
      telefono: `09000000${i}`,
      direccion: `Avenida Principal ${i + 1}`,
      activo: true,
      created_at: new Date(),
      updated_at: new Date()
    })));

    // 10 Proveedores
    const proveedoresNombres = [
      'Bosch Inc', 'Castrol', 'Mobil', 'Brembo', 'Michelin',
      'Pirelli', 'Hella', 'Valeo', 'ACDelco', 'Denso'
    ];
    await queryInterface.bulkInsert('proveedores', proveedoresNombres.map((nombre, i) => ({
      id: proveedorIds[i],
      nombre,
      nombre_contacto: `Contacto ${nombre}`,
      email: `contacto@${nombre.toLowerCase().replace(' ', '')}.com`,
      telefono: `02000000${i}`,
      activo: true,
      created_at: new Date(),
      updated_at: new Date()
    })));

    // 10 Productos
    const productosBase = [
      { n: 'Aceite de Motor 5W30', p: 45.0, s: 50 },
      { n: 'Filtro de Aceite XJ', p: 15.0, s: 120 },
      { n: 'Pastillas de Freno Frontales', p: 60.0, s: 30 },
      { n: 'Amortiguadores Traseros', p: 120.0, s: 15 },
      { n: 'Batería 12V 60Ah', p: 90.0, s: 20 },
      { n: 'Llantas Deportivas 17"', p: 150.0, s: 40 },
      { n: 'Faro Trasero LED', p: 75.0, s: 25 },
      { n: 'Correa de Transmisión', p: 35.0, s: 80 },
      { n: 'Radiador de Aluminio', p: 200.0, s: 10 },
      { n: 'Set de Alfombras', p: 55.0, s: 60 }
    ];

    await queryInterface.bulkInsert('productos', productosBase.map((prod, i) => ({
      id: uuidv4(),
      categoria_id: categoriaIds[i], // Distribuir uno en cada categoría
      proveedor_id: proveedorIds[i], // Distribuir uno en cada proveedor
      sku: `SKU-${1000 + i}`,
      nombre: prod.n,
      descripcion: `Producto de alta calidad: ${prod.n}`,
      precio: prod.p,
      stock: prod.s,
      stock_minimo: 5,
      url_imagen: 'https://images.unsplash.com/photo-1590528732152-0b36e1c6403d?auto=format&fit=crop&q=80&w=600',
      activo: true,
      created_at: new Date(),
      updated_at: new Date()
    })));
  },

  down: async (queryInterface, Sequelize) => {
    // El borrado genérico podría borrar los predeterminados, pero esta bien para desarrollo.
    // Dejaremos vacío o un delete suave en down
  }
};
