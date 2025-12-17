/**
 * Digital Footprint Analyzer for Families
 * Analyzes family's online presence and privacy exposure
 * Provides actionable insights and recommendations
 */

import { childServiceCatalog, type ChildService } from '../data/childServiceCatalog';
import { calculatePrivacyExposureIndex, getExposureLevel } from './privacyExposureIndex';
import { getServiceRelationship, getSiblingServices } from '../data/serviceRelationships';

export interface FootprintAnalysis {
  familyScore: number; // 0-100, higher = larger footprint
  totalServices: number;
  totalMembers: number;
  averageExposureIndex: number;
  categoryBreakdown: CategoryBreakdown[];
  serviceRisks: ServiceRisk[];
  dataSharingNetwork: DataSharingNode[];
  recommendations: Recommendation[];
  privacyScore: number; // 0-100, higher = better privacy
}

export interface CategoryBreakdown {
  category: string;
  count: number;
  averageExposure: number;
  riskLevel: 'low' | 'medium' | 'high' | 'very-high';
}

export interface ServiceRisk {
  serviceId: string;
  serviceName: string;
  category: string;
  exposureIndex: number;
  exposureLevel: ReturnType<typeof getExposureLevel>;
  riskFactors: string[];
  memberCount: number; // How many family members use this service
}

export interface DataSharingNode {
  serviceId: string;
  serviceName: string;
  parentCompany?: string;
  siblings: string[];
  dataShared: string[];
  riskLevel: 'low' | 'medium' | 'high';
}

export interface Recommendation {
  id: string;
  priority: 'high' | 'medium' | 'low';
  category: 'privacy' | 'safety' | 'data-sharing' | 'settings';
  title: string;
  description: string;
  actionItems: string[];
  affectedServices: string[];
}

