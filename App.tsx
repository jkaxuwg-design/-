
import React, { useState } from 'react';
import Layout from './components/Layout';
import Shredder from './components/Shredder';
import PressureRadar from './components/PressureRadar';
import CareerTree from './components/CareerTree';
import CoolingChamber from './components/CoolingChamber';
import { AppTab, RedLineType, CoolingState } from './types';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<AppTab>(AppTab.SHREDDER);
  
  // Cooling System State
  const [coolingState, setCoolingState] = useState<CoolingState>({
    isActive: false,
    startTime: null,
    unlockTime: null
  });
  
  const [lastRedLineType, setLastRedLineType] = useState<RedLineType>(RedLineType.NONE);

  // User Data State (Using Translation Keys)
  const [userProfile, setUserProfile] = useState({
    industry: 'internet',
    role: 'product_manager',
    salaryRevealed: false,
    salaryRange: '',
    skills: [],
    levelTitleKey: 'product_manager'
  });

  const triggerCooling = (type: RedLineType) => {
    setLastRedLineType(type);
    setCoolingState({
      isActive: true,
      startTime: Date.now(),
      unlockTime: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    });
  };

  const unlockCooling = () => {
    setCoolingState({
      isActive: false,
      startTime: null,
      unlockTime: null
    });
    setLastRedLineType(RedLineType.NONE);
  };

  const handleSalaryReveal = (data: { industry: string; role: string; salaryRange: string }) => {
    setUserProfile(prev => ({ 
      ...prev, 
      salaryRevealed: true,
      industry: data.industry,
      role: data.role,
      salaryRange: data.salaryRange
    }));
  };

  // Function to switch to radar tab and open modal if user tries to unlock from profile
  const handleProfileUnlockRequest = () => {
    setCurrentTab(AppTab.RADAR);
    // In a real app, we would pass a "openModal" flag, but for this demo, 
    // switching to Radar (where the lock is obvious) is a good enough flow.
  };

  // If cooling chamber is active, it overrides everything
  if (coolingState.isActive) {
    return <CoolingChamber type={lastRedLineType} onUnlock={unlockCooling} />;
  }

  return (
    <Layout currentTab={currentTab} setTab={setCurrentTab}>
      {currentTab === AppTab.SHREDDER && (
        <Shredder 
          onTriggerCooling={triggerCooling} 
          userRole={userProfile.role}
        />
      )}
      {currentTab === AppTab.RADAR && (
        <PressureRadar 
          salaryRevealed={userProfile.salaryRevealed}
          onUnlock={handleSalaryReveal}
        />
      )}
      {currentTab === AppTab.PROFILE && (
        <CareerTree 
          salaryRevealed={userProfile.salaryRevealed}
          onUnlockRequest={handleProfileUnlockRequest}
        />
      )}
    </Layout>
  );
};

export default App;
