import { Individual } from '$types/individual';
import { Group } from '$types/group';

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

export type DetailedMap = Map & {
    individuals: (Individual & { entry_id: number })[];
    groups: (Group & { entry_id: number })[];
};
