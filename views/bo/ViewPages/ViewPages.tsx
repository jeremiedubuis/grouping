import styles from './ViewPages.module.css';
import React, { useEffect, useState } from 'react';
import { FormPage } from '$components/forms/FormPage';
import { Buttons } from '$components/buttons/Buttons/Buttons';
import { Modal } from '$components/layout/Modal/Modal';
import { asyncPageCreate, asyncPagesFetch } from '../../../async/asyncPages';
import { Page } from '$types/page';
import { List } from '$components/lists/List/List';

export const ViewPages = () => {
    const [modalCreatePage, setModalCreatePage] = useState(false);
    const [pages, setPages] = useState<Page[]>([]);

    useEffect(() => {
        asyncPagesFetch().then(setPages);
    }, []);

    return (
        <main className={styles.view}>
            <h1>Pages</h1>
            <Buttons
                headerButtons
                buttons={[{ children: 'Créer une page', onClick: () => setModalCreatePage(true) }]}
            />

            <List
                items={pages.map((p) => ({
                    id: p.id,
                    name: p.title || p.template,
                    link: `/bo/page/${p.id}`,
                    subtitle: p.path,
                    initials: p.title?.[0] || p.path[1],
                    buttons: []
                }))}
            />

            {modalCreatePage && (
                <Modal close={() => setModalCreatePage(false)}>
                    <h1>Création de page</h1>
                    <FormPage
                        id="page-form"
                        wrap
                        onSubmit={(e, data) => {
                            e.preventDefault();
                            asyncPageCreate(data).then(({ id }) =>
                                setPages([...pages, { id, ...data }])
                            );
                        }}
                        submitText="Créer la page"
                    />
                </Modal>
            )}
        </main>
    );
};
