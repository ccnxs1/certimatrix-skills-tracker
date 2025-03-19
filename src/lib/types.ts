
export interface Certificate {
  id: string;
  name: string;
  provider: string;
  issueDate: string;
  expiryDate: string | null;
  skills: string[];
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  userId: string;
  image?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  department?: string;
  certificates: Certificate[];
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  color: string;
}

export interface SkillMatrixItem {
  skill: string;
  category: string;
  count: number;
  level: number; // 0-100
  users: string[];
}

export interface ExpiryAlert {
  id: string;
  certificateId: string;
  certificateName: string;
  userName: string;
  userId: string;
  expiryDate: string;
  daysRemaining: number;
}
