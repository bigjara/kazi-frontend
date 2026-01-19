'use client';

import { CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface Step5Props {
  onComplete: () => void;
}

export default function Step5Complete({ onComplete }: Step5Props) {
  const router = useRouter();

  // Automatically complete KYC when this step is reached
  useEffect(() => {
    // Mark KYC as completed in localStorage
    localStorage.setItem('creator_kyc_status', 'completed');
    
    // Clear KYC form data as it's no longer needed
    localStorage.removeItem('creator_kyc_data');
    localStorage.removeItem('creator_kyc_current_step');
  }, []);

  const handleReturnHome = () => {
    onComplete();
    router.push('/dashboard/creator');
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      {/* Success Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center">
          <CheckCircle size={48} className="text-green-600" />
        </div>
      </div>

      {/* Heading */}
      <h2 className="text-3xl font-bold text-gray-900 mb-3">
        Verification Complete!
      </h2>
      <p className="text-gray-600 mb-8 text-lg">
        Your account has been successfully verified. You can now access all features and start creating tasks.
      </p>

      {/* What You Can Do Now */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
        <h3 className="font-semibold text-gray-900 mb-4">What you can do now:</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-900 font-medium">Create unlimited tasks</p>
              <p className="text-xs text-gray-600 mt-1">Post jobs and find qualified candidates</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-900 font-medium">Review applications</p>
              <p className="text-xs text-gray-600 mt-1">Access and manage candidate applications</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-900 font-medium">Manage payments</p>
              <p className="text-xs text-gray-600 mt-1">Secure transaction processing</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-gray-900 font-medium">Track your tasks</p>
              <p className="text-xs text-gray-600 mt-1">Monitor progress and completion</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={handleReturnHome}
        className="px-8 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
      >
        Go to Dashboard
      </button>

      <p className="text-xs text-gray-500 mt-4">
        Welcome aboard! Start creating your first task.
      </p>
    </div>
  );
}