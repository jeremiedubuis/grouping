"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
const mysql2_1 = require("mysql2");
const connectToDb = (options) => {
    const db = (0, mysql2_1.createPool)(options);
    db.on('connection', (conn) => {
        conn.query("SET time_zone='+00:00';", (error) => {
            if (error) {
                throw error;
            }
        });
    });
    db.getConnection((err, connection) => {
        if (err) {
            console.log(err);
        }
        if (!connection) {
            return console.log('No PoolConnection:', options.host, options.database);
        }
        connection.release();
    });
    return db;
};
const database = connectToDb({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});
const query = (q, values) => new Promise((resolve, reject) => {
    database.query(q, values, (err, results) => {
        if (err)
            return reject(err);
        return resolve(results);
    });
});
exports.query = query;
//# sourceMappingURL=database.js.map