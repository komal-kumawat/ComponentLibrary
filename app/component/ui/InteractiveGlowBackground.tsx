"use client";

import React, { useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const GlowScene = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const pointer = useRef(new THREE.Vector2(0.5, 0.5));
  const time = useRef(0);

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      pointer.current.x = e.clientX / window.innerWidth;
      pointer.current.y = 1.0 - e.clientY / window.innerHeight;
    };

    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uPointer: { value: new THREE.Vector2() },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;

        uniform float uTime;
        uniform vec2 uPointer;
        varying vec2 vUv;

        float circle(vec2 uv, vec2 pos, float radius) {
          return smoothstep(radius, radius - 0.01, distance(uv, pos));
        }

        void main() {
          vec2 uv = vUv;

          float dist = distance(uv, uPointer);
          float glow = 0.2 / (dist * 10.0 + 0.1);

          vec3 color = vec3(0.05, 0.08, 0.15);

          // animated glow
          glow *= sin(uTime * 2.0) * 0.5 + 0.8;

          vec3 finalColor = color + vec3(0.2, 0.5, 1.0) * glow;

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
    });
  }, []);

  useFrame((_, delta) => {
    time.current += delta;
    material.uniforms.uTime.value = time.current;
    material.uniforms.uPointer.value.copy(pointer.current);
  });

  return (
    <mesh
      ref={meshRef}
      scale={[viewport.width, viewport.height, 1]}
      material={material}
    >
      <planeGeometry args={[2, 2]} />
    </mesh>
  );
};

const InteractiveGlowBackground = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas>
        <GlowScene />
      </Canvas>
    </div>
  );
};

export default InteractiveGlowBackground;
