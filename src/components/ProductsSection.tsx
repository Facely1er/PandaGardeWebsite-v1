import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Shield, Wrench, ArrowRight, Check } from 'lucide-react';

const ProductsSection: React.FC = () => {
  const products = [
    {
      id: 'family-hub',
      title: 'Family Hub',
      icon: Users,
      gradient: 'from-purple-500 to-pink-500',
      description: 'Connect with other families and access exclusive resources for digital safety education.',
      features: [
        'Community support and networking',
        'Exclusive educational resources',
        'Parent guidance and tips',
        'Progress tracking and achievements',
        'Family challenges and activities'
      ],
      ctaText: 'Join Family Hub',
      ctaLink: '/family-hub'
    },
    {
      id: 'privacy-panda',
      title: 'PrivacyPanda',
      icon: Shield,
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Interactive learning platform with gamified activities and stories for children ages 5-17.',
      features: [
        'Interactive stories and games',
        'Age-appropriate learning paths',
        'Progress tracking and rewards',
        'Offline activities and printables',
        'Parent dashboard and insights'
      ],
      ctaText: 'Try PrivacyPanda',
      ctaLink: '/privacy-panda'
    },
    {
      id: 'parent-toolkit',
      title: 'Parent Toolkit',
      icon: Wrench,
      gradient: 'from-green-500 to-emerald-500',
      description: 'Comprehensive tools and resources to help parents guide their children\'s digital journey.',
      features: [
        'Privacy policy templates',
        'Device management guides',
        'Conversation starters',
        'Safety checklists and tools',
        'Expert advice and support'
      ],
      ctaText: 'Access Toolkit',
      ctaLink: '/parent-toolkit'
    }
  ];

  return (
    <section className="products-section" id="products">
      <div className="container">
        <div className="section-header fade-in">
          <span className="badge">OUR COMPLETE ECOSYSTEM</span>
          <h2>Our Complete Ecosystem</h2>
          <p>Everything your family needs for comprehensive digital privacy education and protection.</p>
        </div>

        <div className="products-grid">
          {products.map((product, index) => (
            <div key={product.id} className="product-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className={`card-header bg-gradient-to-r ${product.gradient}`}>
                <div className="card-icon">
                  <product.icon size={32} />
                </div>
                <h3>{product.title}</h3>
              </div>
              <div className="card-content">
                <p className="product-description">{product.description}</p>
                <ul className="feature-list">
                  {product.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="feature-item">
                      <Check size={16} className="check-icon" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to={product.ctaLink} className="product-cta">
                  {product.ctaText}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;