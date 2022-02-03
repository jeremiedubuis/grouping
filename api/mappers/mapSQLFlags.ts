import { RowDataPacket } from "mysql2";
import { IndividualFlag } from "$types/flag";

type FlagResult = {
  id: number;
  name: string;
  values: Partial<IndividualFlag>[];
};

export const mapSQLFlags = (r: RowDataPacket[]) =>
  r.reduce((flags: FlagResult[], row) => {
    const flag =
      flags.find(({ id }) => id === row.id) ||
      flags[flags.push({ id: row.id, name: row.name, values: [] }) - 1];

    if (row.flagValueId)
      flag.values.push({ id: row.flagValueId, value: row.flagValue });

    return flags;
  }, []);
