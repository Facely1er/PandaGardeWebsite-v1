import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Users, Heart, Star, ArrowRight, Play } from 'lucide-react';

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  link?: string;
  linkText?: string;
  highlight?: boolean;
}

const StoryTimeline: React.FC = () => {
  const timelineEvents: TimelineEvent[] = [
    {
      id: 'story-start',
      title: 'Meet Po the Panda',
      description: 'Discover the shyest animal in the Digital Bamboo Forest and learn about his love for digital bamboo tablets.',
      icon: Book,
      link: '/story',
      linkText: 'Start the Story',
      highlight: true
    },
    {
      id: 'privacy-lesson',
      title: 'The Privacy Shield',
      description: 'Watch Po learn about protecting personal information with wise old Turtle\'s guidance.',
      icon: Heart,
      link: '/story',
      linkText: 'Continue Reading'
    },
    {
      id: 'become-expert',
      title: 'Privacy Panda Emerges',
      description: 'See Po transform from a shy panda into the forest\'s expert Privacy Panda, helping other animals.',
      icon: Star,
      link: '/story',
      linkText: 'See the Transformation'
    },
    {
      id: 'family-community',
      title: 'Join the Family Hub',
      description: 'Connect with other families learning about digital privacy together in our supportive community.',
      icon: Users,
      link: '/family-hub',
      linkText: 'Join Community',
      highlight: true
    },
    {
      id: 'practice-skills',
      title: 'Practice with Activities',
      description: 'Reinforce privacy concepts through interactive games, coloring, and puzzles that extend the story.',
      icon: Play,
      link: '/activity-book',
      linkText: 'Start Activities'
    }
  ];

  return (
    <section className="story-timeline py-16" style={{ backgroundColor: 'var(--light)' }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="badge">PRIVACY PANDA'S JOURNEY</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
            🌟 Follow Po's Complete Adventure
          </h2>
          <p className="text-lg max-w-3xl mx-auto" style={{ color: 'var(--gray-600)' }}>
            From a shy panda to the forest's Privacy Panda expert, follow Po's complete journey through storytelling, community, and interactive learning.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-green-500 to-blue-500 rounded-full"></div>
            
            {timelineEvents.map((event, index) => {
              const IconComponent = event.icon;
              return (
                <div key={event.id} className="relative flex items-start mb-12 last:mb-0">
                  {/* Timeline dot */}
                  <div className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center ${
                    event.highlight 
                      ? 'bg-gradient-to-r from-green-500 to-green-600 shadow-lg' 
                      : 'bg-white border-4 border-green-500'
                  }`}>
                    <IconComponent 
                      size={24} 
                      className={event.highlight ? 'text-white' : 'text-green-600'} 
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="ml-8 flex-1">
                    <div className={`bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all ${
                      event.highlight ? 'border-2 border-green-500' : 'border border-gray-200'
                    }`}>
                      {event.highlight && (
                        <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-3">
                          <Star size={14} />
                          Featured
                        </div>
                      )}
                      
                      <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--primary)' }}>
                        {event.title}
                      </h3>
                      
                      <p className="mb-4" style={{ color: 'var(--gray-600)' }}>
                        {event.description}
                      </p>
                      
                      {event.link && (
                        <Link
                          to={event.link}
                          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                          {event.linkText}
                          <ArrowRight size={16} />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Family's Privacy Journey?</h3>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of families learning about digital privacy through Privacy Panda's engaging story and activities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/story"
                className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
              >
                <Book size={20} />
                Start Privacy Panda's Story
              </Link>
              <Link
                to="/family-hub"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
              >
                <Users size={20} />
                Join Family Hub
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryTimeline;