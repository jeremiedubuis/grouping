"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionMiddleware = void 0;
const UserHandler_1 = require("../api/handlers/UserHandler");
const sessionMiddleware = async (req, _res, next) => {
    if (!req.cookies.token)
        req.session = null;
    else {
        try {
            req.session = UserHandler_1.UserHandler.checkToken(req.cookies.token);
        }
        catch (e) {
            console.log(e);
        }
    }
    next();
};
exports.sessionMiddleware = sessionMiddleware;
//# sourceMappingURL=sessionMiddleware.js.map