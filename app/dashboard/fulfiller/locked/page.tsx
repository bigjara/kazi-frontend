'use client';

import React, { JSX, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, X } from 'lucide-react';

/**
 * Locked Dashboard Page
 * Path: app/dashboard/locked/page.tsx
 * Route: /dashboard/locked
 * 
 * This page shows when the user's account is locked
 * Modal automatically opens on page load
 */
export default function LockedDashboardPage(): JSX.Element {
  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(true);

  /**
   * Handle unlock button click
   * Navigates to verification page
   */
  const handleUnlock = (): void => {
    setShowModal(false);
    // Navigate to verification page
    router.push('/dashboard/verify');
  };

  return (
    <>
      {/* Blurred Content - Shows deliveries table but blurred */}
      <div className="bg-white rounded-lg shadow-sm p-6 filter blur-sm pointer-events-none">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">All Deliveries</h2>
          <button className="text-sm text-gray-600">Filter ▼</button>
        </div>

        {/* Mock table data */}
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3 text-sm font-medium text-gray-600">Order ID</th>
              <th className="text-left py-3 text-sm font-medium text-gray-600">Customer</th>
              <th className="text-left py-3 text-sm font-medium text-gray-600">Status</th>
              <th className="text-left py-3 text-sm font-medium text-gray-600">Amount</th>
              <th className="text-left py-3 text-sm font-medium text-gray-600">Action</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4].map((i) => (
              <tr key={i} className="border-b">
                <td className="py-4">ORD-2025-{i}88</td>
                <td className="py-4">John Doe</td>
                <td className="py-4">
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                    Delivered
                  </span>
                </td>
                <td className="py-4">₦{(Math.random() * 5000 + 1000).toFixed(0)}</td>
                <td className="py-4">
                  <button className="text-gray-400">⋮</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Account Locked Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-8 relative animate-[fadeIn_0.3s_ease-out]">
            {/* Close button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Lock Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center">
                <Lock className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Content */}
            <h2 className="text-2xl font-bold text-center mb-3">
              Account Locked
            </h2>
            <p className="text-gray-600 text-center mb-8 leading-relaxed">
              Your account is locked. Click below to unlock your documents and verify your business.
            </p>

            {/* Unlock Button */}
            <button
              onClick={handleUnlock}
              className="w-full py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Unlock Account
            </button>
          </div>
        </div>
      )}
    </>
  );
}

/**
 * Usage in Next.js App Router:
 * 
 * 1. Create file: app/dashboard/locked/page.tsx
 * 2. Import DashboardLayout wrapper in layout.tsx
 * 3. This component will be wrapped automatically
 * 
 * Example layout.tsx:
 * 
 * import DashboardLayout from '@/components/dashboard/DashboardLayout';
 * 
 * export default function Layout({ children }) {
 *   return <DashboardLayout>{children}</DashboardLayout>;
 * }
 */