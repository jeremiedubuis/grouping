export const mapSQLEntityFlags = (row) => ({
    flagId: row.flagId,
    id: row.flagValueId,
    value: row.flagValue
});
