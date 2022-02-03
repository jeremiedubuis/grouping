import { ApiRoute } from './ApiRoute';
import { entityFlagValueRoutes, flagRoutes } from '$shared/uris';
import { Method } from '$types/server';
import { FlagHandler } from '../handlers/FlagHandler';
import { EntityFlagHandler } from '$handlers/EntityFlagHandler';

export const createRoutes = (app: any) => {
    new ApiRoute(app, flagRoutes.multiple, Method.GET, FlagHandler.handle('selectAll'));
    new ApiRoute(app, flagRoutes.single, Method.POST, FlagHandler.handle('create'), {
        body: {
            name: 'string'
        }
    });
    new ApiRoute(app, flagRoutes.specific, Method.PUT, FlagHandler.handle('update'), {
        params: {
            flagId: 'string'
        },
        body: {
            name: 'string'
        }
    });
    new ApiRoute(app, flagRoutes.specific, Method.DELETE, FlagHandler.handle('delete'), {
        params: {
            flagId: 'string'
        }
    });
    new ApiRoute(
        app,
        entityFlagValueRoutes.single,
        Method.POST,
        EntityFlagHandler.handle('createFlaq'),
        {
            body: {
                groupId: 'number|optional',
                individualId: 'number|optional',
                flagValueId: 'number'
            }
        }
    );
    new ApiRoute(
        app,
        entityFlagValueRoutes.single,
        Method.PUT,
        EntityFlagHandler.handle('updateFlag'),
        {
            body: {
                groupId: 'number|optional',
                individualId: 'number|optional',
                flagValueId: 'number'
            }
        }
    );
    new ApiRoute(
        app,
        entityFlagValueRoutes.single,
        Method.DELETE,
        EntityFlagHandler.handle('deleteFlag'),
        {
            body: {
                groupId: 'number|optional',
                individualId: 'number|optional',
                flagValueId: 'number'
            }
        }
    );
};
