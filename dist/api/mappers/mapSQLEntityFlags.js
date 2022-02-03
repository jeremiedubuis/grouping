"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapSQLEntityFlags = void 0;
const mapSQLEntityFlags = (row) => ({
    flagId: row.flagId,
    id: row.flagValueId,
    value: row.flagValue
});
exports.mapSQLEntityFlags = mapSQLEntityFlags;
//# sourceMappingURL=mapSQLEntityFlags.js.map