export class FootprintAnalyzer {
  /**
   * Analyze family's digital footprint
   */
  analyzeFamilyFootprint(
    familyMembers: Array<{
      id: string;
      services?: Array<{ serviceId: string; status?: string }>;
    }>,
    memberServices: Record<string, string[]> = {}
  ): FootprintAnalysis {
    // Collect all unique service IDs from family members
    const allServiceIds = new Set<string>();
    const serviceMemberMap = new Map<string, Set<string>>(); // serviceId -> memberIds

    familyMembers.forEach(member => {
      const memberServiceIds = memberServices[member.id] || 
        (member as any).services?.map((s: any) => s.serviceId) || [];
      
      memberServiceIds.forEach(serviceId => {
        allServiceIds.add(serviceId);
        if (!serviceMemberMap.has(serviceId)) {
          serviceMemberMap.set(serviceId, new Set());
        }
        serviceMemberMap.get(serviceId)!.add(member.id);
      });
    });

    const serviceIds = Array.from(allServiceIds);
    const totalServices = serviceIds.length;
    const totalMembers = familyMembers.length;

    // Analyze services
    const serviceRisks: ServiceRisk[] = serviceIds.map(serviceId => {
      const service = childServiceCatalog.find(s => s.id === serviceId);
      if (!service) {
        return null;
      }

      const exposureIndex = calculatePrivacyExposureIndex(serviceId) || 0;
      const exposureLevel = getExposureLevel(exposureIndex);
      const memberCount = serviceMemberMap.get(serviceId)?.size || 0;

      return {
        serviceId,
        serviceName: service.name,
        category: service.category,
        exposureIndex,
        exposureLevel,
        riskFactors: service.privacyConcerns || [],
        memberCount
      };
    }).filter((r): r is ServiceRisk => r !== null);

    // Calculate average exposure index
    const totalExposure = serviceRisks.reduce((sum, risk) => sum + risk.exposureIndex, 0);
    const averageExposureIndex = serviceRisks.length > 0 
      ? Math.round(totalExposure / serviceRisks.length) 
      : 0;

    // Category breakdown
    const categoryMap = new Map<string, { count: number; totalExposure: number }>();
    serviceRisks.forEach(risk => {
      const existing = categoryMap.get(risk.category) || { count: 0, totalExposure: 0 };
      categoryMap.set(risk.category, {
        count: existing.count + 1,
        totalExposure: existing.totalExposure + risk.exposureIndex
      });
    });

    const categoryBreakdown: CategoryBreakdown[] = Array.from(categoryMap.entries()).map(([category, data]) => {
      const averageExposure = Math.round(data.totalExposure / data.count);
      const exposureLevel = getExposureLevel(averageExposure);
      
      let riskLevel: 'low' | 'medium' | 'high' | 'very-high' = 'low';
      if (averageExposure >= 70) {riskLevel = 'very-high';}
      else if (averageExposure >= 50) {riskLevel = 'high';}
      else if (averageExposure >= 30) {riskLevel = 'medium';}

      return {
        category,
        count: data.count,
        averageExposure,
        riskLevel
      };
    });

    // Data sharing network
    const dataSharingNetwork: DataSharingNode[] = serviceRisks.map(risk => {
      const relationship = getServiceRelationship(risk.serviceId);
      const siblings = getSiblingServices(risk.serviceId);
      
      // Determine data shared based on category and risk
      const dataShared: string[] = [];
      if (risk.category === 'social-media') {
        dataShared.push('Profile Information', 'Posts & Photos', 'Location Data', 'Activity Logs');
      } else if (risk.category === 'messaging') {
        dataShared.push('Messages', 'Contacts', 'Metadata');
      } else if (risk.category === 'gaming') {
        dataShared.push('Game Progress', 'In-Game Purchases', 'Social Interactions');
      } else if (risk.category === 'streaming') {
        dataShared.push('Viewing History', 'Preferences', 'Device Information');
      }

      let networkRiskLevel: 'low' | 'medium' | 'high' = 'low';
      if (relationship?.parent && siblings.length > 0) {
        networkRiskLevel = 'high';
      } else if (relationship?.parent || siblings.length > 0) {
        networkRiskLevel = 'medium';
      }

      return {
        serviceId: risk.serviceId,
        serviceName: risk.serviceName,
        parentCompany: relationship?.parentName,
        siblings: siblings.map(id => {
          const s = childServiceCatalog.find(service => service.id === id);
          return s?.name || id;
        }),
        dataShared,
        riskLevel: networkRiskLevel
      };
    });

    // Calculate family footprint score (0-100, higher = larger footprint)
    const footprintScore = this.calculateFootprintScore(
      serviceRisks,
      averageExposureIndex,
      totalServices,
      totalMembers
    );

    // Calculate privacy score (0-100, higher = better privacy)
    const privacyScore = Math.max(0, 100 - footprintScore);

    // Generate recommendations
    const recommendations = this.generateRecommendations(
      serviceRisks,
      categoryBreakdown,
      dataSharingNetwork,
      averageExposureIndex
    );

    return {
      familyScore: footprintScore,
      totalServices,
      totalMembers,
      averageExposureIndex,
      categoryBreakdown,
      serviceRisks,
      dataSharingNetwork,
      recommendations,
      privacyScore
    };
  }

  /**
   * Calculate overall footprint score
   */
  private calculateFootprintScore(
    serviceRisks: ServiceRisk[],
    averageExposure: number,
    totalServices: number,
    totalMembers: number
  ): number {
    // Base score from average exposure (0-40 points)
    let score = averageExposure * 0.4;

    // Number of services (0-20 points)
    score += Math.min(totalServices * 2, 20);

    // High-risk services (0-25 points)
    const highRiskServices = serviceRisks.filter(r => r.exposureIndex >= 70).length;
    score += Math.min(highRiskServices * 5, 25);

    // Services with data sharing networks (0-15 points)
    const networkedServices = serviceRisks.filter(r => {
      const relationship = getServiceRelationship(r.serviceId);
      return relationship?.parent !== undefined;
    }).length;
    score += Math.min(networkedServices * 3, 15);

    return Math.min(Math.round(score), 100);
  }

