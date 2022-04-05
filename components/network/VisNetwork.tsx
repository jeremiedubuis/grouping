import styles from './Network.module.css';
import React, { useEffect, useRef } from 'react';
import { DataSet } from 'vis-data';
import { Edge, Node } from 'vis';
import { DisplayedMap } from '$types/map';
import { Network } from 'vis-network';
import { mapVisNetwork } from '$components/network/networkMapping';

export const VisNetwork: React.FC<{ map?: DisplayedMap }> = ({ map }) => {
    const ref = useRef<HTMLDivElement>(null);
    const network = useRef<Network>();

    useEffect(() => {
        if (typeof map !== 'undefined' && ref.current) {
            const { mappedNodes, mappedEdges } = mapVisNetwork(map);
            const nodes = new DataSet(mappedNodes as Node[]);
            const edges = new DataSet(mappedEdges as Edge[]);
            network.current = new Network(
                ref.current,
                { nodes, edges },
                {
                    layout: {
                        randomSeed: 100
                    },
                    nodes: {
                        shape: 'dot',
                        color: {
                            background: 'white',
                            border: 'blue'
                        },
                        borderWidth: 2,
                        font: {
                            background: 'white',
                            strokeWidth: 2
                        }
                    },
                    edges: {
                        smooth: false
                    },
                    physics: {
                        enabled: false,
                        solver: 'repulsion',
                        repulsion: {
                            nodeDistance: 400
                        }
                    }
                }
            );
        }
    }, [map]);

    return (
        <div ref={ref} className={styles.vis}>
            <canvas />
        </div>
    );
};

export default VisNetwork;
