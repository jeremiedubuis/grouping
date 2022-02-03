import { apiFetch } from './apiFetch';
import { entityFlagValueRoutes, flagRoutes, flagValueRoutes, pathWithParams } from '$shared/uris';

export const asyncFlagsFetch = () =>
    apiFetch(flagRoutes.multiple, {
        method: 'GET'
    });

export const asyncFlagCreate = (name) =>
    apiFetch(flagRoutes.single, {
        method: 'POST',
        body: JSON.stringify({ name })
    });

export const asyncFlagUpdate = (flagId, name) =>
    apiFetch(pathWithParams(flagRoutes.specific, { flagId }), {
        method: 'PUT',
        body: JSON.stringify({ name })
    });

export const asyncFlagDelete = (flagId) =>
    apiFetch(pathWithParams(flagRoutes.specific, { flagId }), {
        method: 'DELETE'
    });

export const asyncFlagValueCreate = (flagId, value) =>
    apiFetch(flagValueRoutes.single, {
        method: 'POST',
        body: JSON.stringify({ flagId, value })
    });

export const asyncFlagValueDelete = (flagValueId) =>
    apiFetch(pathWithParams(flagValueRoutes.specific, { flagValueId }), {
        method: 'DELETE'
    });

export const asyncEntityFlagValueCreate = (groupId, individualId, flagValueId) =>
    apiFetch(entityFlagValueRoutes.single, {
        method: 'POST',
        body: JSON.stringify({
            groupId,
            individualId,
            flagValueId
        })
    });

export const asyncEntityFlagValueUpdate = (groupId, individualId, flagValueId) =>
    apiFetch(entityFlagValueRoutes.single, {
        method: 'PUT',
        body: JSON.stringify({
            groupId,
            individualId,
            flagValueId
        })
    });

export const asyncEntityIndividualFlagValueDelete = (groupId, individualId, flagValueId) =>
    apiFetch(entityFlagValueRoutes.single, {
        method: 'DELETE',
        body: JSON.stringify({
            groupId,
            individualId,
            flagValueId
        })
    });
