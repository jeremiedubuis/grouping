import { ApiRoute } from './ApiRoute';
import { pageBlockRoute, pageRoutes } from '$shared/uris';
import { Method } from '$types/server';
import { PageHandler } from '$handlers/PageHandler';

export const createRoutes = (app: any) => {
    new ApiRoute(app, pageRoutes.wildcard, Method.GET, PageHandler.handle('selectPage'), {
        allowDisconnected: true
    });
    new ApiRoute(app, pageRoutes.specific, Method.GET, PageHandler.handle('selectBoPage'));
    new ApiRoute(app, pageRoutes.multiple, Method.GET, PageHandler.handle('selectPages'), {
        allowDisconnected: true
    });
    new ApiRoute(app, pageRoutes.single, Method.POST, PageHandler.handle('createPage'), {
        body: {
            path: 'string',
            template: 'string',
            title: 'string|optional',
            metaTitle: 'string|optional',
            metaDescription: 'string|optional',
            individualId: 'number|optional',
            groupId: 'number|optional'
        }
    });
    new ApiRoute(app, pageRoutes.specific, Method.PUT, PageHandler.handle('updatePage'), {
        params: {
            id: 'string'
        },
        body: {
            path: 'string|optional',
            template: 'string|optional',
            title: 'string|optional',
            metaTitle: 'string|optional',
            metaDescription: 'string|optional'
        }
    });
    new ApiRoute(app, pageRoutes.specific, Method.DELETE, PageHandler.handle('deletePage'), {
        params: {
            id: 'string'
        }
    });
    new ApiRoute(app, pageBlockRoute.single, Method.POST, PageHandler.handle('createBlock'), {
        body: {
            title: 'string|optional',
            subtitle: 'string|optional',
            text: 'string|optional',
            linkHref: 'string|optional',
            linkText: 'string|optional',
            pageId: 'number|optional',
            mapId: 'number|optional',
            blockId: 'number|optional',
            assetId: 'number|optional',
            identifier: 'string'
        }
    });
    new ApiRoute(app, pageBlockRoute.specific, Method.PUT, PageHandler.handle('updateBlock'), {
        params: {
            id: 'string'
        },
        body: {
            title: 'string|optional',
            subtitle: 'string|optional',
            text: 'string|optional',
            linkHref: 'string|optional',
            linkText: 'string|optional',
            pageId: 'number|optional',
            mapId: 'number|optional',
            blockId: 'number|optional',
            assetId: 'number|optional',
            identifier: 'string|optional'
        }
    });
    new ApiRoute(app, pageBlockRoute.specific, Method.DELETE, PageHandler.handle('deleteBlock'), {
        params: {
            id: 'string'
        }
    });
};
