"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntityFlagValueModel = void 0;
const Model_1 = require("./Model");
const entityFlagValuesQueries_1 = require("../queries/entityFlagValuesQueries");
class EntityFlagValueModel extends Model_1.Model {
    async create(groupId, individualId, flagValueId) {
        const { insertId } = await this.query((0, entityFlagValuesQueries_1.insertEntityFlagValue)(groupId, individualId, flagValueId));
        return insertId;
    }
    async update(groupId, individualId, flagValueId) {
        await this.query((0, entityFlagValuesQueries_1.updateEntityFlagValue)(groupId, individualId, flagValueId));
    }
    async delete(groupId, individualId, flagValueId) {
        await this.query((0, entityFlagValuesQueries_1.deleteEntityFlagValue)(groupId, individualId, flagValueId));
    }
}
exports.EntityFlagValueModel = EntityFlagValueModel;
//# sourceMappingURL=EntityFlagValueModel.js.map