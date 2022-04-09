import { Model } from '$models/Model';
import { blockAssetSelect, blockDelete, blockInsert, blockUpdate } from '$queries/blockQueries';
import { RowDataPacket } from 'mysql2';
import { BlockPayload } from '$types/block';

export class BlockModel extends Model {
    async create(payload: BlockPayload) {
        const { insertId }: RowDataPacket = await this.query(blockInsert(payload));
        return insertId;
    }
    async update(blockId: number, payload: Partial<BlockPayload>) {
        await this.query(blockUpdate(blockId, payload));
    }
    async delete(blockId: number) {
        await this.query(blockDelete(blockId));
    }

    async assetSelect(
        id: number
    ): Promise<{ id: number; path: string; mime_type: string; thumbnail?: string } | null> {
        const r = await this.query(blockAssetSelect(id));
        return r?.[0].id ? r[0] : null;
    }
}
