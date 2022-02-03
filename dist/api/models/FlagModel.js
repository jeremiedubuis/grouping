"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlagModel = void 0;
const Model_1 = require("./Model");
const flagQueries_1 = require("../queries/flagQueries");
const mapSQLFlags_1 = require("../mappers/mapSQLFlags");
class FlagModel extends Model_1.Model {
    async selectAll() {
        const r = await this.query((0, flagQueries_1.selectFlags)());
        return (0, mapSQLFlags_1.mapSQLFlags)(r);
    }
    async create(name) {
        const { insertId } = await this.query((0, flagQueries_1.insertFlag)(name));
        return insertId;
    }
    async update(flagId, name) {
        await this.query((0, flagQueries_1.updateFlag)(flagId, name));
    }
    async delete(flagId) {
        await this.query((0, flagQueries_1.deleteFlag)(flagId));
    }
}
exports.FlagModel = FlagModel;
//# sourceMappingURL=FlagModel.js.map