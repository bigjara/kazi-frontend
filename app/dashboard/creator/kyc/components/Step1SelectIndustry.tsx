'use client';

import { Briefcase, Code, Palette, FileText, TrendingUp, ShoppingBag, Utensils, Heart, Building, User } from 'lucide-react';

interface Step1Props {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onNext: () => void;
}

const industries = [
  { value: 'logistics', label: 'Logistics & Delivery', icon: Briefcase, subtitle: 'Riders, Drivers, Logistics' },
  { value: 'technology', label: 'Technology & Development', icon: Code, subtitle: 'Software, IT, Digital Services' },
  { value: 'creative', label: 'Creative & Design', icon: Palette, subtitle: 'Graphics, Content, Media' },
  { value: 'education', label: 'Education & Training', icon: FileText, subtitle: 'Tutors, Instructors, Skill Training' },
  { value: 'professional', label: 'Professional Services', icon: TrendingUp, subtitle: 'Finance, Legal, Consulting' },
  { value: 'retail', label: 'Retail & Services', icon: ShoppingBag, subtitle: 'Store Staff, Customer Service, Repairs' },
  { value: 'food', label: 'Food & Catering', icon: Utensils, subtitle: 'Food Vendors, Chefs, Bakers' },
  { value: 'healthcare', label: 'Healthcare & Wellness', icon: Heart, subtitle: 'Graphics, Content, Media' },
];

export default function Step1SelectIndustry({ formData, updateFormData, onNext }: Step1Props) {
  const handleNext = () => {
    if (formData.industry && formData.accountType) {
      onNext();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Industry</h2>
        <p className="text-gray-600">Choose the industry where you want to find tasks and opportunities</p>
      </div>

      {/* Industry Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {industries.map((industry) => {
          const Icon = industry.icon;
          const isSelected = formData.industry === industry.value;
          
          return (
            <button
              key={industry.value}
              onClick={() => updateFormData('industry', industry.value)}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                isSelected
                  ? 'border-gray-900 bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${isSelected ? 'bg-gray-900' : 'bg-gray-100'}`}>
                  <Icon size={20} className={isSelected ? 'text-white' : 'text-gray-600'} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">{industry.label}</h3>
                  <p className="text-sm text-gray-600">{industry.subtitle}</p>
                </div>
                {isSelected && (
                  <div className="w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Account Type Selection */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Type</h2>
        <p className="text-gray-600 mb-6">Are you creating tasks as a business or as an individual?</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Business */}
          <button
            onClick={() => updateFormData('accountType', 'business')}
            className={`p-6 rounded-xl border-2 text-left transition-all ${
              formData.accountType === 'business'
                ? 'border-gray-900 bg-gray-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${formData.accountType === 'business' ? 'bg-gray-900' : 'bg-gray-100'}`}>
                <Building size={20} className={formData.accountType === 'business' ? 'text-white' : 'text-gray-600'} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">Business/Organization</h3>
                <p className="text-sm text-gray-600">Registered business, company or organization</p>
              </div>
              {formData.accountType === 'business' && (
                <div className="w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          </button>

          {/* Individual */}
          <button
            onClick={() => updateFormData('accountType', 'individual')}
            className={`p-6 rounded-xl border-2 text-left transition-all ${
              formData.accountType === 'individual'
                ? 'border-gray-900 bg-gray-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg ${formData.accountType === 'individual' ? 'bg-gray-900' : 'bg-gray-100'}`}>
                <User size={20} className={formData.accountType === 'individual' ? 'text-white' : 'text-gray-600'} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">Individual</h3>
                <p className="text-sm text-gray-600">Personal account, no business or organization</p>
              </div>
              {formData.accountType === 'individual' && (
                <div className="w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8 flex items-start gap-3">
        <svg className="w-5 h-5 text-gray-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-sm text-gray-700">
          Choose the industry that best matches your skills. You can add multiple skill areas in the next steps
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-200">
        <button
          disabled
          className="px-6 py-2.5 text-sm font-medium text-gray-400 bg-gray-100 rounded-lg cursor-not-allowed"
        >
          Back
        </button>
        
        <button
          onClick={handleNext}
          disabled={!formData.industry || !formData.accountType}
          className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-colors ${
            formData.industry && formData.accountType
              ? 'bg-gray-900 text-white hover:bg-gray-800'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}