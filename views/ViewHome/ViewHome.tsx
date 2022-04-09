import styles from './ViewHome.module.css';
import React from 'react';
import { Network } from '$components/network/Network';
import { GetServerSideProps } from 'next';
import { asyncPageFetch } from '../../async/asyncPages';
import type { DetailedPage } from '$types/page';
import { View } from '$components/layout/View/View';

export const ViewHome: React.FC<{ page: DetailedPage }> = ({ page }) => {
    return (
        <View page={page} className={styles.view}>
            {page.blocks[1]?.mapId && <Network mapId={page.blocks[1].mapId} />}
        </View>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        props: {
            page: await asyncPageFetch('/', { headers: { cookie: ctx.req.headers.cookie } })
        }
    };
};
