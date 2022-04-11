import { Handler } from './Handler';
import { IndividualModel } from '$models/IndividualModel';
import { Request } from '$types/server';
import { AssetModel } from '$models/AssetModel';
import { slugify } from '$helpers/slugify';

export class IndividualHandler extends Handler {
    async selectAll() {
        return this.success(await new IndividualModel().selectAll(), 200);
    }
    async select(req: Request) {
        return this.success(
            await new IndividualModel().selectFromId(parseInt(req.params.individualId)),
            200
        );
    }

    async create(req: Request) {
        if (req.body.picture) {
            const asset = await new AssetModel().insertAsset(
                req.body.picture,
                slugify(req.body.lastname + ' ' + req.body.firstname),
                'individuals',
                { thumbnail: true }
            );
            req.body.assetId = asset.id;
        }

        const { id, slug } = await new IndividualModel().create(req.body);
        return this.success({ id, slug }, 201);
    }

    async update(req: Request) {
        if (req.body.picture) {
            const asset = await new AssetModel().insertAsset(
                req.body.picture,
                slugify(req.body.lastname + ' ' + req.body.firstname),
                'groups',
                { thumbnail: true }
            );
            req.body.assetId = asset.id;
        }
        await new IndividualModel().update({
            individualId: parseInt(req.params.individualId),
            ...req.body
        });
        return this.success(null, 204);
    }

    async delete(req: Request) {
        await new IndividualModel().delete(parseInt(req.params.individualId));
        return this.success(null, 204);
    }
}
