import React from 'react';
import { MoodEntry, MoodLevel } from '../types';

interface MoodCalendarProps {
  history: MoodEntry[];
  mini?: boolean;
}

const MoodCalendar: React.FC<MoodCalendarProps> = ({ history, mini = false }) => {
  const getColor = (level: MoodLevel) => {
    switch (level) {
      case MoodLevel.ANGRY: return 'bg-fluid-lava';
      case MoodLevel.ANXIOUS: return 'bg-white/30';
      default: return 'bg-white/5'; 
    }
  };

  const displayHistory = mini ? history.slice(0, 16) : history; // 4x4 for mini

  return (
    <div className={`grid ${mini ? 'grid-cols-4 gap-1' : 'grid-cols-7 gap-1.5'} w-full`}>
      {displayHistory.map((entry, idx) => (
        <div 
          key={idx}
          className={`aspect-square rounded-sm ${getColor(entry.level)} transition-all duration-300`}
        />
      ))}
    </div>
  );
};

export default MoodCalendar;