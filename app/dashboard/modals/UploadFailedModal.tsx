/**
 * FILE PATH: components/dashboard/modals/UploadFailedModal.tsx
 * 
 * Error modal shown when document upload fails
 * Reused by all upload modals (Complete Profile, Identity Docs, Business Docs)
 */

'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { useDashboardState } from '@/hooks/useDashboardState';

export default function UploadFailedModal(): JSX.Element {
  const { uploadError, goBack, setUploadError } = useDashboardState();

  /**
   * Handle retry button
   * Returns to previous modal to try again
   */
  const handleRetry = (): void => {
    setUploadError(null);
    goBack();
  };

  /**
   * Handle contact support
   */
  const handleContactSupport = (): void => {
    // TODO: Implement support contact system
    // Options:
    // 1. Open email client
    window.location.href = 'mailto:support@example.com?subject=Upload Failed - ' + (uploadError?.code || 'ERROR');
    
    // 2. Open support chat
    // if (window.Intercom) window.Intercom('show');
    
    // 3. Navigate to support page
    // window.open('/support', '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-[fadeIn_0.3s_ease-out]">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-8">
        {/* Warning Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-3">Upload Failed</h2>
        
        {/* Error Message */}
        <p className="text-gray-600 text-center mb-6 leading-relaxed">
          {uploadError?.message || 
            'We encountered a technical issue while processing your business documents. This is a temporary system error on our end.'}
        </p>

        {/* What to Do Next */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h3 className="font-semibold mb-3 text-gray-900">What to Do Next</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
              <span>Check your internet connection and try uploading again</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
              <span>Ensure your documents are in the correct format (PDF, JPG, PNG)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
              <span>Verify that each file is under 10MB in size</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
              <span>If the problem persists, contact our support team</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleContactSupport}
            className="flex-1 py-3 border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:border-gray-800 hover:bg-gray-50 transition-all"
          >
            Contact Support
          </button>
          <button
            onClick={handleRetry}
            className="flex-1 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Retry Upload
          </button>
        </div>

        {/* Error Details */}
        <p className="text-xs text-gray-500 text-center mt-4">
          Error Code: {uploadError?.code || 'UPLOAD-FAILED-001'} • 
          Occurred on {uploadError?.timestamp || new Date().toLocaleString()}
        </p>
      </div>
    </div>
  );
}

/**
 * USAGE:
 * This modal is shown when currentModal === 'upload-failed'
 * 
 * Set error and show modal:
 * setUploadError({
 *   message: 'Failed to upload document',
 *   code: 'UPLOAD-ERR-001',
 *   timestamp: new Date().toISOString()
 * });
 * 
 * Modal automatically opens and user can retry or contact support
 */