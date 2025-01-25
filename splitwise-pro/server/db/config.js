// db.js
const { Client } = require('pg');
require('dotenv').config();

// Connection details from Neon
const client = new Client({
  connectionString: `${process.env.DATABASE_URL}`, // Use your own URL
  ssl: { rejectUnauthorized: false }  // Neon requires SSL connections
});

// Connect to the Neon database
client.connect()
  .then(() => {
    console.log('Connected to Neon Database!');
  })
  .catch((err) => {
    console.error('Connection error', err.stack);
  });

module.exports = client;