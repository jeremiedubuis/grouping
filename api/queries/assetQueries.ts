import { sqlValues } from '../../helpers/sqlValues';
import { AssetPayload } from '$types/asset';

const assetInsertQuery = `
    INSERT INTO assets (path, thumbnail, mime_type)
    VALUES (:filePath, :thumbnail, :mimeType)`;

export const assetInsert = (payload: AssetPayload) => sqlValues(payload, assetInsertQuery);
