import { Model } from '$models/Model';
import { PagePayload } from '$types/page';
import { pageDelete, pageInsert, pageSelect, pageUpdate } from '$queries/pageQueries';
import { RowDataPacket } from 'mysql2';

export class PageModel extends Model {
    async select(path: string) {
        const r = await this.query(pageSelect(path));

        return r.reduce((acc, curr) => {
            if (!acc) {
                acc = {
                    id: curr.id,
                    title: curr.title,
                    meta: {
                        title: curr.meta_title,
                        description: curr.meta_description
                    },
                    template: curr.template,
                    blocks: []
                };
            }

            if (curr.block_id && !acc.blocks.find((b) => b.id === curr.block_id)) {
                acc.blocks.push({
                    id: curr.block_id,
                    title: curr.block_title,
                    subtitle: curr.block_subtitle,
                    text: curr.block_title,
                    link: curr.link_text ? { text: curr.link_text, href: curr.link_href } : null,
                    asset: curr.block_asset
                });
            }

            return acc;
        }, null);
    }

    async create(payload: PagePayload) {
        const [{ insertId }]: RowDataPacket[] = await this.query(pageInsert(payload));
        return insertId;
    }
    async update(pageId: number, payload: Partial<PagePayload>) {
        await this.query(pageUpdate(pageId, payload));
    }
    async delete(pageId: number) {
        await this.query(pageDelete(pageId));
    }
}
