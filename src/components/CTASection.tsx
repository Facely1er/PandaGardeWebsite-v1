import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, UserPlus } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="fade-in">
          <h2>Ready to Protect Your Family?</h2>
          <p>Join thousands of families who are already building essential digital privacy skills. Start your family's privacy education journey today with our comprehensive, age-appropriate curriculum and tools.</p>
          <div className="cta-buttons">
            <a href="https://www.hub.pandagarde.com" className="button primary" target="_blank" rel="noopener noreferrer">
              <Rocket size={20} />
              Launch Family Hub
            </a>
            <Link to="/privacy-panda" className="button secondary">
              <UserPlus size={20} />
              Try PrivacyPanda
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;