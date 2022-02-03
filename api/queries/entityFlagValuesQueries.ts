import { sqlValues } from '../../helpers/sqlValues';

const insertEntityFlagValueQuery = `
    INSERT INTO entity_flag_values (individual_id, group_id, flag_value_id, flag_id) 
    SELECT :individualId, :groupId, :flagValueId, fv.flag_id
    FROM flag_values fv 
    WHERE fv.id = :flagValueId`;

export const insertEntityFlagValue = (groupId: number, individualId: number, flagValueId: number) =>
    sqlValues({ groupId, individualId, flagValueId }, insertEntityFlagValueQuery);

const updateEntityFlagValueQuery = `
    UPDATE entity_flag_values ifv
    INNER JOIN flag_values fv ON fv.id = :flagValueId
    SET ifv.flag_value_id= :flagValueId 
    WHERE (ifv.individual_id = :individualId OR ifv.group_id = :groupId) AND ifv.flag_id = fv.flag_id`;

export const updateEntityFlagValue = (groupId: number, individualId: number, flagValueId: number) =>
    sqlValues({ groupId, individualId, flagValueId }, updateEntityFlagValueQuery);

const deleteEntityFlagValueQuery = `
    DELETE FROM entity_flag_values WHERE (individual_id = :individualId OR group_id= :groupId) AND flag_value_id = :flagValueId`;

export const deleteEntityFlagValue = (groupId: number, individualId: number, flagValueId: number) =>
    sqlValues({ groupId, individualId, flagValueId }, deleteEntityFlagValueQuery);
