import styles from './ViewMaps.module.css';
import React, { useEffect, useState } from 'react';
import { asyncMapCreate, asyncMapsFetch } from '../../../async/asyncMaps';
import type { Map } from '$types/map';
import { FormMap } from '$components/forms/FormMap';
import Link from 'next/link';

export const ViewMaps = () => {
    const [maps, setMaps] = useState<Map[]>([]);

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
            {maps.length > 0 && (
                <ul>
                    {maps.map((m) => (
                        <li key={m.id}>
                            <Link href={`/bo/map/${m.id}`}>
                                <a>{m.name}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
};
