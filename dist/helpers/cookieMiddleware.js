"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieMiddleware = void 0;
const cookie_1 = __importDefault(require("cookie"));
const cookieMiddleware = (req, _res, next) => {
    req.cookies = req.headers.cookie ? cookie_1.default.parse(req.headers.cookie) : {};
    next();
};
exports.cookieMiddleware = cookieMiddleware;
//# sourceMappingURL=cookieMiddleware.js.map