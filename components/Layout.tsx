
import React from 'react';
import { AppTab } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface LayoutProps {
  currentTab: AppTab;
  setTab: (tab: AppTab) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ currentTab, setTab, children }) => {
  const { language, setLanguage, t } = useLanguage();

  const getSystemStatus = () => {
    switch (currentTab) {
      case AppTab.SHREDDER: return t('sys_shredder');
      case AppTab.RADAR: return t('sys_radar');
      case AppTab.PROFILE: return t('sys_profile');
    }
  };

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-void relative overflow-hidden text-white font-sans selection:bg-aurora-from selection:text-white">
      
      {/* Ambient Background - Ether Flux Style */}
      <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[50%] bg-aurora-from rounded-[100%] mix-blend-screen filter blur-[120px] opacity-20 animate-morph"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[100%] h-[50%] bg-aurora-to rounded-[100%] mix-blend-screen filter blur-[120px] opacity-10 animate-morph" style={{ animationDelay: '2s' }}></div>

      {/* Floating Settings (Minimal Dot) */}
      <div className="absolute top-8 right-8 z-50 flex gap-4 items-center">
        <button 
          onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
          className="text-[10px] font-bold tracking-widest text-white/40 hover:text-white transition-colors"
        >
          {language.toUpperCase()}
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative z-10 pt-8 pb-24">
        {children}
      </main>

      {/* Floating Glass Dock */}
      <div className="absolute bottom-10 left-6 right-6 z-40 flex flex-col items-center gap-3">
         {/* System Status Text */}
         <div className="text-[10px] text-white/30 tracking-[0.2em] uppercase font-bold">
            {getSystemStatus()}
         </div>

         <div className="w-full h-20 glass-panel rounded-[30px] flex items-center justify-around px-2 relative overflow-hidden">
          {/* Internal Glow for Active State Background */}
          <NavButton 
            active={currentTab === AppTab.SHREDDER} 
            onClick={() => setTab(AppTab.SHREDDER)} 
            icon={<FluidIconActive />}
            inactiveIcon={<FluidIconInactive />}
          />
          <NavButton 
            active={currentTab === AppTab.RADAR} 
            onClick={() => setTab(AppTab.RADAR)} 
            icon={<CloudIconActive />}
            inactiveIcon={<CloudIconInactive />}
          />
          <NavButton 
            active={currentTab === AppTab.PROFILE} 
            onClick={() => setTab(AppTab.PROFILE)} 
            icon={<StarIconActive />}
            inactiveIcon={<StarIconInactive />}
          />
        </div>
      </div>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; inactiveIcon: React.ReactNode }> = ({ active, onClick, icon, inactiveIcon }) => (
  <button 
    onClick={onClick}
    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 relative group`}
  >
    {/* Soft Backlight */}
    {active && <div className="absolute inset-0 bg-white/10 rounded-2xl blur-md"></div>}
    
    <div className={`transform transition-all duration-500 ${active ? 'scale-110 -translate-y-1' : 'opacity-50 grayscale'}`}>
      {active ? icon : inactiveIcon}
    </div>
    
    {/* Indicator Dot */}
    {active && <div className="absolute -bottom-1 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_white]"></div>}
  </button>
);

// SVGs for Ether Icons
const FluidIconActive = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="url(#paint0_linear)" fillOpacity="0.8"/>
    <defs>
      <linearGradient id="paint0_linear" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF4D4D"/>
        <stop offset="1" stopColor="#FF9F43"/>
      </linearGradient>
    </defs>
  </svg>
);
const FluidIconInactive = () => (
  <div className="w-5 h-5 rounded-full border-2 border-white/50"></div>
);

const CloudIconActive = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M18 10C18 6.68629 15.3137 4 12 4C8.68629 4 6 6.68629 6 10C3.79086 10 2 11.7909 2 14C2 16.2091 3.79086 18 6 18H18C20.2091 18 22 16.2091 22 14C22 11.7909 20.2091 10 18 10Z" fill="url(#paint_cloud)" fillOpacity="0.8"/>
    <defs>
      <linearGradient id="paint_cloud" x1="2" y1="4" x2="22" y2="18" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6C5CE7"/>
        <stop offset="1" stopColor="#00CEC9"/>
      </linearGradient>
    </defs>
  </svg>
);
const CloudIconInactive = () => (
   <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 10C18 6.68629 15.3137 4 12 4C8.68629 4 6 6.68629 6 10C3.79086 10 2 11.7909 2 14C2 16.2091 3.79086 18 6 18H18C20.2091 18 22 16.2091 22 14C22 11.7909 20.2091 10 18 10Z"/>
   </svg>
);

const StarIconActive = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="white" fillOpacity="0.9"/>
  </svg>
);
const StarIconInactive = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
     <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
  </svg>
);

export default Layout;
