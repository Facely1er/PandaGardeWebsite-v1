import React, { useState } from 'react';
import AppPermissionsAnalyzer from '../tools/AppPermissionsAnalyzer';
import DigitalFootprintTimeline from '../tools/DigitalFootprintTimeline';
import GamificationDashboard from '../components/GamificationDashboard';
import Card from '../components/Card';

const PrivacyToolsPage: React.FC = () => {
  const [selectedTool, setSelectedTool] = useState<'dashboard' | 'permissions' | 'footprint'>('dashboard');
  const [userId] = useState('demo-user-13-17'); // In a real app, this would come from auth
  const [ageGroup] = useState<'13-17'>('13-17'); // In a real app, this would come from user profile

  const tools = [
    {
      id: 'dashboard',
      name: 'Learning Dashboard',
      description: 'Track your progress, complete missions, and unlock achievements',
      icon: '📊',
      component: <GamificationDashboard userId={userId} ageGroup={ageGroup} />
    },
    {
      id: 'permissions',
      name: 'App Permissions Analyzer',
      description: 'Analyze app permissions and learn how to protect your privacy',
      icon: '📱',
      component: <AppPermissionsAnalyzer />
    },
    {
      id: 'footprint',
      name: 'Digital Footprint Timeline',
      description: 'Track your digital activities and understand your privacy footprint',
      icon: '👣',
      component: <DigitalFootprintTimeline />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Learning Tools</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Interactive tools designed specifically for teens to learn about digital privacy, 
            security, and responsible online behavior. Complete missions, earn XP, and become a privacy expert!
          </p>
        </div>

        {/* Tool Selection */}
        <div className="mb-8">
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Choose a Tool</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tools.map(tool => (
                  <button
                    key={tool.id}
                    onClick={() => setSelectedTool(tool.id as any)}
                    className={`p-6 rounded-lg border-2 transition-all text-left ${
                      selectedTool === tool.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <div className="text-3xl mb-3">{tool.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.name}</h3>
                    <p className="text-gray-600 text-sm">{tool.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Selected Tool */}
        <div className="mb-8">
          {tools.find(tool => tool.id === selectedTool)?.component}
        </div>

        {/* Educational Content */}
        <Card>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Privacy Matters for Teens</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">🔒 Your Digital Identity</h3>
                <p className="text-gray-600 mb-4">
                  Everything you do online creates a digital footprint. Understanding how to manage 
                  this footprint helps protect your reputation and future opportunities.
                </p>
                <h3 className="font-semibold text-gray-900 mb-2">📱 App Permissions</h3>
                <p className="text-gray-600">
                  Apps often request more permissions than they need. Learning to analyze and 
                  control these permissions is crucial for protecting your personal data.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">🎯 Learning Through Gamification</h3>
                <p className="text-gray-600 mb-4">
                  Our gamified approach makes learning about privacy fun and engaging. Complete 
                  missions, earn XP, and unlock achievements as you build your privacy knowledge.
                </p>
                <h3 className="font-semibold text-gray-900 mb-2">🛡️ Building Good Habits</h3>
                <p className="text-gray-600">
                  Regular practice with these tools helps you develop good privacy habits that 
                  will protect you throughout your digital life.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Tips Section */}
        <Card className="mt-8">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Privacy Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-3">🔍</div>
                <h3 className="font-semibold text-gray-900 mb-2">Review Regularly</h3>
                <p className="text-gray-600 text-sm">
                  Check your app permissions and privacy settings monthly to ensure they're still appropriate.
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">🚫</div>
                <h3 className="font-semibold text-gray-900 mb-2">Say No When Possible</h3>
                <p className="text-gray-600 text-sm">
                  Only grant permissions that are necessary for the app's core functionality.
                </p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-3">📚</div>
                <h3 className="font-semibold text-gray-900 mb-2">Keep Learning</h3>
                <p className="text-gray-600 text-sm">
                  Privacy threats evolve constantly. Stay informed and continue learning about new risks.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyToolsPage;