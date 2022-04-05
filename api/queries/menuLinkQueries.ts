import { sqlValues } from '../../helpers/sqlValues';
import { MenuLinkPayload } from '$types/menuLink';

export const menuLinksSelect = () => `
    SELECT  ml.id, ml.text, COALESCE(p.path, ml.href) AS href, ml.target, ml.icon
    FROM menu_links ml
    LEFT JOIN pages p ON p.id = ml.page_id`;

const menuLinkInsertQuery = `
    INSERT INTO menu_links (text, icon, page_id, href, target) 
    VALUES (:text, :icon, :pageId, :href, :target)`;

export const menuLinkInsert = (payload: MenuLinkPayload) => sqlValues(payload, menuLinkInsertQuery);

const menuLinkUpdateQuery = `
    UPDATE menu_links
    SET text= COALESCE(:text, text),
        icon= COALESCE(:icon, icon),
        page_id= COALESCE(:pageId, page_id),
        href= COALESCE(:href, href),
        target= COALESCE(:target, target)
    WHERE id = :id`;

export const menuLinkUpdate = (id: number, payload: Partial<MenuLinkPayload>) =>
    sqlValues({ ...payload, id }, menuLinkUpdateQuery);

const menuLinkDeleteQuery = `DELETE FROM menu_links WHERE id = :id`;

export const menuLinkDelete = (id: number) => sqlValues({ id }, menuLinkDeleteQuery);
