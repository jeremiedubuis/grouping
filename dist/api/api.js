"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const init = (server) => new Promise((resolve) => {
    fs_1.default.readdir(path_1.default.join(__dirname, "/routes"), (_err, files) => {
        files.forEach((file) => {
            if (file.startsWith("ApiRoute") ||
                (!file.endsWith(".js") && !file.endsWith(".ts")))
                return;
            const { createRoutes } = require(`./routes/${file}`);
            createRoutes(server);
        });
        resolve(null);
    });
});
exports.init = init;
//# sourceMappingURL=api.js.map