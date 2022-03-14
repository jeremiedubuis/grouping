import styles from './ViewHome.module.css';
import React from 'react';
import { Network } from '$components/network/Network';

export const ViewHome = () => {
    return (
        <main className={styles.view}>
            <p>
                Sectam, orgia, et gallus. Heuretes, calcaria, et solem. Peritus bromium una vitares
                magister est.
            </p>
            <Network />
        </main>
    );
};
