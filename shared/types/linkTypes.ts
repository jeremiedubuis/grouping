import type { Individual } from '$types/individual';
import type { Group } from '$types/group';

export type BaseLink = {
    g1_id?: number;
    g2_id?: number;
    i1_id?: number;
    i2_id?: number;
    type?: string;
};

export type LinkPayload = {
    individualId?: number;
    groupId?: number;
    individual2Id?: number;
    group2Id?: number;
    type: string;
};

export type Links = {
    individuals: (Individual & { linkId: number })[];
    groups: (Group & { linkId: number })[];
};
