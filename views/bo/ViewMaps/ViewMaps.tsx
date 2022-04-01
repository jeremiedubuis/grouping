import styles from './ViewMaps.module.css';
import React, { useEffect, useState } from 'react';
import { asyncMapCreate, asyncMapDelete, asyncMapsFetch } from '../../../async/asyncMaps';
import type { Map } from '$types/map';
import { FormMap } from '$components/forms/FormMap';
import { List } from '$components/lists/List/List';
import { ModalConfirmDelete } from '$components/layout/Modal/ModalConfirmDelete';
import { FiTrash } from 'react-icons/fi';

export const ViewMaps = () => {
    const [maps, setMaps] = useState<Map[]>([]);
    const [deleteCallback, setDeleteCallback] = useState<Function | null>(null);

    useEffect(() => {
        asyncMapsFetch().then(setMaps);
    }, []);

    return (
        <main className={styles.view}>
            <h1>Cartes</h1>
            <FormMap
                className={styles.form}
                onSubmit={(e, data) => {
                    e.preventDefault();
                    asyncMapCreate(data).then(({ id }) => {
                        setMaps([...maps, { id, ...data }]);
                    });
                }}
                submitText="Créer une map"
            />
            <h2>Cartes</h2>

            <List
                items={maps.map((m) => ({
                    id: m.id,
                    name: m.name,
                    initials: m.name[0],
                    buttons: [
                        {
                            icon: <FiTrash />,
                            onClick: () =>
                                setDeleteCallback(() => () => {
                                    asyncMapDelete(m.id).then(() =>
                                        setMaps(maps.filter(({ id }) => id !== m.id))
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
