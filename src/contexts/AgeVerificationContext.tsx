import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AgeVerificationContextType {
  isVerified: boolean;
  isUnder13: boolean | null;
  hasParentalConsent: boolean;
  verifyAge: (age: number, hasConsent?: boolean) => void;
  resetVerification: () => void;
  showAgeModal: boolean;
  setShowAgeModal: (show: boolean) => void;
}

const AgeVerificationContext = createContext<AgeVerificationContextType | undefined>(undefined);

interface AgeVerificationProviderProps {
  children: ReactNode;
}

export const AgeVerificationProvider: React.FC<AgeVerificationProviderProps> = ({ children }) => {
  const [isVerified, setIsVerified] = useState(false);
  const [isUnder13, setIsUnder13] = useState<boolean | null>(null);
  const [hasParentalConsent, setHasParentalConsent] = useState(false);
  const [showAgeModal, setShowAgeModal] = useState(false);

  // Check for existing verification on mount
  useEffect(() => {
    const savedVerification = localStorage.getItem('pandagarde-age-verification');
    if (savedVerification) {
      try {
        const { verified, under13, consent } = JSON.parse(savedVerification);
        setIsVerified(verified);
        setIsUnder13(under13);
        setHasParentalConsent(consent);
      } catch (error) {
        console.error('Error parsing age verification data:', error);
        // Clear invalid data
        localStorage.removeItem('pandagarde-age-verification');
      }
    } else {
      // Show age modal if no verification exists
      setShowAgeModal(true);
    }
  }, []);

  const verifyAge = (age: number, hasConsent: boolean = false) => {
    const under13 = age < 13;
    const consent = under13 ? hasConsent : true; // Over 13 doesn't need parental consent
    
    setIsVerified(true);
    setIsUnder13(under13);
    setHasParentalConsent(consent);
    setShowAgeModal(false);

    // Save to localStorage
    const verificationData = {
      verified: true,
      under13,
      consent,
      timestamp: Date.now()
    };
    localStorage.setItem('pandagarde-age-verification', JSON.stringify(verificationData));
  };

  const resetVerification = () => {
    setIsVerified(false);
    setIsUnder13(null);
    setHasParentalConsent(false);
    setShowAgeModal(true);
    localStorage.removeItem('pandagarde-age-verification');
  };

  return (
    <AgeVerificationContext.Provider
      value={{
        isVerified,
        isUnder13,
        hasParentalConsent,
        verifyAge,
        resetVerification,
        showAgeModal,
        setShowAgeModal
      }}
    >
      {children}
    </AgeVerificationContext.Provider>
  );
};

export const useAgeVerification = (): AgeVerificationContextType => {
  const context = useContext(AgeVerificationContext);
  if (context === undefined) {
    throw new Error('useAgeVerification must be used within an AgeVerificationProvider');
  }
  return context;
};