import { FlagValues } from '$types/flag';
import type { File } from 'formidable';
export type BaseIndividual = {
    firstname: string;
    lastname: string;
    description?: string;
    picture?: string;
    thumbnail?: string;
    defaultNodeValue?: number;
    defaultNodeColor?: string;
};

export type IndividualPayload = BaseIndividual & {
    picture?: File;
    assetId?: number;
};

export type Individual = BaseIndividual & {
    id: number;
    href?: string;
    slug: string;
};

export type IndividualUpdatePayload = Partial<IndividualPayload> & {
    individualId: number;
};

export type IndividualWithFlags = Individual & {
    flags: FlagValues;
};

export type Slugs = { firstnameSlug: string; lastnameSlug: string };
