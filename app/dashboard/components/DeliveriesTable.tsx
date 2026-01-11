'use client';

import { useState, useMemo } from 'react';
import { useDelivery } from '@/contexts/DeliveryContext';
import { DeliveryFilter } from '@/types/delivery';
import DeliveryRow from './DeliveryRow';

const ITEMS_PER_PAGE = 10;

const FILTER_OPTIONS: { value: DeliveryFilter; label: string }[] = [
  { value: 'all', label: 'All Deliveries' },
  { value: 'available', label: 'Available Deliveries' },
  { value: 'active', label: 'Active Deliveries' },
  { value: 'completed', label: 'Completed Deliveries' }
];

export default function DeliveriesTable() {
  const { filteredDeliveries, currentFilter, setCurrentFilter, stats } = useDelivery();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter by search query
  const searchedDeliveries = useMemo(() => {
    if (!searchQuery.trim()) return filteredDeliveries;
    
    const query = searchQuery.toLowerCase();
    return filteredDeliveries.filter(delivery => 
      delivery.orderId.toLowerCase().includes(query) ||
      delivery.pickupLocation.address.toLowerCase().includes(query) ||
      delivery.dropOffLocation.address.toLowerCase().includes(query) ||
      delivery.customerName.toLowerCase().includes(query)
    );
  }, [filteredDeliveries, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(searchedDeliveries.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentDeliveries = searchedDeliveries.slice(startIndex, endIndex);

  // Reset to page 1 when filter or search changes
  const handleFilterChange = (filter: DeliveryFilter) => {
    setCurrentFilter(filter);
    setCurrentPage(1);
    setIsFilterOpen(false);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const getFilterSummary = () => {
    if (!stats) return '';
    
    switch (currentFilter) {
      case 'available':
        return `${stats.todayDeliveries.available} available`;
      case 'active':
        return `${stats.todayDeliveries.active} active`;
      case 'completed':
        return `${stats.todayDeliveries.completed} completed`;
      default:
        return `${stats.todayDeliveries.available} available, ${stats.todayDeliveries.active} active, ${stats.todayDeliveries.completed} completed`;
    }
  };

  const currentFilterLabel = FILTER_OPTIONS.find(opt => opt.value === currentFilter)?.label || 'All Deliveries';

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-gray-900 mb-1">
              {currentFilterLabel}
            </h2>
            <p className="text-xs text-gray-500">{getFilterSummary()}</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 sm:flex-initial sm:w-64">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by order ID"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="px-4 py-2 text-sm border text-black border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                {currentFilterLabel}
                <svg className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isFilterOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setIsFilterOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                    {FILTER_OPTIONS.map(option => (
                      <button
                        key={option.value}
                        onClick={() => handleFilterChange(option.value)}
                        className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors first:rounded-t-md last:rounded-b-md ${
                          currentFilter === option.value ? 'bg-gray-50 font-medium text-black' : 'text-gray-700'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pickup Location
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Drop-off Location
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Distance
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentDeliveries.length > 0 ? (
              currentDeliveries.map(delivery => (
                <DeliveryRow key={delivery.id} delivery={delivery} />
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center">
                  <div className="text-gray-400 mb-2">
                    <svg className="w-12 h-12 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-500">
                    {searchQuery ? 'No deliveries match your search' : 'No deliveries found'}
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="text-xs text-gray-500">
            Showing {startIndex + 1} to {Math.min(endIndex, searchedDeliveries.length)} of {searchedDeliveries.length} entries
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1.5 text-xs rounded ${
                    currentPage === pageNum
                      ? 'bg-black text-white'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}