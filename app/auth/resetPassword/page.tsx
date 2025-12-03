'use client';

import React, { useState, useEffect, useCallback, JSX } from 'react';
import { Shield, CheckCircle2 } from 'lucide-react';

export default function PasswordResetFlow(): JSX.Element {
  // State management
  const [currentPage, setCurrentPage] = useState<'reset' | 'check'>('reset');
  const [email, setEmail] = useState<string>('');
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(0);
  const [showTryAgainText, setShowTryAgainText] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  /**
   * Validates email format using regex pattern
   * Updates isValidEmail state when email changes
   */
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(email));
    // Clear error when user starts typing
    if (error) setError('');
  }, [email, error]);

  /**
   * Countdown timer for resend functionality
   * Decrements every second and shows "try again" text when countdown reaches 0
   */
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !showTryAgainText) {
      setShowTryAgainText(true);
    }
  }, [countdown, showTryAgainText]);

  /**
   * API call to send password reset email
   * @param emailAddress - The user's email address
   * @returns Promise<boolean> - Success status
   */
  const sendPasswordResetEmail = async (emailAddress: string): Promise<boolean> => {
    try {
      // TODO: Replace with your actual API endpoint
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailAddress }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to send reset email');
      }

      return true;
    } catch (err) {
      console.error('Error sending password reset email:', err);
      throw err;
    }
  };

  /**
   * Handles the continue button click
   * Sends password reset email and navigates to check email page
   */
//   const handleContinue = async (): Promise<void> => {
//     if (!isValidEmail) return;

//     setIsLoading(true);
//     setError('');

//     try {
//       await sendPasswordResetEmail(email);
//       setCurrentPage('check');
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

  const handleContinue = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage('check');
      setIsTransitioning(false);
    }, 300);
  };

  /**
   * Handles try again button click
   * Hides the text and starts 2-minute countdown
   */
  const handleTryAgain = useCallback((): void => {
    setShowTryAgainText(false);
    setCountdown(120); // 2 minutes countdown
  }, []);

  /**
   * Handles resend link button click
   * Sends another password reset email and starts countdown
   */
//   const handleResendLink = async (): Promise<void> => {
//     setIsLoading(true);
//     setError('');

//     try {
//       await sendPasswordResetEmail(email);
//       setShowTryAgainText(false);
//       setCountdown(120);
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Failed to resend email. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

   const handleResendLink = () => {
    setShowTryAgainText(false);
    setCountdown(120);
  };
  /**
   * Formats seconds into MM:SS format
   * @param seconds - Number of seconds to format
   * @returns Formatted time string (e.g., "2:00", "1:35")
   */
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  /**
   * Handles Enter key press in email input
   * @param e - Keyboard event
   */
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && isValidEmail && !isLoading) {
      handleContinue();
    }
  };

  // Page 1: Reset Password Form
  if (currentPage === 'reset') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 rounded-3xl shadow-3xl">
        <div 
          className={`w-full max-w-2xl transition-all duration-300 ease-in-out ${
            isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          <div className=" rounded-lg bg-white">
            <div className="rounded-lg p-12 m-4">
              <div className="max-w-md mx-auto">
                {/* Shield Icon */}
                <div className="flex justify-center mb-6">
                  <div className="bg-gray-800 rounded-2xl p-4">
                    <Shield className="w-10 h-10 text-white" strokeWidth={2} />
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold text-center mb-3 text-black">
                  Enter Your Email
                </h1>

                {/* Subtitle */}
                <p className="text-gray-600 text-center mb-8">
                  Enter your email address and we&apos;ll send you a link to reset your password
                </p>

                {/* Email Input */}
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter your email"
                    disabled={isLoading}
                    className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    aria-label="Email address"
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={error ? 'email-error' : undefined}
                  />
                  {error && (
                    <p id="email-error" className="mt-2 text-sm text-red-600" role="alert">
                      {error}
                    </p>
                  )}
                </div>

                {/* Continue Button */}
                <button
                  onClick={handleContinue}
                  disabled={!isValidEmail || isLoading}
                  className={`w-full py-3 rounded-lg font-medium transition-all ${
                    isValidEmail && !isLoading
                      ? 'bg-gray-900 text-white hover:bg-gray-800 cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  aria-label="Continue to reset password"
                >
                  {isLoading ? 'Sending...' : 'Continue'}
                </button>

                {/* Resend Link */}
                {/* <div className="text-center mt-6">
                  <button className="text-gray-600 hover:text-gray-900 text-sm">
                    Didn&apos;t see the link?{' '}
                    <span className="text-blue-600 font-medium">Resend Link</span>
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 shadow-3xl rounded-3xl">
      <div 
        className={`w-full max-w-2xl bg-white rounded-lg shadow-lg p-12 transition-all duration-300 ease-in-out ${
          isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        <div className="max-w-md mx-auto">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-green-500 rounded-2xl p-4 animate-[pulse_1s_ease-in-out]">
              <CheckCircle2 className="w-10 h-10 text-white" strokeWidth={2.5} />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-center mb-3">
            Check Your Email
          </h1>

          {/* Subtitle */}
          <p className="text-gray-600 text-center mb-8">
            We&apos;ve sent a password reset link to your email address
          </p>

          {/* Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start animate-[slideIn_0.5s_ease-out]">
            <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
            <p className="text-green-800 text-sm">
              Password reset email sent successfully! Check your inbox and follow the instructions to reset your password.
            </p>
          </div>

          {/* Resend Link Button */}
          <button
            onClick={handleResendLink}
            disabled={countdown > 0 || isLoading}
            className={`w-full py-3 rounded-lg font-medium transition-colors mb-4 ${
              countdown > 0 || isLoading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-800 text-white hover:bg-gray-900'
            }`}
            aria-label="Resend password reset link"
          >
            {isLoading ? 'Sending...' : 'Resend Link'}
          </button>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600" role="alert">
                {error}
              </p>
            </div>
          )}

          {/* Try Again / Countdown */}
          <div className="text-center text-sm text-gray-600">
            {countdown > 0 ? (
              <p className="transition-opacity duration-300">
                Resend available in{' '}
                <span className="font-semibold text-gray-900">{formatTime(countdown)}</span>
              </p>
            ) : showTryAgainText ? (
              <p className="transition-opacity duration-300">
                Didn&apos;t receive the email? Check your spam folder or{' '}
                <button
                  onClick={handleTryAgain}
                  className="text-blue-600 font-medium hover:text-blue-700"
                >
                  try again
                </button>
                .
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}