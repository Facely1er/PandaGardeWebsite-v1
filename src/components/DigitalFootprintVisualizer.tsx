import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  AlertTriangle,
  Users,
  Network,
  BarChart3,
  Target,
  CheckCircle,
  ArrowRight,
  Globe,
  MessageCircle,
  Gamepad2,
  Film,
  GraduationCap,
  Palette,
  Info
} from 'lucide-react';
import { useFamily } from '../contexts/FamilyContext';
import { footprintAnalyzer, type FootprintAnalysis } from '../lib/footprintAnalyzer';
import { getServiceLogoUrlWithBrandColor, hasServiceLogo } from '../utils/serviceLogos';
import { getServiceById } from '../data/childServiceCatalog';

interface DigitalFootprintVisualizerProps {
  compact?: boolean;
}

const DigitalFootprintVisualizer: React.FC<DigitalFootprintVisualizerProps> = ({ compact = false }) => {
  const { familyMembers } = useFamily();

  // Get services for each member
  const memberServices = useMemo(() => {
    const services: Record<string, string[]> = {};
    familyMembers.forEach(member => {
      const memberServiceIds = (member as any).services?.map((s: any) => s.serviceId) || [];
      services[member.id] = memberServiceIds;
    });
    return services;
  }, [familyMembers]);

  // Analyze footprint
  const analysis = useMemo<FootprintAnalysis | null>(() => {
    if (familyMembers.length === 0) return null;
    return footprintAnalyzer.analyzeFamilyFootprint(familyMembers, memberServices);
  }, [familyMembers, memberServices]);

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'social-media':
        return Users;
      case 'messaging':
        return MessageCircle;
      case 'gaming':
        return Gamepad2;
      case 'streaming':
        return Film;
      case 'education':
        return GraduationCap;
      case 'creative':
        return Palette;
      default:
        return Globe;
    }
  };

  // Get risk color
  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'very-high':
        return 'text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700';
      case 'high':
        return 'text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-900/30 border-orange-300 dark:border-orange-700';
      case 'medium':
        return 'text-yellow-700 dark:text-yellow-300 bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700';
      default:
        return 'text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700';
    }
  };

  if (!analysis) {
    return (
      <div className="p-8 text-center bg-gray-50 dark:bg-gray-800 rounded-lg">
        <Globe className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          No Family Data Available
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Add family members and services to analyze your digital footprint.
        </p>
        <Link
          to="/family-hub"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
        >
          <span>Go to Family Hub</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  if (compact) {
    return (
      <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="font-semibold text-gray-900 dark:text-white">Digital Footprint</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            analysis.familyScore >= 70 ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
            analysis.familyScore >= 40 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
            'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
          }`}>
            {analysis.familyScore}/100
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {analysis.totalServices} services • {analysis.totalMembers} family members
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overall Score Card */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Family Digital Footprint
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Your family's overall online presence and privacy exposure
            </p>
          </div>
          <div className="text-center">
            <div className={`text-5xl font-bold mb-2 ${
              analysis.familyScore >= 70 ? 'text-red-600 dark:text-red-400' :
              analysis.familyScore >= 40 ? 'text-orange-600 dark:text-orange-400' :
              'text-green-600 dark:text-green-400'
            }`}>
              {analysis.familyScore}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Footprint Score</div>
            <div className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${
              analysis.familyScore >= 70 ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
              analysis.familyScore >= 40 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
              'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
            }`}>
              {analysis.familyScore >= 70 ? 'Large' : analysis.familyScore >= 40 ? 'Moderate' : 'Small'} Footprint
            </div>
          </div>
        </div>

        {/* Privacy Score */}
        <div className="mt-4 pt-4 border-t border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
              <span className="font-medium text-gray-900 dark:text-white">Privacy Score</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-2xl font-bold ${
                analysis.privacyScore >= 70 ? 'text-green-600 dark:text-green-400' :
                analysis.privacyScore >= 40 ? 'text-yellow-600 dark:text-yellow-400' :
                'text-red-600 dark:text-red-400'
              }`}>
                {analysis.privacyScore}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">/100</span>
            </div>
          </div>
          <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${
                analysis.privacyScore >= 70 ? 'bg-green-500' :
                analysis.privacyScore >= 40 ? 'bg-yellow-500' :
                'bg-red-500'
              }`}
              style={{ width: `${analysis.privacyScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {analysis.totalServices}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Services</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {analysis.totalMembers}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Family Members</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="h-5 w-5 text-orange-600 dark:text-orange-400" />
            <span className={`text-2xl font-bold ${analysis.averageExposureIndex >= 70 ? 'text-red-600 dark:text-red-400' :
              analysis.averageExposureIndex >= 40 ? 'text-orange-600 dark:text-orange-400' :
              'text-green-600 dark:text-green-400'}`}>
              {analysis.averageExposureIndex}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Exposure Index</p>
          <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
            {analysis.averageExposureIndex >= 70 ? 'Very High' :
             analysis.averageExposureIndex >= 40 ? 'High' : 'Low'} Risk
          </p>
        </div>
      </div>

      {/* Category Breakdown */}
      {analysis.categoryBreakdown.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Services by Category</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analysis.categoryBreakdown.map((category) => {
              const CategoryIcon = getCategoryIcon(category.category);
              return (
                <div
                  key={category.category}
                  className={`p-4 rounded-lg border-2 ${getRiskColor(category.riskLevel)}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <CategoryIcon className="h-5 w-5" />
                      <span className="font-medium capitalize">
                        {category.category.replace('-', ' ')}
                      </span>
                    </div>
                    <span className="text-lg font-bold">{category.count}</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Avg. Exposure: {category.averageExposure}/100
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* High-Risk Services */}
      {analysis.serviceRisks.filter(r => r.exposureIndex >= 70).length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 border-2 border-red-200 dark:border-red-800">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            <h3 className="text-lg font-semibold text-red-900 dark:text-red-100">
              High-Risk Services
            </h3>
          </div>
          <p className="text-sm text-red-800 dark:text-red-200 mb-4">
            These services have very high privacy exposure and require close monitoring.
          </p>
          <div className="space-y-3">
            {analysis.serviceRisks
              .filter(r => r.exposureIndex >= 70)
              .slice(0, 5)
              .map((risk) => {
                const service = getServiceById(risk.serviceId);
                return (
                  <div
                    key={risk.serviceId}
                    className="flex items-center space-x-3 p-3 bg-white dark:bg-gray-800 rounded-lg"
                  >
                    {service && hasServiceLogo(service.id) ? (
                      <img
                        src={getServiceLogoUrlWithBrandColor(service.id) || undefined}
                        alt={`${service.name} logo`}
                        className="w-10 h-10 rounded-lg object-contain"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <Globe className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {risk.serviceName}
                        </span>
                        <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                          {risk.exposureIndex}/100
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Used by {risk.memberCount} family member{risk.memberCount !== 1 ? 's' : ''}
                      </div>
                    </div>
                    <Link
                      to={`/service-catalog?service=${risk.serviceId}`}
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                    >
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Data Sharing Network */}
      {analysis.dataSharingNetwork.filter(n => n.parentCompany).length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border-2 border-blue-200 dark:border-blue-800">
          <div className="flex items-center space-x-2 mb-4">
            <Network className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
              Data Sharing Networks
            </h3>
          </div>
          <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">
            These services share data with each other through parent companies.
          </p>
          <div className="space-y-4">
            {Array.from(new Set(analysis.dataSharingNetwork
              .filter(n => n.parentCompany)
              .map(n => n.parentCompany)))
              .slice(0, 3)
              .map((parentCompany) => {
                const relatedServices = analysis.dataSharingNetwork.filter(n => n.parentCompany === parentCompany);
                return (
                  <div
                    key={parentCompany}
                    className="p-4 bg-white dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center space-x-2 mb-3">
                      <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <span className="font-semibold text-gray-900 dark:text-white">
                        {parentCompany}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {relatedServices.length} service{relatedServices.length !== 1 ? 's' : ''}:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {relatedServices.map((service) => (
                        <span
                          key={service.serviceId}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded text-sm"
                        >
                          {service.serviceName}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {analysis.recommendations.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="h-5 w-5 text-green-600 dark:text-green-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recommendations
            </h3>
          </div>
          <div className="space-y-4">
            {analysis.recommendations.map((rec) => (
              <div
                key={rec.id}
                className={`p-4 rounded-lg border-2 ${
                  rec.priority === 'high' ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800' :
                  rec.priority === 'medium' ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800' :
                  'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {rec.title}
                      </h4>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        rec.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                        rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                        'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                      }`}>
                        {rec.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                      {rec.description}
                    </p>
                    <ul className="space-y-1">
                      {rec.actionItems.map((item, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {rec.affectedServices.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                    <Link
                      to={`/service-catalog?services=${rec.affectedServices.join(',')}`}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center space-x-1"
                    >
                      <span>View Affected Services</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Educational Info */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-start space-x-3">
          <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Understanding Your Digital Footprint
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              Your digital footprint represents the trail of data your family leaves online. 
              A larger footprint means more personal information is being collected and shared.
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• <strong>Small Footprint (0-39):</strong> Minimal data collection, good privacy practices</li>
              <li>• <strong>Moderate Footprint (40-69):</strong> Some data collection, room for improvement</li>
              <li>• <strong>Large Footprint (70-100):</strong> Significant data collection, action recommended</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalFootprintVisualizer;

