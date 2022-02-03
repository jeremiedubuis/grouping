import { Handler } from './Handler';
import { Request } from '$types/server';
import { LinkModel } from '$models/LinkModel';
import { ApiError } from '../ApiError';

export class LinkHandler extends Handler {
    async create(req: Request) {
        if (Object.keys(req.body).filter((key) => req.body[key]).length < 2)
            throw new ApiError('LINK_REQUIRES_2', 400);
        return this.success(await new LinkModel().insertLink(req.body));
    }

    async delete(req: Request) {
        return this.success(await new LinkModel().deleteLink(parseInt(req.params.linkId)));
    }

    async select(req: Request) {
        if (req.params.individualId)
            return this.success(
                await new LinkModel().selectIndividualLink(parseInt(req.params.individualId))
            );
        if (req.params.groupId)
            return this.success(
                await new LinkModel().selectGroupLinks(parseInt(req.params.groupId))
            );
    }

    async selectAll() {
        return this.success(await new LinkModel().selectAll());
    }
}
