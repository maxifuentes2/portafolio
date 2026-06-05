import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

export const scrollState = { progress: 0 };
const mouseRef = { x: 0, y: 0 };

function generatePCB(w, h) {
    const chips = [];
    const traces = [];
    const vias = [];
    const numChips = 18;

    for (let i = 0; i < numChips; i++) {
        const cx = (Math.random() - 0.5) * w * 0.8;
        const cy = (Math.random() - 0.5) * h * 0.8;
        const cw = 0.4 + Math.random() * 0.8;
        const ch = 0.4 + Math.random() * 0.8;
        const pins = 4 + Math.floor(Math.random() * 8) * 2;
        chips.push({ x: cx, y: cy, w: cw, h: ch, pins });
    }

    for (let i = 0; i < chips.length; i++) {
        for (let j = i + 1; j < chips.length; j++) {
            if (Math.random() > 0.3) continue;
            const a = chips[i], b = chips[j];
            const ax = a.x + (Math.random() - 0.5) * a.w * 0.5;
            const ay = a.y + (Math.random() - 0.5) * a.h * 0.5;
            const bx = b.x + (Math.random() - 0.5) * b.w * 0.5;
            const by = b.y + (Math.random() - 0.5) * b.h * 0.5;

            const midX = (ax + bx) / 2;
            const midY = (ay + by) / 2;

            const segs = 2 + Math.floor(Math.random() * 3);
            const points = [{ x: ax, y: ay }];
            for (let k = 1; k < segs; k++) {
                const t = k / segs;
                const px = ax + (bx - ax) * t + (Math.random() - 0.5) * 1.5;
                const py = ay + (by - ay) * t + (Math.random() - 0.5) * 1.5;
                points.push({ x: px, y: py });
            }
            points.push({ x: bx, y: by });

            for (let k = 0; k < points.length - 1; k++) {
                traces.push({
                    x1: points[k].x, y1: points[k].y,
                    x2: points[k + 1].x, y2: points[k + 1].y,
                    mx: (points[k].x + points[k + 1].x) / 2,
                    my: (points[k].y + points[k + 1].y) / 2,
                    base: 0.3 + Math.random() * 0.4,
                });
                if (Math.random() > 0.5) {
                    vias.push({
                        x: (points[k].x + points[k + 1].x) / 2 + (Math.random() - 0.5) * 0.2,
                        y: (points[k].y + points[k + 1].y) / 2 + (Math.random() - 0.5) * 0.2,
                        r: 0.04 + Math.random() * 0.04,
                    });
                }
            }
        }
    }

    return { chips, traces, vias };
}

const pcb = generatePCB(24, 14);

function Chips({ dark }) {
    const ref = useRef();
    const chipColor = dark ? "#1a1a2e" : "#d4d4d4";

    const data = useMemo(() => {
        const positions = [];
        const sizes = [];
        const pinPos = [];
        for (const c of pcb.chips) {
            positions.push(c.x, c.y, 0);
            sizes.push(c.w, c.h);
            for (let p = 0; p < c.pins; p++) {
                const angle = (p / c.pins) * Math.PI * 2;
                const px = c.x + Math.cos(angle) * Math.max(c.w, c.h) * 0.6;
                const py = c.y + Math.sin(angle) * Math.max(c.w, c.h) * 0.6;
                pinPos.push(px, py, 0);
            }
        }
        return { positions: new Float32Array(positions), sizes: new Float32Array(sizes), pinPos: new Float32Array(pinPos) };
    }, []);

    useFrame(({ clock }) => {
        const s = scrollState.progress;
        if (ref.current) {
            ref.current.position.y = -s * 2;
        }
    });

    return (
        <group ref={ref}>
            {pcb.chips.map((c, i) => (
                <mesh key={i} position={[c.x, c.y, 0.01]}>
                    <planeGeometry args={[c.w, c.h]} />
                    <meshBasicMaterial color={chipColor} transparent opacity={0.9} />
                </mesh>
            ))}
            <points>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={data.pinPos.length / 3} array={data.pinPos} itemSize={3} />
                </bufferGeometry>
                <pointsMaterial size={0.04} color="#d4a017" transparent opacity={0.8} sizeAttenuation blending={THREE.AdditiveBlending} />
            </points>
        </group>
    );
}

