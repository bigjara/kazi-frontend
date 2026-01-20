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
  Delivery,
  DashboardStats,
  UserProfile,
  DeliveryFilter,
  DeliveryStatus, 
} from '@/types/delivery';
import {
  fetchDeliveries,
  fetchDashboardStats,
  fetchUserProfile,
} from '@/lib/mockData';

interface DeliveryContextValue {
  // Data
  deliveries: Delivery[];
  filteredDeliveries: Delivery[];
  stats: DashboardStats | null;
  userProfile: UserProfile | null;

  // UI State
  currentFilter: DeliveryFilter;
  isLoading: boolean;
  error: string | null;
  showBrowseView: boolean;

  // Actions
  setCurrentFilter: (filter: DeliveryFilter) => void;
  setShowBrowseView: (show: boolean) => void;
  refreshDeliveries: () => Promise<void>;
  acceptDelivery: (deliveryId: string) => Promise<void>;
  completeDelivery: (deliveryId: string) => Promise<void>;
}

const DeliveryContext = createContext<DeliveryContextValue | undefined>(
  undefined
);

interface DeliveryProviderProps {
  children: ReactNode;
}

export function DeliveryProvider({ children }: DeliveryProviderProps) {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [currentFilter, setCurrentFilter] = useState<DeliveryFilter>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showBrowseView, setShowBrowseView] = useState(false);

  // Helper to safely recalc stats from a given deliveries array
  const recalcStats = useCallback(async (source: Delivery[]) => {
    const statsData = await fetchDashboardStats(source);
    setStats(statsData);
  }, []);

  // Filter deliveries based on current filter
 const filteredDeliveries = deliveries.filter((delivery) => {
  switch (currentFilter) {
    case 'available':
      return delivery.status === 'pending';
    case 'active':
      return delivery.status === 'active';
    case 'completed':
      return delivery.status === 'completed';
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

      const [deliveriesData, profileData] = await Promise.all([
        fetchDeliveries(),
        fetchUserProfile(),
      ]);

      setDeliveries(deliveriesData);
      setUserProfile(profileData);

      await recalcStats(deliveriesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
      console.error('Error loading initial data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [recalcStats]);

  // Refresh deliveries (can be called manually)
  const refreshDeliveries = useCallback(async () => {
    try {
      setError(null);
      const deliveriesData = await fetchDeliveries();
      setDeliveries(deliveriesData);

      await recalcStats(deliveriesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to refresh deliveries');
      console.error('Error refreshing deliveries:', err);
    }
  }, [recalcStats]);

  // Accept a delivery (change status from pending to active)
  const acceptDelivery = useCallback(
    async (deliveryId: string) => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Compute updated array from previous state to avoid stale closures
        setDeliveries((prev) => {
          const updated = prev.map((delivery) =>
            delivery.id === deliveryId
              ? {
                  ...delivery,
                  status: 'Active' as DeliveryStatus,
                  acceptedAt: new Date(),
                }
              : delivery
          );

          // Fire-and-forget stats recalculation based on updated array
          void recalcStats(updated);
          return updated;
        });
      } catch (err) {
        console.error('Error accepting delivery:', err);
        throw err;
      }
    },
    [recalcStats]
  );

  // Complete a delivery (change status from active to completed)
  const completeDelivery = useCallback(
    async (deliveryId: string) => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        setDeliveries((prev) => {
          const updated = prev.map((delivery) =>
            delivery.id === deliveryId
              ? {
                  ...delivery,
                  status: 'Completed' as DeliveryStatus,
                  completedAt: new Date(),
                }
              : delivery
          );

          void recalcStats(updated);
          return updated;
        });
      } catch (err) {
        console.error('Error completing delivery:', err);
        throw err;
      }
    },
    [recalcStats]
  );

  // Load initial data on mount
  useEffect(() => {
    void loadInitialData();
  }, [loadInitialData]);

  const value: DeliveryContextValue = {
    deliveries,
    filteredDeliveries,
    stats,
    userProfile,
    currentFilter,
    isLoading,
    error,
    showBrowseView,
    setCurrentFilter,
    setShowBrowseView,
    refreshDeliveries,
    acceptDelivery,
    completeDelivery,
  };

  return (
    <DeliveryContext.Provider value={value}>
      {children}
    </DeliveryContext.Provider>
  );
}

export function useDelivery() {
  const context = useContext(DeliveryContext);
  if (!context) {
    throw new Error('useDelivery must be used within a DeliveryProvider');
  }
  return context;
}