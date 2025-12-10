/**
 * Persona-Based Service Recommendations
 * Filters and recommends services based on family persona profiles
 */

import { childServiceCatalog, type Service } from '../data/childServiceCatalog';
import { calculatePrivacyExposureIndex } from './privacyExposureIndex';
import type { FamilyPersonaProfile } from '../data/familyPersonaProfiles';

export interface ServiceRecommendation {
  service: Service;
  exposureIndex: number;
  reason: string;
  priority: 'high' | 'medium' | 'low';
}

export class PersonaServiceRecommendationEngine {
  /**
   * Get recommended services for a specific persona
   */
  getRecommendedServices(personaId: string): ServiceRecommendation[] {
    const allServices = childServiceCatalog.filter(s => !s.isHidden);
    
    switch (personaId) {
      case 'cautious-parent':
        return this.getCautiousParentRecommendations(allServices);
      case 'privacy-focused-family':
        return this.getPrivacyFocusedRecommendations(allServices);
      case 'learning-family':
        return this.getLearningFamilyRecommendations(allServices);
      case 'tech-savvy-family':
        return this.getTechSavvyRecommendations(allServices);
      case 'balanced-family':
        return this.getBalancedFamilyRecommendations(allServices);
      case 'concerned-family':
        return this.getConcernedFamilyRecommendations(allServices);
      default:
        return this.getGeneralRecommendations(allServices);
    }
  }

  /**
   * Get services to avoid for a specific persona
   */
  getServicesToAvoid(personaId: string): ServiceRecommendation[] {
    const allServices = childServiceCatalog.filter(s => !s.isHidden);
    const recommendations: ServiceRecommendation[] = [];

    allServices.forEach(service => {
      const exposureIndex = calculatePrivacyExposureIndex(service);
      let shouldAvoid = false;
      let reason = '';

      switch (personaId) {
        case 'cautious-parent':
          if (exposureIndex >= 70 || service.minimumAge >= 13) {
            shouldAvoid = true;
            reason = exposureIndex >= 70 
              ? 'Very high privacy risk - requires close supervision'
              : 'Age rating may not be appropriate for young children';
          }
          break;

        case 'privacy-focused-family':
          if (exposureIndex >= 60) {
            shouldAvoid = true;
            reason = 'High data collection and sharing - conflicts with privacy values';
          }
          break;

        case 'learning-family':
          if (service.category !== 'Education' && exposureIndex >= 65) {
            shouldAvoid = true;
            reason = 'Non-educational with high privacy risks';
          }
          break;

        case 'concerned-family':
          if (exposureIndex >= 75) {
            shouldAvoid = true;
            reason = 'Extremely high risk - address existing services first';
          }
          break;
      }

      if (shouldAvoid) {
        recommendations.push({
          service,
          exposureIndex,
          reason,
          priority: exposureIndex >= 75 ? 'high' : exposureIndex >= 65 ? 'medium' : 'low'
        });
      }
    });

    return recommendations.sort((a, b) => b.exposureIndex - a.exposureIndex);
  }

  /**
   * Cautious Parent: Child-safe services with low risk
   */
  private getCautiousParentRecommendations(services: Service[]): ServiceRecommendation[] {
    const recommendations: ServiceRecommendation[] = [];

    services.forEach(service => {
      const exposureIndex = calculatePrivacyExposureIndex(service);
      
      // Prioritize services that are:
      // 1. Age-appropriate (under 13)
      // 2. Low to medium exposure (<50)
      // 3. Good parental controls
      if (service.minimumAge <= 12 && exposureIndex < 50) {
        recommendations.push({
          service,
          exposureIndex,
          reason: 'Age-appropriate with good parental controls and low privacy risk',
          priority: 'high'
        });
      } else if (service.minimumAge <= 12 && exposureIndex < 65) {
        recommendations.push({
          service,
          exposureIndex,
          reason: 'Age-appropriate but requires active monitoring',
          priority: 'medium'
        });
      }
    });

    return recommendations.sort((a, b) => a.exposureIndex - b.exposureIndex);
  }

  /**
   * Privacy-Focused Family: Services with minimal data collection
   */
  private getPrivacyFocusedRecommendations(services: Service[]): ServiceRecommendation[] {
    const recommendations: ServiceRecommendation[] = [];

    services.forEach(service => {
      const exposureIndex = calculatePrivacyExposureIndex(service);
      
      if (exposureIndex < 40) {
        recommendations.push({
          service,
          exposureIndex,
          reason: 'Minimal data collection and strong privacy protections',
          priority: 'high'
        });
      } else if (exposureIndex < 55) {
        recommendations.push({
          service,
          exposureIndex,
          reason: 'Moderate privacy with configurable settings',
          priority: 'medium'
        });
      }
    });

    return recommendations.sort((a, b) => a.exposureIndex - b.exposureIndex);
  }

