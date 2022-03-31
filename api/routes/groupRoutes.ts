import { ApiRoute, imageValidator } from './ApiRoute';
import { groupRoutes, groupTypeRoutes } from '$shared/uris';
import { Method } from '$types/server';
import { GroupHandler } from '$handlers/GroupHandler';

export const createRoutes = (app: any) => {
    new ApiRoute(
        app,
        groupRoutes.single,
        Method.POST,
        GroupHandler.handle('create'),
        {
            body: {
                name: 'string',
                type: 'string',
                description: 'string|optional',
                defaultNodeValue: 'number|optional|convert',
                defaultNodeColor: 'string|optional',
                picture: imageValidator(true)
            }
        },
        true
    );
    new ApiRoute(
        app,
        groupRoutes.specific,
        Method.PUT,
        GroupHandler.handle('update'),
        {
            body: {
                name: 'string|optional',
                type: 'string|optional',
                description: 'string|optional',
                defaultNodeValue: 'number|optional|convert',
                defaultNodeColor: 'string|optional',
                picture: imageValidator(true)
            },
            params: {
                groupId: 'string'
            }
        },
        true
    );
    new ApiRoute(app, groupRoutes.specific, Method.DELETE, GroupHandler.handle('delete'), {
        params: {
            groupId: 'string'
        }
    });
    new ApiRoute(app, groupRoutes.multiple, Method.GET, GroupHandler.handle('selectAll'), {
        allowDisconnected: true
    });
    new ApiRoute(app, groupRoutes.specific, Method.GET, GroupHandler.handle('selectFromId'), {
        params: {
            groupId: 'string'
        }
    });

    new ApiRoute(app, groupTypeRoutes.multiple, Method.GET, GroupHandler.handle('selectTypes'));
    new ApiRoute(app, groupTypeRoutes.single, Method.POST, GroupHandler.handle('createType'), {
        body: {
            type: 'string'
        }
    });
    new ApiRoute(app, groupTypeRoutes.specific, Method.PUT, GroupHandler.handle('createType'), {
        params: {
            groupTypeId: 'string'
        },
        body: {
            type: 'string'
        }
    });
};
