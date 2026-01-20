'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, AlertTriangle, Clock, X } from 'lucide-react';
import { useEffect, useState } from 'react';

type VerificationStatus = 'pending' | 'approved' | 'failed';

export default function VerificationStatusPage() {
  const router = useRouter();
  const [status, setStatus] = useState<VerificationStatus>('pending');

  useEffect(() => {
    // Check status from localStorage or API
    const kycStatus = localStorage.getItem('creator_kyc_verification_status');
    if (kycStatus) {
      setStatus(kycStatus as VerificationStatus);
    }
  }, []);

  const handleBack = () => {
    router.push('/dashboard/creator');
  };

  const handleContactSupport = () => {
    // Navigate to support or open support modal
    console.log('Contact support');
  };

  const handleCheckAgain = () => {
    // Refresh status
    window.location.reload();
  };

  const renderPendingStatus = () => (
    <div className="max-w-2xl mx-auto text-center">
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 bg-yellow-50 rounded-full flex items-center justify-center">
          <Clock size={48} className="text-yellow-600" />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mb-3">Verification Pending</h2>
      <p className="text-gray-600 mb-8 text-lg">
        Thank you for your patience! Your documents have been submitted and are currently under review.
      </p>

      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <button
            onClick={handleContactSupport}
            className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Contact Support
          </button>
          
          <button
            onClick={handleCheckAgain}
            className="px-6 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Check Status Again
          </button>
        </div>

        <p className="text-xs text-gray-500">
          You will receive email notification once approved.
        </p>
      </div>
    </div>
  );

  const renderFailedStatus = () => (
    <div className="max-w-2xl mx-auto text-center">
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center">
          <X size={48} className="text-red-600" />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-gray-900 mb-3">Verification Failed</h2>
      <p className="text-gray-600 mb-8 text-lg">
        Unfortunately, we were unable to verify your account. Please address the specific issues below and re-submit your documents.
      </p>

      <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8 text-left">
        <h3 className="font-semibold text-gray-900 mb-3">Issues found:</h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2 text-sm text-gray-700">
            <span className="text-blue-600">•</span>
            Name doesn't match the documents submitted
          </li>
          <li className="flex items-start gap-2 text-sm text-gray-700">
            <span className="text-blue-600">•</span>
            Photos of ID were blurry or cropped
          </li>
          <li className="flex items-start gap-2 text-sm text-gray-700">
            <span className="text-blue-600">•</span>
            ID documents were expired
          </li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={handleContactSupport}
          className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Contact Support
        </button>
        
        <button
          onClick={() => router.push('/dashboard/creator/kyc/resubmit')}
          className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
        >
          Re-submit Documents
        </button>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        You will be notified once a decision has been made after re-submission
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to home
            </button>

            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Verification Status</h1>
        <p className="text-gray-600 mb-12">
          {status === 'pending' ? 'Your account is under review' : 'Your account requires attention'}
        </p>

        {status === 'pending' && renderPendingStatus()}
        {status === 'failed' && renderFailedStatus()}
      </div>
    </div>
  );
}