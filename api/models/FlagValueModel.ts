import {Model} from "./Model";
import {deleteFlagValue, insertFlagValue, updateFlagValue} from "../queries/flagValuesQueries";

export class FlagValueModel extends Model {

    async create(flagId:number, value: string) {
        const { insertId } = await this.query(insertFlagValue(flagId, value));
        return insertId;
    }

    async update(flagValueId: number, value: string) {
        await this.query(updateFlagValue(flagValueId, value))
    }

    async delete(flagValueId: number) {
        await this.query(deleteFlagValue(flagValueId))
    }
}