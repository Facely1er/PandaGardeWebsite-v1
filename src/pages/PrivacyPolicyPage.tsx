import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Eye, Database, Users, Mail } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import Logo from '../components/Logo';

const PrivacyPolicyPage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--white)', color: 'var(--gray-800)' }}>
      {/* Header */}
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
              <span className="text-sm font-semibold">PRIVACY POLICY</span>
            </div>
            
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Privacy Policy
            </h1>
            
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              How we protect your privacy and data while providing educational content about digital safety.
            </p>
            
            <p className="text-sm opacity-75">
              Last updated: {new Date().toLocaleDateString()}
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

      {/* Privacy Policy Content */}
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8 rounded-r-lg" 
                 style={{ 
                   backgroundColor: 'var(--light)', 
                   borderLeftColor: 'var(--primary-light)' 
                 }}>
              <h2 className="text-2xl font-bold text-green-800 mb-3" style={{ color: 'var(--primary)' }}>
                Our Commitment to Privacy
              </h2>
              <p className="text-gray-700 leading-relaxed" style={{ color: 'var(--gray-600)' }}>
                At PandaGarde, we believe that privacy education should be taught through example. 
                We are committed to protecting your privacy and the privacy of your children while 
                providing valuable educational content about digital safety.
              </p>
            </div>

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3" style={{ color: 'var(--primary)' }}>
                <Database size={32} />
                Information We Collect
              </h2>
              
              <div className="bg-white rounded-lg p-6 shadow-md mb-6" style={{ backgroundColor: 'var(--card-color)' }}>
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--primary)' }}>
                  Minimal Data Collection
                </h3>
                <p className="mb-4" style={{ color: 'var(--gray-600)' }}>
                  We collect the absolute minimum information necessary to provide our educational services:
                </p>
                <ul className="list-disc pl-6 space-y-2" style={{ color: 'var(--gray-600)' }}>
                  <li><strong>Progress Data:</strong> Activity completion status and scores (stored locally on your device)</li>
                  <li><strong>Contact Information:</strong> Only when you voluntarily contact us through our contact form</li>
                  <li><strong>Usage Analytics:</strong> Anonymous, aggregated data to improve our services</li>
                </ul>
              </div>

              <div className="bg-red-50 border border-red-200 p-6 rounded-lg" 
                   style={{ 
                     backgroundColor: theme === 'dark' ? 'rgba(239, 68, 68, 0.1)' : '#FEF2F2',
                     borderColor: theme === 'dark' ? 'rgba(239, 68, 68, 0.3)' : '#FECACA'
                   }}>
                <h3 className="text-lg font-semibold mb-3 text-red-800" 
                    style={{ color: theme === 'dark' ? '#F87171' : '#B91C1C' }}>
                  What We DON'T Collect
                </h3>
                <ul className="list-disc pl-6 space-y-1 text-red-700" 
                    style={{ color: theme === 'dark' ? '#F87171' : '#B91C1C' }}>
                  <li>Personal information from children under 13</li>
                  <li>Names, addresses, or contact details of children</li>
                  <li>Photos or videos of children</li>
                  <li>Location data or device identifiers</li>
                  <li>Browsing history or search queries</li>
                </ul>
              </div>
            </section>

            {/* How We Use Information */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3" style={{ color: 'var(--primary)' }}>
                <Eye size={32} />
                How We Use Your Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-md" style={{ backgroundColor: 'var(--card-color)' }}>
                  <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--primary)' }}>
                    Educational Purposes
                  </h3>
                  <ul className="list-disc pl-6 space-y-2" style={{ color: 'var(--gray-600)' }}>
                    <li>Track learning progress and achievements</li>
                    <li>Provide personalized educational content</li>
                    <li>Generate completion certificates</li>
                    <li>Improve our educational materials</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-md" style={{ backgroundColor: 'var(--card-color)' }}>
                  <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--primary)' }}>
                    Service Improvement
                  </h3>
                  <ul className="list-disc pl-6 space-y-2" style={{ color: 'var(--gray-600)' }}>
                    <li>Analyze usage patterns (anonymized)</li>
                    <li>Fix bugs and technical issues</li>
                    <li>Develop new features and activities</li>
                    <li>Ensure platform security</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Data Protection */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3" style={{ color: 'var(--primary)' }}>
                <Lock size={32} />
                How We Protect Your Data
              </h2>
              
              <div className="bg-green-100 border border-green-300 p-6 rounded-lg mb-6" 
                   style={{ 
                     backgroundColor: 'var(--tertiary)',
                     borderColor: 'var(--secondary)'
                   }}>
                <h3 className="text-xl font-semibold mb-4 text-green-800" style={{ color: 'var(--primary)' }}>
                  Local Storage First
                </h3>
                <p className="text-green-800 mb-4" style={{ color: 'var(--primary)' }}>
                  All progress data is stored locally on your device using secure browser storage. 
                  This means your child's learning progress never leaves your device unless you choose to export it.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock size={32} className="text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--primary)' }}>Encryption</h3>
                  <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                    All data transmission uses HTTPS encryption
                  </p>
                </div>
                
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield size={32} className="text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--primary)' }}>No Tracking</h3>
                  <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                    We don't use tracking cookies or analytics
                  </p>
                </div>
                
                <div className="text-center p-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users size={32} className="text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2" style={{ color: 'var(--primary)' }}>No Sharing</h3>
                  <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                    We never share data with third parties
                  </p>
                </div>
              </div>
            </section>

            {/* Children's Privacy */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--primary)' }}>
                Children's Privacy (COPPA Compliance)
              </h2>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-lg mb-6" 
                   style={{ 
                     backgroundColor: theme === 'dark' ? 'rgba(251, 191, 36, 0.1)' : '#FFFBEB',
                     borderLeftColor: 'var(--warning)'
                   }}>
                <h3 className="text-lg font-semibold mb-3 text-yellow-800" 
                    style={{ color: theme === 'dark' ? '#FCD34D' : '#92400E' }}>
                  Special Protections for Children
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-yellow-800" 
                    style={{ color: theme === 'dark' ? '#FCD34D' : '#92400E' }}>
                  <li>We do not knowingly collect personal information from children under 13</li>
                  <li>All educational content is designed to be safe and appropriate for children</li>
                  <li>Parents can review and delete their child's progress data at any time</li>
                  <li>We follow COPPA (Children's Online Privacy Protection Act) guidelines</li>
                </ul>
              </div>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--primary)' }}>
                Your Rights and Choices
              </h2>
              
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-6 shadow-md" style={{ backgroundColor: 'var(--card-color)' }}>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--primary)' }}>
                    Access and Control
                  </h3>
                  <ul className="list-disc pl-6 space-y-2" style={{ color: 'var(--gray-600)' }}>
                    <li>View all data we have about you or your child</li>
                    <li>Export your progress data for backup or transfer</li>
                    <li>Delete all data associated with your account</li>
                    <li>Opt out of any data collection (though this may limit functionality)</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3" style={{ color: 'var(--primary)' }}>
                <Mail size={32} />
                Questions About Privacy?
              </h2>
              
              <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg" 
                   style={{ 
                     backgroundColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.1)' : '#EFF6FF',
                     borderColor: theme === 'dark' ? 'rgba(59, 130, 246, 0.3)' : '#93C5FD'
                   }}>
                <p className="text-blue-800 mb-4" style={{ color: theme === 'dark' ? '#93C5FD' : '#1E40AF' }}>
                  If you have any questions about this Privacy Policy or our data practices, 
                  please don't hesitate to contact us:
                </p>
                <div className="space-y-2 text-blue-800" style={{ color: theme === 'dark' ? '#93C5FD' : '#1E40AF' }}>
                  <p><strong>Email:</strong> privacy@pandagarde.com</p>
                  <p><strong>Contact Form:</strong> <Link to="/contact" className="underline hover:no-underline">Visit our contact page</Link></p>
                </div>
              </div>
            </section>

            {/* Updates */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--primary)' }}>
                Policy Updates
              </h2>
              <p className="mb-4" style={{ color: 'var(--gray-600)' }}>
                We may update this Privacy Policy from time to time. When we do, we will:
              </p>
              <ul className="list-disc pl-6 space-y-2" style={{ color: 'var(--gray-600)' }}>
                <li>Post the updated policy on this page</li>
                <li>Update the "Last updated" date at the top</li>
                <li>Notify users of significant changes via email (if we have your contact information)</li>
                <li>Provide a summary of changes for easy review</li>
              </ul>
            </section>

          </div>

          {/* Call to Action */}
          <div className="mt-16 bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Now that you know how we protect your privacy, explore our educational activities!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                to="/activity-book"
                className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Try Activities
              </Link>
              <Link 
                to="/story"
                className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors"
              >
                Read Our Story
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicyPage;