import styles from './ViewGroups.module.css';
import React, { useEffect, useState } from 'react';
import {
    asyncGroupCreate,
    asyncGroupDelete,
    asyncGroupsFetch,
    asyncGroupTypeCreate,
    asyncGroupTypesFetch
} from '../../../async/asyncGroups';
import type { Group, GroupType, GroupWithFlags } from '$types/group';
import { FiEdit, FiFlag, FiLink, FiTrash } from 'react-icons/fi';
import { ModalLinks } from '../../../components/layout/Modal/ModalLinks/ModalLinks';
import { FormGroup } from '../../../components/forms/FormGroup';
import { GroupPayload } from '$types/group';
import { List } from '../../../components/lists/List/List';
import { ModalGroupEdit } from '../../../components/layout/Modal/ModalGroupEdit';
import { ModalConfirmDelete } from '../../../components/layout/Modal/ModalConfirmDelete';
import { ModalEntityFlags } from '../../../components/layout/Modal/ModalEntityFlags/ModalEntityFlags';
import { FormGroupType } from '$components/forms/FormGroupType';

export const ViewGroups = () => {
    const [modalLinksOpen, setModalLinksOpen] = useState<Group | null>(null);
    const [groups, setGroups] = useState<GroupWithFlags[]>();
    const [groupTypes, setGroupTypes] = useState<GroupType[]>([]);
    const [groupToEdit, setGroupToEdit] = useState<Group | null>(null);
    const [deleteCallback, setDeleteCallback] = useState<Function | null>(null);
    const [groupFlagsToEdit, setGroupFlagsToEdit] = useState<GroupWithFlags | null>(null);

    useEffect(() => {
        asyncGroupsFetch().then(setGroups);
        asyncGroupTypesFetch().then(setGroupTypes);
    }, []);

    return (
        <main className={styles.view}>
            <h1>Groups</h1>

            <FormGroup
                className={styles.form}
                submitText={'Créer'}
                groupTypes={groupTypes}
                onSubmit={(e: any, data: GroupPayload) => {
                    e.preventDefault();
                    if (typeof groups === 'undefined') return;
                    asyncGroupCreate(data).then(({ id, slug }) =>
                        setGroups([
                            ...groups,
                            {
                                id,
                                name: data.name,
                                slug,
                                type: data.type,
                                defaultNodeValue: data.defaultNodeValue,
                                flags: {}
                            }
                        ])
                    );
                }}
            />

            <h2>Groupes</h2>

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
                                onClick: () => setGroupToEdit(g)
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

            {groups && groupToEdit && (
                <ModalGroupEdit
                    group={groupToEdit}
                    groupTypes={groupTypes}
                    close={() => setGroupToEdit(null)}
                    updateGroup={(group) => {
                        setGroups(
                            groups.map((g) => {
                                if (g.id !== groupToEdit.id) return g;
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
