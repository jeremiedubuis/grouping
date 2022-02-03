import {
    selectFromId,
    selectForLogin,
    insertUser,
    updateUser,
    selectAll
} from '$queries/userQueries';
import { hash, verify } from 'argon2';
import type { RowDataPacket } from 'mysql2';
import type { SessionType } from '$types/general';
import { Model } from './Model';
import { ApiError } from '../ApiError';
import { UserPayload } from '$types/user';

export class UserModel extends Model {
    async selectFromId(id: number) {
        const r = (await this.query(selectFromId(id))) as RowDataPacket[];
        return r.length
            ? {
                  username: r[0].username,
                  id
              }
            : null;
    }

    async selectAll() {
        return await this.query(selectAll());
    }

    async login(username: string, password: string): Promise<SessionType> {
        const r = (await this.query(selectForLogin(username))) as RowDataPacket[];
        if (!r.length || !(await verify(r[0].password, password)))
            throw new ApiError('Login error', 401);
        return {
            id: r[0].id,
            username
        };
    }

    async create({ username, password }: UserPayload) {
        const { insertId } = await this.query(insertUser(username, await hash(password)));
        return { id: insertId };
    }

    async update(userId: number, payload: { username?: string; password?: string }) {
        if (payload.password) payload.password = await hash(payload.password);
        return await this.query(updateUser({ userId, ...payload }));
    }
}
