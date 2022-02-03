import React, { useEffect, useState } from 'react';
import { Modal } from '../Modal';
import { asyncGroupLinksFetch, asyncGroupsFetch } from '../../../../async/asyncGroups';
import {
    asyncIndividualLinksFetch,
    asyncIndividualsFetch
} from '../../../../async/asyncIndividuals';
import { FormLink } from '../../../forms/FormLink';
import { asyncLinkDelete, asyncLinksCreate } from '../../../../async/asyncLinks';

import type { Links } from '$types/linkTypes';
import type { IndividualWithFlags } from '$types/individual';
import type { GroupWithFlags } from '$types/group';
import { IconButton } from '../../../buttons/IconButton/IconButton';
import { FiTrash } from 'react-icons/fi';

export type ModalLinksProps = {
    close: Function;
    title: string;
    groupId?: number;
    individualId?: number;
};

export const ModalLinks: React.FC<ModalLinksProps> = ({ close, groupId, individualId, title }) => {
    const [links, setLinks] = useState<Links>();
    const [groups, setGroups] = useState<GroupWithFlags[]>();
    const [individuals, setIndividuals] = useState<IndividualWithFlags[]>();
    useEffect(() => {
        if (typeof groupId !== 'undefined') asyncGroupLinksFetch(groupId).then(setLinks);
        if (typeof individualId !== 'undefined')
            asyncIndividualLinksFetch(individualId).then(setLinks);
        asyncIndividualsFetch().then(setIndividuals);
        asyncGroupsFetch().then(setGroups);
    }, []);
    return (
        <Modal close={close}>
            {links && individuals && groups ? (
                <>
                    <h2>{title}</h2>

                    <FormLink
                        groupId={groupId}
                        individualId={individualId}
                        onSubmit={(e, data) => {
                            e.preventDefault();
                            const key = data.group2Id ? 'groups' : 'individuals';
                            const otherKey = key === 'groups' ? 'individuals' : 'groups';
                            const entity =
                                key === 'groups'
                                    ? groups.find(({ id }) => id === data.group2Id)
                                    : individuals.find(({ id }) => id === data.individual2Id);
                            asyncLinksCreate(data).then(({ id }) =>
                                setLinks({
                                    [key]: [
                                        ...links[key],
                                        { ...entity, linkId: id, type: data.type }
                                    ],
                                    [otherKey]: links[otherKey]
                                } as Links)
                            );
                        }}
                        submitText="Ajouter un lien"
                        groups={groups.filter(
                            (g) => g.id !== groupId && !links.groups.find(({ id }) => id === g.id)
                        )}
                        individuals={individuals.filter(
                            (i) =>
                                i.id !== individualId &&
                                !links.individuals.find(({ id }) => id === i.id)
                        )}
                    />

                    <h3>Personnalités associées</h3>
                    <ul>
                        {links.individuals.map((i) => (
                            <li key={i.id}>
                                {i.firstname} {i.lastname}
                                <IconButton
                                    onClick={() =>
                                        asyncLinkDelete(i.linkId).then(() =>
                                            setLinks({
                                                groups: links.groups,
                                                individuals: links.individuals.filter(
                                                    (l) => l.linkId !== i.linkId
                                                )
                                            })
                                        )
                                    }
                                >
                                    <FiTrash />
                                </IconButton>
                            </li>
                        ))}
                    </ul>

                    <h3>Groupes associés</h3>
                    <ul>
                        {links.groups.map((g) => (
                            <li key={g.id}>
                                {g.name} ({g.type})
                                <IconButton
                                    onClick={() =>
                                        asyncLinkDelete(g.linkId).then(() =>
                                            setLinks({
                                                individuals: links.individuals,
                                                groups: links.groups.filter(
                                                    (l) => l.linkId !== g.linkId
                                                )
                                            })
                                        )
                                    }
                                >
                                    <FiTrash />
                                </IconButton>
                            </li>
                        ))}
                    </ul>
                </>
            ) : (
                'Loading'
            )}
        </Modal>
    );
};
