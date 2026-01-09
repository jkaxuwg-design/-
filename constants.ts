
import { IndustryData, MoodEntry, MoodLevel, RoleTemplate } from "./types";

// Regex for local masking
export const COMPANY_REGEX = /(Tencent|Alibaba|ByteDance|Google|Facebook|Amazon|Apple|Microsoft|NetEase|Meituan|Pinduoduo|JD|Baidu|Huawei|Xiaomi|腾讯|阿里|字节|拼多多|美团|百度|网易|华为|小米|快手|滴滴|京东|美团|蔚来|理想|小鹏|比亚迪|Tesla|NVIDIA|OpenAI)/gi;

// Red Line Keywords
export const KEYWORDS = {
  TYPE_A: ['annoying', 'stupid', 'idiot', 'overtime', 'pua', 'tired', 'boring', 'mess', '烦', '傻', '累', '加班', '画饼', 'sb', '脑残', '无语', '心累'], // Vent
  TYPE_B: ['quit', 'resign', 'leave', 'notice', 'handover', 'fire me', '离职', '辞职', '不干了', '裸辞', '退群', '提桶', '跑路'], // Action
  TYPE_C: ['die', 'suicide', 'end it', 'hopeless', 'kill myself', 'jump', '想死', '不想活', '我要死', '自杀', '跳楼', '绝望', '毁灭', '重开'], 
};

// System Broadcasts (The "Crazy" Literature)
export const SYSTEM_BROADCASTS = [
  { id: 1, textEn: "[SYS]: Endure a moment, get breast hyperplasia. Retreat a step, get thyroid nodules.", textZh: "[系统广播]：忍一时越想越气，退一步乳腺增生。" },
  { id: 2, textEn: "[SYS]: Salary is compensation for mental damage. Lost wages are calculated separately.", textZh: "[系统广播]：工资是精神损失费，误工费另算。" },
  { id: 3, textEn: "[SYS]: The company belongs to the boss, but happiness is yours. Suggestion: Slack off immediately.", textZh: "[系统广播]：公司是老板的，但快乐是自己的。建议立即摸鱼。" },
  { id: 4, textEn: "[SYS]: Today's Fortune: Go Crazy. Avoid: Taking the Blame.", textZh: "[系统广播]：今日宜：发疯。今日忌：背锅。" },
  { id: 5, textEn: "[SYS]: Warning: Brain capacity low. Please restart via coffee.", textZh: "[系统广播]：警告：脑容量不足，请通过咖啡重启。" },
];

// --- EXTENDED LISTS FOR FORM SELECTION ---

export const INDUSTRY_OPTIONS = [
  { value: 'internet', labelKey: 'ind_internet' },
  { value: 'finance', labelKey: 'ind_finance' },
  { value: 'ecommerce', labelKey: 'ind_ecommerce' },
  { value: 'education', labelKey: 'ind_education' },
  { value: 'real_estate', labelKey: 'ind_real_estate' },
  { value: 'manufacturing', labelKey: 'ind_manufacturing' },
  { value: 'medical', labelKey: 'ind_medical' },
  { value: 'media', labelKey: 'ind_media' },
  { value: 'service', labelKey: 'ind_service' },
  { value: 'civil', labelKey: 'ind_civil' },
  { value: 'crypto', labelKey: 'ind_crypto' },
  { value: 'new_energy', labelKey: 'ind_new_energy' },
];

export const ROLE_OPTIONS = [
  // Tech / Product
  { value: 'product_manager', labelKey: 'role_pm' },
  { value: 'developer', labelKey: 'role_dev' },
  { value: 'designer', labelKey: 'role_designer' },
  { value: 'data_scientist', labelKey: 'role_data' },
  { value: 'qa_engineer', labelKey: 'role_qa' },
  // Operations / Marketing
  { value: 'operations', labelKey: 'role_ops' },
  { value: 'marketing', labelKey: 'role_mkt' },
  { value: 'sales', labelKey: 'role_sales' },
  { value: 'content', labelKey: 'role_content' },
  // Corporate Function
  { value: 'hr', labelKey: 'role_hr' },
  { value: 'finance', labelKey: 'role_finance' },
  { value: 'legal', labelKey: 'role_legal' },
  { value: 'admin', labelKey: 'role_admin' },
  // Professional Services
  { value: 'investment', labelKey: 'role_invest' },
  { value: 'consultant', labelKey: 'role_consult' },
  { value: 'lawyer', labelKey: 'role_lawyer' },
  // Traditional / Other
  { value: 'teacher', labelKey: 'role_teacher' },
  { value: 'doctor', labelKey: 'role_doctor' },
  { value: 'engineer', labelKey: 'role_engineer' }, // Civil/Mech
  { value: 'civil_servant', labelKey: 'role_civil_servant' },
  { value: 'freelancer', labelKey: 'role_freelancer' },
  { value: 'founder', labelKey: 'role_founder' },
];

