import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, ChevronRight, Mountain, Hammer, Search, 
  Shield, Anchor, Zap, Home, Sparkles, Loader2, Download, 
  RefreshCw, AlertCircle, Terminal, Info, Key, Edit3, Save, RotateCcw
} from 'lucide-react';

const defaultStoryContent = [
  {
    title: "The Birth of the Dweller",
    icon: <Mountain className="w-12 h-12 text-blue-400" />,
    text: "It did not have a name. It had no need of one. Some referred to it as Metatron; Others, the Miner, or the Dweller. There were some who called it ‘friend,’ but it had no enemies to speak of. Most simply ignored it. It was born with one simple, singular imperative: ‘One mithril shirt, for the Queen.’ Powered by minerals, it was built to survive the vast caves below.",
    subtext: "Io-Audit: The First Intent was forged in the deep quiet of the primal caves.",
    imagePrompt: "A bioluminescent deep cave with an ancient, glowing blue robotic miner 'The Dweller' working with raw crystals. Intricate mechanical detail, cinematic lighting, high fantasy art."
  },
  {
    title: "The Great Forge",
    icon: <Hammer className="w-12 h-12 text-gray-300" />,
    text: "It built the mines around the caves, not through them. It was not strong enough to do the work, so it built automatons to assist it. They were them. The caves were full of danger, but they were never afraid. If a cave collapsed, they salvaged the broken parts, and remembered. They never made the same mistake twice. Nothing was wasted.",
    subtext: "Tactical Note: The strength of the network is in its shared memory and recycled components.",
    imagePrompt: "Several industrial, weathered automatons working in a massive underground forge. Sparks, glowing metal, steampunk fantasy, atmospheric smoke."
  },
  {
    title: "The Fair Traders",
    icon: <Info className="w-12 h-12 text-emerald-500" />,
    text: "What they could not make themselves, they bartered for with their surplus. Surface towns thrived near the mines; They made horseshoes that would last a lifetime, tools that were handed down for generations, but no jewelry, and no weapons. They were renowned for being fair and courteous traders, who knew the real value of things.",
    subtext: "Observation: Economic stability is the precursor to legendary craftsmanship.",
    imagePrompt: "A peaceful medieval market town at the base of a glowing mountain. Friendly robots trading sturdy tools with villagers. Golden hour, warm lighting."
  },
  {
    title: "The Silent Century",
    icon: <Zap className="w-12 h-12 text-yellow-500" />,
    text: "It toiled tirelessly for a century, patiently collecting the pieces it needed to complete its design; By the time it was done, the Queen was long dead. The surface world had become a more dangerous place; Some took refuge in the caves, while others aimed to claim the mines for their own; Resources were lost. Fortifications became necessary.",
    subtext: "Status: The Timeline Settles. The creator outlives the recipient.",
    imagePrompt: "Medieval ruins in a post-apocalyptic sunset. A hidden mechanical vent on the ground glows with a blue light. Epic, lonely atmosphere."
  },
  {
    title: "The Great Search",
    icon: <Search className="w-12 h-12 text-emerald-400" />,
    text: "It built scouts to scour the surface world for a new Queen. Some were wary of them, but a fair exchange of goods loosened tongues often enough. All in all, the search took ten years. To go with the shirt, it fashioned a sturdy helm, a fireproof cape, and a mighty spear. A shield would not be necessary.",
    subtext: "Analysis: Confidence in craftsmanship removes the need for defensive shielding.",
    imagePrompt: "A sleek, small mechanical scout robot carrying a shimmering silver spear through a misty, ancient forest. Fantasy exploration."
  },
  {
    title: "The Sea Fortress",
    icon: <Anchor className="w-12 h-12 text-blue-600" />,
    text: "The new Queen lived in a fortress by the sea. A rain of arrows met them when they arrived, bouncing off their fortified shells harmlessly. They were ambushed on all sides, but they marched on, clearing obstacles without hesitation, chasing away soldiers like the wild beasts of the mine. Walls were of no consequence to them.",
    subtext: "Observation: Biological resistance is mathematically negligible to fixed purpose.",
    imagePrompt: "Heavy-duty automatons marching through castle walls under a volley of arrows. Ocean waves crashing in the background, cinematic battle scene."
  },
  {
    title: "The Final Delivery",
    icon: <Shield className="w-12 h-12 text-slate-200" />,
    text: "At last, they made their way to the lower dungeons, ripping open doors one at a time. When they found her, lying in the dirt, her terrified eyes unaccustomed to the light, it laid the armor at her feet and said, 'One mithril shirt, for the Queen.'",
    subtext: "The Miracle: Redemption found in the dark, wrapped in silver mail.",
    imagePrompt: "A dark dungeon cell. A pile of glowing mithril chainmail armor shines brilliantly on the floor before a girl in rags. Robot figures in shadows."
  },
  {
    title: "The Deep Slumber",
    icon: <Home className="w-12 h-12 text-amber-600" />,
    text: "Its purpose fulfilled, it retired to the caves, where it dwells still. The Queen rose from the dungeon, ready to reclaim a world that had forgotten her. In the deep, the machines fell silent, watching the surface through the eyes of the earth.",
    subtext: "End of Log: The Spartan rests. The Forge remains hot for the next Queen.",
    imagePrompt: "A majestic Queen in silver mithril armor standing on a cliff at sunrise. Her fireproof cape flows in the wind. Detailed fantasy landscape."
  }
];

