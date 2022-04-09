import { sqlValues } from '../../helpers/sqlValues';
import { PagePayload } from '$types/page';
const pagesSelectQuery = `
    SELECT p.id, p.title, p.template, p.meta_title, p.meta_description, p.path,
           b.id AS block_id, b.title AS block_title, b.subtitle AS block_subtitle, b.text AS block_text,
           b.link_text AS block_link_text, b.link_href As block_link_href, b.map_id AS block_map_id, 
           b.identifier AS block_identifier,
           a.path AS block_asset,
           i.id AS individual_id, i.firstname As individual_firstname, i.lastname As individual_lastname,
           IF(i.id IS NOT NULL, CONCAT(i.lastname_slug,'-', i.firstname_slug), NULL) AS individual_slug,
           ia.path AS individual_picture, ia.thumbnail As individual_thumbnail, i.description As individual_description,
           g.name_slug AS group_slug,
           g.id AS group_id, g.name AS group_name,
           ga.path AS group_picture, ga.thumbnail As group_thumbnail, g.description As group_description,
           s.id As setting_id, s.name AS setting_name, s.data AS setting_data
    FROM pages p
    CROSS JOIN settings s 
    LEFT JOIN blocks b ON b.page_id = p.id
    LEFT JOIN assets a on b.asset_id = a.id
    LEFT JOIN individuals i ON p.individual_id = i.id
    LEFT JOIN assets ia ON i.asset_id = ia.id
    LEFT JOIN groups g ON p.group_id = g.id
    LEFT JOIN assets ga ON g.asset_id = ga.id`;

export const pagesSelect = () => sqlValues({}, pagesSelectQuery);

const pageSelectQuery = `${pagesSelectQuery}
    WHERE p.path = :path`;

export const pageSelect = (path: string) => sqlValues({ path }, pageSelectQuery);

const pageSelectFromIdQuery = `${pagesSelectQuery}
    WHERE p.id = :id`;

export const pageSelectFromId = (id: number) => sqlValues({ id }, pageSelectFromIdQuery);

const pageInsertQuery = `
    INSERT INTO pages (path, title, template, meta_title, meta_description, group_id, individual_id)
    VALUES (:path, :title, :template, :metaTitle, :metaDescription, :groupId, :individualId)`;

export const pageInsert = (payload: PagePayload) => sqlValues(payload, pageInsertQuery);

const pageUpdateQuery = `UPDATE pages
    SET path = COALESCE(:path, path), 
        template = COALESCE(:template, template),
        title = COALESCE(:title, title), 
        meta_title = COALESCE(:metaTitle, meta_title), 
        meta_description = COALESCE(:metaDescription, meta_description)
    WHERE id = :pageId`;

export const pageUpdate = (pageId: number, payload: Partial<PagePayload>) =>
    sqlValues({ pageId, ...payload }, pageUpdateQuery);

const pageDeleteQuery = `DELETE FROM pages WHERE id = :pageId`;

export const pageDelete = (pageId: number) => sqlValues({ pageId }, pageDeleteQuery);
