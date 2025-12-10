import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, ArrowRight, Play, Heart, Sparkles, Star, Shield, Baby, User, GraduationCap, ShoppingBag, BarChart3, Unlock, AlertTriangle, Target, Settings, CheckCircle, MessageCircle, Globe, X } from 'lucide-react';
import { getAllPersonas, FamilyPersonaProfiles, type FamilyPersonaProfile } from '../data/familyPersonaProfiles';
import { useJourneyProgress } from '../hooks/useJourneyProgress';
import { useFamily } from '../contexts/FamilyContext';
import OnboardingFlow from '../components/OnboardingFlow';
import FeatureUnlockCelebration from '../components/FeatureUnlockCelebration';
import { logger } from '../lib/logger';

const HomePage: React.FC = () => {
  const personas = getAllPersonas();
  const { progress, markStepVisited, isStepCompleted, isStepVisited } = useJourneyProgress();
  const { familyMembers, currentFamily } = useFamily();
  const [familyPersona, setFamilyPersona] = useState<FamilyPersonaProfile | null>(null);
  const [showUnlockCelebration, setShowUnlockCelebration] = useState(false);
  const [unlockedFeature, setUnlockedFeature] = useState<string | null>(null);
  const [showPilotBanner, setShowPilotBanner] = useState(() => {
    // Check if user has dismissed the banner
    return !localStorage.getItem('pandagarde_pilot_banner_dismissed');
  });

  // Track banner display
  useEffect(() => {
    if (showPilotBanner) {
      trackEvent(AnalyticsEvents.PILOT_BANNER_SHOWN, {
        timestamp: new Date().toISOString(),
        source: 'homepage'
      });
    }
  }, [showPilotBanner]);

  const handleBannerDismiss = () => {
    setShowPilotBanner(false);
    localStorage.setItem('pandagarde_pilot_banner_dismissed', 'true');
    trackEvent(AnalyticsEvents.PILOT_BANNER_DISMISSED, {
      timestamp: new Date().toISOString(),
      source: 'homepage'
    });
  };

  const handleBannerClick = () => {
    trackEvent(AnalyticsEvents.PILOT_BANNER_CLICKED, {
      timestamp: new Date().toISOString(),
      source: 'homepage',
      action: 'learn_more'
    });
  };

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
        logger.error('Error parsing persona data', e, 'HomePage');
      }
    }
  }, []);

  // Calculate service catalog status
  const totalServicesCount = familyMembers.reduce((count, member) => {
    const memberServices = (member as any).services || [];
    return count + memberServices.length;
  }, 0);

  const hasServiceCatalog = totalServicesCount >= 3;

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

  // Standardized customer journey steps - consistent across all pages
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
      title: 'Add Services for Digital Footprint Analysis',
      description: 'Tell us which apps and services your family uses. This enables Digital Footprint Analysis, privacy recommendations, and safety alerts',
      icon: ShoppingBag,
      link: '/service-catalog',
      platform: 'PandaGarde',
      enables: ['Digital Footprint Analysis', 'Privacy Recommendations', 'Safety Alerts'],
      isFoundation: true
    },
    {
      step: 3,
      title: 'Start Privacy Panda Learning',
      description: 'Begin interactive stories and activities designed for your child\'s age group',
      icon: Play,
      link: '/privacy-panda',
      platform: 'Privacy Panda'
    },
    {
      step: 4,
      title: 'View Your Digital Footprint Analysis',
      description: 'See your family\'s privacy exposure across all services and get personalized recommendations to improve your privacy',
      icon: BarChart3,
      link: '/digital-footprint',
      platform: 'PandaGarde',
      requires: 'Step 2: Add Services'
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

      {/* Consolidated Status Banner - Only show one at a time */}
      {showPilotBanner && !familyPersona && !hasServiceCatalog && (
        <section className="fade-in" style={{ 
          background: 'linear-gradient(135deg, #9333ea 0%, #3b82f6 100%)',
          color: 'white',
          padding: '0.875rem 0',
          marginBottom: '0',
          position: 'relative'
        }}>
          <div className="container">
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '200px' }}>
                <Sparkles size={20} className="text-white" />
                <div style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                  Join the Family Hub Pilot Program
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Link
                  to="/pilot"
                  onClick={handleBannerClick}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'white',
                    color: '#9333ea',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    fontWeight: '600',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    transition: 'transform 0.2s',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  Learn More
                  <ArrowRight size={16} />
                </Link>
                <button
                  onClick={handleBannerDismiss}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    padding: '0.5rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  aria-label="Dismiss banner"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Personalized Welcome Banner - Simplified */}
      {familyPersona && (
        <section className="fade-in" style={{ 
          background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                {React.createElement(personaIcons[familyPersona.icon] || Users, { size: 20, className: 'text-white' })}
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>
                    Welcome back, {familyPersona.name}!
                  </div>
                </div>
              </div>
              {hasServiceCatalog && (
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  background: 'rgba(255, 255, 255, 0.15)',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  fontSize: '0.875rem'
                }}>
                  <CheckCircle size={16} />
                  <span>{totalServicesCount} Services Active</span>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Hero Section - Simplified */}
      <section className="hero-simple" style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
        position: 'relative',
        overflow: 'hidden',
        padding: '5rem 0 4rem'
      }}>
        {/* Subtle background elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(27, 94, 32, 0.04) 0%, transparent 70%)',
          borderRadius: '50%',
          zIndex: 0
        }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="hero-content" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <div className="hero-text slide-in-left">
              <span className="badge" style={{
                background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
                color: 'white',
                padding: '0.5rem 1.25rem',
                borderRadius: '50px',
                fontSize: '0.75rem',
                fontWeight: '600',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                display: 'inline-block',
                marginBottom: '1.5rem'
              }}>
                Digital Privacy Education
              </span>
              <h1 style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                fontWeight: '800',
                lineHeight: '1.1',
                marginBottom: '1.5rem',
                color: '#0f172a',
                letterSpacing: '-0.02em'
              }}>
                Keep Your Family<br />
                <span className="highlight" style={{
                  background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 50%, #66BB6A 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  display: 'inline-block'
                }}>
                  Safe Online
                </span>
              </h1>
              <p className="hero-description" style={{
                fontSize: 'clamp(1.125rem, 2vw, 1.25rem)',
                lineHeight: '1.7',
                color: '#64748b',
                marginBottom: '2.5rem',
                maxWidth: '700px',
                margin: '0 auto 2.5rem'
              }}>
                {familyPersona 
                  ? `${familyPersona.description}. Get personalized recommendations tailored for your family's privacy needs.`
                  : 'Teach your children digital privacy and online safety through fun, interactive activities. Everything you need to protect your family—all in one place, completely free.'
                }
              </p>

              {/* Simplified Journey Progress - Only show if significant progress */}
              {progress.overallProgress > 25 && (
                <div style={{
                  background: 'rgba(27, 94, 32, 0.05)',
                  borderRadius: '12px',
                  padding: '1rem 1.5rem',
                  marginBottom: '2rem',
                  border: '1px solid rgba(27, 94, 32, 0.1)',
                  maxWidth: '500px',
                  margin: '0 auto 2rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1B5E20' }}>
                      Your Progress
                    </span>
                    <span style={{ fontSize: '0.875rem', fontWeight: '700', color: '#1B5E20' }}>
                      {Math.round(progress.overallProgress)}%
                    </span>
                  </div>
                  <div style={{ 
                    width: '100%', 
                    height: '6px', 
                    background: 'rgba(27, 94, 32, 0.1)', 
                    borderRadius: '3px',
                    overflow: 'hidden'
                  }}>
                    <div style={{ 
                      width: `${progress.overallProgress}%`, 
                      height: '100%', 
                      background: 'linear-gradient(90deg, #1B5E20 0%, #2E7D32 100%)',
                      borderRadius: '3px',
                      transition: 'width 0.5s ease-in-out'
                    }} />
                  </div>
                </div>
              )}

              <div className="hero-buttons" style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
                marginBottom: '3rem'
              }}>
                <Link 
                  to="/quick-start" 
                  className="button primary"
                  style={{
                    background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
                    color: 'white',
                    padding: '1rem 2.5rem',
                    borderRadius: '12px',
                    fontWeight: '600',
                    fontSize: '1rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    boxShadow: '0 4px 16px rgba(27, 94, 32, 0.25)',
                    transition: 'all 0.3s ease',
                    border: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(27, 94, 32, 0.35)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(27, 94, 32, 0.25)';
                  }}
                >
                  <Play size={20} />
                  Get Started
                  <ArrowRight size={16} />
                </Link>
                <Link 
                  to="/privacy-panda" 
                  className="button secondary"
                  style={{
                    background: 'white',
                    color: '#1B5E20',
                    padding: '1rem 2.5rem',
                    borderRadius: '12px',
                    fontWeight: '600',
                    fontSize: '1rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                    border: '2px solid #e2e8f0',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#1B5E20';
                    e.currentTarget.style.color = '#1B5E20';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0';
                    e.currentTarget.style.color = '#1B5E20';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
                  }}
                >
                  Start Learning
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* Simplified Stats */}
              <div className="hero-stats" style={{
                display: 'flex',
                gap: '3rem',
                flexWrap: 'wrap',
                justifyContent: 'center',
                paddingTop: '2rem',
                borderTop: '1px solid #e2e8f0'
              }}>
                <div className="stat-item">
                  <span className="stat-number" style={{
                    display: 'block',
                    fontSize: '2rem',
                    fontWeight: '800',
                    background: 'linear-gradient(135deg, #1B5E20 0%, #66BB6A 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: '1',
                    marginBottom: '0.5rem'
                  }}>3</span>
                  <span className="stat-label" style={{
                    fontSize: '0.875rem',
                    color: '#64748b',
                    fontWeight: '500'
                  }}>Age Groups</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number" style={{
                    display: 'block',
                    fontSize: '2rem',
                    fontWeight: '800',
                    background: 'linear-gradient(135deg, #1B5E20 0%, #66BB6A 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: '1',
                    marginBottom: '0.5rem'
                  }}>100%</span>
                  <span className="stat-label" style={{
                    fontSize: '0.875rem',
                    color: '#64748b',
                    fontWeight: '500'
                  }}>Free Forever</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Catalog - Simplified */}
      {!hasServiceCatalog && (
        <section className="service-catalog-value" style={{ padding: '4rem 0', background: '#f8fafc' }}>
          <div className="container">
            <div className="fade-in" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
              <ShoppingBag size={48} className="text-blue-600" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.75rem' }}>
                Enable Digital Footprint Analysis
              </h3>
              <p style={{ fontSize: '1rem', color: '#64748b', lineHeight: '1.6', marginBottom: '2rem' }}>
                Add your family's apps and services to unlock privacy analysis, personalized recommendations, and safety alerts.
              </p>
              <Link 
                to="/service-catalog" 
                className="button primary"
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '0.5rem',
                  fontSize: '1rem',
                  padding: '0.875rem 2rem',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  color: 'white',
                  fontWeight: '600',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.25)';
                }}
              >
                <ShoppingBag size={20} />
                Add Services
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Quick Actions - Simplified */}
      <section className="quick-actions" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="section-header fade-in" style={{ marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: '700',
              color: '#0f172a',
              marginBottom: '0.75rem',
              textAlign: 'center'
            }}>
              Get Started
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#64748b',
              maxWidth: '600px',
              margin: '0 auto',
              textAlign: 'center',
              lineHeight: '1.6'
            }}>
              Choose your path and begin learning about digital privacy today.
            </p>
          </div>

          <div className="quick-actions-grid" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {/* Simplified Quick Actions - Show only 3 main actions */}
            {quickActions.slice(0, 3).map((action, index) => (
              <Link 
                key={index} 
                to={action.link} 
                className="quick-action-card fade-in" 
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  background: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  padding: '2.5rem 2rem',
                  textAlign: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.3s ease',
                  display: 'block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#1B5E20';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: action.bgColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem'
                }}>
                  <action.icon size={28} className={action.color} />
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#0f172a',
                  marginBottom: '0.75rem'
                }}>
                  {action.title}
                </h3>
                <p style={{
                  fontSize: '0.9375rem',
                  color: '#64748b',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem'
                }}>
                  {action.description}
                </p>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#1B5E20',
                  fontWeight: '600',
                  fontSize: '0.9375rem'
                }}>
                  Get Started
                  <ArrowRight size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Family Personas - Simplified */}
      <section className="family-personas" style={{ padding: '5rem 0', background: '#ffffff' }}>
        <div className="container">
          <div className="section-header fade-in" style={{ marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: '700',
              color: '#0f172a',
              marginBottom: '0.75rem',
              textAlign: 'center'
            }}>Which Family Are You?</h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#64748b',
              maxWidth: '600px',
              margin: '0 auto',
              textAlign: 'center',
              lineHeight: '1.6'
            }}>Discover your family's privacy profile and get personalized recommendations</p>
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
      <section className="parent-steps" style={{ padding: '5rem 0', background: '#f8fafc' }}>
        <div className="container">
          <div className="section-header fade-in" style={{ marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: '700',
              color: '#0f172a',
              marginBottom: '0.75rem',
              textAlign: 'center'
            }}>How PandaGarde Works</h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#64748b',
              maxWidth: '600px',
              margin: '0 auto',
              textAlign: 'center',
              lineHeight: '1.6'
            }}>Four simple steps to help your family learn about digital privacy and online safety.</p>
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
      <section className="age-groups-simple" style={{ padding: '5rem 0', background: '#f8fafc' }}>
        <div className="container">
          <div className="section-header fade-in" style={{ marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: '700',
              color: '#0f172a',
              marginBottom: '0.75rem',
              textAlign: 'center'
            }}>Content Designed for Your Child's Age</h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#64748b',
              maxWidth: '600px',
              margin: '0 auto',
              textAlign: 'center',
              lineHeight: '1.6'
            }}>Age-appropriate activities and lessons that match your child's understanding and needs.</p>
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

      {/* Key Features - Parent-Focused Benefits */}
      <section className="key-features" style={{ padding: '5rem 0', background: '#ffffff' }}>
        <div className="container">
          <div className="section-header fade-in" style={{ marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: '700',
              color: '#0f172a',
              marginBottom: '0.75rem',
              textAlign: 'center'
            }}>Why Parents Love PandaGarde</h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#64748b',
              maxWidth: '600px',
              margin: '0 auto',
              textAlign: 'center',
              lineHeight: '1.6'
            }}>Everything you need to teach your children about online safety, all in one place.</p>
          </div>

          <div className="features-grid">
            <div className="feature-card fade-in">
              <div className="feature-icon">
                <Shield size={32} className="text-green-500" />
              </div>
              <h3>Age-Appropriate Content</h3>
              <p>Carefully designed activities and lessons for children ages 5-17. Each age group gets content that matches their understanding and needs.</p>
            </div>

            <div className="feature-card fade-in">
              <div className="feature-icon">
                <Heart size={32} className="text-red-500" />
              </div>
              <h3>Learn Together as a Family</h3>
              <p>Resources designed for parents and children to explore together. Build healthy digital habits as a family with guided conversations and activities.</p>
            </div>

            <div className="feature-card fade-in">
              <div className="feature-icon">
                <Star size={32} className="text-yellow-500" />
              </div>
              <h3>Fun & Engaging Activities</h3>
              <p>8 interactive activities including games, stories, and hands-on learning. Your children will enjoy learning about privacy and online safety.</p>
            </div>

            <div className="feature-card fade-in">
              <div className="feature-icon">
                <BookOpen size={32} className="text-blue-500" />
              </div>
              <h3>Practical Tools & Resources</h3>
              <p>Downloadable guides, printable materials, and step-by-step instructions to help you protect your family's privacy in real life.</p>
            </div>

            <div className="feature-card fade-in">
              <div className="feature-icon">
                <Users size={32} className="text-purple-500" />
              </div>
              <h3>Track Your Family's Progress</h3>
              <p>See what your children are learning, celebrate their achievements, and monitor their understanding of digital privacy concepts.</p>
            </div>

            <div className="feature-card fade-in">
              <div className="feature-icon">
                <CheckCircle size={32} className="text-emerald-500" />
              </div>
              <h3>100% Free Forever</h3>
              <p>All features, activities, and resources are completely free. No hidden costs, no premium tiers—just quality privacy education for every family.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Learn More Links - Simplified */}
      <section className="learn-more" style={{ padding: '5rem 0', background: '#f8fafc' }}>
        <div className="container">
          <div className="section-header fade-in" style={{ marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: '700',
              color: '#0f172a',
              marginBottom: '0.75rem',
              textAlign: 'center'
            }}>Helpful Resources for Parents</h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#64748b',
              maxWidth: '600px',
              margin: '0 auto',
              textAlign: 'center',
              lineHeight: '1.6'
            }}>Everything you need to get started and support your family's digital privacy journey.</p>
          </div>

          <div className="learn-more-grid">
            <Link to="/quick-start" className="learn-more-card fade-in">
              <div className="card-icon">
                <Play size={24} />
              </div>
              <h3>Quick Start Guide</h3>
              <p>Get started in 5 minutes with our simple step-by-step guide</p>
              <div className="card-arrow">
                <ArrowRight size={16} />
              </div>
            </Link>

            <Link to="/parent-resources" className="learn-more-card fade-in">
              <div className="card-icon">
                <BookOpen size={24} />
              </div>
              <h3>Parent Resources</h3>
              <p>Guides, conversation starters, and tools to help you teach your children</p>
              <div className="card-arrow">
                <ArrowRight size={16} />
              </div>
            </Link>

            <Link to="/resources" className="learn-more-card fade-in">
              <div className="card-icon">
                <Users size={24} />
              </div>
              <h3>Downloadable Materials</h3>
              <p>Printable activities, certificates, and family agreements</p>
              <div className="card-arrow">
                <ArrowRight size={16} />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Community Section - Simplified */}
      <section className="community-section" style={{ padding: '5rem 0', background: '#ffffff' }}>
        <div className="container">
          <div className="section-header fade-in text-center" style={{ marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: '700',
              color: '#0f172a',
              marginBottom: '0.75rem',
              textAlign: 'center'
            }}>Join Our Privacy-First Community</h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#64748b',
              maxWidth: '600px',
              margin: '0 auto',
              textAlign: 'center',
              lineHeight: '1.6'
            }}>
              Connect with other families and discover privacy resources—all while maintaining complete privacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Link to="/community/forum" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all transform hover:scale-105 text-center" style={{ backgroundColor: 'var(--card-color)' }}>
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <MessageCircle size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--primary)' }}>
                Privacy Tips Forum
              </h3>
              <p className="text-gray-600 mb-4">
                Share tips, ask questions, and learn from other parents in our pseudonymous discussion forum.
              </p>
              <span className="text-green-600 font-semibold">Join Forum →</span>
            </Link>

            <Link to="/community/stories" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all transform hover:scale-105 text-center" style={{ backgroundColor: 'var(--card-color)' }}>
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <Heart size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--primary)' }}>
                Success Stories
              </h3>
              <p className="text-gray-600 mb-4">
                Read and share anonymous success stories about teaching privacy to children.
              </p>
              <span className="text-green-600 font-semibold">View Stories →</span>
            </Link>

            <Link to="/community/resources" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all transform hover:scale-105 text-center" style={{ backgroundColor: 'var(--card-color)' }}>
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <Globe size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--primary)' }}>
                Community Resources
              </h3>
              <p className="text-gray-600 mb-4">
                Discover privacy tools and resources shared and voted on by the community.
              </p>
              <span className="text-green-600 font-semibold">Browse Resources →</span>
            </Link>
          </div>

          <div className="mt-8 text-center">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 inline-block">
              <p className="text-sm text-green-800">
                <strong>Privacy First:</strong> All community features use localStorage—your data never leaves your device. No backend required, completely anonymous.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Parent-Focused */}
      <section className="cta-section" style={{ padding: '4rem 0', background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)', color: 'white' }}>
        <div className="container">
          <div className="fade-in text-center">
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: '700',
              color: 'white',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>Start Protecting Your Family Today</h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '2rem',
              maxWidth: '700px',
              margin: '0 auto 2rem',
              textAlign: 'center',
              lineHeight: '1.6'
            }}>
              Join families who are teaching their children essential digital privacy skills through fun, interactive learning.
            </p>
            <div className="cta-buttons" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/privacy-panda" className="button primary" style={{ background: 'white', color: '#1B5E20', fontWeight: '600' }}>
                <Play size={20} />
                Start Learning Now
              </Link>
              <Link to="/quick-start" className="button secondary" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '2px solid white' }}>
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