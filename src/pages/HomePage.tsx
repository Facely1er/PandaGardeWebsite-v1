import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, ArrowRight, Play, Heart, Sparkles, Star, Shield, Baby, User, GraduationCap, ShoppingBag, BarChart3, Unlock, AlertTriangle, Target, Settings, CheckCircle, MessageCircle, Globe, X } from 'lucide-react';
import { getAllPersonas, FamilyPersonaProfiles, type FamilyPersonaProfile } from '../data/familyPersonaProfiles';
import { useJourneyProgress } from '../hooks/useJourneyProgress';
import { useFamily } from '../contexts/FamilyContext';
import OnboardingFlow from '../components/OnboardingFlow';
import FeatureUnlockCelebration from '../components/FeatureUnlockCelebration';
import { logger } from '../lib/logger';
import { trackEvent, AnalyticsEvents } from '../lib/analytics';
import Logo from '../components/Logo';

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

  // Hero text carousel messages
  const heroMessages = [
    'Teach your children digital privacy and online safety through fun, interactive activities. Everything you need to protect your family—all in one place, completely free.',
    'Empower your family with age-appropriate privacy education. Interactive games, activities, and resources designed to keep kids safe online.',
    'Build digital citizenship skills through engaging content. From privacy basics to advanced safety strategies—all tailored for your family.',
    'Join thousands of families learning together. Free resources, expert guidance, and a supportive community to help you navigate digital privacy.'
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Carousel rotation effect
  useEffect(() => {
    // Skip carousel if family persona is set (shows personalized message)
    if (familyPersona) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % heroMessages.length);
        setIsTransitioning(false);
      }, 300); // Half of transition duration
    }, 5000); // Change message every 5 seconds

    return () => clearInterval(interval);
  }, [familyPersona, heroMessages.length]);

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

      {/* Hero Section - Two Column Layout */}
      <section className="hero-simple" style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
        position: 'relative',
        overflow: 'hidden',
        padding: '2rem 0 2.5rem'
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
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '2rem',
            alignItems: 'flex-start',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {/* Left Column - Text Content */}
            <div className="hero-text slide-in-left" style={{ textAlign: 'left' }}>
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
                marginBottom: '1.25rem'
              }}>
                Digital Privacy Education
              </span>
              <h1 style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                fontWeight: '800',
                lineHeight: '1.1',
                marginBottom: '1.25rem',
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
              <div style={{ 
                minHeight: 'clamp(5.5rem, 8vw, 6.5rem)',
                marginBottom: '2.5rem',
                position: 'relative',
                display: 'flex',
                alignItems: 'flex-start'
              }}>
                <p 
                  className="hero-description" 
                  style={{
                    fontSize: 'clamp(1.125rem, 2vw, 1.25rem)',
                    lineHeight: '1.7',
                    color: '#64748b',
                    margin: 0,
                    maxWidth: '100%',
                    width: '100%',
                    opacity: isTransitioning ? 0 : 1,
                    transform: isTransitioning ? 'translateY(10px)' : 'translateY(0)',
                    transition: 'opacity 0.6s ease, transform 0.6s ease',
                    position: 'absolute',
                    top: 0,
                    left: 0
                  }}
                  key={currentMessageIndex}
                >
                  {familyPersona 
                    ? `${familyPersona.description}. Get personalized recommendations tailored for your family's privacy needs.`
                    : heroMessages[currentMessageIndex]
                  }
                </p>
              </div>

              {/* Simplified Journey Progress - Only show if significant progress */}
              {progress.overallProgress > 25 && (
                <div style={{
                  background: 'rgba(27, 94, 32, 0.05)',
                  borderRadius: '12px',
                  padding: '0.875rem 1.25rem',
                  marginBottom: '1.5rem',
                  border: '1px solid rgba(27, 94, 32, 0.1)',
                  maxWidth: '100%'
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
                gap: '0.875rem',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                marginTop: '0.5rem',
                marginBottom: '2rem'
              }}>
                <Link 
                  to="/quick-start" 
                  className="button primary"
                  style={{
                    background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
                    color: 'white',
                    padding: '0.875rem 2rem',
                    borderRadius: '12px',
                    fontWeight: '600',
                    fontSize: '0.9375rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.625rem',
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
                    padding: '0.875rem 2rem',
                    borderRadius: '12px',
                    fontWeight: '600',
                    fontSize: '0.9375rem',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.625rem',
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
                gap: '2.5rem',
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                paddingTop: '1.5rem',
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

            {/* Right Column - Logo/Image */}
            <div className="hero-image slide-in-right" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '1rem'
            }}>
              <div style={{
                width: '100%',
                maxWidth: '320px',
                aspectRatio: '0.9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, rgba(27, 94, 32, 0.05) 0%, rgba(102, 187, 106, 0.05) 100%)',
                borderRadius: '16px',
                padding: '1rem',
                boxShadow: '0 20px 60px rgba(27, 94, 32, 0.1)'
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <img 
                    src="/LogoPandagarde.png" 
                    alt="PandaGarde Logo" 
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxWidth: '280px',
                      objectFit: 'contain'
                    }}
                    onError={(e) => {
                      // Fallback to Logo component if image fails to load
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const logoDiv = document.createElement('div');
                        logoDiv.style.width = '100%';
                        logoDiv.style.height = '100%';
                        logoDiv.style.display = 'flex';
                        logoDiv.style.alignItems = 'center';
                        logoDiv.style.justifyContent = 'center';
                        parent.appendChild(logoDiv);
                        // Render Logo component would need React, so we'll just hide and show a placeholder
                      }
                    }}
                  />
                </div>
              </div>
              
              {/* Pilot Banner - Descriptive, Centered Below Image */}
              {showPilotBanner && !familyPersona && !hasServiceCatalog && (
                <div className="fade-in" style={{
                  background: 'linear-gradient(135deg, #9333ea 0%, #3b82f6 100%)',
                  color: 'white',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  boxShadow: '0 4px 16px rgba(147, 51, 234, 0.3)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  maxWidth: '320px',
                  width: '100%',
                  textAlign: 'center',
                  transition: 'transform 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', width: '100%', justifyContent: 'space-between' }}>
                    <Sparkles size={14} className="text-white" style={{ flexShrink: 0, marginTop: '0.125rem' }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.8125rem', fontWeight: '700', lineHeight: '1.3', marginBottom: '0.125rem' }}>
                        Join the Family Hub Pilot Program
                      </div>
                      <div style={{ fontSize: '0.6875rem', lineHeight: '1.3', opacity: 0.95 }}>
                        Get early access to family privacy features and exclusive resources
                      </div>
                    </div>
                    <button
                      onClick={handleBannerDismiss}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'white',
                        padding: '0.125rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background 0.2s',
                        flexShrink: 0,
                        opacity: 0.8,
                        alignSelf: 'flex-start'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                        e.currentTarget.style.opacity = '1';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.opacity = '0.8';
                      }}
                      aria-label="Dismiss banner"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <Link
                    to="/pilot"
                    onClick={handleBannerClick}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.375rem',
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      textDecoration: 'none',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      padding: '0.5rem 1rem',
                      borderRadius: '6px',
                      transition: 'all 0.2s',
                      marginTop: '0.125rem'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    Learn More
                    <ArrowRight size={12} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
