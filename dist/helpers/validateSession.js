"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSession = void 0;
const ApiError_1 = require("../api/ApiError");
const validateSession = (req, allowDisconnected) => {
    if (!allowDisconnected && !req.session) {
        throw new ApiError_1.ApiError("Unauthorized", 401);
    }
};
exports.validateSession = validateSession;
//# sourceMappingURL=validateSession.js.map