import { Handler } from '$handlers/Handler';
import { Request } from '$types/server';
import path from 'path';
import glob from 'fast-glob';
import { ApiError } from '../ApiError';
import fs from 'fs';
import { Model } from '$models/Model';

export class MigrationHandler extends Handler {
    async apply(req: Request) {
        if (req.body.migrationPath.includes('..')) throw new ApiError('Path includes dots', 401);
        const migrationsPath = path.join(__dirname, '../migrations').replace(/\\/g, '/');
        const filePath = path.join(migrationsPath, req.body.migrationPath);
        const sqlContent: string = await new Promise((resolve) => {
            fs.readFile(filePath, 'utf-8', (_err, content) => {
                resolve(content);
            });
        });
        try {
            await new Model().query(sqlContent);
            return this.success(sqlContent, 200);
        } catch (e: any) {
            throw new ApiError({
                code: e.code,
                message: e.sqlMessage
            });
        }
    }

    async selectAll() {
        const migrationsPath = path.join(__dirname, '../migrations').replace(/\\/g, '/');
        const files = await glob([migrationsPath + '/**/*.sql']);
        return this.success(
            files.map((f) => f.replace(migrationsPath, '')),
            200
        );
    }
}
