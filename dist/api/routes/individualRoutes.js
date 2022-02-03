"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRoutes = void 0;
const ApiRoute_1 = require("./ApiRoute");
const uris_1 = require("../../shared/uris");
const server_1 = require("../../shared/types/server");
const IndividualHandler_1 = require("../handlers/IndividualHandler");
const createRoutes = (app) => {
    new ApiRoute_1.ApiRoute(app, uris_1.individualRoutes.multiple, server_1.Method.GET, IndividualHandler_1.IndividualHandler.handle('selectAll'), {
        allowDisconnected: true
    });
    new ApiRoute_1.ApiRoute(app, uris_1.individualRoutes.single, server_1.Method.POST, IndividualHandler_1.IndividualHandler.handle('create'), {
        body: {
            firstname: 'string',
            lastname: 'string',
            defaultNodeValue: 'number|optional|convert',
            defaultNodeColor: 'string|optional',
            picture: (0, ApiRoute_1.imageValidator)(true)
        }
    }, true);
    new ApiRoute_1.ApiRoute(app, uris_1.individualRoutes.specific, server_1.Method.PUT, IndividualHandler_1.IndividualHandler.handle('update'), {
        params: {
            individualId: 'string'
        },
        body: {
            firstname: 'string|optional',
            lastname: 'string|optional',
            defaultNodeValue: 'number|optional|convert',
            defaultNodeColor: 'string|optional',
            picture: (0, ApiRoute_1.imageValidator)(true)
        }
    }, true);
    new ApiRoute_1.ApiRoute(app, uris_1.individualRoutes.specific, server_1.Method.DELETE, IndividualHandler_1.IndividualHandler.handle('delete'), {
        params: {
            individualId: 'string'
        }
    });
};
exports.createRoutes = createRoutes;
//# sourceMappingURL=individualRoutes.js.map