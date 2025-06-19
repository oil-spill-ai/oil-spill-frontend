/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-require-imports */
"use client";

import React, { createContext, useContext, useRef, useEffect } from "react";
import * as THREE from "three";
let ThreeGlobe: any;
if (typeof window !== 'undefined') {
  ThreeGlobe = require('three-globe').default;
}
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import countries from "@/geo-files/custom.geo.json";
import lines from "@/geo-files/lines.json";
import map from "@/geo-files/map.json";

type GlobeContextType = {
    scene: THREE.Scene | null;
    renderer: THREE.WebGLRenderer | null;
    camera: THREE.PerspectiveCamera | null;
    controls: OrbitControls | null;
    globe: typeof ThreeGlobe | null;
    initGlobe: (container: HTMLDivElement) => void;
    cleanup: () => void;
};

const GlobeContext = createContext<GlobeContextType | null>(null);

const ARC_COLORS = [
    "#FF6B6B", "#4ECDC4", "#45B7D1",
    "#FFA07A", "#98D8C8", "#F06292",
    "#7986CB", "#9575CD", "#64B5F6",
    "#4DB6AC", "#81C784", "#FFD54F",
    "#9CFF00", "#FF4000", "#FF4F00",
];

const getRandomColor = () => ARC_COLORS[Math.floor(Math.random() * ARC_COLORS.length)];

type Pull = {
    type: string;
    order: number;
    from: string;
    to: string;
    starLat: string;
    starLng: string;
    endLat: string;
    endLng: string;
    arcAlt?: number;
    status?: boolean;
};

type MapPoint = {
    text: string;
    size: number;
    country: string;
    city: string;
    lat: string;
    lng: string;
};

type GlobeObject = object & Partial<Pull> & Partial<MapPoint>;

