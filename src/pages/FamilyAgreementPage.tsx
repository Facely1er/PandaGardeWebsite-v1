import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Users, FileText, CheckCircle, Edit3 } from 'lucide-react';
import Logo from '../components/Logo';

const FamilyAgreementPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [customizations, setCustomizations] = useState({
    familyName: '',
    childName: '',
    parentName: '',
    additionalRules: '',
    consequences: '',
    rewards: ''
  });

  const agreementTemplates = [
    {
      id: 'basic-agreement',
      title: 'Basic Family Internet Agreement',
      description: 'Essential rules for safe internet use',
      ageGroup: 'Ages 5-12',
      icon: FileText,
      downloadUrl: '#'
    },
    {
      id: 'teen-agreement',
      title: 'Teen Digital Privacy Agreement',
      description: 'Comprehensive guidelines for teenagers',
      ageGroup: 'Ages 13-17',
      icon: Users,
      downloadUrl: '#'
    },
    {
      id: 'family-device-agreement',
      title: 'Family Device Usage Agreement',
      description: 'Rules for shared family devices',
      ageGroup: 'All Ages',
      icon: CheckCircle,
      downloadUrl: '#'
    },
    {
      id: 'social-media-agreement',
      title: 'Social Media Guidelines',
      description: 'Guidelines for social media use',
      ageGroup: 'Ages 10-17',
      icon: Users,
      downloadUrl: '#'
    }
  ];

  const handleDownload = (templateId: string, title: string) => {
    console.log(`Downloading ${title} (${templateId})`);
    alert(`Download started: ${title}\n\nThis would download a customizable PDF agreement ready for printing and signing.`);
  };

  const handleCustomize = () => {
    console.log('Customizing agreement with:', customizations);
    alert(`Custom agreement generated!\n\nFamily: ${customizations.familyName}\nChild: ${customizations.childName}\nParent: ${customizations.parentName}\n\nThis would create a personalized PDF agreement.`);
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
              <Users size={16} />
              <span className="text-sm font-semibold">FAMILY RESOURCES</span>
            </div>

            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Family Internet Agreement
            </h1>

            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Create a customized family agreement that establishes clear guidelines for safe and responsible internet use. Perfect for setting expectations and building trust.
            </p>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-gray-50" style={{ backgroundColor: 'var(--light)' }}>
        <div className="container mx-auto px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
            style={{ color: 'var(--primary-light)' }}
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-20">
        {/* Introduction */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--primary)' }}>
            Building Digital Trust Through Clear Guidelines
          </h2>
          <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--gray-600)' }}>
            A family internet agreement helps establish clear expectations, build trust, and create a safe digital environment for everyone. These customizable templates make it easy to create an agreement that works for your family.
          </p>
          
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 mb-8" style={{ backgroundColor: 'var(--light)' }}>
            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--primary)' }}>
              🤝 Agreement Benefits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1" style={{ color: 'var(--primary)' }}>Clear Expectations</h4>
                  <p className="text-sm" style={{ color: 'var(--gray-600)' }}>Everyone knows the rules and consequences</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1" style={{ color: 'var(--primary)' }}>Open Communication</h4>
                  <p className="text-sm" style={{ color: 'var(--gray-600)' }}>Encourages ongoing family discussions</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1" style={{ color: 'var(--primary)' }}>Trust Building</h4>
                  <p className="text-sm" style={{ color: 'var(--gray-600)' }}>Creates mutual respect and understanding</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1" style={{ color: 'var(--primary)' }}>Safety First</h4>
                  <p className="text-sm" style={{ color: 'var(--gray-600)' }}>Protects family members from online risks</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Agreement Builder */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-xl shadow-lg p-8" style={{ backgroundColor: 'var(--card-color)' }}>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
                Customize Your Family Agreement
              </h2>
              <p className="text-lg" style={{ color: 'var(--gray-600)' }}>
                Personalize the agreement with your family's specific needs and values
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                  Family Name
                </label>
                <input
                  type="text"
                  value={customizations.familyName}
                  onChange={(e) => setCustomizations({...customizations, familyName: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="The [Family Name] Family"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                  Child's Name
                </label>
                <input
                  type="text"
                  value={customizations.childName}
                  onChange={(e) => setCustomizations({...customizations, childName: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Child's full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                  Parent/Guardian Name
                </label>
                <input
                  type="text"
                  value={customizations.parentName}
                  onChange={(e) => setCustomizations({...customizations, parentName: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Parent/Guardian name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                  Additional Family Rules
                </label>
                <textarea
                  value={customizations.additionalRules}
                  onChange={(e) => setCustomizations({...customizations, additionalRules: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={3}
                  placeholder="Any specific rules your family wants to include..."
                />
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handleCustomize}
                className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center gap-2"
              >
                <Edit3 size={20} />
                Generate Custom Agreement
              </button>
            </div>
          </div>
        </div>

        {/* Agreement Templates */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: 'var(--primary)' }}>
            Pre-Made Agreement Templates
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {agreementTemplates.map((template) => {
              const IconComponent = template.icon;
              return (
                <div
                  key={template.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  style={{ backgroundColor: 'var(--card-color)' }}
                >
                  <div className="aspect-w-4 aspect-h-3 bg-gray-100">
                    <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                      <IconComponent size={48} className="text-purple-600" />
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold" style={{ color: 'var(--primary)' }}>
                        {template.title}
                      </h3>
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold">
                        PDF
                      </span>
                    </div>
                    
                    <p className="text-sm mb-4" style={{ color: 'var(--gray-600)' }}>
                      {template.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium" style={{ color: 'var(--gray-500)' }}>
                        {template.ageGroup}
                      </span>
                    </div>
                    
                    <button
                      onClick={() => handleDownload(template.id, template.title)}
                      className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Download size={16} />
                      Download Template
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Implementation Guide */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">
              How to Implement Your Family Agreement
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Step 1: Family Discussion</h3>
                <p className="text-sm opacity-90 mb-4">
                  Sit down as a family and discuss the importance of internet safety. Explain why these rules matter.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Step 2: Review Together</h3>
                <p className="text-sm opacity-90 mb-4">
                  Go through each rule together and make sure everyone understands what it means.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Step 3: Sign & Display</h3>
                <p className="text-sm opacity-90 mb-4">
                  Have everyone sign the agreement and display it prominently in your home.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Step 4: Regular Reviews</h3>
                <p className="text-sm opacity-90 mb-4">
                  Schedule regular family meetings to review and update the agreement as needed.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Resources */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: 'var(--primary)' }}>
            Related Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/guides/device-setup"
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              style={{ backgroundColor: 'var(--card-color)' }}
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <FileText size={24} className="text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                Device Setup Guide
              </h3>
              <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                Learn how to configure devices with appropriate controls
              </p>
            </Link>

            <Link
              to="/family-hub"
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              style={{ backgroundColor: 'var(--card-color)' }}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Users size={24} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                Family Hub
              </h3>
              <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                Track family progress and manage digital activities
              </p>
            </Link>

            <Link
              to="/parent-resources"
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              style={{ backgroundColor: 'var(--card-color)' }}
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <CheckCircle size={24} className="text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                Parent Resources
              </h3>
              <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                Additional tools and resources for parents
              </p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FamilyAgreementPage;