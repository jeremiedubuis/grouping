import { sqlValues } from '../../helpers/sqlValues';
import { MapEntryPayload } from '$types/map';

const mapEntryInsertQuery = `
    INSERT INTO map_entries ( map_id, individual_id, group_id, node_value, node_color)
    VALUES (:mapId, :individualId, :groupId, :nodeValue, :nodeColor)`;

export const mapEntryInsert = (payload: MapEntryPayload) => sqlValues(payload, mapEntryInsertQuery);

const mapEntryUpdateQuery = `
    UPDATE map_entries 
    SET node_value= COALESCE(:nodeValue,node_value), 
        node_color= COALESCE(:nodeColor, node_color) 
    WHERE id = :id`;

export const mapEntryUpdate = (id: number, payload: Partial<MapEntryPayload>) =>
    sqlValues({ id, ...payload }, mapEntryUpdateQuery);

const mapEntryDeleteQuery = `
    DELETE FROM map_entries WHERE id = :id`;

export const mapEntryDelete = (id: number) => sqlValues({ id }, mapEntryDeleteQuery);
