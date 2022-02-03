"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFlagValue = exports.updateFlagValue = exports.insertFlagValue = void 0;
const sqlValues_1 = require("../../helpers/sqlValues");
const insertFlagValueQuery = `INSERT INTO flag_values (flag_id, value) VALUES (:flagId, :value)`;
const insertFlagValue = (flagId, value) => (0, sqlValues_1.sqlValues)({ flagId, value }, insertFlagValueQuery);
exports.insertFlagValue = insertFlagValue;
const updateFlagValueQuery = `UPDATE flag_values SET value = :value WHERE id = :flagValueId`;
const updateFlagValue = (flagValueId, value) => (0, sqlValues_1.sqlValues)({ flagValueId, value }, updateFlagValueQuery);
exports.updateFlagValue = updateFlagValue;
const deleteFlagValueQuery = `DELETE FROM flag_values  WHERE id = :flagValueId`;
const deleteFlagValue = (flagValueId) => (0, sqlValues_1.sqlValues)({ flagValueId }, deleteFlagValueQuery);
exports.deleteFlagValue = deleteFlagValue;
//# sourceMappingURL=flagValuesQueries.js.map