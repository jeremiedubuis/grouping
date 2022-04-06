import { apiFetch } from './apiFetch';
import { individualRoutes, pathWithParams } from '$shared/uris';
import { Links } from '$types/linkTypes';
import { IndividualPayload, IndividualWithFlags } from '$types/individual';

export const asyncIndividualsFetch = (): Promise<IndividualWithFlags[]> =>
    apiFetch(individualRoutes.multiple, {
        method: 'GET'
    });
export const asyncIndividualFetch = (individualId: number): Promise<IndividualWithFlags> =>
    apiFetch(pathWithParams(individualRoutes.specific, { individualId: individualId.toString() }), {
        method: 'GET'
    });

export const asyncIndividualCreate = (payload: IndividualPayload) =>
    apiFetch(individualRoutes.single, {
        method: 'POST',
        body: payload,
        multiPart: true
    });

export const asyncIndividualUpdate = (individualId, payload) =>
    apiFetch(pathWithParams(individualRoutes.specific, { individualId }), {
        method: 'PUT',
        body: payload,
        multiPart: true
    });

export const asyncIndividualDelete = (individualId) =>
    apiFetch(pathWithParams(individualRoutes.specific, { individualId }), {
        method: 'DELETE'
    });

export const asyncIndividualLinksFetch = (individualId: number): Promise<Links> =>
    apiFetch(pathWithParams(individualRoutes.links, { individualId: individualId.toString() }), {
        method: 'GET'
    });
