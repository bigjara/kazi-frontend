'use client';

import { Task } from '@/types/task';
import { MoreVertical } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TaskDetailsModal from '../modals/TaskDetailsModal';
import DeleteTaskModal from '../modals/DeleteTaskModal';

interface TaskRowProps {
  task: Task;
}

export default function TaskRow({ task }: TaskRowProps) {
  const router = useRouter();
  const [showActions, setShowActions] = useState(false);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const handleViewDetails = () => {
    setShowActions(false);
    setShowTaskDetails(true);
  };

  const handleEditTask = () => {
    setShowActions(false);
    // Navigate to edit task page (we'll create this later)
    router.push(`/tasks/${task.id}/edit`);
  };

  const handleViewApplications = () => {
    setShowActions(false);
    // Navigate to applications page
    router.push(`/dashboard/creator/tasks/${task.id}/application`);
  };

  const handleDeleteTask = () => {
    setShowActions(false);
    setShowDeleteModal(true);
  };

  return (
    <>
      <tr className="hover:bg-gray-50 transition-colors">
        <td className="px-4 py-4">
          <input type="checkbox" className="rounded border-gray-300" />
        </td>
        
        <td className="px-4 py-4">
          <div className="text-sm font-medium text-gray-900">{task.id}</div>
        </td>

        <td className="px-4 py-4">
          <div>
            <div className="text-sm font-medium text-gray-900">{task.title}</div>
            <div className="text-xs text-gray-500 mt-0.5">{task.category}</div>
          </div>
        </td>

        <td className="px-4 py-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
            {getStatusText(task.status)}
          </span>
        </td>

        <td className="px-4 py-4">
          <div>
            <div className="text-sm font-medium text-gray-900">{task.applicationsCount}</div>
            <div className="text-xs text-gray-500">
              {task.applicationsCount > 0 ? `${task.applicationsCount} views` : 'No views yet'}
            </div>
          </div>
        </td>

        <td className="px-4 py-4">
          <div className="text-sm font-medium text-gray-900">
            {formatCurrency(task.budget)}
            {task.budget >= 100000 && <span className="text-xs text-gray-500 ml-1">monthly</span>}
          </div>
        </td>

        <td className="px-4 py-4">
          <div className="text-sm text-gray-900">{formatDate(task.deadline)}</div>
        </td>

        <td className="px-4 py-4 text-right">
          <div className="relative inline-block">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <MoreVertical size={16} className="text-gray-500" />
            </button>

            {showActions && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowActions(false)}
                />
                <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                  <button 
                    onClick={handleViewDetails}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700"
                  >
                    View Details
                  </button>
                  <button 
                    onClick={handleEditTask}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700"
                  >
                    Edit Task
                  </button>
                  <button 
                    onClick={handleViewApplications}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-gray-700"
                  >
                    View Applications
                  </button>
                  <button 
                    onClick={handleDeleteTask}
                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-red-600"
                  >
                    Delete Task
                  </button>
                </div>
              </>
            )}
          </div>
        </td>
      </tr>

      {/* Modals - These will be rendered using portals */}
      {showTaskDetails && (
        <TaskDetailsModal 
          task={task} 
          onClose={() => setShowTaskDetails(false)}
          onViewApplications={handleViewApplications}
        />
      )}

      {showDeleteModal && (
        <DeleteTaskModal
          task={task}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </>
  );
}