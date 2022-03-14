import styles from './ViewMigrations.module.css';
import React, { useEffect, useState } from 'react';
import { asyncMigrationApply, asyncMigrationsFetch } from '../../../async/asyncMigrations';
import { Button, ButtonTheme } from '$components/buttons/Button/Button';

export const ViewMigrations: React.FC = () => {
    const [migrations, setMigrations] = useState<string[]>();

    useEffect(() => {
        asyncMigrationsFetch().then(setMigrations);
    }, []);
    return (
        <main className={styles.view}>
            <h2>Migrations</h2>
            <ul>
                {migrations?.map((migration) => (
                    <li key={migration}>
                        {migration}
                        <Button
                            theme={ButtonTheme.Primary}
                            onClick={async () => {
                                try {
                                    await asyncMigrationApply(migration);
                                } catch (e) {
                                    console.log(e);
                                }
                            }}
                        >
                            Appliquer
                        </Button>
                    </li>
                ))}
            </ul>
        </main>
    );
};

export const getServerSideProps = async () => {
    return {
        props: {}
    };
};
