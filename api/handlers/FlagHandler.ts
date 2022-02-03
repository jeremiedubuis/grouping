import { Handler } from './Handler';
import {  Request } from '$types/server';
import {FlagModel} from "../models/FlagModel";

export class FlagHandler extends Handler {

    async selectAll() {
        return this.success(await new FlagModel().selectAll(), 200);
    }

    async create(req: Request) {
        const id = await new FlagModel().create(req.body.name);
        return this.success({id}, 201);
    }

    async update(req: Request) {
        await new FlagModel().update(parseInt(req.params.flagId), req.body.name);
        return this.success(null, 204);
    }

    async delete(req: Request) {
        await new FlagModel().delete(parseInt(req.params.flagId));
        return this.success(null, 204);
    }

}
