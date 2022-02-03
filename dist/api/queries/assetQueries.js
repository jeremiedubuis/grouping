"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assetInsert = void 0;
const sqlValues_1 = require("../../helpers/sqlValues");
const assetInsertQuery = `
    INSERT INTO assets (path, thumbnail, mime_type)
    VALUES (:filePath, :thumbnail, :mimeType)`;
const assetInsert = (payload) => (0, sqlValues_1.sqlValues)(payload, assetInsertQuery);
exports.assetInsert = assetInsert;
//# sourceMappingURL=assetQueries.js.map