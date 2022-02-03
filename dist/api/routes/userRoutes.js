"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoutes = void 0;
const ApiRoute_1 = require("./ApiRoute");
const uris_1 = require("../../shared/uris");
const server_1 = require("../../shared/types/server");
const UserHandler_1 = require("../handlers/UserHandler");
const createRoutes = (app) => {
    new ApiRoute_1.ApiRoute(app, uris_1.userRoutes.multiple, server_1.Method.GET, UserHandler_1.UserHandler.handle('selectAll'));
    new ApiRoute_1.ApiRoute(app, uris_1.userRoutes.single, server_1.Method.POST, UserHandler_1.UserHandler.handle('create'), {
        body: {
            username: 'string',
            password: 'string'
        }
    });
    new ApiRoute_1.ApiRoute(app, uris_1.userRoutes.single, server_1.Method.PUT, UserHandler_1.UserHandler.handle('update'), {
        body: {
            username: 'string|optional',
            password: 'string|optional'
        }
    });
    new ApiRoute_1.ApiRoute(app, uris_1.userRoutes.login, server_1.Method.POST, UserHandler_1.UserHandler.handle('login'), {
        allowDisconnected: true,
        body: {
            username: 'string',
            password: 'string'
        }
    });
    new ApiRoute_1.ApiRoute(app, uris_1.userRoutes.tokenLogin, server_1.Method.GET, UserHandler_1.UserHandler.handle('loginFromToken'), {
        allowDisconnected: true
    });
    new ApiRoute_1.ApiRoute(app, uris_1.userRoutes.logout, server_1.Method.GET, UserHandler_1.UserHandler.handle('logout'));
};
exports.createRoutes = createRoutes;
//# sourceMappingURL=userRoutes.js.map