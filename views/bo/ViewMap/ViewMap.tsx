import React, { useEffect, useState } from 'react';
import type { DetailedMap, MapGroup, MapIndividual } from '$types/map';
import { asyncIndividualsFetch } from '../../../async/asyncIndividuals';
import { Individual } from '$types/individual';
import { Group } from '$types/group';
import { asyncGroupsFetch } from '../../../async/asyncGroups';
import { asyncMapEntryDelete, asyncMapFetch } from '../../../async/asyncMaps';
import { List } from '$components/lists/List/List';
import { FiTrash } from 'react-icons/fi';
import { ModalConfirmDelete } from '$components/layout/Modal/ModalConfirmDelete';
import { ModalMapEntry } from '$components/layout/Modal/ModalMapEntry';
import { Buttons } from '$components/buttons/Buttons/Buttons';
import { ModalMapAutoFill } from '$components/layout/Modal/ModalMapAutoFill';
import { ButtonTheme } from '$components/buttons/Button/Button';
type ViewMapProps = {
    id: number;
};

export const ViewMap: React.FC<ViewMapProps> = ({ id }) => {
    const [map, setMap] = useState<DetailedMap>();
    const [individuals, setIndividuals] = useState<Individual[]>();
    const [groups, setGroups] = useState<Group[]>();
    const [modalMapEntryOpen, setModalMapEntryOpen] = useState(false);
    const [modalMapAutoFillOpen, setModalMapAutoFillOpen] = useState(false);
    const [deleteCallback, setDeleteCallback] = useState<Function | null>(null);

    useEffect(() => {
        asyncIndividualsFetch().then(setIndividuals);
        asyncGroupsFetch().then(setGroups);
        asyncMapFetch(id).then(setMap);
    }, []);

    if (!map) return null;
    return (
        <main>
            <h1>Carte: {map.name}</h1>

            <Buttons
                buttons={[
                    { children: 'Ajouter une entrée', onClick: () => setModalMapEntryOpen(true) },
                    {
                        children: 'Auto-remplissage',
                        onClick: () => setModalMapAutoFillOpen(true),
                        theme: ButtonTheme.Primary
                    }
                ]}
                headerButtons
            />

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

            {groups && individuals && (
                <>
                    {modalMapEntryOpen && (
                        <ModalMapEntry
                            close={() => setModalMapEntryOpen(false)}
                            groups={groups.filter(
                                (g) => !map?.groups.find(({ id }) => id === g.id)
                            )}
                            individuals={individuals.filter(
                                (i) => !map?.individuals.find(({ id }) => id === i.id)
                            )}
                            mapId={id}
                            createMapEntry={(isGroup, entry) => {
                                const entityKey = isGroup ? 'groups' : 'individuals';
                                setMap({
                                    ...map,
                                    [entityKey]: [...map[entityKey], entry]
                                });
                            }}
                        />
                    )}
                    {modalMapAutoFillOpen && (
                        <ModalMapAutoFill
                            close={() => setModalMapAutoFillOpen(false)}
                            groups={groups}
                            individuals={individuals}
                            mapId={id}
                            setMap={setMap}
                        />
                    )}
                </>
            )}
        </main>
    );
};
