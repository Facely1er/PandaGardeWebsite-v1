import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AgeVerificationModal from '../AgeVerificationModal';
import { AgeVerificationProvider } from '../../contexts/AgeVerificationContext';

// Mock the context
vi.mock('../../contexts/AgeVerificationContext', async () => {
  const actual = await vi.importActual('../../contexts/AgeVerificationContext');
  return {
    ...actual,
    useAgeVerification: () => ({
      verifyAge: vi.fn(async (age: number, email?: string) => ({
        success: true,
      })),
      showAgeModal: true,
      setShowAgeModal: vi.fn(),
    }),
  };
});

describe('AgeVerificationModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render modal when showAgeModal is true', () => {
    render(
      <AgeVerificationProvider>
        <AgeVerificationModal />
      </AgeVerificationProvider>
    );

    expect(screen.getByText(/age verification/i)).toBeInTheDocument();
  });

  it('should validate age input', async () => {
    render(
      <AgeVerificationProvider>
        <AgeVerificationModal />
      </AgeVerificationProvider>
    );

    const submitButton = screen.getByRole('button', { name: /verify/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/please enter your age/i)).toBeInTheDocument();
    });
  });

  it('should require parent email for users under 13', async () => {
    render(
      <AgeVerificationProvider>
        <AgeVerificationModal />
      </AgeVerificationProvider>
    );

    const ageInput = screen.getByLabelText(/age/i);
    fireEvent.change(ageInput, { target: { value: '10' } });

    const submitButton = screen.getByRole('button', { name: /verify/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/parent email is required/i)).toBeInTheDocument();
    });
  });

  it('should handle escape key to close modal', () => {
    const setShowAgeModal = vi.fn();
    
    render(
      <AgeVerificationProvider>
        <AgeVerificationModal />
      </AgeVerificationProvider>
    );

    const modal = screen.getByRole('dialog');
    fireEvent.keyDown(modal, { key: 'Escape', code: 'Escape' });

    // Note: This test may need adjustment based on actual implementation
    expect(setShowAgeModal).toHaveBeenCalled();
  });
});

