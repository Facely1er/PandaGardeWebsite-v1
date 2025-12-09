import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ServiceCatalog from '../ServiceCatalog';

// Mock dependencies
vi.mock('../../lib/privacyExposureIndex', () => ({
  calculatePrivacyExposureIndex: vi.fn((service) => service.minAge || 50),
}));

vi.mock('../../utils/serviceLogos', () => ({
  getServiceLogo: vi.fn(() => '/logo.png'),
}));

describe('ServiceCatalog', () => {
  const mockServices = [
    {
      id: '1',
      name: 'Instagram',
      category: 'Social Media',
      minAge: 13,
      description: 'Photo sharing app',
      privacyExposureIndex: 75,
    },
    {
      id: '2',
      name: 'TikTok',
      category: 'Social Media',
      minAge: 13,
      description: 'Video sharing app',
      privacyExposureIndex: 80,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render service catalog', () => {
    render(<ServiceCatalog />);
    expect(screen.getByText(/service catalog/i)).toBeInTheDocument();
  });

  it('should filter services by category', async () => {
    render(<ServiceCatalog />);
    
    const filterButton = screen.getByRole('button', { name: /filter/i });
    fireEvent.click(filterButton);

    await waitFor(() => {
      expect(screen.getByText(/social media/i)).toBeInTheDocument();
    });
  });

  it('should sort services by privacy exposure index', async () => {
    render(<ServiceCatalog />);
    
    const sortButton = screen.getByRole('button', { name: /sort/i });
    fireEvent.click(sortButton);

    await waitFor(() => {
      expect(screen.getByText(/privacy exposure/i)).toBeInTheDocument();
    });
  });

  it('should display service details when clicked', async () => {
    render(<ServiceCatalog />);
    
    // Wait for services to load
    await waitFor(() => {
      const serviceCard = screen.getByText(/instagram/i);
      expect(serviceCard).toBeInTheDocument();
    });

    const serviceCard = screen.getByText(/instagram/i);
    fireEvent.click(serviceCard);

    await waitFor(() => {
      expect(screen.getByText(/description/i)).toBeInTheDocument();
    });
  });
});

