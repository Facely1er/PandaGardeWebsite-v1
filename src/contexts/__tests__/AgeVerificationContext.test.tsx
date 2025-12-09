import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AgeVerificationProvider, useAgeVerification } from '../AgeVerificationContext';
import React from 'react';

// Mock coppaCompliance
vi.mock('../lib/coppaCompliance', () => ({
  coppaComplianceManager: {
    requestParentalConsent: vi.fn(),
    hasValidConsent: vi.fn(),
    enableZeroDataMode: vi.fn(),
    disableZeroDataMode: vi.fn(),
    isZeroDataMode: vi.fn(() => false),
  },
}));

describe('AgeVerificationContext', () => {
  beforeEach(() => {
    // Clear sessionStorage before each test
    sessionStorage.clear();
    vi.clearAllMocks();
  });

  it('should initialize with unverified state', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AgeVerificationProvider>{children}</AgeVerificationProvider>
    );

    const { result } = renderHook(() => useAgeVerification(), { wrapper });

    expect(result.current.isVerified).toBe(false);
    expect(result.current.isUnder13).toBe(null);
    expect(result.current.hasParentalConsent).toBe(false);
  });

  it('should verify age for users 13 and older', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AgeVerificationProvider>{children}</AgeVerificationProvider>
    );

    const { result } = renderHook(() => useAgeVerification(), { wrapper });

    await act(async () => {
      const verificationResult = await result.current.verifyAge(15);
      expect(verificationResult.success).toBe(true);
    });

    expect(result.current.isVerified).toBe(true);
    expect(result.current.isUnder13).toBe(false);
    expect(result.current.hasParentalConsent).toBe(true);
  });

  it('should require parent email for users under 13', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AgeVerificationProvider>{children}</AgeVerificationProvider>
    );

    const { result } = renderHook(() => useAgeVerification(), { wrapper });

    await act(async () => {
      const verificationResult = await result.current.verifyAge(10);
      expect(verificationResult.success).toBe(false);
      expect(verificationResult.error).toContain('Parent email is required');
    });
  });

  it('should get correct age group', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AgeVerificationProvider>{children}</AgeVerificationProvider>
    );

    const { result } = renderHook(() => useAgeVerification(), { wrapper });

    act(() => {
      result.current.verifyAge(7);
    });

    expect(result.current.getAgeGroup()).toBe('ages-5-8');
  });

  it('should check if content is accessible', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AgeVerificationProvider>{children}</AgeVerificationProvider>
    );

    const { result } = renderHook(() => useAgeVerification(), { wrapper });

    act(() => {
      result.current.verifyAge(15);
    });

    expect(result.current.canAccessContent('/ages-13-17')).toBe(true);
    expect(result.current.canAccessContent('/ages-5-8')).toBe(false);
  });
});

