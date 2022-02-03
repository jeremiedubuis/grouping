"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndividualModel = void 0;
const Model_1 = require("./Model");
const individualQueries_1 = require("../queries/individualQueries");
const mapSQLIndividuals_1 = require("../mappers/mapSQLIndividuals");
const slugify_1 = require("../../shared/helpers/slugify");
const ApiError_1 = require("../ApiError");
class IndividualModel extends Model_1.Model {
    async selectAll() {
        const r = await this.query((0, individualQueries_1.selectIndividuals)());
        return (0, mapSQLIndividuals_1.mapSQLIndividuals)(r);
    }
    async select(firstname, lastname) {
        const r = await this.query((0, individualQueries_1.selectIndividual)((0, slugify_1.slugify)(firstname), (0, slugify_1.slugify)(lastname)));
        if (!r.length)
            return null;
        return (0, mapSQLIndividuals_1.mapSQLIndividuals)(r)[0];
    }
    async create(payload) {
        try {
            const { insertId } = await this.query((0, individualQueries_1.insertIndividual)(payload, {
                firstnameSlug: (0, slugify_1.slugify)(payload.firstname),
                lastnameSlug: (0, slugify_1.slugify)(payload.lastname),
            }));
            return insertId;
        }
        catch (e) {
            if (e.code === "ER_DUP_ENTRY") {
                throw new ApiError_1.ApiError({ message: "INDIVIDUAL_EXISTS" }, 409);
            }
        }
    }
    async update(payload) {
        const slugs = {};
        if (payload.firstname)
            slugs.firstnameSlug = (0, slugify_1.slugify)(payload.firstname);
        if (payload.lastname)
            slugs.lastnameSlug = (0, slugify_1.slugify)(payload.lastname);
        await this.query((0, individualQueries_1.updateIndividual)(payload, slugs));
    }
    async delete(individualId) {
        await this.query((0, individualQueries_1.deleteIndividual)(individualId));
    }
}
exports.IndividualModel = IndividualModel;
//# sourceMappingURL=IndividualModel.js.map