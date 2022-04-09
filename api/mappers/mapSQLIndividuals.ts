import { RowDataPacket } from 'mysql2';
import { IndividualWithFlags } from '$types/individual';
import { mapSQLEntityFlags } from './mapSQLEntityFlags';

export const mapSQLIndividuals = (results: RowDataPacket[]): IndividualWithFlags[] => {
    return results.reduce((individuals: IndividualWithFlags[], row: any) => {
        const individual =
            individuals.find(({ id }) => id === row.id) ||
            individuals[
                individuals.push({
                    id: row.id,
                    firstname: row.firstname,
                    lastname: row.lastname,
                    picture: row.picture,
                    thumbnail: row.thumbnail,
                    description: row.description,
                    defaultNodeValue: row.defaultNodeValue,
                    defaultNodeColor: row.defaultNodeColor,
                    slug: row.slug,
                    href: row.href,
                    flags: {}
                }) - 1
            ];

        if (row.flagName) individual.flags[row.flagName] = mapSQLEntityFlags(row);

        return individuals;
    }, []);
};
