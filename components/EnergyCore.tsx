
import React from 'react';
import { MoodEntry, MoodLevel } from '../types';

interface EnergyCoreProps {
  history: MoodEntry[];
  charging?: boolean;
}

const EnergyCore: React.FC<EnergyCoreProps> = ({ history, charging }) => {
  const getColor = (level: MoodLevel) => {
    switch (level) {
      case MoodLevel.ANGRY: return 'bg-sunset-from shadow-[0_0_8px_#FF4D4D]';
      case MoodLevel.ANXIOUS: return 'bg-white/40 shadow-[0_0_5px_white]';
      default: return 'bg-aurora-to/30'; 
    }
  };

  return (
    <div className="w-full h-24 relative rounded-xl border border-white/5 bg-black/20 overflow-hidden">
      {/* Jar Glass Reflection */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>

      {/* Fireflies */}
      {history.map((entry, idx) => {
         // Random positions for "Firefly" look
         const top = Math.sin(idx * 13) * 40 + 50; 
         const left = (idx * 17) % 90 + 5;
         const delay = idx * 0.5;
         
         return (
            <div 
              key={idx}
              className={`
                absolute w-2 h-2 rounded-full animate-float blur-[1px]
                ${getColor(entry.level)}
              `}
              style={{
                 top: `${top}%`,
                 left: `${left}%`,
                 animationDuration: `${3 + (idx % 4)}s`,
                 animationDelay: `${delay}s`,
                 opacity: charging && idx === 0 ? 1 : 0.6
              }}
            />
         );
      })}
      
      {/* Charging Effect */}
      {charging && (
        <div className="absolute inset-0 bg-sunset-from/10 animate-pulse"></div>
      )}
    </div>
  );
};

export default EnergyCore;
