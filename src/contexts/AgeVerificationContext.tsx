import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { encryptData, decryptData, generateUserPassword, isEncryptionAvailable } from '../lib/encryption';

interface AgeVerificationContextType {
  isVerified: boolean;
  isUnder13: boolean | null;
  hasParentalConsent: boolean;
  verifyAge: (age: number, hasConsent?: boolean) => Promise<void>;
  resetVerification: () => void;
  showAgeModal: boolean;
  setShowAgeModal: (show: boolean) => void;
  getAgeGroup: () => 'ages-5-8' | 'ages-9-12' | 'ages-13-17' | null;
  getAgeAppropriateContent: () => string[];
  requiresParentalConsent: () => boolean;
  canAccessContent: (contentPath: string) => boolean;
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
  const [userAge, setUserAge] = useState<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check for existing verification on mount
  useEffect(() => {
    const loadVerification = async () => {
      const savedVerification = localStorage.getItem('pandagarde-age-verification');
      const isEncrypted = localStorage.getItem('pandagarde-age-verification-encrypted') === 'true';
      
      if (savedVerification) {
        try {
          let verificationData;
          
          if (isEncrypted && isEncryptionAvailable()) {
            // Generate a device-specific key for age verification
            const deviceId = getDeviceId();
            const password = generateUserPassword(deviceId);
            verificationData = await decryptData<{
              verified: boolean;
              under13: boolean;
              consent: boolean;
              age: number;
            }>(savedVerification, password);
          } else {
            verificationData = JSON.parse(savedVerification);
          }
          
          const { verified, under13, consent, age } = verificationData;
          setIsVerified(verified);
          setIsUnder13(under13);
          setHasParentalConsent(consent);
          setUserAge(age);
          
          // Auto-route to appropriate content if not on a specific page
          if (verified && location.pathname === '/') {
            autoRouteToAppropriateContent(age);
          }
        } catch (error) {
          console.error('Error parsing age verification data:', error);
          // Clear invalid data
          localStorage.removeItem('pandagarde-age-verification');
          localStorage.removeItem('pandagarde-age-verification-encrypted');
          setShowAgeModal(true);
        }
      } else {
        // Show age modal if no verification exists
        setShowAgeModal(true);
      }
    };
    
    loadVerification();
  }, [location.pathname]);
  
  // Generate a device-specific ID for encryption key
  const getDeviceId = (): string => {
    let deviceId = localStorage.getItem('pandagarde-device-id');
    if (!deviceId) {
      deviceId = `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('pandagarde-device-id', deviceId);
    }
    return deviceId;
  };

  const verifyAge = async (age: number, hasConsent: boolean = false) => {
    const under13 = age < 13;
    const consent = under13 ? hasConsent : true; // Over 13 doesn't need parental consent
    
    setIsVerified(true);
    setIsUnder13(under13);
    setHasParentalConsent(consent);
    setUserAge(age);
    setShowAgeModal(false);

    // Save to localStorage with encryption
    const verificationData = {
      verified: true,
      under13,
      consent,
      age,
      timestamp: Date.now()
    };
    
    try {
      if (isEncryptionAvailable()) {
        const deviceId = getDeviceId();
        const password = generateUserPassword(deviceId);
        const encrypted = await encryptData(verificationData, password);
        localStorage.setItem('pandagarde-age-verification', encrypted);
        localStorage.setItem('pandagarde-age-verification-encrypted', 'true');
      } else {
        localStorage.setItem('pandagarde-age-verification', JSON.stringify(verificationData));
        localStorage.removeItem('pandagarde-age-verification-encrypted');
      }
    } catch (error) {
      console.error('Error saving age verification:', error);
      // Fallback to unencrypted storage if encryption fails
      localStorage.setItem('pandagarde-age-verification', JSON.stringify(verificationData));
    }
    
    // Auto-route to appropriate content
    autoRouteToAppropriateContent(age);
  };

  const resetVerification = () => {
    setIsVerified(false);
    setIsUnder13(null);
    setHasParentalConsent(false);
    setUserAge(null);
    setShowAgeModal(true);
    localStorage.removeItem('pandagarde-age-verification');
    localStorage.removeItem('pandagarde-age-verification-encrypted');
  };

  // Auto-route to age-appropriate content
  const autoRouteToAppropriateContent = (age: number) => {
    if (age >= 5 && age <= 8) {
      navigate('/ages-5-8');
    } else if (age >= 9 && age <= 12) {
      navigate('/ages-9-12');
    } else if (age >= 13 && age <= 17) {
      navigate('/ages-13-17');
    } else {
      navigate('/get-started');
    }
  };

  // Get age group category
  const getAgeGroup = (): 'ages-5-8' | 'ages-9-12' | 'ages-13-17' | null => {
    if (!userAge) {return null;}
    if (userAge >= 5 && userAge <= 8) {return 'ages-5-8';}
    if (userAge >= 9 && userAge <= 12) {return 'ages-9-12';}
    if (userAge >= 13 && userAge <= 17) {return 'ages-13-17';}
    return null;
  };

  // Get age-appropriate content paths
  const getAgeAppropriateContent = (): string[] => {
    const ageGroup = getAgeGroup();
    if (!ageGroup) {return [];}

    const contentMap = {
      'ages-5-8': [
        '/ages-5-8',
        '/interactive-story',
        '/activity-book',
        '/coloring-sheets',
        '/safety-posters'
      ],
      'ages-9-12': [
        '/ages-9-12',
        '/interactive-story',
        '/activity-book',
        '/privacy-tools',
        '/mission-hub'
      ],
      'ages-13-17': [
        '/ages-13-17',
        '/privacy-tools',
        '/mission-hub',
        '/teen-handbook',
        '/digital-citizenship'
      ]
    };

    return contentMap[ageGroup] || [];
  };

  // Check if parental consent is required
  const requiresParentalConsent = (): boolean => {
    return isUnder13 === true && !hasParentalConsent;
  };

  // Check if user can access specific content
  const canAccessContent = (contentPath: string): boolean => {
    if (!isVerified) {return false;}
    
    const ageGroup = getAgeGroup();
    if (!ageGroup) {return false;}

    // Check if content is age-appropriate
    const appropriateContent = getAgeAppropriateContent();
    const isAppropriate = appropriateContent.some(path => contentPath.startsWith(path));
    
    // For restricted content, require parental consent for under-13s
    if (!isAppropriate && isUnder13) {
      return hasParentalConsent;
    }
    
    return isAppropriate || hasParentalConsent;
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
        setShowAgeModal,
        getAgeGroup,
        getAgeAppropriateContent,
        requiresParentalConsent,
        canAccessContent
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