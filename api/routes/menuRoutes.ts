import { ApiRoute } from './ApiRoute';
import { menuRoutes } from '$shared/uris';
import { Method } from '$types/server';
import { MenuHandler } from '$handlers/MenuHandler';

export const createRoutes = (app: any) => {
    new ApiRoute(app, menuRoutes.single, Method.GET, MenuHandler.handle('select'), {
        allowDisconnected: true
    });
    new ApiRoute(app, menuRoutes.single, Method.POST, MenuHandler.handle('create'), {
        body: {
            text: 'string|optional',
            href: 'string|optional',
            target: {
                optional: true,
                type: 'enum',
                values: ['_blank', '_self']
            },
            icon: 'string|optional',
            pageId: 'number|optional'
        }
    });
    new ApiRoute(app, menuRoutes.specific, Method.PUT, MenuHandler.handle('update'), {
        params: {
            id: 'string'
        },
        body: {
            text: 'string|optional',
            href: 'string|optional',
            target: {
                optional: true,
                type: 'enum',
                values: ['_blank', '_self']
            },
            icon: 'string|optional',
            pageId: 'number|optional'
        }
    });
    new ApiRoute(app, menuRoutes.specific, Method.DELETE, MenuHandler.handle('delete'), {
        params: {
            id: 'string'
        }
    });
};
