import { Handler } from '$handlers/Handler';
import { Request } from '$types/server';
import { EntityFlagValueModel } from '$models/EntityFlagValueModel';

export class EntityFlagHandler extends Handler {
    async createFlaq(req: Request) {
        const id = await new EntityFlagValueModel().create(
            req.body.groupId,
            req.body.individualId,
            req.body.flagValueId
        );
        return this.success({ id }, 201);
    }

    async updateFlag(req: Request) {
        await new EntityFlagValueModel().update(
            req.body.groupId,
            req.body.individualId,
            req.body.flagValueId
        );
        return this.success(null, 204);
    }

    async deleteFlag(req: Request) {
        await new EntityFlagValueModel().delete(
            req.body.groupId,
            req.body.individualId,
            req.body.flagValueId
        );
        return this.success(null, 204);
    }
}
