"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const userQueries_1 = require("../queries/userQueries");
const argon2_1 = require("argon2");
const Model_1 = require("./Model");
const ApiError_1 = require("../ApiError");
class UserModel extends Model_1.Model {
    async selectFromId(id) {
        const r = (await this.query((0, userQueries_1.selectFromId)(id)));
        return r.length
            ? {
                username: r[0].username,
                id
            }
            : null;
    }
    async selectAll() {
        return await this.query((0, userQueries_1.selectAll)());
    }
    async login(username, password) {
        const r = (await this.query((0, userQueries_1.selectForLogin)(username)));
        if (!r.length || !(await (0, argon2_1.verify)(r[0].password, password)))
            throw new ApiError_1.ApiError('Login error', 401);
        return {
            id: r[0].id,
            username
        };
    }
    async create({ username, password }) {
        const { insertId } = await this.query((0, userQueries_1.insertUser)(username, await (0, argon2_1.hash)(password)));
        return { id: insertId };
    }
    async update(userId, payload) {
        if (payload.password)
            payload.password = await (0, argon2_1.hash)(payload.password);
        return await this.query((0, userQueries_1.updateUser)(Object.assign({ userId }, payload)));
    }
}
exports.UserModel = UserModel;
//# sourceMappingURL=UserModel.js.map