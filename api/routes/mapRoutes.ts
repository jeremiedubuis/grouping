import { ApiRoute } from './ApiRoute';
import { mapRoutes, mapEntryRoutes } from '$shared/uris';
import { Method } from '$types/server';
import { MapHandler } from '$handlers/MapHandler';

export const createRoutes = (app: any) => {
    new ApiRoute(app, mapRoutes.multiple, Method.GET, MapHandler.handle('selectMaps'));
    new ApiRoute(app, mapRoutes.specific, Method.GET, MapHandler.handle('selectMap'), {
        params: {
            id: 'string'
        }
    });
    new ApiRoute(app, mapRoutes.single, Method.POST, MapHandler.handle('createMap'), {
        body: {
            name: 'string',
            description: 'string|optional'
        }
    });
    new ApiRoute(app, mapRoutes.specific, Method.PUT, MapHandler.handle('updateMap'), {
        params: {
            id: 'string'
        },
        body: {
            name: 'string|optional',
            description: 'string|optional'
        }
    });
    new ApiRoute(app, mapRoutes.specific, Method.DELETE, MapHandler.handle('deleteMap'), {
        params: {
            id: 'string'
        }
    });
    new ApiRoute(app, mapEntryRoutes.single, Method.POST, MapHandler.handle('createMapEntry'), {
        body: {
            mapId: 'number',
            groupId: 'number|optional',
            individualId: 'number|optional',
            nodeColor: 'string|optional',
            nodeValue: 'number|optional'
        }
    });
    new ApiRoute(app, mapEntryRoutes.specific, Method.PUT, MapHandler.handle('updateMapEntry'), {
        params: {
            id: 'string'
        },
        body: {
            nodeColor: 'string|optional',
            nodeValue: 'number|optional'
        }
    });
    new ApiRoute(app, mapEntryRoutes.specific, Method.DELETE, MapHandler.handle('deleteMapEntry'), {
        params: {
            id: 'string'
        }
    });
    new ApiRoute(
        app,
        mapRoutes.fillFromIndividualLinks,
        Method.POST,
        MapHandler.handle('mapFillFromIndividualLinks'),
        {
            params: {
                id: 'string'
            },
            body: {
                individualId: 'number'
            }
        }
    );
    new ApiRoute(
        app,
        mapRoutes.fillFromGroupLinks,
        Method.POST,
        MapHandler.handle('mapFillFromGrouplinks'),
        {
            params: {
                id: 'string'
            },
            body: {
                groupId: 'number'
            }
        }
    );
};
