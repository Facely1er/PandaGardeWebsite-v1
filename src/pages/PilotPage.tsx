import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, Users, Award, Clock, CheckCircle, MessageSquare, 
  Shield, BookOpen, Star, ArrowRight, Calendar, Target, 
  Heart, Zap, TrendingUp, Gift
} from 'lucide-react';
import Logo from '../components/Logo';
import { trackEvent, AnalyticsEvents } from '../lib/analytics';
import { usePageTracking } from '../hooks/useAnalytics';

const PilotPage: React.FC = () => {
  // Track page view
  usePageTracking('Pilot Program');
  
  useEffect(() => {
    window.scrollTo(0, 0);
    // Track pilot page view
    trackEvent(AnalyticsEvents.PILOT_PAGE_VIEWED, {
      timestamp: new Date().toISOString(),
      source: 'direct_navigation'
    });
  }, []);
  
  const handleJoinPilot = () => {
    trackEvent(AnalyticsEvents.PILOT_JOIN_CLICKED, {
      source: 'pilot_page',
      button_location: 'hero_section',
      timestamp: new Date().toISOString()
    });
  };
  
  const handleLearnMore = () => {
    trackEvent(AnalyticsEvents.PILOT_LEARN_MORE_CLICKED, {
      source: 'pilot_page',
      button_location: 'hero_section',
      timestamp: new Date().toISOString()
    });
  };
  
  const handleCTAClick = (location: string) => {
    trackEvent(AnalyticsEvents.PILOT_CTA_CLICKED, {
      source: 'pilot_page',
      button_location: location,
      timestamp: new Date().toISOString()
    });
  };

  const benefits = [
    {
      icon: Sparkles,
      title: 'Early Access',
      description: 'Be among the first to experience the complete Family Hub with all new features'
    },
    {
      icon: Heart,
      title: 'Shape the Future',
      description: 'Your feedback directly influences the development of features families need most'
    },
    {
      icon: Gift,
      title: 'Exclusive Resources',
      description: 'Access to premium content, priority support, and special recognition'
    },
    {
      icon: Users,
      title: 'Join a Community',
      description: 'Connect with other privacy-conscious families and share experiences'
    }
  ];

  const whatToExpect = [
    {
      week: 'Week 1',
      title: 'Onboarding',
      items: [
        'Account setup and COPPA compliance',
        'Family member addition',
        'Initial goal setting',
        'Platform orientation'
      ]
    },
    {
      week: 'Weeks 2-4',
      title: 'Active Use',
      items: [
        'Use platform 2-3 times per week',
        'Complete at least 1 journey path per child',
        'Try 3-5 different games',
        'Use family dashboard features'
      ]
    },
    {
      week: 'Week 5',
      title: 'Feedback Collection',
      items: [
        'Parent interviews (30 min)',
        'Child feedback sessions',
        'Survey completion',
        'Feature request collection'
      ]
    },
    {
      week: 'Week 6',
      title: 'Analysis & Planning',
      items: [
        'Data analysis',
        'Feature prioritization',
        'Development roadmap creation'
      ]
    }
  ];

  const requirements = [
    {
      icon: Users,
      text: 'At least 1 parent + 1-3 children'
    },
    {
      icon: Calendar,
      text: 'Mix of age groups (elementary, middle, high school)'
    },
    {
      icon: MessageSquare,
      text: 'Willing to provide weekly feedback'
    },
    {
      icon: Shield,
      text: 'Comfortable with technology'
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--white)', color: 'var(--gray-800)' }}>
      {/* Page Header */}
      <section style={{ padding: '2rem 0', background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)' }}>
        <div className="container mx-auto px-6">
          <div className="text-center fade-in" style={{ textAlign: 'center' }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: '800',
              lineHeight: '1.1',
              marginBottom: '1rem',
              color: '#0f172a'
            }}>
              Join the Family Hub Pilot Program
            </h1>
            <p style={{
              fontSize: '1.125rem',
              color: '#64748b',
              maxWidth: '48rem',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Help shape the future of family privacy education. Be part of an exclusive group of families testing the PrivacyPanda Family Hub and make your voice heard.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <div className="bg-gray-50" style={{ backgroundColor: 'var(--light)' }}>
        <div className="container mx-auto px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        {/* What is the Pilot */}
        <section id="learn-more" className="mb-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">What is the Family Hub Pilot?</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                The Family Hub Pilot is a 6-week program where selected families help us test and improve 
                the PrivacyPanda Family Hub platform through real-world usage and feedback.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8 mb-12">
              <h3 className="text-2xl font-bold mb-4 flex items-center">
                <Target className="w-6 h-6 mr-2 text-purple-600" />
                Our Goal
              </h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                We've built a comprehensive family privacy education platform with 12 interactive games, 
                age-appropriate learning journeys, and a family dashboard. Now we need <strong>real families</strong> 
                to test it and tell us what works, what doesn't, and what's missing.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                  What We're Testing
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Progress tracking and family dashboard</li>
                  <li>• Game and journey completion syncing</li>
                  <li>• Parent-child interaction features</li>
                  <li>• User experience and navigation</li>
                  <li>• COPPA compliance workflows</li>
                  <li>• Mobile and desktop usability</li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold mb-3 flex items-center">
                  <Star className="w-5 h-5 mr-2 text-yellow-600" />
                  What You'll Do
                </h3>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>• Use the platform with your family</li>
                  <li>• Complete games and learning journeys</li>
                  <li>• Provide weekly feedback</li>
                  <li>• Participate in optional interviews</li>
                  <li>• Share your honest opinions</li>
                  <li>• Help us build something amazing</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Join the Pilot?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Be part of something special and help create the best family privacy education platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">6-Week Pilot Timeline</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Here's what to expect during the pilot program
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {whatToExpect.map((phase, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <Calendar className="w-5 h-5 mr-2 text-gray-500" />
                      <span className="font-semibold text-purple-600 dark:text-purple-400">{phase.week}</span>
                      <span className="ml-3 text-xl font-bold">{phase.title}</span>
                    </div>
                    <ul className="space-y-2 mt-3">
                      {phase.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start text-gray-700 dark:text-gray-300">
                          <CheckCircle className="w-5 h-5 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Requirements */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Who Can Join?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              We're looking for families who want to help shape the future of privacy education
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Ideal Participants</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {requirements.map((req, index) => {
                  const Icon = req.icon;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 font-medium">{req.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Success Metrics */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What Success Looks Like</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Our goals for the pilot program
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-4 text-green-600" />
              <h3 className="text-xl font-bold mb-2">80%+ Engagement</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Families complete at least 1 journey and try multiple games
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <h3 className="text-xl font-bold mb-2">Weekly Feedback</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Regular input from parents and children to guide development
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 text-center">
              <Award className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <h3 className="text-xl font-bold mb-2">70%+ Satisfaction</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Positive feedback and willingness to continue using the platform
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-white text-center">
          <Sparkles className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">Ready to Join?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Help us build the best family privacy education platform. Your feedback will shape 
            features that thousands of families will use.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/family-hub"
              onClick={() => handleCTAClick('cta_section')}
              className="bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center space-x-2 shadow-lg"
            >
              <span>Start Your Pilot Journey</span>
              <ArrowRight size={20} />
            </Link>
            <Link
              to="/contact"
              onClick={() => handleCTAClick('contact_button')}
              className="bg-white/10 backdrop-blur-sm text-white border-2 border-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-colors"
            >
              Have Questions?
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PilotPage;

