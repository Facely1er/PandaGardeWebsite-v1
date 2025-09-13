import { useEffect } from 'react';

interface ExternalRedirectProps {
  url: string;
}

const ExternalRedirect: React.FC<ExternalRedirectProps> = ({ url }) => {
  useEffect(() => {
    // Redirect to external URL
    window.location.href = url;
  }, [url]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to Family Hub...</p>
      </div>
    </div>
  );
};

export default ExternalRedirect;