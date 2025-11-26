"use client";

import { useState } from "react";

export default function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative p-6 font-neutral-400  bg-neutral-900/90 rounded-md mt-3">
      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 text-white hover:text-gray-300 transition"
      >
        📋
      </button>

      {/* Copied notice */}
      {copied && (
        <span className="absolute top-3 right-12 text-green-400 text-sm">
          Copied!
        </span>
      )}

      {/* Code */}
      <pre className="text-white overflow-x-auto whitespace-pre-wrap">
        {code}
      </pre>
    </div>
  );
}
