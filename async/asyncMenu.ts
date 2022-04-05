import { apiFetch } from './apiFetch';
import { menuRoutes, pathWithParams } from '$shared/uris';
import { MenuLink, MenuLinkPayload } from '$types/menuLink';

export const asyncMenuFetch = (): Promise<MenuLink[]> =>
    apiFetch(menuRoutes.single, { method: 'GET' });

export const asyncMenuLinkCreate = (body: MenuLinkPayload): Promise<MenuLink[]> =>
    apiFetch(menuRoutes.single, {
        method: 'POST',
        body
    });

export const asyncMenuLinkUpdate = (id: number, body: Partial<MenuLinkPayload>) =>
    apiFetch(pathWithParams(menuRoutes.specific, { id: id.toString() }), {
        method: 'PUT',
        body
    });

export const asyncMenuLinkDelete = (id: number) =>
    apiFetch(pathWithParams(menuRoutes.specific, { id: id.toString() }), {
        method: 'DELETE'
    });
