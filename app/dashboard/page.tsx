import React from 'react'

const page = () => {
  return (
    <div>
      
    </div>
  )
}

export default page


// /**
//  * FILE PATH: app/dashboard/page.tsx
//  * 
//  * Main dashboard page - ALL MODALS LIVE HERE
//  * Single page that shows different modals based on state
//  */

// 'use client';

// import React, { useEffect } from 'react';
// import { useDashboardState } from '@/hooks/useDashboardState';
// import DashboardContent from './DashboardContent';
// // import AccountLockedModal from '@/components/dashboard/modals/AccountLockedModal';
// // import VerifyAccountModal from '@/components/dashboard/modals/VerifyAccountModal';
// // import CompleteProfileModal from '@/components/dashboard/modals/CompleteProfileModal';
// // import IdentityDocumentsModal from '@/components/dashboard/modals/IdentityDocumentsModal';
// // import BusinessDocumentsModal from '@/components/dashboard/modals/BusinessDocumentsModal';
// // import UploadFailedModal from '@/components/dashboard/modals/UploadFailedModal';

// export default function DashboardPage(): JSX.Element {
//   const { currentModal, setCurrentModal } = useDashboardState();

//   /**
//    * Fetch user status on mount and set initial modal
//    * TODO: Replace with actual API call
//    */
//   useEffect(() => {
//     async function checkUserStatus() {
//       try {
//         // TODO: Uncomment when API is ready
//         // const response = await fetch('/api/user/status');
//         // const data = await response.json();
//         // 
//         // if (data.isLocked) {
//         //   setCurrentModal('locked');
//         // } else if (!data.kycComplete) {
//         //   setCurrentModal('verify');
//         // } else {
//         //   setCurrentModal('active');
//         // }

//         // For now, use the stored state or default to 'locked'
//         if (!currentModal) {
//           setCurrentModal('locked');
//         }
//       } catch (error) {
//         console.error('Error fetching user status:', error);
//         setCurrentModal('locked');
//       }
//     }

//     checkUserStatus();
//   }, [currentModal, setCurrentModal]);

//   return (
//     <div className="relative">
//       {/* Main Content - Deliveries Table (Always visible, gets blurred when modals open) */}
//       <DashboardContent />

//       {/* Modals - Conditionally rendered based on currentModal state */}
      
//       {/* 1. Account Locked Modal */}
//       {currentModal === 'locked' && <AccountLockedModal />}

//       {/* 2. Verify Account Modal */}
//       {currentModal === 'verify' && <VerifyAccountModal />}

//       {/* 3. Complete Profile Modal */}
//       {currentModal === 'complete-profile' && <CompleteProfileModal />}

//       {/* 4. Identity Documents Modal */}
//       {currentModal === 'identity-documents' && <IdentityDocumentsModal />}

//       {/* 5. Business Documents Modal */}
//       {currentModal === 'business-documents' && <BusinessDocumentsModal />}

//       {/* 6. Upload Failed Modal (Can appear from any upload modal) */}
//       {currentModal === 'upload-failed' && <UploadFailedModal />}

//       {/* When currentModal === 'active' or null, no modal is shown */}
//     </div>
//   );
// }

// /**
//  * MODAL FLOW:
//  * 
//  * 1. User lands on page
//  * 2. useEffect checks user status
//  * 3. Sets currentModal based on account state:
//  *    - 'locked' → Shows AccountLockedModal
//  *    - 'verify' → Shows VerifyAccountModal
//  *    - 'active' → No modal (full dashboard access)
//  * 
//  * 4. Each modal has buttons that call setCurrentModal() to switch states
//  * 
//  * EXAMPLE FLOW:
//  * locked → verify → complete-profile → verify (33%) → identity-documents → verify (66%) → business-documents → verify (100%) → active
//  */