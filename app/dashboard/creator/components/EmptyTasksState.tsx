import { Briefcase } from 'lucide-react';

export default function EmptyTasksState() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-12">
      <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto">
        {/* Icon */}
        <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
          <Briefcase size={40} className="text-gray-400" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          No Tasks Yet
        </h2>

        {/* Description */}
        <p className="text-gray-600 mb-8">
          You're all set! Create your first task to start recruiting.
        </p>

        {/* CTA Button */}
        <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
          Create Your First Task
        </button>
      </div>
    </div>
  );
}