import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, Eye, EyeOff } from 'lucide-react';

interface SocialMediaPost {
  id: string;
  content: string;
  hasPersonalInfo: boolean;
  isAppropriate: boolean;
  privacyLevel: 'public' | 'friends' | 'private';
}

const SocialMediaScanner: React.FC = () => {
  const [posts, setPosts] = useState<SocialMediaPost[]>([
    {
      id: '1',
      content: "Just got my new phone! My number is 555-1234 and I live at 123 Main St.",
      hasPersonalInfo: true,
      isAppropriate: false,
      privacyLevel: 'public'
    },
    {
      id: '2',
      content: "Had a great day at school today! Made some new friends.",
      hasPersonalInfo: false,
      isAppropriate: true,
      privacyLevel: 'friends'
    },
    {
      id: '3',
      content: "Going to the park with my family. We'll be there from 3-5 PM.",
      hasPersonalInfo: true,
      isAppropriate: true,
      privacyLevel: 'private'
    }
  ]);

  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const analyzePost = (postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    let points = 0;
    
    // Check for personal information
    if (post.hasPersonalInfo && post.privacyLevel === 'public') {
      points -= 10; // Bad: sharing personal info publicly
    } else if (post.hasPersonalInfo && post.privacyLevel === 'private') {
      points += 5; // Good: keeping personal info private
    } else if (!post.hasPersonalInfo) {
      points += 3; // Good: no personal info
    }

    // Check appropriateness
    if (post.isAppropriate) {
      points += 2;
    } else {
      points -= 5;
    }

    setScore(prev => prev + points);
    setSelectedPost(postId);
  };

  const resetGame = () => {
    setScore(0);
    setSelectedPost(null);
    setShowResults(false);
  };

  const getPrivacyIcon = (level: string) => {
    switch (level) {
      case 'public': return <Eye className="w-4 h-4 text-red-500" />;
      case 'friends': return <Eye className="w-4 h-4 text-yellow-500" />;
      case 'private': return <EyeOff className="w-4 h-4 text-green-500" />;
      default: return null;
    }
  };

  const getPrivacyLabel = (level: string) => {
    switch (level) {
      case 'public': return 'Public';
      case 'friends': return 'Friends Only';
      case 'private': return 'Private';
      default: return level;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          <Shield className="inline-block w-8 h-8 mr-2" />
          Social Media Scanner
        </h1>
        <p className="text-lg text-gray-600">
          Learn to identify privacy risks in social media posts and choose the right privacy settings!
        </p>
        <div className="mt-4">
          <span className="text-2xl font-bold text-green-600">Score: {score}</span>
        </div>
      </div>

      <div className="grid gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className={`border-2 rounded-lg p-6 transition-all ${
              selectedPost === post.id
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                {getPrivacyIcon(post.privacyLevel)}
                <span className="font-semibold text-sm">
                  {getPrivacyLabel(post.privacyLevel)}
                </span>
              </div>
              <button
                onClick={() => analyzePost(post.id)}
                disabled={selectedPost === post.id}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  selectedPost === post.id
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {selectedPost === post.id ? 'Analyzed' : 'Analyze Post'}
              </button>
            </div>

            <div className="bg-white p-4 rounded-lg border mb-4">
              <p className="text-gray-800">{post.content}</p>
            </div>

            {selectedPost === post.id && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  {post.hasPersonalInfo ? (
                    <>
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                      <span className="text-red-600 font-semibold">
                        Contains personal information
                      </span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-green-600 font-semibold">
                        No personal information
                      </span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {post.isAppropriate ? (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-green-600 font-semibold">
                        Appropriate content
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                      <span className="text-red-600 font-semibold">
                        Inappropriate content
                      </span>
                    </>
                  )}
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Privacy Tips:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Never share personal information like phone numbers or addresses</li>
                    <li>• Use private settings for personal posts</li>
                    <li>• Think before you post - once it's online, it's hard to take back</li>
                    <li>• Only share with people you trust</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <button
          onClick={resetGame}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default SocialMediaScanner;