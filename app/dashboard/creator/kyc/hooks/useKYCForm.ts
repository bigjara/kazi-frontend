'use client';

import { useState, useEffect } from 'react';

export interface KYCFormData {
  // Step 1
  industry: string;
  accountType: 'business' | 'individual' | '';
  
  // Step 2
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  state: string;
  city: string;
  profilePhoto?: File | string;
  
  // Step 3
  idType: string;
  documentNumber: string;
  frontDocument?: File | string;
  backDocument?: File | string;
  proofOfAddress?: File | string;
}

const initialFormData: KYCFormData = {
  industry: '',
  accountType: '',
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  state: '',
  city: '',
  idType: '',
  documentNumber: '',
};

export function useKYCForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<KYCFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('creator_kyc_data');
    const savedStep = localStorage.getItem('creator_kyc_current_step');
    
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error parsing saved KYC data:', error);
      }
    }
    
    if (savedStep) {
      setCurrentStep(parseInt(savedStep));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('creator_kyc_data', JSON.stringify(formData));
    localStorage.setItem('creator_kyc_current_step', currentStep.toString());
  }, [formData, currentStep]);

  const updateFormData = (field: string, value: any) => {  // Changed from keyof KYCFormData
  setFormData(prev => ({ ...prev, [field]: value }));
};

  const updateMultipleFields = (fields: Partial<KYCFormData>) => {
    setFormData(prev => ({ ...prev, ...fields }));
  };

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 1 && step <= 5) {
      setCurrentStep(step);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
    localStorage.removeItem('creator_kyc_data');
    localStorage.removeItem('creator_kyc_current_step');
  };

  const completeKYC = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mark KYC as completed
      localStorage.setItem('creator_kyc_status', 'completed');
      localStorage.removeItem('creator_kyc_data');
      localStorage.removeItem('creator_kyc_current_step');
      
      return true;
    } catch (error) {
      console.error('Error completing KYC:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const getProgress = () => {
    return (currentStep / 5) * 100;
  };

  return {
    currentStep,
    formData,
    isLoading,
    updateFormData,
    updateMultipleFields,
    nextStep,
    prevStep,
    goToStep,
    resetForm,
    completeKYC,
    getProgress,
  };
}