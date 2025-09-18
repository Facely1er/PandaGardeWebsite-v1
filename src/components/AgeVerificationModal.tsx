import React, { useState } from 'react';
import { Shield, Users, AlertTriangle, CheckCircle, X } from 'lucide-react';
import { useAgeVerification } from '../contexts/AgeVerificationContext';

const AgeVerificationModal: React.FC = () => {
  const { verifyAge, showAgeModal, setShowAgeModal } = useAgeVerification();
  const [age, setAge] = useState<number | ''>('');
  const [hasParentalConsent, setHasParentalConsent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (age === '') {
      setError('Please enter your age');
      return;
    }

    if (age < 0 || age > 120) {
      setError('Please enter a valid age');
      return;
    }

    if (age < 13 && !hasParentalConsent) {
      setError('Parental consent is required for users under 13');
      return;
    }

    verifyAge(age, hasParentalConsent);
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAge(value === '' ? '' : parseInt(value, 10));
    setError('');
  };

  if (!showAgeModal) {return null;}

  return (
    <div className="age-verification-overlay">
      <div className="age-verification-modal">
        <div className="age-verification-header">
          <div className="age-verification-icon">
            <Shield size={32} />
          </div>
          <h2>Age Verification Required</h2>
          <p>To comply with COPPA (Children's Online Privacy Protection Act), we need to verify your age.</p>
        </div>

        <form onSubmit={handleSubmit} className="age-verification-form">
          <div className="form-group">
            <label htmlFor="age">What is your age?</label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={handleAgeChange}
              min="0"
              max="120"
              placeholder="Enter your age"
              className={error ? 'error' : ''}
              required
            />
          </div>

          {age !== '' && age < 13 && (
            <div className="parental-consent-section">
              <div className="consent-info">
                <AlertTriangle size={20} className="warning-icon" />
                <p>You are under 13 years old. Parental consent is required to use this site.</p>
              </div>
              
              <div className="consent-checkbox">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={hasParentalConsent}
                    onChange={(e) => setHasParentalConsent(e.target.checked)}
                  />
                  <span className="checkmark"></span>
                  <div className="checkbox-text">
                    <strong>I have parental consent</strong>
                    <span>My parent or guardian has given permission for me to use this educational website.</span>
                  </div>
                </label>
              </div>
            </div>
          )}

          {age !== '' && age >= 13 && (
            <div className="age-confirmation">
              <CheckCircle size={20} className="success-icon" />
              <p>You are 13 or older. You can proceed without parental consent.</p>
            </div>
          )}

          {error && (
            <div className="error-message">
              <AlertTriangle size={16} />
              {error}
            </div>
          )}

          <div className="age-verification-actions">
            <button
              type="button"
              className="button secondary"
              onClick={() => setShowAgeModal(false)}
            >
              <X size={16} />
              Cancel
            </button>
            <button
              type="submit"
              className="button primary"
              disabled={age === '' || (age < 13 && !hasParentalConsent)}
            >
              <CheckCircle size={16} />
              Continue
            </button>
          </div>
        </form>

        <div className="age-verification-footer">
          <div className="privacy-info">
            <Users size={16} />
            <p>
              <strong>Privacy Notice:</strong> We use this information only to ensure compliance with COPPA. 
              Your age is not stored permanently and is only used to determine appropriate content access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgeVerificationModal;