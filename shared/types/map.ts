import { Individual } from '$types/individual';
import { Group } from '$types/group';
import { BaseLink } from '$types/linkTypes';

export type MapPayload = {
    name: string;
    description?: string;
};

export type MapEntryPayload = {
    mapId: number;
    nodeValue?: number;
    nodeColor?: string;
} & ({ individualId: number } | { groupId: number });

export type Map = MapPayload & {
    id: number;
};

export type MapIndividual = Individual & {
    entry_id: number;
    nodeValue?: number;
    nodeColor?: string;
};
export type MapGroup = Group & { entry_id: number; nodeValue?: number; nodeColor?: string };

export type DetailedMap = Map & {
    individuals: (MapIndividual | Individual)[];
    groups: (MapGroup | Group)[];
    links: BaseLink[];
};

export type DisplayedMap = Pick<DetailedMap, 'links' | 'groups' | 'individuals'>;
