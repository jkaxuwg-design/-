
import React, { useState, useEffect } from 'react';
import { SYSTEM_BROADCASTS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

const SystemMarquee: React.FC = () => {
  const { t, language } = useLanguage();
  const [idx, setIdx] = useState(0);

  const nextMsg = () => {
    setIdx((prev) => (prev + 1) % SYSTEM_BROADCASTS.length);
  };

  const currentMsg = language === 'zh' ? SYSTEM_BROADCASTS[idx].textZh : SYSTEM_BROADCASTS[idx].textEn;

  return (
    <div 
      onClick={nextMsg}
      className="w-full h-8 bg-black/40 border-y border-white/5 backdrop-blur-sm flex items-center overflow-hidden cursor-pointer relative group"
    >
      <div className="absolute left-0 w-1 h-full bg-fluid-neon"></div>
      <div className="whitespace-nowrap animate-marquee px-4">
         <span className="text-[10px] font-mono text-white/70 hover:text-fluid-neon transition-colors">
            {currentMsg}
         </span>
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/80 to-transparent"></div>
    </div>
  );
};

export default SystemMarquee;
