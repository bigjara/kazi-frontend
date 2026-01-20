'use client';

import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const steps = [
  { number: 1, label: 'Select Industry' },
  { number: 2, label: 'Profile Details' },
  { number: 3, label: 'Verification' },
  { number: 4, label: 'Review' },
  { number: 5, label: 'Complete' },
];

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-8">
      {/* Progress Text */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-gray-700">
          Step {currentStep} of {totalSteps}
        </p>
        <p className="text-sm font-medium text-gray-700">
          {Math.round(progress)}% complete
        </p>
      </div>

      {/* Progress Bar */}
      <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-8">
        <div
          className="absolute top-0 left-0 h-full bg-gray-900 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step Indicators */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.number;
          const isCurrent = currentStep === step.number;
          
          return (
            <div key={step.number} className="flex flex-col items-center flex-1">
              {/* Circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                  isCompleted
                    ? 'bg-green-500 text-white'
                    : isCurrent
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {isCompleted ? (
                  <Check size={20} />
                ) : (
                  <span className="text-sm font-medium">{step.number}</span>
                )}
              </div>
              
              {/* Label */}
              <p
                className={`text-xs text-center ${
                  isCurrent ? 'font-medium text-gray-900' : 'text-gray-500'
                }`}
              >
                {step.label}
              </p>

              {/* Connector Line (except for last step) */}
              {index < steps.length - 1 && (
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10" style={{ width: `${100 / (steps.length - 1)}%`, left: `${(100 / (steps.length - 1)) * index}%` }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}