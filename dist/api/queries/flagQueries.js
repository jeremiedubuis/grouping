"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectFlags = exports.deleteFlag = exports.updateFlag = exports.insertFlag = void 0;
const sqlValues_1 = require("../../helpers/sqlValues");
const insertFlagQuery = `INSERT INTO flags (name) VALUES (:name)`;
const insertFlag = (name) => (0, sqlValues_1.sqlValues)({ name }, insertFlagQuery);
exports.insertFlag = insertFlag;
const updateFlagQuery = `UPDATE flags SET name = :name WHERE id = :flagId`;
const updateFlag = (flagId, name) => (0, sqlValues_1.sqlValues)({ flagId, name }, updateFlagQuery);
exports.updateFlag = updateFlag;
const deleteFlagQuery = `DELETE FROM flags  WHERE id = :flagId`;
const deleteFlag = (flagId) => (0, sqlValues_1.sqlValues)({ flagId }, deleteFlagQuery);
exports.deleteFlag = deleteFlag;
const selectFlagsQuery = `
    SELECT f.id, f.name, fv.id as flagValueId, fv.value as flagValue
    FROM flags f
    LEFT JOIN flag_values fv on f.id = fv.flag_id`;
const selectFlags = () => selectFlagsQuery;
exports.selectFlags = selectFlags;
//# sourceMappingURL=flagQueries.js.map