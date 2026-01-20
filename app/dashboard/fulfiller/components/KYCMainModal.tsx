import React from 'react';
import { X, User, FileText, Car, Check, AlertCircle, Clock, CheckCircle2 } from 'lucide-react';
import { useKYC } from '@/contexts/KycContext';
import ProfileModal from './kyc/profile/ProfileModal';
import IdentityModal from './kyc/identity/IdentityModal';
import VehicleModal from './kyc/vehicle/VehicleModal';

// Verification in Progress Modal
function VerificationProgressModal() {
  const { setShowKYCModal } = useKYC();

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative">
        <button 
          onClick={() => setShowKYCModal(false)}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-12 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
            <Clock className="w-10 h-10 text-gray-600" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Verification in Progress
          </h2>

          <p className="text-sm text-gray-600 leading-relaxed">
            Your documents are under review. We&apos;ll notify you once your account is unlocked.
          </p>
        </div>
      </div>
    </div>
  );
}

// Account Unlocked Modal
function AccountUnlockedModal() {
  const { setShowKYCModal } = useKYC();

  const handleProceedToDashboard = () => {
    setShowKYCModal(false);
    // Close modal and let the app navigate naturally
    // The accountLocked state is already false, so dashboard will be accessible
    window.location.reload(); // Or use your router navigation
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative">
        <button 
          onClick={handleProceedToDashboard}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-12 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-green-500 rounded-2xl flex items-center justify-center mb-6">
            <CheckCircle2 className="w-12 h-12 text-white" strokeWidth={2.5} />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Account Unlocked
          </h2>

          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            Congratulations! Your business account has been fully verified and is now active.
          </p>

          <div className="w-full bg-green-50 border border-green-200 rounded-xl p-4 mb-8">
            <div className="flex items-center gap-3 text-left">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
              <span className="text-sm text-green-700 font-medium">
                Account has been unlocked
              </span>
            </div>
          </div>

          <button
            onClick={handleProceedToDashboard}
            className="w-full py-3.5 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors text-sm font-semibold"
          >
            Proceed to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default function KYCMainModal() {
  const { 
    activePhase, 
    setActivePhase, 
    completion,
    hasError,
    setShowKYCModal,
    verificationStatus
  } = useKYC();

  // Show verification progress modal if verifying
  if (verificationStatus === 'verifying') {
    return <VerificationProgressModal />;
  }

  // Show account unlocked modal if verified
  if (verificationStatus === 'verified') {
    return <AccountUnlockedModal />;
  }

  // Calculate progress based on completed steps
  const completedSteps = Object.values(completion).filter(Boolean).length;
  const kycProgress = Math.round((completedSteps / 3) * 100);

  // Check if a phase is active (selected/clicked)
  const isPhaseActive = (phase: 'profile' | 'identity' | 'vehicle') => {
    return activePhase === phase;
  };

  // Get card styling based on state
  const getCardStyles = (phase: 'profile' | 'identity' | 'vehicle') => {
    // If phase is completed
    if (completion[phase]) {
      return 'border-green-200 bg-green-50';
    }
    // If phase has error
    if (hasError[phase]) {
      return 'border-red-200 bg-red-50';
    }
    // If phase is currently active/selected (clicked but not completed)
    if (isPhaseActive(phase)) {
      return 'border-gray-800 bg-gray-800';
    }
    // Default pending state
    return 'border-gray-200 bg-white hover:bg-gray-50';
  };

  // Get icon and text color based on state
  const getContentStyles = (phase: 'profile' | 'identity' | 'vehicle') => {
    if (isPhaseActive(phase) && !completion[phase]) {
      return {
        iconBg: 'bg-gray-700',
        iconColor: 'text-white',
        titleColor: 'text-white',
        subtitleColor: 'text-gray-300'
      };
    }
    if (completion[phase]) {
      return {
        iconBg: 'bg-green-100',
        iconColor: 'text-green-600',
        titleColor: 'text-gray-900',
        subtitleColor: 'text-green-600'
      };
    }
    if (hasError[phase]) {
      return {
        iconBg: 'bg-red-100',
        iconColor: 'text-red-600',
        titleColor: 'text-gray-900',
        subtitleColor: 'text-red-600'
      };
    }
    return {
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-600',
      titleColor: 'text-gray-900',
      subtitleColor: 'text-gray-500'
    };
  };

  // Get icon component
  const getIcon = (phase: 'profile' | 'identity' | 'vehicle') => {
    const styles = getContentStyles(phase);
    
    if (completion[phase]) {
      return <Check size={20} className={styles.iconColor} />;
    }
    if (hasError[phase]) {
      return <AlertCircle size={20} className={styles.iconColor} />;
    }
    
    const icons = {
      profile: <User size={20} className={styles.iconColor} />,
      identity: <FileText size={20} className={styles.iconColor} />,
      vehicle: <Car size={20} className={styles.iconColor} />
    };
    
    return icons[phase];
  };

  // Get subtitle text
  const getSubtitle = (phase: 'profile' | 'identity' | 'vehicle') => {
    if (completion[phase]) {
      return 'Completed';
    }
    if (hasError[phase]) {
      return 'Retry again';
    }
    
    const subtitles = {
      profile: 'Fill in your details',
      identity: 'Government-issued ID',
      vehicle: 'Vehicle information documents'
    };
    
    return subtitles[phase];
  };

  // Get progress indicator for each phase
  const getProgressIndicator = (phase: 'profile' | 'identity' | 'vehicle') => {
    if (completion[phase]) {
      return <Check size={14} className="text-green-600" />;
    }
    return <div className="w-3.5 h-3.5 rounded-full border-2 border-gray-300"></div>;
  };

  // Get progress label text color
  const getProgressLabelColor = (phase: 'profile' | 'identity' | 'vehicle') => {
    if (completion[phase]) {
      return 'text-gray-600';
    }
    return 'text-gray-400';
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {!activePhase && (
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative">
          {/* Close Button */}
          <button 
            onClick={() => setShowKYCModal(false)}
            className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition-colors z-10"
          >
            <X size={20} />
          </button>

          {/* Header Section */}
          <div className="p-6 pb-4">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Verify Your Account
            </h2>
            <p className="text-sm text-gray-500">
              Complete the following steps to unlock your dashboard
            </p>
          </div>

          {/* Progress Bar Section */}
          <div className="px-6 pb-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600">KYC Progress</span>
              <span className="text-xs font-bold text-gray-900">{kycProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gray-900 h-full rounded-full transition-all duration-500"
                style={{ width: `${kycProgress}%` }}
              />
            </div>
          </div>

          {/* Progress Labels */}
          <div className="px-6 pt-3 pb-4">
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                {getProgressIndicator('profile')}
                <span className={getProgressLabelColor('profile')}>Profile</span>
              </div>
              <div className="flex items-center gap-1.5">
                {getProgressIndicator('identity')}
                <span className={getProgressLabelColor('identity')}>Documents</span>
              </div>
              <div className="flex items-center gap-1.5">
                {getProgressIndicator('vehicle')}
                <span className={getProgressLabelColor('vehicle')}>Vehicle Information</span>
              </div>
            </div>
          </div>

          {/* Verification Steps Cards */}
          <div className="px-6 pb-6 space-y-3">
            {/* Complete Profile Card */}
            <button
              onClick={() => setActivePhase('profile')}
              className={`w-full border rounded-xl p-4 flex items-center transition-all ${getCardStyles('profile')}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-colors ${getContentStyles('profile').iconBg}`}>
                {getIcon('profile')}
              </div>
              <div className="flex-1 text-left">
                <h3 className={`text-sm font-semibold ${getContentStyles('profile').titleColor}`}>
                  Complete Profile
                </h3>
                <p className={`text-xs ${getContentStyles('profile').subtitleColor}`}>
                  {getSubtitle('profile')}
                </p>
              </div>
            </button>

            {/* Identity Documents Card */}
            <button
              onClick={() => setActivePhase('identity')}
              className={`w-full border rounded-xl p-4 flex items-center transition-all ${getCardStyles('identity')}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-colors ${getContentStyles('identity').iconBg}`}>
                {getIcon('identity')}
              </div>
              <div className="flex-1 text-left">
                <h3 className={`text-sm font-semibold ${getContentStyles('identity').titleColor}`}>
                  Identity Documents
                </h3>
                <p className={`text-xs ${getContentStyles('identity').subtitleColor}`}>
                  {getSubtitle('identity')}
                </p>
              </div>
            </button>

            {/* Vehicle Information Card */}
            <button
              onClick={() => setActivePhase('vehicle')}
              className={`w-full border rounded-xl p-4 flex items-center transition-all ${getCardStyles('vehicle')}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 transition-colors ${getContentStyles('vehicle').iconBg}`}>
                {getIcon('vehicle')}
              </div>
              <div className="flex-1 text-left">
                <h3 className={`text-sm font-semibold ${getContentStyles('vehicle').titleColor}`}>
                  Vehicle Information
                </h3>
                <p className={`text-xs ${getContentStyles('vehicle').subtitleColor}`}>
                  {getSubtitle('vehicle')}
                </p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Conditionally render phase modals */}
      {activePhase === 'profile' && <ProfileModal />}
      {activePhase === 'identity' && <IdentityModal />}
      {activePhase === 'vehicle' && <VehicleModal />}
    </div>
  );
}