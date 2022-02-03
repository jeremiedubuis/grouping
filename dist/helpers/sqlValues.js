"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpdateIfDefinedString = exports.sqlValues = void 0;
const valueToSqlValue_1 = require("./valueToSqlValue");
const sqlValues = (values, query) => Object.keys(values)
    .reduce((acc, curr) => acc.replace(new RegExp(':' + curr + '([,\\s)]|\\r\\n|\\n|\\r|$)', 'g'), (typeof values[curr] !== 'undefined' && values[curr] !== null
    ? (0, valueToSqlValue_1.valueToSQLValue)(values[curr])
    : 'NULL') + '$1'), query)
    .replace(new RegExp(':[a-zA-Z0-9_]+([,\\s)]|\\r\\n|\\n|\\r|$)', 'gm'), 'NULL$1');
exports.sqlValues = sqlValues;
const getUpdateIfDefinedString = (obj, prefix = '', precedeWithComa) => {
    if (!Object.keys(obj).length)
        return '';
    const values = [];
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && typeof obj[key] !== 'undefined')
            values.push(`${prefix}${key}=:${prefix}${key}`);
    }
    return (precedeWithComa && values.length ? ',' : '') + values.join(', ');
};
exports.getUpdateIfDefinedString = getUpdateIfDefinedString;
//# sourceMappingURL=sqlValues.js.map