import React from 'react';
import { Smartphone, Shield, Users, Gamepad2, TrendingUp, Wrench } from 'lucide-react';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Smartphone,
      title: 'Mobile-First Design',
      description: 'Optimized for all devices with responsive design that works seamlessly on phones, tablets, and desktops.'
    },
    {
      icon: Shield,
      title: 'Privacy-First',
      description: 'Built with privacy by design principles, ensuring your family\'s data is protected while learning about digital safety.'
    },
    {
      icon: Users,
      title: 'Whole Family',
      description: 'Engaging content for every family member, from young children to parents, creating shared learning experiences.'
    },
    {
      icon: Gamepad2,
      title: 'Interactive Learning',
      description: 'Gamified activities, interactive stories, and hands-on exercises that make privacy education fun and memorable.'
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Monitor your family\'s learning journey with detailed progress reports and achievement tracking.'
    },
    {
      icon: Wrench,
      title: 'Practical Tools',
      description: 'Real-world tools and resources that families can immediately apply to improve their digital privacy practices.'
    }
  ];

  return (
    <section className="features-section" id="features">
      <div className="container">
        <div className="section-header fade-in">
          <span className="badge">WHY CHOOSE PANDAGARDE?</span>
          <h2>Why Choose PandaGarde?</h2>
          <p>Comprehensive digital privacy education designed specifically for modern families navigating the digital world.</p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="feature-icon">
                <feature.icon size={32} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;