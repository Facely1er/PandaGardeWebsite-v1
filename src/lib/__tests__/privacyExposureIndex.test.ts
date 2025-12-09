import { describe, it, expect } from 'vitest';
import { calculatePrivacyExposureIndex } from '../privacyExposureIndex';

describe('Privacy Exposure Index', () => {
  it('should calculate exposure index for a service', () => {
    const service = {
      id: '1',
      name: 'Instagram',
      category: 'Social Media',
      minAge: 13,
      description: 'Photo sharing',
    };

    const index = calculatePrivacyExposureIndex(service);
    expect(index).toBeGreaterThanOrEqual(0);
    expect(index).toBeLessThanOrEqual(100);
  });

  it('should penalize services with parent companies', () => {
    const service = {
      id: '1',
      name: 'Instagram',
      category: 'Social Media',
      minAge: 13,
      description: 'Photo sharing',
      parentCompany: 'Meta',
    };

    const index = calculatePrivacyExposureIndex(service);
    expect(index).toBeGreaterThan(50); // Should be higher due to parent company
  });

  it('should consider minimum age in calculation', () => {
    const service13 = {
      id: '1',
      name: 'Service 13+',
      category: 'Social',
      minAge: 13,
    };

    const service18 = {
      id: '2',
      name: 'Service 18+',
      category: 'Social',
      minAge: 18,
    };

    const index13 = calculatePrivacyExposureIndex(service13);
    const index18 = calculatePrivacyExposureIndex(service18);

    // 18+ services should generally have higher exposure
    expect(index18).toBeGreaterThanOrEqual(index13);
  });
});

