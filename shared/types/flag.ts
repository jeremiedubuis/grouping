export type IndividualFlag = {
    id: number;
    name: string;
    value: any;
};

export type Flag = {
    id: number;
    name: string;
    values: { id: number; value: any }[];
};

export type FlagValue = {
    flagId: number;
    id: number;
    value: string;
};

export type FlagValues = {
    [flag: string]: FlagValue;
};
