import { Block } from '$types/block';

export type BasePage = {
    path: string;
    template: string;
    title?: string;
};

export type PagePayload = BasePage & {
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
};
