"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapSQLGroups = void 0;
const mapSQLEntityFlags_1 = require("./mapSQLEntityFlags");
const mapSQLGroups = (results) => {
    return results.reduce((groups, row) => {
        const group = groups.find(({ id }) => id === row.id) ||
            groups[groups.push({
                id: row.id,
                name: row.name,
                type: row.type,
                picture: row.picture,
                thumbnail: row.thumbnail,
                defaultNodeValue: row.defaultNodeValue,
                defaultNodeColor: row.defaultNodeColor,
                flags: {}
            }) - 1];
        if (row.flagName)
            group.flags[row.flagName] = (0, mapSQLEntityFlags_1.mapSQLEntityFlags)(row);
        return groups;
    }, []);
};
exports.mapSQLGroups = mapSQLGroups;
//# sourceMappingURL=mapSQLGroups.js.map