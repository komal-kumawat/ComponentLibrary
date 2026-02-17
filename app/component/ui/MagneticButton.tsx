"use client";

import { useRef } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
}

export default function MagneticButton({
  children,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    ref.current.style.transform = `translate(${x * 0.2}px, ${
      y * 0.2
    }px)`;
  };

  const reset = () => {
    if (!ref.current) return;
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
