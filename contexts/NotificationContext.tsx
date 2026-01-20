'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Notification {
  id: string;
  type: 'new_delivery' | 'accepted' | 'completed' | 'declined';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  orderId?: string;
  amount?: number;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  showNotificationModal: boolean;
  setShowNotificationModal: (show: boolean) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  // Load notifications from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('notifications');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Convert timestamp strings back to Date objects
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const withDates = parsed.map((n: any) => ({
            ...n,
            timestamp: new Date(n.timestamp)
          }));
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setNotifications(withDates);
        } catch (error) {
          console.error('Error loading notifications:', error);
        }
      } else {
        // Add some demo notifications for testing
        setNotifications([
          {
            id: '1',
            type: 'new_delivery',
            title: 'New Delivery Available',
            message: 'A new delivery task (ORD-2025-007) is available near your location. Earnings: ₦3,500',
            timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 mins ago
            isRead: false,
            orderId: 'ORD-2025-007',
            amount: 3500
          },
          {
            id: '2',
            type: 'accepted',
            title: 'Delivery Accepted',
            message: 'You have successfully accepted delivery ORD-2025-002. Navigate to pickup location.',
            timestamp: new Date(Date.now() - 18 * 60 * 1000), // 18 mins ago
            isRead: false,
            orderId: 'ORD-2025-002'
          },
          {
            id: '3',
            type: 'completed',
            title: 'Delivery Completed',
            message: 'Congratulations! Payment received for order ORD-2025-003. ₦4,500 has been added to your wallet.',
            timestamp: new Date(Date.now() - 61 * 60 * 1000), // 1 hour ago
            isRead: false,
            orderId: 'ORD-2025-003',
            amount: 4500
          },
          {
            id: '4',
            type: 'new_delivery',
            title: 'New Delivery Available',
            message: 'A new delivery task (ORD-2025-007) is available near your location. Earnings: ₦3,500',
            timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 mins ago
            isRead: false,
            orderId: 'ORD-2025-007',
            amount: 3500
          },
          {
            id: '5',
            type: 'new_delivery',
            title: 'New Delivery Available',
            message: 'A new delivery task (ORD-2025-007) is available near your location. Earnings: ₦3,500',
            timestamp: new Date(Date.now() - 3 * 60 * 1000), // 3 mins ago
            isRead: false,
            orderId: 'ORD-2025-007',
            amount: 3500
          },
          {
            id: '6',
            type: 'declined',
            title: 'Delivery Declined',
            message: 'Delivery ORD-2025-006 has been declined by the customer.',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
            isRead: false,
            orderId: 'ORD-2025-006'
          }
        ]);
      }
    }
  }, []);

  // Save to localStorage whenever notifications change
  useEffect(() => {
    if (typeof window !== 'undefined' && notifications.length > 0) {
      localStorage.setItem('notifications', JSON.stringify(notifications));
    }
  }, [notifications]);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, isRead: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, isRead: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'isRead'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      isRead: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        showNotificationModal,
        setShowNotificationModal,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        addNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context || context === undefined) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
}