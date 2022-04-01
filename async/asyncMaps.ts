import { apiFetch } from './apiFetch';
import { mapEntryRoutes, mapRoutes, pathWithParams } from '$shared/uris';
import { MapEntryPayload, MapPayload } from '$types/map';

export const asyncMapsFetch = () => apiFetch(mapRoutes.multiple, { method: 'GET' });
export const asyncMapFetch = (id: number) =>
    apiFetch(pathWithParams(mapRoutes.specific, { id: id.toString() }), { method: 'GET' });
export const asyncMapCreate = (body: MapPayload) =>
    apiFetch(mapRoutes.single, { method: 'POST', body: body });

export const asyncMapEntryCreate = (body: MapEntryPayload) =>
    apiFetch(mapEntryRoutes.single, {
        method: 'POST',
        body
    });

export const asyncMapEntryDelete = (id: number) =>
    apiFetch(pathWithParams(mapEntryRoutes.specific, { id: id.toString() }), {
        method: 'DELETE'
    });
