"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const url_1 = require("url");
const next_1 = __importDefault(require("next"));
const polka_1 = __importDefault(require("polka"));
const api_1 = require("./api");
const { json } = require('body-parser');
const cors = require('cors');
const sirv_1 = __importDefault(require("sirv"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dev = process.env.NODE_ENV !== 'production';
const app = (0, next_1.default)({ dev });
const handle = app.getRequestHandler();
const server = (0, polka_1.default)();
const mw = [
    json(),
    (0, sirv_1.default)('public', {
        dev
    })
];
if (process.env.CORS) {
    mw.push(cors({
        credentials: true,
        origin: process.env.CORS.split(',')
    }));
}
server.use(...mw);
app.prepare().then(async () => {
    await (0, api_1.init)(server);
    server.get(process.env.UPLOAD_PATH + '/*', (req, res) => {
        console.log(req.url);
        if (/\.\./.test(req.url)) {
            res.statusCode = 404;
            return res.end('NOT_FOUND');
        }
        fs_1.default.createReadStream(path_1.default.join(process.cwd(), req.url))
            .on('open', function () {
            // This just pipes the read stream to the response object (which goes to the client)
            this.pipe(res);
        })
            .on('error', function () {
            res.statusCode = 404;
            res.end('NOT_FOUND');
        });
    });
    server.get('/*', (req, res) => {
        handle(req, res, (0, url_1.parse)(req.url, true));
    });
    server.listen(process.env.PORT || 3000);
});
exports.default = server;
//# sourceMappingURL=server.js.map