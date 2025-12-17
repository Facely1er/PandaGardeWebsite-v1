import React, { useState } from 'react';
import { ArrowLeft, Map, BookOpen, GraduationCap, Star, Play, Clock, Target, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useJourneyCompletion } from '../../utils/familyProgressIntegration';

interface JourneyActivity {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  icon: string;
  color: string;
}

interface JourneyPath {
  id: string;
  name: string;
  description: string;
  ageRange: string;
  icon: React.ReactNode;
  color: string;
  activities: JourneyActivity[];
}

const journeyPaths: JourneyPath[] = [
  {
    id: 'elementary',
    name: 'Privacy Explorers',
    description: 'Fun adventures for young learners (Ages 6-10)',
    ageRange: '6-10',
    icon: <Star className="text-yellow-500" size={24} />,
    color: 'from-yellow-500 to-orange-500',
    activities: [
      {
        id: 'pack-backpack',
        title: 'Pack Your Digital Backpack',
        description: 'Learn what information is safe to share online',
        duration: '5 min',
        difficulty: 'Easy',
        icon: '🎒',
        color: 'from-blue-500 to-cyan-500'
      },
      {
        id: 'destination-decisions',
        title: 'Destination Decision Station',
        description: 'Make smart choices about sharing in different situations',
        duration: '8 min',
        difficulty: 'Medium',
        icon: '🗺️',
        color: 'from-purple-500 to-pink-500'
      },
      {
        id: 'privacy-checkpoint',
        title: 'Privacy Checkpoint Challenge',
        description: 'Test your privacy knowledge with quick decisions',
        duration: '6 min',
        difficulty: 'Medium',
        icon: '🛡️',
        color: 'from-green-500 to-emerald-500'
      }
    ]
  },
  {
    id: 'middle',
    name: 'Digital Defenders',
    description: 'Building stronger skills (Ages 11-13)',
    ageRange: '11-13',
    icon: <BookOpen className="text-blue-500" size={24} />,
    color: 'from-blue-500 to-indigo-500',
    activities: [
      {
        id: 'social-safety',
        title: 'Social Media Safety Quest',
        description: 'Navigate the world of social media safely',
        duration: '10 min',
        difficulty: 'Medium',
        icon: '📱',
        color: 'from-pink-500 to-rose-500'
      },
      {
        id: 'password-mastery',
        title: 'Password Mastery Challenge',
        description: 'Become a password security expert',
        duration: '8 min',
        difficulty: 'Medium',
        icon: '🔐',
        color: 'from-amber-500 to-yellow-500'
      },
      {
        id: 'phishing-patrol',
        title: 'Phishing Patrol Mission',
        description: 'Learn to spot and avoid online scams',
        duration: '12 min',
        difficulty: 'Hard',
        icon: '🎣',
        color: 'from-red-500 to-orange-500'
      }
    ]
  },
  {
    id: 'high',
    name: 'Privacy Champions',
    description: 'Advanced digital citizenship (Ages 14+)',
    ageRange: '14+',
    icon: <GraduationCap className="text-purple-500" size={24} />,
    color: 'from-purple-500 to-pink-500',
    activities: [
      {
        id: 'digital-rights',
        title: 'Know Your Digital Rights',
        description: 'Understand privacy laws and your rights online',
        duration: '15 min',
        difficulty: 'Hard',
        icon: '⚖️',
        color: 'from-purple-600 to-indigo-600'
      },
      {
        id: 'data-detective',
        title: 'Data Detective Investigation',
        description: 'Discover how companies collect and use your data',
        duration: '12 min',
        difficulty: 'Hard',
        icon: '🔍',
        color: 'from-teal-500 to-cyan-500'
      },
      {
        id: 'privacy-policy-pro',
        title: 'Privacy Policy Pro',
        description: 'Learn to read and understand privacy policies',
        duration: '15 min',
        difficulty: 'Hard',
        icon: '📜',
        color: 'from-slate-500 to-gray-600'
      }
    ]
  }
];

