import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./TechParallax.css";
gsap.registerPlugin(ScrollTrigger);

function generatePCBTraces(w, h) {
    const traces = [];
    for (let i = 0; i < 50; i++) {
        let x = Math.random() * w;
        let y = Math.random() * h * 0.7 + h * 0.15;
        const segs = 3 + Math.floor(Math.random() * 6);
        let d = `M${x},${y}`;
        for (let j = 0; j < segs; j++) {
            const horiz = Math.random() > 0.5;
            const len = 30 + Math.random() * 150;
            if (horiz) x += (Math.random() > 0.5 ? 1 : -1) * len;
            else y += (Math.random() > 0.5 ? 1 : -1) * len;
            if (j < segs - 1 && Math.random() > 0.4) {
                const mx = horiz ? x : x + (Math.random() - 0.5) * 20;
                const my = horiz ? y + (Math.random() - 0.5) * 20 : y;
                d += ` L${mx},${my}`;
            }
            d += ` L${x},${y}`;
        }
        const coords = [...d.matchAll(/[\d.-]+/g)].map(Number);
        const xs = coords.filter((_, idx) => idx % 2 === 0);
        const ys = coords.filter((_, idx) => idx % 2 === 1);
        const cx = xs.reduce((a, b) => a + b, 0) / xs.length;
        const cy = ys.reduce((a, b) => a + b, 0) / ys.length;
        traces.push({ d, w: 0.8 + Math.random() * 2, cx, cy });
    }
    return traces;
}

function generateVias(w, h) {
    const vias = [];
    for (let i = 0; i < 80; i++) {
        vias.push({
            cx: Math.random() * w,
            cy: Math.random() * h * 0.85 + h * 0.05,
            r: 2 + Math.random() * 3,
        });
    }
    return vias;
}

const chipsDef = [
    { x: 120, y: 400, w: 70, h: 50 },
    { x: 320, y: 340, w: 90, h: 60 },
    { x: 540, y: 420, w: 55, h: 40 },
    { x: 700, y: 300, w: 140, h: 90 },
    { x: 920, y: 380, w: 60, h: 45 },
    { x: 1100, y: 440, w: 80, h: 50 },
    { x: 1280, y: 330, w: 100, h: 65 },
    { x: 200, y: 510, w: 50, h: 35 },
    { x: 600, y: 530, w: 45, h: 30 },
    { x: 840, y: 490, w: 55, h: 38 },
    { x: 1000, y: 540, w: 50, h: 32 },
    { x: 1350, y: 480, w: 65, h: 42 },
].map((c) => {
    const pins = [];
    const pinCount = 8 + Math.floor(Math.random() * 8);
    for (let i = 0; i < pinCount; i++) {
        const edge = i % 4;
        const t = Math.floor(i / 4) / Math.max(1, pinCount / 4 - 1);
        let px, py;
        const m = 5;
        if (edge === 0) { px = c.x - c.w / 2 + m + t * (c.w - m * 2); py = c.y - c.h / 2 - 5; }
        else if (edge === 1) { px = c.x + c.w / 2 + 5; py = c.y - c.h / 2 + m + t * (c.h - m * 2); }
        else if (edge === 2) { px = c.x - c.w / 2 + m + t * (c.w - m * 2); py = c.y + c.h / 2 + 5; }
        else { px = c.x - c.w / 2 - 5; py = c.y - c.h / 2 + m + t * (c.h - m * 2); }
        pins.push({ px, py });
    }
    return { ...c, pins };
});

const tracesData = generatePCBTraces(1440, 900);
const viasData = generateVias(1440, 900);

