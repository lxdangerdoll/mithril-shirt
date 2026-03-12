import React, { useState, useEffect } from 'react';
import { Target, AlertTriangle, Shield, Bomb, Search } from 'lucide-react';

const App = () => {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [scanning, setScanning] = useState(false);

  const targets = [
    { 
      id: 'lily-bed-alpha', 
      name: "The Pale Lily Beds", 
      coord: { x: '25%', y: '30%' }, 
      status: 'ARMED',
      intel: "Planted directly into the 'Silk-Skin' root structure. If detonated, the nutrient-exchange with the Queen is severed."
    },
    { 
      id: 'pylon-beta', 
      name: "Resonance Pylon 04", 
      coord: { x: '70%', y: '20%' }, 
      status: 'ARMED',
      intel: "The primary stabilizer for the 'Song.' Kaelen believes this is a frequency jammer. It is actually a leash."
    },
    { 
      id: 'glass-con', 
      name: "Glass Conservatory Floor", 
      coord: { x: '50%', y: '80%' }, 
      status: 'STANDBY',
      intel: "The thin spot. Below this lies the Omega-Layer. A breach here is... ill-advised."
    },
    { 
      id: 'queen-root', 
      name: "The Sanguine Conduit", 
      coord: { x: '45%', y: '45%' }, 
      status: 'CRITICAL',
      intel: "The detonator is attached to the main data-vein. Kaelen thinks he's 'cutting her chains.' He's cutting her life support."
    }
  ];

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 p-4 md:p-8 font-mono overflow-hidden">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Map Header */}
        <div className="md:col-span-3 flex justify-between items-end border-b border-zinc-800 pb-4">
          <div>
            <h1 className="text-2xl font-black text-red-500 tracking-tighter uppercase">Garden_Threat_Map</h1>
            <p className="text-xs text-zinc-500">Source: Io-Intercept // Resistance_Cell_88</p>
          </div>
          <button 
            onClick={handleScan}
            disabled={scanning}
            className="flex items-center gap-2 px-4 py-2 bg-red-950/30 border border-red-500/50 text-red-400 hover:bg-red-500 hover:text-white transition-all text-xs uppercase font-bold rounded"
          >
            <Search size={14} className={scanning ? 'animate-spin' : ''} />
            {scanning ? 'Scanning...' : 'Refresh Thermals'}
          </button>
        </div>

        {/* The Map Interface */}
        <div className="md:col-span-2 relative aspect-square bg-zinc-900 border border-zinc-800 rounded-lg shadow-2xl overflow-hidden group">
          {/* Grid Lines */}
          <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 opacity-10 pointer-events-none">
            {[...Array(100)].map((_, i) => (
              <div key={i} className="border-[0.5px] border-zinc-500"></div>
            ))}
          </div>

          {/* Scanning Sweep */}
          {scanning && (
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/10 to-transparent h-1/4 w-full animate-[scan_2s_linear_infinite] z-10"></div>
          )}

          {/* Map Content - Abstract Garden Shapes */}
          <svg className="absolute inset-0 w-full h-full opacity-30 p-8" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
            <path d="M20,30 Q50,10 80,30 T20,70" fill="none" stroke="currentColor" strokeWidth="0.5" />
            <path d="M10,50 L90,50 M50,10 L50,90" fill="none" stroke="currentColor" strokeWidth="0.2" />
          </svg>

          {/* Markers */}
          {targets.map((target) => (
            <button
              key={target.id}
              onClick={() => setSelectedPoint(target)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group/btn z-20"
              style={{ left: target.coord.x, top: target.coord.y }}
            >
              <div className={`p-1 rounded-full animate-pulse ${target.status === 'CRITICAL' ? 'bg-red-500' : 'bg-orange-500'}`}>
                <Bomb size={16} className="text-black" />
              </div>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 hidden group-hover/btn:block bg-black/90 border border-zinc-700 px-2 py-1 rounded text-[10px] whitespace-nowrap z-30">
                {target.name}
              </div>
            </button>
          ))}
        </div>

        {/* Intel Panel */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-6 flex flex-col">
          <div className="flex items-center gap-2 text-zinc-500 border-b border-zinc-800 pb-2">
            <AlertTriangle size={16} />
            <span className="text-xs font-bold uppercase">Intel_Readout</span>
          </div>

          {selectedPoint ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
              <div>
                <h2 className="text-red-400 font-bold text-sm uppercase tracking-wider">{selectedPoint.name}</h2>
                <div className={`mt-1 inline-block px-2 py-0.5 rounded text-[10px] font-bold ${selectedPoint.status === 'CRITICAL' ? 'bg-red-500 text-black' : 'bg-orange-500 text-black'}`}>
                  STATUS: {selectedPoint.status}
                </div>
              </div>
              <p className="text-xs leading-relaxed text-zinc-400 italic font-serif">
                "{selectedPoint.intel}"
              </p>
              <div className="pt-4 border-t border-zinc-800">
                <button className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-[10px] uppercase tracking-widest transition-colors flex items-center justify-center gap-2">
                  <Shield size={12} /> Remote_Defuse_Bypass
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center text-zinc-600">
              <p className="text-[10px] uppercase tracking-tighter">Select a Target Hotspot<br/>for Detailed Analysis</p>
            </div>
          )}

          <div className="mt-auto pt-4 text-[9px] text-zinc-600 leading-tight">
            * Warning: Detonation of any point will trigger a 0.4Hz ripple across the Sea-Keep foundation. Liquid soil state probable.
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes scan {
          from { transform: translateY(-100%); }
          to { transform: translateY(400%); }
        }
      `}</style>
    </div>
  );
};

export default App;