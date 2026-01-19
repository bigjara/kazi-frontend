import React, { useState } from 'react';
import { X, Camera, AlertCircle, AlertTriangle } from 'lucide-react';
import { useKYC } from '@/contexts/KycContext';


export default function ProfileModal() {
  const { kycData, updateKYCData, completePhase, setActivePhase } = useKYC();
  
  const [formData, setFormData] = useState({
    photo: null as File | null,
    photoPreview: null as string | null,
    location: kycData.profile.location || '',
    phone: kycData.profile.phone || '',
    state: kycData.profile.state || '',
    city: kycData.profile.city || '',
    industry: kycData.profile.industry || []
  });

  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [showErrorModal, setShowErrorModal] = useState(false);

  // Handle photo upload
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      setErrors(prev => ({ ...prev, photo: 'Upload failed. Click to retry' }));
      return;
    }

    if (file.size > maxSize) {
      setErrors(prev => ({ ...prev, photo: 'Upload failed. Click to retry' }));
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        photo: file,
        photoPreview: reader.result as string
      }));
      setErrors(prev => ({ ...prev, photo: undefined }));
    };
    reader.readAsDataURL(file);
  };

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Handle industry selection
  const handleIndustryChange = (industry: string) => {
    setFormData(prev => {
      const industries = prev.industry.includes(industry)
        ? prev.industry.filter(i => i !== industry)
        : [...prev.industry, industry];
      return { ...prev, industry: industries };
    });
  };

  // Validate phone number
  const validatePhone = (phone: string) => {
    const phoneRegex = /^[0-9]{11}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  // Handle form validation
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Enter a valid phone number';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Enter a valid phone number';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (formData.industry.length === 0) {
      newErrors.industry = 'Select at least one industry';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle save with error
  const handleSaveWithError = async () => {
    setUploadStatus('uploading');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate random failure (50% chance for demo)
    const shouldFail = Math.random() > 0.5;
    
    if (shouldFail) {
      setUploadStatus('error');
      setShowErrorModal(true);
    } else {
      setUploadStatus('success');
      // Save to context and complete
      updateKYCData('profile', formData);
      completePhase('profile');
      setActivePhase(null);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    handleSaveWithError();
  };

  const isProfileFormValid = 
    formData.location.trim() !== '';

  const industries = [
    { value: 'logistics', label: 'Logistics & Delivery', desc: 'Shipping, courier, logistics' },
    { value: 'tech', label: 'Technology & Development', desc: 'Software, IT, digital services' },
    { value: 'creative', label: 'Creative & Design', desc: 'Graphics, content, media' },
    { value: 'education', label: 'Education & Training', desc: 'Teaching, courses, tutoring' },
    { value: 'retail', label: 'Retail & Services', desc: 'Shops, customer services' },
    { value: 'professional', label: 'Professional Services', desc: 'Consulting, legal, finance' },
    { value: 'food', label: 'Food & Catering', desc: 'Restaurants, food delivery' },
    { value: 'healthcare', label: 'Healthcare & Wellness', desc: 'Medical, fitness, therapy' }
  ];

  // Error Modal Component
  if (showErrorModal) {
    return (
      <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-8">
          <button
            onClick={() => setShowErrorModal(false)}
            className="float-right text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
          
          <div className="flex flex-col items-center text-center mt-4">
            <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mb-6">
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
            </div>
            
            <h2 className="text-xl font-bold mb-3">Upload Failed</h2>
            <p className="text-sm text-gray-600 mb-6 leading-relaxed">
              We encountered a technical issue while processing your KYC documents. This is a temporary 
              system error and your information is safe.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4 w-full mb-6 text-left">
              <h3 className="text-sm font-semibold mb-3 text-black">What to Do Next</h3>
              <ul className="space-y-2 text-xs text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-0.5">●</span>
                  <span>Check your internet connection and try uploading again</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-0.5">●</span>
                  <span>Ensure your pic is in the correct format (JPG, PNG)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-0.5">●</span>
                  <span>Verify that the pic is under 10MB in size</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-600 mt-0.5">●</span>
                  <span>If the problem persists, contact our support team</span>
                </li>
              </ul>
            </div>
            
            <div className="flex gap-3 w-full justify-end my-m1">
              <button
                onClick={() => setShowErrorModal(false)}
                className="text-black py-1 px-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Contact Support
              </button>
              <button
                onClick={() => {
                  setShowErrorModal(false);
                  handleSaveWithError();
                }}
                className="py-1 px-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
              >
                Retry Upload
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mt-6">
              Error Code: SYS_UPLOAD_042-001 • Occurred at 8/6/2025, 1:35:12 AM
            </p>
            
            <div className="flex gap-6 mt-4 text-xs text-gray-500">
              <button className="hover:text-gray-700">Privacy Policy</button>
              <button className="hover:text-gray-700">Terms of Service</button>
              <button className="hover:text-gray-700">Help Center</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bg-transparent flex items-center justify-center z-50 p-4 ">
      <div className="bg-white rounded-lg w-full max-w-lg h-[90vh] overflow-y-auto scrollbar-hide">
        <div className="sticky top-0 bg-white  border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Complete Your Profile!</h2>
            <p className="text-xs text-gray-500">Fill in you personal details</p>
          </div>
          <button
            onClick={() => setActivePhase(null)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Profile Photo */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Profile Photo
            </label>
            <div className={`border-2 border-dashed text-gray-700 rounded-lg p-8 text-center ${
              errors.photo ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}>
              {formData.photoPreview ? (
                <div className="relative">
                  <img 
                    src={formData.photoPreview} 
                    alt="Preview" 
                    className="w-24 h-24 rounded-full mx-auto object-cover"
                  />
                  <button
                    onClick={() => setFormData(prev => ({ ...prev, photo: null, photoPreview: null }))}
                    className="absolute top-0 right-1/2 transform translate-x-12 bg-red-100 rounded-full p-1"
                  >
                    <X size={16} className="text-red-600" />
                  </button>
                </div>
              ) : (
                <>
                  <div className={`w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full ${
                    errors.photo ? 'bg-red-100' : 'bg-gray-100'
                  }`}>
                    {errors.photo ? (
                      <AlertCircle className="w-6 h-6 text-red-500" />
                    ) : (
                      <Camera className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <p className={`text-sm mb-2 ${errors.photo ? 'text-red-600' : 'text-gray-600'}`}>
                    {errors.photo || 'Upload your photo'}
                  </p>
                  <label className="inline-block px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer text-sm">
                    Choose Files
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </label>
                  <p className={`text-xs mt-2 ${errors.photo ? 'text-red-500' : 'text-gray-400'}`}>
                    {errors.photo ? 'Upload failed. Click to retry' : 'JPG, JPEG, JPG, PNG (up to 10MB)'}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter your address"
              className={`w-full px-3 py-2.5 border text-gray-700 rounded-lg text-sm ${
                errors.location ? 'border-red-300' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className={`w-full px-3 py-2.5 border text-gray-700 rounded-lg text-sm ${
                errors.phone ? 'border-red-300' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle size={12} />
                {errors.phone}
              </p>
            )}
          </div>

          {/* State and City */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter your state"
                className={`w-full px-3 py-2.5 border text-gray-700 rounded-lg text-sm ${
                  errors.state ? 'border-red-300' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter your city"
                className={`w-full px-3 py-2.5 border text-gray-700 rounded-lg text-sm ${
                  errors.city ? 'border-red-300' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          </div>

          {/* Industry */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-3">
              Industry
            </label>
            <div className="grid grid-cols-2 gap-3">
              {industries.map(industry => (
                <label
                  key={industry.value}
                  className={`border rounded-lg p-3 text-gray-700 cursor-pointer transition-all ${
                    formData.industry.includes(industry.value)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.industry.includes(industry.value)}
                    onChange={() => handleIndustryChange(industry.value)}
                    className="sr-only"
                  />
                  <div className="flex items-start gap-2">
                    <div className={`w-4 h-4 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center ${
                      formData.industry.includes(industry.value)
                        ? 'bg-blue-600 border-blue-600'
                        : 'border-gray-300'
                    }`}>
                      {formData.industry.includes(industry.value) && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-medium text-gray-900">{industry.label}</p>
                      <p className="text-xs text-gray-500">{industry.desc}</p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white  border-gray-200 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={() => setActivePhase(null)}
            className=" py-2.5 px-6 border text-gray-700 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={uploadStatus === 'uploading' || !isProfileFormValid}
            
            className=" py-2.5 px-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploadStatus === 'uploading' ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </div>
    </div>
  );
}