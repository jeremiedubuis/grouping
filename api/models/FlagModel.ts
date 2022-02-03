import { Model } from "./Model";
import {
  deleteFlag,
  insertFlag,
  selectFlags,
  updateFlag,
} from "../queries/flagQueries";
import { mapSQLFlags } from "../mappers/mapSQLFlags";

export class FlagModel extends Model {
  async selectAll() {
    const r = await this.query(selectFlags());
    return mapSQLFlags(r);
  }

  async create(name: string) {
    const { insertId } = await this.query(insertFlag(name));
    return insertId;
  }

  async update(flagId: number, name: string) {
    await this.query(updateFlag(flagId, name));
  }

  async delete(flagId: number) {
    await this.query(deleteFlag(flagId));
  }
}
