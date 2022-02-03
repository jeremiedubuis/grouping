"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapSQLLinks = void 0;
const mapSQLLinks = (r) => r.reduce((acc, curr) => {
    if (curr.groupId) {
        acc.groups.push({
            linkId: curr.id,
            id: curr.groupId,
            name: curr.groupName,
            type: curr.groupType,
            picture: curr.groupPicture
        });
    }
    if (curr.individualId)
        acc.individuals.push({
            linkId: curr.id,
            id: curr.individualId,
            firstname: curr.firstname,
            lastname: curr.lastname,
            picture: curr.individualPicture
        });
    return acc;
}, { individuals: [], groups: [] });
exports.mapSQLLinks = mapSQLLinks;
//# sourceMappingURL=mapSQLLinks.js.map