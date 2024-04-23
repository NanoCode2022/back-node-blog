import mysql from 'mysql2/promise';

const DEFAULT_CONFIG = {
  host: '127.0.0.1',
  user: 'root',
  port: 8081,
  password: 'rootPassword',
  database: 'app_blogs'
}
const pool = mysql.createPool(DEFAULT_CONFIG)
export const connection = await pool.getConnection()
