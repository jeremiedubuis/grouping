"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    constructor(json, code = 500) {
        super(JSON.stringify(json));
        this.apiError = true;
        this.code = code;
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=ApiError.js.map