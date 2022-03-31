import { sqlValues } from '../../helpers/sqlValues';
import type { MapPayload } from '$types/map';

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
