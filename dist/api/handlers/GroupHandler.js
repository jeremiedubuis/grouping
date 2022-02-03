"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupHandler = void 0;
const Handler_1 = require("./Handler");
const GroupModel_1 = require("../models/GroupModel");
const AssetModel_1 = require("../models/AssetModel");
const slugify_1 = require("../../shared/helpers/slugify");
class GroupHandler extends Handler_1.Handler {
    async create(req) {
        if (req.body.picture) {
            const asset = await new AssetModel_1.AssetModel().insertAsset(req.body.picture, (0, slugify_1.slugify)(req.body.name), 'groups', { thumbnail: true });
            req.body.assetId = asset.id;
        }
        const id = await new GroupModel_1.GroupModel().create(req.body);
        return this.success({ id }, 201);
    }
    async update(req) {
        if (req.body.picture) {
            const asset = await new AssetModel_1.AssetModel().insertAsset(req.body.picture, (0, slugify_1.slugify)(req.body.name), 'groups', { thumbnail: true });
            req.body.assetId = asset.id;
        }
        await new GroupModel_1.GroupModel().update(parseInt(req.params.groupId), req.body);
        return this.success(null, 204);
    }
    async delete(req) {
        await new GroupModel_1.GroupModel().delete(parseInt(req.params.groupId));
        return this.success(null, 204);
    }
    async selectTypes() {
        return this.success(await new GroupModel_1.GroupModel().selectGroupTypes(), 200);
    }
    async selectAll() {
        return this.success(await new GroupModel_1.GroupModel().selectAll(), 200);
    }
    async selectFromId(req) {
        return this.success(await new GroupModel_1.GroupModel().selectFromId(parseInt(req.params.groupId)));
    }
}
exports.GroupHandler = GroupHandler;
//# sourceMappingURL=GroupHandler.js.map