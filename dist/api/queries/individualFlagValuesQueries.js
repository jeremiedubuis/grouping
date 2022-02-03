"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteIndividualFlagValue = exports.updateIndividualFlagValue = exports.insertIndividualFlagValue = void 0;
const sqlValues_1 = require("../../helpers/sqlValues");
const insertIndividualFlagValueQuery = `
    INSERT INTO individual_flag_values (individual_id, flag_value_id, flag_id) 
    SELECT :individualId, :flagValueId, fv.flag_id
    FROM flag_values fv 
    WHERE fv.id = :flagValueId`;
const insertIndividualFlagValue = (individualId, flagValueId) => (0, sqlValues_1.sqlValues)({ individualId, flagValueId }, insertIndividualFlagValueQuery);
exports.insertIndividualFlagValue = insertIndividualFlagValue;
const updateIndividualFlagValueQuery = `
    UPDATE individual_flag_values ifv
    INNER JOIN flag_values fv ON fv.id = :flagValueId
    SET ifv.flag_value_id= :flagValueId 
    WHERE ifv.individual_id = :individualId AND ifv.flag_id = fv.flag_id`;
const updateIndividualFlagValue = (individualId, flagValueId) => (0, sqlValues_1.sqlValues)({ individualId, flagValueId }, updateIndividualFlagValueQuery);
exports.updateIndividualFlagValue = updateIndividualFlagValue;
const deleteIndividualFlagValueQuery = `
    DELETE FROM individual_flag_values WHERE individual_id = :individualId AND flag_value_id = :flagValueId`;
const deleteIndividualFlagValue = (individualId, flagValueId) => (0, sqlValues_1.sqlValues)({ individualId, flagValueId }, deleteIndividualFlagValueQuery);
exports.deleteIndividualFlagValue = deleteIndividualFlagValue;
//# sourceMappingURL=individualFlagValuesQueries.js.map