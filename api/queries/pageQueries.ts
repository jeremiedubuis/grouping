import { sqlValues } from '../../helpers/sqlValues';
import { PagePayload } from '$types/page';

const pageSelectQuery = `
    SELECT p.id, p.title, p.template, p.meta_title, p.meta_description,
           b.id AS block_id, b.title AS block_title, b.subtitle AS block_subtitle, b.text AS block_text,
           b.link_text AS block_link_text, b.link_href As block_link_href,
           a.path AS block_asset
    FROM pages p
    LEFT JOIN blocks b ON b.page_id = p.id
    LEFT JOIN assets a on b.asset_id = a.id
    WHERE p.path = :path`;

export const pageSelect = (path: string) => sqlValues({ path }, pageSelectQuery);

const pageInsertQuery = `
    INSERT INTO pages (path, title, template, meta_title, meta_description)
    VALUES (:path, :title, :template, :metaTitle, :metaDescription)`;

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
