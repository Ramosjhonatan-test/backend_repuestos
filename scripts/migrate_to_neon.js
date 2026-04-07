const { Client } = require('pg');
require('dotenv').config();

// Configuración de la base de datos LOCAL
const localConfig = {
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '1522',
  database: 'repuestos_db',
};

// Configuración de NEON (Remota)
const neonUrl = process.env.DATABASE_URL;

async function migrar() {
  const localClient = new Client(localConfig);
  const neonClient = new Client({
    connectionString: neonUrl,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log('--- Iniciando Migración de Datos a Neon ---');
    await localClient.connect();
    await neonClient.connect();
    console.log('Conectado a ambas bases de datos.');

    // Orden de tablas para respetar claves foráneas
    const tablas = [
      'usuarios', 
      'categorias', 
      'proveedores', 
      'clientes', 
      'productos', 
      'ventas', 
      'detalle_ventas', 
      'facturas'
    ];

    // Limpiar Neon para sincronización total
    console.log('Limpiando base de datos remota para sincronización limpia...');
    for (const tabla of [...tablas].reverse()) {
      await neonClient.query(`TRUNCATE TABLE ${tabla} CASCADE`);
    }

    for (const tabla of tablas) {
      console.log(`Migrando tabla: ${tabla}...`);
      
      // Leer de local
      const resLocal = await localClient.query(`SELECT * FROM ${tabla}`);
      const filas = resLocal.rows;

      if (filas.length === 0) {
        console.log(`Tabla ${tabla} está vacía. Saltando...`);
        continue;
      }

      // Limpiar Neon (Opcional, pero recomendado para evitar duplicados si ya hay datos iniciales)
      // Usamos TRUNCATE con CASCADE para limpiar dependencias
      // Pero solo si no es la primera vez. 
      // Para usuarios, eliminamos el admin por defecto si el local tiene uno con el mismo email
      
      const columnas = Object.keys(filas[0]).join(', ');
      const placeholders = Object.keys(filas[0]).map((_, i) => `$${i + 1}`).join(', ');

      for (const fila of filas) {
        const valores = Object.values(fila);
        const queryInsert = `INSERT INTO ${tabla} (${columnas}) VALUES (${placeholders}) ON CONFLICT (id) DO UPDATE SET ${Object.keys(fila).map((k, i) => `${k} = EXCLUDED.${k}`).join(', ')}`;
        await neonClient.query(queryInsert, valores);
      }
      
      console.log(`Migrados ${filas.length} registros de ${tabla}.`);
    }

    console.log('--- MIGRACIÓN COMPLETADA EXITOSAMENTE ---');

  } catch (error) {
    console.error('ERROR DURANTE LA MIGRACIÓN:', error);
  } finally {
    await localClient.end();
    await neonClient.end();
  }
}

migrar();
