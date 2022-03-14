import styles from './ViewIndividuals.module.css';
import React, { useEffect, useState } from 'react';
import {
    asyncIndividualCreate,
    asyncIndividualDelete,
    asyncIndividualsFetch
} from '../../../async/asyncIndividuals';
import { FormIndividual } from '$components/forms/FormIndividual';
import { FiEdit, FiFlag, FiLink, FiTrash } from 'react-icons/fi';
import { ModalIndividualEdit } from '$components/layout/Modal/ModalndividualEdit';
import { ModalEntityFlags } from '$components/layout/Modal/ModalEntityFlags/ModalEntityFlags';
import { ModalConfirmDelete } from '$components/layout/Modal/ModalConfirmDelete';
import type { Individual, IndividualWithFlags } from '$types/individual';
import { ModalLinks } from '$components/layout/Modal/ModalLinks/ModalLinks';
import { List } from '$components/lists/List/List';

export const ViewIndividuals: React.FC = () => {
    const [individuals, setIndividuals] = useState<IndividualWithFlags[]>([]);
    const [modalLinksOpen, setModalLinksOpen] = useState<Individual | null>(null);
    const [individualFlagsToEdit, setIndividualFlagsToEdit] = useState<IndividualWithFlags | null>(
        null
    );
    const [individualToEdit, setIndividualToEdit] = useState<IndividualWithFlags | null>(null);
    const [deleteCallback, setDeleteCallback] = useState<Function | null>(null);

    useEffect(() => {
        asyncIndividualsFetch().then(setIndividuals);
    }, []);

    return (
        <main className={styles.view}>
            <h1>Personnalités</h1>
            <h2>Ajouter une personnalité</h2>
            <FormIndividual
                submitText={'Créer'}
                className={styles.form}
                onSubmit={(e: any, data: any) => {
                    e.preventDefault();
                    asyncIndividualCreate(data).then(({ id }) => {
                        setIndividuals([...individuals, { ...data, id, flags: {} }]);
                    });
                }}
            />

            <h2>Personnalités</h2>
            <List
                items={individuals.map((i) => ({
                    id: i.id,
                    initials: `${i.firstname[0].toUpperCase()}${i.lastname[0].toUpperCase()}`,
                    picture: i.picture,
                    name: `${i.firstname} ${i.lastname}`,
                    subtitle: `${Object.keys(i.flags).length} étiquettes`,
                    buttons: [
                        {
                            icon: <FiFlag />,
                            onClick: () => setIndividualFlagsToEdit(i)
                        },
                        {
                            icon: <FiEdit />,
                            onClick: () => setIndividualToEdit(i)
                        },
                        {
                            icon: <FiLink />,
                            onClick: () => setModalLinksOpen(i)
                        },
                        {
                            icon: <FiTrash />,
                            onClick: () =>
                                setDeleteCallback(() => () => {
                                    asyncIndividualDelete(i.id).then(() => {
                                        setIndividuals(
                                            individuals.filter(
                                                (individual) => individual.id !== i.id
                                            )
                                        );
                                    });
                                })
                        }
                    ]
                }))}
            />

            {individualFlagsToEdit && (
                <ModalEntityFlags
                    title={`${individualFlagsToEdit.firstname} ${individualFlagsToEdit.lastname}`}
                    update={(individual) => {
                        setIndividuals(
                            individuals.map((i) => {
                                if (i.id !== individual.id) return i;
                                return individual;
                            })
                        );
                        setIndividualFlagsToEdit(individual);
                    }}
                    individual={individualFlagsToEdit}
                    close={() => setIndividualFlagsToEdit(null)}
                />
            )}

            {individualToEdit && (
                <ModalIndividualEdit
                    individual={individualToEdit}
                    close={() => setIndividualToEdit(null)}
                    updateIndividual={(individual) => {
                        setIndividuals(
                            individuals.map((i) => {
                                if (i.id !== individualToEdit.id) return i;
                                return individual;
                            })
                        );
                        setIndividualToEdit(individual);
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
                    individualId={modalLinksOpen.id}
                    title={`${modalLinksOpen.firstname} ${modalLinksOpen.lastname}`}
                />
            )}
        </main>
    );
};
