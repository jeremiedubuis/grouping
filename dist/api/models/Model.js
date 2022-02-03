"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Model = void 0;
const database_1 = require("../database");
class Model {
    async query(q, options = {}) {
        try {
            return await (0, database_1.query)(q);
        }
        catch (e) {
            if (options.onDuplicate && e.code === "ER_DUP_ENTRY")
                return options.onDuplicate(q);
            // console.log(e);
            //console.log(q);
            throw e;
        }
    }
}
exports.Model = Model;
//# sourceMappingURL=Model.js.map