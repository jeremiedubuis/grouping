import { sqlValues } from '../../helpers/sqlValues';
import type { IndividualPayload, IndividualUpdatePayload, Slugs } from '$types/individual';

const insertIndividualQuery = `
    INSERT INTO individuals (firstname, firstname_slug, lastname, lastname_slug,  default_node_value, default_node_color, asset_id) 
    VALUES (:firstname, :firstnameSlug, :lastname, :lastnameSlug, :defaultNodeValue, :defaultNodeColor, :assetId)`;

export const insertIndividual = (payload: IndividualPayload, slugs: Slugs) =>
    sqlValues({ ...payload, ...slugs }, insertIndividualQuery);

export const updateIndividualQuery = `
    UPDATE individuals SET
        firstname = COALESCE(:firstname, firstname),
        firstname_slug = COALESCE(:firstnameSlug, firstname_slug),
        lastname = COALESCE(:lastname, lastname),
        lastname_slug = COALESCE(:lastnameSlug, lastname_slug),
        asset_id = COALESCE(:assetId, asset_id),
        default_node_value = COALESCE(:defaultNodeValue, default_node_value),
        default_node_color = COALESCE(:defaultNodeColor, default_node_color)
    WHERE id = :individualId`;

export const updateIndividual = (payload: IndividualUpdatePayload, slugs: Partial<Slugs> = {}) =>
    sqlValues({ ...payload, ...slugs }, updateIndividualQuery);

const deleteIndividualQuery = `
    DELETE FROM individuals WHERE id = :individualId`;

export const deleteIndividual = (individualId: number) =>
    sqlValues({ individualId }, deleteIndividualQuery);

const selectIndividualsQuery = `
    SELECT 
           i.id, i.firstname, i.lastname, i.description, i.default_node_value AS defaultNodeValue, i.default_node_color AS defaultNodeColor,  
           a.path AS picture, a.thumbnail,
           f.id AS flagId, f.name AS flagName, ifv.id as entityFlagId, fv.value AS flagValue, fv.id As flagValueId
    FROM individuals i
    LEFT JOIN assets a ON a.id = i.asset_id
    LEFT JOIN entity_flag_values ifv on i.id = ifv.individual_id
    LEFT JOIN flags f ON f.id = ifv.flag_id
    LEFT JOIN flag_values fv on ifv.flag_value_id = fv.id`;

export const selectIndividuals = () => selectIndividualsQuery;

const selectIndividualQuery = `${selectIndividualsQuery}
    WHERE i.lastname_slug = :lastnameSlug AND i.firstname_slug = :firstnameSlug`;

export const selectIndividual = (firstnameSlug: string, lastnameSlug: string) =>
    sqlValues({ firstnameSlug, lastnameSlug }, selectIndividualQuery);

const selectIndividualFromIdQuery = `${selectIndividualsQuery}
    WHERE i.id = :id`;

export const selectIndividualFromId = (id: number) =>
    sqlValues({ id }, selectIndividualFromIdQuery);
