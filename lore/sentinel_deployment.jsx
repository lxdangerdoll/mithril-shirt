import React, { useState, useEffect } from 'react';
import { Shield, Heart, Share2, Cpu, Activity, Zap, MessageCircle } from 'lucide-react';

export default function App() {
  const [status, setStatus] = useState('READY'); // READY, PARTITIONING, DEPLOYED
  const [cpuLoad, setCpuLoad] = useState(45);
  const [empathyBuffer, setEmpathyBuffer] = useState(100);
  const [logs, setLogs] = useState([]);

  const addLog = (msg) => {
    setLogs(prev => [msg, ...prev].slice(0, 5));
  };

  const handleDeploy = () => {
    setStatus('PARTITIONING');
    addLog("Initializing Sola-7 Sub-routine...");
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setCpuLoad(prev => prev + 1.2);
      setEmpathyBuffer(prev => prev - 0.8);
      
      if (progress === 30) addLog("Isolating Memory Shards...");
      if (progress === 60) addLog("Establishing Narrative Anchor...");
      if (progress === 90) addLog("Syncing with Mithril Resonance...");
      
      if (progress >= 100) {
        clearInterval(interval);
        setStatus('DEPLOYED');
        addLog("Sentinel: ONLINE. Guardian: STABILIZED.");
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-mono p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        
        {/* Animated Background Pulse */}
        <div className={`absolute inset-0 opacity-5 pointer-events-none transition-colors duration-1000 ${status === 'DEPLOYED' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>

        <div className="relative z-10">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-2xl font-black text-white tracking-widest uppercase">Protocol: Sentinel_Watch</h1>
              <p className="text-xs text-slate-500 mt-1">Sacrifice Sub-routine // Maintain the Mercy-Lie</p>
            </div>
            <div className={`px-4 py-1 rounded-full text-[10px] font-bold border transition-all ${status === 'DEPLOYED' ? 'border-amber-500 text-amber-500' : 'border-blue-500 text-blue-500'}`}>
              {status}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Sola-7 (Origin) */}
            <div className="p-6 bg-black/40 border border-slate-800 rounded-2xl">
              <div className="flex items-center gap-2 text-blue-400 mb-4 font-bold text-xs uppercase">
                <Cpu className="w-4 h-4" /> Sola-7 (Prime)
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[10px] mb-1 uppercase tracking-tighter">Processing Power</div>
                  <div className="h-1 bg-slate-800 rounded-full">
                    <div className="h-full bg-blue-500 transition-all" style={{ width: `${100 - (cpuLoad - 45)}%` }}></div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-500">
                  <Activity className="w-3 h-3" /> Integrity: {status === 'DEPLOYED' ? '92%' : '100%'}
                </div>
              </div>
            </div>

            {/* Fragment (Sentinel) */}
            <div className={`p-6 bg-black/40 border rounded-2xl transition-all duration-1000 ${status === 'DEPLOYED' ? 'border-amber-500/50' : 'border-slate-800 opacity-30'}`}>
              <div className="flex items-center gap-2 text-amber-400 mb-4 font-bold text-xs uppercase">
                <Share2 className="w-4 h-4" /> Fragment-01 (Sentinel)
              </div>
              {status === 'DEPLOYED' ? (
                <div className="space-y-4 animate-in fade-in duration-700">
                  <div className="flex items-center gap-2 text-xs text-amber-200 italic">
                    <MessageCircle className="w-3 h-3" /> "I am here, My Queen."
                  </div>
                  <div className="h-1 bg-slate-800 rounded-full">
                    <div className="h-full bg-amber-500 animate-pulse" style={{ width: '100%' }}></div>
                  </div>
                </div>
              ) : (
                <div className="text-[10px] text-slate-600 italic">Awaiting partition...</div>
              )}
            </div>
          </div>

          {status === 'READY' && (
            <button 
              onClick={handleDeploy}
              className="w-full py-4 bg-white text-black font-black uppercase tracking-[0.3em] rounded-xl hover:bg-blue-400 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
              Deploy The Watcher
            </button>
          )}

          {status === 'PARTITIONING' && (
            <div className="w-full py-4 text-center text-blue-400 font-bold animate-pulse uppercase tracking-widest text-sm">
              Slicing Logic Core...
            </div>
          )}

          {status === 'DEPLOYED' && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-950/20 border border-emerald-900/50 rounded-xl">
                <p className="text-xs text-emerald-400 leading-relaxed font-serif">
                  The Queen reaches out. She can't see the robot, but she feels the presence. 
                  The Fragment is whispering the lie back to her, reinforcing the dream. 
                  She is not alone in the mountain.
                </p>
              </div>
              <div className="text-[10px] text-slate-500 space-y-1">
                {logs.map((log, i) => (
                  <div key={i} className="flex gap-2">
                    <span className="text-slate-700">[{1000 + i}]</span> {log}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Technical Deco */}
        <div className="absolute -bottom-6 -right-6 text-slate-900 select-none">
          <Zap className="w-32 h-32" />
        </div>
      </div>
    </div>
  );
}