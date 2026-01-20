'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { MdAssignmentAdd } from "react-icons/md";

export default function TaskDetailsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    workMode: '',
  });

  useEffect(() => {
    // Load existing data from localStorage
    const savedData = localStorage.getItem('taskFormData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFormData({
        title: parsed.title || '',
        description: parsed.description || '',
        duration: parsed.duration || '',
        workMode: parsed.workMode || '',
      });
    } else {
      // If no data, redirect back to category selection
      router.push('/create-task');
    }
  }, [router]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    // Validate required fields
    if (!formData.title.trim()) {
      alert('Please enter a task title');
      return;
    }

    // Save to localStorage
    const savedData = localStorage.getItem('taskFormData');
    const existingData = savedData ? JSON.parse(savedData) : {};
    const updatedData = { ...existingData, ...formData };
    localStorage.setItem('taskFormData', JSON.stringify(updatedData));

    // Navigate to next step
    router.push('/dashboard/creator/create-task/compensation');
  };

  const handleBack = () => {
    router.push('/dashboard/creator/create-task');
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
          <div className="flex items-center gap-3 mb-2 text-black font-semibold">
            
            <h1 className="text-3xl font-bold text-gray-900">
             <MdAssignmentAdd className="inline mr-2" />  Create New Task
            </h1>
          </div>
          <p className="text-gray-500">Step 1 of 3</p>
        </div>

        {/* Section Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b">
          General Task Details
        </h2>

        {/* Form Fields */}
        <div className="space-y-6 mb-8">
          {/* Task Title */}
          <div>
            <label className="block text-gray-900 font-medium mb-2">
              Task Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="e.g., Software Engineer, Product Designer......"
              className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-900 font-medium mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe the task, responsibilities, and what you are looking for..."
              rows={5}
              className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none resize-none"
            />
          </div>

          {/* Duration and Work Mode Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Duration */}
            <div>
              <label className="block text-gray-900 font-medium mb-2">
                Duration
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                placeholder="e.g., Full-time, One-time, Contract..."
                className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
              />
            </div>

            {/* Work Mode */}
            <div>
              <label className="block text-gray-900 font-medium mb-2">
                Work Mode
              </label>
              <input
                type="text"
                value={formData.workMode}
                onChange={(e) => handleInputChange('workMode', e.target.value)}
                placeholder="e.g., Remote, On-site, Hybrid...."
                className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-16 h-1 bg-gray-900 rounded-full" />
          <div className="w-16 h-1 bg-gray-200 rounded-full" />
          <div className="w-16 h-1 bg-gray-200 rounded-full" />
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleCancel}
            className="px-8 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Cancel
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