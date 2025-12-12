'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface KYCCompletion {
  profile: boolean;
  identity: boolean;
  vehicle: boolean;
}

interface KYCErrors {
  profile: boolean;
  identity: boolean;
  vehicle: boolean;
}

interface KYCData {
  profile: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    location?: string;
    industry?: Array<string>;
  };
  identity: {
    idType?: string;
    idNumber?: string;
    frontImage?: File | null;
    backImage?: File | null;
  };
  vehicle: {
    vehicleType?: string;
    plateNumber?: string;
    vehicleModel?: string;
    vehicleYear?: string;
    color?: string;
    insuranceProvider?: string;
    insuranceExpiry?: string;
    make?: string;
    model?: string;
    year?: string;
    licensePlate?: string;
  };
}

interface KYCContextType {
  accountLocked: boolean;
  showKYCModal: boolean;
  activePhase: 'profile' | 'identity' | 'vehicle' | null;
  completion: KYCCompletion;
  hasError: KYCErrors;
  kycData: KYCData;
  isLoading: boolean;
  verificationStatus: 'idle' | 'verifying' | 'verified';
  setShowKYCModal: (show: boolean) => void;
  setActivePhase: (phase: 'profile' | 'identity' | 'vehicle' | null) => void;
  setPhaseError: (phase: 'profile' | 'identity' | 'vehicle', error: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateKYCData: (phase: 'profile' | 'identity' | 'vehicle', data: any) => void;
  completePhase: (phase: 'profile' | 'identity' | 'vehicle') => void;
  completeAllKYC: () => void;
  submitForVerification: () => Promise<void>;
  resetKYC: () => void; // Add reset function
}

const KYCContext = createContext<KYCContextType | undefined>(undefined);

export function KYCProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [accountLocked, setAccountLocked] = useState(true);
  const [showKYCModal, setShowKYCModal] = useState(false);
  const [activePhase, setActivePhase] = useState<'profile' | 'identity' | 'vehicle' | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'verified'>('idle');
  
  const [completion, setCompletion] = useState<KYCCompletion>({
    profile: false,
    identity: false,
    vehicle: false,
  });

  const [hasError, setHasError] = useState<KYCErrors>({
    profile: false,
    identity: false,
    vehicle: false,
  });

  const [kycData, setKYCData] = useState<KYCData>({
    profile: {},
    identity: {},
    vehicle: {},
  });

