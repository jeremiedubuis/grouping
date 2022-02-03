"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkHandler = void 0;
const Handler_1 = require("./Handler");
const LinkModel_1 = require("../models/LinkModel");
const ApiError_1 = require("../ApiError");
class LinkHandler extends Handler_1.Handler {
    async create(req) {
        if (Object.keys(req.body).filter((key) => req.body[key]).length < 2)
            throw new ApiError_1.ApiError('LINK_REQUIRES_2', 400);
        return this.success(await new LinkModel_1.LinkModel().insertLink(req.body));
    }
    async delete(req) {
        return this.success(await new LinkModel_1.LinkModel().deleteLink(parseInt(req.params.linkId)));
    }
    async select(req) {
        if (req.params.individualId)
            return this.success(await new LinkModel_1.LinkModel().selectIndividualLink(parseInt(req.params.individualId)));
        if (req.params.groupId)
            return this.success(await new LinkModel_1.LinkModel().selectGroupLinks(parseInt(req.params.groupId)));
    }
    async selectAll() {
        return this.success(await new LinkModel_1.LinkModel().selectAll());
    }
}
exports.LinkHandler = LinkHandler;
//# sourceMappingURL=LinkHandler.js.map