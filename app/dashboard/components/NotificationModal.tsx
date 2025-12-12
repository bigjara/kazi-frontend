import React from 'react';
import { X, Bell, Trash2 } from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';

// Helper function to get time ago
const getTimeAgo = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins} mins ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
};

// Get notification icon and color based on type
const getNotificationStyle = (type: string) => {
  switch (type) {
    case 'new_delivery':
      return {
        bgColor: 'bg-blue-50',
        iconColor: 'text-blue-600',
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        )
      };
    case 'accepted':
      return {
        bgColor: 'bg-yellow-50',
        iconColor: 'text-yellow-600',
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      };
    case 'completed':
      return {
        bgColor: 'bg-green-50',
        iconColor: 'text-green-600',
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      };
    case 'declined':
      return {
        bgColor: 'bg-red-50',
        iconColor: 'text-red-600',
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      };
    default:
      return {
        bgColor: 'bg-gray-50',
        iconColor: 'text-gray-600',
        icon: <Bell className="w-5 h-5" />
      };
  }
};

export default function NotificationModal() {
  const { 
    notifications, 
    unreadCount,
    setShowNotificationModal,
    markAllAsRead,
    deleteNotification,
    markAsRead
  } = useNotifications();

  const handleNotificationClick = (id: string) => {
    markAsRead(id);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-start justify-center z-50 p-4 pt-20">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[calc(100vh-8rem)] flex flex-col relative">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white rounded-t-2xl z-10">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-gray-900" />
            <h2 className="text-base font-semibold text-gray-900">Notifications</h2>
            {unreadCount > 0 && (
              <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-gray-600 hover:text-gray-900 font-medium px-3 py-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Mark as read
              </button>
            )}
            <button
              onClick={() => setShowNotificationModal(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Subtitle */}
        <div className="px-4 pt-2 pb-3 border-b border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-600">Stay updated with your deliveries</p>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            // Empty State
            <div className="flex flex-col items-center justify-center py-16 px-6">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Bell className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-base font-semibold text-gray-900 mb-2">No Notifications</h3>
              <p className="text-sm text-gray-500 text-center">
                You&apos;re all caught up! New notifications will appear here.
              </p>
            </div>
          ) : (
            // Notifications List
            <div className="divide-y divide-gray-100">
              {notifications.map((notification) => {
                const style = getNotificationStyle(notification.type);
                return (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification.id)}
                    className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                      !notification.isRead ? 'bg-blue-50/30' : ''
                    }`}
                  >
                    <div className="flex gap-3">
                      {/* Icon */}
                      <div className={`w-10 h-10 rounded-full ${style.bgColor} flex items-center justify-center flex-shrink-0 ${style.iconColor}`}>
                        {style.icon}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                            {notification.title}
                            {!notification.isRead && (
                              <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                            )}
                          </h3>
                          <span className="text-xs text-gray-500 whitespace-nowrap">
                            {getTimeAgo(notification.timestamp)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {notification.message}
                        </p>
                      </div>

                      {/* Delete Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                        className="text-gray-400 hover:text-red-600 transition-colors p-1 flex-shrink-0"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}