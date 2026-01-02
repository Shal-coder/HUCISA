const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env') });

async function initDatabase() {
    try {
        // Connect to MySQL server (without database)
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            multipleStatements: true // Enable multiple statements
        });

        console.log('Connected to MySQL server.');

        // Read SQL file
        const sqlPath = path.join(__dirname, '../database.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        // Execute SQL
        console.log('Executing database.sql...');
        await connection.query(sql);

        console.log('Database initialized successfully!');
        await connection.end();
    } catch (err) {
        console.error('Error initializing database:', err);
    }
}

initDatabase();
