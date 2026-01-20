'use client';

import Image from 'next/image';
import { OnboardingProvider, useOnboarding } from '@/contexts/OnboardingContext';
import RegisterForm from '@/components/features/auth/register-form';
import VerifyCode from '@/components/features/auth/verify-code';
import RoleSelection from '@/components/features/auth/role-selection';
import AccountSuccess from '@/components/features/auth/account-success';

function RegisterContent() {
  const { currentStep } = useOnboarding();

  // Success screen - full screen, then auto-navigates to role-selection
  if (currentStep === 'success') {
    return <AccountSuccess />;
  }

  // Role selection - full screen
  if (currentStep === 'role-selection') {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <RoleSelection />
        </div>
      </div>
    );
  }

  // Split screen layout for register and verify steps
  const renderStep = () => {
    switch (currentStep) {
      case 'register':
        return <RegisterForm />;
      case 'verify-code':
        return <VerifyCode />;
      default:
        return <RegisterForm />;
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <Image 
          className="w-full h-full object-cover"
          alt="Auth Image"
          src="/images/auth_image.png"
          fill
          priority
          quality={100}
          style={{ objectFit: 'cover' }}
        />
        
        <div className="relative z-10 flex flex-col justify-between p-12 lg:p-16 xl:p-20 text-white w-full">
          <div className="flex-1 flex items-center">
            <div className="max-w-lg absolute top-20">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight drop-shadow-lg text-center">
                Welcome to KAZI
              </h1>
              <p className="text-xl lg:text-2xl text-white leading-relaxed drop-shadow-md text-center">
                Connecting you to endless possibilities.
              </p>
            </div>
          </div>

          <div className="max-w-lg text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight drop-shadow-lg">
              Effortless Connections
            </h2>
            <p className="text-lg lg:text-xl text-white drop-shadow-md">
              Secure, fast, reliable.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-gray-50">
        <div className="w-full max-w-md">
          {renderStep()}
        </div>
      </div>

      <div className="lg:hidden absolute top-0 left-0 right-0 p-6 text-center bg-gradient-to-b from-gray-900/10 to-transparent pointer-events-none z-10">
        <h2 className="text-2xl font-bold text-gray-900">KAZI</h2>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <OnboardingProvider>
      <RegisterContent />
    </OnboardingProvider>
  );
}