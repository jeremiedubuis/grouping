import { DisplayedMap, MapGroup, MapIndividual } from '$types/map';
import { BaseLink } from '$types/linkTypes';
import { Individual } from '$types/individual';
import { Group } from '$types/group';

const mapVisIndividual = (i: MapIndividual | Individual) => ({
    id: 10000 + i.id,
    label: `${i.firstname} ${i.lastname}`,
    value: i.defaultNodeValue || 1,
    color: { border: i.defaultNodeColor, color: 'white' },
    shape: i.thumbnail ? 'circularImage' : 'dot',
    image: {
        unselected: i.thumbnail
    }
});

const mapVisGroup = (g: MapGroup | Group) => ({
    id: g.id,
    label: g.name,
    value: g.defaultNodeValue || 1,
    color: { border: g.defaultNodeColor },
    shape: g.thumbnail ? 'circularImage' : 'dot',
    image: {
        unselected: g.thumbnail
    }
});

const mapVisEdge = (l: BaseLink) => ({
    from: l.g1_id || 10000 + (l.i1_id as number),
    to: l.g2_id || 10000 + (l.i2_id as number),
    dashes: l.type === 'unknown',
    color: l.type === 'past' ? 'red' : 'black'
});

const mapSigmaGroup = (g: MapGroup | Group) => ({
    key: g.id.toString(),
    attributes: {
        label: g.name,
        color: (g as MapGroup).nodeColor || g.defaultNodeColor,
        size: (((g as MapGroup).nodeValue || g.defaultNodeValue || 0) + 1) * 5,
        type: g.thumbnail ? 'image' : 'border',
        image: g.thumbnail
    }
});

const mapSigmaIndividual = (i: MapIndividual | Individual) => ({
    key: (100000 + i.id).toString(),
    attributes: {
        label: `${i.lastname} ${i.firstname}`,
        color: (i as MapIndividual).nodeColor || i.defaultNodeColor,
        size: (((i as MapIndividual).nodeValue || i.defaultNodeValue || 0) + 1) * 5,
        type: i.thumbnail ? 'image' : 'border',
        image: i.thumbnail
    }
});

const mapSigmaEdge = (l: BaseLink, i: number) => ({
    key: i.toString(),
    source: (l.g1_id || 100000 + (l.i1_id as number)).toString(),
    target: (l.g2_id || 100000 + (l.i2_id as number)).toString(),
    color: l.type === 'past' ? 'red' : 'black',
    type: l.type === 'unknown' ? 'dashed' : 'line',
    size: 2
});

const mapD3Group = (g: MapGroup | Group) => ({
    id: g.id,
    name: g.name,
    color: (g as MapGroup).nodeColor || g.defaultNodeColor,
    value: (g as MapGroup).nodeValue || g.defaultNodeValue || 1,
    thumbnail: g.thumbnail,
    type: 'group'
});

const mapD3Individual = (i: MapIndividual | Individual) => ({
    id: 100000 + i.id,
    name: `${i.lastname} ${i.firstname}`,
    color: (i as MapIndividual).nodeColor || i.defaultNodeColor,
    value: (i as MapIndividual).nodeValue || i.defaultNodeValue || 1,
    thumbnail: i.thumbnail,
    type: 'individual'
});

const mapD3Edge = (l: BaseLink) => ({
    source: l.g1_id || 100000 + (l.i1_id as number),
    target: l.g2_id || 100000 + (l.i2_id as number),
    type: l.type === 'unknown' ? 'dashed' : 'line'
});

const mapNetwork = (
    map: DisplayedMap,
    mapGroup: (g: MapGroup | Group) => any,
    mapIndividual: (i: MapIndividual | Individual) => any,
    mapEdge: (l: BaseLink, i: number) => any
) => {
    const mappedNodes = [...map.groups.map(mapGroup), ...map.individuals.map(mapIndividual)];
    const mappedEdges = map.links.map(mapEdge);
    return { mappedNodes, mappedEdges };
};

export const mapVisNetwork = (map: DisplayedMap) =>
    mapNetwork(map, mapVisGroup, mapVisIndividual, mapVisEdge);

export const mapSigmaNetwork = (map: DisplayedMap) =>
    mapNetwork(map, mapSigmaGroup, mapSigmaIndividual, mapSigmaEdge);

export const mapD3Network = (map: DisplayedMap) =>
    mapNetwork(map, mapD3Group, mapD3Individual, mapD3Edge);
