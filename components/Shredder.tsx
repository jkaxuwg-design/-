
import React, { useState, useRef } from 'react';
import { COMPANY_REGEX, KEYWORDS, generateMockMoodHistory } from '../constants';
import { RedLineType } from '../types';
import EnergyCore from './EnergyCore';
import SystemMarquee from './SystemMarquee';
import { useLanguage } from '../contexts/LanguageContext';

interface ShredderProps {
  onTriggerCooling: (type: RedLineType) => void;
  userRole: string;
}

const Dashboard: React.FC<ShredderProps> = ({ onTriggerCooling, userRole }) => {
  const { t } = useLanguage();
  const [text, setText] = useState('');
  const [isAbsorbing, setIsAbsorbing] = useState(false);
  const [showPurify, setShowPurify] = useState(false);
  const [inkDrop, setInkDrop] = useState(false);
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newVal = e.target.value;
    newVal = newVal.replace(COMPANY_REGEX, t('mask_label'));
    setText(newVal);
  };

  const startAbsorb = () => {
    if (!text.trim()) return;
    setIsAbsorbing(true);
    if (navigator.vibrate) navigator.vibrate([10]);
    
    pressTimer.current = setTimeout(() => {
      completeAbsorb();
    }, 1200); 
  };

  const stopAbsorb = () => {
    if (pressTimer.current) clearTimeout(pressTimer.current);
    setIsAbsorbing(false);
  };

  const completeAbsorb = () => {
    const redLine = checkRedLines(text);
    if (redLine !== RedLineType.NONE) {
      onTriggerCooling(redLine);
      return;
    }
    
    // 1. Ink Drop Animation
    setInkDrop(true);
    if (navigator.vibrate) navigator.vibrate(50);
    
    // 2. Sphere Reaction
    setTimeout(() => {
       setShowPurify(true);
       setText('');
       if (navigator.vibrate) navigator.vibrate([50, 50, 50]);
    }, 800);

    // 3. Reset
    setTimeout(() => {
      setInkDrop(false);
      setShowPurify(false);
      setIsAbsorbing(false);
      // Award Crystal Mock Logic would go here
    }, 3500);
  };

  const checkRedLines = (content: string): RedLineType => {
    const lower = content.toLowerCase();
    if (KEYWORDS.TYPE_C.some(k => lower.includes(k))) return RedLineType.CRISIS;
    if (KEYWORDS.TYPE_B.some(k => lower.includes(k))) return RedLineType.QUIT;
    return RedLineType.NONE;
  };

  return (
    <div className="h-full flex flex-col relative">
      
      {/* 1. The Dissolver Sphere Area */}
      <div className="flex-1 px-6 pt-4 relative flex flex-col items-center justify-center z-20">
         
         {/* The Fluid Sphere */}
         <div className={`
            relative w-56 h-56 rounded-full transition-all duration-[2000ms]
            ${showPurify ? 'bg-gradient-to-br from-sunset-from to-sunset-end shadow-[0_0_60px_#FF4D4D]' : 'bg-gradient-to-br from-white/10 to-white/5 shadow-[0_0_30px_rgba(255,255,255,0.1)]'}
            animate-morph blur-sm
         `}>
             <div className="absolute inset-0 bg-white/10 rounded-[inherit] mix-blend-overlay"></div>
             {showPurify && <div className="absolute inset-0 bg-aurora-from opacity-0 animate-[fadeIn_2s_1.5s_forwards] mix-blend-soft-light rounded-[inherit]"></div>}
         </div>

         {/* Floating Input Card */}
         <div className={`
            absolute inset-x-8 top-10 bottom-32 glass-panel rounded-[40px] p-6 flex flex-col transition-all duration-700
            ${inkDrop ? 'scale-0 opacity-0 translate-y-32' : 'scale-100 opacity-100'}
         `}>
            <textarea
              value={text}
              onChange={handleInput}
              placeholder={t('placeholder')}
              className="w-full flex-1 bg-transparent text-lg text-white/90 placeholder-white/30 resize-none outline-none font-sans text-center mt-4"
            />
         </div>
         
         {/* Ink Drop Visual (Only visible during transition) */}
         {inkDrop && (
            <div className="absolute z-50 text-black font-bold text-6xl animate-ink-drop">
               ⚫
            </div>
         )}
         
         {/* Interaction Button */}
         {!showPurify && text.length > 0 && (
            <div 
               className="absolute bottom-8 z-30 cursor-pointer"
               onMouseDown={startAbsorb}
               onMouseUp={stopAbsorb}
               onTouchStart={startAbsorb}
               onTouchEnd={stopAbsorb}
            >
               <div className={`
                  px-8 py-4 rounded-full glass-panel border border-white/20 text-sm tracking-widest uppercase font-bold text-white transition-all duration-300
                  ${isAbsorbing ? 'scale-95 bg-white/20' : 'hover:bg-white/10'}
               `}>
                  {t('hold_to_shred')}
               </div>
               
               {/* Progress Ring */}
               {isAbsorbing && (
                  <svg className="absolute inset-[-10px] w-[calc(100%+20px)] h-[calc(100%+20px)] animate-spin">
                     <circle cx="50%" cy="50%" r="45%" stroke="white" strokeWidth="2" fill="none" strokeDasharray="100" strokeDashoffset="20" opacity="0.5"/>
                  </svg>
               )}
            </div>
         )}
         
         {/* Success Message */}
         {showPurify && (
            <div className="absolute bottom-10 flex flex-col items-center animate-fade-in" style={{ animationDelay: '2.5s' }}>
               <div className="w-10 h-10 mb-2 animate-float">💎</div>
               <span className="text-aurora-to text-sm font-bold tracking-widest">{t('crystal_earned')}</span>
            </div>
         )}
      </div>

      {/* 2. Firefly Jar (Bottom) */}
      <div className="px-6 pb-6 z-20">
         <div className="flex items-center justify-between mb-2 px-2">
            <span className="text-[10px] text-white/40 uppercase tracking-widest">{t('energy_core')}</span>
            <span className="text-[10px] text-aurora-to uppercase tracking-widest">{t('energy_drive')}</span>
         </div>
         <EnergyCore history={generateMockMoodHistory()} charging={showPurify} />
      </div>
      
      {/* 3. System Marquee */}
       <div className="mt-auto z-30 opacity-70">
        <SystemMarquee />
      </div>
    </div>
  );
};

export default Dashboard;