  /**
   * Learning Family: Educational services with engagement
   */
  private getLearningFamilyRecommendations(services: Service[]): ServiceRecommendation[] {
    const recommendations: ServiceRecommendation[] = [];

    services.forEach(service => {
      const exposureIndex = calculatePrivacyExposureIndex(service);
      
      if (service.category === 'Education' && exposureIndex < 60) {
        recommendations.push({
          service,
          exposureIndex,
          reason: 'Educational platform with privacy-friendly practices',
          priority: 'high'
        });
      } else if (service.category === 'Gaming' && exposureIndex < 50) {
        recommendations.push({
          service,
          exposureIndex,
          reason: 'Engaging platform for learning about digital safety',
          priority: 'medium'
        });
      }
    });

    return recommendations.sort((a, b) => a.exposureIndex - b.exposureIndex);
  }

  /**
   * Tech-Savvy Family: Services with advanced security features
   */
  private getTechSavvyRecommendations(services: Service[]): ServiceRecommendation[] {
    const recommendations: ServiceRecommendation[] = [];

    services.forEach(service => {
      const exposureIndex = calculatePrivacyExposureIndex(service);
      
      // Tech-savvy families can handle higher-risk services with proper configuration
      if (exposureIndex < 70) {
        const priority = exposureIndex < 40 ? 'high' : exposureIndex < 55 ? 'medium' : 'low';
        recommendations.push({
          service,
          exposureIndex,
          reason: exposureIndex < 40 
            ? 'Robust security features and privacy controls'
            : 'Configurable with advanced security settings',
          priority
        });
      }
    });

    return recommendations.sort((a, b) => a.exposureIndex - b.exposureIndex);
  }

  /**
   * Balanced Family: Popular services with reasonable privacy
   */
  private getBalancedFamilyRecommendations(services: Service[]): ServiceRecommendation[] {
    const recommendations: ServiceRecommendation[] = [];

    services.forEach(service => {
      const exposureIndex = calculatePrivacyExposureIndex(service);
      
      // Focus on mainstream services with moderate privacy
      if (exposureIndex >= 30 && exposureIndex < 60) {
        recommendations.push({
          service,
          exposureIndex,
          reason: 'Popular service with practical privacy controls',
          priority: 'high'
        });
      } else if (exposureIndex < 30) {
        recommendations.push({
          service,
          exposureIndex,
          reason: 'Excellent privacy but may have fewer features',
          priority: 'medium'
        });
      }
    });

    return recommendations.sort((a, b) => Math.abs(45 - a.exposureIndex) - Math.abs(45 - b.exposureIndex));
  }

  /**
   * Concerned Family: Immediate focus on reducing exposure
   */
  private getConcernedFamilyRecommendations(services: Service[]): ServiceRecommendation[] {
    const recommendations: ServiceRecommendation[] = [];

    services.forEach(service => {
      const exposureIndex = calculatePrivacyExposureIndex(service);
      
      // Only recommend very safe services
      if (exposureIndex < 35) {
        recommendations.push({
          service,
          exposureIndex,
          reason: 'Low-risk service to start building safer habits',
          priority: 'high'
        });
      } else if (exposureIndex < 50 && service.category === 'Education') {
        recommendations.push({
          service,
          exposureIndex,
          reason: 'Educational value with manageable privacy risks',
          priority: 'medium'
        });
      }
    });

    return recommendations.sort((a, b) => a.exposureIndex - b.exposureIndex);
  }

  /**
   * General recommendations (no persona)
   */
  private getGeneralRecommendations(services: Service[]): ServiceRecommendation[] {
    const recommendations: ServiceRecommendation[] = [];

    services.forEach(service => {
      const exposureIndex = calculatePrivacyExposureIndex(service);
      
      if (exposureIndex < 55) {
        recommendations.push({
          service,
          exposureIndex,
          reason: 'Good balance of features and privacy',
          priority: exposureIndex < 35 ? 'high' : 'medium'
        });
      }
    });

    return recommendations.sort((a, b) => a.exposureIndex - b.exposureIndex);
  }

  /**
   * Get recommendation explanation for a specific service
   */
  getServiceRecommendationForPersona(service: Service, personaId: string): {
    recommended: boolean;
    reason: string;
    priority: 'high' | 'medium' | 'low';
  } {
    const exposureIndex = calculatePrivacyExposureIndex(service);
    const toAvoid = this.getServicesToAvoid(personaId);
    const shouldAvoid = toAvoid.find(r => r.service.id === service.id);

    if (shouldAvoid) {
      return {
        recommended: false,
        reason: shouldAvoid.reason,
        priority: shouldAvoid.priority
      };
    }

    const recommended = this.getRecommendedServices(personaId);
    const isRecommended = recommended.find(r => r.service.id === service.id);

    if (isRecommended) {
      return {
        recommended: true,
        reason: isRecommended.reason,
        priority: isRecommended.priority
      };
    }

    return {
      recommended: false,
      reason: 'Not specifically recommended for your family profile',
      priority: 'low'
    };
  }
}

export const personaServiceRecommendationEngine = new PersonaServiceRecommendationEngine();
