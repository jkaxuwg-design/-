
import React, { useMemo, useState } from 'react';
import { MOCK_INDUSTRY_DATA, INDUSTRY_OPTIONS, ROLE_OPTIONS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

interface PressureRadarProps {
  salaryRevealed: boolean;
  onUnlock: (data: { industry: string; role: string; salaryRange: string }) => void;
}

const PressureRadar: React.FC<PressureRadarProps> = ({ salaryRevealed, onUnlock }) => {
  const { t } = useLanguage();
  const [showModal, setShowModal] = useState(false);
  
  // Form State
  const [industry, setIndustry] = useState(INDUSTRY_OPTIONS[0].value);
  const [role, setRole] = useState(ROLE_OPTIONS[0].value);
  const [salaryRange, setSalaryRange] = useState('range_2');

  const bubbles = useMemo(() => {
    return MOCK_INDUSTRY_DATA.map((item, idx) => {
      const left = (idx * 15 + 10) % 85; 
      const animationDelay = idx * 1.5;
      const size = 120 + (item.pressureIndex * 15); // Large clouds
      
      // Color logic (Gradients for clouds)
      const color = item.pressureIndex >= 9.5 ? 'bg-sunset-from' : 
                    (item.pressureIndex >= 8.5 ? 'bg-sunset-to' : 'bg-aurora-to');
      
      return { ...item, left, animationDelay, size, color };
    });
  }, []);

  const handleSubmit = () => {
    onUnlock({ industry, role, salaryRange });
    setShowModal(false);
  };

  return (
    <div className="h-full w-full relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-6 left-6 z-20">
        <h2 className="text-3xl font-light text-white tracking-wide">{t('radar_title')}</h2>
        <p className="text-xs text-white/50 tracking-widest uppercase mt-1">{t('misery_index')}</p>
      </div>

      {/* Cloud Container */}
      <div className={`absolute inset-0 w-full h-full transition-all duration-1000 ${showModal ? 'blur-xl scale-110' : ''}`}>
         {bubbles.map((bubble, idx) => (
            <div
              key={idx}
              className={`absolute rounded-[100%] opacity-40 animate-float mix-blend-screen filter blur-[40px] cursor-pointer transition-transform hover:scale-110 flex items-center justify-center ${bubble.color}`}
              style={{
                left: `${bubble.left}%`,
                top: `${(idx % 3) * 25 + 20}%`,
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                animationDelay: `${bubble.animationDelay}s`,
                animationDuration: `${20 + idx}s`
              }}
            >
               {/* Data Text inside cloud */}
               {salaryRevealed && (
                 <div className="absolute z-10 text-center opacity-80 mix-blend-normal">
                   <p className="text-xs font-bold text-white shadow-black drop-shadow-md">{t(bubble.name)}</p>
                   <p className="text-lg font-wide text-white">{bubble.pressureIndex}</p>
                 </div>
               )}
            </div>
         ))}
      </div>

      {/* Frost Lock Overlay */}
      {!salaryRevealed && !showModal && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-32">
           {/* Frost Glass Effect */}
           <div className="absolute inset-0 backdrop-blur-[12px] bg-white/5"></div>
           <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent"></div>

           <div className="relative z-20 glass-panel rounded-3xl p-6 text-center max-w-[80%]">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3">
                 ❄️
              </div>
              <h3 className="text-lg font-bold text-white mb-1">{t('lock_title')}</h3>
              <p className="text-xs text-white/60 mb-4">{t('lock_desc')}</p>
              <button 
                onClick={() => setShowModal(true)} 
                className="bg-white text-void text-xs font-bold px-6 py-3 rounded-full hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all"
              >
                {t('unlock_btn')}
              </button>
           </div>
        </div>
      )}

      {/* Data Exchange Modal */}
      {showModal && (
        <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-md animate-fade-in">
          <div className="w-full h-[85%] bg-void rounded-t-[40px] p-8 flex flex-col shadow-2xl relative overflow-hidden border-t border-white/10">
            
            <div className="relative z-10 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-2xl font-light text-white">{t('exchange_title')}</h3>
                  <p className="text-xs text-white/40 mt-1 uppercase tracking-wider">{t('exchange_desc')}</p>
                </div>
                <button onClick={() => setShowModal(false)} className="text-white/30 text-2xl hover:text-white">&times;</button>
              </div>

              {/* Form Fields - Minimalist */}
              <div className="space-y-6 flex-1 overflow-y-auto pr-2 pb-4">
                
                {[
                  { label: 'label_industry', val: industry, set: setIndustry, opts: INDUSTRY_OPTIONS },
                  { label: 'label_role', val: role, set: setRole, opts: ROLE_OPTIONS }
                ].map((field, i) => (
                  <div key={i} className="space-y-2">
                    <label className="text-[10px] text-aurora-to uppercase tracking-widest font-bold">{t(field.label)}</label>
                    <div className="relative">
                      <select 
                        value={field.val}
                        onChange={(e) => field.set(e.target.value)}
                        className="w-full bg-white/5 border-none rounded-2xl p-4 text-sm text-white focus:ring-1 focus:ring-aurora-to transition-all appearance-none"
                      >
                        {field.opts.map(o => (
                          <option key={o.value} value={o.value} className="bg-void">{t(o.labelKey)}</option>
                        ))}
                      </select>
                      <div className="absolute right-4 top-4 text-white/20 pointer-events-none">▼</div>
                    </div>
                  </div>
                ))}

                <div className="space-y-2">
                  <label className="text-[10px] text-sunset-to uppercase tracking-widest font-bold">{t('label_salary')}</label>
                  <div className="relative">
                    <select 
                      value={salaryRange}
                      onChange={(e) => setSalaryRange(e.target.value)}
                      className="w-full bg-white/5 border-none rounded-2xl p-4 text-sm text-white focus:ring-1 focus:ring-sunset-to transition-all appearance-none"
                    >
                      {['range_1', 'range_2', 'range_3', 'range_4', 'range_5'].map(r => (
                        <option key={r} value={r} className="bg-void">{t(r)}</option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-4 text-white/20 pointer-events-none">▼</div>
                  </div>
                </div>

              </div>

              <button 
                onClick={handleSubmit}
                className="w-full py-5 rounded-2xl bg-gradient-to-r from-aurora-from to-aurora-to text-white font-bold tracking-widest text-sm shadow-[0_5px_20px_rgba(108,92,231,0.4)] hover:scale-[1.02] active:scale-95 transition-all mt-4"
              >
                {t('btn_upload')}
              </button>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PressureRadar;
