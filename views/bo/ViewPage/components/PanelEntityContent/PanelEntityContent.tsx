import React, { useEffect, useState } from 'react';
import { Individual } from '$types/individual';
import { GroupWithLinks } from '$types/group';
import { asyncGroupFetch } from '../../../../../async/asyncGroups';
import { asyncIndividualFetch } from '../../../../../async/asyncIndividuals';
import { Loader } from '$components/layout/Loader/Loader';

const mapIndividual = (i: Individual) => {
    return {
        name: `${i.firstname} ${i.lastname}`,
        description: i.description
    };
};
const mapGroup = (g: GroupWithLinks) => {
    return {
        name: g.name,
        description: g.description
    };
};

export const PanelEntityContent: React.FC<{
    id: number;
    type: 'group' | 'individual';
}> = ({ id, type }) => {
    const [entity, setEntity] = useState<{ name: string; description?: string } | null>();

    useEffect(() => {
        if (!id) return;
        setEntity(null);
        if (type === 'group') asyncGroupFetch(id).then((data) => setEntity(mapGroup(data)));
        else asyncIndividualFetch(id).then((data) => setEntity(mapIndividual(data)));
    }, [id, type]);

    if (!entity) return <Loader />;
    return (
        <div>
            <h2> {entity.name}</h2>
            <p>{entity.description}</p>
        </div>
    );
};
