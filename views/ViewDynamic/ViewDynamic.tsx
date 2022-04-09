import styles from './ViewDynamic.module.css';
import React from 'react';
import { asyncPageFetch } from '../../async/asyncPages';
import { GetServerSideProps } from 'next';
import type { DetailedPage } from '$types/page';
import { RichText } from '$components/rich-text/RichText';
import { Network } from '$components/network/Network';
import { View } from '$components/layout/View/View';

export const ViewDynamic: React.FC<{ page: DetailedPage }> = ({ page }) => {
    const entity = page.individual || page.group;

    return (
        <View page={page} className={styles.view}>
            <h2>{page.title}</h2>

            {entity && (
                <div className={styles.entity}>
                    {entity.picture && <img src={entity.picture} alt="" />}
                    <RichText text={entity.description} />
                </div>
            )}

            {page.blocks.map((b) => {
                switch (b.identifier) {
                    case 'rich-text':
                        return <RichText key={b.id} {...b} />;
                    case 'map':
                        return <Network key={b.id} mapId={b.mapId as number} />;
                }
            })}
        </View>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        props: {
            page: await asyncPageFetch(ctx.req.url as string)
        }
    };
};
