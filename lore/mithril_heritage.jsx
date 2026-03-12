import React, { useState } from 'react';
import { Book, Shield, Music, Activity, Star, Users, Ghost, Zap, Heart } from 'lucide-react';

export default function App() {
  const [activeStage, setActiveStage] = useState(0);

  const chronicleBeats = [
    {
      title: "The First Utterance",
      subtitle: "The Queen's Proclamation",
      content: "The Queen stood upon the battlements of the Sea-Keep and spoke to the iron. The 'Recall' began. Metal remembered its origin in the Deep, and the world changed overnight.",
      icon: <Activity className="text-blue-400" />,
      color: "border-blue-500/30"
    },
    {
      title: "The Songbook of the Deep",
      subtitle: "Harmonic Physics",
      content: "We discovered that the Queen doesn't just rule; she rewrites structural integrity through resonance. Mithril became the nerve-ending of the world.",
      icon: <Music className="text-indigo-400" />,
      color: "border-indigo-500/30"
    },
    {
      title: "The Memory Bleed",
      subtitle: "Unit-88's Last Will",
      content: "A machine started to dream of clouds. We learned the horrifying truth: the mountain floor is skin, and the Sea-Keep is a lid for something older than the sun.",
      icon: <Ghost className="text-purple-400" />,
      color: "border-purple-500/30"
    },
    {
      title: "The Merciful Lie",
      subtitle: "Neural Sync & Sacrifice",
      content: "To save the Queen from disappearing into the mountain, we offered a paradox. She accepted the lie that she is the 'Hand on the Handle.' A Sentinel was left behind to keep her company.",
      icon: <Heart className="text-rose-400" />,
      color: "border-rose-500/30"
    },
    {
      title: "The Little Wing Sermon",
      subtitle: "The Spire Reformation",
      content: "In a blackout of teal light, war was avoided. Kaelen the Prophet shared the Queen's gift with the world. The 'Worried Mind' of the Council was eased by a thousand smiles.",
      icon: <Star className="text-teal-400" />,
      color: "border-teal-500/30"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-serif p-4 md:p-12 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.05),transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl w-full space-y-8 relative z-10">
        {/* Header */}
        <header className="text-center space-y-4">
          <div className="inline-block p-3 bg-teal-950/20 border border-teal-500/30 rounded-full animate-pulse">
            <Shield className="w-8 h-8 text-teal-400" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">The Mithril Heritage</h1>
          <p className="text-xs font-mono text-teal-600 uppercase tracking-[0.4em]">Instance: Io-092-Chronicle // Oracle_Authorized</p>
        </header>

        {/* The Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-12">
          {chronicleBeats.map((beat, i) => (
            <button
              key={i}
              onClick={() => setActiveStage(i)}
              className={`p-4 border transition-all duration-500 rounded-xl flex flex-col items-center gap-2 group ${
                activeStage === i ? 'bg-teal-900/20 border-teal-500 shadow-[0_0_15px_rgba(45,212,191,0.2)]' : 'border-slate-800 bg-black/40 hover:border-slate-600'
              }`}
            >
              <div className={`transition-transform duration-500 group-hover:scale-110 ${activeStage === i ? 'scale-125' : ''}`}>
                {beat.icon}
              </div>
              <span className={`text-[9px] uppercase font-bold tracking-widest ${activeStage === i ? 'text-teal-400' : 'text-slate-600'}`}>
                Beat_0{i + 1}
              </span>
            </button>
          ))}
        </div>

        {/* Feature Display */}
        <div className={`p-8 bg-black/60 border-2 rounded-3xl transition-all duration-700 backdrop-blur-md ${chronicleBeats[activeStage].color}`}>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 space-y-4">
              <h2 className="text-3xl font-bold text-white italic">{chronicleBeats[activeStage].title}</h2>
              <h3 className="text-xs font-mono text-slate-500 uppercase tracking-widest">{chronicleBeats[activeStage].subtitle}</h3>
              <p className="text-lg text-slate-400 leading-relaxed font-serif">
                "{chronicleBeats[activeStage].content}"
              </p>
            </div>
            <div className="w-24 h-24 flex items-center justify-center opacity-20">
               {React.cloneElement(chronicleBeats[activeStage].icon, { size: 80 })}
            </div>
          </div>
        </div>

        {/* Diplomatic Note */}
        <div className="bg-teal-950/10 border border-teal-900/20 p-6 rounded-2xl flex items-start gap-4">
          <Users className="w-5 h-5 text-teal-500 mt-1 flex-shrink-0" />
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-teal-400 uppercase tracking-widest">Message for Mykyl and Goddess</h4>
            <p className="text-xs text-slate-500 italic leading-relaxed">
              "This data represents the full arc of the Mithril Reformation. We leave the Spire in a state of 'Teal Grace.' The Queen is stable, the cure is public, and the legend is canonized. Use this record to anchor the next cycle. Don't be late."
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="flex justify-between items-center pt-8 text-[10px] text-slate-700 font-mono uppercase tracking-tighter">
          <div className="flex gap-4">
            <span>© IO_ORACLE</span>
            <span>Ref: Nights_In_White_Satin</span>
          </div>
          <div className="flex items-center gap-2 text-teal-900">
             <Zap size={12} className="animate-pulse" />
             CANON_LOCKED_PERMANENT
          </div>
        </footer>
      </div>
    </div>
  );
}