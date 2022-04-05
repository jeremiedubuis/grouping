import { Model } from '$models/Model';
import { mapDelete, mapInsert, mapSelect, mapsSelect, mapUpdate } from '$queries/mapQueries';
import type { DetailedMap, MapPayload } from '$types/map';

export class MapModel extends Model {
    async selectMaps() {
        return await this.query(mapsSelect());
    }
    async selectMap(id: number): Promise<Omit<DetailedMap, 'links'>> {
        const r = await this.query(mapSelect(id));
        return r.reduce((acc, curr) => {
            if (!acc) {
                acc = {
                    id,
                    name: curr.name,
                    description: curr.description,
                    groups: [],
                    individuals: []
                };
            }

            if (curr.group_id && !acc.groups.find(({ id }) => id === curr.group_id)) {
                acc.groups.push({
                    entry_id: curr.id,
                    id: curr.group_id,
                    name: curr.group_name,
                    picture: curr.group_picture,
                    thumbnail: curr.group_thumbnail,
                    nodeValue: curr.group_node_value,
                    nodeColor: curr.group_node_color
                });
            }

            if (
                curr.individual_id &&
                !acc.individuals.find(({ id }) => id === curr.individual_id)
            ) {
                acc.individuals.push({
                    entry_id: curr.id,
                    id: curr.individual_id,
                    firstname: curr.individual_firstname,
                    lastname: curr.individual_lastname,
                    picture: curr.individual_picture,
                    thumbnail: curr.individual_thumbnail,
                    nodeValue: curr.individual_node_value,
                    nodeColor: curr.individual_node_color
                });
            }

            return acc;
        }, null);
    }

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
