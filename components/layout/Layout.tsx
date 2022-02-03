import styles from './Layout.module.css';
import React from 'react';

export const Layout: React.FC = ({ children }) =>
    <div className={styles.layout}>
        { children }
    </div>