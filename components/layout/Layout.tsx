import styles from './Layout.module.css';
import React from 'react';
import { MenuLink } from '$types/menuLink';
import { Nav } from '$components/layout/Nav/Nav';

export const Layout: React.FC<{ menu: MenuLink[] }> = ({ children, menu }) => (
    <div className={styles.layout}>
        <Nav menu={menu} />

        {children}
    </div>
);
