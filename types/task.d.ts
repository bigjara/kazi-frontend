import { BaseUserProfile } from './user';

export interface TaskUserProfile extends BaseUserProfile {
  totalTasksPosted?: number;
}

export type TaskStatus = 'draft' | 'active' | 'completed' | 'cancelled';
export type TaskFilter = 'all' | 'active' | 'completed' | 'draft';
export type TaskCategory = 'software' | 'design' | 'writing' | 'marketing' | 'other';


export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  budget: number;
  status: TaskStatus;
  applicationsCount: number;
  deadline: Date;
  createdAt: Date;
  updatedAt?: Date;
  completedAt?: Date;
  requirements: string[];
  skills: string[];
}

export interface DashboardStats {
  activeTasks: number;
  totalApplications: number;
  tasksCompleted: number;
  avgCompletionRate: number;
}

export interface UserProfile {
  id: string;
  name: string;
  role: string;
  location: string;
  phone: string;
  joinedDate: Date;
  rating?: number;
  totalTasksPosted?: number;
  avatar?: string;
  totalDeliveries?: number;
}