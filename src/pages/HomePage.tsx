import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, ArrowRight, Play, Heart, Sparkles, Star, Shield, Baby, User, GraduationCap } from 'lucide-react';

const HomePage: React.FC = () => {
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

  const quickActions = [
    {
      title: 'Start Learning',
      description: 'Try Privacy Panda\'s interactive story and activities',
      icon: Play,
      link: '/privacy-panda',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Join Community',
      description: 'Connect with other families in our Family Hub',
      icon: Users,
      link: '/family-hub',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Get Resources',
      description: 'Download guides, activities, and printable materials',
      icon: BookOpen,
      link: '/resources',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    }
  ];

  const ageGroups = [
    {
      age: 'Ages 5-8',
      icon: Baby,
      description: 'Stories & Activities',
      link: '/activity-book',
      color: 'from-purple-500 to-pink-500'
    },
    {
      age: 'Ages 9-12',
      icon: User,
      description: 'Privacy Explorers',
      link: '/privacy-explorers',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      age: 'Ages 13-17',
      icon: GraduationCap,
      description: 'Teen Handbook',
      link: '/teen-handbook',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <main id="main-content">
      {/* Hero Section */}
      <section className="hero-simple">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text slide-in-left">
              <span className="badge">DIGITAL PRIVACY EDUCATION</span>
              <h1>Protecting Families in the <span className="highlight">Digital Age</span></h1>
              <p className="hero-description">
                Comprehensive digital privacy education platform designed for families with children ages 5-17. 
                Interactive curriculum, engaging activities, and practical tools to help families navigate the digital world safely.
              </p>

              <div className="hero-buttons">
                <Link to="/family-hub" className="button primary">
                  <BookOpen size={20} />
                  Launch Family Hub
                  <ArrowRight size={16} />
                </Link>
                <Link to="/privacy-panda" className="button secondary">
                  <Play size={20} />
                  Try PrivacyPanda
                  <Heart size={16} />
                </Link>
                <Link to="/quick-start" className="button tertiary">
                  Get Started Guide
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">3</span>
                  <span className="stat-label">Age Groups</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">50+</span>
                  <span className="stat-label">Activities</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Free</span>
                </div>
              </div>
            </div>

            <div className="hero-visual slide-in-right">
              <div className="family-hub-banner">
                <div className="banner-content">
                  <div className="banner-logo">
                    <img 
                      src="/LogoPandagarde.png" 
                      alt="PandaGarde Logo" 
                      style={{ 
                        width: '100%', 
                        height: 'auto', 
                        maxWidth: '200px',
                        objectFit: 'contain'
                      }} 
                    />
                  </div>
                  <h3>Join Our Family Hub</h3>
                  <p>Connect with other families, share experiences, and access exclusive resources for digital safety education.</p>
                  
                  <div className="banner-features">
                    <div className="feature-item">
                      <Heart size={16} />
                      <span>Community Support</span>
                    </div>
                    <div className="feature-item">
                      <Sparkles size={16} />
                      <span>Exclusive Resources</span>
                    </div>
                    <div className="feature-item">
                      <Users size={16} />
                      <span>Parent Guidance</span>
                    </div>
                  </div>

                  <Link 
                    to="/family-hub"
                    className="btn-hub"
                  >
                    <ArrowRight size={16} />
                    Visit Family Hub
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions">
        <div className="container">
          <div className="section-header fade-in">
            <h2>Get Started in Minutes</h2>
            <p>Choose your path and begin learning about digital privacy today.</p>
          </div>

          <div className="quick-actions-grid">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.link} className="quick-action-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`action-icon ${action.bgColor}`}>
                  <action.icon size={32} className={action.color} />
                </div>
                <div className="action-content">
                  <h3>{action.title}</h3>
                  <p>{action.description}</p>
                  <div className="action-button">
                    Get Started
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Age Groups */}
      <section className="age-groups-simple">
        <div className="container">
          <div className="section-header fade-in">
            <h2>Choose Your Child's Age Group</h2>
            <p>Age-appropriate content designed for every stage of development.</p>
          </div>

          <div className="age-groups-grid">
            {ageGroups.map((group, index) => (
              <Link key={index} to={group.link} className="age-group-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`group-header bg-gradient-to-r ${group.color}`}>
                  <div className="group-icon">
                    <group.icon size={48} className="text-white" />
                  </div>
                  <h3>{group.age}</h3>
                </div>
                <div className="group-content">
                  <p>{group.description}</p>
                  <div className="group-arrow">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="key-features">
        <div className="container">
          <div className="section-header fade-in">
            <h2>Why Choose PandaGarde?</h2>
            <p>Built specifically for families, with proven methods and engaging content.</p>
          </div>

          <div className="features-grid">
            <div className="feature-card fade-in">
              <div className="feature-icon">
                <Shield size={32} className="text-green-500" />
              </div>
              <h3>Age-Appropriate Learning</h3>
              <p>Content specifically designed for children ages 5-17, with developmentally appropriate concepts and activities.</p>
            </div>

            <div className="feature-card fade-in">
              <div className="feature-icon">
                <Heart size={32} className="text-red-500" />
              </div>
              <h3>Family-Focused</h3>
              <p>Designed for families to learn together, with resources for both children and parents.</p>
            </div>

            <div className="feature-card fade-in">
              <div className="feature-icon">
                <Star size={32} className="text-yellow-500" />
              </div>
              <h3>Interactive & Fun</h3>
              <p>Learning through stories, games, and activities that make privacy education engaging and memorable.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Learn More Links */}
      <section className="learn-more">
        <div className="container">
          <div className="section-header fade-in">
            <h2>Explore More</h2>
            <p>Dive deeper into our comprehensive platform and resources.</p>
          </div>

          <div className="learn-more-grid">
            <Link to="/overview" className="learn-more-card fade-in">
              <div className="card-icon">
                <BookOpen size={24} />
              </div>
              <h3>Complete Overview</h3>
              <p>Learn about our complete ecosystem of tools and features</p>
              <div className="card-arrow">
                <ArrowRight size={16} />
              </div>
            </Link>

            <Link to="/quick-start" className="learn-more-card fade-in">
              <div className="card-icon">
                <Play size={24} />
              </div>
              <h3>Quick Start Guide</h3>
              <p>Get started in minutes with our step-by-step guide</p>
              <div className="card-arrow">
                <ArrowRight size={16} />
              </div>
            </Link>

            <Link to="/resources" className="learn-more-card fade-in">
              <div className="card-icon">
                <Users size={24} />
              </div>
              <h3>Parent Resources</h3>
              <p>Access guides, tools, and materials for parents and educators</p>
              <div className="card-arrow">
                <ArrowRight size={16} />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="fade-in text-center">
            <h2>Ready to Protect Your Family?</h2>
            <p>Join thousands of families who are already building essential digital privacy skills.</p>
            <div className="cta-buttons">
              <Link to="/family-hub" className="button primary">
                <Users size={20} />
                Launch Family Hub
              </Link>
              <Link to="/privacy-panda" className="button secondary">
                <Play size={20} />
                Try PrivacyPanda
              </Link>
              <Link to="/quick-start" className="button tertiary">
                Get Started Guide
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;