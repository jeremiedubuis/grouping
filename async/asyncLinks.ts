import { apiFetch } from './apiFetch';
import { linkRoutes, pathWithParams } from '$shared/uris';
import { LinkPayload } from '$types/linkTypes';

export const asyncLinksFetch = () => apiFetch(linkRoutes.multiple, { method: 'GET' });

export const asyncLinksCreate = (payload: LinkPayload) =>
    apiFetch(linkRoutes.single, {
        method: 'POST',
        body: JSON.stringify(payload)
    });
export const asyncLinkDelete = (linkId: number) =>
    apiFetch(pathWithParams(linkRoutes.specific, { linkId: linkId.toString() }), {
        method: 'DELETE'
    });
