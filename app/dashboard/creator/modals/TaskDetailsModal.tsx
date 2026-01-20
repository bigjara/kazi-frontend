'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Briefcase, Calendar, DollarSign, Users, Eye } from 'lucide-react';
import { Task } from '@/types/task';

interface TaskDetailsModalProps {
  task: Task;
  onClose: () => void;
  onViewApplications: () => void;
}

export default function TaskDetailsModal({ task, onClose, onViewApplications }: TaskDetailsModalProps) {
  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'draft':
        return 'bg-gray-50 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const modalContent = (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm bg-opacity-100 flex items-center justify-center p-4 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="bg-white rounded-2xl w-full max-w-2xl p-8 relative max-h-[90vh] overflow-y-auto z-10">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Briefcase size={32} className="text-gray-700" />
            <h2 className="text-2xl font-bold text-gray-900">Task Details</h2>
          </div>
          <p className="text-gray-500">{task.id}</p>
        </div>

        <div className="border-t border-gray-200 pt-6">
          {/* Title and Status */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {task.title}
              </h3>
              <p className="text-gray-600">{task.category}</p>
            </div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(task.status)}`}>
              {getStatusText(task.status)}
            </span>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
            <p className="text-gray-700">
              {task.description || 'Build scalable web applications'}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* Deadline */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Calendar size={18} />
                <span className="text-sm">Deadline</span>
              </div>
              <p className="text-xl font-semibold text-gray-900">
                {formatDate(task.deadline)}
              </p>
            </div>

            {/* Budget */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <DollarSign size={18} />
                <span className="text-sm">Budget</span>
              </div>
              <p className="text-xl font-semibold text-gray-900">
                {formatCurrency(task.budget)}
              </p>
            </div>

            {/* Applications */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Users size={18} />
                <span className="text-sm">Applications</span>
              </div>
              <p className="text-xl font-semibold text-gray-900">
                {task.applicationsCount}
              </p>
            </div>

            {/* Views */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <Eye size={18} />
                <span className="text-sm">Views</span>
              </div>
              <p className="text-xl font-semibold text-gray-900">
                {task.views || 456}
              </p>
            </div>
          </div>

          {/* View Applications Button */}
          <button
            onClick={onViewApplications}
            className="w-full bg-gray-900 text-white py-4 rounded-lg hover:bg-gray-800 transition-colors font-medium text-lg mb-4"
          >
            View Applications ({task.applicationsCount})
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  // Use portal to render modal at document body level
  if (typeof window === 'undefined') return null;
  return createPortal(modalContent, document.body);
}