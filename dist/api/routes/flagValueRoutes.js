"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoutes = void 0;
const ApiRoute_1 = require("./ApiRoute");
const uris_1 = require("../../shared/uris");
const server_1 = require("../../shared/types/server");
const FlagValueHandler_1 = require("../handlers/FlagValueHandler");
const createRoutes = (app) => {
    new ApiRoute_1.ApiRoute(app, uris_1.flagValueRoutes.single, server_1.Method.POST, FlagValueHandler_1.FlagValueHandler.handle('create'), {
        body: {
            flagId: 'number',
            value: 'string'
        }
    });
    new ApiRoute_1.ApiRoute(app, uris_1.flagValueRoutes.specific, server_1.Method.PUT, FlagValueHandler_1.FlagValueHandler.handle('update'), {
        params: {
            flagValueId: 'string'
        },
        body: {
            value: 'string'
        }
    });
    new ApiRoute_1.ApiRoute(app, uris_1.flagValueRoutes.specific, server_1.Method.DELETE, FlagValueHandler_1.FlagValueHandler.handle('delete'), {
        params: {
            flagValueId: 'string'
        },
    });
};
exports.createRoutes = createRoutes;
//# sourceMappingURL=flagValueRoutes.js.map