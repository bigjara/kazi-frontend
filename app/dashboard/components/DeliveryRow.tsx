'use client';

import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from 'react';
import { Delivery } from '@/types/delivery';
import { useDelivery } from '@/contexts/DeliveryContext';

interface DeliveryRowProps {
  delivery: Delivery;
}

export default function DeliveryRow({ delivery }: DeliveryRowProps) {
  const { acceptDelivery, completeDelivery } = useDelivery();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = () => {
    switch (delivery.status) {
      case 'pending':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            In Queue
          </span>
        );
      case 'active':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Active
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Completed
          </span>
        );
    }
  };

  const handleAccept = async () => {
    try {
      setIsLoading(true);
      await acceptDelivery(delivery.id);
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Failed to accept delivery:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = async () => {
    try {
      setIsLoading(true);
      await completeDelivery(delivery.id);
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Failed to complete delivery:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <tr 
        className={`hover:bg-gray-50 transition-colors ${
          isDetailsOpen ? 'bg-gray-50' : ''
        }`}
      >
        <td className="px-4 py-4">
          <button
            onClick={() => setIsDetailsOpen(!isDetailsOpen)}
            className="text-xs font-medium text-gray-900 hover:text-black transition-colors"
          >
            {delivery.orderId}
          </button>
        </td>
        <td className="px-4 py-4">
          <div className="text-xs text-gray-900 max-w-xs truncate">
            {delivery.pickupLocation.address}
          </div>
        </td>
        <td className="px-4 py-4">
          <div className="text-xs text-gray-900 max-w-xs truncate">
            {delivery.dropOffLocation.address}
          </div>
        </td>
        <td className="px-4 py-4">
          <span className="text-xs text-gray-900">{delivery.distance} km</span>
        </td>
        <td className="px-4 py-4">
          <span className="text-xs font-medium text-gray-900">
            {formatCurrency(delivery.amount)}
          </span>
        </td>
        <td className="px-4 py-4">{getStatusBadge()}</td>
        <td className="px-4 py-4 text-right">
          <div className="relative inline-block">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              disabled={isLoading}
              className="p-1 hover:bg-gray-100 rounded transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>

            {isMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsMenuOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                  <button
                    onClick={() => setIsDetailsOpen(true)}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Details
                  </button>

                  {delivery.status === 'pending' && (
                    <button
                      onClick={handleAccept}
                      disabled={isLoading}
                      className="w-full px-4 py-2 text-left text-sm text-green-700 hover:bg-green-50 transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {isLoading ? 'Accepting...' : 'Accept Delivery'}
                    </button>
                  )}

                  {delivery.status === 'active' && (
                    <button
                      onClick={handleComplete}
                      disabled={isLoading}
                      className="w-full px-4 py-2 text-left text-sm text-blue-700 hover:bg-blue-50 transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {isLoading ? 'Completing...' : 'Complete Delivery'}
                    </button>
                  )}

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(delivery.orderId);
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy Order ID
                  </button>
                </div>
              </>
            )}
          </div>
        </td>
      </tr>

      {/* Expanded Details Row */}
      {isDetailsOpen && (
        <tr className="bg-gray-50">
          <td colSpan={7} className="px-4 py-4">
            <div className="max-w-4xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900">Delivery Details</h3>
                <button
                  onClick={() => setIsDetailsOpen(false)}
                  className="p-1 hover:bg-gray-200 rounded transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Customer Information</h4>
                  <div className="space-y-1.5 text-gray-600">
                    <p><span className="font-medium">Name:</span> {delivery.customerName}</p>
                    <p><span className="font-medium">Phone:</span> {delivery.customerPhone}</p>
                    {delivery.items && (
                      <div>
                        <span className="font-medium">Items:</span>
                        <ul className="list-disc list-inside ml-2 mt-1">
                          {delivery.items.map((item: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<unknown>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<unknown>> | Iterable<ReactNode> | null | undefined> | null | undefined, idx: Key | null | undefined) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Delivery Timeline</h4>
                  <div className="space-y-1.5 text-gray-600">
                    <p>
                      <span className="font-medium">Created:</span>{' '}
                      {delivery.createdAt.toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                    {delivery.acceptedAt && (
                      <p>
                        <span className="font-medium">Accepted:</span>{' '}
                        {delivery.acceptedAt.toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    )}
                    {delivery.completedAt && (
                      <p>
                        <span className="font-medium">Completed:</span>{' '}
                        {delivery.completedAt.toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    )}
                    {delivery.estimatedTime && (
                      <p>
                        <span className="font-medium">Est. Time:</span> {delivery.estimatedTime} mins
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}