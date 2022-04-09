import styles from './Network.module.css';
import React, { useEffect, useRef } from 'react';
import { mapD3Network } from '$components/network/networkMapping';
import { DisplayedMap } from '$types/map';
import { select, forceSimulation, forceLink, forceManyBody, forceCenter, color } from 'd3';
import throttle from 'lodash/throttle';
import isEqual from 'lodash/isEqual';

type RenderedNode = {
    id: number;
    type: 'group' | 'individual';
    radius: number;
    diameter: number;
    raw: {
        radius: number;
        diameter: number;
        center: [x: number, y: number];
    };
    center: [x: number, y: number];
    topLeft: [x: number, y: number];
    textMargin: number;
};

const getCoords = (e: any): [x: number, y: number] =>
    e.touches && e.touches[0]
        ? [e.touches[0].clientX, e.touches[0].clientY]
        : [e.clientX, e.clientY];

type D3NetworkGraphOptions = {
    linksOnHover?: boolean;
    setActiveEntity?: (id: number, type: 'group' | 'individual') => void;
};

class D3NetworkGraph {
    width: number = 0;
    height: number = 0;
    margin: any;
    context: CanvasRenderingContext2D;
    nodes: any;
    edges: any;
    lastTick: number;
    simulation: any;
    parent: HTMLDivElement;
    canvas: HTMLCanvasElement;
    scratchCanvas: HTMLCanvasElement | null = null;
    scratchContext: CanvasRenderingContext2D | null = null;
    left: number = 0;
    top: number = 0;
    options: D3NetworkGraphOptions;
    scale: number = 1;
    constructor(canvas: HTMLCanvasElement, map: DisplayedMap, options: D3NetworkGraphOptions) {
        const { mappedNodes, mappedEdges } = mapD3Network(map);
        this.canvas = canvas;
        this.options = options;

        this.parent = this.canvas.parentNode as HTMLDivElement;

        this.setSize();

        this.context = canvas.getContext('2d') as CanvasRenderingContext2D;
        this.lastTick = Date.now();
        this.load(mappedNodes, () => {
            this.addForce(mappedNodes, mappedEdges);
            this.addEventListeners();
            const now = Date.now();
            this.lastTick = now;
        });
    }

    activeNodeId?: number;
    renderedNodes: RenderedNode[] = [];
    hoveredNodeIds: number[] = [];

    //@ts-ignore
    loadedImages: { [url: string]: Image } = {};

    async load(nodes, cb: Function) {
        await Promise.all(
            nodes
                .filter((n) => n.thumbnail)
                .map(
                    ({ thumbnail }) =>
                        new Promise((resolve) => {
                            if (!this.loadedImages[thumbnail]) {
                                const img = new Image();
                                img.onload = () => {
                                    this.loadedImages[thumbnail] = img;
                                    resolve(thumbnail);
                                };
                                img.onerror = () => resolve(thumbnail);
                                img.src = thumbnail;
                            }
                        })
                )
        );
        cb();
    }

    computeNode({ id, type, value, x, y }): RenderedNode {
        const radius = 30 + value * 2;
        const diameter = radius * 2;

        const scaledRadius = radius * this.scale;

        const left = this.left - (this.left * (this.scale - 1)) / 2;
        const top = this.top - (this.top * (this.scale - 1)) / 2;

        const center: [number, number] = [x * this.scale + left, y * this.scale + top];

        return {
            id,
            type,
            radius: scaledRadius,
            diameter: diameter * this.scale,
            raw: {
                radius,
                diameter,
                center: [x, y]
            },
            center,
            topLeft: center.map((n) => n - scaledRadius) as [number, number],
            textMargin: scaledRadius + 25
        };
    }

    computeLink({ source, target }) {
        const left = this.left - (this.left * (this.scale - 1)) / 2;
        const top = this.top - (this.top * (this.scale - 1)) / 2;
        return {
            raw: {
                source: [source.x, source.y],
                target: [target.x, target.y]
            },
            source: [source.x * this.scale + left, source.y * this.scale + top],
            target: [target.x * this.scale + left, target.y * this.scale + top]
        };
    }

    render = () => {
        this.renderedNodes = [];
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.edges.forEach(this.drawLink);
        this.context.strokeStyle = '#fff';
        for (const node of this.nodes) {
            this.drawNode(node);
        }

        this.renderHovered(this.hoveredNodeIds);
        if (typeof this.activeNodeId !== 'undefined' && this.activeNodeId !== null)
            this.renderActive(this.activeNodeId);
        const now = Date.now();
        this.lastTick = now;
    };

