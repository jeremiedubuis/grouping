import { Model } from '$models/Model';
import { assetInsert } from '$queries/assetQueries';
import fs from 'fs';
import { promisify } from 'util';
import path from 'path';
import type { File } from 'formidable';
import { ApiError } from '../ApiError';
import sharp from 'sharp';
import { AssetOptions } from '$types/asset';

const fsRename = promisify(fs.rename);
const fsUnlink = promisify(fs.unlink);
const fsMkdir = promisify(fs.mkdir);
const getThumbnailPath = (filepath: string, width?: number, height?: number) =>
    filepath.replace(/(\..*)$/, `-thmb-${width?.toString()}x${height?.toString()}$1`);

export class AssetModel extends Model {
    async insertAsset(file: File, name: string, directory: string, options: AssetOptions = {}) {
        if (file.size > 5242880) throw new ApiError('FILE_TOO_BIG', 400);

        let thumbnail;

        console.log(process.cwd(), process.env.UPLOAD_PATH);
        const dirPath = [process.env.UPLOAD_PATH, directory.replace(/^\/|\/$/, '')].join('/');

        try {
            await fsMkdir(path.join(process.cwd(), dirPath), { recursive: true });
        } catch (e) {
            console.log('ERR', e);
        }
        const filePath = [dirPath, file.originalFilename.replace(/.*(\..*)$/, `${name}$1`)].join(
            '/'
        );

        const localFilePath = path.join(process.cwd(), filePath);

        if (file.mimetype.startsWith('image/') && !file.mimetype.endsWith('/svg')) {
            await sharp(file.filepath)
                .resize(options.maxWidth, options.maxHeight, { fit: 'inside' })
                .toFile(localFilePath);

            if (options.thumbnail) {
                const { width, height } =
                    typeof options.thumbnail === 'boolean'
                        ? { width: 150, height: 150 }
                        : options.thumbnail;
                thumbnail = getThumbnailPath(filePath, width, height);
                await sharp(localFilePath)
                    .resize(width, height, { fit: 'cover' })
                    .toFile(path.join(process.cwd(), thumbnail));
            }

            await fsUnlink(file.filepath);
        } else {
            await fsRename(file.filepath, filePath);
        }
        const { insertId } = await this.query(
            assetInsert({ filePath, mimeType: file.mimetype, thumbnail })
        );
        return { id: insertId };
    }
}
