import styles from './ViewAdmins.module.css';
import React, { useEffect, useState } from 'react';
import { asyncUserCreate, asyncUsersFetch } from '../../../async/asyncUser';
import { List } from '../../../components/lists/List/List';
import { BaseUser } from '$types/user';
import { FormUser } from '../../../components/forms/FormUser';

export const ViewAdmins = () => {
    const [users, setUsers] = useState<BaseUser[]>([]);

    useEffect(() => {
        asyncUsersFetch().then(setUsers);
    }, []);

    return (
        <main className={styles.view}>
            <h1>Utilisateurs</h1>
            <h2>Créer un utilisateur</h2>

            <FormUser
                className={styles.form}
                onSubmit={(e, data) => {
                    e.preventDefault();
                    asyncUserCreate(data).then(({ id }) =>
                        setUsers([...users, { id, username: data.username }])
                    );
                }}
                submitText={'Créer'}
            />

            <h2>Utilisateurs</h2>
            <List
                items={users.map((u) => ({
                    id: u.id,
                    initials: u.username[0].toUpperCase(),
                    name: u.username,
                    buttons: []
                }))}
            />
        </main>
    );
};