function Traces({ dark }) {
    const linesRef = useRef();
    const traceColor = dark ? { r: 0.2, g: 0.7, b: 1.0 } : { r: 0.35, g: 0.35, b: 0.35 };

    const positions = useMemo(() => {
        const arr = [];
        for (const t of pcb.traces) {
            arr.push(t.x1, t.y1, 0.005, t.x2, t.y2, 0.005);
        }
        return new Float32Array(arr);
    }, []);

    useFrame(({ clock }) => {
        const mx = mouseRef.x * 14;
        const my = mouseRef.y * 8;
        const pulse = scrollState.progress;
        const elapsed = clock.getElapsedTime();

        const col = linesRef.current?.geometry.attributes.color;
        if (!col) return;
        const arr = col.array;
        const glowScale = dark ? 1.5 : 1.2;
        let idx = 0;
        for (const t of pcb.traces) {
            const d = Math.min(
                Math.sqrt((t.x1 - mx) ** 2 + (t.y1 - my) ** 2),
                Math.sqrt((t.x2 - mx) ** 2 + (t.y2 - my) ** 2)
            );
            const glow = Math.max(0, 1 - d / 3.5) * glowScale;

            const wave = (Math.sin(t.mx * 0.3 + t.my * 0.2 + pulse * Math.PI * 5 + elapsed * 0.2) * 0.5 + 0.5) * 0.5;

            const b = Math.min(1, t.base + glow + wave);
            const r = b * traceColor.r + glow * 0.4;
            const g = b * traceColor.g + glow * 0.7;
            const bl = b * traceColor.b + glow * 0.5;
            arr[idx] = r; arr[idx + 1] = g; arr[idx + 2] = bl;
            arr[idx + 3] = r; arr[idx + 4] = g; arr[idx + 5] = bl;
            idx += 6;
        }
        col.needsUpdate = true;
    });

    const colors = useMemo(() => {
        const arr = [];
        for (const t of pcb.traces) {
            const b = t.base;
            arr.push(b * traceColor.r, b * traceColor.g, b * traceColor.b, b * traceColor.r, b * traceColor.g, b * traceColor.b);
        }
        return new Float32Array(arr);
    }, []);

    return (
        <lineSegments ref={linesRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
                <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
            </bufferGeometry>
            <lineBasicMaterial vertexColors linewidth={1} transparent opacity={1} />
        </lineSegments>
    );
}

function Vias({ dark }) {
    const ref = useRef();
    const count = pcb.vias.length;

    const positions = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            arr[i * 3] = pcb.vias[i].x;
            arr[i * 3 + 1] = pcb.vias[i].y;
            arr[i * 3 + 2] = 0.01;
        }
        return arr;
    }, []);

    useFrame(({ clock }) => {
        const mx = mouseRef.x * 14;
        const my = mouseRef.y * 8;
        const s = scrollState.progress;
        const geo = ref.current?.geometry;
        if (!geo) return;
        const size = geo.attributes.size;
        const pos = geo.attributes.position;
        for (let i = 0; i < count; i++) {
            const d = Math.sqrt((pos.array[i * 3] - mx) ** 2 + (pos.array[i * 3 + 1] - my) ** 2);
            const swell = Math.max(0, 1 - d / 2.5) * 0.15;
            const w = Math.sin(pos.array[i * 3] * 0.3 + pos.array[i * 3 + 1] * 0.2 + s * Math.PI * 5 + clock.getElapsedTime() * 0.2) * 0.02 + 0.02;
            size.array[i] = 0.04 + swell + w;
        }
        size.needsUpdate = true;
    });

    const sizes = useMemo(() => {
        const arr = new Float32Array(count);
        for (let i = 0; i < count; i++) arr[i] = 0.04 + pcb.vias[i].r * 0.5;
        return arr;
    }, []);

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
                <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} />
            </bufferGeometry>
            <pointsMaterial size={0.08} color={dark ? "#d4a017" : "#888888"} transparent opacity={dark ? 0.7 : 0.5} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
        </points>
    );
}

function Layer({ z, parallax, dark }) {
    const groupRef = useRef();

    useFrame(() => {
        const s = scrollState.progress;
        if (groupRef.current) {
            groupRef.current.position.y = -s * 3 * parallax;
            groupRef.current.position.z = z - s * 0.4 * parallax;
        }
    });

    return (
        <group ref={groupRef}>
            <Chips dark={dark} />
            <Traces dark={dark} />
            <Vias dark={dark} />
        </group>
    );
}

function Particles({ dark }) {
    const ref = useRef();
    const count = 300;
    const pos = useMemo(() => {
        const arr = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) arr[i] = (Math.random() - 0.5) * 50;
        return arr;
    }, []);

    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += 0.0004;
            ref.current.position.y = -scrollState.progress * 2;
        }
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={pos} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.04} color={dark ? "#4466ff" : "#aaaaaa"} transparent opacity={dark ? 0.15 : 0.05} sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false} />
        </points>
    );
}

function CameraRig() {
    useFrame(({ camera }) => {
        const s = scrollState.progress;
        const mx = mouseRef.x * 0.25;
        const my = mouseRef.y * 0.2;
        camera.position.x += (mx - camera.position.x) * 0.03;
        camera.position.y += (my - s * 0.4 - camera.position.y) * 0.03;
        camera.position.z += (11 - s * 1.5 - camera.position.z) * 0.03;
        camera.lookAt(0, -s * 1.2, 0);
    });
    return null;
}

function SceneContent({ dark }) {
    return (
        <>
            <ambientLight intensity={dark ? 0.03 : 0.1} />
            <Layer z={-5} parallax={0.3} dark={dark} />
            <Layer z={0} parallax={1.0} dark={dark} />
            <Layer z={5} parallax={1.7} dark={dark} />
            <Particles dark={dark} />
            <CameraRig />
            <EffectComposer>
                <Bloom luminanceThreshold={dark ? 0.06 : 0.5} luminanceSmoothing={dark ? 0.93 : 0.95} intensity={dark ? 0.9 : 0.1} mipmapBlur />
                <Vignette eskil={false} offset={dark ? 0.25 : 0} darkness={dark ? 0.5 : 0} />
            </EffectComposer>
        </>
    );
}

export default function ThreeBackground({ darkMode }) {
    useEffect(() => {
        const handleScroll = () => {
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            scrollState.progress = docHeight > 0 ? window.scrollY / docHeight : 0;
        };
        const handleMouse = (e) => {
            mouseRef.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouseRef.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("mousemove", handleMouse, { passive: true });
        handleScroll();
        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("mousemove", handleMouse);
        };
    }, []);

    return (
        <div className="three-background">
            <Canvas
                camera={{ position: [0, 0, 11], fov: 50 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: false }}
                style={{ background: darkMode ? "#0a1628" : "#ffffff" }}
            >
                <SceneContent dark={darkMode} />
            </Canvas>
        </div>
    );
}
