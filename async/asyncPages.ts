import { apiFetch } from './apiFetch';
import { pageBlockRoute, pageRoutes, pathWithParams } from '$shared/uris';
import type { PagePayload } from '$types/page';
import { BlockPayload } from '$types/block';

export const asyncPagesFetch = () => apiFetch(pageRoutes.multiple);

export const asyncPageFetch = (path: string, o?: any) =>
    apiFetch(pageRoutes.wildcard.replace('*', path), o);

export const asyncBoPageFetch = (id: number) =>
    apiFetch(pathWithParams(pageRoutes.specific, { id: id.toString() }));

export const asyncPageCreate = (body: PagePayload) =>
    apiFetch(pageRoutes.single, {
        method: 'POST',
        body
    });

export const asyncPageUpdate = (id: number, body: Partial<PagePayload>) =>
    apiFetch(pathWithParams(pageRoutes.specific, { id: id.toString() }), {
        method: 'PUT',
        body
    });

export const asyncPageBlockCreate = (body: BlockPayload) =>
    apiFetch(pageBlockRoute.single, { method: 'POST', body });

export const asyncPageBlockUpdate = (id: number, body: Partial<BlockPayload>) =>
    apiFetch(pathWithParams(pageBlockRoute.specific, { id: id.toString() }), {
        method: 'PUT',
        body
    });
export const asyncPageBlockDelete = (id: number) =>
    apiFetch(pathWithParams(pageBlockRoute.specific, { id: id.toString() }), {
        method: 'DELETE'
    });
