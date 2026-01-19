interface EmptyDeliveriesStateProps {
  onBrowseClick: () => void;
}

export default function EmptyDeliveriesState({ onBrowseClick }: EmptyDeliveriesStateProps) {
  return (
    <div className="bg-white rounded-lg p-12 md:p-16 border border-gray-200 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 text-gray-300">
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        
        <h2 className="text-lg md:text-xl font-bold mb-2 text-gray-900">No Deliveries Available</h2>
        <p className="text-xs md:text-sm text-gray-600 mb-6 leading-relaxed">
          You&apos;re all set! Start accepting deliveries by browsing available deliveries to earn money. Click on the &quot;Browse Deliveries&quot; button below.
        </p>
        
        <button 
          onClick={onBrowseClick}
          className="bg-black text-white px-6 py-2.5 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium inline-flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Browse Deliveries
        </button>
      </div>
    </div>
  );
}