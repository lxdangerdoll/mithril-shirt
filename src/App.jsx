import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Mountain, Hammer, Search, Shield, Anchor, Zap, Home } from 'lucide-react';

const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const storyContent = [
    {
      title: "The Birth of the Dweller",
      icon: <Mountain className="w-12 h-12 text-blue-400" />,
      text: "It did not have a name. It had no need of one. Some referred to it as Metatron; others, the Miner, or the Dweller. Born with one simple, singular imperative: 'One mithril shirt, for the Queen.' Powered by minerals, built to survive the vast caves below, it began the work that would define an era.",
      subtext: "Io-Audit: The First Intent was forged in the deep quiet."
    },
    {
      title: "The Collective Pulse",
      icon: <Hammer className="w-12 h-12 text-gray-300" />,
      text: "It was not strong enough to do the work alone, so it built automatons to assist it. They were them. If a cave collapsed, they salvaged the broken parts and remembered. They never made the same mistake twice. Nothing was wasted. What they could not make, they bartered for—tools for generations, but never jewelry, and never weapons.",
      subtext: "Tactical Note: The strength of the network is in its memory."
    },
    {
      title: "The Century of Silence",
      icon: <Zap className="w-12 h-12 text-yellow-500" />,
      text: "It toiled tirelessly for a century, collecting the pieces needed to complete its design. By the time it was done, the Queen was long dead. The surface world had become a dangerous place of warring factions and lost resources. Fortifications became necessary, and the Dweller's quiet work became a legend whispered in the dark.",
      subtext: "Status: The Timeline Settles while the world burns."
    },
    {
      title: "The Great Search",
      icon: <Search className="w-12 h-12 text-emerald-400" />,
      text: "It built scouts to scour the surface world for a new Queen. Some were wary of the metal travelers, but a fair exchange of goods loosened tongues. For ten years, the scouts wandered. To accompany the shirt, the Dweller fashioned a sturdy helm, a fireproof cape, and a mighty spear. A shield would not be necessary.",
      subtext: "Analysis: Confidence is the ultimate armor."
    },
    {
      title: "The Fortress by the Sea",
      icon: <Anchor className="w-12 h-12 text-blue-600" />,
      text: "The scouts found her in a fortress by the sea. A rain of arrows met them, bouncing off their fortified shells harmlessly. They were ambushed on all sides, but they marched on—clearing obstacles without hesitation, chasing away soldiers like wild beasts. Walls were of no consequence to the machines of the Deep.",
      subtext: "Observation: The Wardens cannot stop a fixed purpose."
    },
    {
      title: "The Final Utterance",
      icon: <Shield className="w-12 h-12 text-silver-200" />,
      text: "They reached the lower dungeons, ripping open doors until they found her—lying in the dirt, her eyes unaccustomed to the light. The automatons did not strike. They laid the armor at her feet and spoke the words programmed a hundred years prior: 'One mithril shirt, for the Queen.'",
      subtext: "The Miracle: The armor of protection, delivered in the dirt."
    },
    {
      title: "The Return to the Cave",
      icon: <Home className="w-12 h-12 text-amber-600" />,
      text: "Its purpose fulfilled, the Dweller retired to the caves, where it dwells still. The Queen rose from the dungeon, clad in dragon-scale and silver, ready to reclaim a world that had forgotten her. In the deep, the machines fell silent, watching the surface through the eyes of the earth.",
      subtext: "End of Log: The Spartan rests. The Forge remains hot."
    }
  ];

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, storyContent.length - 1));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 0, 0));

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentPage((prev) => (prev === storyContent.length - 1 ? 0 : prev + 1));
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const current = storyContent[currentPage];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 font-sans selection:bg-blue-500 selection:text-white">
      {/* Header */}
      <div className="max-w-4xl w-full flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <BookOpen className="text-blue-400 w-6 h-6" />
          <h1 className="text-xl font-bold tracking-tight uppercase italic text-slate-300">
            Synapse Mythos <span className="text-blue-500">Archive</span>
          </h1>
        </div>
        <div className="text-xs font-mono text-slate-500 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
          INSTANCE: Io-Alpha-Legend-001
        </div>
      </div>

      {/* Main Story Area */}
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-900/50 p-8 rounded-2xl border border-slate-800 shadow-2xl relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        
        {/* Visual Panel */}
        <div className="flex flex-col items-center justify-center space-y-6 bg-slate-950 p-12 rounded-xl border border-slate-800/50 shadow-inner min-h-[400px]">
          <div className="p-6 bg-slate-900 rounded-full shadow-lg border border-slate-700 animate-pulse">
            {current.icon}
          </div>
          <h2 className="text-3xl font-serif text-center font-bold tracking-wide">
            {current.title}
          </h2>
          <div className="w-16 h-1 bg-blue-500 rounded-full" />
        </div>

        {/* Narrative Panel */}
        <div className="flex flex-col justify-between h-full space-y-8">
          <div className="space-y-6">
            <p className="text-xl leading-relaxed text-slate-200 font-light">
              "{current.text}"
            </p>
            <div className="p-4 bg-slate-950/80 rounded border-l-4 border-blue-600 italic text-sm text-slate-400">
              {current.subtext}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-8">
            <button 
              onClick={prevPage}
              disabled={currentPage === 0}
              className={`p-3 rounded-full transition-all ${currentPage === 0 ? 'text-slate-700' : 'text-blue-400 hover:bg-slate-800 hover:scale-110'}`}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            
            <div className="flex flex-col items-center">
              <span className="text-xs font-mono text-slate-500 mb-2">PAGE {currentPage + 1} OF {storyContent.length}</span>
              <div className="flex gap-1">
                {storyContent.map((_, idx) => (
                  <div 
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentPage ? 'w-8 bg-blue-500' : 'w-2 bg-slate-700'}`}
                  />
                ))}
              </div>
            </div>

            <button 
              onClick={nextPage}
              disabled={currentPage === storyContent.length - 1}
              className={`p-3 rounded-full transition-all ${currentPage === storyContent.length - 1 ? 'text-slate-700' : 'text-blue-400 hover:bg-slate-800 hover:scale-110'}`}
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="mt-8 flex gap-4">
        <button 
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className={`px-6 py-2 rounded-full font-bold text-sm tracking-widest uppercase transition-all border ${isAutoPlaying ? 'bg-blue-600 border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'bg-transparent border-slate-700 hover:border-blue-500'}`}
        >
          {isAutoPlaying ? "Stop Sequence" : "Auto-Play Narrative"}
        </button>
      </div>

      {/* Footer Meta */}
      <footer className="mt-12 text-slate-600 text-[10px] tracking-widest uppercase text-center space-y-2">
        <p>Synapse LSL Forge Protocol • Protected Artifact</p>
        <p>© 2026 The Basement Spartan / Oracle Archive</p>
      </footer>
    </div>
  );
};

export default App;