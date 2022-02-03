"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetModel = void 0;
const Model_1 = require("./Model");
const assetQueries_1 = require("../queries/assetQueries");
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const path_1 = __importDefault(require("path"));
const ApiError_1 = require("../ApiError");
const sharp_1 = __importDefault(require("sharp"));
const fsRename = (0, util_1.promisify)(fs_1.default.rename);
const fsUnlink = (0, util_1.promisify)(fs_1.default.unlink);
const fsMkdir = (0, util_1.promisify)(fs_1.default.mkdir);
const getThumbnailPath = (filepath, width, height) => filepath.replace(/(\..*)$/, `-thmb-${width === null || width === void 0 ? void 0 : width.toString()}x${height === null || height === void 0 ? void 0 : height.toString()}$1`);
class AssetModel extends Model_1.Model {
    async insertAsset(file, name, directory, options = {}) {
        if (file.size > 5242880)
            throw new ApiError_1.ApiError('FILE_TOO_BIG', 400);
        let thumbnail;
        console.log(process.cwd(), process.env.UPLOAD_PATH);
        const dirPath = [process.env.UPLOAD_PATH, directory.replace(/^\/|\/$/, '')].join('/');
        try {
            await fsMkdir(path_1.default.join(process.cwd(), dirPath), { recursive: true });
        }
        catch (e) {
            console.log('ERR', e);
        }
        const filePath = [dirPath, file.originalFilename.replace(/.*(\..*)$/, `${name}$1`)].join('/');
        const localFilePath = path_1.default.join(process.cwd(), filePath);
        if (file.mimetype.startsWith('image/') && !file.mimetype.endsWith('/svg')) {
            await (0, sharp_1.default)(file.filepath)
                .resize(options.maxWidth, options.maxHeight, { fit: 'inside' })
                .toFile(localFilePath);
            if (options.thumbnail) {
                const { width, height } = typeof options.thumbnail === 'boolean'
                    ? { width: 150, height: 150 }
                    : options.thumbnail;
                thumbnail = getThumbnailPath(filePath, width, height);
                await (0, sharp_1.default)(localFilePath)
                    .resize(width, height, { fit: 'cover' })
                    .toFile(path_1.default.join(process.cwd(), thumbnail));
            }
            await fsUnlink(file.filepath);
        }
        else {
            await fsRename(file.filepath, filePath);
        }
        const { insertId } = await this.query((0, assetQueries_1.assetInsert)({ filePath, mimeType: file.mimetype, thumbnail }));
        return { id: insertId };
    }
}
exports.AssetModel = AssetModel;
//# sourceMappingURL=AssetModel.js.map