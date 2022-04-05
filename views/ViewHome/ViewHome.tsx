import styles from './ViewHome.module.css';
import React from 'react';
import { Network } from '$components/network/Network';
import { GetServerSideProps } from 'next';
import { asyncPageFetch } from '../../async/asyncPages';
import type { DetailedPage } from '$types/page';
import Head from 'next/head';

export const ViewHome: React.FC<{ page: DetailedPage }> = ({ page }) => {
    return (
        <main className={styles.view}>
            <Head>
                <title>{page.meta.title || page.title}</title>
                <meta property="og:title" content={page.meta.title || page.title} key="title" />
                {page.meta.description && (
                    <meta
                        property="og:description"
                        content={page.meta.description}
                        key="description"
                    />
                )}
            </Head>
            <header>
                <h1>{page.title}</h1>
                <p>{page.blocks?.[0].text}</p>
            </header>
            {page.blocks[1]?.mapId && <Network mapId={page.blocks[1].mapId} />}
        </main>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        props: {
            page: await asyncPageFetch('/', { headers: { cookie: ctx.req.headers.cookie } })
        }
    };
};
