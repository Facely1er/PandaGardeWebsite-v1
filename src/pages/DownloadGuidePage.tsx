import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, FileText, Printer, Eye, CheckCircle } from 'lucide-react';
import Logo from '../components/Logo';
import { pdfService } from '../lib/pdfService';

interface DownloadGuidePageProps {
  title: string;
  description?: string;
  type: 'download' | 'guide';
  resourceType?: 'certificates' | 'coloring-sheets' | 'family-agreement' | 'safety-posters';
}

const DownloadGuidePage: React.FC<DownloadGuidePageProps> = ({
  title,
  description = "Download and print these privacy education resources.",
  type,
  resourceType
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const icon = type === 'download' ? Download : FileText;
  const IconComponent = icon;

  const handleDownload = async (resourceType: string) => {
    setIsDownloading(true);
    try {
      // Generate and download PDF based on resource type
      switch (resourceType) {
        case 'coloring-sheets':
          await pdfService.generateColoringSheetsPDF();
          break;
        case 'safety-posters':
          await pdfService.generateSafetyPostersPDF();
          break;
        case 'certificates':
          await pdfService.generateCertificatesPDF();
          break;
        case 'family-agreement':
          await pdfService.generateFamilyAgreementPDF();
          break;
        default:
          // Fallback to HTML view
          const url = `/downloads/${resourceType}.html`;
          window.open(url, '_blank');
      }
    } catch (error) {
      console.error('Error downloading resource:', error);
      // Fallback to HTML view if PDF generation fails
      const url = `/downloads/${resourceType}.html`;
      window.open(url, '_blank');
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = (resourceType: string) => {
    const url = `/downloads/${resourceType}.html`;
    const printWindow = window.open(url, '_blank');
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  const handlePreview = (resourceType: string) => {
    const url = `/downloads/${resourceType}.html`;
    window.open(url, '_blank');
  };

  const getResourceInfo = (type: string) => {
    const resources = {
      'certificates': {
        title: 'Privacy Champion Certificates',
        description: 'Printable certificates to celebrate your child\'s privacy learning achievements',
        features: ['Multiple certificate designs', 'Customizable with child\'s name', 'Print-ready format', 'Perfect for framing'],
        icon: '🏆'
      },
      'coloring-sheets': {
        title: 'Privacy Panda Coloring Sheets',
        description: 'Educational coloring pages that teach privacy concepts while having fun',
        features: ['5 unique coloring pages', 'Privacy tips included', 'Age-appropriate designs', 'Educational content'],
        icon: '🎨'
      },
      'family-agreement': {
        title: 'Family Internet Agreement',
        description: 'A comprehensive agreement to establish safe internet use rules for your family',
        features: ['Customizable rules', 'Signature sections', 'Age-appropriate guidelines', 'Regular review prompts'],
        icon: '📋'
      },
      'safety-posters': {
        title: 'Digital Safety Posters',
        description: 'Visual reminders of important digital safety rules for home and classroom',
        features: ['5 safety rule posters', 'Eye-catching designs', 'Print-ready format', 'Classroom-friendly'],
        icon: '🛡️'
      }
    };
    return resources[type as keyof typeof resources] || resources['certificates'];
  };

  const resourceInfo = resourceType ? getResourceInfo(resourceType) : null;

  return (
    <div className="min-h-screen bg-white">
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
      <div className="bg-gray-50">
        <div className="container mx-auto px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {resourceInfo ? (
            <>
              {/* Resource Information */}
              <div className="text-center mb-12">
                <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <span className="text-6xl">{resourceInfo.icon}</span>
                </div>

                <h2 className="text-3xl font-bold mb-6 text-gray-900">
                  {resourceInfo.title}
                </h2>

                <p className="text-xl mb-8 leading-relaxed text-gray-600">
                  {resourceInfo.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-center mb-12">
                <button
                  onClick={() => handleDownload(resourceType!)}
                  disabled={isDownloading}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
                >
                  <Download size={20} />
                  {isDownloading ? 'Opening...' : 'Download & Print'}
                </button>
                
                <button
                  onClick={() => handlePreview(resourceType!)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
                >
                  <Eye size={20} />
                  Preview
                </button>
                
                <button
                  onClick={() => handlePrint(resourceType!)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
                >
                  <Printer size={20} />
                  Print Directly
                </button>
              </div>

              {/* Features */}
              <div className="bg-gray-50 rounded-xl p-8 mb-12">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">
                  What's Included
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {resourceInfo.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <CheckCircle size={16} className="text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{feature}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-8 text-white mb-12">
                <h3 className="text-2xl font-bold mb-4">
                  How to Use
                </h3>
                <div className="space-y-4 text-lg">
                  <p>1. <strong>Download:</strong> Click "Download & Print" to open the resource in a new tab</p>
                  <p>2. <strong>Customize:</strong> Fill in any blanks with your child's information</p>
                  <p>3. <strong>Print:</strong> Use your browser's print function (Ctrl+P or Cmd+P)</p>
                  <p>4. <strong>Enjoy:</strong> Use these resources to reinforce privacy learning at home!</p>
                </div>
              </div>
            </>
          ) : (
            /* Generic download page for other resources */
            <div className="text-center">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <IconComponent size={64} className="text-white" />
              </div>

              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                {type === 'download' ? 'Download Coming Soon' : 'Guide Coming Soon'}
              </h2>

              <p className="text-xl mb-8 leading-relaxed text-gray-600">
                {type === 'download'
                  ? 'We\'re preparing this downloadable resource for you. It will include high-quality materials designed to support your privacy education journey.'
                  : 'This comprehensive guide is being developed by our team of privacy experts and educators. It will provide step-by-step instructions and practical tips.'
                }
              </p>
            </div>
          )}

          {/* Call to Action */}
          <div className="bg-gray-50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">
              Explore More Resources
            </h2>
            <p className="text-lg mb-6 text-gray-600">
              Check out our other privacy education resources and activities.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/activity-book"
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center gap-2"
              >
                <FileText size={20} />
                Activity Book
              </Link>
              <Link
                to="/certificates"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
              >
                <Download size={20} />
                Certificates
              </Link>
              <Link
                to="/"
                className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors inline-flex items-center gap-2"
              >
                All Resources
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DownloadGuidePage;