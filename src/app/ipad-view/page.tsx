"use client";

import { useState } from "react";

// iPad Pro 12.9" dimensions in landscape
const IPAD_WIDTH = 1366;
const IPAD_HEIGHT = 1024;
const BEZEL = 40;

export default function iPadView() {
  const [scale, setScale] = useState(0.65);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-8">
      {/* Controls */}
      <div className="mb-6 flex items-center gap-4">
        <span className="text-white/60 text-sm">Zoom:</span>
        <input
          type="range"
          min="0.4"
          max="1"
          step="0.05"
          value={scale}
          onChange={(e) => setScale(parseFloat(e.target.value))}
          className="w-32"
        />
        <span className="text-white/60 text-sm">{Math.round(scale * 100)}%</span>
      </div>

      {/* iPad Frame */}
      <div
        className="relative rounded-[60px] bg-gradient-to-b from-[#2c2c2e] to-[#1c1c1e] p-3 shadow-2xl"
        style={{
          width: (IPAD_WIDTH + BEZEL * 2) * scale,
          height: (IPAD_HEIGHT + BEZEL * 2) * scale,
        }}
      >
        {/* Inner bezel */}
        <div
          className="relative w-full h-full rounded-[48px] bg-black overflow-hidden"
        >
          {/* Camera */}
          <div
            className="absolute top-1/2 left-3 -translate-y-1/2 w-3 h-3 rounded-full bg-[#1a1a1a] border border-[#2a2a2a]"
            style={{ transform: `translateY(-50%) scale(${scale})` }}
          />
          
          {/* Screen */}
          <div className="absolute inset-0 m-[2px] rounded-[46px] overflow-hidden bg-white">
            <iframe
              src="/"
              className="w-full h-full border-0"
              style={{
                width: IPAD_WIDTH,
                height: IPAD_HEIGHT,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
            />
          </div>
        </div>
      </div>

      {/* Label */}
      <div className="mt-6 text-center">
        <h2 className="text-white font-semibold text-lg">Dubai Client Configurator</h2>
        <p className="text-white/40 text-sm mt-1">iPad Pro 12.9" Landscape View</p>
      </div>
    </div>
  );
}
