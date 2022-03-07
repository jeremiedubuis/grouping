import pkg from '../package.json';
import { config } from 'dotenv';
import path from 'path';
config({
    path: path.join(
        __dirname,
        process.env.NODE_ENV === 'production' ? '../.env.production' : '../.env'
    )
});
import { parse } from 'url';
import next from 'next';
import polka from 'polka';
import { init } from './api';
import type { Request } from '$types/server';
import type { ServerResponse } from 'http';
const { json } = require('body-parser');
const cors = require('cors');
import sirv from 'sirv';
import fs, { ReadStream } from 'fs';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const server = polka();

const mw = [
    json(),
    sirv('public', {
        dev
    }),
    (_req: any, res: any, next: any) => {
        res.setHeader('server', `${pkg.name}@${pkg.version}`);
        next();
    }
];

if (process.env.CORS) {
    mw.push(
        cors({
            credentials: true,
            origin: process.env.CORS.split(',')
        })
    );
}

server.use(...mw);

app.prepare().then(async () => {
    await init(server);

    server.get(process.env.UPLOAD_PATH + '/*', (req: Request, res: ServerResponse) => {
        console.log(req.url);
        if (/\.\./.test(req.url)) {
            res.statusCode = 404;
            return res.end('NOT_FOUND');
        }
        fs.createReadStream(path.join(process.cwd(), req.url))
            .on('open', function (this: ReadStream) {
                // This just pipes the read stream to the response object (which goes to the client)
                this.pipe(res);
            })
            .on('error', function () {
                res.statusCode = 404;
                res.end('NOT_FOUND');
            });
    });
    server.get('/*', (req: Request, res: ServerResponse) => {
        handle(req, res, parse(req.url, true));
    });

    server.listen(process.env.PORT || 3000);
});

export default server;
