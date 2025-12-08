import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import Logo from '../components/Logo';
import FamilyPrivacyPlanBuilder from '../components/parent/FamilyPrivacyPlanBuilder';
import type { FamilyPrivacyPlan } from '../components/parent/FamilyPrivacyPlanBuilder';

const FamilyPrivacyPlanPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSave = (plan: FamilyPrivacyPlan) => {
    console.log('Privacy plan saved:', plan);
    // Could integrate with backend or analytics here
  };

  const handleExport = (plan: FamilyPrivacyPlan) => {
    console.log('Privacy plan exported:', plan);
    // Analytics tracking could go here
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--white)', color: 'var(--gray-800)' }}>
      {/* Page Header */}
      <header className="bg-gradient-to-r from-green-600 to-green-500 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><pattern id='grain' width='100' height='100' patternUnits='userSpaceOnUse'><circle cx='20' cy='20' r='1' fill='rgba(255,255,255,0.1)'/><circle cx='80' cy='40' r='1' fill='rgba(255,255,255,0.05)'/><circle cx='40' cy='80' r='1' fill='rgba(255,255,255,0.1)'/></pattern></defs><rect width='100%' height='100%' fill='url(%23grain)'/></svg>")`
          }} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex items-center justify-center mb-8">
            <div className="w-20 h-20 mr-4">
              <Logo />
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6">
              <Shield size={16} />
              <span className="text-sm font-semibold">FAMILY PRIVACY PLAN</span>
            </div>

            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Create Your Family Privacy Plan
            </h1>

            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              A family privacy plan works best when everyone helps create it. Set clear rules, choose safety tools, and schedule regular check-ups to keep your family safe online.
            </p>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-gray-50" style={{ backgroundColor: 'var(--light)' }}>
        <div className="container mx-auto px-6 py-4">
          <Link
            to="/guides/family-privacy"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
            style={{ color: 'var(--primary-light)' }}
          >
            <ArrowLeft size={16} />
            Back to Family Privacy Guide
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <FamilyPrivacyPlanBuilder
            onSave={handleSave}
            onExport={handleExport}
          />

          {/* Additional Information */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6" style={{ backgroundColor: 'var(--light)' }}>
            <h3 className="text-lg font-semibold mb-3" style={{ color: 'var(--primary)' }}>
              Tips for Success
            </h3>
            <ul className="space-y-2 text-sm" style={{ color: 'var(--gray-700)' }}>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Have a family meeting to create the plan together - let kids and teens share their ideas too</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Display your plan somewhere visible - on the fridge, bulletin board, or in a shared digital document</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Revisit the plan every 3-6 months to adjust for new devices, apps, or as kids grow older</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-600 mt-1">•</span>
                <span>Lead by example - follow the same privacy rules you set for children</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FamilyPrivacyPlanPage;

