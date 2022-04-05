import { Model } from '$models/Model';
import { PagePayload } from '$types/page';
import {
    pageDelete,
    pageInsert,
    pageSelect,
    pageSelectFromId,
    pagesSelect,
    pageUpdate
} from '$queries/pageQueries';
import { RowDataPacket } from 'mysql2';

const mapPages = (r) =>
    r.reduce((acc, curr) => {
        const page =
            acc.find(({ id }: any) => curr.id === id) ||
            acc[
                acc.push({
                    id: curr.id,
                    path: curr.path,
                    title: curr.title,
                    meta: {
                        title: curr.meta_title,
                        description: curr.meta_description
                    },
                    template: curr.template,
                    blocks: []
                }) - 1
            ];

        if (curr.block_id && !page.blocks.find((b) => b.id === curr.block_id)) {
            page.blocks.push({
                id: curr.block_id,
                title: curr.block_title,
                subtitle: curr.block_subtitle,
                text: curr.block_text,
                link: curr.link_text ? { text: curr.link_text, href: curr.link_href } : null,
                asset: curr.block_asset,
                mapId: curr.block_map_id
            });
        }

        return acc;
    }, []);

export class PageModel extends Model {
    async selectPages() {
        const r = await this.query(pagesSelect());
        return mapPages(r);
    }

    async select(path: string) {
        const r = await this.query(pageSelect(path));
        return mapPages(r)[0];
    }

    async selectFromId(id: number) {
        const r = await this.query(pageSelectFromId(id));
        return mapPages(r)[0];
    }

    async create(payload: PagePayload) {
        const { insertId }: RowDataPacket = await this.query(pageInsert(payload));
        return insertId;
    }
    async update(pageId: number, payload: Partial<PagePayload>) {
        await this.query(pageUpdate(pageId, payload));
    }
    async delete(pageId: number) {
        await this.query(pageDelete(pageId));
    }
}
