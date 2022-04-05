import { Model } from '$models/Model';
import {
    menuLinkDelete,
    menuLinkInsert,
    menuLinksSelect,
    menuLinkUpdate
} from '$queries/menuLinkQueries';
import { MenuLinkPayload } from '$types/menuLink';

export class MenuLinkModel extends Model {
    async selectMenuLinks() {
        return await this.query(menuLinksSelect());
    }

    async createMenuLink(payload: MenuLinkPayload) {
        await this.query(menuLinkInsert(payload));
        return await this.selectMenuLinks();
    }
    async updateMenuLink(id: number, payload: Partial<MenuLinkPayload>) {
        await this.query(menuLinkUpdate(id, payload));
    }
    async deleteMenULink(id: number) {
        await this.query(menuLinkDelete(id));
    }
}
