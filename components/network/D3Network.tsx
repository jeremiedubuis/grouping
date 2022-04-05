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
    x: number;
    y: number;
    radius: number;
};

const getCoords = (e: any) =>
    e.touches && e.touches[0]
        ? [e.touches[0].clientX, e.touches[0].clientY]
        : [e.clientX, e.clientY];

type D3NetworkGraphOptions = {
    linksOnHover?: boolean;
};

class D3NetworkGraph {
    width: number;
    height: number;
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
    constructor(canvas: HTMLCanvasElement, map: DisplayedMap, options: D3NetworkGraphOptions) {
        const { mappedNodes, mappedEdges } = mapD3Network(map);
        this.nodes = mappedNodes;
        this.edges = mappedEdges;
        this.canvas = canvas;
        this.options = options;

        this.parent = this.canvas.parentNode as HTMLDivElement;
        this.width = canvas.width = this.nodes.length * 70;
        this.height = canvas.height = this.nodes.length * 70;

        this.context = canvas.getContext('2d') as CanvasRenderingContext2D;
        this.lastTick = Date.now();
        this.load(() => {
            this.addForce();
            this.addEventListeners();
            const now = Date.now();
            this.lastTick = now;
        });
    }

    renderedNodes: RenderedNode[] = [];
    hoveredNodes: RenderedNode[] = [];

    //@ts-ignore
    loadedImages: { [url: string]: Image } = {};

