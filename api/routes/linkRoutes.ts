import { ApiRoute } from './ApiRoute';
import { linkRoutes, individualRoutes, groupRoutes } from '$shared/uris';
import { Method } from '$types/server';
import { LinkHandler } from '$handlers/LinkHandler';

export const createRoutes = (app: any) => {
    new ApiRoute(app, linkRoutes.multiple, Method.GET, LinkHandler.handle('selectAll'), {
        allowDisconnected: true
    });
    new ApiRoute(app, linkRoutes.single, Method.POST, LinkHandler.handle('create'), {
        body: {
            individualId: 'number|optional',
            groupId: 'number|optional',
            individual2Id: 'number|optional',
            group2Id: 'number|optional',
            type: 'string|optional'
        }
    });
    new ApiRoute(app, linkRoutes.specific, Method.DELETE, LinkHandler.handle('delete'), {
        params: {
            linkId: 'string'
        }
    });

    new ApiRoute(app, individualRoutes.links, Method.GET, LinkHandler.handle('select'), {
        params: {
            individualId: 'string'
        }
    });

    new ApiRoute(app, groupRoutes.links, Method.GET, LinkHandler.handle('select'), {
        params: {
            groupId: 'string'
        }
    });
};
