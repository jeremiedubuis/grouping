import { apiFetch } from './apiFetch';
import { migrationRoutes } from '$shared/uris';

export const asyncMigrationsFetch = () => apiFetch(migrationRoutes.multiple, { method: 'GET' });

export const asyncMigrationApply = (migrationPath) =>
    apiFetch(migrationRoutes.single, {
        method: 'POST',
        body: {
            migrationPath
        }
    });
