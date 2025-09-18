import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Shield, AlertTriangle, Users, Lock } from 'lucide-react';
import Logo from '../components/Logo';
import { pdfService } from '../lib/pdfService';

const SafetyPostersPage: React.FC = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const safetyPosters = [
    {
      id: 'privacy-basics',
      title: 'Privacy Basics',
      description: 'Essential privacy concepts for young learners',
      ageGroup: 'Ages 5-8',
      size: '11" x 17"',
      icon: Shield,
      downloadUrl: '#'
    },
    {
      id: 'online-safety-rules',
      title: 'Online Safety Rules',
      description: 'Simple rules for safe internet use',
      ageGroup: 'Ages 6-10',
      size: '11" x 17"',
      icon: AlertTriangle,
      downloadUrl: '#'
    },
    {
      id: 'password-protection',
      title: 'Password Protection',
      description: 'How to create and protect strong passwords',
      ageGroup: 'Ages 8-12',
      size: '11" x 17"',
      icon: Lock,
      downloadUrl: '#'
    },
    {
      id: 'family-privacy-agreement',
      title: 'Family Privacy Agreement',
      description: 'Guidelines for family digital privacy',
      ageGroup: 'All Ages',
      size: '8.5" x 11"',
      icon: Users,
      downloadUrl: '#'
    },
    {
      id: 'cyberbullying-prevention',
      title: 'Cyberbullying Prevention',
      description: 'Recognizing and preventing online bullying',
      ageGroup: 'Ages 9-13',
      size: '11" x 17"',
      icon: AlertTriangle,
      downloadUrl: '#'
    },
    {
      id: 'digital-footprint-awareness',
      title: 'Digital Footprint Awareness',
      description: 'Understanding your online presence',
      ageGroup: 'Ages 10-14',
      size: '11" x 17"',
      icon: Shield,
      downloadUrl: '#'
    }
  ];

  const handleDownload = async (posterId: string) => {
    if (posterId === 'all-posters') {
      setIsDownloading(true);
      try {
        await pdfService.generateSafetyPostersPDF();
      } catch (error) {
        console.error('Error downloading safety posters:', error);
        alert('Error downloading safety posters. Please try again.');
      } finally {
        setIsDownloading(false);
      }
    } else {
      // For individual posters, open the HTML version for now
      const url = `/downloads/safety-posters.html`;
      window.open(url, '_blank');
    }
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
              <span className="text-sm font-semibold">CLASSROOM RESOURCES</span>
            </div>

            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Digital Safety Posters
            </h1>

            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Professional classroom posters designed to reinforce privacy education concepts. Perfect for schools, libraries, and educational environments.
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
            Visual Learning Tools for Privacy Education
          </h2>
          <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--gray-600)' }}>
            These professionally designed posters serve as constant visual reminders of important privacy concepts. They're perfect for classrooms, computer labs, libraries, and home learning spaces.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8" style={{ backgroundColor: 'var(--light)' }}>
            <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--primary)' }}>
              📋 Printing & Display Guidelines
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="flex items-start gap-3">
                <Shield size={20} className="text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1" style={{ color: 'var(--primary)' }}>Print Quality</h4>
                  <p className="text-sm" style={{ color: 'var(--gray-600)' }}>Use high-quality paper and color printing for best results</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield size={20} className="text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1" style={{ color: 'var(--primary)' }}>Placement</h4>
                  <p className="text-sm" style={{ color: 'var(--gray-600)' }}>Display at eye level for children in learning areas</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield size={20} className="text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1" style={{ color: 'var(--primary)' }}>Lamination</h4>
                  <p className="text-sm" style={{ color: 'var(--gray-600)' }}>Consider laminating for durability and easy cleaning</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield size={20} className="text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1" style={{ color: 'var(--primary)' }}>Discussion</h4>
                  <p className="text-sm" style={{ color: 'var(--gray-600)' }}>Use posters as conversation starters about privacy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Posters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {safetyPosters.map((poster) => {
            const IconComponent = poster.icon;
            return (
              <div
                key={poster.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                style={{ backgroundColor: 'var(--card-color)' }}
              >
                <div className="aspect-w-4 aspect-h-3 bg-gray-100">
                  <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center">
                    <IconComponent size={48} className="text-blue-600" />
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold" style={{ color: 'var(--primary)' }}>
                      {poster.title}
                    </h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                      {poster.size}
                    </span>
                  </div>
                  
                  <p className="text-sm mb-4" style={{ color: 'var(--gray-600)' }}>
                    {poster.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium" style={{ color: 'var(--gray-500)' }}>
                      {poster.ageGroup}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => handleDownload(poster.id, poster.title)}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download size={16} />
                    View & Print
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bulk Download Section */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-8 text-white text-center mb-16">
          <h2 className="text-2xl font-bold mb-4">
            Complete Poster Collection
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Download all 6 safety posters in one package. Perfect for educators setting up comprehensive privacy education displays!
          </p>
          <button
            onClick={() => handleDownload('all-posters', 'Complete Safety Poster Collection')}
            disabled={isDownloading}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download size={20} />
            {isDownloading ? 'Generating PDF...' : 'Download Complete Set'}
          </button>
        </div>

        {/* Additional Resources */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center" style={{ color: 'var(--primary)' }}>
            Related Resources
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              to="/downloads/coloring-sheets"
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              style={{ backgroundColor: 'var(--card-color)' }}
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Shield size={24} className="text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                Coloring Sheets
              </h3>
              <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                Download fun coloring pages featuring Privacy Panda
              </p>
            </Link>

            <Link
              to="/downloads/family-agreement"
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              style={{ backgroundColor: 'var(--card-color)' }}
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Users size={24} className="text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                Family Agreement
              </h3>
              <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                Customizable family guidelines for internet use
              </p>
            </Link>

            <Link
              to="/educator-tools"
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-center"
              style={{ backgroundColor: 'var(--card-color)' }}
            >
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <AlertTriangle size={24} className="text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                Educator Tools
              </h3>
              <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                Additional resources for teachers and educators
              </p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SafetyPostersPage;