"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityFlagHandler = void 0;
const Handler_1 = require("./Handler");
const EntityFlagValueModel_1 = require("../models/EntityFlagValueModel");
class EntityFlagHandler extends Handler_1.Handler {
    async createFlaq(req) {
        const id = await new EntityFlagValueModel_1.EntityFlagValueModel().create(req.body.groupId, req.body.individualId, req.body.flagValueId);
        return this.success({ id }, 201);
    }
    async updateFlag(req) {
        await new EntityFlagValueModel_1.EntityFlagValueModel().update(req.body.groupId, req.body.individualId, req.body.flagValueId);
        return this.success(null, 204);
    }
    async deleteFlag(req) {
        await new EntityFlagValueModel_1.EntityFlagValueModel().delete(req.body.groupId, req.body.individualId, req.body.flagValueId);
        return this.success(null, 204);
    }
}
exports.EntityFlagHandler = EntityFlagHandler;
//# sourceMappingURL=EntityFlagHandler.js.map