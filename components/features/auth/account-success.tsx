'use client';

import { useRouter } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function AccountSuccess() {
  const router = useRouter();

  const handleGetStarted = () => {
    // Navigate to dashboard
    router.push('/dashboard'); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md text-center">
        {/* KAZI Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-12">KAZI</h1>

        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Outer circle with animation */}
            <div className="w-32 h-32 rounded-full bg-green-100 flex items-center justify-center animate-pulse">
              <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center">
                <CheckCircle2 className="w-16 h-16 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          Account created successfully!
        </h2>
        
        <p className="text-gray-600 mb-10">
          Welcome onboard! Start your success journey with KAZI
        </p>

        {/* Get Started Button */}
        <Link href="/dashboard" 
          onClick={handleGetStarted}
          className="w-full bg-gray-900 text-white py-3.5 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 shadow-sm"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
