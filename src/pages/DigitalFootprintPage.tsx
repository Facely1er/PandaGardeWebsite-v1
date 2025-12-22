import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, ShoppingBag, Bell, FileText, ArrowRight, BarChart3, Shield, CheckCircle, Plus, Lightbulb, TrendingUp, Info } from 'lucide-react';
import DigitalFootprintVisualizer from '../components/DigitalFootprintVisualizer';
import EmptyStateWithServicePrompt from '../components/EmptyStateWithServicePrompt';
import { useFamily } from '../contexts/FamilyContext';
import { footprintAnalyzer } from '../lib/footprintAnalyzer';

const DigitalFootprintPage: React.FC = () => {
  const { familyMembers, getFamilyServices } = useFamily();

  // Get services from the Service Catalog (directly added services)
  const catalogServices = getFamilyServices();
  
  // Get services for analysis - combine member services and catalog services
  const memberServices: Record<string, string[]> = {};
  let totalServicesCount = 0;
  
  // First, collect services from family members
  familyMembers.forEach(member => {
    const memberServiceIds = (member as any).services?.map((s: any) => s.serviceId) || [];
    memberServices[member.id] = memberServiceIds;
    totalServicesCount += memberServiceIds.length;
  });

  // If no services found on members but catalog has services, use catalog services
  // This handles the case where services were added but no family was created
  if (totalServicesCount === 0 && catalogServices.length > 0) {
    // Create a virtual "family" entry for analysis
    totalServicesCount = catalogServices.length;
    memberServices['family'] = catalogServices;
  }

  // Check if services have been added (from either source)
  if (totalServicesCount === 0) {
    return (
      <EmptyStateWithServicePrompt
        feature="Digital Footprint Analysis"
        description="Your digital footprint shows how your family's data is shared across services, which apps pose the highest privacy risks, and provides personalized recommendations to reduce your exposure."
        minimumServices={3}
        icon={<BarChart3 size={24} className="text-white" />}
      />
    );
  }

  // Use family members if available, otherwise create a virtual member for analysis
  const membersForAnalysis = familyMembers.length > 0 
    ? familyMembers 
    : [{ id: 'family', services: catalogServices.map(id => ({ serviceId: id, status: 'approved' })) }];

  const analysis = footprintAnalyzer.analyzeFamilyFootprint(membersForAnalysis, memberServices);

  const handleExport = () => {
    if (!analysis) {return;}

    const exportData = {
      analysisDate: new Date().toISOString(),
      familyScore: analysis.familyScore,
      privacyScore: analysis.privacyScore,
      totalServices: analysis.totalServices,
      totalMembers: analysis.totalMembers,
      averageExposureIndex: analysis.averageExposureIndex,
      categoryBreakdown: analysis.categoryBreakdown,
      highRiskServices: analysis.serviceRisks.filter(r => r.exposureIndex >= 70).map(r => ({
        name: r.serviceName,
        exposureIndex: r.exposureIndex,
        memberCount: r.memberCount
      })),
      recommendations: analysis.recommendations.map(r => ({
        title: r.title,
        priority: r.priority,
        actionItems: r.actionItems
      }))
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pandagarde-footprint-analysis-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link
              to="/family-hub"
              className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Family Hub
            </Link>
            {analysis && (
              <button
                onClick={handleExport}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Export Report</span>
              </button>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Digital Footprint Analysis
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Understand your family's online presence and privacy exposure
            </p>
          </div>
        </div>

        {/* Contextual User Guidance */}
        {totalServicesCount < 5 ? (
          /* Encourage adding more services for better analysis */
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-5 mb-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-lg text-blue-900 dark:text-blue-100">
                    Improve Your Analysis
                  </h3>
                  <span className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 text-xs font-medium px-2 py-0.5 rounded-full">
                    {totalServicesCount} of 5+ services
                  </span>
                </div>
                <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                  You're off to a great start! Add more services to get a complete picture of your family's digital footprint. 
                  The more services you add, the more accurate your privacy recommendations will be.
                </p>
                <div className="flex items-center gap-3">
                  <Link
                    to="/service-catalog"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
                  >
                    <Plus size={16} />
                    Add More Services
                  </Link>
                  <div className="flex items-center gap-1 text-sm text-blue-600 dark:text-blue-300">
                    <CheckCircle size={14} />
                    <span>{totalServicesCount} added</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Success state - services are set up */
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-5 mb-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-lg text-green-900 dark:text-green-100">
                    Analysis Ready
                  </h3>
                  <span className="bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200 text-xs font-medium px-2 py-0.5 rounded-full">
                    {totalServicesCount} services tracked
                  </span>
                </div>
                <p className="text-sm text-green-800 dark:text-green-200 mb-1">
                  Your digital footprint analysis is based on {totalServicesCount} services. 
                  Review the insights below and follow the recommendations to improve your family's privacy.
                </p>
                <Link
                  to="/service-catalog"
                  className="inline-flex items-center gap-1 text-sm text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-100 font-medium mt-2"
                >
                  <Plus size={14} />
                  Manage Services
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Quick Tips based on analysis */}
        {analysis && analysis.privacyScore < 60 && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-1">
                  Quick Privacy Tips
                </h3>
                <ul className="text-sm text-amber-800 dark:text-amber-200 space-y-1">
                  <li>• Review privacy settings on high-exposure services</li>
                  <li>• Consider removing services you no longer use</li>
                  <li>• Enable two-factor authentication where available</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <DigitalFootprintVisualizer />

        {/* What's Next - Contextual Actions */}
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              What's Next?
            </h2>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Recommended actions based on your analysis
            </span>
          </div>
          
          {/* Priority Action - Based on Analysis */}
          {analysis && analysis.serviceRisks.filter(r => r.exposureIndex >= 70).length > 0 && (
            <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-4 mb-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-red-900 dark:text-red-100">Priority: Review High-Risk Services</h3>
                    <span className="bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 text-xs font-bold px-2 py-0.5 rounded">
                      {analysis.serviceRisks.filter(r => r.exposureIndex >= 70).length} found
                    </span>
                  </div>
                  <p className="text-sm text-red-800 dark:text-red-200 mb-2">
                    Some services have very high privacy exposure. Review their settings and consider alternatives.
                  </p>
                  <Link
                    to="/service-catalog"
                    className="inline-flex items-center gap-1 text-sm text-red-700 dark:text-red-300 hover:text-red-900 font-medium"
                  >
                    Review Services <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/service-catalog"
              className="p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-600 transition-all hover:shadow-md group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green-600 transition-colors" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Manage Services
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Add, remove, or review your family's apps and services
              </p>
              {totalServicesCount > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Currently tracking {totalServicesCount} service{totalServicesCount !== 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </Link>

            <Link
              to="/safety-alerts"
              className="p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-600 transition-all hover:shadow-md group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <Bell className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-orange-600 transition-colors" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Safety Alerts
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get notified about privacy updates and data breaches
              </p>
              <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">
                  Stay informed & protected
                </span>
              </div>
            </Link>

            <Link
              to="/privacy-assessment"
              className="p-4 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-600 transition-all hover:shadow-md group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Privacy Assessment
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get personalized recommendations for your family
              </p>
              <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                  5-minute assessment
                </span>
              </div>
            </Link>
          </div>
        </div>

        {/* Understanding Your Results */}
        <div className="mt-8 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Understanding Your Results
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Footprint Score (0-100)</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Higher scores mean more data is being collected. Aim for a lower score to minimize your digital exposure.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-1">Privacy Score (0-100)</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Higher scores mean better privacy protection. Follow recommendations to improve your score.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalFootprintPage;

