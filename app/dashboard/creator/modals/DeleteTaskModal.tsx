'use client';

import { useState } from 'react';
import { X, AlertTriangle, Info } from 'lucide-react';
import { Task } from '@/types/task';
import { useRouter } from 'next/navigation';

interface DeleteTaskModalProps {
  task: Task;
  onClose: () => void;
}

export default function DeleteTaskModal({ task, onClose }: DeleteTaskModalProps) {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // TODO: Call actual delete API here
    // await deleteTask(task.id);
    
    setIsDeleting(false);
    setShowSuccess(true);
  };

  const handleBackToDashboard = () => {
    onClose();
    // Optionally refresh the page or update the task list
    router.refresh();
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl w-full max-w-md p-8 relative">
          {/* Close Button */}
          <button
            onClick={handleBackToDashboard}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>

          {/* Success Content */}
          <div className="text-center">
            {/* Error Icon */}
            <div className="w-20 h-20 bg-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Info size={48} className="text-white" strokeWidth={2.5} />
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Task Deleted
            </h2>
            <p className="text-gray-600 mb-6">The task has been deleted</p>

            {/* Warning Message */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
              <div className="flex items-start gap-2">
                <Info size={18} className="text-red-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-800 text-left">
                  The task "{task.title}" ({task.id}) has been deleted. This action can't be undone.
                </p>
              </div>
            </div>

            {/* Back to Dashboard Button */}
            <button
              onClick={handleBackToDashboard}
              className="w-full bg-gray-900 text-white py-4 rounded-lg hover:bg-gray-800 transition-colors font-medium text-lg"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-md p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <AlertTriangle size={24} className="text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-red-600">Delete Task</h2>
          </div>
          <p className="text-gray-700">
            You are about to delete the task "{task.title}" ({task.id}). This action cannot be undone.
          </p>
        </div>

        {/* Warning Box */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-red-800">
            All associated applications and data will be permanently deleted.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Delete Task'}
          </button>
        </div>
      </div>
    </div>
  );
}