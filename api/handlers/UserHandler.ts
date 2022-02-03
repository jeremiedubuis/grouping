import { Handler } from './Handler';
import { UserModel } from '../models/UserModel';
import { sign, verify } from '../jwt';
import { ApiError } from '../ApiError';
import { isStringVarTruthy } from '$helpers/isStringVarTruthy';
import { Cookie, Request } from '$types/server';

export const getTokenCookieOptions = (token: string, deleteCookie?: boolean): Cookie => ({
    name: 'token',
    value: token,
    options: {
        httpOnly: true,
        sameSite: 'lax',
        domain: process.env.COOKIE_DOMAIN,
        path: '/',
        secure: !isStringVarTruthy(process.env.INSECURE_COOKIE),
        maxAge: deleteCookie ? -1 : parseInt(process.env.SESSION_DURATION)
    }
});

export class UserHandler extends Handler {
    async selectAll() {
        return this.success(await new UserModel().selectAll(), 200);
    }

    async create(req: Request) {
        const { id } = await new UserModel().create(req.body);
        return this.success({ id }, 201);
    }

    async login(req: Request) {
        const user = await new UserModel().login(req.body.username, req.body.password);
        const token = sign(user);
        return this.success({ username: user.username }, 200, {
            cookie: getTokenCookieOptions(token)
        });
    }

    async update(req: Request) {
        await new UserModel().update(req.session.id, req.body);
        let cookie;
        if (req.body.username) {
            cookie = {
                cookie: getTokenCookieOptions(
                    (await UserHandler.refreshToken(req.cookies.token)) as string
                )
            };
        }
        return this.success(null, 204, cookie);
    }

    async loginFromToken(req: Request) {
        if (!req.cookies.token) throw new ApiError('BAD_TOKEN', 401);
        const session = UserHandler.checkToken(req.cookies.token);
        if (!session) throw new ApiError('BAD_TOKEN', 401);
        const { username } = session;
        return this.success({ username }, 200);
    }

    async logout(req: Request) {
        return this.success(null, 204, {
            cookie: getTokenCookieOptions(req.cookies.token, true)
        });
    }

    static checkToken(token?: string) {
        if (!token) return null;
        try {
            return verify(token);
        } catch (e) {
            return null;
        }
    }

    static async refreshToken(token: string) {
        const session = UserHandler.checkToken(token);
        if (!session) throw new ApiError('BAD_TOKEN', 401);
        const user = await new UserModel().selectFromId(session.id);
        if (!user) return;
        return sign(user);
    }
}
