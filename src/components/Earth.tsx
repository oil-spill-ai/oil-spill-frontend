"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Earth: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 3;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        const loader = new GLTFLoader();
        loader.load(
            '/Planet.glb',
            (gltf) => {
                const model = gltf.scene;
                scene.add(model);
                model.position.set(0, 0, 0);

                const animate = () => {
                    requestAnimationFrame(animate);
                    model.rotation.y += 0.003;
                    renderer.render(scene, camera);
                };
                animate();
            },
            undefined,
            (error) => {
                console.error('Ошибка загрузки модели:', error);
            }
        );

        const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
        directionalLight.position.set(1, 1, 3).normalize();
        directionalLight.scale.set(20, 20, 20);
        scene.add(directionalLight);

        // Очистка
        return () => {
            if (containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 z-0" />
    );
};

export default Earth;