import { ApiRoute, imageValidator } from './ApiRoute';
import { individualRoutes } from '$shared/uris';
import { Method } from '$types/server';
import { IndividualHandler } from '../handlers/IndividualHandler';

export const createRoutes = (app: any) => {
    new ApiRoute(
        app,
        individualRoutes.multiple,
        Method.GET,
        IndividualHandler.handle('selectAll'),
        {
            allowDisconnected: true
        }
    );
    new ApiRoute(
        app,
        individualRoutes.single,
        Method.POST,
        IndividualHandler.handle('create'),
        {
            body: {
                firstname: 'string',
                lastname: 'string',
                defaultNodeValue: 'number|optional|convert',
                defaultNodeColor: 'string|optional',
                picture: imageValidator(true)
            }
        },
        true
    );
    new ApiRoute(
        app,
        individualRoutes.specific,
        Method.PUT,
        IndividualHandler.handle('update'),
        {
            params: {
                individualId: 'string'
            },
            body: {
                firstname: 'string|optional',
                lastname: 'string|optional',
                defaultNodeValue: 'number|optional|convert',
                defaultNodeColor: 'string|optional',
                picture: imageValidator(true)
            }
        },
        true
    );
    new ApiRoute(
        app,
        individualRoutes.specific,
        Method.DELETE,
        IndividualHandler.handle('delete'),
        {
            params: {
                individualId: 'string'
            }
        }
    );
};
