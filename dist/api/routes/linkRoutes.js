"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoutes = void 0;
const ApiRoute_1 = require("./ApiRoute");
const uris_1 = require("../../shared/uris");
const server_1 = require("../../shared/types/server");
const LinkHandler_1 = require("../handlers/LinkHandler");
const createRoutes = (app) => {
    new ApiRoute_1.ApiRoute(app, uris_1.linkRoutes.multiple, server_1.Method.GET, LinkHandler_1.LinkHandler.handle('selectAll'), {
        allowDisconnected: true
    });
    new ApiRoute_1.ApiRoute(app, uris_1.linkRoutes.single, server_1.Method.POST, LinkHandler_1.LinkHandler.handle('create'), {
        body: {
            individualId: 'number|optional',
            groupId: 'number|optional',
            individual2Id: 'number|optional',
            group2Id: 'number|optional',
            type: 'string|optional'
        }
    });
    new ApiRoute_1.ApiRoute(app, uris_1.linkRoutes.specific, server_1.Method.DELETE, LinkHandler_1.LinkHandler.handle('delete'), {
        params: {
            linkId: 'string'
        }
    });
    new ApiRoute_1.ApiRoute(app, uris_1.individualRoutes.links, server_1.Method.GET, LinkHandler_1.LinkHandler.handle('select'), {
        params: {
            individualId: 'string'
        }
    });
    new ApiRoute_1.ApiRoute(app, uris_1.groupRoutes.links, server_1.Method.GET, LinkHandler_1.LinkHandler.handle('select'), {
        params: {
            groupId: 'string'
        }
    });
};
exports.createRoutes = createRoutes;
//# sourceMappingURL=linkRoutes.js.map