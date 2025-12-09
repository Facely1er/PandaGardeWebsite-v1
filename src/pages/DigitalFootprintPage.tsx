import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, ShoppingBag, Bell, FileText, ArrowRight } from 'lucide-react';
import DigitalFootprintVisualizer from '../components/DigitalFootprintVisualizer';
import { useFamily } from '../contexts/FamilyContext';
import { footprintAnalyzer } from '../lib/footprintAnalyzer';

const DigitalFootprintPage: React.FC = () => {
  const { familyMembers } = useFamily();

  // Get services for analysis
  const memberServices: Record<string, string[]> = {};
  familyMembers.forEach(member => {
    const memberServiceIds = (member as any).services?.map((s: any) => s.serviceId) || [];
    memberServices[member.id] = memberServiceIds;
  });

  const analysis = footprintAnalyzer.analyzeFamilyFootprint(familyMembers, memberServices);

  const handleExport = () => {
    if (!analysis) return;

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
            <div className="flex items-center space-x-4">
              <Link
                to="/family-hub"
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                aria-label="Back to Family Hub"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Digital Footprint Analysis
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Understand your family's online presence and privacy exposure
                </p>
              </div>
            </div>
            {analysis && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleExport}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Export Report</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <DigitalFootprintVisualizer />

        {/* Additional Resources */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Take Action
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/service-catalog"
              className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-600 transition-colors group"
            >
              <div className="flex items-center justify-between mb-2">
                <ShoppingBag className="h-5 w-5 text-green-600 dark:text-green-400" />
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green-600 transition-colors" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Review Service Catalog
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Check Privacy Exposure Index for all services and review high-risk apps
              </p>
            </Link>

            <Link
              to="/safety-alerts"
              className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-600 transition-colors group"
            >
              <div className="flex items-center justify-between mb-2">
                <Bell className="h-5 w-5 text-green-600 dark:text-green-400" />
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green-600 transition-colors" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Check Safety Alerts
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get real-time notifications about privacy updates and data breaches
              </p>
            </Link>

            <Link
              to="/privacy-assessment"
              className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-600 transition-colors group"
            >
              <div className="flex items-center justify-between mb-2">
                <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green-600 transition-colors" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                Take Privacy Assessment
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get personalized recommendations to improve your family's privacy practices
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalFootprintPage;

