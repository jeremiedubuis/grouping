import { ParsedUrlQuery } from 'querystring';

const prefix = '/api';

export const userRoutes = {
    single: `${prefix}/user`,
    multiple: `${prefix}/users`,
    login: `${prefix}/login`,
    logout: `${prefix}/logout`,
    tokenLogin: `${prefix}/token_login`
};

export const individualRoutes = {
    multiple: `${prefix}/individuals`,
    single: `${prefix}/individual`,
    specific: `${prefix}/individual/:individualId`,
    links: `${prefix}/individual/:individualId/links`
};

export const groupRoutes = {
    multiple: `${prefix}/groups`,
    single: `${prefix}/group`,
    specific: `${prefix}/group/:groupId`,
    links: `${prefix}/group/:groupId/links`
};

export const groupTypeRoutes = {
    multiple: `${prefix}/group-types`,
    single: `${prefix}/group-type`,
    specific: `${prefix}/group-type/:groupTypeId`
};

export const entityFlagValueRoutes = {
    single: `${prefix}/entity/flag`
};

export const flagRoutes = {
    multiple: `${prefix}/flags`,
    single: `${prefix}/flag`,
    specific: `${prefix}/flag/:flagId`
};
export const flagValueRoutes = {
    single: `${prefix}/flagValue`,
    specific: `${prefix}/flagValue/:flagValueId`
};

export const linkRoutes = {
    single: `${prefix}/link`,
    multiple: `${prefix}/links`,
    specific: `${prefix}/link/:linkId`
};

export const mapRoutes = {
    single: `${prefix}/map`,
    multiple: `${prefix}/maps`,
    specific: `${prefix}/map/:id`,
    fillFromIndividualLinks: `${prefix}/map/:id/fill-from-individual`,
    fillFromGroupLinks: `${prefix}/map/:id/fill-from-group`
};

export const mapEntryRoutes = {
    single: `${prefix}/map-entry`,
    specific: `${prefix}/map-entry/:id`
};

export const menuRoutes = {
    single: `${prefix}/menu`,
    specific: `${prefix}/menu/:id`
};

export const migrationRoutes = {
    single: `${prefix}/migration`,
    multiple: `${prefix}/migrations`
};

export const pageRoutes = {
    single: `${prefix}/page`,
    multiple: `${prefix}/pages`,
    specific: `${prefix}/page/:id`,
    wildcard: `${prefix}/p/*`
};

export const pageBlockRoute = {
    single: `${prefix}/page-block`,
    specific: `${prefix}/page-block/:id`
};

export const pathWithParams = (
    p: string,
    params: { [key: string]: string } | ParsedUrlQuery = {}
) =>
    Object.keys(params).reduce(
        (acc, curr) =>
            Array.isArray(params[curr])
                ? curr
                : curr === '*'
                ? acc.replace('*', params[curr] as string)
                : acc.replace(new RegExp(`:${curr}`, 'g'), params[curr] as string),
        p
    );
