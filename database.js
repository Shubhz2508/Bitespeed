const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres', // Default superuser
    host: 'localhost',
    database: 'postgres', // You can use an existing database or create a new one
    password: "Shubh@2508", // Password for the default superuser (leave empty if not set)
    port: 5432, // Default PostgreSQL port is 5432
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    client.query('SELECT NOW()', (err, result) => {
        release();
        if (err) {
            return console.error('Error executing query', err.stack);
        }
        console.log('Current timestamp from PostgreSQL:', result.rows[0].now);
    });
});