  // Fetch KYC status on mount
  useEffect(() => {
    const fetchKYCStatus = async () => {
      try {
        if (typeof window === 'undefined') return;
        
        const locked = localStorage.getItem('accountLocked');
        const savedCompletion = localStorage.getItem('kycCompletion');
        const savedData = localStorage.getItem('kycData');
        const savedErrors = localStorage.getItem('kycErrors');
        const savedVerificationStatus = localStorage.getItem('verificationStatus');
        
        // FIX 1: Always check if account is locked
        if (locked === null || locked === 'true') {
          setAccountLocked(true);
          // If account is locked, ensure verification status is idle
          setVerificationStatus('idle');
        } else {
          setAccountLocked(false);
          // If unlocked, check saved verification status
          if (savedVerificationStatus === 'verified') {
            setVerificationStatus('verified');
          }
        }
        
        // FIX 2: Only load completion if data exists
        if (savedCompletion) {
          try {
            const parsed = JSON.parse(savedCompletion);
            setCompletion(parsed);
          } catch {
            // If parsing fails, reset to default
            setCompletion({
              profile: false,
              identity: false,
              vehicle: false,
            });
          }
        }
        
        if (savedData) {
          try {
            setKYCData(JSON.parse(savedData));
          } catch {
            setKYCData({
              profile: {},
              identity: {},
              vehicle: {},
            });
          }
        }

        if (savedErrors) {
          try {
            setHasError(JSON.parse(savedErrors));
          } catch {
            setHasError({
              profile: false,
              identity: false,
              vehicle: false,
            });
          }
        }

        // Only set verifying/verified status if we actually have that status saved
        if (savedVerificationStatus && savedVerificationStatus !== 'idle' && locked === 'false') {
          setVerificationStatus(savedVerificationStatus as 'idle' | 'verifying' | 'verified');
        }
      } catch (error) {
        console.error('Error fetching KYC status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKYCStatus();
  }, []);

  const setPhaseError = (phase: 'profile' | 'identity' | 'vehicle', error: boolean) => {
    setHasError(prev => {
      const updated = { ...prev, [phase]: error };
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('kycErrors', JSON.stringify(updated));
      }
      
      return updated;
    });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateKYCData = (phase: 'profile' | 'identity' | 'vehicle', data: any) => {
    setKYCData(prev => {
      const updated = {
        ...prev,
        [phase]: { ...prev[phase], ...data }
      };
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('kycData', JSON.stringify(updated));
      }
      
      return updated;
    });
  };

  const completePhase = async (phase: 'profile' | 'identity' | 'vehicle') => {
    try {
      const updatedCompletion = { ...completion, [phase]: true };
      setCompletion(updatedCompletion);
      
      setPhaseError(phase, false);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('kycCompletion', JSON.stringify(updatedCompletion));
      }
      
      setActivePhase(null);
      
      // FIX 3: Only auto-submit if ALL three phases are truly complete
      // Check that each phase actually has data too, not just completion flag
      const allPhasesComplete = 
        updatedCompletion.profile && 
        updatedCompletion.identity && 
        updatedCompletion.vehicle;
      
      if (allPhasesComplete) {
        console.log('All phases complete, submitting for verification...');
        await submitForVerification();
      }
    } catch (error) {
      console.error(`Error completing ${phase}:`, error);
    }
  };

  const submitForVerification = async () => {
    try {
      console.log('Submitting for verification...', kycData);
      
      // Set status to verifying
      setVerificationStatus('verifying');
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('verificationStatus', 'verifying');
      }

      // TODO: Replace this with your actual API call
      // Example:
      // const response = await fetch('/api/kyc/submit', {
      //   method: 'POST',
      //   body: JSON.stringify(kycData),
      //   headers: { 'Content-Type': 'application/json' }
      // });
      
      // Simulate backend processing (remove this in production)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // On success from backend, set to verified
      setVerificationStatus('verified');
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('verificationStatus', 'verified');
      }
      
      // After verification is complete, unlock account
      await completeAllKYC();
      
    } catch (error) {
      console.error('Error submitting for verification:', error);
      // On error, reset to idle so user can try again
      setVerificationStatus('idle');
      if (typeof window !== 'undefined') {
        localStorage.setItem('verificationStatus', 'idle');
      }
    }
  };

  const completeAllKYC = async () => {
    try {
      setAccountLocked(false);
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('accountLocked', 'false');
      }
    } catch (error) {
      console.error('Error completing KYC:', error);
    }
  };

  // FIX 4: Add a reset function for testing/debugging
  const resetKYC = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accountLocked');
      localStorage.removeItem('kycCompletion');
      localStorage.removeItem('kycData');
      localStorage.removeItem('kycErrors');
      localStorage.removeItem('verificationStatus');
    }
    
    setAccountLocked(true);
    setShowKYCModal(false);
    setActivePhase(null);
    setVerificationStatus('idle');
    setCompletion({
      profile: false,
      identity: false,
      vehicle: false,
    });
    setHasError({
      profile: false,
      identity: false,
      vehicle: false,
    });
    setKYCData({
      profile: {},
      identity: {},
      vehicle: {},
    });
  };

  return (
    <KYCContext.Provider
      value={{
        accountLocked,
        showKYCModal,
        activePhase,
        completion,
        hasError,
        kycData,
        isLoading,
        verificationStatus,
        setShowKYCModal,
        setActivePhase,
        setPhaseError,
        updateKYCData,
        completePhase,
        completeAllKYC,
        submitForVerification,
        resetKYC, // Export reset function
      }}
    >
      {children}
    </KYCContext.Provider>
  );
}

export function useKYC() {
  const context = useContext(KYCContext);
  if (!context || context === undefined) {
    throw new Error('useKYC must be used within KYCProvider');
  }
  return context;
}
