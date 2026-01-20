'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Info } from 'lucide-react';
import { MdAssignmentAdd } from "react-icons/md";

export default function RequirementsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    requiredSkills: '',
    requireCV: false,
    resumeLink: '',
    portfolioLink: '',
    githubLink: '',
    linkedinLink: false,
    behanceLink: '',
    otherCertLink: '',
    requireCoverLetter: false,
    requireQuestionnaire: false,
    requireLicense: false,
  });

  useEffect(() => {
    // Load existing data from localStorage
    const savedData = localStorage.getItem('taskFormData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFormData({
        requiredSkills: parsed.requiredSkills || '',
        requireCV: parsed.requireCV || false,
        resumeLink: parsed.resumeLink || '',
        portfolioLink: parsed.portfolioLink || '',
        githubLink: parsed.githubLink || '',
        linkedinLink: parsed.linkedinLink || false,
        behanceLink: parsed.behanceLink || '',
        otherCertLink: parsed.otherCertLink || '',
        requireCoverLetter: parsed.requireCoverLetter || false,
        requireQuestionnaire: parsed.requireQuestionnaire || false,
        requireLicense: parsed.requireLicense || false,
      });
    } else {
      router.push('/create-task');
    }
  }, [router]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateTask = () => {
    // Save final data to localStorage
    const savedData = localStorage.getItem('taskFormData');
    const existingData = savedData ? JSON.parse(savedData) : {};
    const finalData = { ...existingData, ...formData };
    localStorage.setItem('taskFormData', JSON.stringify(finalData));

    // Navigate to success page
    router.push('/dashboard/creator/create-task/success');
  };

  const handleBack = () => {
    router.push('/dashboard/creator/create-task/compensation');
  };

  const handleCancel = () => {
    localStorage.removeItem('taskFormData');
    router.push('/dashboard/creator-dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-100/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-8 relative max-h-[90vh] overflow-y-auto">
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
              <MdAssignmentAdd className="inline mr-2" />  Create New Task
            </h1>
          </div>
          <p className="text-gray-500">Step 3 of 3</p>
        </div>

        {/* Section Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b">
          Requirements & Skills
        </h2>

        {/* Form Fields */}
        <div className="space-y-6 mb-8">
          {/* Required Skills */}
          <div>
            <label className="block text-gray-900 font-semibold mb-2">
              Required Skills / Qualifications
            </label>
            <textarea
              value={formData.requiredSkills}
              onChange={(e) => handleInputChange('requiredSkills', e.target.value)}
              placeholder="e.g., Proficiency in React, Adobe XD, Next.js, Node.js, B.Sc Computer Science....."
              rows={3}
              className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none resize-none"
            />
          </div>

          {/* Additional Requirements */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-4">
              Additional Requirements
            </h3>

            {/* Require CV/Portfolio Upload */}
            <div className="mb-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                 
                  checked={formData.requireCV}
                  onChange={(e) => handleInputChange('requireCV', e.target.checked)}
                  className="w-5 h-5 accent-black border-gray-400 rounded border-gray-300 text-blue-500 focus:ring-2 focus:ring-blue-500"
                />
                <span className="font-medium text-gray-900">Require CV/Portfolio Upload</span>
              </label>

              {formData.requireCV && (
                <div className="mt-4 ml-8 space-y-4 bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-3">
                    Applicants will be asked to provide links to their professional materials
                  </p>

                  {/* Resume/CV Link */}
                  <div>
                    <label className="flex items-center gap-3 mb-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-black rounded border-gray-300"
                      />
                      <span className="text-gray-700">Resume/CV Link</span>
                    </label>
                    <input
                      type="text"
                      value={formData.resumeLink}
                      onChange={(e) => handleInputChange('resumeLink', e.target.value)}
                      placeholder="https://drive.google.com/.....or https://example.com/resume.pdf"
                      className="w-full text-black px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <Info size={12} />
                      Google Drive, Dropbox, or direct PDF links
                    </p>
                  </div>

                  {/* Portfolio Link */}
                  <div>
                    <label className="flex items-center gap-3 mb-2">
                      <input
                        type="checkbox"
                        className="w-4  h-4 accent-black rounded border-gray-300"
                      />
                      <span className="text-gray-700">Portfolio Link</span>
                    </label>
                    <input
                      type="text"
                      value={formData.portfolioLink}
                      onChange={(e) => handleInputChange('portfolioLink', e.target.value)}
                      placeholder="https://yourportfolio.com"
                      className="w-full text-black px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <Info size={12} />
                      Google Drive, Dropbox, or direct PDF links
                    </p>
                  </div>

                  {/* GitHub Profile */}
                  <div>
                    <label className="flex items-center gap-3 mb-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-black rounded border-gray-300"
                      />
                      <span className="text-gray-700">GitHub Profile (optional)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.githubLink}
                      onChange={(e) => handleInputChange('githubLink', e.target.value)}
                      placeholder="https://github.com/username"
                      className="w-full text-black px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <Info size={12} />
                      Google Drive, Dropbox, or direct PDF links
                    </p>
                  </div>

                  {/* LinkedIn Profile */}
                  <div>
                    <label className="flex items-center gap-3 mb-2">
                      <input
                        type="checkbox"
                        checked={formData.linkedinLink}
                        onChange={(e) => handleInputChange('linkedinLink', e.target.checked)}
                        className="w-5 h-5 accent-black rounded border-gray-300 text-blue-500 focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">LinkedIn Profile (optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="https://linkedin.com/in/username"
                      className="w-full text-black px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <Info size={12} />
                      Google Drive, Dropbox, or direct PDF links
                    </p>
                  </div>

                  {/* Behance/Dribble */}
                  <div>
                    <label className="flex items-center gap-3 mb-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-black rounded border-gray-300"
                      />
                      <span className="text-gray-700">Behance/Dribble (For designers)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.behanceLink}
                      onChange={(e) => handleInputChange('behanceLink', e.target.value)}
                      placeholder="https://domain.com/username"
                      className="w-full text-black px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <Info size={12} />
                      Google Drive, Dropbox, or direct PDF links
                    </p>
                  </div>

                  {/* Other Certification/Portfolio */}
                  <div>
                    <label className="flex items-center gap-3 mb-2">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-black rounded border-gray-300"
                      />
                      <span className="text-gray-700">Other Relevant Certification/Portfolio</span>
                    </label>
                    <input
                      type="text"
                      value={formData.otherCertLink}
                      onChange={(e) => handleInputChange('otherCertLink', e.target.value)}
                      placeholder="https://drive.google.com/.....or https://example.com/license.pdf"
                      className="w-full text-black px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <Info size={12} />
                      Google Drive, Dropbox, or direct PDF links
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Other Checkboxes */}
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.requireCoverLetter}
                  onChange={(e) => handleInputChange('requireCoverLetter', e.target.checked)}
                  className="w-5 h-5 accent-black rounded border-gray-300 text-blue-500 focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-700">Require Cover Letter</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.requireQuestionnaire}
                  onChange={(e) => handleInputChange('requireQuestionnaire', e.target.checked)}
                  className="w-5 h-5 accent-black rounded border-gray-300 text-blue-500 focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-700">Include Screening Questionnaire</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.requireLicense}
                  onChange={(e) => handleInputChange('requireLicense', e.target.checked)}
                  className="w-5 h-5 accent-black rounded border-gray-300 text-blue-500 focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-700">Any Relevant License(Driver's license etc)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-16 h-1 bg-gray-200 rounded-full" />
          <div className="w-16 h-1 bg-gray-200 rounded-full" />
          <div className="w-16 h-1 bg-gray-900 rounded-full" />
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
            onClick={handleCreateTask}
            className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}