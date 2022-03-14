import styles from './Layout.module.css';
import React from 'react';

export const Layout: React.FC = ({ children }) => (
    <div className={styles.layout}>
        <header className={styles.header}>
            <h1>Titre</h1>
        </header>
        {children}
    </div>
);
