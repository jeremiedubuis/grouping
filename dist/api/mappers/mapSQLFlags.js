"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapSQLFlags = void 0;
const mapSQLFlags = (r) => r.reduce((flags, row) => {
    const flag = flags.find(({ id }) => id === row.id) ||
        flags[flags.push({ id: row.id, name: row.name, values: [] }) - 1];
    if (row.flagValueId)
        flag.values.push({ id: row.flagValueId, value: row.flagValue });
    return flags;
}, []);
exports.mapSQLFlags = mapSQLFlags;
//# sourceMappingURL=mapSQLFlags.js.map