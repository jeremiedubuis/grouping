import { Handler } from '$handlers/Handler';
import { Request } from '$types/server';
import { GroupModel } from '$models/GroupModel';
import { AssetModel } from '$models/AssetModel';
import { slugify } from '$helpers/slugify';

export class GroupHandler extends Handler {
    async create(req: Request) {
        if (req.body.picture) {
            const asset = await new AssetModel().insertAsset(
                req.body.picture,
                slugify(req.body.name),
                'groups',
                { thumbnail: true }
            );
            req.body.assetId = asset.id;
        }
        const id = await new GroupModel().create(req.body);
        return this.success({ id }, 201);
    }

    async update(req: Request) {
        if (req.body.picture) {
            const asset = await new AssetModel().insertAsset(
                req.body.picture,
                slugify(req.body.name),
                'groups',
                { thumbnail: true }
            );
            req.body.assetId = asset.id;
        }
        await new GroupModel().update(parseInt(req.params.groupId), req.body);
        return this.success(null, 204);
    }

    async delete(req: Request) {
        await new GroupModel().delete(parseInt(req.params.groupId));
        return this.success(null, 204);
    }

    async selectTypes() {
        return this.success(await new GroupModel().selectGroupTypes(), 200);
    }

    async selectAll() {
        return this.success(await new GroupModel().selectAll(), 200);
    }

    async selectFromId(req: Request) {
        return this.success(await new GroupModel().selectFromId(parseInt(req.params.groupId)));
    }
}
