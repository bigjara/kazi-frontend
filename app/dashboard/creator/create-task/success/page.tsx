'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, CheckCircle2 } from 'lucide-react';

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if task data exists
    const savedData = localStorage.getItem('taskFormData');
    if (!savedData) {
      // If no data, redirect back to start
      router.push('/dashboard/creator/create-task');
    }
  }, [router]);

  const handleBackToDashboard = () => {
    // Clear the form data
    // localStorage.removeItem('taskFormData');
    // Navigate to dashboard
    router.push('/dashboard/creator');
  };

  const handleClose = () => {
    // Clear the form data
    localStorage.removeItem('taskFormData');
    // Navigate to dashboard
    router.push('/creator-dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-100/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-12 relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Success Content */}
        <div className="flex flex-col items-center text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-green-500 rounded-2xl flex items-center justify-center mb-8">
            <CheckCircle2 size={56} className="text-white" strokeWidth={2.5} />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Task Created
          </h1>
          
          <p className="text-lg text-gray-600 mb-12 max-w-md">
            Your task has been successfully created, and has been moved to active task.
          </p>

          {/* Back to Dashboard Button */}
          <button
            onClick={handleBackToDashboard}
            className="w-full max-w-md px-8 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}