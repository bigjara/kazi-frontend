'use client';

import { Lock, AlertCircle, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LockedDashboard() {
  const router = useRouter();

  const handleStartKYC = () => {
    router.push('/dashboard/creator/kyc');
  };

  return (
    <>
      {/* Backdrop with blur effect */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" />

      {/* Lock Overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          {/* Lock Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-yellow-50 rounded-full flex items-center justify-center shadow-lg">
              <Lock size={48} className="text-yellow-600" />
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-2xl p-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Account Verification Required
            </h1>
            <p className="text-gray-600 mb-8 text-lg">
              Complete your profile to unlock all features and start creating tasks
            </p>

            {/* Alert Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 flex items-start gap-3">
              <AlertCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <p className="text-sm font-medium text-blue-900 mb-1">
                  Why do we need this?
                </p>
                <p className="text-sm text-blue-700">
                  Account verification helps us maintain a safe and trusted platform for all users. Your information is encrypted and securely stored.
                </p>
              </div>
            </div>

            {/* Benefits List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-left">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Create Tasks</p>
                  <p className="text-xs text-gray-600">Post unlimited job opportunities</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Review Applications</p>
                  <p className="text-xs text-gray-600">Access qualified candidates</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Manage Payments</p>
                  <p className="text-xs text-gray-600">Secure transaction processing</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Track Progress</p>
                  <p className="text-xs text-gray-600">Monitor task completion</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleStartKYC}
              className="w-full md:w-auto px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Start Verification Process
            </button>

            <p className="text-xs text-gray-500 mt-4">
              Takes approximately 5-10 minutes to complete
            </p>
          </div>
        </div>
      </div>
    </>
  );
}