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

export const migrationRoutes = {
    single: `${prefix}/migration`,
    multiple: `${prefix}/migrations`
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
