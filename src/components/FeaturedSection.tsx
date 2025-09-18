import React from 'react';
 
import { Link, useNavigate } from 'react-router-dom';
 
import { BookOpen, Book, ClipboardCheck as ChalkboardTeacher, ArrowRight, Users, Heart, Shield } from 'lucide-react';

const features = [
  {
    icon: Book,
    title: 'Privacy Panda\'s Story',
    description: 'Follow Po the Panda\'s heartwarming journey through the Digital Bamboo Forest. Watch as the shyest animal in the forest learns about privacy shields and becomes the expert Privacy Panda.',
    link: '/story',
    linkText: 'Start the Adventure',
    highlight: true
  },
  {
    icon: Users,
    title: 'Family Hub Community',
    description: 'Join our supportive community of families learning about digital privacy together. Share experiences, track progress, and access exclusive resources.',
    link: '/family-hub',
    linkText: 'Join Family Hub',
    highlight: true
  },
  {
    icon: BookOpen,
    title: 'Interactive Activities',
    description: 'Extend the story with fun, educational activities that reinforce privacy concepts. Coloring, puzzles, and games that make learning memorable.',
    link: '/activity-book',
    linkText: 'Play & Learn'
  }
];

const FeaturedSection: React.FC = () => {
  const navigate = useNavigate();

  const handleCardClick = (link: string) => {
    if (link.startsWith('#')) {
      // Handle anchor links
      const element = document.querySelector(link);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Handle route navigation
      navigate(link);
    }
  };

  return (
    <section className="featured-section" id="featured">
      <div className="container">
        <div className="section-header fade-in">
          <span className="badge">PRIVACY PANDA'S WORLD</span>
          <h2>🌲 Explore the Digital Bamboo Forest</h2>
          <p>Discover Po the Panda's world through interactive storytelling, family community, and engaging activities that make privacy education fun and memorable.</p>
        </div>

        <div className="featured-grid">
          {features.map((feature, index) => (
 
 
            <div
              key={index}
              className={`feature-card fade-in ${feature.highlight ? 'feature-highlight' : ''}`}
              onClick={() => handleCardClick(feature.link)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(feature.link);
                }
              }}
            >
              {feature.highlight && (
                <div className="highlight-badge">
                  <Heart size={16} />
                  <span>Featured</span>
                </div>
              )}
              <div className="card-image">
                <feature.icon size={80} />
              </div>
              <div className="card-content">
                <h3><feature.icon size={20} /> {feature.title}</h3>
                <p>{feature.description}</p>
                <div className="card-link">
                  {feature.linkText} <ArrowRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;