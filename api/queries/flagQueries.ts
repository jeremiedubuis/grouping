import {sqlValues} from "../../helpers/sqlValues";

const insertFlagQuery = `INSERT INTO flags (name) VALUES (:name)`
export const insertFlag = (name: string) =>  sqlValues({name}, insertFlagQuery);

const updateFlagQuery = `UPDATE flags SET name = :name WHERE id = :flagId`;
export const updateFlag = (flagId: number, name: string) =>  sqlValues({flagId, name}, updateFlagQuery);

const deleteFlagQuery = `DELETE FROM flags  WHERE id = :flagId`;
export const deleteFlag = (flagId: number) =>  sqlValues({flagId}, deleteFlagQuery);

const selectFlagsQuery = `
    SELECT f.id, f.name, fv.id as flagValueId, fv.value as flagValue
    FROM flags f
    LEFT JOIN flag_values fv on f.id = fv.flag_id`;

export const selectFlags = () => selectFlagsQuery;