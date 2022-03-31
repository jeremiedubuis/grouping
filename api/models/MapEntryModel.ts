import { Model } from '$models/Model';
import { MapEntryPayload } from '$types/map';
import { mapEntryDelete, mapEntryInsert, mapEntryUpdate } from '$queries/mapEntryQueries';

export class MapEntryModel extends Model {
    async insertMapEntry(payload: MapEntryPayload) {
        const { insertId } = await this.query(mapEntryInsert(payload));
        return insertId;
    }
    async updateMapEntry(id: number, payload: Partial<MapEntryPayload>) {
        await this.query(mapEntryUpdate(id, payload));
    }
    async deleteMapEntry(id: number) {
        await this.query(mapEntryDelete(id));
    }
}
