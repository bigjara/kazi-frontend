/**
 * FILE PATH: components/dashboard/modals/AccountLockedModal.tsx
 * 
 * Modal shown when user account is locked
 * First step in the verification flow
 */

'use client';

import React, { JSX } from 'react';
import { X, Lock } from 'lucide-react';
import { useDashboardState } from '@/hooks/useDashboardState';

export default function AccountLockedModal(): JSX.Element {
  const { setCurrentModal } = useDashboardState();

  /**
   * Handle unlock button click
   * Opens the verify account modal
   */
  const handleUnlock = (): void => {
    setCurrentModal('verify');
  };

  /**
   * Handle close button (optional)
   * You might want to prevent closing or handle differently
   */
  const handleClose = (): void => {
    // Option 1: Do nothing (prevent closing)
    // return;
    
    // Option 2: Allow closing but stay locked
    // setCurrentModal(null);
    
    // For now, we'll prevent closing since account is locked
    return;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-[fadeIn_0.3s_ease-out]">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 relative">
        {/* Close button - uncomment if you want to allow closing */}
        {/* <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button> */}

        {/* Lock Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center">
            <Lock className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Content */}
        <h2 className="text-2xl font-bold text-center mb-3 text-gray-900">
          Account Locked
        </h2>
        <p className="text-gray-600 text-center mb-8 leading-relaxed">
          Your account is locked. Click below to unlock your documents and verify your business.
        </p>

        {/* Unlock Button */}
        <button
          onClick={handleUnlock}
          className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          Unlock Account
        </button>
      </div>
    </div>
  );
}

/**
 * USAGE:
 * This modal is automatically shown when currentModal === 'locked'
 * in app/dashboard/page.tsx
 * 
 * Flow: locked → verify
 */