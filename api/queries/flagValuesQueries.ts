import {sqlValues} from "../../helpers/sqlValues";

const insertFlagValueQuery = `INSERT INTO flag_values (flag_id, value) VALUES (:flagId, :value)`;
export const insertFlagValue = (flagId: number, value: string) => sqlValues({ flagId, value}, insertFlagValueQuery);

const updateFlagValueQuery = `UPDATE flag_values SET value = :value WHERE id = :flagValueId`;
export const updateFlagValue = (flagValueId: number, value: string) =>  sqlValues({flagValueId, value}, updateFlagValueQuery);

const deleteFlagValueQuery = `DELETE FROM flag_values  WHERE id = :flagValueId`;
export const deleteFlagValue = (flagValueId: number) =>  sqlValues({flagValueId}, deleteFlagValueQuery);