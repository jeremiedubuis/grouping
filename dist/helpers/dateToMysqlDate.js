"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dateToMysqlDate = void 0;
const twoDigits_1 = require("../shared/helpers/twoDigits");
const dateToMysqlDate = (date) => date.getUTCFullYear() +
    '-' +
    (0, twoDigits_1.twoDigits)(1 + date.getUTCMonth()) +
    '-' +
    (0, twoDigits_1.twoDigits)(date.getUTCDate()) +
    ' ' +
    (0, twoDigits_1.twoDigits)(date.getUTCHours()) +
    ':' +
    (0, twoDigits_1.twoDigits)(date.getUTCMinutes()) +
    ':' +
    (0, twoDigits_1.twoDigits)(date.getUTCSeconds());
exports.dateToMysqlDate = dateToMysqlDate;
//# sourceMappingURL=dateToMysqlDate.js.map