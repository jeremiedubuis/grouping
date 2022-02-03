import { ApiRoute } from './ApiRoute';
import { userRoutes } from '$shared/uris';
import { Method } from '$types/server';
import { UserHandler } from '../handlers/UserHandler';

export const createRoutes = (app: any) => {
    new ApiRoute(app, userRoutes.multiple, Method.GET, UserHandler.handle('selectAll'));
    new ApiRoute(app, userRoutes.single, Method.POST, UserHandler.handle('create'), {
        body: {
            username: 'string',
            password: 'string'
        }
    });
    new ApiRoute(app, userRoutes.single, Method.PUT, UserHandler.handle('update'), {
        body: {
            username: 'string|optional',
            password: 'string|optional'
        }
    });
    new ApiRoute(app, userRoutes.login, Method.POST, UserHandler.handle('login'), {
        allowDisconnected: true,
        body: {
            username: 'string',
            password: 'string'
        }
    });
    new ApiRoute(app, userRoutes.tokenLogin, Method.GET, UserHandler.handle('loginFromToken'), {
        allowDisconnected: true
    });
    new ApiRoute(app, userRoutes.logout, Method.GET, UserHandler.handle('logout'));
};
