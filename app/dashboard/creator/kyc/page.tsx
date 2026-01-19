'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, X } from 'lucide-react';
import { useKYCForm } from './hooks/useKYCForm';
import ProgressBar from './components/ProgressBar';
import Step1SelectIndustry from './components/Step1SelectIndustry';
import Step2ProfileDetails from './components/Step2ProfileDetails';
import Step3Verification from './components/Step3Verification';
import Step4Review from './components/Step4Review';
import Step5Complete from './components/Step5Complete';

export default function KYCPage() {
  const router = useRouter();
  const {
    currentStep,
    formData,
    isLoading,
    updateFormData,
    nextStep,
    prevStep,
    goToStep,
    completeKYC,
    getProgress,
  } = useKYCForm();

  const handleBack = () => {
    router.push('/dashboard/creator');
  };

  const handleComplete = async () => {
    const success = await completeKYC();
    if (success) {
      router.push('/dashboard/creator');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1SelectIndustry
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
          />
        );
      case 2:
        return (
          <Step2ProfileDetails
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 3:
        return (
          <Step3Verification
            formData={formData}
            updateFormData={updateFormData}
            onNext={nextStep}
            onBack={prevStep}
          />
        );
      case 4:
        return (
          <Step4Review
            formData={formData}
            onNext={nextStep}
            onBack={prevStep}
            goToStep={goToStep}
          />
        );
      case 5:
        return <Step5Complete onComplete={handleComplete} />;
      default:
        return null;
    }
  };

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
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Verification</h1>
          <p className="text-gray-600">
            Complete your profile to unlock all features and start creating tasks
          </p>
        </div>

        {/* Progress Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-blue-900 mb-1">
              Verification in progress
            </p>
            <p className="text-sm text-blue-700">
              Your progress is automatically saved. You can sign out and continue later.
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} totalSteps={5} />

        {/* Step Content */}
        <div className="mt-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Submitting verification...</p>
              </div>
            </div>
          ) : (
            renderStep()
          )}
        </div>
      </div>
    </div>
  );
}