"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handler = void 0;
const cookie_1 = __importDefault(require("cookie"));
const ApiError_1 = require("../ApiError");
class Handler {
    constructor(res) {
        this.res = res;
    }
    static handle(method) {
        return async (req, res) => {
            const instance = new this(res);
            if (typeof instance[method] !== 'function')
                throw `${method} is not implemented on Handler ${instance.constructor.name}`;
            const success = async (response, code = 200, successOptions) => {
                return instance.success(response, code, successOptions);
            };
            try {
                return (await instance[method](req, { success }));
            }
            catch (e) {
                return await instance.error(e);
            }
        };
    }
    success(response, code = 200, options) {
        this.res.statusCode = code;
        if (options === null || options === void 0 ? void 0 : options.cookie) {
            this.res.setHeader('Set-Cookie', cookie_1.default.serialize(options.cookie.name, options.cookie.value, options.cookie.options));
        }
        const str = JSON.stringify(response);
        this.res.end(str);
        return response;
    }
    error(err, code = 500) {
        if (!(err instanceof ApiError_1.ApiError)) {
            console.log(err);
            err = new ApiError_1.ApiError('UNKNOWN', code || 500);
        }
        this.res.statusMessage = `Error: ${err.name}`;
        this.res.statusCode = err.code;
        this.res.setHeader('content-type', 'application/json');
        this.res.end(JSON.stringify({ message: err.message }));
        return;
    }
}
exports.Handler = Handler;
//# sourceMappingURL=Handler.js.map