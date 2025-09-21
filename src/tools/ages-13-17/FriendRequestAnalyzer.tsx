import React, { useState } from 'react';
import { Users, Shield, AlertTriangle, CheckCircle, UserPlus, UserX, Eye, EyeOff } from 'lucide-react';

interface FriendRequest {
  id: string;
  name: string;
  profilePicture: string;
  mutualFriends: number;
  accountAge: string;
  profileCompleteness: number;
  suspiciousActivity: boolean;
  location: string;
  bio: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
}

const FriendRequestAnalyzer: React.FC = () => {
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      profilePicture: '👩',
      mutualFriends: 12,
      accountAge: '2 years',
      profileCompleteness: 85,
      suspiciousActivity: false,
      location: 'New York, NY',
      bio: 'College student, love photography and travel',
      postsCount: 156,
      followersCount: 234,
      followingCount: 189
    },
    {
      id: '2',
      name: 'Mike Wilson',
      profilePicture: '👨',
      mutualFriends: 0,
      accountAge: '2 weeks',
      profileCompleteness: 20,
      suspiciousActivity: true,
      location: 'Unknown',
      bio: '',
      postsCount: 3,
      followersCount: 2,
      followingCount: 1247
    },
    {
      id: '3',
      name: 'Emma Davis',
      profilePicture: '👩',
      mutualFriends: 5,
      accountAge: '6 months',
      profileCompleteness: 60,
      suspiciousActivity: false,
      location: 'Chicago, IL',
      bio: 'High school student, interested in science',
      postsCount: 45,
      followersCount: 78,
      followingCount: 92
    },
    {
      id: '4',
      name: 'Alex Smith',
      profilePicture: '👤',
      mutualFriends: 0,
      accountAge: '1 day',
      profileCompleteness: 5,
      suspiciousActivity: true,
      location: 'Unknown',
      bio: '',
      postsCount: 0,
      followersCount: 0,
      followingCount: 0
    }
  ]);

  const [analyzedRequests, setAnalyzedRequests] = useState<Set<string>>(new Set());
  const [decisions, setDecisions] = useState<Map<string, 'accept' | 'decline'>>(new Map());
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const analyzeRequest = (requestId: string) => {
    const request = friendRequests.find(r => r.id === requestId);
    if (!request) {return;}

    let points = 0;

    // Mutual friends scoring
    if (request.mutualFriends > 5) {
      points += 15; // High mutual friends
    } else if (request.mutualFriends > 0) {
      points += 8; // Some mutual friends
    } else {
      points -= 10; // No mutual friends
    }

    // Account age scoring
    if (request.accountAge.includes('year')) {
      points += 10; // Established account
    } else if (request.accountAge.includes('month')) {
      points += 5; // Recent but not too new
    } else {
      points -= 15; // Very new account
    }

    // Profile completeness scoring
    if (request.profileCompleteness > 70) {
      points += 10; // Complete profile
    } else if (request.profileCompleteness > 40) {
      points += 3; // Partial profile
    } else {
      points -= 8; // Incomplete profile
    }

    // Suspicious activity scoring
    if (request.suspiciousActivity) {
      points -= 20; // Red flag
    }

    // Follower/following ratio scoring
    const ratio = request.followingCount / Math.max(request.followersCount, 1);
    if (ratio > 10) {
      points -= 15; // Following way more than followers
    } else if (ratio > 5) {
      points -= 8; // Following significantly more
    } else if (ratio < 0.5) {
      points += 5; // Good follower/following ratio
    }

    setScore(prev => prev + points);
    setAnalyzedRequests(prev => new Set([...prev, requestId]));
  };

  const makeDecision = (requestId: string, decision: 'accept' | 'decline') => {
    setDecisions(prev => new Map([...prev, [requestId, decision]]));
    
    const request = friendRequests.find(r => r.id === requestId);
    if (!request) {return;}

    let points = 0;
    if (decision === 'accept') {
      // Accepting good requests gives points
      if (request.mutualFriends > 0 && !request.suspiciousActivity) {
        points += 10;
      } else {
        points -= 15; // Accepting bad requests loses points
      }
    } else {
      // Declining bad requests gives points
      if (request.suspiciousActivity || request.mutualFriends === 0) {
        points += 10;
      } else {
        points -= 5; // Declining good requests loses points
      }
    }

    setScore(prev => prev + points);
  };

  const resetAnalysis = () => {
    setScore(0);
    setAnalyzedRequests(new Set());
    setDecisions(new Map());
    setShowResults(false);
  };

  const getRiskLevel = (request: FriendRequest): 'low' | 'medium' | 'high' => {
    let riskScore = 0;
    
    if (request.mutualFriends === 0) {riskScore += 3;}
    if (request.accountAge.includes('day') || request.accountAge.includes('week')) {riskScore += 2;}
    if (request.profileCompleteness < 30) {riskScore += 2;}
    if (request.suspiciousActivity) {riskScore += 3;}
    if (request.followingCount / Math.max(request.followersCount, 1) > 5) {riskScore += 2;}

    if (riskScore >= 6) {return 'high';}
    if (riskScore >= 3) {return 'medium';}
    return 'low';
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getScoreColor = () => {
    if (score >= 30) {return 'text-green-600';}
    if (score >= 0) {return 'text-yellow-600';}
    return 'text-red-600';
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          <Shield className="inline-block w-8 h-8 mr-2" />
          Friend Request Analyzer
        </h1>
        <p className="text-lg text-gray-600">
          Learn to evaluate friend requests and protect yourself from fake accounts and scams!
        </p>
        <div className="mt-4">
          <span className={`text-2xl font-bold ${getScoreColor()}`}>
            Safety Score: {score}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {friendRequests.map((request) => {
          const isAnalyzed = analyzedRequests.has(request.id);
          const decision = decisions.get(request.id);
          const riskLevel = getRiskLevel(request);

          return (
            <div
              key={request.id}
              className={`border-2 rounded-lg p-6 transition-all ${
                isAnalyzed
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{request.profilePicture}</div>
                  <div>
                    <h3 className="text-xl font-semibold">{request.name}</h3>
                    <p className="text-gray-600">{request.location}</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(riskLevel)}`}>
                      {riskLevel.toUpperCase()} RISK
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => analyzeRequest(request.id)}
                  disabled={isAnalyzed}
                  className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                    isAnalyzed
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {isAnalyzed ? 'Analyzed' : 'Analyze Request'}
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Profile Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Mutual Friends:</span>
                      <span className="font-medium">{request.mutualFriends}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Account Age:</span>
                      <span className="font-medium">{request.accountAge}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Profile Complete:</span>
                      <span className="font-medium">{request.profileCompleteness}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Posts:</span>
                      <span className="font-medium">{request.postsCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Followers:</span>
                      <span className="font-medium">{request.followersCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Following:</span>
                      <span className="font-medium">{request.followingCount}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Bio</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                    {request.bio || 'No bio provided'}
                  </p>
                </div>
              </div>

              {isAnalyzed && (
                <div className="mt-6 space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <h5 className="font-semibold text-blue-800 mb-2">Mutual Friends</h5>
                      <div className="flex items-center gap-2">
                        {request.mutualFriends > 0 ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-green-600">
                              {request.mutualFriends} mutual friends
                            </span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                            <span className="text-sm text-red-600">
                              No mutual friends
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="bg-purple-50 p-3 rounded-lg">
                      <h5 className="font-semibold text-purple-800 mb-2">Account Age</h5>
                      <div className="flex items-center gap-2">
                        {request.accountAge.includes('year') ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-green-600">
                              Established account
                            </span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                            <span className="text-sm text-red-600">
                              New account
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="bg-orange-50 p-3 rounded-lg">
                      <h5 className="font-semibold text-orange-800 mb-2">Profile Quality</h5>
                      <div className="flex items-center gap-2">
                        {request.profileCompleteness > 50 ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-sm text-green-600">
                              Complete profile
                            </span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="w-4 h-4 text-red-500" />
                            <span className="text-sm text-red-600">
                              Incomplete profile
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {request.suspiciousActivity && (
                    <div className="bg-red-50 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-red-500" />
                        <h5 className="font-semibold text-red-800">Suspicious Activity Detected</h5>
                      </div>
                      <p className="text-sm text-red-700">
                        This account shows signs of suspicious behavior. Be very careful before accepting this request.
                      </p>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button
                      onClick={() => makeDecision(request.id, 'accept')}
                      disabled={decision === 'accept'}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                        decision === 'accept'
                          ? 'bg-green-300 text-green-700 cursor-not-allowed'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      <UserPlus className="w-4 h-4" />
                      Accept Request
                    </button>
                    <button
                      onClick={() => makeDecision(request.id, 'decline')}
                      disabled={decision === 'decline'}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                        decision === 'decline'
                          ? 'bg-red-300 text-red-700 cursor-not-allowed'
                          : 'bg-red-600 text-white hover:bg-red-700'
                      }`}
                    >
                      <UserX className="w-4 h-4" />
                      Decline Request
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Safety Tips */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Friend Request Safety Tips</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
          <ul className="space-y-2">
            <li>• <strong>Check mutual friends:</strong> More mutual friends = safer</li>
            <li>• <strong>Verify account age:</strong> New accounts are riskier</li>
            <li>• <strong>Review profile completeness:</strong> Real people usually have complete profiles</li>
            <li>• <strong>Look for suspicious patterns:</strong> Following many but few followers</li>
          </ul>
          <ul className="space-y-2">
            <li>• <strong>Never share personal info:</strong> Even with accepted friends</li>
            <li>• <strong>Report suspicious accounts:</strong> Help protect others</li>
            <li>• <strong>Use privacy settings:</strong> Control who can send you requests</li>
            <li>• <strong>Trust your instincts:</strong> If something feels off, decline</li>
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

export default FriendRequestAnalyzer;