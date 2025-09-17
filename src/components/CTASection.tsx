import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Users, Heart } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="fade-in">
          <h2>🌲 Join Privacy Panda in the Digital Bamboo Forest</h2>
          <p>Follow Po the Panda's heartwarming journey from a shy animal to the forest's expert Privacy Panda. Learn about digital safety through storytelling, interactive activities, and family community.</p>
          <div className="cta-buttons">
            <Link to="/story" className="btn-primary">
              <Book size={20} />
              Start Privacy Panda's Story
            </Link>
            <Link to="/family-hub" className="btn-secondary">
              <Users size={20} />
              Join Family Hub
            </Link>
          </div>
          <div className="story-highlight">
            <Heart size={16} />
            <span>Free for families • No registration required to start the story</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;