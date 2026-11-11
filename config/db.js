require('dotenv').config();
const mysql = require('mysql2/promise'); // Using the promise-wrapped client

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection instantly on startup
pool.getConnection().then(connection => {
  console.log('Database Connected Successfully...!', '->', 'Port:- ', process.env.PORT);
  connection.release();
}).catch(err => {
  console.error('Database connection failed:', err.errors);
});

module.exports = pool;