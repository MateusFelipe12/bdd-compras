const { Pool } = require('pg');

const pool = new Pool({
    user: 'mateus',
    host: 'postgres',
    database: 'compras',
    password: 'postgres',
    port: 5432    
});

module.exports = { query: (text, params) => pool.query(text, params) };