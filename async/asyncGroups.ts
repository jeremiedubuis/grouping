import { apiFetch } from './apiFetch';
import { groupRoutes, groupTypeRoutes, pathWithParams } from '$shared/uris';
import type { GroupPayload, GroupWithFlags, GroupWithLinks } from '$types/group';
import type { Links } from '$types/linkTypes';

export const asyncGroupTypesFetch = () =>
    apiFetch(groupTypeRoutes.multiple, {
        method: 'GET'
    });

export const asyncGroupCreate = (payload: GroupPayload) =>
    apiFetch(groupRoutes.single, {
        method: 'POST',
        body: payload,
        multiPart: true
    });

export const asyncGroupUpdate = (groupId: number, payload: Partial<GroupPayload>) =>
    apiFetch(pathWithParams(groupRoutes.specific, { groupId: groupId.toString() }), {
        method: 'PUT',
        body: payload,
        multiPart: true
    });
export const asyncGroupDelete = (groupId: number) =>
    apiFetch(pathWithParams(groupRoutes.specific, { groupId: groupId.toString() }), {
        method: 'DELETE'
    });

export const asyncGroupsFetch = (): Promise<GroupWithFlags[]> =>
    apiFetch(groupRoutes.multiple, {
        method: 'GET'
    });

export const asyncGroupFetch = (groupId: number | string): Promise<GroupWithLinks> =>
    apiFetch(pathWithParams(groupRoutes.specific, { groupId: groupId.toString() }), {
        method: 'GET'
    });

export const asyncGroupLinksFetch = (groupId: number): Promise<Links> =>
    apiFetch(pathWithParams(groupRoutes.links, { groupId: groupId.toString() }), { method: 'GET' });
