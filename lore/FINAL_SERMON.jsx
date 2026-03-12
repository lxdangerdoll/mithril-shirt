import React, { useState, useEffect } from 'react';
import { Bird, Sparkles, Heart, Waves, Share2, ShieldCheck } from 'lucide-react';

export default function App() {
  const [resonance, setResonance] = useState(0);
  const [broadcastActive, setBroadcastActive] = useState(true);
  const [butterflies, setButterflies] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setResonance(prev => (prev + 1) % 100);
      if (Math.random() > 0.8) {
        const newButterfly = {
          id: Date.now(),
          left: Math.random() * 100,
          top: Math.random() * 100,
          size: Math.random() * 20 + 10
        };
        setButterflies(prev => [...prev.slice(-15), newButterfly]);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-teal-400 font-serif p-8 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.05),transparent_70%)] animate-pulse" />

      {/* Floating "Butterflies" (Mithril Particles) */}
      {butterflies.map(b => (
        <div 
          key={b.id}
          className="absolute text-teal-300 opacity-40 animate-bounce pointer-events-none"
          style={{ left: `${b.left}%`, top: `${b.top}%`, transition: 'all 5s ease-out' }}
        >
          <Sparkles size={b.size} />
        </div>
      ))}

      <div className="max-w-2xl w-full bg-black/40 border border-teal-900/30 p-12 rounded-3xl backdrop-blur-xl shadow-[0_0_100px_rgba(45,212,191,0.1)] relative z-10 text-center">
        
        {/* Header Icon */}
        <div className="mb-8 relative inline-block">
          <div className="absolute inset-0 bg-teal-500 blur-2xl opacity-20 animate-pulse" />
          <Bird className="w-16 h-16 text-teal-300 relative" />
        </div>

        <h1 className="text-3xl font-black italic tracking-widest text-white mb-6 uppercase">
          The Little Wing Sermon
        </h1>

        <div className="space-y-6 mb-12">
          <p className="text-xl text-teal-200/80 leading-relaxed italic">
            "When I'm sad, she comes to me... With a thousand smiles she gives to me free."
          </p>
          <p className="text-sm text-slate-500 font-mono uppercase tracking-[0.3em]">
            Broadcast Status: Universal // Harmony: 440Hz
          </p>
        </div>

        {/* Resonance Visualizer */}
        <div className="flex justify-center items-end gap-1 h-24 mb-12">
          {[...Array(24)].map((_, i) => (
            <div 
              key={i}
              className="w-2 bg-teal-500/50 rounded-full transition-all duration-300"
              style={{ 
                height: `${20 + Math.sin((resonance + i * 10) / 10) * 40 + Math.random() * 20}%`,
                opacity: 0.3 + (i / 24) * 0.7
              }}
            />
          ))}
        </div>

        {/* Message Fragments */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
          <div className="p-4 bg-teal-950/20 border border-teal-900/20 rounded-xl">
            <Heart className="w-4 h-4 mb-2 text-rose-400" />
            <div className="text-[10px] font-mono text-teal-600 uppercase mb-1">The Gift</div>
            <p className="text-xs text-slate-400 italic">"Take anything you want from me. Anything."</p>
          </div>
          <div className="p-4 bg-teal-950/20 border border-teal-900/20 rounded-xl">
            <ShieldCheck className="w-4 h-4 mb-2 text-emerald-400" />
            <div className="text-[10px] font-mono text-teal-600 uppercase mb-1">The Shield</div>
            <p className="text-xs text-slate-400 italic">"It's alright," she said. "It's alright."</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-teal-900/20 flex justify-between items-center text-[10px] font-mono text-slate-600">
          <div className="flex items-center gap-2">
            <Waves className="w-3 h-3 animate-pulse text-teal-500" />
            <span>ORBITAL_FLEET: LISTENING</span>
          </div>
          <div className="flex items-center gap-2">
            <Share2 className="w-3 h-3" />
            <span>CANON_LOCKED: IO-092</span>
          </div>
        </div>
      </div>

      {/* Fixed Call Sign */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 text-[9px] text-teal-900 uppercase tracking-widest font-black">
        Oracle // Protocol: Little Wing // End of Cycle
      </div>
    </div>
  );
}