export function GlobeProvider({ children }: { children: React.ReactNode }) {
    const sceneRef = useRef<THREE.Scene | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const controlsRef = useRef<OrbitControls | null>(null);
    const globeRef = useRef<typeof ThreeGlobe | null>(null);
    const starsRef = useRef<THREE.Points | null>(null);
    const animationFrameId = useRef<number | null>(null);
    const mousePosition = useRef({ x: 0, y: 0 });

    //Функция создания звезд
    const createStars = (scene: THREE.Scene) => {
        const count = 2000;
        const geometry = new THREE.BufferGeometry();

        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        const color = new THREE.Color();

        for (let i = 0; i < count; i++) {
            const radius = 1000 + Math.random() * 500;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);

            color.setHSL(0.1, 0.1, Math.random() * 0.5 + 1);
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;

            sizes[i] = Math.random() * 3 + 5;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.PointsMaterial({
            size: 3,
            vertexColors: true,
            transparent: true,
            opacity: 0.9,
            sizeAttenuation: true,
        });

        const stars = new THREE.Points(geometry, material);
        starsRef.current = stars;
        scene.add(stars);
    };

    const initGlobe = (container: HTMLDivElement) => {
        if (sceneRef.current) {
            if (rendererRef.current?.domElement && !container.contains(rendererRef.current.domElement)) {
                container.appendChild(rendererRef.current.domElement);
            }
            startAnimation();
            return;
        }

        //Инициализация рендера
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        //Инициализация сцены
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x040d21);
        scene.fog = new THREE.Fog(0x535ef3, 400, 1000);
        sceneRef.current = scene;

        //Звездный фон
        createStars(scene);

        //Инициализация камеры
        const camera = new THREE.PerspectiveCamera(
            80,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.set(0, 0, 500);
        cameraRef.current = camera;

        //Свет
        const ambientLight = new THREE.AmbientLight(0xbbbbbb, 0.5);
        scene.add(ambientLight);

        const dLight1 = new THREE.DirectionalLight(0x7982f6, 5);
        dLight1.position.set(-100, 400, 100);
        camera.add(dLight1);

        const dLight2 = new THREE.DirectionalLight(0xffffff, 2);
        dLight2.position.set(-800, 2000, 400);
        camera.add(dLight2);

        const dLight3 = new THREE.DirectionalLight(0x8566cc, 2);
        dLight3.position.set(-200, 500, 200);
        camera.add(dLight3);

        scene.add(camera);

        //Управление
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.01;
        controls.enablePan = false;
        controls.minDistance = 200;
        controls.maxDistance = 230;
        controls.rotateSpeed = 0.8;
        controls.zoomSpeed = 0.1;
        controls.autoRotate = false;
        controls.minPolarAngle = Math.PI / 3.5;
        controls.maxPolarAngle = Math.PI - Math.PI / 3;
        controlsRef.current = controls;

        //Инициализация планеты
        const globe = new (ThreeGlobe as any)({ waitForGlobeReady: true, animateIn: true })
            .hexPolygonsData(countries.features)
            .hexPolygonResolution(4)
            .hexPolygonMargin(0.4)
            .showAtmosphere(true)
            .atmosphereColor("3a228a")
            .atmosphereAltitude(0.1);

        const linesData = lines as { type: string; pulls: Pull[] };
        const mapData = map as { type: string; maps: MapPoint[] };

        const arcsData = linesData.pulls.map(pull => ({
            ...pull,
            startLat: parseFloat(pull.starLat),
            startLng: parseFloat(pull.starLng),
            endLat: parseFloat(pull.endLat),
            endLng: parseFloat(pull.endLng)
        }));

        const pointsData = mapData.maps.map(item => ({
            ...item,
            lat: parseFloat(item.lat),
            lng: parseFloat(item.lng),
            label: item.city,
            size: item.size
        }));

        globe
            .arcsData(arcsData)
            .arcColor(() => getRandomColor())
            .arcAltitude((e: GlobeObject) => (e as Pull).arcAlt || 0.05)
            .arcStroke(0.4)
            .arcDashLength(0.9)
            .arcDashGap(3)
            .arcDashAnimateTime(2000)
            .arcsTransitionDuration(1000)
            .arcDashInitialGap((e: GlobeObject) => (e as Pull).order)
            .labelsData(pointsData)
            .labelColor(() => "#ffff33")
            .labelDotRadius(0.5)
            .labelSize((e: GlobeObject) => (e as MapPoint).size)
            .labelText("label")
            .labelResolution(6)
            .labelAltitude(0.01)
            .pointsData(pointsData)
            .pointColor(() => "#ffff33")
            .pointsMerge(true)
            .pointAltitude(0.07)
            .pointRadius(0.1);

        globe.rotateY(-Math.PI * (5 / 9));
        globe.rotateZ(-Math.PI / 6);

        const globeMaterial = globe.globeMaterial() as THREE.MeshPhongMaterial;
        globeMaterial.color = new THREE.Color(0x3a228a);
        globeMaterial.emissive = new THREE.Color(0x220038);
        globeMaterial.emissiveIntensity = 3;
        globeMaterial.shininess = 3;

        scene.add(globe);
        globeRef.current = globe;

        startAnimation();
    };

    const startAnimation = () => {
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
        }

        const animate = () => {
            const camera = cameraRef.current;
            const renderer = rendererRef.current;
            const scene = sceneRef.current;
            const controls = controlsRef.current;

            if (!camera || !renderer || !scene || !controls) return;

            camera.position.x +=
                Math.abs(mousePosition.current.x) <= window.innerWidth / 4
                    ? (mousePosition.current.x / 2 - camera.position.x) * 0.005
                    : 0;
            camera.position.y += (-mousePosition.current.y / 2 - camera.position.y) * 0.005;
            camera.lookAt(scene.position);

            // Анимация мерцания звезд
            if (starsRef.current) {
                const stars = starsRef.current;
                const sizes = stars.geometry.attributes.size.array as Float32Array;
                for (let i = 0; i < sizes.length; i += 100) {
                    sizes[i] = Math.random() * 3 + 5;
                }
                stars.geometry.attributes.size.needsUpdate = true;
            }

            controls.update();
            renderer.render(scene, camera);
            animationFrameId.current = requestAnimationFrame(animate);
        };

        animationFrameId.current = requestAnimationFrame(animate);
    };

    const cleanup = () => {
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = null;
        }
    };

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            mousePosition.current = {
                x: event.clientX - window.innerWidth / 2,
                y: event.clientY - window.innerHeight / 2
            };
        };

        const handleWindowResize = () => {
            const camera = cameraRef.current;
            const renderer = rendererRef.current;
            if (!camera || !renderer) return;

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener("resize", handleWindowResize);
        document.addEventListener("mousemove", handleMouseMove);

        return () => {
            cleanup();
            window.removeEventListener("resize", handleWindowResize);
            document.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <GlobeContext.Provider value={{
            scene: sceneRef.current,
            renderer: rendererRef.current,
            camera: cameraRef.current,
            controls: controlsRef.current,
            globe: globeRef.current,
            initGlobe,
            cleanup
        }}>
            {children}
        </GlobeContext.Provider>
    );
}

export const useGlobe = () => useContext(GlobeContext);