"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoutes = void 0;
const ApiRoute_1 = require("./ApiRoute");
const uris_1 = require("../../shared/uris");
const server_1 = require("../../shared/types/server");
const GroupHandler_1 = require("../handlers/GroupHandler");
const createRoutes = (app) => {
    new ApiRoute_1.ApiRoute(app, uris_1.groupRoutes.single, server_1.Method.POST, GroupHandler_1.GroupHandler.handle('create'), {
        body: {
            name: 'string',
            type: 'string',
            defaultNodeValue: 'number|optional|convert',
            defaultNodeColor: 'string|optional',
            picture: (0, ApiRoute_1.imageValidator)(true)
        }
    }, true);
    new ApiRoute_1.ApiRoute(app, uris_1.groupRoutes.specific, server_1.Method.PUT, GroupHandler_1.GroupHandler.handle('update'), {
        body: {
            name: 'string|optional',
            type: 'string|optional',
            defaultNodeValue: 'number|optional|convert',
            defaultNodeColor: 'string|optional',
            picture: (0, ApiRoute_1.imageValidator)(true)
        },
        params: {
            groupId: 'string'
        }
    }, true);
    new ApiRoute_1.ApiRoute(app, uris_1.groupRoutes.specific, server_1.Method.DELETE, GroupHandler_1.GroupHandler.handle('delete'), {
        params: {
            groupId: 'string'
        }
    });
    new ApiRoute_1.ApiRoute(app, uris_1.groupTypeRoutes.multiple, server_1.Method.GET, GroupHandler_1.GroupHandler.handle('selectTypes'));
    new ApiRoute_1.ApiRoute(app, uris_1.groupRoutes.multiple, server_1.Method.GET, GroupHandler_1.GroupHandler.handle('selectAll'), {
        allowDisconnected: true
    });
    new ApiRoute_1.ApiRoute(app, uris_1.groupRoutes.specific, server_1.Method.GET, GroupHandler_1.GroupHandler.handle('selectFromId'), {
        params: {
            groupId: 'string'
        }
    });
};
exports.createRoutes = createRoutes;
//# sourceMappingURL=groupRoutes.js.map