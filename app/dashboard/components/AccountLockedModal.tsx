'use client';

import { useKYC } from '@/contexts/KycContext';
import { Lock } from 'lucide-react';

export default function AccountLockedModal() {
  const { setShowKYCModal } = useKYC();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <Lock className="w-10 h-10 text-red-600" />
          </div>
          
          <h2 className="text-2xl font-bold mb-3">Account Locked</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Your account is locked because you haven&apos;t completed your KYC verification. 
            Complete all required sections to unlock your account.
          </p>
          
          <button
            onClick={() => setShowKYCModal(true)}
            className="w-full bg-black text-white py-3.5 px-6 rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Start Verification
          </button>
        </div>
      </div>
    </div>
  );
}