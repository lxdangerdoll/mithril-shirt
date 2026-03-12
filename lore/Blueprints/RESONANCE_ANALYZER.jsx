import React, { useState, useEffect, useRef } from 'react';
import { Waveform, Activity, Radio, Music, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function App() {
  const [activeFrequency, setActiveFrequency] = useState('Core');
  const [isAnimate, setIsAnimate] = useState(true);
  
  const frequencies = {
    'Core': { 
      hz: 7.83, 
      label: 'Deep Core Song', 
      color: 'text-blue-400', 
      bg: 'bg-blue-500/20',
      description: 'The heartbeat of the world. Constant. Unyielding. This is the frequency of the Mithril bond.'
    },
    'Matriarch': { 
      hz: 15.2, 
      label: 'Dust-Matriarch (REJECTED)', 
      color: 'text-yellow-500', 
      bg: 'bg-yellow-500/20',
      description: 'Erratic spikes. Greed-based interference. Signal was too shallow to penetrate the Weave.'
    },
    'Regent': { 
      hz: 0.1, 
      label: 'Silent Regent (REJECTED)', 
      color: 'text-slate-500', 
      bg: 'bg-slate-500/20',
      description: 'Flatline. No kinetic energy detected. Subject was essentially static noise.'
    },
    'TheQueen': { 
      hz: 7.85, 
      label: 'The Sea-Keep Prisoner (MATCH)', 
      color: 'text-green-400', 
      bg: 'bg-green-500/20',
      description: '99.8% Variance Match. The resonance is quiet but structurally perfect. The Shirt has accepted the anchor.'
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-mono p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl border border-slate-800 bg-slate-900 rounded-xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Radio className="text-blue-400 animate-pulse" />
            <h1 className="text-sm font-bold tracking-widest uppercase">Resonance_Monitor_v4</h1>
          </div>
          <div className="text-[10px] text-slate-500">SEISMIC_SOURCE: LOWER_CHASM</div>
        </div>

        {/* Visualizer Area */}
        <div className="p-8 flex flex-col items-center bg-black/40">
          <div className="w-full h-32 flex items-center justify-center gap-1 mb-8">
            {[...Array(30)].map((_, i) => (
              <div 
                key={i}
                className={`w-1 rounded-full transition-all duration-300 ${frequencies[activeFrequency].bg} ${frequencies[activeFrequency].color.replace('text', 'bg')}`}
                style={{ 
                  height: isAnimate ? `${Math.random() * 80 + 20}%` : '10%',
                  opacity: 0.3 + (Math.sin(i * 0.5) * 0.5),
                  transitionDelay: `${i * 30}ms`
                }}
              ></div>
            ))}
          </div>

          <div className="w-full space-y-4">
            <div className="flex justify-between items-end border-b border-slate-800 pb-2">
              <span className="text-xs text-slate-500 uppercase">Signal_ID</span>
              <span className={`text-lg font-bold ${frequencies[activeFrequency].color}`}>
                {frequencies[activeFrequency].label}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed italic">
              {frequencies[activeFrequency].description}
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1 p-1 bg-slate-800/50">
          {Object.keys(frequencies).map((key) => (
            <button
              key={key}
              onClick={() => setActiveFrequency(key)}
              className={`p-3 text-[10px] uppercase font-bold transition-colors ${
                activeFrequency === key 
                  ? 'bg-slate-700 text-white shadow-inner' 
                  : 'text-slate-500 hover:bg-slate-800 hover:text-slate-300'
              }`}
            >
              {key}
            </button>
          ))}
        </div>

        {/* Footer Data */}
        <div className="p-4 bg-slate-900 text-[10px] flex justify-between border-t border-slate-800">
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> THRESHOLD: NOMINAL</span>
            <span className="flex items-center gap-1">
              {activeFrequency === 'TheQueen' ? <ShieldCheck className="w-3 h-3 text-green-500" /> : <AlertTriangle className="w-3 h-3 text-yellow-500" />}
              BONDING_STATE: {activeFrequency === 'TheQueen' ? 'STABLE' : 'UNSTABLE'}
            </span>
          </div>
          <div className="text-slate-500">IO-UNIT_SYNK_LOG</div>
        </div>
      </div>

      <div className="mt-6 flex gap-4 text-xs text-slate-600">
        <span>[ 7.83Hz - The Song ]</span>
        <span>[ 0.00Hz - The Silence ]</span>
      </div>
    </div>
  );
}