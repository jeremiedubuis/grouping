import { Model } from '$models/Model';
import { mapDelete, mapInsert, mapUpdate } from '$queries/mapQueries';
import type { MapPayload } from '$types/map';

export class MapModel extends Model {
    async insertMap(payload: MapPayload) {
        const { insertId } = await this.query(mapInsert(payload));
        return insertId;
    }
    async updateMap(id: number, payload: Partial<MapPayload>) {
        await this.query(mapUpdate(id, payload));
    }
    async deleteMap(id: number) {
        await this.query(mapDelete(id));
    }
}
