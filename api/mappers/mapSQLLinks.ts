export const mapSQLLinks = (r) =>
    r.reduce(
        (acc, curr) => {
            if (curr.groupId) {
                acc.groups.push({
                    linkId: curr.id,
                    id: curr.groupId,
                    name: curr.groupName,
                    type: curr.groupType,
                    picture: curr.groupPicture,
                    defaultNodeValue: curr.groupDefaultNodeValue,
                    defaultNodeColor: curr.groupDefaultNodeColor
                });
            }
            if (curr.individualId)
                acc.individuals.push({
                    linkId: curr.id,
                    id: curr.individualId,
                    firstname: curr.firstname,
                    lastname: curr.lastname,
                    picture: curr.individualPicture,
                    defaultNodeValue: curr.individualDefaultNodeValue,
                    defaultNodeColor: curr.individualDefaultNodeColor
                });
            return acc;
        },
        { individuals: [], groups: [] }
    );
