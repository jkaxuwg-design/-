
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { CAREER_TEMPLATES } from '../constants';
import { Skill } from '../types';

interface CareerTreeProps {
  salaryRevealed?: boolean;
  onUnlockRequest?: () => void;
}

const CareerTree: React.FC<CareerTreeProps> = ({ salaryRevealed = false, onUnlockRequest }) => {
  const { t } = useLanguage();
  const [activeSkills, setActiveSkills] = useState<Skill[]>([]);
  
  const applyTemplate = (templateId: string) => {
    const template = CAREER_TEMPLATES.find(t => t.id === templateId);
    if (template) {
      setActiveSkills(template.skills);
    }
  };

  const toggleSkill = (idx: number) => {
    const newSkills = [...activeSkills];
    newSkills[idx].complete = !newSkills[idx].complete;
    setActiveSkills(newSkills);
    if (newSkills[idx].complete && navigator.vibrate) navigator.vibrate(50);
  };

  return (
    <div className="h-full overflow-y-auto px-6 pb-24 relative">
      
      {/* Starry Background */}
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none">
         {[...Array(20)].map((_, i) => (
            <div 
               key={i}
               className="absolute bg-white rounded-full animate-pulse"
               style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 3}px`,
                  height: `${Math.random() * 3}px`,
                  animationDuration: `${Math.random() * 3 + 1}s`
               }}
            ></div>
         ))}
      </div>

      {/* 1. Profile Header */}
      <div className="glass-panel rounded-[30px] p-6 mb-8 relative z-10">
         <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-aurora-from to-aurora-to p-0.5">
               <div className="w-full h-full rounded-full bg-void flex items-center justify-center">
                  <span className="text-2xl">👩‍🚀</span>
               </div>
            </div>
            <div>
               <h2 className="text-xl font-bold text-white">{t('role_pm')}</h2>
               <p className="text-xs text-aurora-to tracking-widest uppercase mt-1">{t('lv_label')}</p>
            </div>
         </div>
         
         <div className="flex gap-4 mt-6">
            <div className="flex-1 bg-white/5 rounded-2xl p-3 text-center">
               <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">{t('hp_label')}</div>
               <div className="text-lg font-bold text-white">3 Days</div>
            </div>
            <div className="flex-1 bg-white/5 rounded-2xl p-3 text-center">
               <div className="text-[10px] text-white/40 uppercase tracking-widest mb-1">{t('crystal_count')}</div>
               <div className="text-lg font-bold text-aurora-to">12 💎</div>
            </div>
         </div>
      </div>

      {/* 2. Constellation (Skills) */}
      <h3 className="text-xs text-white/30 uppercase tracking-[0.2em] mb-6 text-center">{t('soft_skills')}</h3>

      {activeSkills.length === 0 ? (
        <div className="grid grid-cols-2 gap-4 relative z-10">
          {CAREER_TEMPLATES.map(temp => (
            <button 
              key={temp.id}
              onClick={() => applyTemplate(temp.id)}
              className="aspect-square rounded-full border border-white/10 bg-white/5 hover:bg-aurora-from/20 transition-all flex flex-col items-center justify-center gap-2 group"
            >
              <div className="w-2 h-2 bg-white rounded-full group-hover:shadow-[0_0_10px_white]"></div>
              <span className="text-[10px] font-bold text-white uppercase tracking-widest">{t(temp.nameKey)}</span>
            </button>
          ))}
        </div>
      ) : (
        <div className="relative z-10 min-h-[300px]">
           {/* SVG Lines Connector */}
           <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
              <line x1="50%" y1="10%" x2="20%" y2="40%" stroke="white" strokeWidth="1" />
              <line x1="50%" y1="10%" x2="80%" y2="40%" stroke="white" strokeWidth="1" />
              <line x1="20%" y1="40%" x2="30%" y2="80%" stroke="white" strokeWidth="1" />
              <line x1="80%" y1="40%" x2="70%" y2="80%" stroke="white" strokeWidth="1" />
           </svg>

           {/* Central Star */}
           <div className="absolute top-[5%] left-[50%] transform -translate-x-1/2 flex flex-col items-center">
              <div className="w-4 h-4 rounded-full bg-white shadow-[0_0_20px_white] animate-pulse"></div>
              <span className="text-[10px] text-white mt-2">Core</span>
           </div>

           {/* Skill Stars */}
           {activeSkills.map((skill, idx) => {
              // Simple static positioning for the stars for demo
              const positions = [
                 { top: '40%', left: '20%' },
                 { top: '40%', left: '80%' },
                 { top: '80%', left: '30%' },
                 { top: '80%', left: '70%' },
              ];
              const pos = positions[idx] || { top: '0', left: '0' };

              return (
                 <div 
                    key={idx}
                    onClick={() => toggleSkill(idx)}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group"
                    style={{ top: pos.top, left: pos.left }}
                 >
                    <div className={`
                       w-8 h-8 rounded-full border-2 transition-all duration-500 flex items-center justify-center
                       ${skill.complete ? 'border-aurora-to bg-aurora-to/20 shadow-[0_0_20px_#00CEC9]' : 'border-white/20 bg-void'}
                    `}>
                       <div className={`w-2 h-2 rounded-full ${skill.complete ? 'bg-aurora-to' : 'bg-white/30'}`}></div>
                    </div>
                    <span className={`text-[10px] mt-2 font-bold tracking-wider ${skill.complete ? 'text-aurora-to text-glow' : 'text-white/40'}`}>
                       {t(skill.name)}
                    </span>
                 </div>
              );
           })}
        </div>
      )}
      
      {/* Locked Secret Star */}
      <div className="mt-12 relative z-10 flex justify-center">
         <div 
            onClick={() => !salaryRevealed && onUnlockRequest && onUnlockRequest()}
            className="glass-panel px-8 py-4 rounded-full flex items-center gap-4 cursor-pointer hover:bg-white/10 transition-colors"
         >
             <span className="text-2xl">{salaryRevealed ? '🌟' : '❄️'}</span>
             <div className="text-left">
                <div className="text-[10px] text-white/40 uppercase tracking-widest">{t('role_pm')} Senior</div>
                <div className="text-sm font-bold text-white">{salaryRevealed ? t('unlocked_val') : t('locked_val')}</div>
             </div>
         </div>
      </div>

    </div>
  );
};

export default CareerTree;
