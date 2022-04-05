import React, { useEffect, useState } from 'react';
import { asyncMenuFetch, asyncMenuLinkCreate, asyncMenuLinkDelete } from '../../../async/asyncMenu';
import { MenuLink } from '$types/menuLink';
import { List } from '$components/lists/List/List';
import { FormMenuLink } from '$components/forms/FormMenuLink';
import { FiTrash } from 'react-icons/fi';
import { ModalConfirmDelete } from '$components/layout/Modal/ModalConfirmDelete';

export const ViewMenu: React.FC = () => {
    const [menu, setMenu] = useState<MenuLink[]>();
    const [deleteCallback, setDeleteCallback] = useState<Function | null>(null);

    useEffect(() => {
        asyncMenuFetch().then(setMenu);
    }, []);

    if (!menu) return null;
    return (
        <main>
            <h1>Menu</h1>
            <h2>Ajouter un lien</h2>
            <FormMenuLink
                onSubmit={(e, data) => {
                    e.preventDefault();
                    asyncMenuLinkCreate(data).then(setMenu);
                }}
                submitText="Créer un lien"
            />
            <h2>Liens du menu</h2>
            <List
                items={
                    menu?.map((m) => ({
                        id: m.id,
                        name: `${m.text || ''} ${m.href ? `(${m.href})` : ''}`,
                        buttons: [
                            {
                                icon: <FiTrash />,
                                onClick: () =>
                                    setDeleteCallback(() => () => {
                                        asyncMenuLinkDelete(m.id).then(() =>
                                            setMenu(menu.filter(({ id }) => m.id !== id))
                                        );
                                    })
                            }
                        ]
                    })) || []
                }
            />{' '}
            {deleteCallback && (
                <ModalConfirmDelete
                    close={() => setDeleteCallback(null)}
                    onSubmit={deleteCallback}
                />
            )}
        </main>
    );
};
