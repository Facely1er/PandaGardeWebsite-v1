import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, ArrowRight, Play, Heart, Sparkles, Star, Shield, Baby, User, GraduationCap, ShoppingBag, BarChart3, Unlock, AlertTriangle, Target, Settings, Bell, CheckCircle2, CheckCircle, Zap } from 'lucide-react';
import { getAllPersonas, FamilyPersonaProfiles, type FamilyPersonaProfile } from '../data/familyPersonaProfiles';
import { useJourneyProgress } from '../hooks/useJourneyProgress';
import { useFamily } from '../contexts/FamilyContext';
import OnboardingFlow from '../components/OnboardingFlow';
import FeatureUnlockCelebration from '../components/FeatureUnlockCelebration';

const HomePage: React.FC = () => {
  const personas = getAllPersonas();
  const { progress, markStepVisited, isStepCompleted, isStepVisited } = useJourneyProgress();
  const { familyMembers, currentFamily } = useFamily();
  const [familyPersona, setFamilyPersona] = useState<FamilyPersonaProfile | null>(null);
  const [showUnlockCelebration, setShowUnlockCelebration] = useState(false);
  const [unlockedFeature, setUnlockedFeature] = useState<string | null>(null);

  // Load persona from localStorage
  useEffect(() => {
    const storedPersona = localStorage.getItem('pandagarde_family_persona');
    if (storedPersona) {
      try {
        const personaData = JSON.parse(storedPersona);
        const personaId = personaData.primary;
        if (personaId && FamilyPersonaProfiles[personaId]) {
          setFamilyPersona(FamilyPersonaProfiles[personaId]);
        }
      } catch (e) {
        console.error('Error parsing persona data:', e);
      }
    }
  }, []);

  // Calculate service catalog status
  const totalServicesCount = familyMembers.reduce((count, member) => {
    const memberServices = (member as any).services || [];
    return count + memberServices.length;
  }, 0);

  const hasServiceCatalog = totalServicesCount >= 3;
  const servicesNeeded = Math.max(0, 3 - totalServicesCount);

  // Check for feature unlocks
  useEffect(() => {
    if (hasServiceCatalog && !progress.step2.completed) {
      // Feature just unlocked
      setUnlockedFeature('Digital Footprint Analysis');
      setShowUnlockCelebration(true);
    }
  }, [hasServiceCatalog, progress.step2.completed]);

  // Mark steps as visited when component mounts
  useEffect(() => {
    // Mark step 1 as visited if family exists
    if (currentFamily && !progress.step1.visited) {
      markStepVisited(1);
    }
  }, [currentFamily, progress.step1.visited, markStepVisited]);
  
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
      <OnboardingFlow />
      
      {/* Feature Unlock Celebration */}
      {showUnlockCelebration && unlockedFeature && (
        <FeatureUnlockCelebration
          feature={unlockedFeature}
          description="You've unlocked advanced privacy features! Explore your digital footprint and get personalized recommendations."
          icon={<BarChart3 size={24} className="text-white" />}
          link="/digital-footprint"
          onClose={() => {
            setShowUnlockCelebration(false);
            setUnlockedFeature(null);
          }}
        />
      )}

      {/* Personalized Welcome Banner - If Persona Detected */}
      {familyPersona && (
        <section className="fade-in" style={{ 
          background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
          color: 'white',
          padding: '1.5rem 0',
          marginBottom: '0'
        }}>
          <div className="container">
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: '250px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {React.createElement(personaIcons[familyPersona.icon] || Users, { size: 24, className: 'text-white' })}
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.25rem' }}>
                    Welcome back, {familyPersona.name}!
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: '600' }}>
                    {familyPersona.description}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                {hasServiceCatalog ? (
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    background: 'rgba(255, 255, 255, 0.2)',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px'
                  }}>
                    <CheckCircle size={18} />
                    <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                      {totalServicesCount} Services • Features Unlocked
                    </span>
                  </div>
                ) : (
                  <Link
                    to="/service-catalog"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: 'white',
                      color: '#1B5E20',
                      padding: '0.5rem 1rem',
                      borderRadius: '8px',
                      fontWeight: '600',
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      transition: 'transform 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <ShoppingBag size={18} />
                    Set Up Service Catalog
                  </Link>
                )}
                <Link
                  to="/privacy-assessment"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    fontWeight: '600',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    border: '1px solid rgba(255, 255, 255, 0.3)'
                  }}
                >
                  <Target size={18} />
                  View Recommendations
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Service Catalog Status Banner - If No Persona But Has Services */}
      {!familyPersona && hasServiceCatalog && (
        <section className="fade-in" style={{ 
          background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
          color: 'white',
          padding: '1rem 0',
          marginBottom: '0'
        }}>
          <div className="container">
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <CheckCircle size={24} />
                <div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                    Service Catalog Active
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: '600' }}>
                    {totalServicesCount} services added • Advanced features unlocked!
                  </div>
                </div>
              </div>
              <Link
                to="/digital-footprint"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'white',
                  color: '#2563eb',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  fontWeight: '600',
                  textDecoration: 'none',
                  fontSize: '0.875rem'
                }}
              >
                Explore Features
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Hero Section */}
      <section className="hero-simple">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text slide-in-left">
              <span className="badge">DIGITAL PRIVACY EDUCATION</span>
              <h1>Protecting Families in the <span className="highlight">Digital Age</span></h1>
              <p className="hero-description">
                {familyPersona 
                  ? `${familyPersona.description}. Get personalized recommendations and resources tailored for your family's privacy needs.`
                  : 'Comprehensive digital privacy education platform designed for families with children ages 5-17. Interactive curriculum, engaging activities, and practical tools to help families navigate the digital world safely.'
                }
              </p>

              {/* Journey Progress Indicator in Hero */}
              {progress.overallProgress > 0 && (
                <div style={{
                  background: 'rgba(27, 94, 32, 0.1)',
                  borderRadius: '12px',
                  padding: '1rem',
                  marginBottom: '1.5rem',
                  border: '2px solid rgba(27, 94, 32, 0.2)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1B5E20' }}>
                      Your Journey Progress
                    </span>
                    <span style={{ fontSize: '0.875rem', fontWeight: '700', color: '#1B5E20' }}>
                      {Math.round(progress.overallProgress)}%
                    </span>
                  </div>
                  <div style={{ 
                    width: '100%', 
                    height: '8px', 
                    background: 'rgba(27, 94, 32, 0.2)', 
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{ 
                      width: `${progress.overallProgress}%`, 
                      height: '100%', 
                      background: 'linear-gradient(90deg, #1B5E20 0%, #2E7D32 100%)',
                      borderRadius: '4px',
                      transition: 'width 0.5s ease-in-out'
                    }} />
                  </div>
                  {progress.nextRecommendedStep > 0 && (
                    <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#1B5E20', opacity: 0.8 }}>
                      Next: {customerJourney[progress.nextRecommendedStep - 1]?.title}
                    </div>
                  )}
                </div>
              )}

              {/* Service Catalog Status in Hero */}
              {!hasServiceCatalog && (
                <div style={{
                  background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
                  borderRadius: '12px',
                  padding: '1rem',
                  marginBottom: '1.5rem',
                  border: '2px solid #f59e0b'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <ShoppingBag size={24} className="text-amber-700" />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.875rem', fontWeight: '700', color: '#92400e', marginBottom: '0.25rem' }}>
                        Unlock Advanced Features
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#78350f' }}>
                        Add {servicesNeeded} more service{servicesNeeded !== 1 ? 's' : ''} to enable Digital Footprint Analysis and Safety Alerts
                      </div>
                    </div>
                    <Link
                      to="/service-catalog"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: '#f59e0b',
                        color: 'white',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        fontWeight: '600',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      Set Up Now
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              )}

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

      {/* Personalized Quick Actions Based on Persona & Service Catalog */}
      <section className="quick-actions">
        <div className="container">
          <div className="section-header fade-in">
            <h2>
              {familyPersona 
                ? `Recommended for ${familyPersona.name}` 
                : 'Get Started in Minutes'
              }
            </h2>
            <p>
              {familyPersona 
                ? familyPersona.characteristics[0] || 'Personalized recommendations based on your family profile'
                : 'Choose your path and begin learning about digital privacy today.'
              }
            </p>
          </div>

          <div className="quick-actions-grid">
            {/* Service Catalog Action - Always First if Not Set Up */}
            {!hasServiceCatalog && (
              <Link 
                to="/service-catalog" 
                className="quick-action-card fade-in foundation-action" 
                style={{ 
                  animationDelay: '0s',
                  border: '3px solid #1B5E20',
                  background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                  boxShadow: '0 8px 16px rgba(27, 94, 32, 0.15)'
                }}
              >
                <div className="action-icon bg-green-100" style={{ position: 'relative' }}>
                  <ShoppingBag size={32} className="text-green-600" />
                  <div style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    background: '#f59e0b',
                    color: 'white',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: '700'
                  }}>
                    !
                  </div>
                </div>
                <div className="action-content">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Unlock size={16} className="text-green-600" />
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#1B5E20', textTransform: 'uppercase' }}>
                      Foundation Step
                    </span>
                  </div>
                  <h3>Set Up Service Catalog</h3>
                  <p>Add {servicesNeeded} more service{servicesNeeded !== 1 ? 's' : ''} to unlock Digital Footprint Analysis, Risk Exposure, and Safety Alerts</p>
                  <div className="action-button" style={{ background: '#1B5E20', color: 'white' }}>
                    Set Up Now
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            )}

            {/* Persona-Based Recommendations */}
            {familyPersona && familyPersona.recommendedResources.slice(0, 2).map((resource, index) => {
              const resourceMap: Record<string, { title: string; description: string; icon: React.ComponentType<any> }> = {
                '/privacy-assessment': {
                  title: 'Privacy Assessment',
                  description: 'Get personalized recommendations based on your family profile',
                  icon: Target
                },
                '/digital-footprint': {
                  title: 'Digital Footprint',
                  description: hasServiceCatalog ? 'Analyze your family\'s online presence' : 'Unlock by setting up Service Catalog',
                  icon: BarChart3
                },
                '/service-catalog': {
                  title: 'Service Catalog',
                  description: 'Review and manage your family\'s services',
                  icon: ShoppingBag
                },
                '/privacy-panda': {
                  title: 'Privacy Panda',
                  description: 'Start interactive learning activities',
                  icon: Play
                },
                '/family-hub': {
                  title: 'Family Hub',
                  description: 'Access your personalized dashboard',
                  icon: Users
                }
              };

              const resourceInfo = resourceMap[resource] || {
                title: 'Explore Resources',
                description: 'Discover personalized content',
                icon: BookOpen
              };

              return (
                <Link 
                  key={`persona-${index}`}
                  to={resource} 
                  className="quick-action-card fade-in" 
                  style={{ animationDelay: `${(hasServiceCatalog ? 0 : 1) + index * 0.1}s` }}
                >
                  <div className={`action-icon ${familyPersona.color === 'blue' ? 'bg-blue-50' : familyPersona.color === 'purple' ? 'bg-purple-50' : 'bg-green-50'}`}>
                    <resourceInfo.icon size={32} className={familyPersona.color === 'blue' ? 'text-blue-600' : familyPersona.color === 'purple' ? 'text-purple-600' : 'text-green-600'} />
                  </div>
                  <div className="action-content">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <Sparkles size={14} className="text-amber-500" />
                      <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#6b7280' }}>
                        Recommended
                      </span>
                    </div>
                    <h3>{resourceInfo.title}</h3>
                    <p>{resourceInfo.description}</p>
                    <div className="action-button">
                      Explore
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              );
            })}

            {/* Standard Quick Actions */}
            {quickActions.slice(0, familyPersona ? 1 : 3).map((action, index) => (
              <Link 
                key={index} 
                to={action.link} 
                className="quick-action-card fade-in" 
                style={{ animationDelay: `${(hasServiceCatalog ? 0 : 1) + (familyPersona ? 2 : 0) + index * 0.1}s` }}
              >
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

            {/* Unlocked Features Showcase */}
            {hasServiceCatalog && (
              <Link 
                to="/digital-footprint" 
                className="quick-action-card fade-in" 
                style={{ 
                  animationDelay: '0.3s',
                  border: '2px solid #22c55e',
                  background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'
                }}
              >
                <div className="action-icon bg-green-100" style={{ position: 'relative' }}>
                  <BarChart3 size={32} className="text-green-600" />
                  <div style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    background: '#22c55e',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <CheckCircle size={12} className="text-white" style={{ strokeWidth: 3 }} />
                  </div>
                </div>
                <div className="action-content">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                    <Zap size={14} className="text-green-600" />
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#16a34a', textTransform: 'uppercase' }}>
                      Unlocked
                    </span>
                  </div>
                  <h3>Digital Footprint Analysis</h3>
                  <p>View your family's privacy exposure across {totalServicesCount} services</p>
                  <div className="action-button" style={{ background: '#22c55e', color: 'white' }}>
                    Explore Now
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            )}
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
            
            {/* Progress Bar */}
            <div style={{ 
              maxWidth: '600px', 
              margin: '1.5rem auto 0',
              background: '#f3f4f6',
              borderRadius: '12px',
              padding: '1rem',
              border: '2px solid #e5e7eb'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                  Journey Progress
                </span>
                <span style={{ fontSize: '0.875rem', fontWeight: '700', color: '#1B5E20' }}>
                  {Math.round(progress.overallProgress)}%
                </span>
              </div>
              <div style={{ 
                width: '100%', 
                height: '12px', 
                background: '#e5e7eb', 
                borderRadius: '6px',
                overflow: 'hidden',
                position: 'relative'
              }}>
                <div style={{ 
                  width: `${progress.overallProgress}%`, 
                  height: '100%', 
                  background: 'linear-gradient(90deg, #1B5E20 0%, #2E7D32 50%, #66BB6A 100%)',
                  borderRadius: '6px',
                  transition: 'width 0.5s ease-in-out',
                  boxShadow: '0 2px 4px rgba(27, 94, 32, 0.2)'
                }} />
              </div>
            </div>

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

          {/* Journey Steps with Visual Flow */}
          <div className="journey-container" style={{ position: 'relative', marginTop: '3rem' }}>
            {/* Connecting Lines - Desktop Only */}
            <div className="journey-connectors" style={{ 
              display: 'none',
              position: 'absolute',
              top: '40px',
              left: '12.5%',
              right: '12.5%',
              height: '3px',
              background: 'linear-gradient(90deg, #1B5E20 0%, #2E7D32 50%, #66BB6A 100%)',
              zIndex: 0,
              opacity: 0.3
            }}>
              <div style={{ 
                width: `${progress.overallProgress}%`, 
                height: '100%', 
                background: 'linear-gradient(90deg, #1B5E20 0%, #2E7D32 50%, #66BB6A 100%)',
                opacity: 1,
                transition: 'width 0.5s ease-in-out'
              }} />
            </div>

            <div className="parent-steps-grid journey-steps-enhanced">
              {customerJourney.map((step, index) => {
                const isCompleted = isStepCompleted(step.step);
                const isVisited = isStepVisited(step.step);
                const isRecommended = progress.nextRecommendedStep === step.step;
                const isFoundation = step.isFoundation;

                return (
                  <div key={index} style={{ position: 'relative', zIndex: 1 }}>
                    {/* Arrow Connector - Desktop Only */}
                    {index < customerJourney.length - 1 && (
                      <div 
                        className="journey-arrow"
                        style={{
                          display: 'none',
                          position: 'absolute',
                          top: '40px',
                          right: '-16px',
                          width: '32px',
                          height: '3px',
                          background: isCompleted ? 'linear-gradient(90deg, #1B5E20 0%, #2E7D32 100%)' : '#e5e7eb',
                          zIndex: 0,
                          opacity: isCompleted ? 1 : 0.3
                        }}
                      >
                        <div style={{
                          position: 'absolute',
                          right: '-6px',
                          top: '-4px',
                          width: 0,
                          height: 0,
                          borderLeft: `6px solid ${isCompleted ? '#2E7D32' : '#e5e7eb'}`,
                          borderTop: '6px solid transparent',
                          borderBottom: '6px solid transparent'
                        }} />
                      </div>
                    )}

                    <Link 
                      to={step.link} 
                      onClick={() => markStepVisited(step.step)}
                      className={`parent-step-card fade-in ${isFoundation ? 'foundation-step' : ''} ${isCompleted ? 'step-completed' : ''} ${isRecommended ? 'step-recommended' : ''}`} 
                      style={{ 
                        animationDelay: `${index * 0.1}s`,
                        position: 'relative',
                        transform: isFoundation ? 'scale(1.02)' : 'scale(1)',
                        transition: 'transform 0.3s ease'
                      }}
                    >
                      {/* Completion Checkmark */}
                      {isCompleted && (
                        <div style={{
                          position: 'absolute',
                          top: '-10px',
                          right: '-10px',
                          width: '32px',
                          height: '32px',
                          background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 8px rgba(34, 197, 94, 0.3)',
                          zIndex: 10,
                          animation: 'bounce 0.5s ease'
                        }}>
                          <CheckCircle size={18} className="text-white" style={{ strokeWidth: 3 }} />
                        </div>
                      )}

                      {/* Recommended Badge */}
                      {isRecommended && !isCompleted && (
                        <div style={{
                          position: 'absolute',
                          top: '-12px',
                          left: '-12px',
                          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                          color: 'white',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '10px',
                          fontWeight: '700',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                          boxShadow: '0 4px 8px rgba(245, 158, 11, 0.3)',
                          zIndex: 10,
                          animation: 'pulse 2s infinite'
                        }}>
                          Next Step
                        </div>
                      )}

                      <div className="step-number">
                        {isFoundation && <Unlock size={12} style={{ position: 'absolute', top: '-5px', right: '-5px' }} />}
                        {isCompleted ? (
                          <CheckCircle size={20} className="text-white" style={{ strokeWidth: 3 }} />
                        ) : (
                          <span>{step.step}</span>
                        )}
                      </div>
                      <div className="step-content">
                        <div className="step-header">
                          <div className="step-icon" style={{
                            background: isCompleted ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' : undefined,
                            color: isCompleted ? 'white' : undefined
                          }}>
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
                          {isCompleted ? 'View Again' : isVisited ? 'Continue' : 'Get Started'}
                          <ArrowRight size={16} />
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
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