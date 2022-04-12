import styles from './ViewIndividuals.module.css';
import React, { useEffect, useState } from 'react';
import { asyncIndividualDelete, asyncIndividualsFetch } from '../../../async/asyncIndividuals';
import { FiEdit, FiFlag, FiLink, FiTrash } from 'react-icons/fi';
import { ModalIndividual } from '$components/layout/Modal/ModalIndividual';
import { ModalEntityFlags } from '$components/layout/Modal/ModalEntityFlags/ModalEntityFlags';
import { ModalConfirmDelete } from '$components/layout/Modal/ModalConfirmDelete';
import type { Individual, IndividualWithFlags } from '$types/individual';
import { ModalLinks } from '$components/layout/Modal/ModalLinks/ModalLinks';
import { List } from '$components/lists/List/List';
import { Buttons } from '$components/buttons/Buttons/Buttons';

export const ViewIndividuals: React.FC = () => {
    const [individuals, setIndividuals] = useState<IndividualWithFlags[]>([]);
    const [modalLinksOpen, setModalLinksOpen] = useState<Individual | null>(null);
    const [individualFlagsToEdit, setIndividualFlagsToEdit] = useState<IndividualWithFlags | null>(
        null
    );
    const [modalIndividual, setModalIndividual] = useState<IndividualWithFlags | null | boolean>(
        null
    );
    const [deleteCallback, setDeleteCallback] = useState<Function | null>(null);

    useEffect(() => {
        asyncIndividualsFetch().then(setIndividuals);
    }, []);

    return (
        <main className={styles.view}>
            <h1>Personnalités</h1>
            <Buttons
                buttons={[
                    {
                        children: 'Ajouter une personnalité',
                        onClick: () => setModalIndividual(true)
                    }
                ]}
                headerButtons
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
                            onClick: () => setModalIndividual(i)
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

            {modalIndividual && (
                <ModalIndividual
                    individual={typeof modalIndividual === 'boolean' ? undefined : modalIndividual}
                    close={() => setModalIndividual(null)}
                    createIndividual={(i) => {
                        setIndividuals([...individuals, i]);
                    }}
                    updateIndividual={(individual) => {
                        setIndividuals(
                            individuals.map((i) => {
                                if (i.id !== individual.id) return i;
                                return individual;
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
                    individualId={modalLinksOpen.id}
                    title={`${modalLinksOpen.firstname} ${modalLinksOpen.lastname}`}
                />
            )}
        </main>
    );
};
