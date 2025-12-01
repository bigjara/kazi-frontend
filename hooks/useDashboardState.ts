/**
 * FILE PATH: hooks/useDashboardState.ts
 * 
 * Global state management for dashboard modals and KYC progress
 * Install: npm install zustand
 */

'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Types
export type ModalState = 
  | 'locked'
  | 'verify' 
  | 'complete-profile'
  | 'identity-documents'
  | 'business-documents'
  | 'upload-failed'
  | 'active'
  | null;

export interface KYCProgress {
  completeProfile: boolean;
  identityDocuments: boolean;
  businessDocuments: boolean;
}

interface DashboardState {
  // Current modal being displayed
  currentModal: ModalState;
  
  // KYC verification progress
  kycProgress: KYCProgress;
  
  // Error state for upload failures
  uploadError: {
    message: string;
    code: string;
    timestamp: string;
  } | null;

  // Previous modal (for back navigation)
  previousModal: ModalState;

  // Actions
  setCurrentModal: (modal: ModalState) => void;
  updateKYCProgress: (field: keyof KYCProgress, value: boolean) => void;
  setUploadError: (error: DashboardState['uploadError']) => void;
  goBack: () => void;
  resetState: () => void;
}

const initialState = {
  currentModal: 'locked' as ModalState,
  kycProgress: {
    completeProfile: false,
    identityDocuments: false,
    businessDocuments: false,
  },
  uploadError: null,
  previousModal: null as ModalState,
};

export const useDashboardState = create<DashboardState>()(
  persist(
    (set, get) => ({
      ...initialState,

      /**
       * Set the current modal to display
       */
      setCurrentModal: (modal: ModalState) => {
        const current = get().currentModal;
        set({ 
          currentModal: modal,
          previousModal: current,
        });
      },

      /**
       * Update KYC progress for a specific field
       */
      updateKYCProgress: (field: keyof KYCProgress, value: boolean) => {
        set((state) => ({
          kycProgress: {
            ...state.kycProgress,
            [field]: value,
          },
        }));

        // Check if all KYC steps are complete
        const progress = get().kycProgress;
        const allComplete = Object.values(progress).every(Boolean);
        
        if (allComplete) {
          set({ currentModal: 'active' });
        } else {
          // Return to verify modal after completing a step
          set({ currentModal: 'verify' });
        }
      },

      /**
       * Set upload error state
       */
      setUploadError: (error: DashboardState['uploadError']) => {
        set({ uploadError: error });
        if (error) {
          set({ currentModal: 'upload-failed' });
        }
      },

      /**
       * Go back to previous modal
       */
      goBack: () => {
        const previous = get().previousModal;
        if (previous) {
          set({ 
            currentModal: previous,
            previousModal: null,
          });
        } else {
          set({ currentModal: 'verify' });
        }
      },

      /**
       * Reset all state (for logout or testing)
       */
      resetState: () => {
        set(initialState);
      },
    }),
    {
      name: 'dashboard-storage', // localStorage key
    }
  )
);

/**
 * USAGE EXAMPLES:
 * 
 * 1. Get state and actions:
 * const { currentModal, kycProgress, setCurrentModal, updateKYCProgress } = useDashboardState();
 * 
 * 2. Open a specific modal:
 * setCurrentModal('verify');
 * 
 * 3. Mark a KYC step as complete:
 * updateKYCProgress('completeProfile', true);
 * 
 * 4. Set an error:
 * setUploadError({
 *   message: 'Failed to upload document',
 *   code: 'UPLOAD-ERR-001',
 *   timestamp: new Date().toISOString()
 * });
 * 
 * 5. Go back to previous modal:
 * goBack();
 * 
 * 6. Reset everything (on logout):
 * resetState();
 */