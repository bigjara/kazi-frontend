'use client';

import { X, Bell, Briefcase, Users, CheckCircle, Clock } from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';

interface Notification {
  id: string;
  type: 'application' | 'task_update' | 'payment' | 'system';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}

// Mock notifications for creator
const mockCreatorNotifications: Notification[] = [
  {
    id: '1',
    type: 'application',
    title: 'New Application Received',
    message: 'John Doe applied for "Senior Software Engineer" position',
    timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    read: false,
    actionUrl: '/dashboard/creator/tasks/TSK-2025-001/applications'
  },
  {
    id: '2',
    type: 'application',
    title: '5 New Applications',
    message: 'Your task "UI/UX Designer" received 5 new applications',
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    read: false,
    actionUrl: '/dashboard/creator/tasks/TSK-2025-002/applications'
  },
  {
    id: '3',
    type: 'task_update',
    title: 'Task Completed',
    message: 'Your task "Build React Dashboard" has been marked as completed',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    read: true,
    actionUrl: '/dashboard/creator/tasks/TSK-2025-003'
  },
  {
    id: '4',
    type: 'payment',
    title: 'Payment Processed',
    message: 'Payment of ₦250,000 has been processed for task completion',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    read: true,
    actionUrl: '/dashboard/creator/payments'
  },
  {
    id: '5',
    type: 'system',
    title: 'Account Verified',
    message: 'Your account has been successfully verified. You can now create tasks.',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    read: true
  }
];

export default function NotificationModal() {
  const { setShowNotificationModal } = useNotifications();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'application':
        return <Users size={20} className="text-blue-600" />;
      case 'task_update':
        return <Briefcase size={20} className="text-purple-600" />;
      case 'payment':
        return <CheckCircle size={20} className="text-green-600" />;
      case 'system':
        return <Bell size={20} className="text-orange-600" />;
      default:
        return <Bell size={20} className="text-gray-600" />;
    }
  };

  const getNotificationBgColor = (type: string) => {
    switch (type) {
      case 'application':
        return 'bg-blue-50';
      case 'task_update':
        return 'bg-purple-50';
      case 'payment':
        return 'bg-green-50';
      case 'system':
        return 'bg-orange-50';
      default:
        return 'bg-gray-50';
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const unreadCount = mockCreatorNotifications.filter(n => !n.read).length;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={() => setShowNotificationModal(false)}
      />

      {/* Modal */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-900 rounded-lg">
                <Bell size={20} className="text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
                {unreadCount > 0 && (
                  <p className="text-sm text-gray-500">{unreadCount} unread</p>
                )}
              </div>
            </div>
            <button
              onClick={() => setShowNotificationModal(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium">
              All
            </button>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
              Unread ({unreadCount})
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {mockCreatorNotifications.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {mockCreatorNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                    !notification.read ? 'bg-blue-50/30' : ''
                  }`}
                  onClick={() => {
                    if (notification.actionUrl) {
                      // Navigate to action URL
                      console.log('Navigate to:', notification.actionUrl);
                    }
                  }}
                >
                  <div className="flex gap-3">
                    <div className={`p-2 rounded-lg ${getNotificationBgColor(notification.type)} flex-shrink-0 h-fit`}>
                      {getNotificationIcon(notification.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-medium text-gray-900 text-sm">
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1"></div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Clock size={12} />
                        <span>{formatTimestamp(notification.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Bell size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No notifications yet
              </h3>
              <p className="text-sm text-gray-500">
                We'll notify you when something important happens
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {mockCreatorNotifications.length > 0 && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            <button className="w-full px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              Mark all as read
            </button>
          </div>
        )}
      </div>
    </>
  );
}