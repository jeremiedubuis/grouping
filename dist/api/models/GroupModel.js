"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupModel = void 0;
const Model_1 = require("./Model");
const groupQueries_1 = require("../queries/groupQueries");
const slugify_1 = require("../../shared/helpers/slugify");
const ApiError_1 = require("../ApiError");
const mapSQLGroups_1 = require("../mappers/mapSQLGroups");
class GroupModel extends Model_1.Model {
    async create(payload) {
        try {
            const nameSlug = (0, slugify_1.slugify)(payload.name);
            const { insertId } = await this.query((0, groupQueries_1.groupInsert)(payload, nameSlug));
            return insertId;
        }
        catch (e) {
            if (e.code === 'ER_DUP_ENTRY') {
                throw new ApiError_1.ApiError({ message: 'GROUP_EXISTS' }, 409);
            }
            throw new ApiError_1.ApiError({ message: 'GROUP_TYPE_INVALID' }, 400);
        }
    }
    async update(id, payload) {
        await this.query((0, groupQueries_1.groupUpdate)(id, payload, payload.name ? (0, slugify_1.slugify)(payload.name) : undefined));
    }
    async delete(groupId) {
        await this.query((0, groupQueries_1.groupDelete)(groupId));
    }
    async selectGroupTypes() {
        const r = await this.query((0, groupQueries_1.groupTypesSelect)());
        return r.map(({ type }) => type);
    }
    async selectAll() {
        return (0, mapSQLGroups_1.mapSQLGroups)(await this.query((0, groupQueries_1.groupsSelect)()));
    }
    async selectFromId(groupId) {
        const r = await this.query((0, groupQueries_1.groupSelect)(groupId));
        return r.reduce((acc, curr) => {
            if (!acc)
                acc = {
                    id: curr.id,
                    name: curr.name,
                    type: curr.type,
                    picture: curr.picture,
                    groups: [],
                    individuals: []
                };
            if (curr.groupId) {
                acc.groups.push({
                    id: curr.groupId,
                    name: curr.groupName,
                    type: curr.groupType,
                    picture: curr.groupPicture
                });
            }
            if (curr.individualId)
                acc.individuals.push({
                    id: curr.individualId,
                    firstname: curr.firstname,
                    lastname: curr.lastname,
                    picture: curr.individualPicture
                });
            return acc;
        }, null);
    }
}
exports.GroupModel = GroupModel;
//# sourceMappingURL=GroupModel.js.map