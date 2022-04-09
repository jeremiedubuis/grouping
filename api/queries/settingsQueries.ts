import { sqlValues } from '../../helpers/sqlValues';

const settingsInsertQuery = `
    INSERT INTO settings ( name, asset_id, data) 
    VALUES (:name, :assetId, :data)`;

export const settingsInsert = (name: string, assetId?: number, data?: any) =>
    sqlValues({ name, assetId, data }, settingsInsertQuery);

const settingsUpdateQuery = `
    UPDATE settings SET 
    asset_id = COALESCE(:assetId,asset_id),
    data = COALESCE(:data, data)
    WHERE name = :name`;

export const settingsUpdate = (assetId?: number, data?: any) =>
    sqlValues({ assetId, data }, settingsUpdateQuery);