export default function TechParallax({ darkMode }) {
    const containerRef = useRef(null);
    const scrollRef = useRef(null);
    const svgRef = useRef(null);
    const tracesRef = useRef(null);
    const viasRef = useRef(null);
    const chipsRef = useRef(null);
    const mouseRef = useRef({ x: 720, y: 450 });
    const rafRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const handleMouse = (e) => {
            const svg = svgRef.current;
            if (!svg) return;
            const rect = svg.getBoundingClientRect();
            mouseRef.current = {
                x: ((e.clientX - rect.left) / rect.width) * 1440,
                y: ((e.clientY - rect.top) / rect.height) * 900,
            };
            if (container) {
                gsap.to(container, {
                    rotationX: ((e.clientY / window.innerHeight) - 0.5) * -2,
                    rotationY: ((e.clientX / window.innerWidth) - 0.5) * 2,
                    duration: 1.2,
                    ease: "power2.out",
                    overwrite: "auto",
                });
            }
        };
        window.addEventListener("mousemove", handleMouse, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouse);
    }, []);

    useEffect(() => {
        const paths = tracesRef.current?.querySelectorAll("path");
        if (!paths) return;

        const updateGlow = () => {
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;
            for (let i = 0; i < paths.length; i++) {
                const t = tracesData[i];
                const dx = mx - t.cx;
                const dy = my - t.cy;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const glow = Math.max(0, 1 - dist / 250);
                const opacity = darkMode ? 0.15 + glow * 0.85 : 0.10 + glow * 0.5;
                paths[i].style.opacity = opacity;
            }
            rafRef.current = null;
        };

        const schedule = () => {
            if (!rafRef.current) {
                rafRef.current = requestAnimationFrame(updateGlow);
            }
        };

        window.addEventListener("mousemove", schedule, { passive: true });
        return () => {
            window.removeEventListener("mousemove", schedule);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [darkMode]);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        const ctx = gsap.context(() => {
            gsap.to(el, {
                rotationX: -5,
                transformOrigin: "50% 50%",
                ease: "none",
                scrollTrigger: {
                    trigger: document.body,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1.5,
                },
            });
        }, el);
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        let ticking = false;
        let rafId = null;
        const tracesEl = tracesRef.current;
        const viasEl = viasRef.current;
        const chipsEl = chipsRef.current;
        const update = () => {
            if (!tracesEl || !viasEl || !chipsEl) return;
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const p = max > 0 ? window.scrollY / max : 0;
            tracesEl.style.transform = `translateY(${-p * 150}px)`;
            viasEl.style.transform = `translateY(${-p * 250}px)`;
            chipsEl.style.transform = `translateY(${-p * 400}px)`;
            ticking = false;
        };
        const handleScroll = () => {
            if (!ticking) {
                rafId = requestAnimationFrame(update);
                ticking = true;
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        update();
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    const C = darkMode
        ? {
            bg1: "#000000", bg2: "#0a0a0a",
            grid: "rgba(239,68,68,0.04)",
            trace: "rgba(239,68,68,0.6)",
            via: "#ef4444",
            chip: "#111111", chipStroke: "#222222",
            chipInner: "rgba(20,20,20,0.5)",
            pin: "#331111",
        }
        : {
            bg1: "#f5f0ea", bg2: "#ede5dc",
            grid: "rgba(180,100,60,0.03)",
            trace: "rgba(185,28,28,0.25)",
            via: "#b91c1c",
            chip: "#e8ddd0", chipStroke: "#d5c8b8",
            chipInner: "rgba(220,200,185,0.5)",
            pin: "#b09080",
        };

    return (
        <div ref={containerRef} className="tech-parallax">
            <div ref={scrollRef} className="tech-scroll">
                <svg
                    ref={svgRef}
                    viewBox="0 0 1440 900"
                    preserveAspectRatio="xMidYMax slice"
                    className="tech-svg"
                >
                    <defs>
                        <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0" stopColor={C.bg1} />
                            <stop offset="1" stopColor={C.bg2} />
                        </linearGradient>
                        <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                            <circle cx="15" cy="15" r="0.6" fill={C.grid} />
                        </pattern>
                    </defs>

                    <rect width="1440" height="900" fill="url(#bgGrad)" />
                    <rect width="1440" height="900" fill="url(#grid)" />

                    <g ref={tracesRef}>
                        {tracesData.map((t, i) => (
                            <path key={i} d={t.d} fill="none" stroke={C.trace} strokeWidth={t.w} strokeLinecap="round" strokeLinejoin="round" style={{ opacity: darkMode ? 0.15 : 0.10, transition: "opacity 0.15s" }} />
                        ))}
                    </g>

                    <g ref={viasRef}>
                        {viasData.map((v, i) => (
                            <g key={i}>
                                <circle cx={v.cx} cy={v.cy} r={v.r} fill="none" stroke={C.via} strokeWidth={1} opacity={0.5} />
                                <circle cx={v.cx} cy={v.cy} r={v.r * 0.4} fill={C.via} opacity={0.6} />
                            </g>
                        ))}
                    </g>

                    <g ref={chipsRef}>
                        {chipsDef.map((c, i) => (
                            <g key={i}>
                                <rect x={c.x - c.w / 2} y={c.y - c.h / 2} width={c.w} height={c.h} rx={3} fill={C.chip} stroke={C.chipStroke} strokeWidth={1} />
                                <rect x={c.x - c.w / 2 + 4} y={c.y - c.h / 2 + 4} width={c.w - 8} height={c.h - 8} rx={1} fill={C.chipInner} stroke="none" />
                                {c.pins.map((p, j) => (
                                    <rect key={j} x={p.px - 1.5} y={p.py - 1.5} width={3} height={3} fill={C.pin} opacity={0.7} rx={0.5} />
                                ))}
                            </g>
                        ))}
                    </g>
                </svg>
            </div>
        </div>
    );
}
