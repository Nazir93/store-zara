import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

async function query(sql: string, params: any[] = []) {
  try {
    const result = await pool.query(sql, params);
    return result.rows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getProducts() {
  const sql = 'SELECT * FROM products';
  const products = await query(sql);
  return products;
};