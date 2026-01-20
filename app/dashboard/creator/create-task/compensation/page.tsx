'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { MdAssignmentAdd } from "react-icons/md";

export default function CompensationPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    compensation: '',
    deadline: '',
    experienceLevel: '',
  });

  useEffect(() => {
    // Load existing data from localStorage
    const savedData = localStorage.getItem('taskFormData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFormData({
        compensation: parsed.compensation || '',
        deadline: parsed.deadline || '',
        experienceLevel: parsed.experienceLevel || '',
      });
    } else {
      // If no data, redirect back to start
      router.push('/create-task');
    }
  }, [router]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    // Save to localStorage
    const savedData = localStorage.getItem('taskFormData');
    const existingData = savedData ? JSON.parse(savedData) : {};
    const updatedData = { ...existingData, ...formData };
    localStorage.setItem('taskFormData', JSON.stringify(updatedData));

    // Navigate to next step
    router.push('/dashboard/creator/create-task/requirements');
  };

  const handleBack = () => {
    router.push('/dashboard/creator/create-task/details');
  };

  const handleCancel = () => {
    localStorage.removeItem('taskFormData');
    router.push('/dashboard/creator');
  };

  return (
    <div className="min-h-screen bg-gray-100/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-8 relative">
        {/* Close Button */}
        <button
          onClick={handleCancel}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
           
            <h1 className="text-3xl font-bold text-gray-900">
              <MdAssignmentAdd className="inline mr-2" /> Create New Task
            </h1>
          </div>
          <p className="text-gray-500">Step 2 of 3</p>
        </div>

        {/* Section Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b">
          Compensation & Timeline
        </h2>

        {/* Form Fields */}
        <div className="space-y-6 mb-8">
          {/* Salary / Compensation */}
          <div>
            <label className="block text-gray-900 font-medium mb-2">
              Salary / Compensation <span className="text-gray-500 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              value={formData.compensation}
              onChange={(e) => handleInputChange('compensation', e.target.value)}
              placeholder="e.g., ₦500,000-₦800,000/month, or ₦50,000 per task"
              className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
            />
          </div>

          {/* Application Deadline */}
          <div>
            <label className="block text-gray-900 font-medium mb-2">
              Application Deadline
            </label>
            <input
              type="text"
              value={formData.deadline}
              onChange={(e) => handleInputChange('deadline', e.target.value)}
              placeholder="dd/mm/yyyy"
              className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
            />
          </div>

          {/* Experience Level Required */}
          <div>
            <label className="block text-gray-900 font-medium mb-2">
              Experience Level Required
            </label>
            <input
              type="text"
              value={formData.experienceLevel}
              onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
              placeholder="e.g., Entry Level, Mid Level, Senior......"
              className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
            />
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-16 h-1 bg-gray-200 rounded-full" />
          <div className="w-16 h-1 bg-gray-900 rounded-full" />
          <div className="w-16 h-1 bg-gray-200 rounded-full" />
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            className="px-8 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Back
          </button>

          <button
            onClick={handleNext}
            className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}