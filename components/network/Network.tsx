import styles from './Network.module.css';
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { asyncLinksFetch } from '../../async/asyncLinks';
import { asyncGroupsFetch } from '../../async/asyncGroups';
import { asyncIndividualsFetch } from '../../async/asyncIndividuals';
import { asyncMapFetch } from '../../async/asyncMaps';
import type { DisplayedMap } from '$types/map';

const NetworkComponent = lazy(() => import('$components/network/D3Network'));

export const Network: React.FC<{ mapId?: number; linksOnHover?: boolean }> = ({
    mapId,
    linksOnHover
}) => {
    const [map, setMap] = useState<DisplayedMap>();
    useEffect(() => {
        if (mapId) {
            asyncMapFetch(mapId).then(setMap);
        } else {
            Promise.all([asyncLinksFetch(), asyncGroupsFetch(), asyncIndividualsFetch()]).then(
                ([links, groups, individuals]) => setMap({ links, groups, individuals })
            );
        }
    }, []);

    return (
        <div className={styles.wrapper}>
            {map && (
                <Suspense fallback={<div>Chargement...</div>}>
                    <NetworkComponent map={map} linksOnHover={linksOnHover} />
                </Suspense>
            )}
        </div>
    );
};
