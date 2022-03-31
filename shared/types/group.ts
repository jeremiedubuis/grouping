import { Individual } from '$types/individual';
import { FlagValues } from '$types/flag';

export type BaseGroup = {
    name: string;
    type: string;
    description?: string;
    picture?: string;
    thumbnail?: string;
    defaultNodeValue?: number;
    defaultNodeColor?: number;
};

export type GroupPayload = BaseGroup & {
    picture?: File;
    assetId?: number;
};

export type Group = BaseGroup & {
    id: number;
};

export type GroupWithFlags = Group & {
    flags: FlagValues;
};

export type GroupWithLinks = Group & {
    groups: Group[];
    individuals: Individual[];
};

export type GroupType = {
    id: number;
    type: string;
};
