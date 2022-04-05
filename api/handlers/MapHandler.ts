import { Handler } from '$handlers/Handler';
import { Request } from '$types/server';
import { MapModel } from '$models/MapModel';
import { MapEntryModel } from '$models/MapEntryModel';
import { LinkModel } from '$models/LinkModel';
import { IndividualModel } from '$models/IndividualModel';
import { ApiError } from '../ApiError';
import { DetailedMap } from '$types/map';

export class MapHandler extends Handler {
    async selectMaps() {
        return this.success(await new MapModel().selectMaps(), 200);
    }

    async selectMap(req: Request) {
        const mapId = parseInt(req.params.id);
        const _map: Omit<DetailedMap, 'links'> = await new MapModel().selectMap(mapId);
        const links = await new LinkModel().selectAll();
        return this.success(
            {
                ..._map,
                links: links.filter((l) => {
                    if (l.g1_id) {
                        if (!_map.groups.find((g) => g.id === l.g1_id)) return false;
                    } else {
                        if (!_map.individuals.find((i) => i.id === l.i1_id)) return false;
                    }

                    if (l.g2_id) {
                        if (_map.groups.find((g) => g.id === l.g2_id)) return true;
                    } else {
                        if (_map.individuals.find((i) => i.id === l.i2_id)) return true;
                    }
                    return false;
                })
            } as DetailedMap,
            200
        );
    }

    async mapFillFromIndividualLinks(req: Request) {
        const mapId = parseInt(req.params.id);
        const individual = await new IndividualModel().selectFromId(req.body.individualId);
        if (!individual) throw new ApiError('NOT_FOUND', 500);
        const { individuals, groups } = await new LinkModel().selectIndividualLink(
            req.body.individualId
        );
        const mapEntryModel = new MapEntryModel();
        try {
            await mapEntryModel.insertMapEntry({
                mapId,
                individualId: req.body.individualId,
                nodeColor: individual.defaultNodeColor,
                nodeValue: individual.defaultNodeValue
            });
        } catch (e) {}
        await Promise.all(
            individuals.map(async ({ id, defaultNodeColor, defaultNodeValue }) => {
                try {
                    await mapEntryModel.insertMapEntry({
                        mapId,
                        individualId: id,
                        nodeColor: defaultNodeColor,
                        nodeValue: defaultNodeValue
                    });
                } catch (e) {}
            })
        );
        await Promise.all(
            groups.map(async ({ id, defaultNodeColor, defaultNodeValue }) => {
                try {
                    await mapEntryModel.insertMapEntry({
                        mapId,
                        groupId: id,
                        nodeColor: defaultNodeColor,
                        nodeValue: defaultNodeValue
                    });
                } catch (e) {}
            })
        );
        return this.success(await new MapModel().selectMap(mapId), 200);
    }

    async createMap(req: Request) {
        const id = await new MapModel().insertMap(req.body);
        return this.success({ id }, 201);
    }

    async updateMap(req: Request) {
        await new MapModel().updateMap(parseInt(req.params.id), req.body);
        return this.success(null, 204);
    }

    async deleteMap(req: Request) {
        await new MapModel().deleteMap(parseInt(req.params.id));
        return this.success(null, 204);
    }

    async createMapEntry(req: Request) {
        const id = await new MapEntryModel().insertMapEntry(req.body);
        return this.success({ id }, 201);
    }

    async updateMapEntry(req: Request) {
        await new MapEntryModel().updateMapEntry(parseInt(req.params.id), req.body);
        return this.success(null, 204);
    }

    async deleteMapEntry(req: Request) {
        await new MapEntryModel().deleteMapEntry(parseInt(req.params.id));
        return this.success(null, 204);
    }
}
