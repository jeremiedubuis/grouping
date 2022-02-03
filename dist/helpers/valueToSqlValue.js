"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.valueToSQLValue = void 0;
const dateToMysqlDate_1 = require("./dateToMysqlDate");
const sqlstring_1 = require("sqlstring");
const valueToSQLValue = (value) => typeof value === 'string'
    ? (0, sqlstring_1.escape)(value)
    : value === null
        ? 'NULL'
        : value instanceof Date
            ? (0, sqlstring_1.escape)((0, dateToMysqlDate_1.dateToMysqlDate)(value))
            : typeof value === 'object'
                ? (0, sqlstring_1.escape)(JSON.stringify(value))
                : value;
exports.valueToSQLValue = valueToSQLValue;
//# sourceMappingURL=valueToSqlValue.js.map