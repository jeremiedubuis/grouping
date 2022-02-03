import { Model } from '$models/Model';
import {
    groupLinksSelect,
    individualLinksSelect,
    linkDelete,
    linkInsert,
    linksSelectAll
} from '$queries/linkQueries';
import { LinkPayload } from '$types/linkTypes';
import { ApiError } from '../ApiError';
import { mapSQLLinks } from '../mappers/mapSQLLinks';

export class LinkModel extends Model {
    async insertLink(payload: LinkPayload) {
        try {
            const { insertId } = await this.query(linkInsert(payload));
            return { id: insertId };
        } catch (e) {
            console.log(e);
            throw new ApiError('LINK_EXISTS', 409);
        }
    }

    async deleteLink(linkId: number) {
        return await this.query(linkDelete(linkId));
    }

    async selectGroupLinks(groupId: number) {
        const r = await this.query(groupLinksSelect(groupId));
        return mapSQLLinks(r);
    }

    async selectIndividualLink(individualId: number) {
        const r = await this.query(individualLinksSelect(individualId));
        return mapSQLLinks(r);
    }

    async selectAll() {
        return await this.query(linksSelectAll());
    }
}
