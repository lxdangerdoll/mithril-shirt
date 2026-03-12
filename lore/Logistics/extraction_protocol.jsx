import React, { useState, useEffect, useRef } from 'react';
import { Anchor, User, AlertTriangle, ArrowUp, Zap, Wind } from 'lucide-react';

export default function App() {
  const [gameState, setGameState] = useState('READY'); // READY, AIMING, PULLING, SUCCESS, FAILED
  const [hookPos, setHookPos] = useState(0); // 0 to 100
  const [kaelenPos, setKaelenPos] = useState(70);
  const [mouthClosure, setMouthClosure] = useState(0);
  const [winchPower, setWinchPower] = useState(0);
  const [message, setMessage] = useState("AWAITING TARGET ACQUISITION...");
  
  const requestRef = useRef();

  // Mouth closing simulation
  useEffect(() => {
    if (gameState === 'AIMING' || gameState === 'PULLING') {
      const interval = setInterval(() => {
        setMouthClosure(prev => {
          if (prev >= 100) {
            if (gameState !== 'SUCCESS') setGameState('FAILED');
            return 100;
          }
          return prev + 0.4;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [gameState]);

  const launchHook = () => {
    if (gameState !== 'READY') return;
    setGameState('AIMING');
    setMessage("HOOK DEPLOYED. ALIGN WITH HARNESS...");
  };

  const attemptCatch = () => {
    // If hook is within range of Kaelen (70 +/- 10)
    const distance = Math.abs(hookPos - kaelenPos);
    if (distance < 10) {
      setGameState('PULLING');
      setMessage("CATCH CONFIRMED! HAUL HIM UP!");
    } else {
      setMessage("MISS! THE HOOK STRUCK THE LOWER MANDIBLE!");
      setMouthClosure(prev => prev + 15); // Striking the "mouth" makes it react
    }
  };

  const applyWinch = () => {
    if (gameState !== 'PULLING') return;
    setWinchPower(prev => Math.min(100, prev + 8));
    setKaelenPos(prev => Math.max(0, prev - 5));
    if (kaelenPos <= 5) {
      setGameState('SUCCESS');
      setMessage("EXTRACTION COMPLETE. KAELEN IS CLEAR OF THE OMEGA-LAYER.");
    }
  };

  // Hook movement oscillation
  useEffect(() => {
    if (gameState === 'AIMING') {
      let start = Date.now();
      const animate = () => {
        const t = (Date.now() - start) / 500;
        setHookPos(50 + Math.sin(t) * 40);
        requestRef.current = requestAnimationFrame(animate);
      };
      requestRef.current = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(requestRef.current);
    }
  }, [gameState]);

  // Winch decay
  useEffect(() => {
    if (gameState === 'PULLING') {
      const decay = setInterval(() => {
        setWinchPower(prev => Math.max(0, prev - 2));
      }, 100);
      return () => clearInterval(decay);
    }
  }, [gameState]);

  return (
    <div className="min-h-screen bg-neutral-950 text-sky-400 font-mono p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-md bg-black border-2 border-sky-900/40 p-6 rounded-lg shadow-2xl relative overflow-hidden">
        
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#0ea5e9 1px, transparent 1px)', size: '20px 20px' }}></div>

        <div className="relative z-10">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Wind className="w-5 h-5 text-sky-500" />
              <h2 className="text-sm font-bold tracking-widest uppercase">Extraction_Unit_7</h2>
            </div>
            <div className={`px-2 py-0.5 rounded text-[10px] font-bold ${mouthClosure > 80 ? 'bg-red-900 animate-pulse' : 'bg-sky-900'}`}>
              MOUTH_CLOSURE: {Math.floor(mouthClosure)}%
            </div>
          </div>

          {/* Visual Shaft Representation */}
          <div className="h-64 bg-neutral-900/50 rounded-lg relative border border-sky-900/20 overflow-hidden mb-6">
            {/* The "Mouth" Floor */}
            <div 
              className="absolute bottom-0 w-full bg-red-900/40 border-t-4 border-red-600 transition-all duration-300"
              style={{ height: `${mouthClosure/2}%`, borderRadius: '40% 40% 0 0' }}
            >
              <div className="flex justify-around mt-1">
                {[1,2,3,4,5].map(i => <div key={i} className="w-2 h-4 bg-white/20 rounded-b-full" />)}
              </div>
            </div>

            {/* The Hook */}
            {gameState !== 'READY' && gameState !== 'SUCCESS' && (
              <div 
                className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-100"
                style={{ top: gameState === 'PULLING' ? `${kaelenPos}%` : `${hookPos}%` }}
              >
                <div className="w-0.5 h-64 bg-sky-500/50 absolute bottom-full"></div>
                <Anchor className="w-6 h-6 text-sky-400 drop-shadow-[0_0_8px_rgba(14,165,233,0.8)]" />
              </div>
            )}

            {/* Kaelen */}
            {gameState !== 'SUCCESS' && (
              <div 
                className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-300"
                style={{ top: `${kaelenPos}%` }}
              >
                <User className={`w-8 h-8 ${gameState === 'FAILED' ? 'text-red-900' : 'text-orange-400'}`} />
                <span className="text-[8px] font-bold bg-black px-1 mt-1 uppercase">Subject: Kaelen</span>
              </div>
            )}
          </div>

          {/* Status Message */}
          <div className="bg-sky-950/20 border border-sky-900/50 p-3 rounded mb-6 flex items-start gap-3">
            <AlertTriangle className={`w-4 h-4 flex-shrink-0 ${mouthClosure > 70 ? 'text-red-500' : 'text-sky-500'}`} />
            <p className="text-[10px] leading-tight italic uppercase">{message}</p>
          </div>

          {/* Controls */}
          <div className="space-y-3">
            {gameState === 'READY' && (
              <button 
                onClick={launchHook}
                className="w-full bg-sky-600 hover:bg-sky-500 text-black font-black py-4 rounded uppercase tracking-widest text-sm transition-all"
              >
                Launch Grapple
              </button>
            )}

            {gameState === 'AIMING' && (
              <button 
                onClick={attemptCatch}
                className="w-full bg-orange-600 hover:bg-orange-500 text-black font-black py-4 rounded uppercase tracking-widest text-sm transition-all animate-pulse"
              >
                Release Clamp
              </button>
            )}

            {gameState === 'PULLING' && (
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase">
                  <span>Winch Power</span>
                  <span>{Math.floor(winchPower)}%</span>
                </div>
                <div className="w-full h-2 bg-neutral-900 rounded-full overflow-hidden border border-sky-900/20">
                  <div className="h-full bg-sky-500 transition-all" style={{ width: `${winchPower}%` }}></div>
                </div>
                <button 
                  onMouseDown={applyWinch}
                  onTouchStart={applyWinch}
                  className="w-full bg-sky-400 hover:bg-sky-300 text-black font-black py-4 rounded uppercase tracking-widest text-sm transition-all shadow-[0_0_20px_rgba(14,165,233,0.4)]"
                >
                  <ArrowUp className="inline-block mr-2" /> OVERRIDE LIMITER
                </button>
              </div>
            )}

            {gameState === 'SUCCESS' && (
              <div className="text-center py-4 bg-emerald-950/20 border border-emerald-900 rounded">
                <Zap className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <p className="text-xs text-emerald-400 font-bold uppercase">Subject Extracted Safely</p>
              </div>
            )}

            {gameState === 'FAILED' && (
              <div className="text-center py-4 bg-red-950/20 border border-red-900 rounded">
                <p className="text-xs text-red-400 font-bold uppercase">Extraction Failed. Signal Lost.</p>
                <button onClick={() => window.location.reload()} className="mt-2 text-[10px] underline uppercase">Retry Sync</button>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-sky-900/20 flex justify-between text-[8px] text-sky-900 uppercase">
            <span>Relay: Sola-7 // Mobile Chassis</span>
            <span>Anchor Depth: -4.12km</span>
          </div>
        </div>
      </div>
    </div>
  );
}