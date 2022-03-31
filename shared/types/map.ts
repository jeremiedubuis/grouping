export type MapPayload = {
    name: string;
    description?: string;
};

export type MapEntryPayload = {
    mapId: number;
    nodeValue?: number;
    nodeColor?: string;
} & ({ individualId: number } | { groupId: number });
