import React, { useEffect, useState } from 'react';
import type { DetailedMap, MapGroup, MapIndividual } from '$types/map';
import { asyncIndividualsFetch } from '../../../async/asyncIndividuals';
import { Individual } from '$types/individual';
import { Group } from '$types/group';
import { asyncGroupsFetch } from '../../../async/asyncGroups';
import {
    asyncMapEntryCreate,
    asyncMapEntryDelete,
    asyncMapFetch,
    asyncMapFillFromIndividualId
} from '../../../async/asyncMaps';
import { FormMapEntry } from '$components/forms/FormMapEntry';
import { List } from '$components/lists/List/List';
import { FiTrash } from 'react-icons/fi';
import { ModalConfirmDelete } from '$components/layout/Modal/ModalConfirmDelete';
import { FormMapFillFromEntity } from '$components/forms/FormMapFillFromEntity';
type ViewMapProps = {
    id: number;
};

export const ViewMap: React.FC<ViewMapProps> = ({ id }) => {
    const [map, setMap] = useState<DetailedMap>();
    const [individuals, setIndividuals] = useState<Individual[]>();
    const [groups, setGroups] = useState<Group[]>();
    const [deleteCallback, setDeleteCallback] = useState<Function | null>(null);

    useEffect(() => {
        asyncIndividualsFetch().then(setIndividuals);
        asyncGroupsFetch().then(setGroups);
        asyncMapFetch(id).then(setMap);
    }, []);

    if (!map) return null;
    console.log(individuals, groups, map);
    return (
        <main>
            <h1>Carte: {map.name}</h1>
            {individuals && groups && (
                <>
                    <h2>Ajouter une entrée</h2>
                    <FormMapEntry
                        onSubmit={(e, data) => {
                            e.preventDefault();
                            asyncMapEntryCreate(data).then(({ id }) => {
                                const entityKey = data.groupId ? 'groups' : 'individuals';
                                const entity = data.groupId
                                    ? groups.find((g) => g.id === data.groupId)
                                    : individuals.find((i) => i.id === data.individualId);
                                setMap({
                                    ...map,
                                    [entityKey]: [...map[entityKey], { entry_id: id, ...entity }]
                                });
                            });
                        }}
                        submitText={'Ajouter'}
                        mapId={id}
                        groups={groups}
                        individuals={individuals}
                    />

                    <h2>Auto-remplissage</h2>
                    <FormMapFillFromEntity
                        onSubmit={(e, { individualId }) => {
                            e.preventDefault();
                            asyncMapFillFromIndividualId(id, individualId).then(setMap);
                        }}
                        submitText={'Remplir'}
                        mapId={id}
                        groups={groups}
                        individuals={individuals}
                    />
                </>
            )}

            <h2>Individus</h2>
            <List
                items={map.individuals.map((i) => ({
                    id: i.id,
                    initials: `${i.firstname[0].toUpperCase()}${i.lastname[0].toUpperCase()}`,
                    picture: i.picture,
                    name: `${i.firstname} ${i.lastname}`,
                    buttons: [
                        {
                            icon: <FiTrash />,
                            onClick: () =>
                                setDeleteCallback(() => () => {
                                    asyncMapEntryDelete((i as MapIndividual).entry_id).then(() =>
                                        setMap({
                                            ...map,
                                            individuals: (
                                                map?.individuals as MapIndividual[]
                                            ).filter(
                                                ({ entry_id }) =>
                                                    entry_id !== (i as MapIndividual).entry_id
                                            )
                                        })
                                    );
                                })
                        }
                    ]
                }))}
            />
            <h2>Groupes</h2>
            <List
                items={map.groups.map((g) => ({
                    id: g.id,
                    initials: g.name?.[0].toUpperCase(),
                    picture: g.thumbnail,
                    name: g.name,
                    subtitle: g.type,
                    buttons: [
                        {
                            icon: <FiTrash />,
                            onClick: () =>
                                setDeleteCallback(() => () => {
                                    asyncMapEntryDelete((g as MapGroup).entry_id).then(() =>
                                        setMap({
                                            ...map,
                                            groups: (map?.groups as MapGroup[]).filter(
                                                ({ entry_id }) =>
                                                    entry_id !== (g as MapGroup).entry_id
                                            )
                                        })
                                    );
                                })
                        }
                    ]
                }))}
            />

            {deleteCallback && (
                <ModalConfirmDelete
                    close={() => setDeleteCallback(null)}
                    onSubmit={deleteCallback}
                />
            )}
        </main>
    );
};
