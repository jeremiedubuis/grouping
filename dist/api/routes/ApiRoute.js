"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRoute = exports.imageValidator = exports.routes = void 0;
const server_1 = require("../../shared/types/server");
const fastest_validator_1 = __importDefault(require("fastest-validator"));
const validateSession_1 = require("../../helpers/validateSession");
const validateOrigin_1 = require("../../helpers/validateOrigin");
const ApiError_1 = require("../ApiError");
const cookieMiddleware_1 = require("../../helpers/cookieMiddleware");
const sessionMiddleware_1 = require("../../helpers/sessionMiddleware");
const formidable_1 = __importDefault(require("formidable"));
exports.routes = {};
const imageValidator = (optional) => ({
    type: 'custom',
    fileType: 'image',
    check: (value, errors, schema) => {
        if ((!value && !optional) ||
            !(value === null || value === void 0 ? void 0 : value.filepath) ||
            !(value === null || value === void 0 ? void 0 : value.size) ||
            !value.mimetype ||
            !value.mimetype.startsWith('image/'))
            errors.push({
                type: 'notImage',
                expected: schema.fileType,
                actual: typeof value
            });
        return value;
    }
});
exports.imageValidator = imageValidator;
class ApiRoute {
    constructor(app, route, method, handler, validation, parseMultipart) {
        // order matters
        if (validation)
            handler = this.addValidator(validation, handler);
        if (parseMultipart)
            handler = this.addFormidable(handler);
        handler = this.validateOrigin(handler, validation === null || validation === void 0 ? void 0 : validation.ignoreOrigin);
        handler = this.validateSession(handler, validation === null || validation === void 0 ? void 0 : validation.allowDisconnected);
        this.handler = this.addErrorHandler(handler);
        if (!Array.isArray(route))
            route = [route];
        route.forEach((r) => {
            this.addRoute(app, r, method);
            if (!exports.routes[r])
                exports.routes[r] = [];
            exports.routes[r].push({ method, validation });
        });
    }
    validateOrigin(handler, ignoreOrigin) {
        return async (req, res, next) => {
            (0, validateOrigin_1.validateOrigin)(req, ignoreOrigin);
            return await handler(req, res, next);
        };
    }
    validateSession(handler, allowDisconnected) {
        return async (req, res, next) => {
            (0, validateSession_1.validateSession)(req, allowDisconnected);
            return await handler(req, res, next);
        };
    }
    addFormidable(handler) {
        return async (req, res, next) => {
            try {
                const form = (0, formidable_1.default)({ multiples: true, uploadDir: process.env.UPLOAD_DIR });
                await new Promise((resolve) => {
                    form.parse(req, (_err, fields, files) => {
                        req.body = Object.assign(Object.assign(Object.assign({}, req.body), fields), files);
                        resolve();
                    });
                });
                return await handler(req, res, next);
            }
            catch (e) {
                throw e;
            }
        };
    }
    addValidator(validation, handler) {
        const v = new fastest_validator_1.default({
            useNewCustomCheckerFunction: true,
            messages: {
                notImage: 'An image was expected'
            }
        });
        let bodyValidator;
        let paramsValidator;
        let queryValidator;
        if (validation.body)
            bodyValidator = v.compile(Object.assign(Object.assign({}, validation.body), { $$strict: true }));
        if (validation.params)
            paramsValidator = v.compile(Object.assign(Object.assign({}, validation.params), { $$strict: true }));
        // always allow optional locale parameter
        queryValidator = v.compile(Object.assign(Object.assign({}, (validation.query || {})), { locale: 'string|optional', $$strict: true }));
        return async (req, res, next) => {
            let result;
            if (bodyValidator) {
                result = bodyValidator(req.body);
                if (result !== true)
                    throw new ApiError_1.ApiError(result, 400);
            }
            if (paramsValidator) {
                result = paramsValidator(req.params);
                if (result !== true)
                    throw new ApiError_1.ApiError(result, 400);
            }
            result = queryValidator(req.query);
            if (result !== true)
                throw new ApiError_1.ApiError(result, 400);
            return handler(req, res, next);
        };
    }
    addErrorHandler(handler) {
        return async (req, res, next) => {
            res.setHeader('Content-Type', 'application/json');
            try {
                return await handler(req, res, next);
            }
            catch (e) {
                if (e === null || e === void 0 ? void 0 : e.apiError) {
                    res.statusCode = e.code;
                }
                else {
                    res.statusCode = 500;
                }
                res.end(e.message);
            }
        };
    }
    addRoute(app, route, method) {
        switch (method) {
            case server_1.Method.GET:
                return app.get(route, cookieMiddleware_1.cookieMiddleware, sessionMiddleware_1.sessionMiddleware, this.handler);
            case server_1.Method.POST:
                return app.post(route, cookieMiddleware_1.cookieMiddleware, sessionMiddleware_1.sessionMiddleware, this.handler);
            case server_1.Method.PUT:
                return app.put(route, cookieMiddleware_1.cookieMiddleware, sessionMiddleware_1.sessionMiddleware, this.handler);
            case server_1.Method.DELETE:
                return app.delete(route, cookieMiddleware_1.cookieMiddleware, sessionMiddleware_1.sessionMiddleware, this.handler);
        }
    }
}
exports.ApiRoute = ApiRoute;
//# sourceMappingURL=ApiRoute.js.map