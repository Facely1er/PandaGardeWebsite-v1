import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, UserPlus } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="fade-in">
          <h2>Start Your Family's Privacy Journey Today</h2>
          <p>Join families building essential privacy skills for a digital future. PandaGarde makes learning about online safety fun, engaging, and effective.</p>
          <div className="cta-buttons">
            <a href="https://www.hub.pandagarde.com" className="btn-primary" target="_blank" rel="noopener noreferrer">
              <Rocket size={20} />
              Access Family Hub
            </a>
            <Link to="/get-started" className="btn-secondary">
              <UserPlus size={20} />
              Create Free Account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;