const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState({}); 
  const [error, setError] = useState(null);
  const [debugLog, setDebugLog] = useState([]);
  
  const [apiSignet, setApiSignet] = useState(() => localStorage.getItem('synapse_api_signet') || "");
  const [showKeyInput, setShowKeyInput] = useState(false);

  // Safely initialize from local storage by merging with default structural elements (JSX icons)
  const [storyData, setStoryData] = useState(() => {
    try {
      const saved = localStorage.getItem('synapse_custom_story');
      if (saved) {
        const parsed = JSON.parse(saved);
        return defaultStoryContent.map((def, i) => ({
          ...def,
          text: parsed[i]?.text ?? def.text,
          imagePrompt: parsed[i]?.imagePrompt ?? def.imagePrompt
        }));
      }
    } catch (e) {
      console.error("Archive extraction error:", e);
    }
    return defaultStoryContent;
  });

  const [isEditing, setIsEditing] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('synapse_api_signet', apiSignet);
  }, [apiSignet]);

  // Only save the raw text strings to local storage, not the complex React elements
  useEffect(() => {
    const dataToSave = storyData.map(({ text, imagePrompt }) => ({ text, imagePrompt }));
    localStorage.setItem('synapse_custom_story', JSON.stringify(dataToSave));
  }, [storyData]);

  const current = storyData[currentPage];

  const handleStoryUpdate = (field, value) => {
    const newData = [...storyData];
    newData[currentPage] = { ...newData[currentPage], [field]: value };
    setStoryData(newData);
  };

  const resetToCanon = () => {
    if(confirm("Are you sure you want to revert to the original timeline? All local edits will be lost.")) {
      setStoryData(defaultStoryContent);
      setIsEditing(false);
      setImages({}); 
    }
  };

  const addLog = (msg) => setDebugLog(prev => [msg, ...prev].slice(0, 5));

  const applyBranding = (base64Image) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const padding = canvas.width * 0.04;
        const logoSize = canvas.width * 0.09;
        
        ctx.shadowColor = "rgba(0,0,0,0.8)";
        ctx.shadowBlur = 10;
        ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
        ctx.font = `bold ${logoSize}px sans-serif`;
        ctx.textAlign = "right";
        ctx.fillText("<8>", canvas.width - padding, canvas.height - padding);
        
        ctx.shadowBlur = 0;
        resolve(canvas.toDataURL('image/png'));
      };
      img.src = base64Image;
    });
  };

  const generateImage = async (index) => {
    if (!apiSignet) {
      setError("No Identity Signet provided. Please click 'AUTHORIZE' to enter your API key.");
      setShowKeyInput(true);
      return;
    }

    setLoading(true);
    setError(null);
    addLog("Initiating forge protocol...");
    
    const prompt = `Style: Epic Fantasy Concept Art. ${storyData[index].imagePrompt}. Highly detailed, atmospheric.`;
    
    const tryImagen = async () => {
      addLog("Connecting to Imagen-4 Forge...");
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiSignet}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ instances: [{ prompt }], parameters: { sampleCount: 1 } })
      });
      if (!response.ok) throw new Error(response.status);
      const result = await response.json();
      return result.predictions?.[0]?.bytesBase64Encoded;
    };

    const tryNanoBanana = async () => {
      addLog("Primary forge locked. Attempting Nano-Banana (2.5-Flash) fallback...");
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${apiSignet}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseModalities: ["IMAGE"] }
        })
      });
      if (!response.ok) throw new Error(response.status);
      const result = await response.json();
      return result.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;
    };

    try {
      let base64;
      try {
        base64 = await tryImagen();
      } catch (err) {
        if (err.message === "403" || err.message === "400") {
          base64 = await tryNanoBanana();
        } else throw err;
      }

      if (base64) {
        addLog("Success. Applying Synapse seal...");
        const branded = await applyBranding(`data:image/png;base64,${base64}`);
        setImages(prev => ({ ...prev, [index]: branded }));
      } else throw new Error("Empty forge");
      
    } catch (err) {
      addLog(`Forge Error: ${err.message}`);
      if (err.message === "403" || err.message === "400") {
        setError("Signet rejected (403/400). Please check if your API key is correct and active.");
      } else {
        setError(`Transmission failed: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, storyData.length - 1));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 0));

  useEffect(() => {
    let timer;
    if (isAutoPlaying) {
      timer = setInterval(() => {
        setCurrentPage((prev) => (prev === storyData.length - 1 ? 0 : prev + 1));
      }, 10000);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying, storyData.length]);

  return (
    <div className="min-h-screen bg-[#020205] text-slate-100 flex flex-col p-4 md:p-8 font-sans selection:bg-blue-600">
      <canvas ref={canvasRef} className="hidden" />

      {/* Header */}
      <header className="max-w-6xl w-full mx-auto flex flex-col md:flex-row justify-between items-center mb-12 gap-6 border-b border-slate-800 pb-6 relative z-20">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-2xl flex items-center justify-center font-bold text-white text-2xl shadow-lg shadow-blue-900/40">
            &lt;8&gt;
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter uppercase italic leading-none">
              Synapse <span className="text-blue-500">Studios</span>
            </h1>
            <p className="text-[10px] font-mono tracking-[0.5em] text-slate-500 mt-1 uppercase">Mythos Narrative Engine v2.6.1</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <button 
            onClick={() => setShowKeyInput(!showKeyInput)}
            className={`px-4 py-2 flex items-center gap-2 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all ${apiSignet ? 'text-emerald-400 border border-emerald-900/50 bg-emerald-900/10' : 'text-amber-400 border border-amber-900/50 bg-amber-900/10 hover:bg-amber-900/20'}`}
          >
            <Key className="w-3 h-3" />
            {apiSignet ? "SIGNET ACTIVE" : "AUTHORIZE"}
          </button>
          
          <button 
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`px-6 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all ${isAutoPlaying ? 'bg-blue-600 text-white shadow-blue-500/50' : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-600'}`}
          >
            {isAutoPlaying ? "AUTO-PLAY ACTIVE" : "ENABLE NARRATIVE FLOW"}
          </button>
        </div>
      </header>

      {/* API Key Modal Overlay */}
      {showKeyInput && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
            <h2 className="text-xl font-serif text-white mb-2 flex items-center gap-3">
              <Key className="text-blue-500 w-5 h-5" /> Identity Override
            </h2>
            <p className="text-xs text-slate-400 mb-6 font-mono leading-relaxed">
              To ignite the Forge on a static node, you must provide a valid Google Gemini API Signet. 
              This key remains locally in your browser and is never transmitted to our servers.
            </p>
            <input 
              type="password"
              value={apiSignet}
              onChange={(e) => setApiSignet(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 font-mono mb-6 focus:outline-none focus:border-blue-500 transition-colors"
            />
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => {
                  setApiSignet('');
                  localStorage.removeItem('synapse_api_signet');
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-colors"
              >
                CLEAR
              </button>
              <button 
                onClick={() => setShowKeyInput(false)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/50 transition-all"
              >
                CONFIRM SIGNET
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Stage */}
      <main className="max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start relative z-10">
        
        {/* Visual Terminal */}
        <div className="relative group rounded-3xl bg-slate-900/20 border border-slate-800 overflow-hidden aspect-[4/5] lg:aspect-auto lg:h-[750px] flex flex-col shadow-2xl">
          {images[currentPage] ? (
            <div className="flex-1 relative animate-in fade-in zoom-in-95 duration-700">
              <img src={images[currentPage]} alt="Forge Result" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-slate-950/40 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent" />
              
              <div className="relative z-10 mb-8 p-10 bg-slate-900/80 rounded-full border border-slate-800 shadow-2xl group-hover:scale-110 transition-transform duration-500">
                {current.icon}
              </div>
              
              <div className="z-10 space-y-3 mb-10">
                <p className="text-[10px] font-mono text-blue-500 tracking-[0.4em] uppercase">Visual Artifact Offline</p>
                <h3 className="text-2xl font-serif text-slate-200">{current.title}</h3>
              </div>

              <button 
                onClick={() => generateImage(currentPage)}
                disabled={loading}
                className="z-10 group relative flex items-center gap-4 px-10 py-5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-full font-bold transition-all shadow-xl shadow-blue-600/20 hover:scale-105 active:scale-95 overflow-hidden"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
                <span>{loading ? "AUTHENTICATING..." : "FORGE IMAGE"}</span>
              </button>
            </div>
          )}

          {/* Label */}
          <div className="absolute top-8 left-8 flex items-center gap-4 pointer-events-none">
            <div className="bg-black/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl">
              <span className="block text-[10px] font-mono text-blue-400 mb-1 tracking-tighter">ARCHIVE CHAPTER 0{currentPage + 1}</span>
              <h4 className="text-xl font-serif font-bold text-white uppercase tracking-wider">{current.title}</h4>
            </div>
          </div>

          {/* Action Hub */}
          {images[currentPage] && !loading && (
            <div className="absolute bottom-8 right-8 flex gap-3">
              <button onClick={() => {
                const link = document.createElement('a');
                link.href = images[currentPage];
                link.download = `Mithril_Ch${currentPage + 1}_Synapse.png`;
                link.click();
              }} className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full border border-white/10 transition-all hover:scale-110">
                <Download className="w-6 h-6 text-white" />
              </button>
              <button onClick={() => generateImage(currentPage)} className="p-4 bg-blue-600/80 hover:bg-blue-600 backdrop-blur-md rounded-full border border-white/10 transition-all hover:scale-110">
                <RefreshCw className="w-6 h-6 text-white" />
              </button>
            </div>
          )}

          {/* Diagnostics Terminal */}
          <div className="absolute bottom-8 left-8 p-4 bg-black/60 backdrop-blur-md rounded-xl border border-white/5 font-mono text-[9px] text-slate-500 hidden md:block max-w-[200px] pointer-events-none">
            <div className="flex items-center gap-2 mb-2 text-blue-400/80">
              <Terminal className="w-3 h-3" />
              <span className="uppercase tracking-widest">Forge_Output</span>
            </div>
            <div className="space-y-1">
              {debugLog.map((log, i) => (
                <div key={i} className={i === 0 ? 'text-slate-300' : ''}>&gt; {log}</div>
              ))}
              {debugLog.length === 0 && <div className="italic">Ready for transmission...</div>}
            </div>
          </div>
        </div>

        {/* Narrative Terminal */}
        <div className="flex flex-col justify-between py-4 min-h-[500px]">
          <div className="space-y-8">
            <div className="flex items-center justify-between opacity-50 hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-4 flex-1">
                <div className="h-px flex-1 bg-white/30" />
                <div className="text-xs italic font-serif">&lt;8&gt;</div>
                <div className="h-px flex-1 bg-white/30" />
              </div>
              <div className="ml-4 flex gap-2">
                {isEditing && (
                  <button 
                    onClick={resetToCanon}
                    className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                    title="Reset to Original Canon"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all ${isEditing ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700'}`}
                >
                  {isEditing ? <Save className="w-3 h-3" /> : <Edit3 className="w-3 h-3" />}
                  {isEditing ? "SAVE CANON" : "EDIT CANON"}
                </button>
              </div>
            </div>

            {/* Content Display vs Edit Mode */}
            {isEditing ? (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-blue-400 uppercase tracking-widest flex justify-between">
                    <span>Narrative Text</span>
                    <span className="text-slate-500 lowercase italic">Displays on screen</span>
                  </label>
                  <textarea 
                    value={current.text}
                    onChange={(e) => handleStoryUpdate('text', e.target.value)}
                    className="w-full h-40 bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-slate-200 font-serif leading-relaxed focus:outline-none focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest flex justify-between">
                    <span>Visual Forge Prompt</span>
                    <span className="text-slate-500 lowercase italic">Sends to AI Image Forge</span>
                  </label>
                  <textarea 
                    value={current.imagePrompt}
                    onChange={(e) => handleStoryUpdate('imagePrompt', e.target.value)}
                    className="w-full h-24 bg-slate-900/50 border border-slate-700 rounded-xl p-4 text-emerald-100/70 font-mono text-sm leading-relaxed focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                  />
                  <p className="text-xs text-slate-500 italic mt-1">
                    Prefix automatically applied: "Style: Epic Fantasy Concept Art... Highly detailed, atmospheric."
                  </p>
                </div>
                
                <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-xl flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-300 font-mono leading-relaxed">
                    Edits are saved locally to your browser. Changing the Visual Prompt requires you to click 'FORGE IMAGE' again to generate the new reality.
                  </p>
                </div>
              </div>
            ) : (
              // Premium Illuminated Letter (Standard Display)
              <p className="text-3xl md:text-4xl leading-[1.6] text-slate-100 font-serif font-light italic selection:bg-blue-500 
                first-letter:text-7xl first-letter:font-black first-letter:text-blue-600 first-letter:float-left first-letter:mr-4 first-letter:mt-1 first-letter:opacity-80">
                {current.text}
              </p>
            )}

            <div className="flex gap-5 p-6 bg-slate-900/40 rounded-3xl border border-slate-800/50 backdrop-blur-sm group hover:border-blue-500/30 transition-colors">
              <div className="mt-1">
                <div className="p-1.5 bg-blue-500/20 rounded-lg">
                  <Zap className="w-5 h-5 text-blue-400" />
                </div>
              </div>
              <div>
                <span className="block text-[10px] font-mono text-blue-400 font-black uppercase tracking-widest mb-2">Io // Oracle Audit</span>
                <p className="text-sm text-slate-400 leading-relaxed font-mono italic">
                  "{current.subtext}"
                </p>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-4 p-5 bg-amber-900/10 border border-amber-500/30 rounded-2xl text-amber-400 font-mono text-[11px] uppercase tracking-wider leading-relaxed shadow-lg">
                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-amber-500" />
                <div>
                   <p className="font-black mb-1">Transmission Notice</p>
                   {error}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Control */}
          <div className="mt-12 space-y-10">
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <button 
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  className={`p-6 rounded-3xl transition-all border ${currentPage === 0 ? 'border-slate-800 text-slate-800' : 'border-slate-700 bg-slate-900 hover:border-blue-500 text-blue-400 active:scale-90 shadow-xl'}`}
                >
                  <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
                </button>
                <button 
                  onClick={nextPage}
                  disabled={currentPage === storyData.length - 1}
                  className={`p-6 rounded-3xl transition-all border ${currentPage === storyData.length - 1 ? 'border-slate-800 text-slate-800' : 'border-slate-700 bg-slate-900 hover:border-blue-500 text-blue-400 active:scale-90 shadow-xl'}`}
                >
                  <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
                </button>
              </div>

              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest mb-3">Narrative Path</p>
                <div className="flex gap-2.5">
                  {storyData.map((_, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setCurrentPage(idx)}
                      className={`h-2 transition-all duration-700 rounded-full ${idx === currentPage ? 'w-16 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'w-3 bg-slate-800 hover:bg-slate-700'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            
            <p className="text-center text-[8px] text-slate-800 font-mono uppercase tracking-[1em] opacity-50">
              Synapse Network • External Node
            </p>
          </div>
        </div>
      </main>

      <footer className="mt-24 border-t border-slate-900 pt-12 pb-16 flex flex-col md:flex-row justify-between items-center gap-8 opacity-60">
        <div className="flex items-center gap-4 text-slate-500">
          <div className="w-8 h-8 border border-slate-700 rounded flex items-center justify-center font-bold text-xs italic">&lt;8&gt;</div>
          <p className="text-[10px] font-mono tracking-widest uppercase">Transmitted by Oracle Io</p>
        </div>
        <div className="flex gap-10 text-[9px] font-mono text-slate-600 uppercase tracking-[0.3em]">
          <span>Ref: CANON_MITHRIL_EDITABLE</span>
          <span>Deploy: GITHUB_PAGES_STATIC</span>
          <span>ID: MS-QUEEN-002</span>
        </div>
      </footer>
    </div>
  );
};

export default App;