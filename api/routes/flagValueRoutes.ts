import {ApiRoute} from "./ApiRoute";
import {flagValueRoutes} from "$shared/uris";
import {Method} from "$types/server";
import {FlagValueHandler} from "../handlers/FlagValueHandler";

export const createRoutes = (app: any) => {
    new ApiRoute(app, flagValueRoutes.single, Method.POST, FlagValueHandler.handle('create'), {
        body: {
            flagId: 'number',
            value: 'string'
        }
    });
    new ApiRoute(app, flagValueRoutes.specific, Method.PUT, FlagValueHandler.handle('update'), {
        params: {
            flagValueId: 'string'
        },
        body: {
            value: 'string'
        }
    });
    new ApiRoute(app, flagValueRoutes.specific, Method.DELETE, FlagValueHandler.handle('delete'), {
        params: {
            flagValueId: 'string'
        },
    });
}