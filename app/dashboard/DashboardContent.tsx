/**
 * FILE PATH: components/dashboard/DashboardContent.tsx
 * 
 * Deliveries table component - shown as background for all dashboard states
 * Gets blurred when modals are open
 */

'use client';

import React, { JSX } from 'react';
import { useDashboardState } from '@/hooks/useDashboardState';
import type { DeliveryItem } from '@/types/dashboard';

interface DashboardContentProps {
  deliveries?: DeliveryItem[];
}

export default function DashboardContent({ 
  deliveries = defaultDeliveries 
}: DashboardContentProps): JSX.Element {
  const { currentModal } = useDashboardState();
  
  // Blur background when any modal is open
  const isBlurred = currentModal && currentModal !== 'active';

  /**
   * Get status badge styling
   */
  const getStatusBadge = (status: DeliveryItem['status']) => {
    const styles = {
      delivered: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      'in-transit': 'bg-blue-100 text-blue-700',
      cancelled: 'bg-red-100 text-red-700',
    };
    
    return styles[status] || styles.pending;
  };

  /**
   * Format status text
   */
  const formatStatus = (status: DeliveryItem['status']) => {
    return status.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm transition-all duration-300 ${
      isBlurred ? 'filter blur-sm pointer-events-none' : ''
    }`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">All Deliveries</h2>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2">
              <span>Filter</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Deliveries Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">
                  Order ID
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">
                  Customer
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">
                  Date
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">
                  Amount
                </th>
                <th className="text-right py-4 px-4 text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {deliveries.map((delivery, index) => (
                <tr 
                  key={delivery.orderId} 
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4">
                    <span className="text-sm font-medium text-gray-900">
                      {delivery.orderId}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-gray-600">
                          {delivery.customer.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm text-gray-900">{delivery.customer}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm text-gray-600">{delivery.date}</span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(delivery.status)}`}>
                      {formatStatus(delivery.status)}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-sm font-semibold text-gray-900">
                      ₦{delivery.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-600">
            Showing 1-{deliveries.length} of {deliveries.length} entries
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              Previous
            </button>
            <button className="px-3 py-2 text-sm bg-gray-900 text-white rounded-lg">
              1
            </button>
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Default mock data for deliveries
 * Replace with actual API data
 */
const defaultDeliveries: DeliveryItem[] = [
  {
    orderId: 'ORD-2025-188',
    customer: 'John Doe',
    date: '+234 901 324 9018',
    status: 'delivered',
    amount: 4250,
  },
  {
    orderId: 'ORD-2025-288',
    customer: 'Jane Smith',
    date: '+234 812 456 7890',
    status: 'pending',
    amount: 3100,
  },
  {
    orderId: 'ORD-2025-388',
    customer: 'Mike Johnson',
    date: '+234 703 234 5678',
    status: 'in-transit',
    amount: 5600,
  },
  {
    orderId: 'ORD-2025-488',
    customer: 'Sarah Williams',
    date: '+234 809 876 5432',
    status: 'delivered',
    amount: 2800,
  },
  {
    orderId: 'ORD-2025-588',
    customer: 'David Brown',
    date: '+234 816 345 6789',
    status: 'pending',
    amount: 4500,
  },
];

/**
 * API INTEGRATION:
 * 
 * Replace defaultDeliveries with actual API call:
 * 
 * const [deliveries, setDeliveries] = useState<DeliveryItem[]>([]);
 * 
 * useEffect(() => {
 *   async function fetchDeliveries() {
 *     const response = await fetch('/api/deliveries');
 *     const data = await response.json();
 *     setDeliveries(data);
 *   }
 *   fetchDeliveries();
 * }, []);
 */