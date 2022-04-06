import { RowDataPacket } from 'mysql2';
import { GroupWithFlags } from '$types/group';
import { mapSQLEntityFlags } from './mapSQLEntityFlags';

export const mapSQLGroups = (results: RowDataPacket[]): GroupWithFlags[] => {
    return results.reduce((groups: GroupWithFlags[], row: any) => {
        const group =
            groups.find(({ id }) => id === row.id) ||
            groups[
                groups.push({
                    id: row.id,
                    name: row.name,
                    type: row.type,
                    picture: row.picture,
                    description: row.description,
                    thumbnail: row.thumbnail,
                    defaultNodeValue: row.defaultNodeValue,
                    defaultNodeColor: row.defaultNodeColor,
                    flags: {}
                }) - 1
            ];

        if (row.flagName) group.flags[row.flagName] = mapSQLEntityFlags(row);

        return groups;
    }, []);
};
