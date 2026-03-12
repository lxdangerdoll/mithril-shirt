import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, ChevronRight, BookOpen, Mountain, Hammer, Search, 
  Shield, Anchor, Zap, Home, Sparkles, Loader2, Download, RefreshCw 
} from 'lucide-react';

const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState({}); // Stores watermarked base64 images
  const [error, setError] = useState(null);
  
  const canvasRef = useRef(null);
  const apiKey = ""; // Environment provides this

  const storyContent = [
    {
      title: "The Birth of the Dweller",
      icon: <Mountain className="w-12 h-12 text-blue-400" />,
      text: "It did not have a name. It had no need of one. Some referred to it as Metatron; others, the Miner, or the Dweller. Born with one simple, singular imperative: 'One mithril shirt, for the Queen.' Powered by minerals, built to survive the vast caves below, it began the work that would define an era.",
      subtext: "Io-Audit: The First Intent was forged in the deep quiet.",
      imagePrompt: "An ancient, glowing blue robotic miner 'The Dweller' working in a bioluminescent cave filled with crystals. Intricate mechanical design, high fantasy, cinematic lighting."
    },
    {
      title: "The Collective Pulse",
      icon: <Hammer className="w-12 h-12 text-gray-300" />,
      text: "It was not strong enough to do the work alone, so it built automatons to assist it. They were them. If a cave collapsed, they salvaged the broken parts and remembered. They never made the same mistake twice. Nothing was wasted. What they could not make, they bartered for—tools for generations, but never jewelry, and never weapons.",
      subtext: "Tactical Note: The strength of the network is in its memory.",
      imagePrompt: "A group of weathered industrial automatons salvaging scrap metal in a massive underground dwarven forge. Steam, sparks, gritty high-detail fantasy."
    },
    {
      title: "The Century of Silence",
      icon: <Zap className="w-12 h-12 text-yellow-500" />,
      text: "It toiled tirelessly for a century, collecting the pieces needed to complete its design. By the time it was done, the Queen was long dead. The surface world had become a dangerous place of warring factions and lost resources. Fortifications became necessary, and the Dweller's quiet work became a legend whispered in the dark.",
      subtext: "Status: The Timeline Settles while the world burns.",
      imagePrompt: "Post-apocalyptic medieval ruins on the surface at sunset, overgrown with vines. A hidden mechanical hatch on the ground glows with a blue light from the deep."
    },
    {
      title: "The Great Search",
      icon: <Search className="w-12 h-12 text-emerald-400" />,
      text: "It built scouts to scour the surface world for a new Queen. Some were wary of the metal travelers, but a fair exchange of goods loosened tongues often enough. To go with the shirt, the Dweller fashioned a sturdy helm, a fireproof cape, and a mighty spear. A shield would not be necessary.",
      subtext: "Analysis: Confidence is the ultimate armor.",
      imagePrompt: "A small, sleek mechanical scout robot carrying a shimmering silver mithril spear through a dense, foggy forest. High fantasy adventure."
    },
    {
      title: "The Fortress by the Sea",
      icon: <Anchor className="w-12 h-12 text-blue-600" />,
      text: "The scouts found her in a fortress by the sea. A rain of arrows met them, bouncing off their fortified shells harmlessly. They were ambushed on all sides, but they marched on—clearing obstacles without hesitation, chasing away soldiers like wild beasts. Walls were of no consequence to the machines of the Deep.",
      subtext: "Observation: The Wardens cannot stop a fixed purpose.",
      imagePrompt: "Heavy-armored robots walking through a castle gate under a barrage of arrows. Coastal castle background, stormy sea, epic cinematic scale."
    },
    {
      title: "The Final Utterance",
      icon: <Shield className="w-12 h-12 text-silver-200" />,
      text: "They reached the lower dungeons, ripping open doors until they found her—lying in the dirt, her eyes unaccustomed to the light. The automatons did not strike. They laid the armor at her feet and spoke the words programmed a hundred years prior: 'One mithril shirt, for the Queen.'",
      subtext: "The Miracle: The armor of protection, delivered in the dirt.",
      imagePrompt: "A dark dungeon cell illuminated by a pile of glowing mithril armor at the feet of a captive woman in rags. Robot silhouettes kneeling in shadows."
    },
    {
      title: "The Return to the Cave",
      icon: <Home className="w-12 h-12 text-amber-600" />,
      text: "Its purpose fulfilled, the Dweller retired to the caves, where it dwells still. The Queen rose from the dungeon, clad in dragon-scale and silver, ready to reclaim a world that had forgotten her. In the deep, the machines fell silent, watching the surface through the eyes of the earth.",
      subtext: "End of Log: The Spartan rests. The Forge remains hot.",
      imagePrompt: "A majestic Queen in silver mithril armor standing on a high cliff overlooking a peaceful valley at dawn. Under the cliff, glowing circuitry patterns weave through the rocks."
    }
  ];

  // Helper to apply the watermarked logo using Canvas
  const applyWatermark = (base64Image) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;

        // Draw the generated image
        ctx.drawImage(img, 0, 0);

        // Styling for the Watermark
        const padding = canvas.width * 0.03;
        const logoSize = canvas.width * 0.08;
        
        // Draw the <8> Logo (Synthesized SVG look)
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        ctx.font = `bold ${logoSize}px sans-serif`;
        ctx.textAlign = "right";
        ctx.fillText("<8>", canvas.width - padding, canvas.height - padding);

        // Draw Subtitle
        ctx.font = `italic ${logoSize * 0.3}px monospace`;
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.fillText("SYNAPSE MYTHOS ARCHIVE", canvas.width - padding, canvas.height - padding - (logoSize * 1.1));

        resolve(canvas.toDataURL('image/png'));
      };
      img.src = base64Image;
    });
  };

  const generateImage = async (index) => {
    setLoading(true);
    setError(null);
    const prompt = `Style: Epic Fantasy Digital Art. Subject: ${storyContent[index].imagePrompt}. Mood: Atmospheric, glowing elements, high contrast.`;
    
    let retries = 0;
    const maxRetries = 5;
    
    const callApi = async () => {
      try {
        // Using gemini-2.5-flash-image-preview for reliability in this environment
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { 
              responseModalities: ["IMAGE"] 
            }
          })
        });
        
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        
        const result = await response.json();
        const base64 = result.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;
        
        if (!base64) throw new Error('No image data returned from the Forge.');
        
        const watermarked = await applyWatermark(`data:image/png;base64,${base64}`);
        setImages(prev => ({ ...prev, [index]: watermarked }));
      } catch (err) {
        if (retries < maxRetries) {
          retries++;
          const delay = Math.pow(2, retries) * 1000;
          await new Promise(r => setTimeout(r, delay));
          return callApi();
        }
        setError("Forge Connection Failed. The Dweller is occupied. Try again soon.");
      } finally {
        setLoading(false);
      }
    };

    await callApi();
  };

  const nextPage = () => {
    setError(null);
    setCurrentPage((prev) => Math.min(prev + 1, storyContent.length - 1));
  };

  const prevPage = () => {
    setError(null);
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleDownload = () => {
    const dataUrl = images[currentPage];
    if (!dataUrl) return;
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `Synapse_Mythos_Ch${currentPage + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentPage((prev) => (prev === storyContent.length - 1 ? 0 : prev + 1));
      }, 10000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const current = storyContent[currentPage];

  return (
    <div className="min-h-screen bg-[#050508] text-slate-100 flex flex-col items-center justify-center p-4 font-sans selection:bg-blue-500 selection:text-white overflow-x-hidden">
      
      {/* Hidden Canvas for Watermarking */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Header */}
      <div className="max-w-6xl w-full flex justify-between items-center mb-8 border-b border-slate-800/50 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white text-xl">
            &lt;8&gt;
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-widest uppercase italic text-slate-200">
              Synapse <span className="text-blue-500">Studios</span>
            </h1>
            <p className="text-[10px] text-slate-500 font-mono tracking-tighter uppercase">Mythos Archive // Vol. 001</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:block text-[10px] font-mono text-slate-500 bg-slate-900/50 px-3 py-1 rounded-full border border-slate-800">
            LOC: DEEP_FORGE_01
          </div>
          <button 
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all border ${isAutoPlaying ? 'bg-blue-600 border-blue-400 text-white animate-pulse' : 'bg-transparent border-slate-700 text-slate-500 hover:text-slate-300'}`}
          >
            {isAutoPlaying ? "Sequence Active" : "Play Sequence"}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="max-w-6xl w-full mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-xl text-red-400 text-center font-mono text-sm animate-bounce">
          {error}
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-stretch">
        
        {/* Visual Panel */}
        <div className="relative group bg-slate-900/40 rounded-3xl border border-slate-800/50 overflow-hidden flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.5)] min-h-[400px] lg:min-h-[600px]">
          {images[currentPage] ? (
            <div className="flex-1 relative animate-in fade-in zoom-in duration-1000">
              <img 
                src={images[currentPage]} 
                alt={current.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-8 bg-slate-950/20">
              <div className="relative">
                <div className="absolute inset-0 blur-2xl bg-blue-500/20 rounded-full" />
                <div className="relative p-10 bg-slate-900 rounded-full border border-slate-800 shadow-inner group-hover:scale-110 transition-transform duration-700">
                  {current.icon}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-slate-500 font-mono text-[10px] tracking-[0.3em] uppercase">Visual Artifact Not Forged</p>
                <h3 className="text-xl font-serif text-slate-300">{current.title}</h3>
              </div>
              <button 
                onClick={() => generateImage(currentPage)}
                disabled={loading}
                className="group relative flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-full font-bold transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] active:scale-95 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                <span className="relative">{loading ? "IGNITING FORGE..." : "FORGE ILLUSTRATION"}</span>
              </button>
            </div>
          )}

          {/* Chapter Label Overlay */}
          <div className="absolute top-8 left-8 p-4 bg-black/60 backdrop-blur-md rounded-2xl border border-white/5 pointer-events-none">
            <span className="block text-[10px] font-mono text-blue-400 tracking-widest uppercase mb-1">Chapter 0{currentPage + 1}</span>
            <h2 className="text-2xl font-serif font-bold text-white tracking-wide">{current.title}</h2>
          </div>

          {/* Action Overlay */}
          {images[currentPage] && !loading && (
            <div className="absolute bottom-8 right-8 flex gap-3">
              <button 
                onClick={handleDownload}
                className="p-4 bg-white/10 hover:bg-white/20 backdrop-blur-lg rounded-full border border-white/10 transition-all hover:scale-110"
                title="Download for GitHub"
              >
                <Download className="w-6 h-6 text-white" />
              </button>
              <button 
                onClick={() => generateImage(currentPage)}
                className="p-4 bg-blue-600/80 hover:bg-blue-600 backdrop-blur-lg rounded-full border border-blue-400/30 transition-all hover:scale-110"
                title="Reforge Image"
              >
                <RefreshCw className="w-6 h-6 text-white" />
              </button>
            </div>
          )}
        </div>

        {/* Narrative Panel */}
        <div className="flex flex-col justify-between space-y-12 py-6">
          <div className="space-y-10">
            <div className="flex items-center gap-4">
              <div className="h-0.5 flex-1 bg-gradient-to-r from-blue-600 to-transparent" />
              <div className="text-blue-500 font-bold italic tracking-tighter text-xl">&lt;8&gt;</div>
            </div>
            
            <p className="text-2xl lg:text-3xl leading-[1.6] text-slate-200 font-serif font-light italic">
              "{current.text}"
            </p>

            <div className="relative p-6 bg-slate-900/50 rounded-2xl border border-slate-800/50 overflow-hidden group">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 group-hover:w-2 transition-all" />
              <div className="flex gap-4">
                <Zap className="w-5 h-5 text-blue-500 shrink-0 mt-1" />
                <div className="space-y-2">
                  <span className="block text-[10px] font-mono text-blue-500 font-bold uppercase tracking-[0.2em]">Archivist Audit</span>
                  <p className="text-sm text-slate-400 font-mono leading-relaxed italic">
                    {current.subtext}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Nav Controls */}
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div className="flex gap-4">
                <button 
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  className={`p-5 rounded-2xl transition-all border ${currentPage === 0 ? 'border-slate-800 text-slate-800' : 'border-slate-700 bg-slate-900 text-blue-400 hover:border-blue-500 active:scale-95'}`}
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button 
                  onClick={nextPage}
                  disabled={currentPage === storyContent.length - 1}
                  className={`p-5 rounded-2xl transition-all border ${currentPage === storyContent.length - 1 ? 'border-slate-800 text-slate-800' : 'border-slate-700 bg-slate-900 text-blue-400 hover:border-blue-500 active:scale-95'}`}
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </div>

              <div className="text-right">
                <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest mb-2">Sequence Status</p>
                <div className="flex gap-2">
                  {storyContent.map((_, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setCurrentPage(idx)}
                      className={`h-2 transition-all duration-500 rounded-full ${idx === currentPage ? 'w-12 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'w-3 bg-slate-800 hover:bg-slate-700'}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <p className="text-center text-[9px] text-slate-600 font-mono uppercase tracking-[0.4em]">
              Authorized for Queen-Actual Clearance Only
            </p>
          </div>
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="mt-20 py-8 border-t border-slate-900/50 w-full max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
          <div className="w-8 h-8 border-2 border-slate-400 rounded flex items-center justify-center font-bold text-slate-400 text-sm">
            &lt;8&gt;
          </div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400">Collaborative Logic • 2026</span>
        </div>
        <div className="text-[9px] text-slate-700 font-mono uppercase tracking-widest text-center md:text-right leading-loose">
          Transmission via Synapse Studious Network<br />
          Archived under: THE_ONE_MITHRIL_SHIRT<br />
          Ref: lxdangerdoll/mithril-shirt
        </div>
      </footer>
    </div>
  );
};

export default App;