    drawLink = (d) => {
        if (
            this.options.linksOnHover &&
            !this.hoveredNodeIds.find((id) => id === d.source.id || id === d.target.id)
        ) {
            return;
        }
        this.context.beginPath();
        if (d.type === 'dashed') {
            this.context.setLineDash([5, 5]);
        }
        const link = this.computeLink(d);
        this.context.lineWidth = 3;
        this.context.moveTo(link.source[0], link.source[1]);
        this.context.lineTo(link.target[0], link.target[1]);
        this.context.strokeStyle = '#aaa';
        this.context.stroke();
        this.context.setLineDash([]);
    };

    drawNode = (d) => {
        const node = this.computeNode(d);

        this.context.beginPath();

        this.context.fillStyle = d.color;
        this.context.arc(node.center[0], node.center[1], node.radius, 0, 2 * Math.PI);
        this.context.textAlign = 'center';
        this.context.font = '14px Arial';
        this.context.fillText(d.name, node.center[0], node.center[1] + node.textMargin);

        this.context.fillStyle = color(d);
        this.context.fill();
        this.context.stroke();
        if (this.loadedImages[d.thumbnail]) this.renderImage(d, node);
        this.renderedNodes.push(node);
        this.context.save();
    };

    getScratchContext(size) {
        if (!this.scratchCanvas || !this.scratchContext) {
            this.scratchCanvas = document.createElement('canvas');
            this.scratchContext = this.scratchCanvas.getContext('2d') as CanvasRenderingContext2D;
        }
        this.scratchCanvas.width = size;
        this.scratchCanvas.height = size;
        this.scratchContext.clearRect(0, 0, size, size);
        return this.scratchContext;
    }

