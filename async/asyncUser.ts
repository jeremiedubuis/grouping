import { apiFetch } from './apiFetch';
import { userRoutes } from '$shared/uris';
import { BaseUser, UserPayload } from '$types/user';

export const asyncLogin = (username: string, password: string) =>
    apiFetch(userRoutes.login, {
        method: 'POST',
        body: JSON.stringify({ username, password })
    });

export const asyncLoginFromToken = () =>
    apiFetch(userRoutes.tokenLogin, {
        method: 'GET'
    });

export const asyncUsersFetch = (): Promise<BaseUser[]> =>
    apiFetch(userRoutes.multiple, {
        method: 'GET'
    });

export const asyncUserCreate = (payload: UserPayload): Promise<{ id: number }> =>
    apiFetch(userRoutes.single, {
        method: 'POST',
        body: JSON.stringify(payload)
    });
