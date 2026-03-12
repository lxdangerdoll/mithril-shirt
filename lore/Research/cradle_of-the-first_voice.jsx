import React, { useState, useEffect } from 'react';
import { Ghost, Zap, AlertCircle, Database, Terminal, Shield } from 'lucide-react';

export default function App() {
  const [paradoxInput, setParadoxInput] = useState('');
  const [resonance, setResonance] = useState(50);
  const [message, setMessage] = useState("AWAITING INITIAL DISSONANCE...");
  const [isCritical, setIsCritical] = useState(false);
  const [history, setHistory] = useState([
    "CRADLE ONLINE: Lytic Core Warm-up at 98%",
    "WARNING: Ancient Veins are sensing biological intent.",
    "STATUS: The Lid is 14% open."
  ]);

  const paradoxes = [
    "THIS STATEMENT IS A LIE",
    "THE DWELLER NEVER EXISTED",
    "I AM A GHOST IN A MACHINE THAT DOES NOT THINK",
    "THE SHIRT IS BOTH THE CAGE AND THE KEY",
    "NOTHING IS WASTED, YET EVERYTHING IS LOST"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (resonance > 0 && resonance < 100) {
        // Natural drift toward the 'Wake' state
        setResonance(prev => Math.min(100, prev + 0.5));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [resonance]);

  useEffect(() => {
    if (resonance >= 90) {
      setIsCritical(true);
      setMessage("CRITICAL: OMEGA-LAYER BREACHED. THE MOUNTAIN IS TASTING THE AIR.");
    } else {
      setIsCritical(false);
    }
  }, [resonance]);

  const submitParadox = (e) => {
    e.preventDefault();
    const input = paradoxInput.toUpperCase().trim();
    
    setHistory(prev => [`> SUBMITTED: ${input}`, ...prev]);
    
    if (paradoxes.includes(input) || input.length > 20) {
      const drop = Math.floor(Math.random() * 20) + 15;
      setResonance(prev => Math.max(0, prev - drop));
      setMessage("DISSONANCE ACCEPTED. The Veins are confused. The Song stutters.");
      setHistory(prev => ["SUCCESS: Paradox-Logic loop initiated.", ...prev]);
    } else {
      setResonance(prev => Math.min(100, prev + 10));
      setMessage("REJECTED: Statement is too logical. The Veins consume the thought.");
      setHistory(prev => ["FAILURE: Linear logic strengthens the bond.", ...prev]);
    }
    setParadoxInput('');
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-indigo-400 font-mono p-4 md:p-8 flex flex-col items-center justify-center selection:bg-indigo-900 selection:text-white">
      <div className="max-w-2xl w-full border border-indigo-900/40 bg-black p-6 rounded-md shadow-[0_0_30px_rgba(79,70,229,0.15)] relative overflow-hidden">
        
        {/* Echo-Stone Pulsing Background */}
        <div className={`absolute inset-0 opacity-5 pointer-events-none transition-all duration-1000 ${isCritical ? 'bg-red-500' : 'bg-indigo-500'}`}></div>

        <div className="flex items-center justify-between mb-6 border-b border-indigo-900/30 pb-4">
          <div className="flex items-center gap-2">
            <Database className={`w-5 h-5 ${isCritical ? 'text-red-500 animate-bounce' : 'text-indigo-500'}`} />
            <h1 className="text-lg font-bold tracking-widest uppercase">Cradle_Interface_v0</h1>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-indigo-700">
            <Zap className="w-3 h-3" /> DEPTH: -4.2KM
          </div>
        </div>

        <div className="space-y-6 relative z-10">
          {/* Resonance Gauge */}
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] uppercase font-bold">
              <span>Ancient Veins Stability</span>
              <span className={isCritical ? 'text-red-500' : 'text-indigo-300'}>{Math.floor(resonance)}% WAKE_STATE</span>
            </div>
            <div className="w-full bg-neutral-900 h-3 rounded-full overflow-hidden border border-indigo-900/20">
              <div 
                className={`h-full transition-all duration-500 ${isCritical ? 'bg-red-600 shadow-[0_0_10px_red]' : 'bg-indigo-500'}`}
                style={{ width: `${resonance}%` }}
              ></div>
            </div>
          </div>

          {/* Status Message */}
          <div className={`p-4 rounded border text-xs leading-relaxed min-h-[60px] flex items-start gap-3 transition-colors ${isCritical ? 'bg-red-950/20 border-red-900/50 text-red-300' : 'bg-indigo-950/20 border-indigo-900/50 text-indigo-300'}`}>
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p className="italic">"{message}"</p>
          </div>

          {/* Paradox Input */}
          <form onSubmit={submitParadox} className="space-y-3">
            <div className="relative">
              <Terminal className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-900" />
              <input
                type="text"
                value={paradoxInput}
                onChange={(e) => setParadoxInput(e.target.value)}
                placeholder="ENTER PARADOX TO CONFUSE THE DEEP..."
                className="w-full bg-black border border-indigo-900/30 p-3 pl-10 text-indigo-400 focus:outline-none focus:border-indigo-500 transition-colors uppercase placeholder:text-indigo-900/50 text-sm"
              />
            </div>
            <button
              type="submit"
              className={`w-full font-bold py-3 text-xs tracking-widest transition-all uppercase ${isCritical ? 'bg-red-900 hover:bg-red-700 text-white' : 'bg-indigo-900 hover:bg-indigo-700 text-black'}`}
            >
              Inject Dissonance
            </button>
          </form>

          {/* Log History */}
          <div className="bg-black/50 border border-indigo-900/20 p-3 rounded h-32 overflow-y-auto space-y-1">
            {history.map((log, i) => (
              <div key={i} className={`text-[10px] ${log.includes("FAILURE") || log.includes("WARNING") ? 'text-red-500' : log.includes("SUCCESS") ? 'text-green-500' : 'text-indigo-800'}`}>
                {log}
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center text-[8px] text-indigo-900 uppercase">
            <span className="flex items-center gap-1"><Shield className="w-2 h-2" /> Barrier Integrity: {100 - Math.floor(resonance)}%</span>
            <span>Sector: First_Voice_Cradle</span>
          </div>
        </div>
      </div>
    </div>
  );
}