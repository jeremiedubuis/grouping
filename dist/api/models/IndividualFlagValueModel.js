"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndividualFlagValueModel = void 0;
const Model_1 = require("./Model");
const individualFlagValuesQueries_1 = require("../queries/individualFlagValuesQueries");
class IndividualFlagValueModel extends Model_1.Model {
    async create(individualId, flagValueId) {
        const { insertId } = await this.query((0, individualFlagValuesQueries_1.insertIndividualFlagValue)(individualId, flagValueId));
        return insertId;
    }
    async update(individualId, flagValueId) {
        await this.query((0, individualFlagValuesQueries_1.updateIndividualFlagValue)(individualId, flagValueId));
    }
    async delete(individualId, flagValueId) {
        await this.query((0, individualFlagValuesQueries_1.deleteIndividualFlagValue)(individualId, flagValueId));
    }
}
exports.IndividualFlagValueModel = IndividualFlagValueModel;
//# sourceMappingURL=IndividualFlagValueModel.js.map