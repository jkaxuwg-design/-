
import React, { useState, useEffect, useRef } from 'react';
import { RedLineType } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface CoolingChamberProps {
  type: RedLineType;
  onUnlock: () => void;
}

const CoolingChamber: React.FC<CoolingChamberProps> = ({ type, onUnlock }) => {
  const { t } = useLanguage();
  const [phase, setPhase] = useState<'in' | 'hold' | 'out'>('in');
  const [holdingExit, setHoldingExit] = useState(false);
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Breathing Cycle Logic
  useEffect(() => {
    const runCycle = async () => {
       // Inhale 4s
       setPhase('in');
       await new Promise(r => setTimeout(r, 4000));
       // Hold 7s
       setPhase('hold');
       await new Promise(r => setTimeout(r, 7000));
       // Exhale 8s
       setPhase('out');
       await new Promise(r => setTimeout(r, 8000));
    };

    const interval = setInterval(runCycle, 19000);
    runCycle(); // Initial run
    return () => clearInterval(interval);
  }, []);

  const startExit = () => {
    setHoldingExit(true);
    exitTimer.current = setTimeout(() => {
       onUnlock();
    }, 3000); // 3 seconds to unlock
  };

  const cancelExit = () => {
    setHoldingExit(false);
    if (exitTimer.current) clearTimeout(exitTimer.current);
  };

  const getInstruction = () => {
     switch(phase) {
        case 'in': return t('breathe_in');
        case 'hold': return t('breathe_hold');
        case 'out': return t('breathe_out');
     }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#000510] flex flex-col items-center justify-center overflow-hidden animate-fade-in">
      
      {/* Deep Sea Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#02020A] to-[#0A1A2F]"></div>

      {/* Breathing Circle Visualization */}
      <div className="relative z-10 flex items-center justify-center">
         {/* Outer Glow */}
         <div 
            className="absolute w-64 h-64 rounded-full bg-[#4A90E2] mix-blend-screen filter blur-[60px] opacity-20 transition-all duration-[4000ms] ease-in-out"
            style={{ 
               transform: phase === 'in' || phase === 'hold' ? 'scale(1.5)' : 'scale(1)',
               opacity: phase === 'hold' ? 0.3 : 0.1
            }}
         ></div>

         {/* The Ring */}
         <div 
            className="w-48 h-48 rounded-full border border-white/20 flex items-center justify-center transition-all duration-[4000ms] ease-in-out"
            style={{
               transform: phase === 'in' || phase === 'hold' ? 'scale(1.2)' : 'scale(0.8)',
               borderColor: phase === 'hold' ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.1)'
            }}
         >
             <span className="text-white/50 font-light tracking-[0.3em] text-sm animate-pulse">{getInstruction()}</span>
         </div>
      </div>

      <div className="relative z-10 mt-12 text-center">
         <p className="text-white/30 text-xs tracking-widest uppercase mb-2">{t('cooling_active')}</p>
      </div>

      {/* Resistance Exit Button */}
      <button 
        onMouseDown={startExit}
        onMouseUp={cancelExit}
        onTouchStart={startExit}
        onTouchEnd={cancelExit}
        className="absolute bottom-12 z-20"
      >
        <div className={`
           w-16 h-16 rounded-full border border-white/10 flex items-center justify-center transition-all duration-200
           ${holdingExit ? 'scale-110 border-sunset-from bg-sunset-from/20' : ''}
        `}>
           <div className={`w-2 h-2 rounded-full bg-white transition-all ${holdingExit ? 'bg-sunset-from' : ''}`}></div>
        </div>
        <p className="text-[10px] text-white/20 mt-4 uppercase tracking-widest">{t('emergency_override')}</p>
      </button>

      {/* Progress Ring for Exit */}
      {holdingExit && (
         <svg className="absolute bottom-12 w-16 h-16 z-10 -translate-y-6">
            <circle cx="32" cy="32" r="30" stroke="#FF4D4D" strokeWidth="2" fill="none" 
               strokeDasharray="188" strokeDashoffset="0"
               className="animate-[dash_3s_linear_forwards]"
               style={{ strokeDashoffset: 188 }}
            />
            <style>{`
               @keyframes dash {
                  to { stroke-dashoffset: 0; }
               }
            `}</style>
         </svg>
      )}

    </div>
  );
};

export default CoolingChamber;
