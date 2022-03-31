import { Handler } from '$handlers/Handler';
import { Request } from '$types/server';
import { PageModel } from '$models/PageModel';
import { BlockModel } from '$models/BlockModel';
import { AssetModel } from '$models/AssetModel';
import { v4 } from 'uuid';

export class PageHandler extends Handler {
    async createPage(req: Request) {
        const id = await new PageModel().create(req.body);
        return this.success({ id }, 201);
    }
    async updatePage(req: Request) {
        await new PageModel().update(parseInt(req.params.id), req.body);
        return this.success(null, 204);
    }
    async deletePage(req: Request) {
        await new PageModel().delete(parseInt(req.params.id));
        return this.success(null, 204);
    }

    async createBlock(req: Request) {
        if (req.body.asset) {
            const asset = await new AssetModel().insertAsset(req.body.asset, v4(), 'blocks', {
                maxWidth: 1024
            });
            delete req.body.asset;
            req.body.assetId = asset.id;
        }
        const id = await new BlockModel().create(req.body);
        return this.success({ id }, 201);
    }

    async updateBlock(req: Request) {
        const blockModel = new BlockModel();
        const id = parseInt(req.params.id);

        if (req.body.asset) {
            const assetModel = new AssetModel();

            const oldAsset = await blockModel.assetSelect(id);
            if (oldAsset) {
                await assetModel.deleteAsset(oldAsset.id, oldAsset.path, oldAsset.thumbnail);
            }
            const asset = await assetModel.insertAsset(req.body.asset, v4(), 'blocks', {
                maxWidth: 1024
            });
            delete req.body.asset;
            req.body.assetId = asset.id;
        }
        await blockModel.update(id, req.body);
        return this.success(null, 204);
    }

    async deleteBlock(req: Request) {
        const id = parseInt(req.params.id);
        const blockModel = new BlockModel();
        const oldAsset = await blockModel.assetSelect(id);
        if (oldAsset) {
            await new AssetModel().deleteAsset(oldAsset.id, oldAsset.path, oldAsset.thumbnail);
        }
        await blockModel.delete(id);
        return this.success(null, 204);
    }
}