  /**
   * Generate actionable recommendations
   */
  private generateRecommendations(
    serviceRisks: ServiceRisk[],
    categoryBreakdown: CategoryBreakdown[],
    dataSharingNetwork: DataSharingNode[],
    averageExposure: number
  ): Recommendation[] {
    const recommendations: Recommendation[] = [];

    // High exposure services
    const highRiskServices = serviceRisks.filter(r => r.exposureIndex >= 70);
    if (highRiskServices.length > 0) {
      recommendations.push({
        id: 'high-risk-services',
        priority: 'high',
        category: 'privacy',
        title: 'Review High-Risk Services',
        description: `Your family uses ${highRiskServices.length} service${highRiskServices.length > 1 ? 's' : ''} with very high privacy exposure.`,
        actionItems: [
          'Review privacy settings for these services',
          'Consider limiting usage or finding alternatives',
          'Set up parental controls where available',
          'Discuss privacy risks with family members'
        ],
        affectedServices: highRiskServices.map(r => r.serviceId)
      });
    }

    // Data sharing networks
    const networkedServices = dataSharingNetwork.filter(n => n.parentCompany);
    if (networkedServices.length > 0) {
      const parentCompanies = new Set(networkedServices.map(n => n.parentCompany).filter(Boolean));
      recommendations.push({
        id: 'data-sharing-networks',
        priority: 'medium',
        category: 'data-sharing',
        title: 'Data Sharing Networks Detected',
        description: `Your family uses services from ${parentCompanies.size} parent compan${parentCompanies.size > 1 ? 'ies' : 'y'} that may share data across services.`,
        actionItems: [
          'Review privacy settings across all related services',
          'Understand how data is shared between sibling services',
          'Consider limiting services from the same parent company',
          'Review privacy policies for data sharing practices'
        ],
        affectedServices: networkedServices.map(n => n.serviceId)
      });
    }

    // Social media concentration
    const socialMediaServices = serviceRisks.filter(r => r.category === 'social-media');
    if (socialMediaServices.length >= 3) {
      recommendations.push({
        id: 'social-media-concentration',
        priority: 'medium',
        category: 'privacy',
        title: 'Multiple Social Media Services',
        description: 'Your family uses multiple social media platforms, increasing privacy exposure.',
        actionItems: [
          'Consolidate to fewer social media platforms',
          'Review privacy settings on all platforms',
          'Set consistent privacy standards across platforms',
          'Consider using privacy-focused alternatives'
        ],
        affectedServices: socialMediaServices.map(r => r.serviceId)
      });
    }

    // High average exposure
    if (averageExposure >= 60) {
      recommendations.push({
        id: 'high-average-exposure',
        priority: 'high',
        category: 'privacy',
        title: 'High Overall Privacy Exposure',
        description: 'Your family\'s average privacy exposure is high. Take action to improve privacy.',
        actionItems: [
          'Review all service privacy settings',
          'Remove unused services',
          'Use privacy-focused alternatives where possible',
          'Set up family privacy rules and guidelines'
        ],
        affectedServices: serviceRisks.map(r => r.serviceId)
      });
    }

    // Services used by multiple members
    const multiMemberServices = serviceRisks.filter(r => r.memberCount > 1);
    if (multiMemberServices.length > 0) {
      recommendations.push({
        id: 'multi-member-services',
        priority: 'low',
        category: 'settings',
        title: 'Shared Services Across Family',
        description: `${multiMemberServices.length} service${multiMemberServices.length > 1 ? 's are' : ' is'} used by multiple family members.`,
        actionItems: [
          'Ensure each member has their own account',
          'Review shared account settings',
          'Set appropriate privacy levels for each member',
          'Monitor usage across family members'
        ],
        affectedServices: multiMemberServices.map(r => r.serviceId)
      });
    }

    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }
}

export const footprintAnalyzer = new FootprintAnalyzer();