    async load(cb: Function) {
        await Promise.all(
            this.nodes
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

    render = () => {
        this.renderedNodes = [];
        this.context.clearRect(0, 0, this.width, this.height);
        this.edges.forEach(this.drawLink);
        this.context.strokeStyle = '#fff';
        for (const node of this.nodes) {
            this.drawNode(node);
        }

        this.renderHovered(this.hoveredNodes);
        const now = Date.now();
        this.lastTick = now;
    };

    drawLink = (d) => {
        if (
            this.options.linksOnHover &&
            !this.hoveredNodes.find(({ id }) => id === d.source.id || id === d.target.id)
        ) {
            return;
        }
        this.context.beginPath();
        if (d.type === 'dashed') {
            this.context.setLineDash([5, 5]);
        }
        this.context.lineWidth = 3;
        this.context.moveTo(d.source.x, d.source.y);
        this.context.lineTo(d.target.x, d.target.y);
        this.context.strokeStyle = '#aaa';
        this.context.stroke();
        this.context.setLineDash([]);
    };

    drawNode = (d) => {
        this.context.beginPath();
        const radius = 30 + d.value * 2;

        this.context.moveTo(d.x + radius, d.y);
        this.context.fillStyle = d.color;
        this.context.arc(d.x, d.y, radius, 0, 2 * Math.PI);
        this.context.textAlign = 'center';
        this.context.font = '14px Arial';
        this.context.fillText(d.name, d.x, d.y + radius + 25);

        this.context.fillStyle = color(d);
        this.context.fill();
        this.context.stroke();
        if (this.loadedImages[d.thumbnail]) this.renderImage(d, radius);
        this.renderedNodes.push({ id: d.id, x: d.x, y: d.y, radius, type: d.type });
        this.context.save();
    };

    getScratchContext(radius) {
        if (!this.scratchCanvas || !this.scratchContext) {
            this.scratchCanvas = document.createElement('canvas');
            this.scratchContext = this.scratchCanvas.getContext('2d') as CanvasRenderingContext2D;
        }
        this.scratchCanvas.width = radius * 2;
        this.scratchCanvas.height = radius * 2;
        this.scratchContext.clearRect(0, 0, radius, radius);
        return this.scratchContext;
    }

    renderImage = (d, radius) => {
        const img = this.loadedImages[d.thumbnail];
        const ctx = this.getScratchContext(radius);
        ctx.drawImage(img, 0, 0, radius * 2, radius * 2);
        ctx.fillStyle = '#fff'; //color doesn't matter, but we want full opacity
        ctx.globalCompositeOperation = 'destination-in';
        ctx.beginPath();
        ctx.arc(radius, radius, radius, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.fill();
        ctx.globalCompositeOperation = 'source-over';
        this.context.drawImage(
            this.scratchCanvas as HTMLCanvasElement,
            d.x - radius,
            d.y - radius,
            radius * 2,
            radius * 2
        );
    };

    renderHovered(hoveredNodes: RenderedNode[]) {
        this.parent.style.cursor = hoveredNodes.length ? 'pointer' : 'default';
        hoveredNodes.forEach((n) => {
            this.context.beginPath();
            this.context.strokeStyle = 'blue';
            this.context.lineWidth = 3;
            this.context.arc(n.x, n.y, n.radius, 0, 2 * Math.PI, true);
            this.context.stroke();
        });
    }

    addForce() {
        this.simulation = forceSimulation(this.nodes) // Force algorithm is applied to data.nodes
            .force(
                'link',
                forceLink() // This force provides links between nodes
                    .id(function (d) {
                        return d.id;
                    }) // This provide  the id of a node
                    .links(this.edges) // and this the list of links
            )
            .force('charge', forceManyBody().strength(-5000)) // This adds repulsion between nodes. Play with the -400 for the repulsion strength
            .force('center', forceCenter(this.width / 2, this.height / 2)) // This force attracts nodes to the center of the svg area
            .on('end', () => {
                const now = Date.now();
                this.lastTick = now;
                this.render();
            });
        this.simulation.tick(300);
        select(this.context.canvas).node();
    }

    addEventListeners() {
        this.parent.addEventListener(
            'mousemove',
            throttle((e) => {
                this.context.restore();
                const prevHoveredNodes = this.hoveredNodes;
                this.hoveredNodes = this.renderedNodes.filter(({ x, y, radius }) => {
                    return (
                        Math.pow(e.offsetX - x - this.left, 2) +
                            Math.pow(e.offsetY - y - this.top, 2) <
                        Math.pow(radius, 2)
                    );
                });

                if (!isEqual(this.hoveredNodes, prevHoveredNodes)) this.update();
            }, 10)
        );

        if (
            this.parent.offsetWidth < this.canvas.width ||
            this.parent.offsetHeight < this.canvas.height
        ) {
            if (
                this.canvas.width > this.parent.offsetWidth ||
                this.parent.offsetHeight > this.canvas.height
            ) {
                this.left = (this.parent.offsetWidth - this.canvas.width) / 2;
                this.top = (this.parent.offsetHeight - this.canvas.height) / 2;
                this.canvas.style.left = `${this.left}px`;
                this.canvas.style.top = `${this.top}px`;
            }

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
                        this.left -= delta[0];
                        this.canvas.style.left = `${this.left}px`;
                        this.top -= delta[1];
                        this.canvas.style.top = `${this.top}px`;
                        start = coords;
                    }
                })
            );
            upEvents.map((event) =>
                window.addEventListener(event, () => {
                    down = false;
                })
            );
        } else {
            this.left = (this.parent.offsetWidth - this.canvas.width) / 2;
            this.top = (this.parent.offsetHeight - this.canvas.height) / 2;
            this.canvas.style.left = `${this.left}px`;
            this.canvas.style.top = `${this.top}px`;
        }
    }

    update() {
        this.lastTick = Date.now();
        this.render();
    }
}

export const D3Network: React.FC<{ map: DisplayedMap; linksOnHover?: boolean }> = ({
    map,
    linksOnHover
}) => {
    const ref = useRef<HTMLCanvasElement>(null);
    const graph = useRef<D3NetworkGraph>();
    useEffect(() => {
        if (ref.current) {
            graph.current = new D3NetworkGraph(ref.current, map, { linksOnHover });
        }
    }, []);

    return (
        <div className={styles.d3}>
            <canvas ref={ref} />
        </div>
    );
};

export default D3Network;
