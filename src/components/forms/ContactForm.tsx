import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin, AlertCircle } from 'lucide-react';
import { useToast } from '../../contexts/ToastContext';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  inquiryType: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const { showSuccess, showError } = useToast();
  const [formData, setFormData] = useState<FormData>(() => {
    // Load form data from localStorage if available
    const saved = localStorage.getItem('pandagarde_contact_form');
    if (saved) {
      try {
        return { ...JSON.parse(saved), inquiryType: 'general' };
      } catch {
        return {
          name: '',
          email: '',
          subject: '',
          message: '',
          inquiryType: 'general'
        };
      }
    }
    return {
      name: '',
      email: '',
      subject: '',
      message: '',
      inquiryType: 'general'
    };
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitAttempts, setSubmitAttempts] = useState(0);

  const inquiryTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'partnership', label: 'Partnership' },
    { value: 'media', label: 'Media Inquiry' },
    { value: 'feedback', label: 'Feedback' },
    { value: 'other', label: 'Other' }
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
    } else if (!/^[a-zA-Z\s'-]+$/.test(formData.name.trim())) {
      newErrors.name = 'Name can only contain letters, spaces, hyphens, and apostrophes';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      } else if (formData.email.length > 254) {
        newErrors.email = 'Email address is too long';
      }
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = 'Subject must be at least 3 characters long';
    } else if (formData.subject.trim().length > 100) {
      newErrors.subject = 'Subject must be less than 100 characters';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    } else if (formData.message.trim().length > 2000) {
      newErrors.message = 'Message must be less than 2000 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    
    // Save to localStorage
    localStorage.setItem('pandagarde_contact_form', JSON.stringify(newFormData));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSubmitAttempts(prev => prev + 1);
      return;
    }

    // Rate limiting: prevent spam
    if (submitAttempts >= 3) {
      showError('Too Many Attempts', 'Please wait a few minutes before trying again.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call with better error handling
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate occasional network errors
          if (Math.random() < 0.1) {
            reject(new Error('Network error'));
          } else {
            resolve(true);
          }
        }, 2000);
      });
      
      // In a real implementation, you would send the data to your backend
      console.log('Form submitted:', formData);
      
      showSuccess('Message Sent!', 'Thank you for your message. We\'ll get back to you within 24-48 hours.');
      
      // Clear form and localStorage
      const emptyForm = {
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      };
      setFormData(emptyForm);
      localStorage.removeItem('pandagarde_contact_form');
      setSubmitAttempts(0);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitAttempts(prev => prev + 1);
      showError('Error', 'Sorry, there was an error sending your message. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-container">
      <div className="contact-header">
        <h2 className="contact-title">Get in Touch</h2>
        <p className="contact-subtitle">
          Have questions about PandaGarde? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <div className="info-section">
            <h3>Contact Information</h3>
            <div className="info-items">
              <div className="info-item">
                <Mail size={20} className="info-icon" />
                <div>
                  <strong>Email</strong>
                  <p>hello@pandagarde.com</p>
                </div>
              </div>
              <div className="info-item">
                <Phone size={20} className="info-icon" />
                <div>
                  <strong>Phone</strong>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="info-item">
                <MapPin size={20} className="info-icon" />
                <div>
                  <strong>Address</strong>
                  <p>123 Privacy Street<br />Digital City, DC 12345</p>
                </div>
              </div>
            </div>
          </div>

          <div className="info-section">
            <h3>Response Times</h3>
            <div className="response-times">
              <div className="response-item">
                <span className="response-type">General Inquiries</span>
                <span className="response-time">24-48 hours</span>
              </div>
              <div className="response-item">
                <span className="response-type">Technical Support</span>
                <span className="response-time">12-24 hours</span>
              </div>
              <div className="response-item">
                <span className="response-type">Partnership</span>
                <span className="response-time">2-3 business days</span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <span className="error-message">
                  <AlertCircle size={16} />
                  {errors.name}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email address"
              />
              {errors.email && (
                <span className="error-message">
                  <AlertCircle size={16} />
                  {errors.email}
                </span>
              )}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="inquiryType" className="form-label">
              Inquiry Type
            </label>
            <select
              id="inquiryType"
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleInputChange}
              className="form-select"
            >
              {inquiryTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="subject" className="form-label">
              Subject *
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
              className={`form-input ${errors.subject ? 'error' : ''}`}
              placeholder="What is this about?"
            />
            {errors.subject && (
              <span className="error-message">
                <AlertCircle size={16} />
                {errors.subject}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="message" className="form-label">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className={`form-textarea ${errors.message ? 'error' : ''}`}
              placeholder="Tell us more about your inquiry..."
              rows={6}
            />
            {errors.message && (
              <span className="error-message">
                <AlertCircle size={16} />
                {errors.message}
              </span>
            )}
            <div className="character-count">
              {formData.message.length}/2000 characters
              {formData.message.length > 1800 && (
                <span className="text-orange-600 ml-2">
                  (Approaching limit)
                </span>
              )}
            </div>
          </div>


          <button
            type="submit"
            disabled={isSubmitting}
            className={`submit-button ${isSubmitting ? 'loading' : ''}`}
          >
            {isSubmitting ? (
              <>
                <div className="spinner" />
                Sending...
              </>
            ) : (
              <>
                <Send size={20} />
                Send Message
              </>
            )}
          </button>
        </form>
      </div>

      <style jsx>{`
        .contact-form-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }
        
        .contact-header {
          text-align: center;
          margin-bottom: 40px;
        }
        
        .contact-title {
          font-size: 2.5rem;
          font-weight: bold;
          color: #2C3E50;
          margin-bottom: 16px;
        }
        
        .contact-subtitle {
          font-size: 1.1rem;
          color: #666;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }
        
        .contact-content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 60px;
          align-items: start;
        }
        
        .contact-info {
          background: #f8f9fa;
          padding: 30px;
          border-radius: 12px;
          height: fit-content;
        }
        
        .info-section {
          margin-bottom: 30px;
        }
        
        .info-section h3 {
          font-size: 1.3rem;
          font-weight: bold;
          color: #2C3E50;
          margin-bottom: 20px;
        }
        
        .info-items {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .info-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        
        .info-icon {
          color: #4CAF50;
          margin-top: 2px;
        }
        
        .info-item strong {
          display: block;
          color: #2C3E50;
          margin-bottom: 4px;
        }
        
        .info-item p {
          margin: 0;
          color: #666;
          line-height: 1.4;
        }
        
        .response-times {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        
        .response-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid #e0e0e0;
        }
        
        .response-item:last-child {
          border-bottom: none;
        }
        
        .response-type {
          color: #2C3E50;
          font-weight: 500;
        }
        
        .response-time {
          color: #4CAF50;
          font-weight: bold;
          font-size: 0.9rem;
        }
        
        .contact-form {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        
        .form-group {
          margin-bottom: 24px;
        }
        
        .form-label {
          display: block;
          font-weight: 600;
          color: #2C3E50;
          margin-bottom: 8px;
          font-size: 0.95rem;
        }
        
        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: white;
        }
        
        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #4CAF50;
          box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
        }
        
        .form-input.error,
        .form-textarea.error {
          border-color: #f44336;
        }
        
        .form-textarea {
          resize: vertical;
          min-height: 120px;
        }
        
        .character-count {
          text-align: right;
          font-size: 0.85rem;
          color: #666;
          margin-top: 4px;
        }
        
        .error-message {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #f44336;
          font-size: 0.85rem;
          margin-top: 6px;
        }
        
        .success-message {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #d4edda;
          color: #155724;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          border: 1px solid #c3e6cb;
        }
        
        .error-message-general {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f8d7da;
          color: #721c24;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 20px;
          border: 1px solid #f5c6cb;
        }
        
        .submit-button {
          width: 100%;
          background: linear-gradient(135deg, #4CAF50, #45a049);
          color: white;
          border: none;
          padding: 16px 24px;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        
        .submit-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(76, 175, 80, 0.3);
        }
        
        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }
        
        .submit-button.loading {
          background: #666;
        }
        
        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid transparent;
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @media (max-width: 768px) {
          .contact-content {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .contact-title {
            font-size: 2rem;
          }
          
          .contact-form-container {
            padding: 20px 15px;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactForm;