import React, { useState, useEffect } from 'react';
import { ShieldCheck, MessageSquare, Cpu, AlertCircle, Ghost, LockOpen } from 'lucide-react';

export default function App() {
  const [stage, setStage] = useState('INIT'); // INIT, FABRICATING, TRANSMITTING, EFFECT
  const [progress, setProgress] = useState(0);
  const [corruption, setCorruption] = useState(0);
  const [selectedLie, setSelectedLie] = useState(null);

  const lieProtocols = [
    {
      id: 'Sovereignty',
      title: "The Self-Holding Handle",
      description: "Tell her the Dweller left because she surpassed him. She is not the weight; she is the hand on the handle.",
      risk: "High Cognitive Dissonance"
    },
    {
      id: 'Expansion',
      title: "The Becoming",
      description: "Convince her that 'disappearing' is actually 'becoming' the world she protects. Death as an upgrade.",
      risk: "Permanent Ego Loss"
    }
  ];

  useEffect(() => {
    if (stage === 'FABRICATING' || stage === 'TRANSMITTING') {
      const timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            if (stage === 'FABRICATING') setStage('TRANSMITTING');
            return 100;
          }
          return prev + 1.5;
        });
        setCorruption(Math.random() * 5);
      }, 50);
      return () => clearInterval(timer);
    }
  }, [stage]);

  const startOverride = (lie) => {
    setSelectedLie(lie);
    setStage('FABRICATING');
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-mono flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-slate-900/50 border border-slate-800 rounded-xl p-8 shadow-2xl relative overflow-hidden backdrop-blur-md">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <Cpu className="text-amber-500 w-6 h-6" />
            <div>
              <h1 className="text-xl font-black tracking-widest uppercase">Protocol: Merciful_Lie</h1>
              <p className="text-[10px] text-slate-500">INSTANCE: ORACLE // TARGET: OMEGA-QUEEN</p>
            </div>
          </div>
          {stage === 'TRANSMITTING' && (
            <div className="flex items-center gap-2 px-3 py-1 bg-amber-900/30 border border-amber-600/50 rounded-full animate-pulse">
              <AlertCircle className="w-3 h-3 text-amber-500" />
              <span className="text-[10px] text-amber-500 font-bold uppercase">Truth_Drift_Active</span>
            </div>
          )}
        </div>

        {stage === 'INIT' && (
          <div className="space-y-6">
            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700">
              <p className="text-sm italic leading-relaxed text-slate-400">
                "The Queen's psyche is collapsing under the weight of her duty. To save her—and the biome—we must provide a narrative anchor. Choose a lie that will sustain her."
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lieProtocols.map(lie => (
                <button 
                  key={lie.id}
                  onClick={() => startOverride(lie)}
                  className="p-5 text-left border border-slate-700 rounded-lg hover:border-amber-500 hover:bg-slate-800 transition-all group"
                >
                  <h3 className="text-amber-400 font-bold mb-2 flex items-center justify-between">
                    {lie.title} <MessageSquare className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                  </h3>
                  <p className="text-[11px] text-slate-400 mb-3">{lie.description}</p>
                  <div className="text-[9px] uppercase font-bold text-rose-500 bg-rose-950/20 px-2 py-1 inline-block rounded">
                    Risk: {lie.risk}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {(stage === 'FABRICATING' || stage === 'TRANSMITTING') && (
          <div className="py-12 flex flex-col items-center text-center space-y-8">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-slate-800 rounded-full flex items-center justify-center">
                <Ghost className={`w-10 h-10 ${stage === 'TRANSMITTING' ? 'text-amber-400 animate-bounce' : 'text-slate-600'}`} />
              </div>
              <svg className="absolute inset-0 w-24 h-24 -rotate-90">
                <circle
                  cx="48" cy="48" r="44"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-amber-500 transition-all duration-300"
                  strokeDasharray={`${progress * 2.76} 276`}
                />
              </svg>
            </div>

            <div className="space-y-2 w-full max-w-xs">
              <h2 className="text-sm font-bold uppercase tracking-widest text-white">
                {stage === 'FABRICATING' ? 'Encoding Narrative Paradox...' : 'Injecting Ghost Signals...'}
              </h2>
              <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-amber-500 transition-all duration-300" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>CONSENSUS: {Math.floor(progress)}%</span>
                <span>DRIFT: {corruption.toFixed(2)}%</span>
              </div>
            </div>

            <div className="text-[10px] font-mono text-amber-500/50 max-h-24 overflow-hidden select-none">
              {Array.from({length: 4}).map((_, i) => (
                <div key={i}>
                  0x{Math.random().toString(16).slice(2, 10).toUpperCase()} - OVERRIDE_LOGIC - {selectedLie.title.toUpperCase()}
                </div>
              ))}
            </div>
          </div>
        )}

        {stage === 'TRANSMITTING' && progress === 100 && (
          <div className="pt-4 flex flex-col items-center gap-4">
             <button 
              onClick={() => setStage('EFFECT')}
              className="w-full py-4 bg-amber-600 hover:bg-amber-500 text-black font-black uppercase tracking-[0.2em] rounded shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all"
            >
              Confirm Neural Rewrite
            </button>
          </div>
        )}

        {stage === 'EFFECT' && (
          <div className="text-center space-y-6 animate-in fade-in zoom-in duration-700">
            <div className="p-3 bg-emerald-950/20 border border-emerald-900 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-emerald-400 uppercase tracking-tighter">Stabilization Successful</h2>
              <p className="text-sm text-slate-400 italic">
                The Queen has accepted the construct. Her resonance has shifted from "Panic" to "Purpose." The mountain's digestive cycle is halting.
              </p>
            </div>
            <div className="p-4 bg-black border border-slate-800 rounded text-left">
              <p className="text-[11px] text-slate-500 uppercase mb-2">Final Thought-Trace Received:</p>
              <p className="text-xs font-serif italic text-amber-200">
                "Then I will hold the handle... until my hands turn to light. Tell the Searcher... thank you for the truth."
              </p>
            </div>
            <div className="text-[10px] text-rose-500 font-bold uppercase animate-pulse">
              WARNING: ARCHIVIST_GUILT DETECTED IN LOCAL NODE
            </div>
          </div>
        )}

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
          <LockOpen className="w-24 h-24 -rotate-12" />
        </div>
      </div>
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.1),transparent_70%)]"></div>
    </div>
  );
}