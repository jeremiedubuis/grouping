import { Model } from "./Model";
import {
  insertIndividual,
  updateIndividual,
  deleteIndividual,
  selectIndividuals,
  selectIndividual,
} from "../queries/individualQueries";
import type { IndividualPayload, Slugs } from "$types/individual";
import { IndividualUpdatePayload } from "$types/individual";
import { mapSQLIndividuals } from "../mappers/mapSQLIndividuals";
import { slugify } from "$helpers/slugify";
import { ApiError } from "../ApiError";
import type { QueryError } from "mysql2";

export class IndividualModel extends Model {
  async selectAll() {
    const r = await this.query(selectIndividuals());
    return mapSQLIndividuals(r);
  }

  async select(firstname: string, lastname: string) {
    const r = await this.query(
      selectIndividual(slugify(firstname), slugify(lastname))
    );
    if (!r.length) return null;
    return mapSQLIndividuals(r)[0];
  }

  async create(payload: IndividualPayload) {
    try {
      const { insertId } = await this.query(
        insertIndividual(payload, {
          firstnameSlug: slugify(payload.firstname),
          lastnameSlug: slugify(payload.lastname),
        })
      );
      return insertId;
    } catch (e) {
      if ((e as QueryError).code === "ER_DUP_ENTRY") {
        throw new ApiError({ message: "INDIVIDUAL_EXISTS" }, 409);
      }
    }
  }

  async update(payload: IndividualUpdatePayload) {
    const slugs: Partial<Slugs> = {};
    if (payload.firstname) slugs.firstnameSlug = slugify(payload.firstname);
    if (payload.lastname) slugs.lastnameSlug = slugify(payload.lastname);

    await this.query(updateIndividual(payload, slugs));
  }

  async delete(individualId: number) {
    await this.query(deleteIndividual(individualId));
  }
}
