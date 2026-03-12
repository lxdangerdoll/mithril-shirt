import React, { useState } from 'react';
import { Map, MapPin, Compass, Anchor, Mountain, Skull, ChevronRight, Activity } from 'lucide-react';

export default function App() {
  const [selectedPoint, setSelectedPoint] = useState(null);

  const landmarks = [
    {
      id: 'caves',
      name: 'The Deep-Vein (Starting Point)',
      coords: { top: '80%', left: '50%' },
      icon: <Mountain className="w-5 h-5" />,
      desc: "Site of the century-long forge. Where the Dweller and the Automatons were born.",
      status: "Operational / Abandoned"
    },
    {
      id: 'citadel',
      name: 'Sinking Citadel',
      coords: { top: '60%', left: '20%' },
      icon: <Skull className="w-5 h-5" />,
      desc: "Home of the Dust-Matriarch. Resonance mismatch: 100%. North gate collapsed by scouts.",
      status: "Destroyed"
    },
    {
      id: 'marshes',
      name: 'The Weeping Marshes',
      coords: { top: '40%', left: '35%' },
      icon: <Skull className="w-5 h-5" />,
      desc: "Throne of the Silent Regent (Deceased). Clockwork retrieved for parts.",
      status: "Desolate"
    },
    {
      id: 'fortress_sea',
      name: 'The Sea-Keep (Final Objective)',
      coords: { top: '15%', left: '75%' },
      icon: <Anchor className="w-6 h-6 text-blue-400" />,
      desc: "Location of the True Queen. Dungeon found in sector 4-B. Mission Objective Met.",
      status: "Secured"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-mono p-4 flex flex-col items-center">
      <div className="w-full max-w-4xl border border-slate-800 bg-slate-900 rounded-lg overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-slate-800 p-4 flex justify-between items-center border-b border-slate-700">
          <div className="flex items-center gap-2">
            <Compass className="animate-spin-slow text-blue-400" />
            <h1 className="text-lg font-bold uppercase tracking-widest">Scout_Telemetry_Overlay.v1</h1>
          </div>
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <Activity className="w-3 h-3 text-green-500" />
            LIVE LINK: SECTOR 0xFF
          </div>
        </div>

        <div className="flex flex-col md:flex-row h-[600px]">
          {/* Map Area */}
          <div className="relative flex-1 bg-slate-950 overflow-hidden border-r border-slate-800">
            {/* Grid Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" 
                 style={{backgroundImage: 'linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)', backgroundSize: '40px 40px'}}></div>
            
            {/* Journey Lines (Simplified SVG) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
              <path d="M 50% 80% Q 30% 70%, 20% 60% T 35% 40% T 75% 15%" 
                    fill="none" stroke="#60a5fa" strokeWidth="2" strokeDasharray="5,5" />
            </svg>

            {landmarks.map((loc) => (
              <button
                key={loc.id}
                onClick={() => setSelectedPoint(loc)}
                className={`absolute transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full border-2 
                  ${selectedPoint?.id === loc.id ? 'bg-blue-500 border-white scale-125 z-30' : 'bg-slate-800 border-slate-600 hover:border-blue-400 z-20'}`}
                style={{ top: loc.coords.top, left: loc.coords.left }}
              >
                {loc.icon}
              </button>
            ))}

            <div className="absolute bottom-4 left-4 bg-black/60 p-2 text-[10px] rounded border border-slate-800">
              LAT: 44.093 // LONG: -12.992
              <br />
              MAG_VARIANCE: 0.003
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full md:w-80 bg-slate-900 p-6 flex flex-col gap-4">
            <h2 className="text-sm font-bold border-b border-slate-700 pb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4" /> POINT_OF_INTEREST
            </h2>
            
            {selectedPoint ? (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="text-blue-400 font-bold text-sm uppercase">{selectedPoint.name}</div>
                <div className="text-xs text-slate-400 leading-relaxed bg-slate-950 p-3 rounded border border-slate-800">
                  {selectedPoint.desc}
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-slate-500">OBJECTIVE_STATUS:</span>
                  <span className={`text-xs font-bold ${selectedPoint.status === 'Secured' ? 'text-green-500' : 'text-red-400'}`}>
                    {selectedPoint.status}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-600 text-center italic text-sm">
                <Compass className="w-12 h-12 mb-2 opacity-20" />
                Select a landmark to review scout logs.
              </div>
            )}

            <div className="mt-auto border-t border-slate-800 pt-4">
              <div className="text-[10px] text-slate-500 mb-1">UNIT_COUNT:</div>
              <div className="flex gap-1">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: `${i * 200}ms`}}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <p className="mt-4 text-xs text-slate-500 max-w-lg text-center leading-relaxed">
        *Archivist Note: The map shows a direct correlation between seismic activity and scout proximity. 
        The earth literally shifted to make way for the delivery.*
      </p>
    </div>
  );
}