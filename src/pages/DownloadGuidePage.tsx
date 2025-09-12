import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, FileText } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Logo from '../components/Logo';

interface DownloadGuidePageProps {
  title: string;
  description?: string;
  type: 'download' | 'guide';
}

const DownloadGuidePage: React.FC<DownloadGuidePageProps> = ({ 
  title, 
  description = "This resource is being prepared for you.",
  type
}) => {
  const { theme } = useTheme();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const icon = type === 'download' ? Download : FileText;
  const IconComponent = icon;

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
              <IconComponent size={16} />
              <span className="text-sm font-semibold">{type.toUpperCase()}</span>
            </div>
            
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              {title}
            </h1>
            
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              {description}
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
        <div className="max-w-4xl mx-auto text-center">
          
          <div className="mb-12">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
              <IconComponent size={64} className="text-white" />
            </div>
            
            <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--primary)' }}>
              {type === 'download' ? 'Download Coming Soon' : 'Guide Coming Soon'}
            </h2>
            
            <p className="text-xl mb-8 leading-relaxed" style={{ color: 'var(--gray-600)' }}>
              {type === 'download' 
                ? 'We\'re preparing this downloadable resource for you. It will include high-quality materials designed to support your privacy education journey.'
                : 'This comprehensive guide is being developed by our team of privacy experts and educators. It will provide step-by-step instructions and practical tips.'
              }
            </p>
          </div>

          {/* What to Expect */}
          <div className="bg-gray-50 rounded-xl p-8 mb-12" style={{ backgroundColor: 'var(--light)' }}>
            <h3 className="text-2xl font-bold mb-6" style={{ color: 'var(--primary)' }}>
              What to Expect
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                    Expert Content
                  </h4>
                  <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                    Developed by privacy experts and tested with families
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                    Age-Appropriate
                  </h4>
                  <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                    Tailored for different age groups and learning styles
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                    Practical Application
                  </h4>
                  <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                    Real-world tips you can implement immediately
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                    Easy to Use
                  </h4>
                  <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                    {type === 'download' ? 'Print-ready formats for home and classroom use' : 'Step-by-step instructions with clear explanations'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">
              Explore Available Resources
            </h2>
            <p className="text-lg mb-6 opacity-90">
              While we prepare this {type}, check out our ready-to-use privacy education resources.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                to="/activity-book"
                className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              >
                <FileText size={20} />
                Activity Book
              </Link>
              <Link 
                to="/"
                className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors inline-flex items-center gap-2"
              >
                <Download size={20} />
                Current Resources
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DownloadGuidePage;