const JourneyHub: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [completedActivities, setCompletedActivities] = useState<string[]>([]);
  const { recordJourneyActivity } = useJourneyCompletion();

  const handleStartActivity = (pathId: string, activityId: string, activityName: string) => {
    // For now, mark as completed immediately (in a full implementation, this would launch the activity)
    if (!completedActivities.includes(activityId)) {
      setCompletedActivities([...completedActivities, activityId]);
      recordJourneyActivity(activityId, activityName, 75, 100, { pathId });
    }
  };

  const selectedJourney = journeyPaths.find(p => p.id === selectedPath);

  if (selectedJourney) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedPath(null)}
            className="mb-6 flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Journey Paths</span>
          </button>

          {/* Journey Header */}
          <div className={`bg-gradient-to-r ${selectedJourney.color} rounded-2xl p-8 text-white mb-8`}>
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-white/20 rounded-xl p-3">
                {selectedJourney.icon}
              </div>
              <div>
                <h1 className="text-3xl font-bold">{selectedJourney.name}</h1>
                <p className="text-white/80">{selectedJourney.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle size={16} />
                <span>{completedActivities.filter(id => selectedJourney.activities.some(a => a.id === id)).length}/{selectedJourney.activities.length} Complete</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target size={16} />
                <span>Ages {selectedJourney.ageRange}</span>
              </div>
            </div>
          </div>

          {/* Activities List */}
          <div className="space-y-4">
            {selectedJourney.activities.map((activity, index) => {
              const isCompleted = completedActivities.includes(activity.id);
              
              return (
                <div
                  key={activity.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-center">
                      <div className={`w-12 h-12 bg-gradient-to-r ${activity.color} rounded-xl flex items-center justify-center text-2xl`}>
                        {activity.icon}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">Step {index + 1}</div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">
                          {activity.title}
                        </h3>
                        {isCompleted && (
                          <div className="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                            <CheckCircle size={14} />
                            <span>Complete</span>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{activity.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center space-x-1">
                            <Clock size={14} />
                            <span>{activity.duration}</span>
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            activity.difficulty === 'Easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-300' :
                            activity.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-300' :
                            'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300'
                          }`}>
                            {activity.difficulty}
                          </span>
                        </div>
                        
                        <button
                          onClick={() => handleStartActivity(selectedJourney.id, activity.id, activity.title)}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                            isCompleted
                              ? 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                              : `bg-gradient-to-r ${activity.color} text-white hover:opacity-90`
                          }`}
                        >
                          <Play size={16} />
                          <span>{isCompleted ? 'Review' : 'Start'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/family-hub/learning')}
          className="mb-6 flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back to Learning Hub</span>
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Map className="text-green-600" size={36} />
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">Privacy Journeys</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Choose your learning path based on your age group. Each journey is designed to build 
            your privacy skills step by step! 🗺️
          </p>
        </div>

        {/* Journey Paths */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {journeyPaths.map((path) => {
            const completedCount = completedActivities.filter(id => 
              path.activities.some(a => a.id === id)
            ).length;
            
            return (
              <div
                key={path.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className={`bg-gradient-to-r ${path.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-white/20 rounded-xl p-3">
                      {path.icon}
                    </div>
                    <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                      Ages {path.ageRange}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{path.name}</h2>
                  <p className="text-white/80 text-sm">{path.description}</p>
                </div>
                
                <div className="p-6">
                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-gray-600 dark:text-gray-300">Progress</span>
                      <span className="font-medium text-gray-800 dark:text-gray-100">
                        {completedCount}/{path.activities.length}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div 
                        className={`bg-gradient-to-r ${path.color} h-2 rounded-full transition-all`}
                        style={{ width: `${(completedCount / path.activities.length) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  {/* Activities Preview */}
                  <div className="space-y-2 mb-6">
                    {path.activities.slice(0, 3).map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-3 text-sm">
                        <span>{activity.icon}</span>
                        <span className="text-gray-700 dark:text-gray-300 truncate">{activity.title}</span>
                        {completedActivities.includes(activity.id) && (
                          <CheckCircle className="text-green-500 flex-shrink-0" size={14} />
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setSelectedPath(path.id)}
                    className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium bg-gradient-to-r ${path.color} text-white hover:opacity-90 transition-colors`}
                  >
                    <Play size={18} />
                    <span>Start Journey</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">💡</div>
            <div>
              <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">How Privacy Journeys Work</h3>
              <p className="text-sm text-green-700 dark:text-green-300">
                Each journey contains a series of activities designed for specific age groups. Complete activities 
                to earn points, unlock achievements, and build your privacy knowledge step by step!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyHub;

