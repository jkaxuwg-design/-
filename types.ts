
export enum AppTab {
  SHREDDER = 'SHREDDER',
  RADAR = 'RADAR',
  PROFILE = 'PROFILE',
}

export type Language = 'en' | 'zh';

export enum MoodLevel {
  CALM = 0,
  ANXIOUS = 1,
  ANGRY = 2,
}

export interface MoodEntry {
  date: string;
  level: MoodLevel;
  count: number;
}

export interface IndustryData {
  name: string;
  pressureIndex: number; // 0-10
  tags: string[];
  trend: 'up' | 'down' | 'stable';
  weather: 'thunder' | 'rain' | 'cloudy' | 'sunny';
}

export enum RedLineType {
  NONE = 'NONE',
  QUIT = 'QUIT',   // 24h Cooling
  CRISIS = 'CRISIS' // 24h Cooling + Helpline
}

export interface CoolingState {
  isActive: boolean;
  startTime: number | null;
  unlockTime: number | null;
  reason?: string;
}

export interface Skill {
  name: string;
  level: number;
  max: number;
  complete: boolean;
}

export interface RoleTemplate {
  id: string;
  nameKey: string;
  skills: Skill[];
}

export interface UserProfile {
  industry: string;
  role: string;
  salaryRevealed: boolean;
  salaryRange?: string; // Added field
  skills: Skill[];
  levelTitleKey: string;
}
