'use client';

import { Briefcase, User, FileText, Edit2, CheckCircle } from 'lucide-react';

interface Step4Props {
  formData: any;
  onNext: () => void;
  onBack: () => void;
  goToStep: (step: number) => void;
}

export default function Step4Review({ formData, onNext, onBack, goToStep }: Step4Props) {
  const getIndustryLabel = (value: string) => {
    const industries: Record<string, string> = {
      logistics: 'Logistics & Delivery',
      technology: 'Technology & Development',
      creative: 'Creative & Design',
      education: 'Education & Training',
      professional: 'Professional Services',
      retail: 'Retail & Services',
      food: 'Food & Catering',
      healthcare: 'Healthcare & Wellness',
    };
    return industries[value] || value;
  };

  const getAccountTypeLabel = (value: string) => {
    return value === 'business' ? 'Business/Organization' : 'Individual';
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Information</h2>
        <p className="text-gray-600">Please review your details before submitting</p>
      </div>

      {/* Review Sections */}
      <div className="space-y-4">
        {/* Industry & Account Type */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Briefcase size={20} className="text-gray-600" />
              <h3 className="font-semibold text-gray-900">Industry & Account Type</h3>
            </div>
            <button
              onClick={() => goToStep(1)}
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              <Edit2 size={16} />
              Edit
            </button>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Industry:</span>
              <span className="text-gray-900 font-medium text-right">
                {getIndustryLabel(formData.industry)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Account Type:</span>
              <span className="text-gray-900 font-medium text-right">
                {getAccountTypeLabel(formData.accountType)}
              </span>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <User size={20} className="text-gray-600" />
              <h3 className="font-semibold text-gray-900">Profile Information</h3>
            </div>
            <button
              onClick={() => goToStep(2)}
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              <Edit2 size={16} />
              Edit
            </button>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="text-gray-900 font-medium text-right">
                {formData.firstName} {formData.lastName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="text-gray-900 font-medium text-right">
                {formData.email}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="text-gray-900 font-medium text-right">
                {formData.phoneNumber}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Location:</span>
              <span className="text-gray-900 font-medium text-right">
                {formData.city}, {formData.state}
              </span>
            </div>
          </div>
        </div>

        {/* Verification Documents */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText size={20} className="text-gray-600" />
              <h3 className="font-semibold text-gray-900">Verification Documents</h3>
            </div>
            <button
              onClick={() => goToStep(3)}
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              <Edit2 size={16} />
              Edit
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" />
              <span className="text-sm text-gray-900">Government ID</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" />
              <span className="text-sm text-gray-900">Utility Bill</span>
            </div>
          </div>
        </div>
      </div>

      {/* Consent */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6 flex items-start gap-3">
        <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p className="text-sm text-yellow-900">
          By submitting, you agree that all information provided is accurate and you consent to identity verification.
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-6 mt-8 border-t border-gray-200">
        <button
          onClick={onBack}
          className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Back
        </button>
        
        <button
          onClick={onNext}
          className="px-6 py-2.5 text-sm font-medium bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Submit for Verification
        </button>
      </div>
    </div>
  );
}