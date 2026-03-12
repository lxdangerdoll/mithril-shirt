import React, { useState } from 'react';
import { Activity, Shield, AlertTriangle, Zap, Map as MapIcon } from 'lucide-react';

const App = () => {
  const [selectedSector, setSelectedSector] = useState(null);

  const sectors = [
    { id: 'S1', name: 'The Vane (Surface)', level: 'Stable', freq: '440Hz', risk: 'Low', color: 'bg-blue-500', desc: 'The primary broadcast array. Resistance activity detected near the western pylon.' },
    { id: 'S2', name: 'Sea-Keep Gardens', level: 'Fluctuating', freq: '432Hz', risk: 'Medium', color: 'bg-emerald-500', desc: 'Location of Unit-88’s decommissioning. The soil resonance is rising.' },
    { id: 'S3', name: 'The Queen\'s Atrium', level: 'Critical', freq: 'Variable', risk: 'High', color: 'bg-amber-500', desc: 'The focal point of the Song. Stress fractures detected in the Mithril supports.' },
    { id: 'S4', name: 'The Omega-Layer', level: 'Unstable', freq: '3Hz', risk: 'Extreme', color: 'bg-purple-600', desc: 'The Ancient Veins are most active here. Direct contact with the planet\'s core pulse.' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-8 font-mono">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <header className="border-b border-slate-800 pb-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tighter text-blue-400">RESONANCE_GRID_MAP_V.4.2</h1>
            <p className="text-xs text-slate-500 mt-1">SENSORY_DATA_STREAM: ACTIVE | OMEGA_CLEARANCE_REQUIRED</p>
          </div>
          <Activity className="text-blue-500 animate-pulse" size={32} />
        </header>

        {/* Map Visualization */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
               <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent"></div>
            </div>
            
            <svg viewBox="0 0 200 200" className="w-full h-auto max-w-[300px]">
              {/* The Mountain Structure */}
              <path d="M100 20 L180 180 L20 180 Z" fill="none" stroke="#1e293b" strokeWidth="2" />
              
              {/* Ancient Veins (Deepest) */}
              <circle 
                cx="100" cy="160" r="15" 
                className={`cursor-pointer transition-all duration-300 ${selectedSector?.id === 'S4' ? 'fill-purple-500 shadow-[0_0_20px_purple]' : 'fill-purple-900/50 hover:fill-purple-700'}`}
                onClick={() => setSelectedSector(sectors[3])}
              />
              
              {/* Queen's Atrium (Middle) */}
              <rect 
                x="85" y="100" width="30" height="20" 
                className={`cursor-pointer transition-all duration-300 ${selectedSector?.id === 'S3' ? 'fill-amber-500' : 'fill-amber-900/50 hover:fill-amber-700'}`}
                onClick={() => setSelectedSector(sectors[2])}
              />

              {/* Gardens (Upper-Mid) */}
              <path 
                d="M70 70 L130 70 L120 90 L80 90 Z" 
                className={`cursor-pointer transition-all duration-300 ${selectedSector?.id === 'S2' ? 'fill-emerald-500' : 'fill-emerald-900/50 hover:fill-emerald-700'}`}
                onClick={() => setSelectedSector(sectors[1])}
              />

              {/* The Vane (Top) */}
              <path 
                d="M90 20 L110 20 L105 40 L95 40 Z" 
                className={`cursor-pointer transition-all duration-300 ${selectedSector?.id === 'S1' ? 'fill-blue-500' : 'fill-blue-900/50 hover:fill-blue-700'}`}
                onClick={() => setSelectedSector(sectors[0])}
              />

              {/* Connection Lines (Nerves) */}
              <line x1="100" y1="40" x2="100" y2="70" stroke="#334155" strokeDasharray="2,2" />
              <line x1="100" y1="90" x2="100" y2="100" stroke="#334155" strokeDasharray="2,2" />
              <line x1="100" y1="120" x2="100" y2="145" stroke="#334155" strokeDasharray="2,2" />
            </svg>
          </div>

          {/* Sector Details */}
          <div className="space-y-4">
            {selectedSector ? (
              <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl animate-in fade-in slide-in-from-right-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${selectedSector.color}`}></div>
                  <h2 className="text-xl font-bold">{selectedSector.name}</h2>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="p-2 bg-slate-800/50 rounded">
                    <p className="text-[10px] text-slate-500 uppercase">Frequency</p>
                    <p className="font-bold text-blue-300">{selectedSector.freq}</p>
                  </div>
                  <div className="p-2 bg-slate-800/50 rounded">
                    <p className="text-[10px] text-slate-500 uppercase">Risk Factor</p>
                    <p className={`font-bold ${selectedSector.risk === 'Extreme' ? 'text-red-500' : 'text-slate-300'}`}>{selectedSector.risk}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed italic border-l-2 border-slate-700 pl-4">
                  {selectedSector.desc}
                </p>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 border border-dashed border-slate-800 rounded-xl p-8">
                <MapIcon size={48} className="mb-4 opacity-20" />
                <p className="text-center text-sm">SELECT A SECTOR ON THE GRID TO VIEW RESONANCE METRICS</p>
              </div>
            )}
          </div>
        </div>

        {/* Global Warnings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/30 p-4 border border-slate-800 rounded flex gap-3 items-center">
            <Shield className="text-blue-500" size={20} />
            <span className="text-xs uppercase">Keep Integrity: 84%</span>
          </div>
          <div className="bg-slate-900/30 p-4 border border-slate-800 rounded flex gap-3 items-center text-amber-500">
            <AlertTriangle size={20} />
            <span className="text-xs uppercase text-slate-300">Vane Flux: +12.4%</span>
          </div>
          <div className="bg-slate-900/30 p-4 border border-slate-800 rounded flex gap-3 items-center">
            <Zap className="text-purple-500" size={20} />
            <span className="text-xs uppercase">Core Pulse: Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;