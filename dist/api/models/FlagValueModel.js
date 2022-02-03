"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlagValueModel = void 0;
const Model_1 = require("./Model");
const flagValuesQueries_1 = require("../queries/flagValuesQueries");
class FlagValueModel extends Model_1.Model {
    async create(flagId, value) {
        const { insertId } = await this.query((0, flagValuesQueries_1.insertFlagValue)(flagId, value));
        return insertId;
    }
    async update(flagValueId, value) {
        await this.query((0, flagValuesQueries_1.updateFlagValue)(flagValueId, value));
    }
    async delete(flagValueId) {
        await this.query((0, flagValuesQueries_1.deleteFlagValue)(flagValueId));
    }
}
exports.FlagValueModel = FlagValueModel;
//# sourceMappingURL=FlagValueModel.js.map