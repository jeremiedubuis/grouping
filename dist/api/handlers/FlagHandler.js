"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlagHandler = void 0;
const Handler_1 = require("./Handler");
const FlagModel_1 = require("../models/FlagModel");
class FlagHandler extends Handler_1.Handler {
    async selectAll() {
        return this.success(await new FlagModel_1.FlagModel().selectAll(), 200);
    }
    async create(req) {
        const id = await new FlagModel_1.FlagModel().create(req.body.name);
        return this.success({ id }, 201);
    }
    async update(req) {
        await new FlagModel_1.FlagModel().update(parseInt(req.params.flagId), req.body.name);
        return this.success(null, 204);
    }
    async delete(req) {
        await new FlagModel_1.FlagModel().delete(parseInt(req.params.flagId));
        return this.success(null, 204);
    }
}
exports.FlagHandler = FlagHandler;
//# sourceMappingURL=FlagHandler.js.map