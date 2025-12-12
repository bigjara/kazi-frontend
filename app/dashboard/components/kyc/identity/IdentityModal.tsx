import React, { useState } from 'react';
import { X, Upload, AlertCircle, CheckCircle, AlertTriangle, ChevronDown } from 'lucide-react';
import { useKYC } from '@/contexts/KycContext';

// --- START: UPLOAD SECTION COMPONENT MOVED OUTSIDE OF IDENTITYMODAL ---

// Define the props interface for clarity and type safety
interface UploadSectionProps {
  type: 'front' | 'back';
  label: string;
  file: File | null;
  preview: string | null;
  error?: string;
  handleFileUpload: (type: 'front' | 'back', e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Upload Section Component (Moved outside to prevent re-creation during render)
const UploadSection = ({ 
  type, 
  label, 
  file, 
  preview, 
  error,
  handleFileUpload
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
          <div className={`w-14 h-14 mx-auto flex items-center justify-center rounded-full ${
            error ? 'bg-red-100' : 'bg-green-100'
          }`}>
            {error ? (
              <AlertCircle className="w-7 h-7 text-red-600" />
            ) : (
              <CheckCircle className="w-7 h-7 text-green-600" />
            )}
          </div>
          {preview && (
            <img 
              src={preview} 
              alt="Document preview" 
              className="w-32 h-32 object-cover rounded-lg mx-auto border border-gray-200"
            />
          )}
          <p className="text-sm font-medium text-gray-900">{file.name}</p>
          <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
          <label className="inline-block px-5 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer text-sm font-medium text-gray-700 transition-colors">
            Choose Files
            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,application/pdf"
              onChange={(e) => handleFileUpload(type, e)}
              className="hidden"
            />
          </label>
          {error && (
            <p className="text-xs text-red-600 mt-2">Upload failed. Click to retry</p>
          )}
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
            {error || `Upload ${type} image`}
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
            {error ? 'Upload failed. Click to retry' : 'PDF, DOC, JPG, PNG (up to 10MB)'}
          </p>
        </>
      )}
    </div>
  </div>
);

// --- END: UPLOAD SECTION COMPONENT MOVED OUTSIDE OF IDENTITYMODAL ---

export default function IdentityModal() {
  const { kycData, updateKYCData, completePhase, setActivePhase } = useKYC();
  
  const [formData, setFormData] = useState({
    idType: kycData.identity.idType || 'NIN',
    idNumber: kycData.identity.idNumber || '',
    frontImage: null as File | null,
    frontImagePreview: null as string | null,
    backImage: null as File | null,
    backImagePreview: null as string | null
  });

  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({
    idNumber: false,
    frontImage: false,
    backImage: false
  });

  const documentTypes = [
    { value: 'NIN', label: 'NIN' },
    { value: 'Drivers License', label: 'Drivers License' },
    { value: 'Voters Card', label: 'Voters Card' },
    { value: 'International Passport', label: 'International Passport' }
  ];

  // Handle document type change
  const handleDocumentTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, idType: e.target.value }));
  };

  // Handle ID number input
  const handleIdNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, idNumber: value }));
    
    // Clear error when user types
    if (errors.idNumber && value.trim()) {
      setErrors(prev => ({ ...prev, idNumber: undefined }));
    }
  };

  // Handle ID number blur
  const handleIdNumberBlur = () => {
    setTouched(prev => ({ ...prev, idNumber: true }));
    
    if (!formData.idNumber.trim()) {
      setErrors(prev => ({ ...prev, idNumber: 'Document number is required' }));
    } else if (formData.idNumber.length < 8) {
      setErrors(prev => ({ ...prev, idNumber: 'Enter a valid document number' }));
    } else {
      setErrors(prev => ({ ...prev, idNumber: undefined }));
    }
  };

  // Handle file upload
  const handleFileUpload = (type: 'front' | 'back', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Mark field as touched
    setTouched(prev => ({ ...prev, [type === 'front' ? 'frontImage' : 'backImage']: true }));

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      setErrors(prev => ({ 
        ...prev, 
        [type === 'front' ? 'frontImage' : 'backImage']: 'Upload failed. Click to retry' 
      }));
      return;
    }

    if (file.size > maxSize) {
      setErrors(prev => ({ 
        ...prev, 
        [type === 'front' ? 'frontImage' : 'backImage']: 'Upload failed. Click to retry' 
      }));
      return;
    }

    // Clear error if file passes initial validation
    setErrors(prev => ({ 
        ...prev, 
        [type === 'front' ? 'frontImage' : 'backImage']: undefined
    }));


    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'front') {
          setFormData(prev => ({
            ...prev,
            frontImage: file,
            frontImagePreview: reader.result as string
          }));
        } else {
          setFormData(prev => ({
            ...prev,
            backImage: file,
            backImagePreview: reader.result as string
          }));
        }
      };
      reader.readAsDataURL(file);
    } else {
      // For PDFs
      if (type === 'front') {
        setFormData(prev => ({ ...prev, frontImage: file, frontImagePreview: null }));
      } else {
        setFormData(prev => ({ ...prev, backImage: file, backImagePreview: null }));
      }
    }
  };

  // Remove uploaded file (Unused in original, but good practice)
  const removeFile = (type: 'front' | 'back') => {
    if (type === 'front') {
      setFormData(prev => ({ ...prev, frontImage: null, frontImagePreview: null }));
    } else {
      setFormData(prev => ({ ...prev, backImage: null, backImagePreview: null }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.idNumber.trim()) {
      newErrors.idNumber = 'Document number is required';
    } else if (formData.idNumber.length < 8) {
      newErrors.idNumber = 'Enter a valid document number';
    }

    if (!formData.frontImage) {
      newErrors.frontImage = 'Front image is required';
    }

    if (!formData.backImage) {
      newErrors.backImage = 'Back image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission with error simulation
  const handleSubmit = async () => {
    // Mark all fields as touched
    setTouched({
      idNumber: true,
      frontImage: true,
      backImage: true
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
      // Pass only the relevant data back to the context
      updateKYCData('identity', {
        idType: formData.idType,
        idNumber: formData.idNumber,
        frontImage: formData.frontImage, // Note: This will save the File object, which might not be serializable for localStorage in the context. If issues arise, consider sending base64 or a reference.
        backImage: formData.backImage,
      });
      completePhase('identity');
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
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
          <div className="p-8">
            <button
              onClick={() => setShowErrorModal(false)}
              className="float-right text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="flex flex-col items-center text-center mt-2">
              <div className="w-20 h-20 bg-yellow-100 rounded-2xl flex items-center justify-center mb-6">
                <AlertTriangle className="w-10 h-10 text-yellow-600" />
              </div>
              
              <h2 className="text-2xl font-bold mb-3 text-gray-900">Upload Failed</h2>
              <p className="text-sm text-gray-600 mb-8 leading-relaxed max-w-md">
                We encountered a technical issue while processing your KYC documents. This is a temporary 
                system error and your information is safe.
              </p>
              
              <div className="bg-gray-50 rounded-xl p-5 w-full mb-8 text-left">
                <h3 className="text-sm font-semibold mb-4 text-gray-900">What to Do Next</h3>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-600 mt-1 text-xs">●</span>
                    <span>Check your internet connection and try uploading again</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-600 mt-1 text-xs">●</span>
                    <span>Ensure your documents are in the correct format (PDF, JPG, PNG)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-600 mt-1 text-xs">●</span>
                    <span>Verify that each file is under 10MB in size</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-yellow-600 mt-1 text-xs">●</span>
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

  // NOTE: The 'UploadSection' component definition has been moved above the 'IdentityModal' export.

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Your Identity Documents</h2>
            <p className="text-sm text-gray-500 mt-0.5">Upload your government-issued identification document</p>
          </div>
          <button
            onClick={() => setActivePhase(null)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Document Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Document Type
            </label>
            <div className="relative">
              <select
                value={formData.idType}
                onChange={handleDocumentTypeChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-900 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                {documentTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Document Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Document Number
            </label>
            <input
              type="text"
              value={formData.idNumber}
              onChange={handleIdNumberChange}
              onBlur={handleIdNumberBlur}
              placeholder="Enter your nin number"
              className={`w-full px-4 py-3 border rounded-lg text-sm text-gray-900 placeholder:text-gray-400 transition-all ${
                errors.idNumber && touched.idNumber
                  ? 'border-red-300 bg-red-50 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-blue-500'
              } focus:outline-none focus:ring-2 focus:border-transparent`}
            />
            {errors.idNumber && touched.idNumber && (
              <p className="text-xs text-red-600 mt-2 flex items-center gap-1.5">
                <AlertCircle size={14} />
                {errors.idNumber}
              </p>
            )}
          </div>

          {/* Front of Document */}
          <UploadSection
            type="front"
            label="Front of Document"
            file={formData.frontImage}
            preview={formData.frontImagePreview}
            error={touched.frontImage ? errors.frontImage : undefined}
            handleFileUpload={handleFileUpload} // Pass the handler now that it's an external component
          />

          {/* Back of Document */}
          <UploadSection
            type="back"
            label="Back of Document"
            file={formData.backImage}
            preview={formData.backImagePreview}
            error={touched.backImage ? errors.backImage : undefined}
            handleFileUpload={handleFileUpload} // Pass the handler
          />

          {/* Document Guidelines */}
          <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Document Guidelines:</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Ensure all text is clearly visible and readable</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Document should be valid and not expired</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>No glare or shadows on the document</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>Upload both front and back sides</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-end gap-3 bg-gray-50">
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