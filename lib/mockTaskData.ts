import { Task, DashboardStats, UserProfile, TaskStatus, TaskCategory } from '@/types/task';

const TASK_TITLES: Record<TaskCategory, string[]> = {
  software: [
    'Build a React Dashboard',
    'Create REST API with Node.js',
    'Fix Mobile App Bugs',
    'Implement Payment Integration',
    'Database Migration Script',
    'Build Chrome Extension',
    'Develop iOS App Feature',
    'Set up CI/CD Pipeline'
  ],
  design: [
    'Design Landing Page UI',
    'Create Logo and Brand Identity',
    'Design Mobile App Mockups',
    'Redesign E-commerce Website',
    'Create Social Media Graphics',
    'Design Email Templates',
    'Create Marketing Brochure',
    'Design Presentation Deck'
  ],
  writing: [
    'Write Technical Documentation',
    'Create Blog Posts (5 articles)',
    'Write Product Descriptions',
    'Develop Content Strategy',
    'Write Press Release',
    'Create Social Media Copy',
    'Write Email Campaign',
    'Technical Writing for API Docs'
  ],
  marketing: [
    'SEO Optimization for Website',
    'Social Media Marketing Campaign',
    'Create Google Ads Campaign',
    'Email Marketing Strategy',
    'Influencer Outreach Campaign',
    'Market Research Analysis',
    'Create Marketing Funnel',
    'Run Facebook Ads Campaign'
  ],
  other: [
    'Virtual Assistant for 1 Month',
    'Data Entry Project',
    'Translate Documents (English to French)',
    'Video Editing for YouTube',
    'Conduct User Research',
    'Create Business Plan',
    'Financial Analysis Report',
    'Customer Support (Part-time)'
  ]
};

const SKILLS_BY_CATEGORY: Record<TaskCategory, string[]> = {
  software: ['React', 'Node.js', 'Python', 'TypeScript', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker'],
  design: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'UI/UX', 'Sketch', 'Canva'],
  writing: ['Copywriting', 'Technical Writing', 'SEO', 'Content Strategy', 'Editing', 'Research'],
  marketing: ['SEO', 'Google Ads', 'Facebook Ads', 'Email Marketing', 'Analytics', 'Social Media'],
  other: ['Communication', 'Organization', 'Time Management', 'Microsoft Office', 'Data Entry']
};

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateTask(status: TaskStatus, index: number): Task {
  const category = getRandomElement<TaskCategory>(['software', 'design', 'writing', 'marketing', 'other']);
  const title = getRandomElement(TASK_TITLES[category]);
  const skills = getRandomElements(SKILLS_BY_CATEGORY[category], getRandomInt(2, 4));
  
  const now = new Date();
  const createdAt = new Date(now.getTime() - getRandomInt(1, 30) * 24 * 60 * 60 * 1000); // Up to 30 days ago
  const deadline = new Date(createdAt.getTime() + getRandomInt(7, 60) * 24 * 60 * 60 * 1000); // 7-60 days from creation
  
  let completedAt: Date | undefined;
  if (status === 'completed') {
    completedAt = new Date(createdAt.getTime() + getRandomInt(5, 30) * 24 * 60 * 60 * 1000);
  }

  const requirements = [
    `Must have experience with ${skills[0]}`,
    `Portfolio or previous work samples required`,
    `Available for ${getRandomInt(10, 40)} hours per week`,
    `Good communication skills in English`
  ];

  return {
    id: `task-${index + 1}`,
    title,
    description: `We are looking for an experienced professional to ${title.toLowerCase()}. This is a great opportunity to work on an exciting project with our team.`,
    category,
    budget: getRandomInt(50, 500) * 1000, // ₦50,000 - ₦500,000
    status,
    applicationsCount: status === 'draft' ? 0 : getRandomInt(0, 45),
    deadline,
    createdAt,
    completedAt,
    requirements,
    skills
  };
}

export function generateMockTasks(count: number = 20): Task[] {
  const tasks: Task[] = [];
  
  // Generate tasks with realistic distribution
  const activeCount = Math.floor(count * 0.4); // 40% active
  const completedCount = Math.floor(count * 0.35); // 35% completed
  const draftCount = count - activeCount - completedCount; // 25% draft
  
  // Generate active tasks
  for (let i = 0; i < activeCount; i++) {
    tasks.push(generateTask('active', tasks.length));
  }
  
  // Generate completed tasks
  for (let i = 0; i < completedCount; i++) {
    tasks.push(generateTask('completed', tasks.length));
  }
  
  // Generate draft tasks
  for (let i = 0; i < draftCount; i++) {
    tasks.push(generateTask('draft', tasks.length));
  }
  
  // Sort by creation date (newest first)
  return tasks.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function calculateDashboardStats(tasks: Task[]): DashboardStats {
  const active = tasks.filter(t => t.status === 'active');
  const completed = tasks.filter(t => t.status === 'completed');
  const totalApplications = tasks.reduce((sum, t) => sum + t.applicationsCount, 0);
  
  // Calculate average completion rate (tasks completed / total tasks posted excluding drafts)
  const postedTasks = tasks.filter(t => t.status !== 'draft');
  const avgCompletionRate = postedTasks.length > 0 
    ? Math.round((completed.length / postedTasks.length) * 100) 
    : 0;
  
  return {
    activeTasks: active.length,
    totalApplications,
    tasksCompleted: completed.length,
    avgCompletionRate
  };
}

export function generateMockUserProfile(): UserProfile {
  return {
    id: 'user-creator-001',
    name: 'XXXX',
    role: 'Software Engineer',
    location: 'Plot 45, Victoria Island, Lagos',
    phone: '+234 901 344 2356',
    joinedDate: new Date('2025-08-01'),
    rating: 4.9,
    totalTasksPosted: 47,
    avatar: undefined
  };
}

// Simulate API delay
export async function fetchTasks(): Promise<Task[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateMockTasks(20));
    }, 500); // 500ms delay to simulate network
  });
}

export async function fetchDashboardStats(tasks: Task[]): Promise<DashboardStats> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(calculateDashboardStats(tasks));
    }, 300);
  });
}

export async function fetchUserProfile(): Promise<UserProfile> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(generateMockUserProfile());
    }, 200);
  });
}