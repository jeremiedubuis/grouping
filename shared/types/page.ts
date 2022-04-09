import { Block } from '$types/block';

export type BasePage = {
    path: string;
    template: string;
    title?: string;
};

export type PagePayload = BasePage & {
    individualId?: number;
    groupId?: number;
    metaTitle?: string;
    metaDescription?: string;
};

export type Page = BasePage & {
    id: number;
    meta: {
        title?: string;
        description?: string;
    };
};

export type DetailedPage = Page & {
    blocks: Block[];
    individual?: {
        id: number;
        firstname: string;
        lastname: string;
        slug: string;
        picture?: string;
        thumbnail?: string;
        description?: string;
    };
    group?: {
        id: number;
        name: string;
        slug: string;
        picture?: string;
        thumbnail?: string;
        description?: string;
    };
    settings: { name: string; data?: any }[];
};
