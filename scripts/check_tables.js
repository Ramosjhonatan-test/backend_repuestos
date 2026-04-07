const { Client } = require('pg');

async function check() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: '1522',
    database: 'repuestos_db',
  });

  try {
    await client.connect();
    const res = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema='public'");
    console.log('Tablas detectadas:', res.rows.map(r => r.table_name));
  } catch (err) {
    console.error('Error al conectar:', err);
  } finally {
    await client.end();
  }
}

check();
