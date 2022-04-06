import styles from './Network.module.css';
import React, { useEffect, useState, Suspense, lazy } from 'react';
import { asyncLinksFetch } from '../../async/asyncLinks';
import { asyncGroupsFetch } from '../../async/asyncGroups';
import { asyncIndividualsFetch } from '../../async/asyncIndividuals';
import { asyncMapFetch } from '../../async/asyncMaps';
import type { DisplayedMap } from '$types/map';
import { Loader } from '$components/layout/Loader/Loader';
import { Panel } from '$components/layout/Panel/Panel';
import { PanelEntityContent } from '$views/bo/ViewPage/components/PanelEntityContent/PanelEntityContent';

const NetworkComponent = lazy(() => import('$components/network/D3Network'));

export const Network: React.FC<{ mapId?: number; linksOnHover?: boolean }> = ({
    mapId,
    linksOnHover
}) => {
    const [map, setMap] = useState<DisplayedMap>();
    const [activeEntity, setActiveEntity] = useState<{
        id: number;
        type: 'individual' | 'group';
    } | null>(null);
    useEffect(() => {
        if (mapId) {
            asyncMapFetch(mapId).then(setMap);
        } else {
            Promise.all([asyncLinksFetch(), asyncGroupsFetch(), asyncIndividualsFetch()]).then(
                ([links, groups, individuals]) => setMap({ links, groups, individuals })
            );
        }
    }, []);

    useEffect(() => {
        console.log(activeEntity);
    }, [activeEntity]);

    return (
        <div className={styles.wrapper}>
            {map && (
                <Suspense fallback={<Loader />}>
                    <NetworkComponent
                        map={map}
                        linksOnHover={linksOnHover}
                        setActiveEntity={setActiveEntity}
                    />
                </Suspense>
            )}
            <Panel close={() => setActiveEntity(null)}>
                {activeEntity ? <PanelEntityContent {...activeEntity} /> : null}
            </Panel>
        </div>
    );
};
