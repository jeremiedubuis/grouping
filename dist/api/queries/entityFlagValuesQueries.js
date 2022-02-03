"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEntityFlagValue = exports.updateEntityFlagValue = exports.insertEntityFlagValue = void 0;
const sqlValues_1 = require("../../helpers/sqlValues");
const insertEntityFlagValueQuery = `
    INSERT INTO entity_flag_values (individual_id, group_id, flag_value_id, flag_id) 
    SELECT :individualId, :groupId, :flagValueId, fv.flag_id
    FROM flag_values fv 
    WHERE fv.id = :flagValueId`;
const insertEntityFlagValue = (groupId, individualId, flagValueId) => (0, sqlValues_1.sqlValues)({ groupId, individualId, flagValueId }, insertEntityFlagValueQuery);
exports.insertEntityFlagValue = insertEntityFlagValue;
const updateEntityFlagValueQuery = `
    UPDATE entity_flag_values ifv
    INNER JOIN flag_values fv ON fv.id = :flagValueId
    SET ifv.flag_value_id= :flagValueId 
    WHERE (ifv.individual_id = :individualId OR ifv.group_id = :groupId) AND ifv.flag_id = fv.flag_id`;
const updateEntityFlagValue = (groupId, individualId, flagValueId) => (0, sqlValues_1.sqlValues)({ groupId, individualId, flagValueId }, updateEntityFlagValueQuery);
exports.updateEntityFlagValue = updateEntityFlagValue;
const deleteEntityFlagValueQuery = `
    DELETE FROM entity_flag_values WHERE (individual_id = :individualId OR group_id= :groupId) AND flag_value_id = :flagValueId`;
const deleteEntityFlagValue = (groupId, individualId, flagValueId) => (0, sqlValues_1.sqlValues)({ groupId, individualId, flagValueId }, deleteEntityFlagValueQuery);
exports.deleteEntityFlagValue = deleteEntityFlagValue;
//# sourceMappingURL=entityFlagValuesQueries.js.map