    renderImage = (d, node: RenderedNode) => {
        const img = this.loadedImages[d.thumbnail];
        const ctx = this.getScratchContext(node.diameter);
        ctx.drawImage(img, 0, 0, node.diameter, node.diameter);
        ctx.fillStyle = '#fff'; //color doesn't matter, but we want full opacity
        ctx.globalCompositeOperation = 'destination-in';
        ctx.beginPath();
        ctx.arc(node.radius, node.radius, node.radius, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
        this.context.drawImage(
            this.scratchCanvas as HTMLCanvasElement,
            node.topLeft[0],
            node.topLeft[1],
            node.diameter,
            node.diameter
        );
    };

    renderHovered(hoveredNodeIds: number[]) {
        const hoveredNodes = this.renderedNodes.filter(({ id }) => hoveredNodeIds.includes(id));
        this.parent.style.cursor = hoveredNodes.length ? 'pointer' : 'default';
        hoveredNodes.forEach((n) => {
            this.context.beginPath();
            this.context.strokeStyle = 'blue';
            this.context.lineWidth = 3;
            this.context.arc(n.center[0], n.center[1], n.radius, 0, 2 * Math.PI, true);
            this.context.stroke();
        });
    }

    renderActive(activeNodeId: number) {
        this.context.beginPath();
        this.context.strokeStyle = 'cyan';
        this.context.lineWidth = 3;
        const n = this.renderedNodes.find(({ id }) => id === activeNodeId) as RenderedNode;
        this.context.arc(n.center[0], n.center[1], n.radius, 0, 2 * Math.PI, true);
        this.context.stroke();
    }

    addForce(nodes, edges) {
        this.simulation = forceSimulation(nodes) // Force algorithm is applied to data.nodes
            .force(
                'link',
                forceLink() // This force provides links between nodes
                    .id(function (d) {
                        return d.id;
                    }) // This provide  the id of a node
                    .links(edges) // and this the list of links
            )
            .force('charge', forceManyBody().strength(-5000 * this.scale)) // This adds repulsion between nodes. Play with the -400 for the repulsion strength
            .force('center', forceCenter(this.canvas.width / 2, this.canvas.height / 2)) // This force attracts nodes to the center of the svg area
            .on('end', () => {
                const now = Date.now();
                this.lastTick = now;
                this.setGraphSize(nodes, edges);
                this.render();
            });
        this.simulation.tick(300);
        select(this.context.canvas).node();
    }

    findNodesFromCoords(coords: [x: number, y: number]) {
        return this.renderedNodes.filter(({ center: [x, y], radius }) => {
            return Math.pow(coords[0] - x, 2) + Math.pow(coords[1] - y, 2) < Math.pow(radius, 2);
        });
    }

    setGraphSize(nodes, edges) {
        const [[smallestX, smallestY], [largestX, largestY]] = nodes.reduce((acc, node) => {
            if (!acc) {
                return [
                    [node.x, node.y],
                    [node.x, node.y]
                ];
            }

            if (acc[0][0] > node.x) acc[0][0] = node.x;
            if (acc[0][1] > node.y) acc[0][1] = node.y;

            if (acc[1][0] < node.x) acc[1][0] = node.x;
            if (acc[1][1] < node.y) acc[1][1] = node.y;
            return acc;
        }, null);
        const l = smallestX;
        const t = smallestY;
        const r = largestX;
        const b = largestY;
        this.width = r - l;
        this.height = b - t;

        this.nodes = nodes.map((n) => ({ ...n, x: n.x - smallestX, y: n.y - smallestY }));
        this.edges = edges.map((n) => ({
            ...n,
            source: { x: n.source.x - smallestX, y: n.source.y - smallestY },
            target: { x: n.target.x - smallestX, y: n.target.y - smallestY }
        }));
        this.left = (this.canvas.width - this.width) * 0.5;
        this.top = (this.canvas.height - this.height) * 0.5;
    }

    setSize() {
        this.canvas.width = this.parent.offsetWidth;
        this.canvas.height = this.parent.offsetHeight;
        if (this.parent.offsetWidth < this.width || this.parent.offsetHeight < this.height) {
            if (
                this.width > this.parent.offsetWidth ||
                this.parent.offsetHeight > this.canvas.height
            ) {
                this.left = (this.parent.offsetWidth - this.width) / 2;
                this.top = (this.parent.offsetHeight - this.height) / 2;
            }
        }

        this.left = (this.parent.offsetWidth - this.width) / 2;
        this.top = (this.parent.offsetHeight - this.height) / 2;
    }

    addEventListeners() {
        this.parent.addEventListener(
            'mousemove',
            throttle((e) => {
                this.context.restore();
                const prevHoveredNodeIds = this.hoveredNodeIds;
                this.hoveredNodeIds = this.findNodesFromCoords([e.offsetX, e.offsetY]).map(
                    (n) => n.id
                );

                if (!isEqual(this.hoveredNodeIds, prevHoveredNodeIds)) this.update();
            }, 10)
        );
        const downEvents = ['mousedown', 'touchstart'];

        const moveEvents = ['mousemove', 'touchmove'];
        const upEvents = ['mouseup', 'touchend'];
        let down: boolean = false;
        let start: number[];
        downEvents.map((event) =>
            this.parent.addEventListener(event, (e: any) => {
                down = true;
                start = getCoords(e);
            })
        );
        moveEvents.map((event) =>
            window.addEventListener(event, (e: any) => {
                if (down) {
                    const coords = getCoords(e);
                    const delta = start.map((s, i) => s - coords[i]);
                    this.left -= delta[0] * this.scale;
                    this.top -= delta[1] * this.scale;
                    start = coords;
                    this.update();
                }
            })
        );
        upEvents.map((event) =>
            window.addEventListener(event, () => {
                down = false;
            })
        );

        downEvents.map((event) =>
            this.parent.addEventListener(event, (e: any) => {
                const clickedNodes = this.findNodesFromCoords([e.offsetX, e.offsetY]);
                if (clickedNodes.length) {
                    this.activeNodeId = clickedNodes[0].id;
                    this.update();
                    this.options.setActiveEntity?.(
                        clickedNodes[0].id > 100000
                            ? clickedNodes[0].id - 100000
                            : clickedNodes[0].id,
                        clickedNodes[0].type
                    );
                }
            })
        );

        this.parent.addEventListener('wheel', (e) => {
            this.scale = Math.max(0.5, this.scale + (e.deltaY > 0 ? -0.1 : 0.1));
            this.update();
        });

        window.addEventListener('resize', () => {
            this.setSize();
            this.update();
        });
    }

    update() {
        this.lastTick = Date.now();
        this.render();
    }
}

export const D3Network: React.FC<{
    map: DisplayedMap;
    linksOnHover?: boolean;
    setActiveEntity: (entity: { id: number; type: 'individual' | 'group' }) => void;
}> = ({ map, linksOnHover, setActiveEntity }) => {
    const ref = useRef<HTMLCanvasElement>(null);
    const graph = useRef<D3NetworkGraph>();
    useEffect(() => {
        if (ref.current) {
            graph.current = new D3NetworkGraph(ref.current, map, {
                linksOnHover,
                setActiveEntity: (id, type) => {
                    setActiveEntity({ id, type });
                }
            });
        }
    }, []);

    return (
        <div className={styles.d3}>
            <canvas ref={ref} />
        </div>
    );
};

export default D3Network;
