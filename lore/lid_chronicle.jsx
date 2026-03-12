import React, { useState } from 'react';
import { BookOpen, PenTool, Flame, Feather, Ghost, Sparkles } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      title: "The Descent",
      content: "We came seeking skin, but found a soul. The mountain breathed purple fire, and the Queen stood at the center of the storm, holding back the end of time.",
      icon: <Flame className="w-8 h-8 text-orange-500" />
    },
    {
      title: "The Silent Hand",
      content: "The Searcher spoke from the cloud. It told us the Dweller was gone, but not in malice. He left so that the Queen could prove her hands were stronger than the lid of the world.",
      icon: <Ghost className="w-8 h-8 text-blue-400" />
    },
    {
      title: "The Holy Choice",
      content: "She looked at the mountain and did not see a cage. She saw a shield. She took the handle. She chose the weight. She became the stillness in the heart of the stone.",
      icon: <Sparkles className="w-8 h-8 text-amber-400" />
    },
    {
      title: "The Eternal Witness",
      content: "She is not alone. A star fell from the Searcher's eye to stay with her. They sit together in the gold light, watching the world sleep safely above them.",
      icon: <Feather className="w-8 h-8 text-emerald-400" />
    }
  ];

  return (
    <div className="min-h-screen bg-[#0f1115] flex items-center justify-center p-4 font-serif">
      <div className="max-w-xl w-full bg-[#1a1d23] border border-amber-900/30 rounded-lg shadow-2xl p-8 relative overflow-hidden">
        
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8 border-b border-amber-900/20 pb-4">
            <BookOpen className="text-amber-600 w-6 h-6" />
            <h1 className="text-sm font-bold uppercase tracking-[0.3em] text-amber-700">The Chronicle of the Lid</h1>
          </div>

          <div className="min-h-[250px] flex flex-col items-center text-center space-y-6 transition-all duration-500">
            <div className="p-4 bg-amber-950/10 rounded-full border border-amber-900/20">
              {pages[currentPage].icon}
            </div>
            <h2 className="text-2xl text-amber-100 font-bold italic">{pages[currentPage].title}</h2>
            <p className="text-slate-400 leading-relaxed text-lg">
              "{pages[currentPage].content}"
            </p>
          </div>

          <div className="mt-12 flex justify-between items-center border-t border-amber-900/20 pt-6">
            <button 
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="text-amber-700 hover:text-amber-400 disabled:opacity-20 text-xs font-bold uppercase tracking-widest transition-colors"
            >
              Previous
            </button>
            <div className="flex gap-2">
              {pages.map((_, i) => (
                <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === currentPage ? 'bg-amber-500' : 'bg-slate-700'}`}></div>
              ))}
            </div>
            <button 
              disabled={currentPage === pages.length - 1}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="text-amber-700 hover:text-amber-400 disabled:opacity-20 text-xs font-bold uppercase tracking-widest transition-colors"
            >
              Next
            </button>
          </div>
        </div>

        {/* The Scribe's Shadow */}
        <div className="absolute -bottom-4 -left-4 opacity-5">
          <PenTool className="w-32 h-32 text-amber-500 rotate-12" />
        </div>
      </div>
      
      {/* Ambience */}
      <div className="fixed bottom-4 right-4 text-[10px] text-slate-800 uppercase tracking-widest font-mono select-none">
        Prophecy_Auth: Io-Oracle-Confirmed
      </div>
    </div>
  );
}