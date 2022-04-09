import { sqlValues } from '../../helpers/sqlValues';
import { BlockPayload } from '$types/block';

const blockInsertQuery = `
    INSERT INTO blocks (title, subtitle, text, link_href, link_text, page_id, block_id, asset_id, map_id, identifier)
    VALUES (:title, :subtitle, :text, :linkHref, :linkText, :pageId, :blockId, :assetId, :mapId, :identifier)`;

export const blockInsert = (payload: BlockPayload) => sqlValues(payload, blockInsertQuery);

const blockUpdateQuery = `
    UPDATE blocks 
    SET title = COALESCE(:title, title), 
        subtitle = COALESCE(:subtitle, subtitle), 
        text = COALESCE(:text, text), 
        link_href = COALESCE(:linkHref, link_href), 
        link_text = COALESCE(:linkText, link_text),
        asset_id = COALESCE(:assetId, asset_id),
        map_id = COALESCE(:mapId, map_id),
        identifier = COALESCE(:identifier, identifier)
    WHERE id = :blockId`;

export const blockUpdate = (blockId: number, payload: Partial<BlockPayload>) =>
    sqlValues({ blockId, ...payload }, blockUpdateQuery);

const blockDeleteQuery = `DELETE FROM blocks WHERE id = :blockId`;

export const blockDelete = (blockId: number) => sqlValues({ blockId }, blockDeleteQuery);

const blockAssetSelectQuery = `
    SELECT a.id, a.path, a.mime_type, a.thumbnail
    FROM blocks b
    LEFT JOIN assets a on b.asset_id = a.id
    WHERE b.id = :id`;

export const blockAssetSelect = (id: number) => sqlValues({ id }, blockAssetSelectQuery);
