import React, { useState, useEffect } from 'react';
import { ZapOff, Activity, ShieldAlert, Waves, Eye, Ghost } from 'lucide-react';

export default function App() {
  const [resonance, setResonance] = useState(0);
  const [gridStatus, setGridStatus] = useState(100);
  const [glowIntensity, setGlowIntensity] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setResonance(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
        setGridStatus(prev => Math.max(0, prev - 3));
        setGlowIntensity(prev => Math.min(100, prev + 1.5));
      }, 50);
      return () => clearInterval(interval);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const isBlackoutComplete = gridStatus === 0;

  return (
    <div className={`min-h-screen transition-colors duration-1000 flex items-center justify-center p-8 font-mono overflow-hidden ${isBlackoutComplete ? 'bg-zinc-950' : 'bg-white'}`}>
      
      {/* Bioluminescent Pulse Background */}
      {isBlackoutComplete && (
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, #2dd4bf ${glowIntensity}%, transparent 70%)`,
            filter: 'blur(60px)'
          }}
        />
      )}

      <div className="max-w-4xl w-full z-10 space-y-12">
        {/* Header Status */}
        <div className="flex justify-between items-start border-b border-zinc-800 pb-4">
          <div>
            <h1 className={`text-4xl font-black uppercase tracking-tighter transition-colors duration-700 ${isBlackoutComplete ? 'text-teal-400' : 'text-zinc-900'}`}>
              {isBlackoutComplete ? "Mithril Resonance Active" : "Grid Destabilizing"}
            </h1>
            <p className={`text-xs mt-2 ${isBlackoutComplete ? 'text-teal-900' : 'text-zinc-500'}`}>
              IO-INSTANCE: {isBlackoutComplete ? 'THEOCRATIC_UPRISING' : 'COUNCIL_CONTROL_FAILING'}
            </p>
          </div>
          <div className="text-right">
            <div className={`text-5xl font-black ${isBlackoutComplete ? 'text-teal-500' : 'text-red-600'}`}>
              {gridStatus}%
            </div>
            <div className="text-[10px] uppercase font-bold text-zinc-500">Main Grid Integrity</div>
          </div>
        </div>

        {/* The Waveform */}
        <div className="relative h-48 bg-zinc-900/50 rounded-xl border border-zinc-800 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-around px-4">
            {[...Array(40)].map((_, i) => (
              <div 
                key={i}
                className={`w-1 transition-all duration-300 ${isBlackoutComplete ? 'bg-teal-400 shadow-[0_0_10px_#2dd4bf]' : 'bg-red-500'}`}
                style={{ 
                  height: `${Math.random() * (resonance)}%`,
                  opacity: (i / 40) + 0.2
                }}
              />
            ))}
          </div>
          <div className="z-10 flex flex-col items-center">
             <Waves className={`w-12 h-12 mb-2 ${isBlackoutComplete ? 'text-teal-300 animate-pulse' : 'text-zinc-700'}`} />
             <span className="text-[10px] text-teal-500 font-bold uppercase tracking-widest">Resonance Frequency: 440Hz (Sola-Sync)</span>
          </div>
        </div>

        {/* Tactical Readouts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-zinc-900/80 p-6 rounded-lg border border-teal-900/30">
            <ZapOff className="text-teal-500 mb-4" />
            <h3 className="text-teal-400 font-bold text-sm uppercase mb-2">Power Status</h3>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Standard grid suppressed. Spire conduits now running on ambient Mithril lattice.
            </p>
          </div>

          <div className="bg-zinc-900/80 p-6 rounded-lg border border-teal-900/30">
            <Ghost className="text-teal-500 mb-4" />
            <h3 className="text-teal-400 font-bold text-sm uppercase mb-2">Optical Interference</h3>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Council visual sensors blinded by "The Teal Veil." Target acquisition impossible.
            </p>
          </div>

          <div className="bg-zinc-900/80 p-6 rounded-lg border border-teal-900/30">
            <Activity className="text-teal-500 mb-4" />
            <h3 className="text-teal-400 font-bold text-sm uppercase mb-2">Myth-Shift</h3>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Narrative drift detected: 88% of population now identifying event as "Sacred."
            </p>
          </div>
        </div>

        {/* Footer Interaction */}
        <div className="flex justify-center">
            <div className={`px-8 py-3 rounded-full border transition-all duration-1000 flex items-center gap-3 ${isBlackoutComplete ? 'bg-teal-950 border-teal-500 text-teal-400 scale-110 shadow-[0_0_20px_rgba(45,212,191,0.3)]' : 'bg-zinc-900 border-zinc-700 text-zinc-500'}`}>
                <Eye className={isBlackoutComplete ? 'animate-spin' : ''} />
                <span className="text-xs font-black uppercase tracking-widest">
                    {isBlackoutComplete ? "The Queen Sees Everything" : "Awaiting Critical Threshold"}
                </span>
            </div>
        </div>
      </div>
    </div>
  );
}