import { sqlValues } from '../../helpers/sqlValues';
import { LinkPayload } from '$types/linkTypes';

const linkInsertQuery = `
    INSERT INTO links ( individual_id, group_id, individual2_id, group2_id, type)
    VALUES (:individualId, :groupId, :individual2Id , :group2Id, :type)`;

export const linkInsert = (payload: LinkPayload) => sqlValues(payload, linkInsertQuery);

const linkDeleteQuery = `
    DELETE FROM links 
    WHERE id = :linkId`;

export const linkDelete = (linkId: number) => sqlValues({ linkId }, linkDeleteQuery);

const groupLinksSelectQuery = `
    SELECT  l.id, l.type, i2.id AS individualId, i2.firstname, i2.lastname,
            i2_a.path As individualPicture,
           g2.id AS groupId, g2.name AS groupName, gt2.type AS groupType, g2_a.path AS groupPicture
    FROM links l
    LEFT JOIN groups g2 ON (l.group_id = g2.id OR l.group2_id = g2.id) AND g2.id != :groupId
    LEFT JOIN assets g2_a ON g2.asset_id = g2_a.id
    LEFT JOIN individuals i2 on l.individual2_id = i2.id OR l.individual_id = i2.id
    LEFT JOIN assets i2_a ON i2_a.id = i2.asset_id
    LEFT JOIN group_types gt2 on g2.group_type_id = gt2.id
    WHERE l.group2_id = :groupId OR  l.group_id = :groupId`;

export const groupLinksSelect = (groupId: number) => sqlValues({ groupId }, groupLinksSelectQuery);

const individualLinksSelectQuery = `
    SELECT  l.id, l.type,  i2.id AS individualId, i2.firstname, i2.lastname,
            i2_a.path As individualPicture,
            g2.id AS groupId, g2.name AS groupName, gt2.type AS groupType, g2_a.path AS groupPicture
    FROM links l
             LEFT JOIN groups g2 ON (l.group_id = g2.id OR l.group2_id = g2.id)
             LEFT JOIN assets g2_a ON g2.asset_id = g2_a.id
             LEFT JOIN individuals i2 on (l.individual2_id = i2.id OR l.individual_id = i2.id) AND i2.id != :individualId
             LEFT JOIN assets i2_a ON i2_a.id = i2.asset_id
             LEFT JOIN group_types gt2 on g2.group_type_id = gt2.id
    WHERE l.individual_id = :individualId OR l.individual2_id = :individualId`;

export const individualLinksSelect = (individualId: number) =>
    sqlValues({ individualId }, individualLinksSelectQuery);

export const linksSelectAll = () => `
SELECT l.type, i.id AS i1_id, i.firstname AS i1_firstname, i.lastname AS i1_lastname,
       i_a.path As i1_picture,
       g1.id AS g1_id, g1.name AS g1_name, gt1.type AS g1_type, g1_a.path AS g1_picture,g1_a.thumbnail AS g1_thumbnail,
       i2.id AS i2_id, i2.firstname AS i2_firstname, i2.lastname AS i2_lastname,
       i2_a.path As i2_picture,
       g2.id AS g2_id, g2.name AS g2_name, gt2.type AS g2_type, g2_a.path AS g2_picture,g2_a.thumbnail AS g2_thumbnail
FROM links l
         LEFT JOIN individuals i on l.individual_id = i.id
         LEFT JOIN assets i_a ON i_a.id = i.asset_id
         LEFT JOIN groups g1 on l.group_id = g1.id
         LEFT JOIN assets g1_a ON g1_a.id = g1.asset_id
         LEFT JOIN group_types gt1 on g1.group_type_id = gt1.id
         LEFT JOIN individuals i2 on l.individual2_id = i2.id
         LEFT JOIN assets i2_a ON i2_a.id = i2.asset_id
         LEFT JOIN groups g2 on l.group2_id = g2.id
         LEFT JOIN assets g2_a ON g2_a.id = g2.asset_id
         LEFT JOIN group_types gt2 on g2.group_type_id = gt2.id`;
