import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, ArrowRight, Play, Heart, Sparkles, Star, Shield, CheckCircle } from 'lucide-react';

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
      icon: '👶',
      description: 'Stories & Activities',
      link: '/activity-book',
      color: 'from-purple-500 to-pink-500'
    },
    {
      age: 'Ages 9-12',
      icon: '🧒',
      description: 'Privacy Explorers',
      link: '/privacy-explorers',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      age: 'Ages 13-17',
      icon: '👦',
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
              <span className="badge">FOR PARENTS</span>
              <h1>Keep Your Family <span className="highlight rainbow-text sparkle">Safe Online</span></h1>
              <p className="hero-description">
                See what your children do online, know their privacy risks, and get conversation starters to help them stay safe. 
                Simple tools designed for parents who want to protect their family without being tech experts.
              </p>

              <div className="hero-buttons">
                <a href="https://www.hub.pandagarde.com" target="_blank" rel="noopener noreferrer" className="button primary bounce-hover">
                  <Shield size={20} />
                  Start Protecting Your Family
                  <ArrowRight size={16} />
                </a>
                <Link to="/overview" className="button secondary wiggle-hover">
                  <BookOpen size={20} />
                  See How It Works
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

                  <a 
                    href="https://www.hub.pandagarde.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-hub"
                  >
                    <ArrowRight size={16} />
                    Visit Family Hub
                    <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Parents Section */}
      <section className="for-parents-section" style={{ backgroundColor: '#f8f9fa', padding: '4rem 0' }}>
        <div className="container">
          <div className="section-header fade-in">
            <h2>What Parents Get</h2>
            <p>Everything you need to keep your family safe online, all in one place.</p>
          </div>
          
          <div className="parent-benefits-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            <div className="benefit-card fade-in" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <div className="benefit-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>👀</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2C3E50' }}>See What Your Children Do Online</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>Know which apps and websites your children use, and see their privacy risks at a glance.</p>
            </div>
            
            <div className="benefit-card fade-in" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <div className="benefit-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2C3E50' }}>Know Their Privacy Risks</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>Get clear, easy-to-understand risk scores so you know what needs your attention.</p>
            </div>
            
            <div className="benefit-card fade-in" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <div className="benefit-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2C3E50' }}>Get Conversation Starters</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>Ready-to-use questions and topics to help you talk with your children about online safety.</p>
            </div>
            
            <div className="benefit-card fade-in" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <div className="benefit-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2C3E50' }}>Track Their Safety Progress</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>See how your family's privacy improves over time as you learn and make changes together.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start for Parents */}
      <section className="quick-start-parents" style={{ padding: '4rem 0' }}>
        <div className="container">
          <div className="section-header fade-in">
            <h2>Quick Start for Parents</h2>
            <p>Get started in three simple steps</p>
          </div>
          
          <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            <div className="step-card fade-in" style={{ textAlign: 'center', padding: '2rem' }}>
              <div className="step-number" style={{ fontSize: '3rem', fontWeight: 'bold', color: '#4CAF50', marginBottom: '1rem' }}>1</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#2C3E50' }}>Create Your Family Account</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>Sign up for Family Hub and add your children to get started.</p>
            </div>
            
            <div className="step-card fade-in" style={{ textAlign: 'center', padding: '2rem' }}>
              <div className="step-number" style={{ fontSize: '3rem', fontWeight: 'bold', color: '#4CAF50', marginBottom: '1rem' }}>2</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#2C3E50' }}>See Your Family's Privacy Status</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>View your dashboard to see risk scores and what needs your attention.</p>
            </div>
            
            <div className="step-card fade-in" style={{ textAlign: 'center', padding: '2rem' }}>
              <div className="step-number" style={{ fontSize: '3rem', fontWeight: 'bold', color: '#4CAF50', marginBottom: '1rem' }}>3</div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: '#2C3E50' }}>Take Action</h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>Review service requests, get conversation starters, and start protecting your family.</p>
            </div>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a href="https://www.hub.pandagarde.com" target="_blank" rel="noopener noreferrer" className="button primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2rem', fontSize: '1.1rem' }}>
              <Shield size={20} />
              Start Protecting Your Family Now
              <ArrowRight size={16} />
            </a>
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
            <h2>Content for Every Age</h2>
            <p>Age-appropriate privacy education that grows with your child. You can see what's right for each age group.</p>
          </div>

          <div className="age-groups-grid">
            {ageGroups.map((group, index) => (
              <Link key={index} to={group.link} className="age-group-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`group-header bg-gradient-to-r ${group.color}`}>
                  <div className="group-icon text-4xl">{group.icon}</div>
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
            <h2>Why Parents Trust PandaGarde</h2>
            <p>Simple tools that help you protect your family without needing to be a tech expert.</p>
          </div>

          <div className="features-grid">
            <div className="feature-card fade-in">
              <div className="feature-icon">
                <Shield size={32} className="text-green-500" />
              </div>
              <h3>Easy to Understand</h3>
              <p>No technical jargon. We explain everything in simple terms so you know exactly what's happening with your children's privacy.</p>
            </div>

            <div className="feature-card fade-in">
              <div className="feature-icon">
                <Heart size={32} className="text-red-500" />
              </div>
              <h3>Built for Parents</h3>
              <p>Everything is designed with parents in mind. See risks, take action, and get help talking to your children - all in one place.</p>
            </div>

            <div className="feature-card fade-in">
              <div className="feature-icon">
                <Star size={32} className="text-yellow-500" />
              </div>
              <h3>Actionable Guidance</h3>
              <p>Get clear next steps, conversation starters, and practical advice - not just information, but real help you can use right away.</p>
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
            <h2>Ready to Keep Your Family Safe Online?</h2>
            <p>Join thousands of parents who are already protecting their children's privacy with simple, easy-to-use tools.</p>
            <div className="cta-buttons">
              <a href="https://www.hub.pandagarde.com" className="button primary" target="_blank" rel="noopener noreferrer">
                <Shield size={20} />
                Start Protecting Your Family
              </a>
              <Link to="/overview" className="button secondary">
                <BookOpen size={20} />
                See How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;