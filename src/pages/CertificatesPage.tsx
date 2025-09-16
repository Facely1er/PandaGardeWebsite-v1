import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Award, Star, Trophy, Medal } from 'lucide-react';
import Logo from '../components/Logo';

const CertificatesPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const certificates = [
    {
      id: 'privacy-champion',
      title: 'Privacy Champion Certificate',
      description: 'Awarded for completing all privacy education activities',
      requirements: 'Complete 6 activities',
      icon: Trophy,
      downloadUrl: '#'
    },
    {
      id: 'privacy-explorer',
      title: 'Privacy Explorer Certificate',
      description: 'Awarded for completing your first privacy activity',
      requirements: 'Complete 1 activity',
      icon: Star,
      downloadUrl: '#'
    },
    {
      id: 'privacy-learner',
      title: 'Privacy Learner Certificate',
      description: 'Awarded for completing multiple privacy activities',
      requirements: 'Complete 3 activities',
      icon: Medal,
      downloadUrl: '#'
    },
    {
      id: 'dedicated-learner',
      title: 'Dedicated Learner Certificate',
      description: 'Awarded for spending significant time learning about privacy',
      requirements: 'Spend 60+ minutes learning',
      icon: Award,
      downloadUrl: '#'
    },
    {
      id: 'perfect-score',
      title: 'Perfect Score Master Certificate',
      description: 'Awarded for achieving perfect scores on all activities',
      requirements: '100% score on all activities',
      icon: Trophy,
      downloadUrl: '#'
    },
    {
      id: 'family-privacy-guardian',
      title: 'Family Privacy Guardian Certificate',
      description: 'Awarded to families who complete privacy education together',
      requirements: 'Family completes activities together',
      icon: Award,
      downloadUrl: '#'
    }
  ];

  const handleDownload = (certId: string, title: string) => {
    console.log(`Downloading ${title} (${certId})`);
    alert(`Download started: ${title}\n\nThis would download a high-quality PDF certificate ready for printing and framing.`);
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
              <Award size={16} />
              <span className="text-sm font-semibold">ACHIEVEMENT CERTIFICATES</span>
            </div>

            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Privacy Champion Certificates
            </h1>

            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Celebrate privacy education achievements with these beautiful, printable certificates. Perfect for recognizing children's learning milestones!
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
            Celebrate Learning Achievements
          </h2>
          <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--gray-600)' }}>
            These certificates recognize and celebrate children's privacy education achievements. They serve as positive reinforcement and create lasting memories of their learning journey.
          </p>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8" style={{ backgroundColor: 'var(--light)' }}>
            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--primary)' }}>
              🏆 Certificate Usage Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="flex items-start gap-3">
                <Star size={20} className="text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1" style={{ color: 'var(--primary)' }}>Personalize</h4>
                  <p className="text-sm" style={{ color: 'var(--gray-600)' }}>Add the child's name and achievement date</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Star size={20} className="text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1" style={{ color: 'var(--primary)' }}>Display Proudly</h4>
                  <p className="text-sm" style={{ color: 'var(--gray-600)' }}>Frame and display certificates in learning areas</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Star size={20} className="text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1" style={{ color: 'var(--primary)' }}>Celebrate Together</h4>
                  <p className="text-sm" style={{ color: 'var(--gray-600)' }}>Present certificates during family celebrations</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Star size={20} className="text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1" style={{ color: 'var(--primary)' }}>Create Portfolio</h4>
                  <p className="text-sm" style={{ color: 'var(--gray-600)' }}>Keep certificates as part of learning portfolio</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {certificates.map((cert) => {
            const IconComponent = cert.icon;
            return (
              <div
                key={cert.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                style={{ backgroundColor: 'var(--card-color)' }}
              >
                <div className="aspect-w-4 aspect-h-3 bg-gray-100">
                  <div className="w-full h-48 bg-gradient-to-br from-yellow-100 to-yellow-200 flex items-center justify-center">
                    <IconComponent size={48} className="text-yellow-600" />
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold" style={{ color: 'var(--primary)' }}>
                      {cert.title}
                    </h3>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                      PDF
                    </span>
                  </div>
                  
                  <p className="text-sm mb-4" style={{ color: 'var(--gray-600)' }}>
                    {cert.description}
                  </p>
                  
                  <div className="bg-gray-50 rounded-lg p-3 mb-4" style={{ backgroundColor: 'var(--light)' }}>
                    <h4 className="text-sm font-semibold mb-1" style={{ color: 'var(--primary)' }}>
                      Requirements:
                    </h4>
                    <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                      {cert.requirements}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => handleDownload(cert.id, cert.title)}
                    className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download size={16} />
                    Download Certificate
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Certificate Generator */}
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-8 text-white text-center mb-16">
          <h2 className="text-2xl font-bold mb-4">
            Generate Custom Certificate
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Create a personalized certificate for any privacy education achievement. Perfect for recognizing individual accomplishments!
          </p>
          <Link
            to="/certificates"
            className="bg-white text-yellow-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
          >
            <Award size={20} />
            Generate Custom Certificate
          </Link>
        </div>

        {/* Bulk Download Section */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-8 text-white text-center mb-16">
          <h2 className="text-2xl font-bold mb-4">
            Complete Certificate Collection
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Download all 6 certificate templates in one package. Perfect for educators and families who want to recognize various achievements!
          </p>
          <button
            onClick={() => handleDownload('all-certificates', 'Complete Certificate Collection')}
            className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
          >
            <Download size={20} />
            Download Complete Set
          </button>
        </div>

        {/* Additional Resources */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: 'var(--primary)' }}>
            Related Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/activity-book"
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              style={{ backgroundColor: 'var(--card-color)' }}
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Award size={24} className="text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                Activity Book
              </h3>
              <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                Complete activities to earn these certificates
              </p>
            </Link>

            <Link
              to="/downloads/coloring-sheets"
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              style={{ backgroundColor: 'var(--card-color)' }}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Star size={24} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                Coloring Sheets
              </h3>
              <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                Download fun coloring pages featuring Privacy Panda
              </p>
            </Link>

            <Link
              to="/family-hub"
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              style={{ backgroundColor: 'var(--card-color)' }}
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Trophy size={24} className="text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                Family Hub
              </h3>
              <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                Track family achievements and progress together
              </p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CertificatesPage;