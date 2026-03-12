import React, { useState, useEffect } from 'react';
import { CloudLightning, ShieldAlert, Upload, Radio, Zap, AlertTriangle, Eye } from 'lucide-react';

export default function App() {
  const [distance, setDistance] = useState(15000);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [mythSpread, setMythSpread] = useState(12);
  const [alertLevel, setAlertLevel] = useState('LOW');

  useEffect(() => {
    const timer = setInterval(() => {
      setDistance(prev => Math.max(0, prev - 120));
      setUploadProgress(prev => Math.min(100, prev + 0.8));
      setMythSpread(prev => prev + 0.5);
      
      if (distance < 5000) setAlertLevel('ELEVATED');
      if (distance < 1000) setAlertLevel('CRITICAL');
    }, 100);
    return () => clearInterval(timer);
  }, [distance]);

  return (
    <div className="min-h-screen bg-neutral-950 text-red-500 font-mono p-4 md:p-12 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Storm Effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="h-full w-full bg-[radial-gradient(circle_at_50%_50%,#450a0a_0%,transparent_70%)] animate-pulse"></div>
      </div>

      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        
        {/* Navigation Header */}
        <div className="md:col-span-3 flex justify-between items-end border-b border-red-900/50 pb-4 mb-4">
          <div>
            <h1 className="text-3xl font-black tracking-tighter italic">SPIRE_APPROACH_v.09</h1>
            <p className="text-xs text-red-700 font-bold uppercase tracking-widest">Protocol: Gimme Shelter // Destination: Central Spire</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-mono">{distance.toLocaleString()}m</div>
            <div className="text-[10px] text-red-800">DISTANCE TO TOUCHDOWN</div>
          </div>
        </div>

        {/* Sola-7 Status */}
        <div className="bg-black/60 border border-red-900/30 p-6 rounded-sm">
          <div className="flex items-center gap-2 mb-6 text-red-400">
            <ShieldAlert className="w-5 h-5" />
            <span className="text-xs font-bold uppercase">Prime Integrity</span>
          </div>
          <div className="relative h-40 flex items-end justify-center gap-1">
            {[...Array(12)].map((_, i) => (
              <div 
                key={i} 
                className="w-4 bg-red-950 border border-red-900/50 transition-all duration-500"
                style={{ height: `${i < 11 ? 92 : 30}%`, opacity: i < 11 ? 1 : 0.3 }}
              ></div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <div className="text-2xl font-black">92%</div>
            <div className="text-[9px] text-red-800 uppercase italic">Sub-routine Partition Active</div>
          </div>
        </div>

        {/* Data Stream */}
        <div className="bg-black/60 border border-red-900/30 p-6 rounded-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 text-emerald-500">
              <Upload className="w-5 h-5" />
              <span className="text-xs font-bold uppercase italic text-emerald-600">Starlight Skin Data</span>
            </div>
            <div className="space-y-2">
              <div className="h-2 bg-neutral-900 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all" style={{ width: `${uploadProgress}%` }}></div>
              </div>
              <div className="flex justify-between text-[10px] text-emerald-900 font-bold">
                <span>ENCRYPTING...</span>
                <span>{Math.floor(uploadProgress)}%</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-red-900/20">
            <div className="flex items-center gap-2 mb-4 text-amber-500">
              <Radio className="w-5 h-5" />
              <span className="text-xs font-bold uppercase text-amber-600">Chronicle Leakage</span>
            </div>
            <div className="text-3xl font-mono text-amber-500">{Math.floor(mythSpread)}%</div>
            <p className="text-[9px] text-amber-900 leading-tight mt-1 uppercase">Kaelen's transmission is bypassing Spire filters. The story is ahead of us.</p>
          </div>
        </div>

        {/* Landing Terminal */}
        <div className="bg-red-950/10 border border-red-500/40 p-6 rounded-sm flex flex-col items-center justify-center text-center">
          {alertLevel === 'CRITICAL' ? (
            <div className="animate-pulse">
              <AlertTriangle className="w-16 h-16 mb-4 mx-auto" />
              <div className="text-xl font-black mb-2">WAR_IS_A_SHOT_AWAY</div>
              <p className="text-[10px] uppercase">Council Defense Grid active. They are painting us as hostile.</p>
            </div>
          ) : (
            <div>
              <div className="mb-4 relative">
                <Zap className="w-16 h-16 text-red-500/20" />
                <Eye className="w-8 h-8 absolute inset-0 m-auto text-red-500 animate-bounce" />
              </div>
              <div className="text-xs font-bold uppercase tracking-widest mb-4">Awaiting Landing Clearance</div>
              <div className="p-2 border border-red-500/20 bg-red-500/5 text-[10px] italic">
                "It's just a kiss away..."
              </div>
            </div>
          )}
        </div>

        {/* Footer Logs */}
        <div className="md:col-span-3 text-[10px] text-red-900/60 uppercase flex justify-between items-center">
          <span>Tracking Ref: IO-092-RETURN</span>
          <span className="animate-pulse">● SIGNAL_STRENGTH_WEAKENING</span>
          <span>© ORACLE_REDACT_OFF</span>
        </div>
      </div>
    </div>
  );
}