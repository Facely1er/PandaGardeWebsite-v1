import React, { useState } from 'react';
import { Shield, Smartphone, Camera, Microphone, MapPin, Users, AlertTriangle, CheckCircle } from 'lucide-react';

interface AppPermission {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
  isNecessary: boolean;
}

interface App {
  id: string;
  name: string;
  category: string;
  permissions: string[];
  description: string;
}

const AppPermissionsAnalyzer: React.FC = () => {
  const [selectedApp, setSelectedApp] = useState<string | null>(null);
  const [analyzedPermissions, setAnalyzedPermissions] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const permissions: AppPermission[] = [
    {
      id: 'camera',
      name: 'Camera',
      icon: <Camera className="w-5 h-5" />,
      description: 'Access to take photos and videos',
      riskLevel: 'medium',
      isNecessary: false
    },
    {
      id: 'microphone',
      name: 'Microphone',
      icon: <Microphone className="w-5 h-5" />,
      description: 'Access to record audio',
      riskLevel: 'high',
      isNecessary: false
    },
    {
      id: 'location',
      name: 'Location',
      icon: <MapPin className="w-5 h-5" />,
      description: 'Access to your precise location',
      riskLevel: 'high',
      isNecessary: false
    },
    {
      id: 'contacts',
      name: 'Contacts',
      icon: <Users className="w-5 h-5" />,
      description: 'Access to your contact list',
      riskLevel: 'high',
      isNecessary: false
    },
    {
      id: 'storage',
      name: 'Storage',
      icon: <Smartphone className="w-5 h-5" />,
      description: 'Access to files and documents',
      riskLevel: 'medium',
      isNecessary: false
    }
  ];

  const apps: App[] = [
    {
      id: 'social-media',
      name: 'SocialConnect',
      category: 'Social Media',
      permissions: ['camera', 'microphone', 'contacts', 'location'],
      description: 'A social media app for sharing photos and connecting with friends'
    },
    {
      id: 'photo-editor',
      name: 'PhotoPro',
      category: 'Photo Editing',
      permissions: ['camera', 'storage'],
      description: 'Professional photo editing and enhancement tools'
    },
    {
      id: 'weather',
      name: 'WeatherNow',
      category: 'Weather',
      permissions: ['location'],
      description: 'Get current weather conditions and forecasts'
    },
    {
      id: 'messaging',
      name: 'QuickChat',
      category: 'Messaging',
      permissions: ['contacts', 'microphone'],
      description: 'Instant messaging and voice calls'
    }
  ];

  const analyzePermission = (permissionId: string, appId: string) => {
    const permission = permissions.find(p => p.id === permissionId);
    const app = apps.find(a => a.id === appId);
    
    if (!permission || !app) return;

    let points = 0;
    const isAppPermission = app.permissions.includes(permissionId);

    if (isAppPermission) {
      if (permission.riskLevel === 'high') {
        points -= 15; // High risk permission
      } else if (permission.riskLevel === 'medium') {
        points -= 5; // Medium risk permission
      } else {
        points += 5; // Low risk permission
      }

      if (permission.isNecessary) {
        points += 10; // Necessary permission
      }
    } else {
      points += 5; // App doesn't request this permission
    }

    setScore(prev => prev + points);
    setAnalyzedPermissions(prev => new Set([...prev, permissionId]));
  };

  const resetAnalysis = () => {
    setScore(0);
    setAnalyzedPermissions(new Set());
    setSelectedApp(null);
    setShowResults(false);
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getScoreColor = () => {
    if (score >= 20) return 'text-green-600';
    if (score >= 0) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          <Shield className="inline-block w-8 h-8 mr-2" />
          App Permissions Analyzer
        </h1>
        <p className="text-lg text-gray-600">
          Learn to analyze app permissions and understand privacy risks before installing apps!
        </p>
        <div className="mt-4">
          <span className={`text-2xl font-bold ${getScoreColor()}`}>
            Privacy Score: {score}
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Apps Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Select an App to Analyze</h2>
          <div className="space-y-4">
            {apps.map((app) => (
              <div
                key={app.id}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  selectedApp === app.id
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSelectedApp(app.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{app.name}</h3>
                  <span className="text-sm text-gray-500">{app.category}</span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{app.description}</p>
                <div className="flex flex-wrap gap-2">
                  {app.permissions.map((permissionId) => {
                    const permission = permissions.find(p => p.id === permissionId);
                    return permission ? (
                      <span
                        key={permissionId}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(permission.riskLevel)}`}
                      >
                        {permission.name}
                      </span>
                    ) : null;
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Permissions Analysis Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Permission Analysis</h2>
          {selectedApp ? (
            <div className="space-y-4">
              {permissions.map((permission) => {
                const app = apps.find(a => a.id === selectedApp);
                const isAppPermission = app?.permissions.includes(permission.id) || false;
                const isAnalyzed = analyzedPermissions.has(permission.id);

                return (
                  <div
                    key={permission.id}
                    className={`border rounded-lg p-4 ${
                      isAnalyzed ? 'border-green-500 bg-green-50' : 'border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {permission.icon}
                        <span className="font-semibold">{permission.name}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(permission.riskLevel)}`}>
                        {permission.riskLevel.toUpperCase()} RISK
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{permission.description}</p>
                    
                    <div className="flex items-center gap-2 mb-3">
                      {isAppPermission ? (
                        <>
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                          <span className="text-sm text-red-600 font-medium">
                            This app requests this permission
                          </span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-green-600 font-medium">
                            This app does NOT request this permission
                          </span>
                        </>
                      )}
                    </div>

                    <button
                      onClick={() => analyzePermission(permission.id, selectedApp)}
                      disabled={isAnalyzed}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                        isAnalyzed
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {isAnalyzed ? 'Analyzed' : 'Analyze'}
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              Select an app to analyze its permissions
            </div>
          )}
        </div>
      </div>

      {/* Privacy Tips */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Privacy Protection Tips</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
          <ul className="space-y-2">
            <li>• <strong>Review permissions:</strong> Always check what permissions an app requests</li>
            <li>• <strong>Question necessity:</strong> Ask yourself if the app really needs that permission</li>
            <li>• <strong>High-risk permissions:</strong> Be extra careful with camera, microphone, and location</li>
          </ul>
          <ul className="space-y-2">
            <li>• <strong>Regular audits:</strong> Periodically review your installed apps and permissions</li>
            <li>• <strong>App store reviews:</strong> Read reviews to see if others mention privacy concerns</li>
            <li>• <strong>Alternative apps:</strong> Look for apps with better privacy practices</li>
          </ul>
        </div>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={resetAnalysis}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Start New Analysis
        </button>
      </div>
    </div>
  );
};

export default AppPermissionsAnalyzer;