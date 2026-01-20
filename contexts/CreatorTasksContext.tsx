'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import {
  Task,
  DashboardStats,
  UserProfile,
  TaskFilter,
  TaskStatus,
} from '@/types/task';
import {
  fetchTasks,
  fetchDashboardStats,
  fetchUserProfile,
} from '@/lib/mockTaskData';

interface CreatorTasksContextValue {
  // Data
  tasks: Task[];
  filteredTasks: Task[];
  stats: DashboardStats | null;
  userProfile: UserProfile | null;

  // UI State
  currentFilter: TaskFilter;
  isLoading: boolean;
  error: string | null;

  // Actions
  setCurrentFilter: (filter: TaskFilter) => void;
  refreshTasks: () => Promise<void>;
  createTask: (task: Omit<Task, 'id' | 'createdAt'>) => Promise<void>;
  updateTask: (taskId: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
}

const CreatorTasksContext = createContext<CreatorTasksContextValue | undefined>(
  undefined
);

interface CreatorTasksProviderProps {
  children: ReactNode;
}

export function CreatorTasksProvider({ children }: CreatorTasksProviderProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [currentFilter, setCurrentFilter] = useState<TaskFilter>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper to safely recalc stats from a given tasks array
  const recalcStats = useCallback(async (source: Task[]) => {
    const statsData = await fetchDashboardStats(source);
    setStats(statsData);
  }, []);

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter((task) => {
    switch (currentFilter) {
      case 'active':
        return task.status === 'active';
      case 'completed':
        return task.status === 'completed';
      case 'draft':
        return task.status === 'draft';
      case 'all':
      default:
        return true;
    }
  });

  // Initial data fetch
  const loadInitialData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const [tasksData, profileData] = await Promise.all([
        fetchTasks(),
        fetchUserProfile(),
      ]);

      setTasks(tasksData);
      setUserProfile(profileData);

      await recalcStats(tasksData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
      console.error('Error loading initial data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [recalcStats]);

  // Refresh tasks (can be called manually)
  const refreshTasks = useCallback(async () => {
    try {
      setError(null);
      const tasksData = await fetchTasks();
      setTasks(tasksData);

      await recalcStats(tasksData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh tasks');
      console.error('Error refreshing tasks:', err);
    }
  }, [recalcStats]);

  // Create a new task
  const createTask = useCallback(
    async (task: Omit<Task, 'id' | 'createdAt'>) => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        const newTask: Task = {
          ...task,
          id: `task-${Date.now()}`,
          createdAt: new Date(),
        };

        setTasks((prev) => {
          const updated = [newTask, ...prev];
          void recalcStats(updated);
          return updated;
        });
      } catch (err) {
        console.error('Error creating task:', err);
        throw err;
      }
    },
    [recalcStats]
  );

  // Update an existing task
  const updateTask = useCallback(
    async (taskId: string, updates: Partial<Task>) => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        setTasks((prev) => {
          const updated = prev.map((task) =>
            task.id === taskId ? { ...task, ...updates } : task
          );
          void recalcStats(updated);
          return updated;
        });
      } catch (err) {
        console.error('Error updating task:', err);
        throw err;
      }
    },
    [recalcStats]
  );

  // Delete a task
  const deleteTask = useCallback(
    async (taskId: string) => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        setTasks((prev) => {
          const updated = prev.filter((task) => task.id !== taskId);
          void recalcStats(updated);
          return updated;
        });
      } catch (err) {
        console.error('Error deleting task:', err);
        throw err;
      }
    },
    [recalcStats]
  );

  // Load initial data on mount
  useEffect(() => {
    void loadInitialData();
  }, [loadInitialData]);

  const value: CreatorTasksContextValue = {
    tasks,
    filteredTasks,
    stats,
    userProfile,
    currentFilter,
    isLoading,
    error,
    setCurrentFilter,
    refreshTasks,
    createTask,
    updateTask,
    deleteTask,
  };

  return (
    <CreatorTasksContext.Provider value={value}>
      {children}
    </CreatorTasksContext.Provider>
  );
}

export function useCreatorTasks() {
  const context = useContext(CreatorTasksContext);
  if (!context) {
    throw new Error('useCreatorTasks must be used within a CreatorTasksProvider');
  }
  return context;
}