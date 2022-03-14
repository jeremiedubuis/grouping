import { Model } from './Model';
import { GroupPayload } from '$types/group';
import {
    groupDelete,
    groupInsert,
    groupSelect,
    groupsSelect,
    groupTypeInsert,
    groupTypesSelect,
    groupTypeUpdate,
    groupUpdate
} from '$queries/groupQueries';
import { slugify } from '$helpers/slugify';
import { QueryError } from 'mysql2';
import { ApiError } from '../ApiError';
import { mapSQLGroups } from '../mappers/mapSQLGroups';

export class GroupModel extends Model {
    async create(payload: GroupPayload) {
        try {
            const nameSlug = slugify(payload.name);
            const { insertId } = await this.query(groupInsert(payload, nameSlug));
            return insertId;
        } catch (e) {
            if ((e as QueryError).code === 'ER_DUP_ENTRY') {
                throw new ApiError({ message: 'GROUP_EXISTS' }, 409);
            }
            throw new ApiError({ message: 'GROUP_TYPE_INVALID' }, 400);
        }
    }

    async update(id: number, payload: Partial<GroupPayload>) {
        await this.query(
            groupUpdate(id, payload, payload.name ? slugify(payload.name) : undefined)
        );
    }

    async delete(groupId) {
        await this.query(groupDelete(groupId));
    }

    async selectAll() {
        return mapSQLGroups(await this.query(groupsSelect()));
    }

    async selectFromId(groupId: number) {
        const r = await this.query(groupSelect(groupId));
        return r.reduce((acc, curr) => {
            if (!acc)
                acc = {
                    id: curr.id,
                    name: curr.name,
                    type: curr.type,
                    picture: curr.picture,
                    groups: [],
                    individuals: []
                };

            if (curr.groupId) {
                acc.groups.push({
                    id: curr.groupId,
                    name: curr.groupName,
                    type: curr.groupType,
                    picture: curr.groupPicture
                });
            }
            if (curr.individualId)
                acc.individuals.push({
                    id: curr.individualId,
                    firstname: curr.firstname,
                    lastname: curr.lastname,
                    picture: curr.individualPicture
                });
            return acc;
        }, null);
    }

    async selectGroupTypes() {
        return await this.query(groupTypesSelect());
    }

    async insertType(type: string) {
        const { insertId } = await this.query(groupTypeInsert(type));
        return insertId;
    }

    async updateType(groupTypeId: number, type: string) {
        await this.query(groupTypeUpdate(groupTypeId, type));
    }
}
