import styles from './BoLayout.module.css';
import React, { useEffect, useState } from 'react';
import { BoNav } from './Nav/BoNav';
import { useRouter } from 'next/router';
import { asyncLoginFromToken } from '../../async/asyncUser';
import { MenuLink } from '$types/menuLink';
import Head from 'next/head';

export const BoLayout: React.FC<{ menu: MenuLink[] }> = ({ children }) => {
    const [loaded, setLoaded] = useState(false);
    const { pathname, push } = useRouter();
    useEffect(() => {
        asyncLoginFromToken()
            .then(() => {
                if (pathname === '/bo/login') push('/bo');
                setLoaded(true);
            })
            .catch(() => {
                push('/bo/login');
                setTimeout(() => setLoaded(true), 100);
            });
    }, []);
    return (
        <>
            <Head>
                <link rel="stylesheet" href="/quill.snow.css" />
            </Head>
            <div className={styles.layout}>
                {loaded && pathname !== '/bo/login' && <BoNav />}
                {loaded ? children : 'Loading'}
            </div>
            {loaded && <div id={'modal-wrapper'} />}
        </>
    );
};
