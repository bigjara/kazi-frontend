'use client';

import { useKYC } from '@/contexts/KycContext';
import { useNotifications } from '@/contexts/NotificationContext';
import { useDelivery } from '@/contexts/DeliveryContext';
import AccountLockedModal from './components/AccountLockedModal';
import KYCMainModal from './components/KYCMainModal';
import NotificationModal from './components/NotificationModal';
import DashboardHeader from '../fulfiller/components/DashboardHeader';
import ProfileSidebar from './components/ProfileSidebar';
import StatsCards from './components/StatsCards';
import EmptyDeliveriesState from './components/EmptyDeliveriesState';
import DeliveriesTable from './components/DeliveriesTable';

export default function DashboardPage() {
  const { accountLocked, showKYCModal, isLoading: kycLoading } = useKYC();
  const { unreadCount, setShowNotificationModal, showNotificationModal } = useNotifications();
  const { 
    isLoading: deliveryLoading, 
    showBrowseView, 
    setShowBrowseView,
    stats,
    userProfile,
    filteredDeliveries
  } = useDelivery();

  // Show loading state while any critical data is loading
  if (kycLoading || deliveryLoading) {
    return (
      <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <div className="text-gray-600">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  const hasDeliveries = filteredDeliveries.length > 0;

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

              {/* Conditional Rendering based on browse view */}
              {!showBrowseView && !hasDeliveries ? (
                <EmptyDeliveriesState onBrowseClick={() => setShowBrowseView(true)} />
              ) : (
                <DeliveriesTable />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals - Appear on top of everything */}
      {accountLocked && !showKYCModal && <AccountLockedModal />}
      {showKYCModal && <KYCMainModal />}
      {showNotificationModal && <NotificationModal />}
    </>
  );
}