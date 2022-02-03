"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserHandler = exports.getTokenCookieOptions = void 0;
const Handler_1 = require("./Handler");
const UserModel_1 = require("../models/UserModel");
const jwt_1 = require("../jwt");
const ApiError_1 = require("../ApiError");
const isStringVarTruthy_1 = require("../../shared/helpers/isStringVarTruthy");
const getTokenCookieOptions = (token, deleteCookie) => ({
    name: 'token',
    value: token,
    options: {
        httpOnly: true,
        sameSite: 'lax',
        domain: process.env.COOKIE_DOMAIN,
        path: '/',
        secure: !(0, isStringVarTruthy_1.isStringVarTruthy)(process.env.INSECURE_COOKIE),
        maxAge: deleteCookie ? -1 : parseInt(process.env.SESSION_DURATION)
    }
});
exports.getTokenCookieOptions = getTokenCookieOptions;
class UserHandler extends Handler_1.Handler {
    async selectAll() {
        return this.success(await new UserModel_1.UserModel().selectAll(), 200);
    }
    async create(req) {
        const { id } = await new UserModel_1.UserModel().create(req.body);
        return this.success({ id }, 201);
    }
    async login(req) {
        const user = await new UserModel_1.UserModel().login(req.body.username, req.body.password);
        const token = (0, jwt_1.sign)(user);
        return this.success({ username: user.username }, 200, {
            cookie: (0, exports.getTokenCookieOptions)(token)
        });
    }
    async update(req) {
        await new UserModel_1.UserModel().update(req.session.id, req.body);
        let cookie;
        if (req.body.username) {
            cookie = {
                cookie: (0, exports.getTokenCookieOptions)((await UserHandler.refreshToken(req.cookies.token)))
            };
        }
        return this.success(null, 204, cookie);
    }
    async loginFromToken(req) {
        if (!req.cookies.token)
            throw new ApiError_1.ApiError('BAD_TOKEN', 401);
        const session = UserHandler.checkToken(req.cookies.token);
        if (!session)
            throw new ApiError_1.ApiError('BAD_TOKEN', 401);
        const { username } = session;
        return this.success({ username }, 200);
    }
    async logout(req) {
        return this.success(null, 204, {
            cookie: (0, exports.getTokenCookieOptions)(req.cookies.token, true)
        });
    }
    static checkToken(token) {
        if (!token)
            return null;
        try {
            return (0, jwt_1.verify)(token);
        }
        catch (e) {
            return null;
        }
    }
    static async refreshToken(token) {
        const session = UserHandler.checkToken(token);
        if (!session)
            throw new ApiError_1.ApiError('BAD_TOKEN', 401);
        const user = await new UserModel_1.UserModel().selectFromId(session.id);
        if (!user)
            return;
        return (0, jwt_1.sign)(user);
    }
}
exports.UserHandler = UserHandler;
//# sourceMappingURL=UserHandler.js.map