export const isStringVarTruthy = (envVar?: string) => envVar && /1|true/.test(envVar);
