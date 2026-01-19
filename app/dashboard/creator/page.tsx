'use client';

import { useEffect, useState } from 'react';
import { useNotifications } from '@/contexts/NotificationContext';
import { useCreatorTasks } from '@/contexts/CreatorTasksContext';
import NotificationModal from './modals/NotificationModal';
import DashboardHeader from './components/DashboardHeader';
import ProfileSidebar from './components/ProfileSidebar';
import StatsCards from './components/StatsCards';
import EmptyTasksState from './components/EmptyTasksState';
import TasksTable from './components/TasksTable';
import LockedDashboard from './components/LockedDashboard';

export default function CreatorDashboardPage() {
  const { unreadCount, setShowNotificationModal, showNotificationModal } = useNotifications();
  const { 
    isLoading,
    stats,
    userProfile,
    filteredTasks
  } = useCreatorTasks();

  const [isKYCCompleted, setIsKYCCompleted] = useState(false);

  // Check KYC status from localStorage
  useEffect(() => {
    const kycStatus = localStorage.getItem('creator_kyc_status');
    setIsKYCCompleted(kycStatus === 'completed');
  }, []);

  // Show loading state while any critical data is loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-gray-600">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  const hasTasks = filteredTasks.length > 0;

  return (
    <>
      <div className="min-h-screen bg-[#F7F8FA]">
        <DashboardHeader 
          unreadCount={unreadCount}
          onNotificationClick={() => setShowNotificationModal(true)}
          userProfile={userProfile}
        />

        {/* Main Content Area */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar - Profile Card */}
            <div className="lg:col-span-3 xl:col-span-2">
              <ProfileSidebar userProfile={userProfile} />
            </div>

            {/* Right Content Area */}
            <div className="lg:col-span-9 xl:col-span-10 space-y-6">
              <StatsCards stats={stats} />

              {/* Conditional Rendering based on tasks */}
              {!hasTasks ? (
                <EmptyTasksState />
              ) : (
                <TasksTable />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lock Overlay - Shows on top of dashboard when KYC not completed */}
      {!isKYCCompleted && <LockedDashboard />}

      {/* Modals */}
      {showNotificationModal && <NotificationModal />}
    </>
  );
}