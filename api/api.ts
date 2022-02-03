import fs from 'fs';
import path from 'path';
import type { Polka } from 'polka';
import { query } from './database';
import { RowDataPacket } from 'mysql2';

const initSQL = async () => {
    try {
        const r = (await query(`SELECT id FROM users`)) as RowDataPacket[];
        if (!r.length) throw new Error('NO_USERS');
        console.log(r);
    } catch (e) {
        console.log('NO USERS');
    }
};

const initRoutes = (server: Polka) =>
    new Promise((resolve) => {
        fs.readdir(path.join(__dirname, '/routes'), (_err, files) => {
            files.forEach((file) => {
                if (file.startsWith('ApiRoute') || (!file.endsWith('.js') && !file.endsWith('.ts')))
                    return;
                const { createRoutes } = require(`./routes/${file}`);
                createRoutes(server);
            });
            resolve(null);
        });
    });

export const init = async (server: Polka) => {
    await initSQL();
    await initRoutes(server);
};
