"use client";
import React, { useState } from "react";

const Main = () => {
  const [previewOrCode, setPreviewOrCode] = useState("Preview");

  const exampleCode = `
import React from "react";

export default function Page() {
  return (
    <div className="text-white">
      Hello World from ForgeUI-style code block!
    </div>
  );
}
`;

  return (
    <div className="flex flex-col items-center h-full pt-20">
      <div className="overflow-y-auto h-full w-full px-10">
        <h1 className="font-bold text-[40px] cursor-pointer py-3">
          Animated Form
        </h1>

        <div className="text-gray-400">
          Animated form mimicking account creation with progressive animations
          and completion checkmarks.
        </div>

        {/* Toggle Buttons */}
        <div className="flex gap-4 my-2 mt-6 text-sm font-bold transition-colors duration-[300ms]">
          <button
            onClick={() => setPreviewOrCode("Preview")}
            className={`px-3 py-1.5 rounded-md transition-colors duration-300 ${
              previewOrCode === "Preview"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Preview
          </button>

          <button
            onClick={() => setPreviewOrCode("Code")}
            className={`px-3 py-1.5 rounded-md transition-colors duration-300 ${
              previewOrCode === "Code"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            Code
          </button>
        </div>

        {/* Content */}
        <div className="mt-4">
          {previewOrCode === "Preview" ? (
            <div>
              <pre className="bg-[#0d0d0d] text-[#e5e5e5] p-4 border border-gray-700 rounded-lg text-sm overflow-x-auto">
                <code>Preview Component Goes Here</code>
              </pre>
            </div>
          ) : (
            <div>
              <h2 className="font-bold p-2 text-[20px]">Code</h2>
              <pre className="bg-[#0d0d0d] text-[#e5e5e5] p-4 border border-gray-700 rounded-lg text-sm overflow-x-auto">
                <code>{exampleCode}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Main;
