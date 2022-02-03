"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoutes = void 0;
const ApiRoute_1 = require("./ApiRoute");
const uris_1 = require("../../shared/uris");
const server_1 = require("../../shared/types/server");
const FlagHandler_1 = require("../handlers/FlagHandler");
const EntityFlagHandler_1 = require("../handlers/EntityFlagHandler");
const createRoutes = (app) => {
    new ApiRoute_1.ApiRoute(app, uris_1.flagRoutes.multiple, server_1.Method.GET, FlagHandler_1.FlagHandler.handle('selectAll'));
    new ApiRoute_1.ApiRoute(app, uris_1.flagRoutes.single, server_1.Method.POST, FlagHandler_1.FlagHandler.handle('create'), {
        body: {
            name: 'string'
        }
    });
    new ApiRoute_1.ApiRoute(app, uris_1.flagRoutes.specific, server_1.Method.PUT, FlagHandler_1.FlagHandler.handle('update'), {
        params: {
            flagId: 'string'
        },
        body: {
            name: 'string'
        }
    });
    new ApiRoute_1.ApiRoute(app, uris_1.flagRoutes.specific, server_1.Method.DELETE, FlagHandler_1.FlagHandler.handle('delete'), {
        params: {
            flagId: 'string'
        }
    });
    new ApiRoute_1.ApiRoute(app, uris_1.entityFlagValueRoutes.single, server_1.Method.POST, EntityFlagHandler_1.EntityFlagHandler.handle('createFlaq'), {
        body: {
            groupId: 'number|optional',
            individualId: 'number|optional',
            flagValueId: 'number'
        }
    });
    new ApiRoute_1.ApiRoute(app, uris_1.entityFlagValueRoutes.single, server_1.Method.PUT, EntityFlagHandler_1.EntityFlagHandler.handle('updateFlag'), {
        body: {
            groupId: 'number|optional',
            individualId: 'number|optional',
            flagValueId: 'number'
        }
    });
    new ApiRoute_1.ApiRoute(app, uris_1.entityFlagValueRoutes.single, server_1.Method.DELETE, EntityFlagHandler_1.EntityFlagHandler.handle('deleteFlag'), {
        body: {
            groupId: 'number|optional',
            individualId: 'number|optional',
            flagValueId: 'number'
        }
    });
};
exports.createRoutes = createRoutes;
//# sourceMappingURL=flagRoutes.js.map