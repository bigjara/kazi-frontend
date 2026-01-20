import React, { useState } from 'react';
import { X, Upload, AlertCircle, CheckCircle, AlertTriangle, ChevronDown } from 'lucide-react';
import { useKYC } from '@/contexts/KycContext';

// --- START: UploadSection Component Definition Moved Outside ---

// Define the props interface for clarity and type safety
interface UploadSectionProps {
  type: 'registrationDoc' | 'insuranceDoc'; 
  label: string; 
  file: File | null; 
  error?: string;
  // Handler prop is now required for the component to function
  handleFileUpload: (type: 'registrationDoc' | 'insuranceDoc', e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Upload Section Component (MUST be defined outside of the main functional component)
const UploadSection = ({ 
  type, 
  label, 
  file, 
  error,
  handleFileUpload // Destructure the handler function
}: UploadSectionProps) => (
  <div>
    <label className="block text-sm font-semibold text-gray-900 mb-3">
      {label}
    </label>
    <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
      error 
        ? 'border-red-300 bg-red-50' 
        : file 
        ? 'border-green-300 bg-green-50' 
        : 'border-gray-300 bg-white hover:border-gray-400'
    }`}>
      {file ? (
        <div className="space-y-3">
          <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="w-7 h-7 text-green-600" />
          </div>
          {/* NOTE: Changed 'xxxx.jpg' to use the actual file name */}
          <p className="text-sm font-medium text-gray-900">{file.name}</p>
          <label className="inline-block px-5 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer text-sm font-medium text-gray-700 transition-colors">
            Choose Files
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,application/pdf"
              onChange={(e) => handleFileUpload(type, e)}
              className="hidden"
            />
          </label>
          <p className="text-xs text-green-600">PDF, DOC, JPG, PNG (up to 10MB)</p>
          <p className="text-xs text-green-600 font-medium">Upload successful. Click to change</p>
        </div>
      ) : (
        <>
          <div className={`w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full ${
            error ? 'bg-red-100' : 'bg-gray-100'
          }`}>
            {error ? (
              <AlertCircle className="w-7 h-7 text-red-600" />
            ) : (
              <Upload className="w-7 h-7 text-gray-400" />
            )}
          </div>
          <p className={`text-sm font-medium mb-3 ${
            error ? 'text-red-600' : 'text-gray-900'
          }`}>
            {error || `Upload ${label.toLowerCase()}`}
          </p>
          <label className="inline-block px-5 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer text-sm font-medium text-gray-700 transition-colors">
            Choose Files
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,application/pdf"
              onChange={(e) => handleFileUpload(type, e)}
              className="hidden"
            />
          </label>
          <p className={`text-xs mt-3 ${error ? 'text-red-600' : 'text-gray-500'}`}>
            PDF, DOC, JPG, PNG (up to 10MB)
          </p>
          {error && (
            <p className="text-xs text-red-600 font-medium mt-1">Upload failed. Click to retry</p>
          )}
        </>
      )}
    </div>
  </div>
);

// --- END: UploadSection Component Definition Moved Outside ---

export default function VehicleModal() {
  const { kycData, updateKYCData, completePhase, setActivePhase } = useKYC();
  
  const [formData, setFormData] = useState({
    vehicleType: kycData.vehicle.vehicleType || 'Motorcycle',
    make: kycData.vehicle.make || '',
    model: kycData.vehicle.model || '',
    year: kycData.vehicle.year || '',
    color: kycData.vehicle.color || '',
    licensePlate: kycData.vehicle.licensePlate || '',
    registrationDoc: null as File | null,
    insuranceDoc: null as File | null
  });

  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({
    make: false,
    model: false,
    year: false,
    color: false,
    licensePlate: false,
    registrationDoc: false,
    insuranceDoc: false
  });

  const vehicleTypes = [
    { value: 'Motorcycle', label: 'Motorcycle' },
    { value: 'Car', label: 'Car' },
    { value: 'Van', label: 'Van' },
    { value: 'Truck', label: 'Truck' },
    { value: 'Bicycle', label: 'Bicycle' }
  ];

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name] && value.trim()) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Handle input blur
  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Type assertion to correctly access string properties
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const value = (formData as any)[field]; 
    if (typeof value === 'string' && !value.trim()) {
      setErrors(prev => ({ ...prev, [field]: 'This field is required' }));
    } else if (field === 'year' && value.trim() && !/^\d{4}$/.test(value.trim())) {
      setErrors(prev => ({ ...prev, [field]: 'Enter a valid year' }));
    } else {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Handle file upload
  const handleFileUpload = (type: 'registrationDoc' | 'insuranceDoc', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Mark field as touched
    setTouched(prev => ({ ...prev, [type]: true }));

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      setErrors(prev => ({ 
        ...prev, 
        [type]: 'Invalid file type' 
      }));
      return;
    }

    if (file.size > maxSize) {
      setErrors(prev => ({ 
        ...prev, 
        [type]: 'File size exceeds 10MB' 
      }));
      return;
    }

    // Update form data and clear error
    setFormData(prev => ({ ...prev, [type]: file }));
    setErrors(prev => ({ ...prev, [type]: undefined }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.make.trim()) {
      newErrors.make = 'Make is required';
    }

    if (!formData.model.trim()) {
      newErrors.model = 'Model is required';
    }

    if (!formData.year.trim()) {
      newErrors.year = 'Year is required';
    } else if (!/^\d{4}$/.test(formData.year)) {
      newErrors.year = 'Enter a valid 4-digit year';
    }

    if (!formData.color.trim()) {
      newErrors.color = 'Color is required';
    }

    if (!formData.licensePlate.trim()) {
      newErrors.licensePlate = 'License plate is required';
    }

    if (!formData.registrationDoc) {
      newErrors.registrationDoc = 'Registration document is required';
    }

    if (!formData.insuranceDoc) {
      newErrors.insuranceDoc = 'Insurance document is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission with error simulation
  const handleSubmit = async () => {
    // Mark all fields as touched
    setTouched({
      make: true,
      model: true,
      year: true,
      color: true,
      licensePlate: true,
      registrationDoc: true,
      insuranceDoc: true
    });

    if (!validateForm()) {
      return;
    }

    setUploadStatus('uploading');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate random failure (40% chance for demo)
    const shouldFail = Math.random() > 0.6;
    
    if (shouldFail) {
      setUploadStatus('error');
      setShowErrorModal(true);
    } else {
      setUploadStatus('success');
      // Only store necessary data in KYC context, excluding the large File objects for simplicity in context
      const kycDataToStore = {
          vehicleType: formData.vehicleType,
          make: formData.make,
          model: formData.model,
          year: formData.year,
          color: formData.color,
          licensePlate: formData.licensePlate,
          // You might store a reference/path or just confirm they were uploaded
          registrationDocUploaded: !!formData.registrationDoc,
          insuranceDocUploaded: !!formData.insuranceDoc,
      };
      updateKYCData('vehicle', kycDataToStore);
      completePhase('vehicle');
      setActivePhase(null);
    }
  };

  // Retry upload
  const retryUpload = () => {
    setShowErrorModal(false);
    handleSubmit();
  };

  // Error Modal Component
  if (showErrorModal) {
    return (
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
          <div className="p-8">
            <button
              onClick={() => setShowErrorModal(false)}
              className="float-right text-gray-400 hover:text-gray-600 transition-colors -mt-2 -mr-2"
            >
              <X size={20} />
            </button>
            
            <div className="flex flex-col items-center text-center mt-2">
              <div className="w-20 h-20 bg-yellow-100 rounded-2xl flex items-center justify-center mb-6">
                <AlertTriangle className="w-10 h-10 text-yellow-600" />
              </div>
              
              <h2 className="text-2xl font-bold mb-3 text-gray-900">Upload Failed</h2>
              <p className="text-sm text-gray-600 mb-8 leading-relaxed max-w-sm">
                We encountered a technical issue while processing your KYC documents. This is a temporary 
                system error and your information is safe.
              </p>
              
              <div className="bg-gray-50 rounded-xl p-5 w-full mb-8 text-left">
                <h3 className="text-sm font-semibold mb-4 text-gray-900">What to Do Next</h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-600 mt-0.5 flex-shrink-0">●</span>
                    <span>Check your internet connection and try uploading again</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-600 mt-0.5 flex-shrink-0">●</span>
                    <span>Ensure your documents are in the correct format (PDF, JPG, PNG)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-600 mt-0.5 flex-shrink-0">●</span>
                    <span>Verify that each file is under 10MB in size</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-600 mt-0.5 flex-shrink-0">●</span>
                    <span>If the problem persists, contact our support team</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setShowErrorModal(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
                >
                  Contact Support
                </button>
                <button
                  onClick={retryUpload}
                  className="flex-1 py-3 px-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                >
                  Retry Upload
                </button>
              </div>
              
              <p className="text-xs text-gray-500 mt-8">
                Error Code: SYS_UPLOAD_001-042 • Occurred at {new Date().toLocaleString('en-US', { 
                  month: 'numeric', 
                  day: 'numeric', 
                  year: 'numeric', 
                  hour: 'numeric', 
                  minute: 'numeric', 
                  second: 'numeric',
                  hour12: true 
                })}
              </p>
              
              <div className="flex gap-6 mt-4 text-xs text-gray-500">
                <button className="hover:text-gray-700 transition-colors">Privacy Policy</button>
                <button className="hover:text-gray-700 transition-colors">Terms of Service</button>
                <button className="hover:text-gray-700 transition-colors">Help Center</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // The 'UploadSection' component is now correctly defined outside the 'VehicleModal' function.

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Vehicle Information</h2>
            <p className="text-sm text-gray-500 mt-0.5">Provide details about your delivery vehicle</p>
          </div>
          <button
            onClick={() => setActivePhase(null)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <style>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {/* Vehicle Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Vehicle Type
            </label>
            <div className="relative">
              <select
                name="vehicleType"
                value={formData.vehicleType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-900 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                {vehicleTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Make */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Make
            </label>
            <input
              type="text"
              name="make"
              value={formData.make}
              onChange={handleChange}
              onBlur={() => handleBlur('make')}
              placeholder="e.g., Honda, Suzuki"
              className={`w-full px-4 py-3 border rounded-lg text-sm text-gray-900 placeholder:text-gray-400 transition-all ${
                errors.make && touched.make
                  ? 'border-red-300 bg-red-50 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-blue-500'
              } focus:outline-none focus:ring-2 focus:border-transparent`}
            />
             {errors.make && touched.make && (
              <p className="text-xs text-red-600 mt-2 flex items-center gap-1.5">
                <AlertCircle size={14} />
                {errors.make}
              </p>
            )}
          </div>

          {/* Model and Year */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Model
              </label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                onBlur={() => handleBlur('model')}
                placeholder="e.g., CBX, FRS"
                className={`w-full px-4 py-3 border rounded-lg text-sm text-gray-900 placeholder:text-gray-400 transition-all ${
                  errors.model && touched.model
                    ? 'border-red-300 bg-red-50 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-blue-500'
                } focus:outline-none focus:ring-2 focus:border-transparent`}
              />
              {errors.model && touched.model && (
                <p className="text-xs text-red-600 mt-2 flex items-center gap-1.5">
                  <AlertCircle size={14} />
                  {errors.model}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Year
              </label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                onBlur={() => handleBlur('year')}
                placeholder="e.g., 2019"
                className={`w-full px-4 py-3 border rounded-lg text-sm text-gray-900 placeholder:text-gray-400 transition-all ${
                  errors.year && touched.year
                    ? 'border-red-300 bg-red-50 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-blue-500'
                } focus:outline-none focus:ring-2 focus:border-transparent`}
              />
              {errors.year && touched.year && (
                <p className="text-xs text-red-600 mt-2 flex items-center gap-1.5">
                  <AlertCircle size={14} />
                  {errors.year}
                </p>
              )}
            </div>
          </div>

          {/* Color and License Plate */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Color
              </label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                onBlur={() => handleBlur('color')}
                placeholder="e.g., Blue"
                className={`w-full px-4 py-3 border rounded-lg text-sm text-gray-900 placeholder:text-gray-400 transition-all ${
                  errors.color && touched.color
                    ? 'border-red-300 bg-red-50 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-blue-500'
                } focus:outline-none focus:ring-2 focus:border-transparent`}
              />
              {errors.color && touched.color && (
                <p className="text-xs text-red-600 mt-2 flex items-center gap-1.5">
                  <AlertCircle size={14} />
                  {errors.color}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                License Plate
              </label>
              <input
                type="text"
                name="licensePlate"
                value={formData.licensePlate}
                onChange={handleChange}
                onBlur={() => handleBlur('licensePlate')}
                placeholder="e.g., ABC-123"
                className={`w-full px-4 py-3 border rounded-lg text-sm text-gray-900 placeholder:text-gray-400 transition-all ${
                  errors.licensePlate && touched.licensePlate
                    ? 'border-red-300 bg-red-50 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-blue-500'
                } focus:outline-none focus:ring-2 focus:border-transparent`}
              />
              {errors.licensePlate && touched.licensePlate && (
                <p className="text-xs text-red-600 mt-2 flex items-center gap-1.5">
                  <AlertCircle size={14} />
                  {errors.licensePlate}
                </p>
              )}
            </div>
          </div>

          {/* Vehicle Registration Document */}
          <UploadSection
            type="registrationDoc"
            label="Vehicle Registration Document"
            file={formData.registrationDoc}
            error={touched.registrationDoc ? errors.registrationDoc : undefined}
            handleFileUpload={handleFileUpload} // Pass the handler
          />

          {/* Insurance Document */}
          <UploadSection
            type="insuranceDoc"
            label="Insurance Document"
            file={formData.insuranceDoc}
            error={touched.insuranceDoc ? errors.insuranceDoc : undefined}
            handleFileUpload={handleFileUpload} // Pass the handler
          />

          {/* Required Documents */}
          <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Required Documents:</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
                <span>Valid vehicle registration certificate</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
                <span>Current insurance policy document</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
                <span>Documents must be clear and readable</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1 flex-shrink-0">•</span>
                <span>Ensure documents are not expired</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3 bg-gray-50 flex-shrink-0">
          <button
            onClick={() => setActivePhase(null)}
            className="px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-white transition-colors text-sm font-medium text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={uploadStatus === 'uploading'}
            className="px-6 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploadStatus === 'uploading' ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Submitting...
              </span>
            ) : (
              'Submit Documents'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}