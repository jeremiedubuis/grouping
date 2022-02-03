"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlagValueHandler = void 0;
const Handler_1 = require("./Handler");
const FlagValueModel_1 = require("../models/FlagValueModel");
class FlagValueHandler extends Handler_1.Handler {
    async create(req) {
        const id = await new FlagValueModel_1.FlagValueModel().create(req.body.flagId, req.body.value);
        return this.success({ id }, 201);
    }
    async update(req) {
        await new FlagValueModel_1.FlagValueModel().update(parseInt(req.params.flagValueId), req.body.value);
        return this.success(null, 204);
    }
    async delete(req) {
        await new FlagValueModel_1.FlagValueModel().delete(parseInt(req.params.flagValueId));
        return this.success(null, 204);
    }
}
exports.FlagValueHandler = FlagValueHandler;
//# sourceMappingURL=FlagValueHandler.js.map