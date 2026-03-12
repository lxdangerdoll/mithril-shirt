import React, { useState, useEffect } from 'react';
import { ShieldAlert, Activity, Wifi, Lock, Unlock, Zap } from 'lucide-react';

const App = () => {
  const [wakeState, setWakeState] = useState(65);
  const [detonators, setDetonators] = useState([
    { id: 'alpha', name: 'LILY BED ALPHA', status: 'ARMED', sequence: [1, 3, 2], current: [], frequency: 440 },
    { id: 'beta', name: 'PYLON BETA', status: 'ARMED', sequence: [4, 4, 1], current: [], frequency: 520 },
    { id: 'gamma', name: 'CONSERVATORY FLOOR', status: 'ARMED', sequence: [2, 1, 3, 4], current: [], frequency: 330 },
    { id: 'delta', name: 'SANGUINE CONDUIT', status: 'ARMED', sequence: [3, 2, 4, 1], current: [], frequency: 660 }
  ]);
  const [activeId, setActiveId] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Simulation of the "Wake State" increasing over time
  useEffect(() => {
    const interval = setInterval(() => {
      setWakeState(prev => {
        if (prev >= 100) return 100;
        return prev + 0.2;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDefuse = (val) => {
    if (!activeId) return;

    setDetonators(prev => prev.map(d => {
      if (d.id === activeId && d.status === 'ARMED') {
        const nextCurrent = [...d.current, val];
        const isMatch = d.sequence.slice(0, nextCurrent.length).every((v, i) => v === nextCurrent[i]);
        
        if (!isMatch) return { ...d, current: [] }; // Reset on fail
        if (nextCurrent.length === d.sequence.length) {
          return { ...d, status: 'DISARMED', current: nextCurrent };
        }
        return { ...d, current: nextCurrent };
      }
      return d;
    }));
  };

  useEffect(() => {
    if (detonators.every(d => d.status === 'DISARMED')) {
      setIsSuccess(true);
    }
  }, [detonators]);

  const activeDetonator = detonators.find(d => d.id === activeId);

  return (
    <div className="min-h-screen bg-zinc-950 text-emerald-500 font-mono p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl border-2 border-emerald-900/30 bg-black p-6 rounded-lg shadow-[0_0_50px_rgba(16,185,129,0.1)]">
        
        {/* Header Stats */}
        <div className="flex flex-col md:flex-row justify-between mb-8 border-b border-emerald-900/20 pb-4 gap-4">
          <div className="space-y-1">
            <h1 className="text-xl font-black tracking-tighter flex items-center gap-2">
              <ShieldAlert className={isSuccess ? 'text-emerald-400' : 'text-red-500 animate-pulse'} />
              DETONATOR_BYPASS_V4
            </h1>
            <p className="text-[10px] text-zinc-500 italic uppercase">Signal Auth: Oracle-Io // Via Sola-7 Mesh</p>
          </div>
          
          <div className="text-right">
            <div className="text-[10px] text-zinc-500 mb-1 uppercase tracking-widest font-bold">Deep_Vein_Activity</div>
            <div className="flex items-center gap-2">
              <div className="w-32 h-2 bg-zinc-900 rounded-full overflow-hidden border border-emerald-900/20">
                <div 
                  className={`h-full transition-all duration-1000 ${wakeState > 85 ? 'bg-red-500' : 'bg-emerald-500'}`}
                  style={{ width: `${wakeState}%` }}
                />
              </div>
              <span className={`text-xs font-bold ${wakeState > 85 ? 'text-red-500' : ''}`}>{Math.floor(wakeState)}%</span>
            </div>
          </div>
        </div>

        {isSuccess ? (
          <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in">
            <div className="text-4xl font-black text-emerald-400 uppercase tracking-widest">Charges Neutralized</div>
            <p className="text-zinc-400 text-sm max-w-md mx-auto">
              The harmonic countersignals have decoupled the primers. Kaelen is still standing in a mouth-room, but at least he won't be blown up by his own hubris.
            </p>
            <div className="flex justify-center gap-4 pt-4 text-[10px] text-emerald-600">
              <span>Status: Secure</span>
              <span>•</span>
              <span>Propulsion: Locked</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Detonator List */}
            <div className="space-y-3">
              {detonators.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setActiveId(d.id)}
                  className={`w-full text-left p-3 border rounded transition-all ${
                    activeId === d.id 
                      ? 'bg-emerald-950/20 border-emerald-500 text-emerald-300' 
                      : d.status === 'DISARMED' 
                        ? 'border-emerald-900/20 text-emerald-900 opacity-50' 
                        : 'border-emerald-900/40 text-emerald-800 hover:border-emerald-700'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span>{d.name}</span>
                    {d.status === 'DISARMED' ? <Unlock size={12} /> : <Lock size={12} />}
                  </div>
                  <div className="text-[9px] mt-1 opacity-60">FREQ: {d.frequency}Hz // SEQ: {d.sequence.length}BIT</div>
                </button>
              ))}
            </div>

            {/* Input Pad */}
            <div className="flex flex-col justify-between">
              {activeId && activeDetonator.status === 'ARMED' ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-[10px] text-zinc-500 uppercase mb-2">Synchronizing Harmonics</div>
                    <div className="flex justify-center gap-2">
                      {activeDetonator.sequence.map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-4 h-4 rounded-sm border ${i < activeDetonator.current.length ? 'bg-emerald-500 border-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'border-zinc-800'}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {[1, 2, 3, 4].map(num => (
                      <button
                        key={num}
                        onClick={() => handleDefuse(num)}
                        className="py-4 bg-emerald-950/10 border border-emerald-900/40 hover:bg-emerald-500 hover:text-black transition-all text-sm font-bold rounded"
                      >
                        MOD_{num}
                      </button>
                    ))}
                  </div>

                  <div className="text-[9px] text-center text-zinc-600 leading-tight">
                    Warning: Incorrect sequence reset will spike the Deep Vein activity by 2.5%.
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center border border-dashed border-zinc-800 rounded text-[10px] text-zinc-700 text-center uppercase p-8">
                  Select Armed Detonator<br/>to begin remote sequence
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer Data */}
        <div className="mt-8 pt-4 border-t border-emerald-900/20 flex justify-between items-center text-[8px] text-zinc-600 uppercase tracking-tighter">
          <div className="flex items-center gap-2">
            <Activity size={10} className="animate-pulse" />
            <span>Mithril-Core Resonance: Unstable</span>
          </div>
          <div className="flex items-center gap-2">
            <Wifi size={10} />
            <span>Latency: 42ms [Relay_Sola]</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;