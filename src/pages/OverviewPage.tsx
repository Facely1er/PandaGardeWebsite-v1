import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Shield, Wrench, Check, BookOpen, Heart, Brain } from 'lucide-react';

const OverviewPage: React.FC = () => {
  useEffect(() => {
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all animation elements
    const animationElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animationElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const ageGroups = [
    {
      id: '5-8',
      title: 'Ages 5-8',
      icon: '👶',
      gradient: 'from-purple-500 to-pink-500',
      features: [
        'Basic privacy concepts through stories',
        'Interactive coloring activities',
        'Simple online safety rules',
        'Privacy Panda character adventures',
        'Family-friendly learning games'
      ]
    },
    {
      id: '9-12',
      title: 'Ages 9-12',
      icon: '🧒',
      gradient: 'from-blue-500 to-cyan-500',
      features: [
        'Social media privacy basics',
        'Digital footprint awareness',
        'Password security fundamentals',
        'Online communication safety',
        'Critical thinking about online content'
      ]
    },
    {
      id: '13-17',
      title: 'Ages 13-17',
      icon: '👦',
      gradient: 'from-green-500 to-emerald-500',
      features: [
        'Advanced privacy settings management',
        'Data protection and rights',
        'Online reputation management',
        'Privacy tools and technologies',
        'Digital citizenship and ethics'
      ]
    },
    {
      id: 'parents',
      title: 'Parents',
      icon: '👨‍👩‍👧‍👦',
      gradient: 'from-orange-500 to-red-500',
      features: [
        'Family privacy policy creation',
        'Device and app management',
        'Monitoring and guidance strategies',
        'Privacy education resources',
        'Community support and networking'
      ]
    }
  ];

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
    <main id="main-content">
      {/* Back Navigation */}
      <div className="container py-6">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <section className="hero-simple">
        <div className="container">
          <div className="text-center fade-in">
            <span className="badge">COMPLETE ECOSYSTEM</span>
            <h1>Everything Your Family Needs for Digital Privacy</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides age-appropriate education, interactive tools, and community support to help families navigate the digital world safely and confidently.
            </p>
          </div>
        </div>
      </section>

      {/* Age-Appropriate Curriculum */}
      <section className="curriculum-section" id="curriculum">
        <div className="container">
          <div className="section-header fade-in">
            <span className="badge">AGE-APPROPRIATE CURRICULUM</span>
            <h2>Learning Paths for Every Family Member</h2>
            <p>Comprehensive learning paths designed for every family member, from young children to parents.</p>
          </div>

          <div className="curriculum-grid">
            {ageGroups.map((group, index) => (
              <div key={group.id} className="curriculum-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`card-header bg-gradient-to-r ${group.gradient}`}>
                  <div className="card-icon text-4xl">
                    {group.icon}
                  </div>
                  <h3>{group.title}</h3>
                </div>
                <div className="card-content">
                  <ul className="feature-list">
                    {group.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="feature-item">
                        <Check size={16} className="check-icon" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Complete Ecosystem */}
      <section className="products-section" id="products">
        <div className="container">
          <div className="section-header fade-in">
            <span className="badge">OUR COMPLETE ECOSYSTEM</span>
            <h2>Three Powerful Tools Working Together</h2>
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
                    <ArrowLeft size={16} className="rotate-180" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Highlight */}
      <section className="features-highlight">
        <div className="container">
          <div className="section-header fade-in">
            <span className="badge">WHY CHOOSE PANDAGARDE</span>
            <h2>Built for Families, by Privacy Experts</h2>
            <p>Our platform combines cutting-edge educational design with proven privacy protection methods.</p>
          </div>

          <div className="features-grid">
            <div className="feature-card fade-in">
              <div className="feature-icon">
                <Heart size={32} className="text-red-500" />
              </div>
              <h3>Family-First Design</h3>
              <p>Every feature is designed with families in mind, ensuring age-appropriate content and easy parent oversight.</p>
            </div>

            <div className="feature-card fade-in">
              <div className="feature-icon">
                <Brain size={32} className="text-purple-500" />
              </div>
              <h3>Evidence-Based Learning</h3>
              <p>Our curriculum is built on proven educational principles and privacy research, ensuring effective learning outcomes.</p>
            </div>

            <div className="feature-card fade-in">
              <div className="feature-icon">
                <BookOpen size={32} className="text-blue-500" />
              </div>
              <h3>Interactive & Engaging</h3>
              <p>Learning through stories, games, and activities that make privacy education fun and memorable for children.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="fade-in text-center">
            <h2>Ready to Get Started?</h2>
            <p>Choose the path that's right for your family and begin your digital privacy education journey today.</p>
            <div className="cta-buttons">
              <a href="https://www.hub.pandagarde.com" target="_blank" rel="noopener noreferrer" className="button primary">
                <Users size={20} />
                Join Family Hub
              </a>
              <Link to="/privacy-panda" className="button secondary">
                <Shield size={20} />
                Try PrivacyPanda
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default OverviewPage;