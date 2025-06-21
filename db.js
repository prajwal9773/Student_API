// Load environment variables from .env file
require('dotenv').config();

const { Pool } = require('pg');

// Create a new connection pool using environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Optional: test the connection on startup
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Error acquiring client', err.stack);
  }
  console.log('✅ PostgreSQL DB connected successfully');
  release();
});

// Export the pool for use in other files
module.exports = pool;
