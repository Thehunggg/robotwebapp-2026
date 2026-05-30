require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

async function main() {
    const client = await pool.connect();

    try {
        await client.query(
            'INSERT INTO practice (name) VALUES ($1)',
            ['テストデータ3']
        );

        console.log('データを追加しました');

        const result = await client.query('SELECT * FROM practice');

        console.log(result.rows);
    } catch (err) {
        console.error('エラー:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

main();