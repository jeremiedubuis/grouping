"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pathWithParams = exports.linkRoutes = exports.flagValueRoutes = exports.flagRoutes = exports.entityFlagValueRoutes = exports.groupTypeRoutes = exports.groupRoutes = exports.individualRoutes = exports.userRoutes = void 0;
const prefix = '/api';
exports.userRoutes = {
    single: `${prefix}/user`,
    multiple: `${prefix}/users`,
    login: `${prefix}/login`,
    logout: `${prefix}/logout`,
    tokenLogin: `${prefix}/token_login`
};
exports.individualRoutes = {
    multiple: `${prefix}/individuals`,
    single: `${prefix}/individual`,
    specific: `${prefix}/individual/:individualId`,
    links: `${prefix}/individual/:individualId/links`
};
exports.groupRoutes = {
    multiple: `${prefix}/groups`,
    single: `${prefix}/group`,
    specific: `${prefix}/group/:groupId`,
    links: `${prefix}/group/:groupId/links`
};
exports.groupTypeRoutes = {
    multiple: `${prefix}/group-types`
};
exports.entityFlagValueRoutes = {
    single: `${prefix}/entity/flag`
};
exports.flagRoutes = {
    multiple: `${prefix}/flags`,
    single: `${prefix}/flag`,
    specific: `${prefix}/flag/:flagId`
};
exports.flagValueRoutes = {
    single: `${prefix}/flagValue`,
    specific: `${prefix}/flagValue/:flagValueId`
};
exports.linkRoutes = {
    single: `${prefix}/link`,
    multiple: `${prefix}/links`,
    specific: `${prefix}/link/:linkId`
};
const pathWithParams = (p, params = {}) => Object.keys(params).reduce((acc, curr) => Array.isArray(params[curr])
    ? curr
    : curr === '*'
        ? acc.replace('*', params[curr])
        : acc.replace(new RegExp(`:${curr}`, 'g'), params[curr]), p);
exports.pathWithParams = pathWithParams;
//# sourceMappingURL=uris.js.map