import { Model } from './Model';
import {
    insertEntityFlagValue,
    updateEntityFlagValue,
    deleteEntityFlagValue
} from '$queries/entityFlagValuesQueries';

export class EntityFlagValueModel extends Model {
    async create(groupId: number, individualId: number, flagValueId: number) {
        const { insertId } = await this.query(
            insertEntityFlagValue(groupId, individualId, flagValueId)
        );
        return insertId;
    }

    async update(groupId: number, individualId: number, flagValueId: number) {
        await this.query(updateEntityFlagValue(groupId, individualId, flagValueId));
    }

    async delete(groupId: number, individualId: number, flagValueId: number) {
        await this.query(deleteEntityFlagValue(groupId, individualId, flagValueId));
    }
}
