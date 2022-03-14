import styles from './Network.module.css';
import React, { useEffect, useRef, useState } from 'react';
import { asyncLinksFetch } from '../../async/asyncLinks';
import { asyncGroupsFetch } from '../../async/asyncGroups';
import { asyncIndividualsFetch } from '../../async/asyncIndividuals';
import { GroupWithFlags } from '$types/group';
import { IndividualWithFlags } from '$types/individual';
import { BaseLink } from '$types/linkTypes';
import { DataSet } from 'vis-data';
import { Network as VisNetwork } from 'vis-network';
import type { Edge, Node } from 'vis';

export const Network = () => {
    const [links, setLinks] = useState<BaseLink[]>([]);
    const [groups, setGroups] = useState<GroupWithFlags[]>([]);
    const [individuals, setIndividuals] = useState<IndividualWithFlags[]>([]);
    const ref = useRef<HTMLDivElement>(null);
    const network = useRef<VisNetwork>();
    useEffect(() => {
        asyncLinksFetch().then(setLinks);
        asyncGroupsFetch().then(setGroups);
        asyncIndividualsFetch().then(setIndividuals);
    }, []);

    useEffect(() => {
        if (
            typeof groups !== 'undefined' &&
            typeof links !== 'undefined' &&
            typeof individuals !== 'undefined' &&
            ref.current
        ) {
            const nodes = new DataSet([
                ...groups.map((g) => ({
                    id: g.id,
                    label: g.name,
                    value: g.defaultNodeValue || 1,
                    color: { border: g.defaultNodeColor },
                    shape: g.thumbnail ? 'circularImage' : 'dot',
                    image: {
                        unselected: g.thumbnail
                    }
                })),
                ...individuals.map((i) => ({
                    id: 10000 + i.id,
                    label: `${i.firstname} ${i.lastname}`,
                    value: i.defaultNodeValue || 1,
                    color: { border: i.defaultNodeColor, color: 'white' },
                    shape: i.thumbnail ? 'circularImage' : 'dot',
                    image: {
                        unselected: i.thumbnail
                    }
                }))
            ] as Node[]);
            const edges = new DataSet(
                links.map((l) => ({
                    from: l.g1_id || 10000 + (l.i1_id as number),
                    to: l.g2_id || 10000 + (l.i2_id as number),
                    dashes: l.type === 'unknown',
                    color: l.type === 'past' ? 'red' : 'black'
                })) as Edge[]
            );
            network.current = new VisNetwork(
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
    }, [groups, links, individuals]);

    return (
        <div ref={ref} className={styles.wrapper}>
            <canvas />
        </div>
    );
};
