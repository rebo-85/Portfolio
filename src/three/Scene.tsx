import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Scene = () => {
    const lRef = useRef<THREE.PointLight | null>(null);

    useEffect(() => {
        if (lRef.current) {
            lRef.current.position.set(5, 5, 5);
        }
    }, []);

    return (
        <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight ref={lRef} />
            <OrbitControls />
            {/* 3D objects here */}
        </Canvas>
    );
};

export default Scene;