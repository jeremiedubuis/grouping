import styles from './ViewGroups.module.css';
import React, { useEffect, useState } from 'react';
import {
    asyncGroupDelete,
    asyncGroupsFetch,
    asyncGroupTypeCreate,
    asyncGroupTypesFetch
} from '../../../async/asyncGroups';
import type { Group, GroupType, GroupWithFlags } from '$types/group';
import { FiEdit, FiFlag, FiLink, FiTrash } from 'react-icons/fi';
import { ModalLinks } from '$components/layout/Modal/ModalLinks/ModalLinks';
import { List } from '$components/lists/List/List';
import { ModalGroup } from '$components/layout/Modal/ModalGroup';
import { ModalConfirmDelete } from '$components/layout/Modal/ModalConfirmDelete';
import { ModalEntityFlags } from '$components/layout/Modal/ModalEntityFlags/ModalEntityFlags';
import { FormGroupType } from '$components/forms/FormGroupType';
import { Buttons } from '$components/buttons/Buttons/Buttons';

export const ViewGroups = () => {
    const [modalLinksOpen, setModalLinksOpen] = useState<Group | null>(null);
    const [groups, setGroups] = useState<GroupWithFlags[]>();
    const [groupTypes, setGroupTypes] = useState<GroupType[]>([]);
    const [groupModal, setGroupModal] = useState<Group | null | boolean>(null);
    const [deleteCallback, setDeleteCallback] = useState<Function | null>(null);
    const [groupFlagsToEdit, setGroupFlagsToEdit] = useState<GroupWithFlags | null>(null);

    useEffect(() => {
        asyncGroupsFetch().then(setGroups);
        asyncGroupTypesFetch().then(setGroupTypes);
    }, []);

    return (
        <main className={styles.view}>
            <h1>Groups</h1>

            <Buttons
                buttons={[
                    {
                        children: 'Créer un groupe',
                        onClick: () => setGroupModal(true)
                    }
                ]}
                headerButtons
            />

            <List
                items={
                    groups?.map((g) => ({
                        id: g.id,
                        initials: g.name?.[0].toUpperCase(),
                        picture: g.thumbnail,
                        name: g.name,
                        subtitle: g.type,
                        buttons: [
                            {
                                icon: <FiFlag />,
                                onClick: () => setGroupFlagsToEdit(g)
                            },
                            {
                                icon: <FiEdit />,
                                onClick: () => setGroupModal(g)
                            },
                            {
                                icon: <FiLink />,
                                onClick: () => setModalLinksOpen(g)
                            },

                            {
                                icon: <FiTrash />,
                                onClick: () =>
                                    setDeleteCallback(() => () => {
                                        asyncGroupDelete(g.id).then(() => {
                                            setGroups(groups.filter((group) => group.id !== g.id));
                                        });
                                    })
                            }
                        ]
                    })) || []
                }
            />

            <h2>Types de groupes</h2>
            <FormGroupType
                className={styles.form}
                onSubmit={(e, data) => {
                    e.preventDefault();
                    asyncGroupTypeCreate(data.type).then((gt) => {
                        setGroupTypes([...groupTypes, { id: gt.id, type: data.type }]);
                    });
                }}
                submitText={'Créer'}
            />
            <List
                items={groupTypes.map((gt) => ({
                    id: gt.id,
                    initials: gt.type?.[0].toLocaleUpperCase(),
                    name: gt.type,
                    buttons: []
                }))}
            />

            {groups && groupFlagsToEdit && (
                <ModalEntityFlags
                    title={`${groupFlagsToEdit.name} (${groupFlagsToEdit.type})`}
                    update={(group) => {
                        setGroups(
                            groups.map((g) => {
                                if (g.id !== group.id) return g;
                                return group;
                            })
                        );
                        setGroupFlagsToEdit(group);
                    }}
                    group={groupFlagsToEdit}
                    close={() => setGroupFlagsToEdit(null)}
                />
            )}

            {groups && groupModal && (
                <ModalGroup
                    group={typeof groupModal !== 'boolean' ? groupModal : undefined}
                    groupTypes={groupTypes}
                    close={() => setGroupModal(null)}
                    createGroup={(group) => {
                        setGroups([...groups, group]);
                    }}
                    updateGroup={(group) => {
                        setGroups(
                            groups.map((g) => {
                                if (g.id !== group.id) return g;
                                return { ...g, ...group };
                            })
                        );
                    }}
                />
            )}

            {deleteCallback && (
                <ModalConfirmDelete
                    close={() => setDeleteCallback(null)}
                    onSubmit={deleteCallback}
                />
            )}

            {modalLinksOpen && (
                <ModalLinks
                    close={() => setModalLinksOpen(null)}
                    groupId={modalLinksOpen.id}
                    title={`${modalLinksOpen.name} (${modalLinksOpen.type})`}
                />
            )}
        </main>
    );
};
