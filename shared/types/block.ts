export type BaseBlock = {
    title?: string;
    subtitle?: string;
    text?: string;
    identifier: string;
};

export type BlockPayload = BaseBlock & {
    pageId?: number;
    blockId?: number;
    assetId?: number;
    mapId?: number;
    linkHref?: string;
    linkText?: string;
};

export type Block = BlockPayload & {
    id: number;
    asset?: string;
    mapId?: number;
    link?: {
        href?: string;
        text?: string;
    };
};
