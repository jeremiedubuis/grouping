export type AssetPayload = {
    filePath: string;
    thumbnail?: string;
    mimeType: string;
};

export type AssetOptions = {
    thumbnail?: boolean | { width: number; height: number };
    maxWidth?: number;
    maxHeight?: number;
};
