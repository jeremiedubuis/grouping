import { sqlValues } from '../../helpers/sqlValues';
import type { MapPayload } from '$types/map';

const mapsSelectQuery = `
    SELECT id, name, description
    FROM maps`;

export const mapsSelect = () => mapsSelectQuery;

const mapSelectQuery = `
    SELECT m.name, m.description,
           me.id,
           g.id AS group_id, g.name AS group_name, g.description AS group_description,
           ga.path AS group_picture, ga.thumbnail AS group_thumbnail,
           COALESCE(me.node_value, g.default_node_value) AS group_node_value,
           COALESCE(me.node_color, g.default_node_color) AS group_node_color,
           i.id AS individual_id, i.firstname As individual_firstname, i.lastname AS individual_lastname,
           i.description AS individual_description,
           ia.path AS individual_picture, ia.thumbnail AS individual_thumbnail,
           COALESCE(me.node_value, i.default_node_value) AS individual_node_value,
           COALESCE(me.node_color, i.default_node_color) AS individual_node_color
    FROM maps m
    LEFT JOIN map_entries me on m.id = me.map_id
    LEFT JOIN individuals i on me.individual_id = i.id
    LEFT JOIN assets ia ON ia.id = i.asset_id
    LEFT JOIN \`groups\` g ON me.group_id = g.id
    LEFT JOIN assets ga ON ga.id = g.asset_id
    WHERE m.id = :id`;

export const mapSelect = (id: number) => sqlValues({ id }, mapSelectQuery);

const mapInsertQuery = `
    INSERT INTO maps (name, description)
    VALUES (:name, :description)`;

export const mapInsert = (payload: MapPayload) => sqlValues(payload, mapInsertQuery);

const mapUpdateQuery = `
    UPDATE maps 
    SET name = COALESCE(:name,name), 
        description=COALESCE(:description, description)
    WHERE id = :id`;

export const mapUpdate = (id: number, payload: Partial<MapPayload>) =>
    sqlValues({ id, ...payload }, mapUpdateQuery);

const mapDeleteQuery = `DELETE FROM maps WHERE id = :id`;

export const mapDelete = (id: number) => sqlValues({ id }, mapDeleteQuery);
