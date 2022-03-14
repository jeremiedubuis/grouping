import { sqlValues } from '../../helpers/sqlValues';

const selectFromIdQuery = `
    SELECT username FROM users WHERE id = :id`;

export const selectFromId = (id: number) => sqlValues({ id }, selectFromIdQuery);

const selectForLoginQuery = `
    SELECT id, password FROM users WHERE username = :username`;

export const selectForLogin = (username: string) => sqlValues({ username }, selectForLoginQuery);

export const selectAll = () => `
    SELECT id, username FROM users`;

const insertUserQuery = `
    INSERT INTO users (username, password) VALUES(:username, :password)`;

export const insertUser = (username: string, password: string) =>
    sqlValues({ username, password }, insertUserQuery);

const updateUserQuery = `
    UPDATE users SET username = COALESCE(:username, username), password = COALESCE(:password, password) 
    WHERE id = :userId`;

export const updateUser = (payload: { userId: number; username?: string; password?: string }) =>
    sqlValues(payload, updateUserQuery);

const deleteUserQuery = `
    DELETE FROM users
    WHERE id = :userId`;

export const deleteUser = (userId: number) => sqlValues({ userId }, deleteUserQuery);
