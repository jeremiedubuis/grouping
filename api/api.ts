import fs from 'fs';
import path from 'path';
import type { Polka } from 'polka';

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
    await initRoutes(server);
};
