import React, { ReactNode } from 'react';
import { ArrowLeft, Home, BookOpen } from 'lucide-react';

interface ToolWrapperProps {
  title: string;
  description: string;
  ageGroup: 'ages-5-8' | 'ages-9-12' | 'ages-13-17';
  children: ReactNode;
  onBack?: () => void;
}

const ToolWrapper: React.FC<ToolWrapperProps> = ({
  title,
  description,
  ageGroup,
  children,
  onBack
}) => {
  const getAgeGroupColor = () => {
    switch (ageGroup) {
      case 'ages-5-8': return 'from-pink-500 to-pink-600';
      case 'ages-9-12': return 'from-blue-500 to-blue-600';
      case 'ages-13-17': return 'from-purple-500 to-purple-600';
      default: return 'from-green-500 to-green-600';
    }
  };

  const getAgeGroupLabel = () => {
    switch (ageGroup) {
      case 'ages-5-8': return 'Ages 5-8';
      case 'ages-9-12': return 'Ages 9-12';
      case 'ages-13-17': return 'Ages 13-17';
      default: return 'All Ages';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className={`bg-gradient-to-r ${getAgeGroupColor()} text-white py-6`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              {onBack && (
                <button
                  onClick={onBack}
                  className="flex items-center gap-2 hover:bg-white/20 px-3 py-2 rounded-lg transition-colors"
                >
                  <ArrowLeft size={20} />
                  Back
                </button>
              )}
              <div className="flex items-center gap-2">
                <BookOpen size={24} />
                <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">
                  {getAgeGroupLabel()}
                </span>
              </div>
            </div>
            <button
              onClick={() => window.location.href = '/'}
              className="flex items-center gap-2 hover:bg-white/20 px-3 py-2 rounded-lg transition-colors"
            >
              <Home size={20} />
              Home
            </button>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">{title}</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">{description}</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm opacity-75">
            Privacy Panda - Teaching digital privacy and safety through interactive tools
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ToolWrapper;