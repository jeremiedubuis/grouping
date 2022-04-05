import styles from './ViewDashboard.module.css';
import React from 'react';
import { Network } from '$components/network/Network';

export const ViewDashboard: React.FC = () => (
    <main className={styles.view}>
        <Network linksOnHover />
    </main>
);
