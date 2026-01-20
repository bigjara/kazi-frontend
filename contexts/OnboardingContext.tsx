'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the steps in the onboarding flow - role-selection comes AFTER success
export type OnboardingStep = 'register' | 'verify-email' | 'verify-code' | 'success' | 'role-selection';
export type RoleType = 'creator' | 'fulfiller' | null;

interface OnboardingContextType {
  currentStep: OnboardingStep;
  selectedRole?: RoleType;
  setSelectedRole: (role: RoleType) => void;
  email: string;
  userId: string | null;
  setStep: (step: OnboardingStep) => void;
  setEmail: (email: string) => void;
  setUserId: (id: string) => void;
  resetOnboarding: () => void; 
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('register');
  const [selectedRole, setSelectedRole] = useState<RoleType>(null);
  const [email, setEmailState] = useState<string>('');
  const [userId, setUserIdState] = useState<string | null>(null);

  const setStep = (step: OnboardingStep) => {
    setCurrentStep(step);
  };

  const setEmail = (newEmail: string) => {
    setEmailState(newEmail);
  };

  const setUserId = (id: string) => {
    setUserIdState(id);
  };

  const resetOnboarding = () => {
    setCurrentStep('register');
    setEmailState('');
    setUserIdState(null);
    setSelectedRole(null);
  };

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        email,
        userId,
        selectedRole,
        setSelectedRole,
        setStep,
        setEmail,
        setUserId,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}