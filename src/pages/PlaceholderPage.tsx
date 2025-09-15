import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Construction } from 'lucide-react';
import Logo from '../components/Logo';

interface PlaceholderPageProps {
  title: string;
  description?: string;
  comingSoon?: boolean;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({
  title,
  description = "We're working hard to bring you this content. Check back soon!",
  comingSoon = true
}) => {

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

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

          {comingSoon && (
            <div className="mb-12">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <Construction size={64} className="text-white" />
              </div>

              <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--primary)' }}>
                Coming Soon!
              </h2>

              <p className="text-xl mb-8 leading-relaxed" style={{ color: 'var(--gray-600)' }}>
                We're working hard to bring you this content. Our team is developing comprehensive resources
                to make your privacy education journey even better.
              </p>
            </div>
          )}

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-xl p-6 shadow-md" style={{ backgroundColor: 'var(--card-color)' }}>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Construction size={24} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                In Development
              </h3>
              <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                This content is currently being developed by our expert team.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md" style={{ backgroundColor: 'var(--card-color)' }}>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Logo />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                Quality Assured
              </h3>
              <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                All content goes through rigorous testing with families and educators.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md" style={{ backgroundColor: 'var(--card-color)' }}>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <ArrowLeft size={24} className="text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                Coming Soon
              </h3>
              <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                We'll notify you when this content becomes available.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">
              Explore What's Available Now
            </h2>
            <p className="text-lg mb-6 opacity-90">
              While we work on this content, check out our existing resources that are ready for your family to enjoy.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/activity-book"
                className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Activity Book
              </Link>
              <Link
                to="/story"
                className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors"
              >
                Privacy Panda Story
              </Link>
              <a
                href="/family-hub"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-500 text-green-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
              >
                Family Hub
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PlaceholderPage;