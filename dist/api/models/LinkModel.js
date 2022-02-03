"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModel = void 0;
const Model_1 = require("./Model");
const linkQueries_1 = require("../queries/linkQueries");
const ApiError_1 = require("../ApiError");
const mapSQLLinks_1 = require("../mappers/mapSQLLinks");
class LinkModel extends Model_1.Model {
    async insertLink(payload) {
        try {
            const { insertId } = await this.query((0, linkQueries_1.linkInsert)(payload));
            return { id: insertId };
        }
        catch (e) {
            console.log(e);
            throw new ApiError_1.ApiError('LINK_EXISTS', 409);
        }
    }
    async deleteLink(linkId) {
        return await this.query((0, linkQueries_1.linkDelete)(linkId));
    }
    async selectGroupLinks(groupId) {
        const r = await this.query((0, linkQueries_1.groupLinksSelect)(groupId));
        return (0, mapSQLLinks_1.mapSQLLinks)(r);
    }
    async selectIndividualLink(individualId) {
        const r = await this.query((0, linkQueries_1.individualLinksSelect)(individualId));
        return (0, mapSQLLinks_1.mapSQLLinks)(r);
    }
    async selectAll() {
        return await this.query((0, linkQueries_1.linksSelectAll)());
    }
}
exports.LinkModel = LinkModel;
//# sourceMappingURL=LinkModel.js.map