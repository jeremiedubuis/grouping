"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupSelect = exports.groupsSelect = exports.groupTypesSelect = exports.groupDelete = exports.groupUpdate = exports.groupInsert = void 0;
const sqlValues_1 = require("../../helpers/sqlValues");
const groupInsertQuery = `
    INSERT INTO groups (name, name_slug, group_type_id, default_node_value, default_node_color, asset_id)
    SELECT :name, :nameSlug, gt.id, :defaultNodeValue, :defaultNodeColor, :assetId
    FROM group_types gt
    WHERE gt.type = :type`;
const groupInsert = (payload, nameSlug) => (0, sqlValues_1.sqlValues)(Object.assign(Object.assign({}, payload), { nameSlug }), groupInsertQuery);
exports.groupInsert = groupInsert;
const groupUpdateQuery = `
    UPDATE groups g
    LEFT JOIN group_types gt on gt.type = :type
    SET g.name = COALESCE(:name, g.name),
        g.name_slug = COALESCE(:nameSlug, g.name_slug),
        g.group_type_id = COALESCE(gt.id, g.group_type_id),
        g.default_node_value = COALESCE(:defaultNodeValue, g.default_node_value),
        g.default_node_color = COALESCE(:defaultNodeColor, g.default_node_color),
        g.asset_id = COALESCE(:assetId, g.asset_id)
    WHERE g.id = :id`;
const groupUpdate = (id, payload, nameSlug) => (0, sqlValues_1.sqlValues)(Object.assign(Object.assign({ id }, payload), { nameSlug }), groupUpdateQuery);
exports.groupUpdate = groupUpdate;
const groupDeleteQuery = `
    DELETE FROM groups WHERE id = :id`;
const groupDelete = (id) => (0, sqlValues_1.sqlValues)({ id }, groupDeleteQuery);
exports.groupDelete = groupDelete;
const groupTypesSelect = () => `
    SELECT type
    FROM group_types`;
exports.groupTypesSelect = groupTypesSelect;
const groupsSelect = () => `
    SELECT g.id, g.name, g.default_node_value AS defaultNodeValue, g.default_node_color AS defaultNodeColor,
           gt.type, 
           a.path AS picture, a.thumbnail AS thumbnail,
           f.id AS flagId, f.name AS flagName, ifv.id as entityFlagId, fv.value AS flagValue, fv.id As flagValueId
    FROM groups g
    LEFT JOIN assets a ON g.asset_id = a.id
    INNER JOIN group_types gt on g.group_type_id = gt.id
    LEFT JOIN entity_flag_values ifv on g.id = ifv.group_id
    LEFT JOIN flags f ON f.id = ifv.flag_id
    LEFT JOIN flag_values fv on ifv.flag_value_id = fv.id`;
exports.groupsSelect = groupsSelect;
const groupSelectQuery = `
    SELECT g.id, g.name, gt.type, g.default_node_value AS defaultNodeValue, g.default_node_color AS defaultNodeColor, g_a.path AS picture, g_a.thumbnail,
           i.id AS individualId, i.firstname, i.lastname,
           i_a.path AS individualPicture, i_a.thumbnail AS individualThumbnail,
           g2.id AS groupId, g2.name AS groupName, gt2.type AS groupType,
           g2_a.path AS groupPicture, g2_a.thumbnail AS groupThumbnail
    FROM groups g
    LEFT JOIN assets g_a ON g.asset_id = g_a.id 
    INNER JOIN group_types gt on g.group_type_id = gt.id
    LEFT JOIN links l ON g.id = l.group2_id OR g.id = l.group_id
    LEFT JOIN groups g2 ON (l.group_id = g2.id OR l.group2_id = g2.id) AND g2.id !=g.id
    LEFT JOIN assets g2_a ON g2.asset_id = g2_a.id
    LEFT JOIN individuals i on l.individual2_id = i.id OR l.individual_id = i.id
    LEFT JOIN assets i_a ON i_a.id = i.asset_id
    LEFT JOIN group_types gt2 on g2.group_type_id = gt2.id
    WHERE g.id = :groupId`;
const groupSelect = (groupId) => (0, sqlValues_1.sqlValues)({ groupId }, groupSelectQuery);
exports.groupSelect = groupSelect;
//# sourceMappingURL=groupQueries.js.map