export type BaseMenuLink = {
    text?: string;
    icon?: string;
    href?: string;
    target?: '_blank' | '_self';
};

export type MenuLinkPayload = BaseMenuLink & {
    pageId?: number;
};

export type MenuLink = BaseMenuLink & {
    id: number;
};
