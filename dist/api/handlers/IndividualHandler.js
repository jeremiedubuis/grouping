"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndividualHandler = void 0;
const Handler_1 = require("./Handler");
const IndividualModel_1 = require("../models/IndividualModel");
const AssetModel_1 = require("../models/AssetModel");
const slugify_1 = require("../../shared/helpers/slugify");
class IndividualHandler extends Handler_1.Handler {
    async selectAll() {
        return this.success(await new IndividualModel_1.IndividualModel().selectAll(), 200);
    }
    async create(req) {
        if (req.body.picture) {
            const asset = await new AssetModel_1.AssetModel().insertAsset(req.body.picture, (0, slugify_1.slugify)(req.body.lastname + ' ' + req.body.firstname), 'individuals', { thumbnail: true });
            req.body.assetId = asset.id;
        }
        const id = await new IndividualModel_1.IndividualModel().create(req.body);
        return this.success({ id }, 201);
    }
    async update(req) {
        if (req.body.picture) {
            const asset = await new AssetModel_1.AssetModel().insertAsset(req.body.picture, (0, slugify_1.slugify)(req.body.lastname + ' ' + req.body.firstname), 'groups', { thumbnail: true });
            req.body.assetId = asset.id;
        }
        await new IndividualModel_1.IndividualModel().update(Object.assign({ individualId: parseInt(req.params.individualId) }, req.body));
        return this.success(null, 204);
    }
    async delete(req) {
        await new IndividualModel_1.IndividualModel().delete(parseInt(req.params.individualId));
        return this.success(null, 204);
    }
}
exports.IndividualHandler = IndividualHandler;
//# sourceMappingURL=IndividualHandler.js.map