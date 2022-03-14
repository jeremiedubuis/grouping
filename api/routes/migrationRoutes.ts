import { ApiRoute } from './ApiRoute';
import { migrationRoutes } from '$shared/uris';
import { Method } from '$types/server';
import { MigrationHandler } from '$handlers/MigrationHandler';

export const createRoutes = (app: any) => {
    new ApiRoute(app, migrationRoutes.multiple, Method.GET, MigrationHandler.handle('selectAll'));
    new ApiRoute(app, migrationRoutes.single, Method.POST, MigrationHandler.handle('apply'));
};
