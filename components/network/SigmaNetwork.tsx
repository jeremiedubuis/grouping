import styles from './Network.module.css';
import React, { useEffect, useRef } from 'react';
import { DisplayedMap } from '$types/map';
import Sigma from 'sigma';
import Graph from 'graphology';
import { circular } from 'graphology-layout';
import forceAtlas2 from 'graphology-layout-forceatlas2';
import getNodeProgramImage from 'sigma/rendering/webgl/programs/node.image';
import { mapSigmaNetwork } from '$components/network/networkMapping';

export const SigmaNetwork: React.FC<{ map?: DisplayedMap }> = ({ map }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof map !== 'undefined' && ref.current) {
            const graph = new Graph();
            const { mappedNodes, mappedEdges } = mapSigmaNetwork(map);

            graph.import({
                nodes: mappedNodes,
                edges: mappedEdges
            });
            circular.assign(graph);
            const settings = forceAtlas2.inferSettings(graph);
            forceAtlas2.assign(graph, {
                iterations: 600,
                settings
            });
            const renderer = new Sigma(graph, ref.current, {
                nodeProgramClasses: {
                    image: getNodeProgramImage()
                }
            });
            renderer.refresh();
        }
    }, [map]);

    return <div ref={ref} className={styles.sigma} />;
};

export default SigmaNetwork;
