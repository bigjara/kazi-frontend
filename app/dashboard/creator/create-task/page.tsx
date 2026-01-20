'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Truck, Code, Palette, GraduationCap, Store, Briefcase, UtensilsCrossed, Heart } from 'lucide-react';
import { MdAssignmentAdd } from "react-icons/md";

const categories = [
  {
    id: 'logistics',
    icon: Truck,
    title: 'Logistics & Delivery',
    description: 'Riders, drivers, logistics',
  },
  {
    id: 'technology',
    icon: Code,
    title: 'Technology & Development',
    description: 'Software, IT, Digital Services',
  },
  {
    id: 'creative',
    icon: Palette,
    title: 'Creative & Design',
    description: 'Graphics, Content, Media',
  },
  {
    id: 'education',
    icon: GraduationCap,
    title: 'Education & Training',
    description: 'Tutors, Instructors, Skill Training',
  },
  {
    id: 'retail',
    icon: Store,
    title: 'Retail & Services',
    description: 'Store Staff, Customer Service, Repairs',
  },
  {
    id: 'professional',
    icon: Briefcase,
    title: 'Professional Services',
    description: 'Finance, Legal, Consulting',
  },
  {
    id: 'food',
    icon: UtensilsCrossed,
    title: 'Food & Catering',
    description: 'Food Vendors, Chefs, Bakers',
  },
  {
    id: 'healthcare',
    icon: Heart,
    title: 'Healthcare & Wellness',
    description: 'Graphics, Content, Media',
  },
];

export default function CreateTaskPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    // Clear any existing task data when starting fresh
    localStorage.removeItem('taskFormData');
  }, []);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleNext = () => {
    if (!selectedCategory) return;
    
    // Save category to localStorage
    const formData = {
      category: selectedCategory,
      categoryTitle: categories.find(c => c.id === selectedCategory)?.title || '',
    };
    localStorage.setItem('taskFormData', JSON.stringify(formData));
    
    // Navigate to next step
    router.push('/dashboard/creator/create-task/details');
  };

  const handleCancel = () => {
    router.push('/dashboard/creator');
  };

  return (
    <div className="min-h-screen bg-gray-100/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl p-8 relative">
        {/* Close Button */}
        <button
          onClick={handleCancel}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            <MdAssignmentAdd className="inline mr-2" /> Create New Task
          </h1>
          <p className="text-gray-500 text-lg">Select task categories</p>
        </div>

        {/* Instruction */}
        <p className="text-gray-700 mb-8">
          Select a task category you are creating the task for.
        </p>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`flex items-center gap-4 p-5 rounded-xl border-2 transition-all text-left ${
                  selectedCategory === category.id
                    ? 'border-gray-900 bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Radio Button */}
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedCategory === category.id
                    ? 'border-gray-900'
                    : 'border-gray-300'
                }`}>
                  {selectedCategory === category.id && (
                    <div className="w-3 h-3 rounded-full bg-gray-900" />
                  )}
                </div>

                {/* Icon */}
                <div className="text-gray-700">
                  <Icon size={24} />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {category.description}
                  </p>
                </div>
              </button>
            );
          })}
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
            disabled={!selectedCategory}
            className={`px-8 py-3 rounded-lg font-medium transition-colors ${
              selectedCategory
                ? 'bg-gray-900 text-white hover:bg-gray-800'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}