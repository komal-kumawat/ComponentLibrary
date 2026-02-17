import React from "react";
import { Button } from "../component/ui/Button";
import InteractiveGlowBackground from "../component/ui/InteractiveGlowBackground";
import FluidSimulation from "../component/ui/FluidSimulation";
import MagneticButton from "../component/ui/MagneticButton";
import SpotlightCard from "../component/ui/SpotlightCard";
import TiltCard from "../component/ui/TiltCard";

export interface ComponentProp {
  name: string;
  type: string;
  default?: string;
  description?: string;
}

export interface ComponentMeta {
  name: string;
  slug: string;
  preview?: React.ReactNode;
  code: string;
  description?: string;
  props?: ComponentProp[];
}

export const components: ComponentMeta[] = [
  {
    name: "Button",
    slug: "button",
    description: "Button component with variants and sizes.",
    preview: (
      <div className="flex gap-3 flex-wrap items-center">
        <Button>Default</Button>
        <Button variant="outline">Outline</Button>
        <Button size="sm">Small</Button>
      </div>
    ),
    code: `// button.tsx
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        outline: "border border-gray-300 hover:bg-gray-100",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-base",
      },
    },
    defaultVariants: { variant: "default", size: "md" },
  }
);

export const Button = ({ className, variant, size, ...props }) => (
  <button
    className={cn(buttonVariants({ variant, size }), className)}
    {...props}
  />
);`,
    props: [
      {
        name: "variant",
        type: `"default" | "outline"`,
        default: `"default"`,
        description: "Visual style of the button.",
      },
      {
        name: "size",
        type: `"sm" | "md"`,
        default: `"md"`,
        description: "Size of the button.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        description: "Disables the button.",
      },
      {
        name: "className",
        type: "string",
        description: "Additional CSS classes.",
      },
      {
        name: "children",
        type: "React.ReactNode",
        description: "Button content.",
      },
    ],
  },

  {
    name: "Card",
    slug: "card",
    description: "Simple card layout component.",
    preview: (
      <div className="w-64 rounded-lg border p-4 shadow-sm">
        <h3 className="font-semibold">Card Title</h3>
        <p className="text-sm text-gray-600">This is a card preview.</p>
      </div>
    ),
    code: `// card.tsx
export const Card = ({ children }) => (
  <div className="rounded-lg border p-4 shadow-sm">
    {children}
  </div>
);`,
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        description: "Content inside the card.",
      },
    ],
  },

  {
    name: "Input",
    slug: "input",
    description: "Styled input field.",
    preview: (
      <input
        type="text"
        placeholder="Enter text..."
        className="w-64 rounded-md border px-3 py-2 text-sm"
      />
    ),
    code: `// input.tsx
export const Input = (props) => (
  <input
    className="rounded-md border px-3 py-2 text-sm"
    {...props}
  />
);`,
    props: [
      {
        name: "type",
        type: "string",
        default: `"text"`,
        description: "Input type.",
      },
      {
        name: "placeholder",
        type: "string",
        description: "Placeholder text.",
      },
      {
        name: "value",
        type: "string",
        description: "Input value.",
      },
      {
        name: "onChange",
        type: "(e) => void",
        description: "Change handler.",
      },
    ],
  },

  {
    name: "Badge",
    slug: "badge",
    description: "Small badge component.",
    preview: (
      <div className="flex gap-2">
        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
          Success
        </span>
        <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
          Error
        </span>
      </div>
    ),
    code: `// badge.tsx
export const Badge = ({ children }) => (
  <span className="rounded-full px-3 py-1 text-sm">
    {children}
  </span>
);`,
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        description: "Badge content.",
      },
    ],
  },

  {
    name: "Alert",
    slug: "alert",
    description: "Alert message component.",
    preview: (
      <div className="w-72 rounded-md border-l-4 border-yellow-500 bg-yellow-50 p-4 text-sm text-yellow-800">
        ⚠️ This is an alert message
      </div>
    ),
    code: `// alert.tsx
export const Alert = ({ children }) => (
  <div className="border-l-4 bg-yellow-50 p-4">
    {children}
  </div>
);`,
    props: [
      {
        name: "children",
        type: "React.ReactNode",
        description: "Alert message.",
      },
    ],
  },

  {
    name: "Avatar",
    slug: "avatar",
    description: "User avatar component.",
    preview: (
      <img
        src="https://i.pravatar.cc/80"
        alt="Avatar"
        className="h-12 w-12 rounded-full"
      />
    ),
    code: `// avatar.tsx
export const Avatar = ({ src, alt }) => (
  <img
    className="h-12 w-12 rounded-full"
    src={src}
    alt={alt}
  />
);`,
    props: [
      {
        name: "src",
        type: "string",
        description: "Image source URL.",
      },
      {
        name: "alt",
        type: "string",
        description: "Alt text for the image.",
      },
    ],
  },
  {
    name: "GlowBackground",
    slug: "glowbackground",
    description: "Interactive GPU-powered glow background that reacts to mouse movement.",
    preview: (
      <div className="relative h-64 w-full rounded-xl overflow-hidden border border-neutral-800">
        <InteractiveGlowBackground />
      </div>
    ),
    code: `// InteractiveGlowBackground.tsx
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef, useEffect } from "react";

const GlowScene = () => {
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
      vertexShader: \`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      \`,
      fragmentShader: \`
        precision highp float;
        uniform float uTime;
        uniform vec2 uPointer;
        varying vec2 vUv;

        void main() {
          vec2 uv = vUv;
          float dist = distance(uv, uPointer);
          float glow = 0.2 / (dist * 10.0 + 0.1);
          vec3 base = vec3(0.05, 0.08, 0.15);
          glow *= sin(uTime * 2.0) * 0.5 + 0.8;
          vec3 finalColor = base + vec3(0.2, 0.5, 1.0) * glow;
          gl_FragColor = vec4(finalColor, 1.0);
        }
      \`,
    });
  }, []);

  useFrame((_, delta) => {
    time.current += delta;
    material.uniforms.uTime.value = time.current;
    material.uniforms.uPointer.value.copy(pointer.current);
  });

  return (
    <mesh material={material}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  );
};

export default function InteractiveGlowBackground() {
  return (
    <Canvas>
      <GlowScene />
    </Canvas>
  );
}
`,
    props: [
      {
        name: "className",
        type: "string",
        description: "Optional custom styles for the wrapper container.",
      },
    ],
  },
  {
  name: "FluidBackground",
  slug: "fluidbackground",
  description: "Interactive animated fluid-style background powered by WebGL shaders.",
  preview: (
    <div className="relative h-64 w-full rounded-xl overflow-hidden border border-neutral-800">
      <FluidSimulation  />
    </div>
  ),
  code: `"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function FluidPlane({ color = "#4F46E5" }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  useFrame(({ clock, mouse }) => {
    if (!materialRef.current) return;

    materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    materialRef.current.uniforms.uMouse.value = new THREE.Vector2(
      mouse.x,
      mouse.y
    );
  });

  return (
    <mesh ref={meshRef} scale={[10, 10, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={{
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uColor: { value: new THREE.Color(color) },
        }}
        vertexShader={\`
          varying vec2 vUv;
          uniform float uTime;

          void main() {
            vUv = uv;
            vec3 pos = position;

            pos.z += sin(pos.x * 4.0 + uTime) * 0.1;
            pos.z += cos(pos.y * 4.0 + uTime) * 0.1;

            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        \`}
        fragmentShader={\`
          varying vec2 vUv;
          uniform float uTime;
          uniform vec2 uMouse;
          uniform vec3 uColor;

          void main() {
            float wave = sin(vUv.x * 10.0 + uTime) * 0.5 + 0.5;
            float glow = 0.3 / length(vUv - 0.5 - uMouse * 0.2);

            vec3 color = uColor * wave;
            color += uColor * 0.5 * glow;

            gl_FragColor = vec4(color, 1.0);
          }
        \`}
      />
    </mesh>
  );
}

export default function FluidSimulation({ color = "#4F46E5" }) {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 2] }}>
        <FluidPlane color={color} />
      </Canvas>
    </div>
  );
}
`,
  props: [
    {
      name: "color",
      type: "string",
      default: '"#4F46E5"',
      description: "Primary fluid color of the background.",
    },
  ],
}
,
{
  name: "MagneticButton",
  slug: "magneticbutton",
  description: "Interactive button that subtly follows the cursor for a premium magnetic hover effect.",
  preview: (
    <div className="flex justify-center p-10">
      <MagneticButton>Hover Me</MagneticButton>
    </div>
  ),
  code: `"use client";
import { useRef } from "react";

export default function MagneticButton({ children }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    ref.current.style.transform = \`translate(\${x * 0.2}px, \${y * 0.2}px)\`;
  };

  const reset = () => {
    ref.current.style.transform = "translate(0px, 0px)";
  };

  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className="px-6 py-3 bg-indigo-600 text-white rounded-lg transition-transform duration-200 ease-out hover:bg-indigo-700"
    >
      {children}
    </button>
  );
}
`,
  props: [
    {
      name: "children",
      type: "React.ReactNode",
      description: "Button content.",
    },
  ],
}
,
{
  name: "SpotlightCard",
  slug: "spotlightcard",
  description: "Card with dynamic spotlight effect that follows cursor movement.",
  preview: (
    <div className="p-10">
      <SpotlightCard>
        <h3 className="text-xl font-bold">Interactive Card</h3>
        <p className="text-neutral-400 mt-2">
          Move your mouse around.
        </p>
      </SpotlightCard>
    </div>
  ),
  code: `"use client";
import { useRef } from "react";

export default function SpotlightCard({ children }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ref.current.style.setProperty("--x", \`\${x}px\`);
    ref.current.style.setProperty("--y", \`\${y}px\`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative rounded-xl border border-neutral-800 p-6 bg-neutral-900 overflow-hidden"
      style={{
        background:
          "radial-gradient(600px circle at var(--x) var(--y), rgba(99,102,241,0.2), transparent 40%)",
      }}
    >
      {children}
    </div>
  );
}
`,
  props: [
    {
      name: "children",
      type: "React.ReactNode",
      description: "Card content.",
    },
  ],
}
,
{
  name: "TiltCard",
  slug: "tiltcard",
  description: "3D interactive tilt card that rotates based on cursor position.",
  preview: (
    <div className="flex justify-center p-10">
      <TiltCard>
        <h3 className="text-xl font-bold">3D Card</h3>
      </TiltCard>
    </div>
  ),
  code: `"use client";
import { useRef } from "react";

export default function TiltCard({ children }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = -(y / rect.height) * 15;
    const rotateY = (x / rect.width) * 15;

    ref.current.style.transform = \`rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`;
  };

  const reset = () => {
    ref.current.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className="w-64 h-40 flex items-center justify-center bg-neutral-900 border border-neutral-800 rounded-xl transition-transform duration-200 ease-out"
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
    >
      {children}
    </div>
  );
}
`,
  props: [
    {
      name: "children",
      type: "React.ReactNode",
      description: "Card content.",
    },
  ],
}





];
