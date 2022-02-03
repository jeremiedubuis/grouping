"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectIndividual = exports.selectIndividuals = exports.deleteIndividual = exports.updateIndividual = exports.updateIndividualQuery = exports.insertIndividual = void 0;
const sqlValues_1 = require("../../helpers/sqlValues");
const insertIndividualQuery = `
    INSERT INTO individuals (firstname, firstname_slug, lastname, lastname_slug,  default_node_value, default_node_color, asset_id) 
    VALUES (:firstname, :firstnameSlug, :lastname, :lastnameSlug, :defaultNodeValue, :defaultNodeColor, :assetId)`;
const insertIndividual = (payload, slugs) => (0, sqlValues_1.sqlValues)(Object.assign(Object.assign({}, payload), slugs), insertIndividualQuery);
exports.insertIndividual = insertIndividual;
exports.updateIndividualQuery = `
    UPDATE individuals SET
        firstname = COALESCE(:firstname, firstname),
        firstname_slug = COALESCE(:firstnameSlug, firstname_slug),
        lastname = COALESCE(:lastname, lastname),
        lastname_slug = COALESCE(:lastnameSlug, lastname_slug),
        asset_id = COALESCE(:assetId, asset_id),
        default_node_value = COALESCE(:defaultNodeValue, default_node_value),
        default_node_color = COALESCE(:defaultNodeColor, default_node_color)
    WHERE id = :individualId`;
const updateIndividual = (payload, slugs = {}) => (0, sqlValues_1.sqlValues)(Object.assign(Object.assign({}, payload), slugs), exports.updateIndividualQuery);
exports.updateIndividual = updateIndividual;
const deleteIndividualQuery = `
    DELETE FROM individuals WHERE id = :individualId`;
const deleteIndividual = (individualId) => (0, sqlValues_1.sqlValues)({ individualId }, deleteIndividualQuery);
exports.deleteIndividual = deleteIndividual;
const selectIndividualsQuery = `
    SELECT 
           i.id, i.firstname, i.lastname, i.default_node_value AS defaultNodeValue, i.default_node_color AS defaultNodeColor,  
           a.path AS picture, a.thumbnail,
           f.id AS flagId, f.name AS flagName, ifv.id as entityFlagId, fv.value AS flagValue, fv.id As flagValueId
    FROM individuals i
    LEFT JOIN assets a ON a.id = i.asset_id
    LEFT JOIN entity_flag_values ifv on i.id = ifv.individual_id
    LEFT JOIN flags f ON f.id = ifv.flag_id
    LEFT JOIN flag_values fv on ifv.flag_value_id = fv.id`;
const selectIndividuals = () => selectIndividualsQuery;
exports.selectIndividuals = selectIndividuals;
const selectIndividualQuery = `${selectIndividualsQuery}
    WHERE i.lastname_slug = :lastnameSlug AND i.firstname_slug = :firstnameSlug`;
const selectIndividual = (firstnameSlug, lastnameSlug) => (0, sqlValues_1.sqlValues)({ firstnameSlug, lastnameSlug }, selectIndividualQuery);
exports.selectIndividual = selectIndividual;
//# sourceMappingURL=individualQueries.js.map