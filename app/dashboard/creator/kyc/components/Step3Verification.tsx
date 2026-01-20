'use client';

import { Upload, FileText, AlertCircle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Step3Props {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step3Verification({ formData, updateFormData, onNext, onBack }: Step3Props) {
  const frontInputRef = useRef<HTMLInputElement>(null);
  const backInputRef = useRef<HTMLInputElement>(null);
  const proofInputRef = useRef<HTMLInputElement>(null);

  const [frontFileName, setFrontFileName] = useState<string>('');
  const [backFileName, setBackFileName] = useState<string>('');
  const [proofFileName, setProofFileName] = useState<string>('');

  // Load existing file names from formData
  useEffect(() => {
    if (formData.frontDocument) {
      setFrontFileName(
        formData.frontDocument instanceof File 
          ? formData.frontDocument.name 
          : 'Document uploaded'
      );
    }
    if (formData.backDocument) {
      setBackFileName(
        formData.backDocument instanceof File 
          ? formData.backDocument.name 
          : 'Document uploaded'
      );
    }
    if (formData.proofOfAddress) {
      setProofFileName(
        formData.proofOfAddress instanceof File 
          ? formData.proofOfAddress.name 
          : 'Document uploaded'
      );
    }
  }, [formData]);

  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'frontDocument' | 'backDocument' | 'proofOfAddress',
    setFileName: (name: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // Convert file to base64 for localStorage
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updateFormData(field, {
          name: file.name,
          size: file.size,
          type: file.type,
          data: base64String
        });
        setFileName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (
      formData.idType &&
      formData.documentNumber &&
      formData.frontDocument &&
      formData.backDocument &&
      formData.proofOfAddress
    ) {
      onNext();
    }
  };

  const isFormValid =
    formData.idType &&
    formData.documentNumber &&
    formData.frontDocument &&
    formData.backDocument &&
    formData.proofOfAddress;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Identity Documents</h2>
        <p className="text-gray-600">Upload your government-issued identification document</p>
      </div>

      {/* Security Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 flex items-start gap-3">
        <AlertCircle size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-900">
          All documents are encrypted and securely stored. We only verify your identity and never share your personal information.
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {/* ID Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ID Type
          </label>
          <select
            value={formData.idType}
            onChange={(e) => updateFormData('idType', e.target.value)}
            className="w-full text-gray-900 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          >
            <option value="">Select ID type</option>
            <option value="NIN">NIN (National Identity Number)</option>
            <option value="drivers_license">Driver's License</option>
            <option value="international_passport">International Passport</option>
            <option value="voters_card">Voter's Card</option>
          </select>
        </div>

        {/* Document Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Document Number
          </label>
          <input
            type="text"
            maxLength={11}
            value={formData.documentNumber}
            onChange={(e) => updateFormData('documentNumber', e.target.value)}
            placeholder="Enter your document number"
            className="w-full text-gray-900 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>

        {/* Front of Document */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Front of Document
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
            {frontFileName ? (
              <div className="flex items-center justify-center gap-2 text-gray-700">
                <FileText size={20} className="text-green-600" />
                <span className="text-sm font-medium">{frontFileName}</span>
              </div>
            ) : (
              <>
                <Upload size={32} className="mx-auto text-gray-400 mb-3" />
                <p className="text-sm text-gray-600 mb-1">Upload front image</p>
              </>
            )}
            <input
              ref={frontInputRef}
              type="file"
              accept=".pdf,.doc,.jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload(e, 'frontDocument', setFrontFileName)}
              className="hidden"
              id="front-document"
            />
            <label
              htmlFor="front-document"
              className="inline-block mt-3 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              {frontFileName ? 'Change File' : 'Choose Files'}
            </label>
            <p className="text-xs text-gray-500 mt-2">PDF, DOC, JPG, PNG up to 10MB</p>
          </div>
        </div>

        {/* Back of Document */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Back of Document
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
            {backFileName ? (
              <div className="flex items-center justify-center gap-2 text-gray-700">
                <FileText size={20} className="text-green-600" />
                <span className="text-sm font-medium">{backFileName}</span>
              </div>
            ) : (
              <>
                <Upload size={32} className="mx-auto text-gray-400 mb-3" />
                <p className="text-sm text-gray-600 mb-1">Upload back image</p>
              </>
            )}
            <input
              ref={backInputRef}
              type="file"
              accept=".pdf,.doc,.jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload(e, 'backDocument', setBackFileName)}
              className="hidden"
              id="back-document"
            />
            <label
              htmlFor="back-document"
              className="inline-block mt-3 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              {backFileName ? 'Change File' : 'Choose Files'}
            </label>
            <p className="text-xs text-gray-500 mt-2">PDF, DOC, JPG, PNG up to 10MB</p>
          </div>
        </div>

        {/* Proof of Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Proof of Address (Utility bill, bank statement)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
            {proofFileName ? (
              <div className="flex items-center justify-center gap-2 text-gray-700">
                <FileText size={20} className="text-green-600" />
                <span className="text-sm font-medium">{proofFileName}</span>
              </div>
            ) : (
              <>
                <Upload size={32} className="mx-auto text-gray-400 mb-3" />
                <p className="text-sm text-gray-600 mb-1">Upload image</p>
              </>
            )}
            <input
              ref={proofInputRef}
              type="file"
              accept=".pdf,.doc,.jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload(e, 'proofOfAddress', setProofFileName)}
              className="hidden"
              id="proof-address"
            />
            <label
              htmlFor="proof-address"
              className="inline-block mt-3 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              {proofFileName ? 'Change File' : 'Choose Files'}
            </label>
            <p className="text-xs text-gray-500 mt-2">PDF, DOC, JPG, PNG up to 10MB</p>
          </div>
        </div>

        {/* Document Guidelines */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3">Document Guidelines:</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              <span>Documents should be clear and not expired</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              <span>Documents should be valid and not expired</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              <span>No glare or shadows on the document</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              <span>Information matches the profile</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              <span>Upload both front and back sides</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-6 mt-8 border-t border-gray-200">
        <button
          onClick={onBack}
          className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Back
        </button>
        
        <button
          onClick={handleNext}
          disabled={!isFormValid}
          className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-colors ${
            isFormValid
              ? 'bg-gray-900 text-white hover:bg-gray-800'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Submit for Review
        </button>
      </div>
    </div>
  );
}