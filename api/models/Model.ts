import { query } from "../database";

export class Model {
  async query(q: string, options: { onDuplicate?: Function } = {}) {
    try {
      return await query(q);
    } catch (e: any) {
      if (options.onDuplicate && e.code === "ER_DUP_ENTRY")
        return options.onDuplicate(q);

      // console.log(e);
      //console.log(q);
      throw e;
    }
  }
}
