"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.insertUser = exports.selectAll = exports.selectForLogin = exports.selectFromId = void 0;
const sqlValues_1 = require("../../helpers/sqlValues");
const selectFromIdQuery = `
    SELECT username FROM users WHERE id = :id`;
const selectFromId = (id) => (0, sqlValues_1.sqlValues)({ id }, selectFromIdQuery);
exports.selectFromId = selectFromId;
const selectForLoginQuery = `
    SELECT id, password FROM users WHERE username = :username`;
const selectForLogin = (username) => (0, sqlValues_1.sqlValues)({ username }, selectForLoginQuery);
exports.selectForLogin = selectForLogin;
const selectAll = () => `
    SELECT id, username FROM users`;
exports.selectAll = selectAll;
const insertUserQuery = `
    INSERT INTO users (username, password) VALUES(:username, :password)`;
const insertUser = (username, password) => (0, sqlValues_1.sqlValues)({ username, password }, insertUserQuery);
exports.insertUser = insertUser;
const updateUserQuery = `
    UPDATE users SET username = COALESCE(:username, username), password = COALESCE(:password, password) 
    WHERE id = :userId`;
const updateUser = (payload) => (0, sqlValues_1.sqlValues)(payload, updateUserQuery);
exports.updateUser = updateUser;
//# sourceMappingURL=userQueries.js.map