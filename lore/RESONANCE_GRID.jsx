import React, { useState, useEffect } from 'react';
import { Radio, Shield, Zap, Activity, Map as MapIcon, Users, AlertTriangle } from 'lucide-react';

const App = () => {
  const [activePulse, setActivePulse] = useState(0);
  const [selectedZone, setSelectedZone] = useState(null);

  const zones = [
    { 
      id: 'core', 
      name: 'The Sea-Keep (Core)', 
      status: 'Critical Resonance', 
      type: 'harmonic',
      description: 'The epicenter of the Queen\'s Song. Structural integrity is fluid. Iron has begun to breathe.',
      intensity: 98
    },
    { 
      id: 'obsidian_vane', 
      name: 'The Obsidian Vane', 
      status: 'Resistance Pocket', 
      type: 'resistance',
      description: 'Human cell using volcanic glass to dampen frequencies. A total "Dead Zone" for the Song.',
      intensity: 5
    },
    { 
      id: 'iron_belt', 
      name: 'The Iron Belt', 
      status: 'Active Rot', 
      type: 'harmonic',
      description: 'Former mining colony. All machinery has fused into a single, screaming crystalline structure.',
      intensity: 72
    },
    { 
      id: 'whisper_woods', 
      name: 'Whisper Woods', 
      status: 'Vocal-Proofed Zone', 
      type: 'resistance',
      description: 'Resistance scouts are using organic dampeners. Hard to track on the grid.',
      intensity: 12
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePulse(prev => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-emerald-400 p-8 font-mono">
      <div className="max-w-4xl mx-auto border border-emerald-900/50 rounded-lg overflow-hidden bg-black/40 shadow-2xl shadow-emerald-900/20">
        {/* Header */}
        <div className="border-b border-emerald-900/50 p-4 bg-emerald-950/20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Radio className="animate-pulse text-emerald-500" />
            <h1 className="text-xl font-bold tracking-widest uppercase">Resonance-Grid v.4.2</h1>
          </div>
          <div className="text-xs text-emerald-600">
            SCANNING FOR MITHRIL DEVIATIONS...
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Map Visualization */}
          <div className="p-8 relative bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-950/20 via-transparent to-transparent">
            <div className="aspect-square relative border border-emerald-900/30 rounded-full flex items-center justify-center">
              {/* Pulse Rings */}
              {[1, 2, 3].map((i) => (
                <div 
                  key={i}
                  className="absolute border border-emerald-500/20 rounded-full"
                  style={{
                    width: `${(activePulse + i * 33) % 100}%`,
                    height: `${(activePulse + i * 33) % 100}%`,
                    opacity: 1 - ((activePulse + i * 33) % 100) / 100
                  }}
                />
              ))}
              
              {/* Zone Markers */}
              {zones.map((zone) => (
                <button
                  key={zone.id}
                  onClick={() => setSelectedZone(zone)}
                  className={`absolute p-2 rounded-full transition-all transform hover:scale-125 ${
                    zone.type === 'harmonic' ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50' : 'bg-orange-500 shadow-lg shadow-orange-500/50'
                  }`}
                  style={{
                    top: zone.id === 'core' ? '50%' : zone.id === 'obsidian_vane' ? '20%' : zone.id === 'iron_belt' ? '75%' : '30%',
                    left: zone.id === 'core' ? '50%' : zone.id === 'obsidian_vane' ? '70%' : zone.id === 'iron_belt' ? '30%' : '20%',
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  {zone.type === 'harmonic' ? <Zap size={16} className="text-black" /> : <Shield size={16} className="text-black" />}
                </button>
              ))}

              <div className="text-center z-10">
                <div className="text-[10px] uppercase text-emerald-700 mb-1">Grid Center</div>
                <Activity size={32} className="mx-auto text-emerald-500" />
              </div>
            </div>
            
            <div className="mt-6 flex justify-between text-[10px] text-emerald-700">
              <span>LAT: 44.092.1</span>
              <span>LNG: 12.883.9</span>
              <span>ALT: -2.4KM</span>
            </div>
          </div>

          {/* Info Panel */}
          <div className="border-l border-emerald-900/50 p-6 bg-emerald-950/10">
            {selectedZone ? (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div>
                  <h2 className="text-lg font-bold text-emerald-300 uppercase flex items-center gap-2">
                    {selectedZone.type === 'harmonic' ? <Zap size={18} /> : <Shield size={18} />}
                    {selectedZone.name}
                  </h2>
                  <p className="text-xs text-emerald-600 mt-1 uppercase">{selectedZone.status}</p>
                </div>
                
                <p className="text-sm text-emerald-400/80 leading-relaxed italic">
                  "{selectedZone.description}"
                </p>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Resonance Intensity</span>
                    <span>{selectedZone.intensity}%</span>
                  </div>
                  <div className="w-full bg-emerald-950 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-1000 ${selectedZone.type === 'harmonic' ? 'bg-emerald-500' : 'bg-orange-500'}`}
                      style={{ width: `${selectedZone.intensity}%` }}
                    />
                  </div>
                </div>

                <div className="p-3 bg-black/40 border border-emerald-900/30 rounded text-[10px] leading-tight">
                  <div className="flex items-center gap-2 mb-2 text-emerald-500">
                    <AlertTriangle size={12} />
                    <span>ANALYTICS ADVISORY</span>
                  </div>
                  Structural breakdown in this sector is accelerating. Avoid all metallic contact. The "Iron Rot" is contagious via sonic vibration.
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-emerald-800">
                <MapIcon size={48} className="mb-4 opacity-20" />
                <p className="text-sm uppercase tracking-widest">Select a Node<br/>for Deep-Scan</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-emerald-900/50 bg-black flex justify-between items-center text-[10px]">
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><Users size={12} /> SENSORS: 4.2k</span>
            <span className="flex items-center gap-1 text-orange-500"><Shield size={12} /> RESISTANCE BLIND SPOTS: 2</span>
          </div>
          <div className="animate-pulse">SYSTEM_STABLE // NO_GHOST_DETECTED</div>
        </div>
      </div>
    </div>
  );
};

export default App;