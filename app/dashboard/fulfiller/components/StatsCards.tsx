import { DashboardStats } from '@/types/delivery';

interface StatsCardsProps {
  stats: DashboardStats | null;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  if (!stats) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white rounded-lg p-4 border border-gray-200 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-1"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* Today's Deliveries */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex items-start justify-between mb-3">
          <span className="text-xs text-gray-600">Today&apos;s Deliveries</span>
          <div className="w-7 h-7 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-3.5 h-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-1 text-gray-900">
          {stats.todayDeliveries.total}
        </h3>
        <p className="text-xs text-gray-500">
          {stats.todayDeliveries.completed} completed, {stats.todayDeliveries.active} active, {stats.todayDeliveries.available} available
        </p>
      </div>

      {/* Today's Earnings */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex items-start justify-between mb-3">
          <span className="text-xs text-gray-600">Today&apos;s Earnings</span>
          <div className="w-7 h-7 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-3.5 h-3.5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-1 text-gray-900">
          {formatCurrency(stats.todayEarnings)}
        </h3>
        <p className="text-xs text-green-600">+{stats.earningsChange}% from yesterday</p>
      </div>

      {/* Acceptance Rate */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex items-start justify-between mb-3">
          <span className="text-xs text-gray-600">Acceptance Rate</span>
          <div className="w-7 h-7 bg-purple-50 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-3.5 h-3.5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-1 text-gray-900">
          {stats.acceptanceRate !== null ? `${stats.acceptanceRate}%` : '-'}
        </h3>
        <p className="text-xs text-gray-500">
          {stats.acceptanceRate !== null && stats.acceptanceRate >= 80 
            ? 'Excellent performance' 
            : stats.acceptanceRate !== null && stats.acceptanceRate >= 60
            ? 'Above average performance'
            : 'Keep improving'}
        </p>
      </div>

      {/* Avg Delivery Time */}
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex items-start justify-between mb-3">
          <span className="text-xs text-gray-600">Avg. Delivery Time</span>
          <div className="w-7 h-7 bg-orange-50 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-3.5 h-3.5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-1 text-gray-900">
          {stats.avgDeliveryTime !== null ? `${stats.avgDeliveryTime} mins` : '-'}
        </h3>
        <p className="text-xs text-gray-500">
          {stats.avgDeliveryTime !== null && stats.avgDeliveryTime <= 30
            ? 'Great speed!'
            : stats.avgDeliveryTime !== null
            ? 'Room for improvement'
            : 'Complete deliveries to track'}
        </p>
      </div>
    </div>
  );
}