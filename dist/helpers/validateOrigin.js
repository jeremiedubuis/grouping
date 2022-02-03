"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOrigin = void 0;
const ApiError_1 = require("../api/ApiError");
const validateOrigin = (req, ignoreOrigin) => {
    var _a;
    if (ignoreOrigin)
        return;
    if (req.headers.origin &&
        req.headers.origin !== process.env.HOST &&
        !((_a = process.env.CORS) === null || _a === void 0 ? void 0 : _a.includes(req.headers.origin))) {
        throw new ApiError_1.ApiError("Unauthorized", 401);
    }
};
exports.validateOrigin = validateOrigin;
//# sourceMappingURL=validateOrigin.js.map