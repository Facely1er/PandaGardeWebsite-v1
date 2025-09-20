import React, { useState } from 'react';
import { Clock, MapPin, Camera, MessageSquare, Heart, Share2, AlertTriangle, CheckCircle } from 'lucide-react';

interface DigitalActivity {
  id: string;
  type: 'post' | 'comment' | 'like' | 'share' | 'photo' | 'location';
  content: string;
  timestamp: string;
  platform: string;
  privacyLevel: 'public' | 'friends' | 'private';
  impact: 'positive' | 'neutral' | 'negative';
}

const DigitalFootprintTimeline: React.FC = () => {
  const [activities, setActivities] = useState<DigitalActivity[]>([
    {
      id: '1',
      type: 'post',
      content: 'Just got my driver\'s license! So excited to be driving!',
      timestamp: '2024-01-15T10:30:00Z',
      platform: 'SocialConnect',
      privacyLevel: 'public',
      impact: 'negative'
    },
    {
      id: '2',
      type: 'photo',
      content: 'Beach vacation with family',
      timestamp: '2024-01-10T14:20:00Z',
      platform: 'PhotoShare',
      privacyLevel: 'friends',
      impact: 'neutral'
    },
    {
      id: '3',
      type: 'comment',
      content: 'Great article about online privacy!',
      timestamp: '2024-01-08T16:45:00Z',
      platform: 'NewsSite',
      privacyLevel: 'public',
      impact: 'positive'
    },
    {
      id: '4',
      type: 'location',
      content: 'Checked in at school',
      timestamp: '2024-01-05T08:15:00Z',
      platform: 'LocationApp',
      privacyLevel: 'public',
      impact: 'negative'
    },
    {
      id: '5',
      type: 'like',
      content: 'Liked a post about environmental protection',
      timestamp: '2024-01-03T12:00:00Z',
      platform: 'EcoSocial',
      privacyLevel: 'public',
      impact: 'positive'
    }
  ]);

  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const analyzeActivity = (activityId: string) => {
    const activity = activities.find(a => a.id === activityId);
    if (!activity) {return;}

    let points = 0;

    // Impact scoring
    switch (activity.impact) {
      case 'positive':
        points += 10;
        break;
      case 'neutral':
        points += 5;
        break;
      case 'negative':
        points -= 10;
        break;
    }

    // Privacy level scoring
    switch (activity.privacyLevel) {
      case 'private':
        points += 5;
        break;
      case 'friends':
        points += 2;
        break;
      case 'public':
        points -= 3;
        break;
    }

    // Content type scoring
    if (activity.type === 'location') {
      points -= 8; // Location sharing is risky
    } else if (activity.type === 'photo') {
      points -= 2; // Photos can contain metadata
    }

    setScore(prev => prev + points);
    setSelectedActivity(activityId);
  };

  const resetAnalysis = () => {
    setScore(0);
    setSelectedActivity(null);
    setShowAnalysis(false);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'post': return <MessageSquare className="w-4 h-4" />;
      case 'comment': return <MessageSquare className="w-4 h-4" />;
      case 'like': return <Heart className="w-4 h-4" />;
      case 'share': return <Share2 className="w-4 h-4" />;
      case 'photo': return <Camera className="w-4 h-4" />;
      case 'location': return <MapPin className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'text-green-600 bg-green-100';
      case 'neutral': return 'text-yellow-600 bg-yellow-100';
      case 'negative': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPrivacyColor = (privacy: string) => {
    switch (privacy) {
      case 'public': return 'text-red-600 bg-red-100';
      case 'friends': return 'text-yellow-600 bg-yellow-100';
      case 'private': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getScoreColor = () => {
    if (score >= 20) {return 'text-green-600';}
    if (score >= 0) {return 'text-yellow-600';}
    return 'text-red-600';
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          <Clock className="inline-block w-8 h-8 mr-2" />
          Digital Footprint Timeline
        </h1>
        <p className="text-lg text-gray-600">
          Analyze your digital activities and learn how they affect your online reputation!
        </p>
        <div className="mt-4">
          <span className={`text-2xl font-bold ${getScoreColor()}`}>
            Digital Reputation Score: {score}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className={`border-2 rounded-lg p-6 transition-all ${
              selectedActivity === activity.id
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  {getActivityIcon(activity.type)}
                  <span className="font-semibold capitalize">{activity.type}</span>
                </div>
                <span className="text-sm text-gray-500">{formatTimestamp(activity.timestamp)}</span>
              </div>
              <button
                onClick={() => analyzeActivity(activity.id)}
                disabled={selectedActivity === activity.id}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedActivity === activity.id
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {selectedActivity === activity.id ? 'Analyzed' : 'Analyze'}
              </button>
            </div>

            <div className="bg-white p-4 rounded-lg border mb-4">
              <p className="text-gray-800 mb-2">{activity.content}</p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Platform: {activity.platform}</span>
                <span>•</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPrivacyColor(activity.privacyLevel)}`}>
                  {activity.privacyLevel.toUpperCase()}
                </span>
                <span>•</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(activity.impact)}`}>
                  {activity.impact.toUpperCase()} IMPACT
                </span>
              </div>
            </div>

            {selectedActivity === activity.id && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Privacy Analysis</h4>
                    <div className="flex items-center gap-2">
                      {activity.privacyLevel === 'public' ? (
                        <>
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                          <span className="text-sm text-red-600">
                            Public visibility - anyone can see this
                          </span>
                        </>
                      ) : activity.privacyLevel === 'friends' ? (
                        <>
                          <AlertTriangle className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm text-yellow-600">
                            Friends only - limited visibility
                          </span>
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-green-600">
                            Private - only you can see this
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="bg-purple-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Content Impact</h4>
                    <div className="flex items-center gap-2">
                      {activity.impact === 'positive' ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-green-600">
                            Positive impact on reputation
                          </span>
                        </>
                      ) : activity.impact === 'negative' ? (
                        <>
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                          <span className="text-sm text-red-600">
                            Negative impact on reputation
                          </span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm text-yellow-600">
                            Neutral impact on reputation
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="bg-orange-50 p-3 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">Risk Assessment</h4>
                    <div className="text-sm text-orange-700">
                      {activity.type === 'location' && 'High risk - reveals your location'}
                      {activity.type === 'photo' && 'Medium risk - may contain metadata'}
                      {activity.type === 'post' && 'Depends on content and privacy settings'}
                      {activity.type === 'comment' && 'Low risk - usually temporary'}
                      {activity.type === 'like' && 'Low risk - minimal information'}
                      {activity.type === 'share' && 'Medium risk - amplifies content'}
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Recommendations</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    {activity.privacyLevel === 'public' && (
                      <li>• Consider changing privacy settings to friends only</li>
                    )}
                    {activity.type === 'location' && (
                      <li>• Avoid sharing your exact location publicly</li>
                    )}
                    {activity.impact === 'negative' && (
                      <li>• Think about how this content reflects on you</li>
                    )}
                    <li>• Remember: digital footprints are permanent</li>
                    <li>• Consider if you'd want a future employer to see this</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Digital Footprint Tips */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Building a Positive Digital Footprint</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
          <ul className="space-y-2">
            <li>• <strong>Think before you post:</strong> Consider the long-term impact</li>
            <li>• <strong>Use privacy settings:</strong> Control who can see your content</li>
            <li>• <strong>Be authentic:</strong> Share content that represents your true self</li>
            <li>• <strong>Engage positively:</strong> Comment and share meaningful content</li>
          </ul>
          <ul className="space-y-2">
            <li>• <strong>Protect personal information:</strong> Never share sensitive details</li>
            <li>• <strong>Regular audits:</strong> Review and clean up old content</li>
            <li>• <strong>Professional presence:</strong> Maintain a positive online reputation</li>
            <li>• <strong>Learn continuously:</strong> Stay updated on privacy best practices</li>
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

export default DigitalFootprintTimeline;