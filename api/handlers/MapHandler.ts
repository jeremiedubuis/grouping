import { Handler } from '$handlers/Handler';
import { Request } from '$types/server';
import { MapModel } from '$models/MapModel';
import { MapEntryModel } from '$models/MapEntryModel';

export class MapHandler extends Handler {
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
