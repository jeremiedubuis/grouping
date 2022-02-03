import { Handler } from './Handler';
import {  Request } from '$types/server';
import {FlagValueModel} from "../models/FlagValueModel";

export class FlagValueHandler extends Handler {
    async create(req: Request) {
        const id = await new FlagValueModel().create(req.body.flagId, req.body.value);
        return this.success({id}, 201);
    }

    async update(req: Request) {
        await new FlagValueModel().update(parseInt(req.params.flagValueId), req.body.value);
        return this.success(null, 204);
    }

    async delete(req: Request) {
        await new FlagValueModel().delete(parseInt(req.params.flagValueId));
        return this.success(null, 204);
    }

}