// Mock Data for the Radar Visualization (Top Pressure Sectors)
export const MOCK_INDUSTRY_DATA: IndustryData[] = [
  { name: 'ind_ecommerce', pressureIndex: 9.9, tags: ['tag_day_night', 'tag_sudden_death'], trend: 'up', weather: 'thunder' },
  { name: 'ind_finance', pressureIndex: 9.6, tags: ['tag_peak', 'tag_no_sleep'], trend: 'up', weather: 'thunder' },
  { name: 'ind_internet', pressureIndex: 9.2, tags: ['tag_single_day', 'tag_crunch'], trend: 'stable', weather: 'rain' },
  { name: 'ind_crypto', pressureIndex: 9.8, tags: ['tag_247', 'tag_casino'], trend: 'up', weather: 'thunder' }, // New
  { name: 'ind_real_estate', pressureIndex: 8.8, tags: ['tag_opt', 'tag_fine'], trend: 'down', weather: 'cloudy' }, // Civil Eng
  { name: 'ind_education', pressureIndex: 7.5, tags: ['tag_policy', 'tag_sales'], trend: 'down', weather: 'sunny' },
  { name: 'ind_medical', pressureIndex: 9.0, tags: ['tag_night_shift', 'tag_patient'], trend: 'stable', weather: 'rain' },
  { name: 'ind_new_energy', pressureIndex: 9.3, tags: ['tag_factory', 'tag_overtime'], trend: 'up', weather: 'rain' },
];

export const CAREER_TEMPLATES: RoleTemplate[] = [
  {
    id: 'pm',
    nameKey: 'role_pm',
    skills: [
      { name: 'req_analysis', level: 0, max: 5, complete: false },
      { name: 'proj_mgmt', level: 0, max: 5, complete: false },
      { name: 'data_analysis', level: 0, max: 5, complete: false },
      { name: 'comm', level: 0, max: 5, complete: false },
    ]
  },
  {
    id: 'dev',
    nameKey: 'role_dev',
    skills: [
      { name: 'sys_design', level: 0, max: 5, complete: false },
      { name: 'code_review', level: 0, max: 5, complete: false },
      { name: 'perf_opt', level: 0, max: 5, complete: false },
      { name: 'legacy_refactor', level: 0, max: 5, complete: false },
    ]
  },
  // Added a general template for now
  {
    id: 'ops',
    nameKey: 'role_ops',
    skills: [
      { name: 'growth_hacking', level: 0, max: 5, complete: false },
      { name: 'content_strategy', level: 0, max: 5, complete: false },
      { name: 'community_mgmt', level: 0, max: 5, complete: false },
      { name: 'crisis_pr', level: 0, max: 5, complete: false },
    ]
  }
];

export const generateMockMoodHistory = (): MoodEntry[] => {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 21; i++) { // Fewer for cells
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const rand = Math.random();
    let level = MoodLevel.CALM;
    if (rand > 0.7) level = MoodLevel.ANGRY;
    else if (rand > 0.4) level = MoodLevel.ANXIOUS;
    
    days.push({
      date: d.toISOString().split('T')[0],
      level: level,
      count: Math.floor(Math.random() * 5)
    });
  }
  return days; // Front to back
};

export const RATIONAL_PLEDGES = {
  en: "I confirm my decision is based on strategy, not pure rage. I have calculated my burn rate and secured a safety net. I am not quitting, I am pivoting.",
  zh: "我确认当下的决定并非出于瞬间的愤怒，而是基于理性的规划。我已经计算过生存成本，并准备好了退路。我不是在逃避，我是在战略转移。"
};
