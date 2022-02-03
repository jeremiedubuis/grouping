"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapSQLIndividuals = void 0;
const mapSQLEntityFlags_1 = require("./mapSQLEntityFlags");
const mapSQLIndividuals = (results) => {
    return results.reduce((individuals, row) => {
        const individual = individuals.find(({ id }) => id === row.id) ||
            individuals[individuals.push({
                id: row.id,
                firstname: row.firstname,
                lastname: row.lastname,
                picture: row.picture,
                thumbnail: row.thumbnail,
                defaultNodeValue: row.defaultNodeValue,
                defaultNodeColor: row.defaultNodeColor,
                flags: {}
            }) - 1];
        if (row.flagName)
            individual.flags[row.flagName] = (0, mapSQLEntityFlags_1.mapSQLEntityFlags)(row);
        return individuals;
    }, []);
};
exports.mapSQLIndividuals = mapSQLIndividuals;
//# sourceMappingURL=mapSQLIndividuals.js.map