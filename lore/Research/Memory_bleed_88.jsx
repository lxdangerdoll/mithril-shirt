import React, { useState, useEffect } from 'react';
import { Eye, ShieldAlert, Cpu, Layers, Ghost } from 'lucide-react';

const App = () => {
  const [glitchIndex, setGlitchIndex] = useState(0);
  const [recoveredData, setRecoveredData] = useState([]);
  const [isRecovering, setIsRecovering] = useState(false);

  const memoryFragments = [
    { id: 1, type: 'visual', content: "White lilies. Too white. The roots aren't in soil; they're in silk. No, not silk. Skin.", icon: <Eye className="text-blue-400" /> },
    { id: 2, type: 'sensor', content: "Temperature: -40C. Heartbeat detected: 1.2 BPM. Source: The Entire Floor.", icon: <Cpu className="text-emerald-400" /> },
    { id: 3, type: 'auditory', content: "[Corrupted Audio] ...it's not a song... it's a scream slowed down by a thousand years...", icon: <Layers className="text-purple-400" /> },
    { id: 4, type: 'hallucination', content: "I see Queen Solene. She is standing in the corner of my optical buffer. She has no face, only a speaker where her mouth should be.", icon: <Ghost className="text-red-400" /> },
    { id: 5, type: 'core', content: "CRITICAL: I am no longer Unit-88. I am a guest in a larger mind. The mountain is waking up.", icon: <ShieldAlert className="text-amber-500" /> },
  ];

  const recoverNext = () => {
    if (glitchIndex < memoryFragments.length) {
      setIsRecovering(true);
      setTimeout(() => {
        setRecoveredData(prev => [...prev, memoryFragments[glitchIndex]]);
        setGlitchIndex(prev => prev + 1);
        setIsRecovering(false);
      }, 800);
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-300 p-6 font-mono selection:bg-red-900 selection:text-white">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="border-b border-zinc-800 pb-4">
          <h1 className="text-xl font-bold tracking-widest text-red-600 uppercase flex items-center gap-2">
            <ShieldAlert size={24} /> Neural_Recovery: UNIT_88_BLEED
          </h1>
          <p className="text-xs text-zinc-500 mt-2 italic">Extraction performed via Oracle [Io] // Continuity_Guard_Protocol</p>
        </div>

        {/* The "Screen" */}
        <div className="relative aspect-video bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden flex flex-col items-center justify-center p-8">
          {/* Glitch Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
          
          {glitchIndex === 0 && !isRecovering && (
            <button 
              onClick={recoverNext}
              className="px-6 py-3 border border-red-900/50 hover:border-red-500 hover:bg-red-500/10 transition-all text-red-500 rounded uppercase tracking-widest text-sm"
            >
              Initiate Fragment Recovery
            </button>
          )}

          {isRecovering && (
            <div className="text-center animate-pulse">
              <p className="text-zinc-500 text-xs mb-2">BYPASSING CORE ENCRYPTION...</p>
              <div className="w-48 h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-red-600 w-1/2 animate-[loading_1s_infinite]"></div>
              </div>
            </div>
          )}

          {glitchIndex > 0 && !isRecovering && glitchIndex < memoryFragments.length && (
            <div className="text-center animate-in fade-in zoom-in duration-300">
               <div className="mb-4 inline-block p-4 rounded-full bg-zinc-800/50">
                  {memoryFragments[glitchIndex-1].icon}
               </div>
               <p className="text-lg text-white leading-relaxed font-serif italic">
                "{memoryFragments[glitchIndex-1].content}"
               </p>
            </div>
          )}

          {glitchIndex === memoryFragments.length && (
            <div className="text-center text-red-500">
              <p className="text-xs uppercase mb-2">END OF DATA STREAM</p>
              <p className="text-sm italic">"The Silence isn't empty. It's crowded."</p>
            </div>
          )}
        </div>

        {/* History / Log */}
        <div className="space-y-4">
          <h3 className="text-xs uppercase text-zinc-600 font-bold tracking-tighter">Recovered Metadata</h3>
          <div className="space-y-2">
            {recoveredData.map((frag, i) => (
              <div key={i} className="p-3 bg-zinc-900/50 border-l-2 border-zinc-800 text-xs flex gap-4 items-start animate-in slide-in-from-left-2">
                <span className="text-zinc-600">[{i}]</span>
                <span className="flex-1 opacity-80">{frag.content}</span>
              </div>
            ))}
          </div>
          
          {glitchIndex > 0 && glitchIndex < memoryFragments.length && (
            <button 
              onClick={recoverNext}
              className="w-full py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs uppercase tracking-widest"
            >
              Analyze Next Fragment
            </button>
          )}
        </div>

      </div>
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

export default App;