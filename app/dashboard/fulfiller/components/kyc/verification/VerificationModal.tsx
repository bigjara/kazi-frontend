import React, { useState, useEffect } from 'react';
import { X, Clock, CheckCircle2 } from 'lucide-react';

// Mock KYC Context
const useKYC = () => {
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'verified'>('idle');
  const [showKYCModal, setShowKYCModal] = useState(true);
  
  return {
    verificationStatus,
    setVerificationStatus,
    showKYCModal,
    setShowKYCModal
  };
};

// Verification in Progress Modal
function VerificationProgressModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="p-12 flex flex-col items-center text-center">
          {/* Clock Icon */}
          <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
            <Clock className="w-10 h-10 text-gray-600" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Verification in Progress
          </h2>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed">
            Your documents are under review. We&apos;ll notify you once your account is unlocked.
          </p>
        </div>
      </div>
    </div>
  );
}

// Account Unlocked Modal
function AccountUnlockedModal({ onProceed }: { onProceed: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative">
        {/* Close Button */}
        <button 
          onClick={onProceed}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Content */}
        <div className="p-12 flex flex-col items-center text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-500 rounded-2xl flex items-center justify-center mb-6">
            <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={2.5} />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Account Unlocked
          </h2>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            Congratulations! Your business account has been fully verified and is now active.
          </p>

          {/* Success Message Box */}
          <div className="w-full bg-green-50 border border-green-200 rounded-xl p-4 mb-8">
            <div className="flex items-center gap-3 text-left">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-sm text-green-700 font-medium">
                Account has been unlocked
              </span>
            </div>
          </div>

          {/* Proceed Button */}
          <button
            onClick={onProceed}
            className="w-full py-3.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-semibold"
          >
            Proceed to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Demo Component
export default function VerificationModalsDemo() {
  const { verificationStatus, setVerificationStatus, setShowKYCModal } = useKYC();
  const [currentModal, setCurrentModal] = useState<'progress' | 'unlocked' | null>('progress');

  // Simulate verification process
  useEffect(() => {
    if (currentModal === 'progress') {
      // Simulate backend verification (3 seconds)
      const timer = setTimeout(() => {
        setCurrentModal('unlocked');
        setVerificationStatus('verified');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [currentModal, setVerificationStatus]);

  const handleProceedToDashboard = () => {
    setCurrentModal(null);
    setShowKYCModal(false);
    // Navigate to dashboard
    console.log('Proceeding to dashboard...');
  };

  const handleCloseProgress = () => {
    setCurrentModal(null);
    setShowKYCModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Demo Controls */}
      <div className="fixed top-4 left-4 bg-white rounded-lg shadow-lg p-4 space-y-2">
        <h3 className="font-semibold text-sm mb-3">Demo Controls</h3>
        <button
          onClick={() => setCurrentModal('progress')}
          className="block w-full text-left px-3 py-2 text-sm bg-blue-50 hover:bg-blue-100 rounded"
        >
          Show Progress Modal
        </button>
        <button
          onClick={() => setCurrentModal('unlocked')}
          className="block w-full text-left px-3 py-2 text-sm bg-green-50 hover:bg-green-100 rounded"
        >
          Show Unlocked Modal
        </button>
        <button
          onClick={() => setCurrentModal(null)}
          className="block w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded"
        >
          Close All
        </button>
      </div>

      {/* Modals */}
      {currentModal === 'progress' && (
        <VerificationProgressModal onClose={handleCloseProgress} />
      )}

      {currentModal === 'unlocked' && (
        <AccountUnlockedModal onProceed={handleProceedToDashboard} />
      )}

      {/* Background Content */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Verification Modals Demo
        </h1>
        <p className="text-gray-600">
          Use the controls on the left to test the modals
        </p>
      </div>
    </div>
  );
}