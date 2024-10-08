import mysql from 'mysql2/promise';

export const dbConnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: false,
    database: process.env.DB_NAME
});
