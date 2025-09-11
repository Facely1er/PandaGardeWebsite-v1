import React from 'react';
import { BookOpen, Book, ClipboardCheck as ChalkboardTeacher, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: BookOpen,
    title: 'Privacy Panda Activity Book',
    description: 'Interactive activities and printable worksheets that teach essential privacy concepts through play. Available in both interactive and printable formats.',
    link: '/activity-book',
    linkText: 'Explore Activity Book'
  },
  {
    icon: Book,
    title: 'The Digital Bamboo Forest',
    description: 'Join Privacy Panda on an adventure through the Digital Bamboo Forest and learn about online safety through engaging storytelling.',
    link: '/story',
    linkText: 'Read the Story'
  },
  {
    icon: ChalkboardTeacher,
    title: 'Parent & Educator Resources',
    description: 'Discussion guides, articles, and supplementary materials to support privacy education at home and school.',
    link: '#parent-resources',
    linkText: 'Browse Resources'
  }
];

const FeaturedSection: React.FC = () => {
  return (
    <section className="featured-section" id="featured">
      <div className="container">
        <div className="section-header fade-in">
          <span className="badge">PRIVACY EDUCATION RESOURCES</span>
          <h2><ChalkboardTeacher size={32} />Educational Resources</h2>
          <p>Comprehensive tools and materials to support digital privacy education for all ages.</p>
        </div>
        
        <div className="featured-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card fade-in">
              <div className="card-image">
                <feature.icon size={80} />
              </div>
              <div className="card-content">
                <h3><feature.icon size={20} /> {feature.title}</h3>
                <p>{feature.description}</p>
                <a href={feature.link} className="card-link">
                  {feature.linkText} <ArrowRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;