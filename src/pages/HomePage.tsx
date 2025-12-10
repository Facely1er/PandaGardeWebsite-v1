import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, ArrowRight, Play, Heart, Sparkles, Star, Shield, Baby, User, GraduationCap, ShoppingBag, BarChart3, Unlock, AlertTriangle, Target, Settings, Bell, CheckCircle2 } from 'lucide-react';
import { getAllPersonas } from '../data/familyPersonaProfiles';

const HomePage: React.FC = () => {
  const personas = getAllPersonas();
  
  // Icon mapping for personas
  const personaIcons: Record<string, React.ComponentType<any>> = {
    'Users': Users,
    'Shield': Shield,
    'BookOpen': BookOpen,
    'Settings': Settings,
    'Target': Target,
    'AlertTriangle': AlertTriangle
  };

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

  const customerJourney = [
    {
      step: 1,
      title: 'Join PandaGarde Platform',
      description: 'Create your family profile and access the complete privacy education ecosystem',
      icon: Users,
      link: '/family-hub',
      platform: 'PandaGarde'
    },
    {
      step: 2,
      title: 'Set Up Service Catalog',
      description: 'Add services your family uses to enable risk analysis, alerts, and digital footprint tracking',
      icon: Shield,
      link: '/service-catalog',
      platform: 'PandaGarde',
      enables: ['Digital Footprint', 'Risk Exposure', 'Safety Alerts'],
      isFoundation: true
    },
    {
      step: 3,
      title: 'Start Learning with Privacy Panda',
      description: 'Begin interactive stories and activities designed for your child\'s age group',
      icon: Play,
      link: '/privacy-panda',
      platform: 'Privacy Panda'
    },
    {
      step: 4,
      title: 'Access Advanced Features',
      description: 'Use digital footprint analysis, risk assessments, and personalized recommendations',
      icon: BarChart3,
      link: '/digital-footprint',
      platform: 'PandaGarde',
      requires: 'Service Catalog'
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

      {/* Service Catalog Value Proposition - MOVED UP FOR EMPHASIS */}
      <section className="service-catalog-value" style={{ padding: '4rem 0', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
        <div className="container">
          <div className="section-header fade-in">
            <div style={{ display: 'inline-block', background: '#3b82f6', color: 'white', padding: '0.5rem 1rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              ⭐ START HERE - FOUNDATION OF YOUR PRIVACY JOURNEY
            </div>
            <h2>The Service Catalog: Your Family's Privacy Command Center</h2>
            <p className="text-lg" style={{ fontWeight: '600', color: '#1e40af' }}>
              Everything begins with understanding which services your family uses. The Service Catalog is the foundation that unlocks all advanced privacy features.
            </p>
          </div>

          <div className="fade-in" style={{ maxWidth: '900px', margin: '0 auto 3rem', textAlign: 'center' }}>
            <div style={{ 
              background: 'white', 
              borderRadius: '16px', 
              padding: '2.5rem', 
              boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
              marginBottom: '2rem',
              border: '3px solid #3b82f6'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  borderRadius: '50%',
                  width: '64px',
                  height: '64px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '1rem',
                  boxShadow: '0 4px 8px rgba(59, 130, 246, 0.3)'
                }}>
                  <ShoppingBag size={32} style={{ color: 'white' }} />
                </div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#1e40af' }}>
                  What is the Service Catalog?
                </h3>
              </div>
              <p style={{ fontSize: '1.125rem', color: '#4b5563', lineHeight: '1.75', marginBottom: '1rem' }}>
                A comprehensive database of apps, platforms, and services your family uses—from social media and gaming to education and streaming. Each service includes privacy risk ratings, age recommendations, and practical guidance to help you make informed decisions.
              </p>
              <div style={{ 
                background: '#eff6ff', 
                borderLeft: '4px solid #3b82f6',
                padding: '1rem',
                borderRadius: '8px',
                marginTop: '1.5rem'
              }}>
                <p style={{ fontSize: '1rem', color: '#1e40af', fontWeight: '600', margin: 0 }}>
                  💡 <strong>Why Start Here?</strong> You can't protect what you don't understand. By cataloging your family's services, you create the foundation for every other privacy feature on PandaGarde.
                </p>
              </div>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div style={{ 
                background: 'white', 
                borderRadius: '12px', 
                padding: '1.5rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <BarChart3 size={32} className="text-green-600" style={{ marginBottom: '1rem' }} />
                <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#1e40af' }}>Digital Footprint Analysis</h4>
                <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>
                  See your family's overall privacy exposure across all services and get personalized recommendations
                </p>
              </div>

              <div style={{ 
                background: 'white', 
                borderRadius: '12px', 
                padding: '1.5rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <Shield size={32} className="text-orange-600" style={{ marginBottom: '1rem' }} />
                <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#1e40af' }}>Privacy Exposure Index</h4>
                <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>
                  Each service is rated 0-100 for privacy risk, helping you understand which apps need closer supervision
                </p>
              </div>

              <div style={{ 
                background: 'white', 
                borderRadius: '12px', 
                padding: '1.5rem',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <Bell size={32} className="text-red-600" style={{ marginBottom: '1rem' }} />
                <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#1e40af' }}>Safety Alerts</h4>
                <p style={{ color: '#6b7280', fontSize: '0.95rem' }}>
                  Receive real-time notifications about privacy updates, policy changes, and safety concerns for your services
                </p>
              </div>
            </div>

            <div style={{ 
              background: 'white', 
              borderRadius: '12px', 
              padding: '2rem',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <h4 style={{ fontWeight: 'bold', marginBottom: '1rem', color: '#1e40af', fontSize: '1.25rem' }}>
                Why It Matters
              </h4>
              <div style={{ display: 'grid', gap: '1rem', textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'start' }}>
                  <CheckCircle2 size={20} className="text-green-600" style={{ marginRight: '0.75rem', marginTop: '0.25rem', flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: '#1e40af' }}>Make Informed Decisions:</strong>
                    <span style={{ color: '#6b7280', marginLeft: '0.5rem' }}>
                      Know which services are appropriate for your child's age and understand the privacy risks before they sign up
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'start' }}>
                  <CheckCircle2 size={20} className="text-green-600" style={{ marginRight: '0.75rem', marginTop: '0.25rem', flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: '#1e40af' }}>Track Your Family's Exposure:</strong>
                    <span style={{ color: '#6b7280', marginLeft: '0.5rem' }}>
                      See your complete digital footprint and identify areas where you need better privacy protection
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'start' }}>
                  <CheckCircle2 size={20} className="text-green-600" style={{ marginRight: '0.75rem', marginTop: '0.25rem', flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: '#1e40af' }}>Get Actionable Guidance:</strong>
                    <span style={{ color: '#6b7280', marginLeft: '0.5rem' }}>
                      Receive specific privacy tips and parental control recommendations for each service your family uses
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'start' }}>
                  <CheckCircle2 size={20} className="text-green-600" style={{ marginRight: '0.75rem', marginTop: '0.25rem', flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: '#1e40af' }}>Stay Updated:</strong>
                    <span style={{ color: '#6b7280', marginLeft: '0.5rem' }}>
                      Get alerts when services change their privacy policies or when new risks are discovered
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                borderRadius: '16px',
                padding: '2rem',
                boxShadow: '0 8px 16px rgba(59, 130, 246, 0.3)',
                marginBottom: '1.5rem'
              }}>
                <p style={{ color: 'white', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                  🚀 Ready to Start Your Privacy Journey?
                </p>
                <p style={{ color: '#e0f2fe', fontSize: '1rem', marginBottom: '1.5rem' }}>
                  Add your first 3 services to unlock Digital Footprint Analysis, Risk Exposure Reports, and Safety Alerts
                </p>
                <Link 
                  to="/service-catalog" 
                  className="button primary"
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    fontSize: '1.25rem',
                    padding: '1rem 2.5rem',
                    background: 'white',
                    color: '#1e40af',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                    border: 'none'
                  }}
                >
                  <ShoppingBag size={24} />
                  Set Up Your Service Catalog Now
                  <ArrowRight size={20} />
                </Link>
                <p style={{ color: '#bfdbfe', fontSize: '0.875rem', marginTop: '1rem', fontStyle: 'italic' }}>
                  Takes only 5 minutes • Unlock all features • 100% Free
                </p>
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

      {/* Family Personas */}
      <section className="family-personas" style={{ padding: '4rem 0', background: '#ffffff' }}>
        <div className="container">
          <div className="section-header fade-in">
            <h2>Which Family Are You?</h2>
            <p className="text-lg">Discover your family's privacy profile and get personalized recommendations</p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '1.5rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {personas.map((persona, index) => {
              const IconComponent = personaIcons[persona.icon] || Users;
              const colorMap: Record<string, string> = {
                'blue': '#3b82f6',
                'purple': '#9333ea',
                'green': '#10b981',
                'teal': '#14b8a6',
                'amber': '#f59e0b',
                'red': '#ef4444'
              };
              const personaColor = colorMap[persona.color] || '#6b7280';

              return (
                <div 
                  key={persona.id} 
                  className="fade-in" 
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    background: 'white',
                    borderRadius: '12px',
                    padding: '1.5rem',
                    border: `2px solid ${personaColor}20`,
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ 
                      width: '48px', 
                      height: '48px', 
                      borderRadius: '12px',
                      background: `${personaColor}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '1rem'
                    }}>
                      <IconComponent size={24} style={{ color: personaColor }} />
                    </div>
                    <div>
                      <h3 style={{ fontWeight: 'bold', fontSize: '1.25rem', color: '#1e40af', margin: 0 }}>
                        {persona.name}
                      </h3>
                      <span style={{ 
                        fontSize: '0.75rem', 
                        color: personaColor,
                        fontWeight: '600',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        {persona.riskThreshold} risk threshold
                      </span>
                    </div>
                  </div>

                  <p style={{ color: '#6b7280', marginBottom: '1rem', lineHeight: '1.6' }}>
                    {persona.description}
                  </p>

                  <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: `1px solid ${personaColor}20` }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
                      Key Characteristics:
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                      {persona.characteristics.slice(0, 2).map((char, idx) => (
                        <li key={idx} style={{ 
                          fontSize: '0.875rem', 
                          color: '#6b7280',
                          marginBottom: '0.375rem',
                          display: 'flex',
                          alignItems: 'start'
                        }}>
                          <span style={{ color: personaColor, marginRight: '0.5rem' }}>•</span>
                          {char}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link 
                    to={`/family-hub?persona=${persona.id}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      marginTop: '1rem',
                      color: personaColor,
                      fontWeight: '600',
                      fontSize: '0.875rem',
                      textDecoration: 'none'
                    }}
                  >
                    Learn More
                    <ArrowRight size={14} style={{ marginLeft: '0.25rem' }} />
                  </Link>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
              Not sure which persona fits your family? Start with our quick assessment.
            </p>
            <Link 
              to="/family-hub" 
              className="button secondary"
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.5rem'
              }}
            >
              <Users size={20} />
              Find Your Family Profile
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Customer Journey */}
      <section className="parent-steps">
        <div className="container">
          <div className="section-header fade-in">
            <h2>Your PandaGarde Journey</h2>
            <p>Follow these simple steps to protect your family in the digital age.</p>
            <div style={{ 
              background: '#eff6ff', 
              borderRadius: '12px',
              padding: '1rem 1.5rem',
              marginTop: '1rem',
              border: '2px solid #3b82f6',
              maxWidth: '800px',
              margin: '1rem auto 0'
            }}>
              <p style={{ color: '#1e40af', fontSize: '1rem', fontWeight: '600', margin: 0, textAlign: 'center' }}>
                <Unlock size={20} style={{ display: 'inline-block', marginRight: '0.5rem', verticalAlign: 'middle' }} />
                <strong>Step 2 (Service Catalog)</strong> is the key that unlocks Steps 4's advanced features!
              </p>
            </div>
          </div>

          <div className="parent-steps-grid">
            {customerJourney.map((step, index) => (
              <Link 
                key={index} 
                to={step.link} 
                className={`parent-step-card fade-in ${step.isFoundation ? 'foundation-step' : ''}`} 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="step-number">
                  {step.isFoundation && <Unlock size={12} style={{ position: 'absolute', top: '-5px', right: '-5px' }} />}
                  <span>{step.step}</span>
                </div>
                <div className="step-content">
                  <div className="step-header">
                    <div className="step-icon">
                      <step.icon size={24} />
                    </div>
                    {step.platform && (
                      <span className={`platform-badge ${step.platform === 'Privacy Panda' ? 'privacy-panda' : 'pandagarde'}`}>
                        {step.platform}
                      </span>
                    )}
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                  
                  {/* Show what this step enables */}
                  {step.enables && step.enables.length > 0 && (
                    <div className="enables-list">
                      <div className="enables-label">
                        <Unlock size={14} />
                        <span>Unlocks:</span>
                      </div>
                      <div className="enables-items">
                        {step.enables.map((feature, idx) => (
                          <span key={idx} className="enable-badge">{feature}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Show requirements */}
                  {step.requires && (
                    <div className="requires-badge">
                      <Shield size={14} />
                      <span>Requires: {step.requires}</span>
                    </div>
                  )}
                  
                  <div className="step-link">
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