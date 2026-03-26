import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Users, ArrowRight, Play, Heart, Sparkles, Star, Shield, Baby, User, GraduationCap, ShoppingBag, BarChart3, AlertTriangle, Target, Settings, CheckCircle, MessageCircle, Globe, X, Scale, ExternalLink } from 'lucide-react';
import { PRIVACY_PORTAL_URL } from '../config/portal';
import { getAllPersonas, FamilyPersonaProfiles, type FamilyPersonaProfile } from '../data/familyPersonaProfiles';
import { useJourneyProgress } from '../hooks/useJourneyProgress';
import { useFamily } from '../contexts/FamilyContext';
import OnboardingFlow from '../components/OnboardingFlow';
import FeatureUnlockCelebration from '../components/FeatureUnlockCelebration';
import { logger } from '../lib/logger';
import { trackEvent, AnalyticsEvents } from '../lib/analytics';

const HomePage: React.FC = () => {
  const personas = getAllPersonas();
  const { progress, markStepVisited } = useJourneyProgress();
  const { familyMembers, currentFamily } = useFamily();
  const [familyPersona, setFamilyPersona] = useState<FamilyPersonaProfile | null>(null);
  const [showUnlockCelebration, setShowUnlockCelebration] = useState(false);
  const [unlockedFeature, setUnlockedFeature] = useState<string | null>(null);
  const [showPilotBanner, setShowPilotBanner] = useState(() => {
    // Check if user has dismissed the banner
    return !localStorage.getItem('pandagarde_pilot_banner_dismissed');
  });

  // Complements the h1 without repeating “stay safe online”
  const heroMessage =
    "Age-appropriate privacy education with fun activities, expert guidance, and it's 100% free.";

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
      setUnlockedFeature('Privacy Report Card');
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

  // Simplified customer journey - parent-friendly language
  const customerJourney = [
    {
      step: 1,
      title: 'Create Your Family Profile',
      description: 'Set up your family account to access all our privacy education resources',
      icon: Users,
      link: '/family-hub',
      platform: 'PandaGarde'
    },
    {
      step: 2,
      title: 'Tell Us What Apps Your Kids Use',
      description: 'Share which apps your family uses (like TikTok, Roblox, YouTube). We\'ll show you privacy tips for those apps.',
      icon: ShoppingBag,
      link: '/service-catalog',
      platform: 'PandaGarde',
      enables: ['Privacy Report Card', 'App Safety Tips', 'Privacy Alerts'],
      isFoundation: true
    },
    {
      step: 3,
      title: 'Start Learning with Privacy Panda',
      description: 'Begin fun, interactive stories and activities designed for your child\'s age',
      icon: Play,
      link: '/privacy-panda',
      platform: 'Privacy Panda'
    },
    {
      step: 4,
      title: 'See Your Privacy Report Card',
      description: 'Get a simple report showing which apps share the most data and how to make them safer',
      icon: BarChart3,
      link: '/digital-footprint',
      platform: 'PandaGarde',
      requires: 'Step 2: Tell Us What Apps Your Kids Use'
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
    <>
      {/* Hero Section - Two Column Layout (Outside main-content for proper positioning) */}
      <section className="hero-simple" style={{ 
        paddingTop: familyPersona ? '1rem' : '0px',
        paddingBottom: '0px'
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
          <div className="hero-content">
            {/* Left Column - Text Content */}
            <div className="hero-text slide-in-left" style={{ textAlign: 'left' }}>
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                <span className="badge" style={{
                  background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
                  color: 'white',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '50px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  display: 'inline-block'
                }}>
                  Digital Privacy Education
                </span>
                <span className="badge" style={{
                  background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                  color: 'white',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '50px',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  letterSpacing: '0.5px',
                  display: 'inline-block',
                  border: '2px solid rgba(255, 255, 255, 0.3)'
                }}>
                  New? Start Here
                </span>
              </div>
              <h1 className="hero-heading" style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                fontWeight: '800',
                lineHeight: '1.2',
                marginBottom: '1.25rem',
                letterSpacing: '-0.02em'
              }}>
                <span className="hero-heading-row">Help Your Kids Stay</span>
                <span className="hero-heading-row">
                  Safe <span className="hero-heading-highlight">Online</span>
                </span>
              </h1>
              <p
                className="hero-description"
                style={{
                  fontSize: 'clamp(1.125rem, 2vw, 1.25rem)',
                  lineHeight: '1.7',
                  margin: '0 0 1.5rem 0',
                  color: 'var(--gray-700)'
                }}
              >
                {familyPersona
                  ? `${familyPersona.description}. Get personalized recommendations tailored for your family's privacy needs.`
                  : heroMessage
                }
              </p>

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

              <div className="hero-buttons">
                <Link 
                  to="/service-catalog" 
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
                  <BarChart3 size={20} />
                  See your Digital Footprint
                  <ArrowRight size={16} />
                </Link>
                <Link 
                  to="/get-started" 
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
                  <Play size={20} />
                  Start Learning
                  <ArrowRight size={16} />
                </Link>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 text-center">
                Central journey: <Link to="/service-catalog" className="underline hover:text-green-700 dark:hover:text-green-300">Service Catalog</Link>
                {' → '}
                <Link to="/digital-footprint" className="underline hover:text-green-700 dark:hover:text-green-300">Digital Footprint Analysis</Link>
              </p>

              {/* Simplified Stats */}
              <div className="hero-stats hero-stats--compact" style={{ paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
                <div className="stat-item">
                  <span className="stat-number" style={{
                    display: 'block',
                    fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                    fontWeight: '800',
                    background: 'linear-gradient(135deg, #1B5E20 0%, #66BB6A 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: '1',
                    marginBottom: '0.25rem'
                  }}>3</span>
                  <span className="stat-label" style={{
                    fontSize: '0.75rem',
                    color: '#64748b',
                    fontWeight: '500'
                  }}>Age Groups</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number" style={{
                    display: 'block',
                    fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                    fontWeight: '800',
                    background: 'linear-gradient(135deg, #1B5E20 0%, #66BB6A 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    lineHeight: '1',
                    marginBottom: '0.25rem'
                  }}>100%</span>
                  <span className="stat-label" style={{
                    fontSize: '0.75rem',
                    color: '#64748b',
                    fontWeight: '500'
                  }}>Free to Use</span>
                </div>
              </div>
            </div>

            {/* Right Column - Logo/Image */}
            <div className="slide-in-right" style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '1rem',
              width: '100%'
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
                  background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
                  color: 'white',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  boxShadow: '0 4px 16px rgba(27, 94, 32, 0.35)',
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
                        Join the PandaGarde Pilot 2026
                      </div>
                      <div style={{ fontSize: '0.6875rem', lineHeight: '1.3', opacity: 0.95 }}>
                        Key dates and early access—apply by the deadline and build momentum
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

      <div id="main-content">
        <OnboardingFlow />

        {/* MODPA awareness banner — shown to all visitors above the fold */}
        <section
          className="fade-in"
          style={{ background: 'linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%)', borderBottom: '2px solid #4db6ac' }}
        >
          <div className="container" style={{ padding: '0.875rem 1.5rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flex: 1, minWidth: 0 }}>
                <div style={{ flexShrink: 0, width: '32px', height: '32px', borderRadius: '50%', background: '#00897b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Scale size={16} color="white" />
                </div>
                <div>
                  <span style={{ fontSize: '0.8125rem', fontWeight: '700', color: '#004d40', display: 'block', lineHeight: 1.3 }}>
                    Maryland families: your new MODPA rights are active
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#00695c', lineHeight: 1.3 }}>
                    Access, correct, delete your data — and opt out of sale and targeted advertising.
                  </span>
                </div>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', flexShrink: 0 }}>
                <Link
                  to="/digital-rights"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', background: '#00897b', color: 'white', textDecoration: 'none', fontSize: '0.75rem', fontWeight: '600', padding: '0.375rem 0.875rem', borderRadius: '6px', transition: 'background 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#00695c'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#00897b'; }}
                >
                  Learn your rights
                  <ArrowRight size={12} />
                </Link>
                <a
                  href={PRIVACY_PORTAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', background: 'white', color: '#00695c', textDecoration: 'none', fontSize: '0.75rem', fontWeight: '600', padding: '0.375rem 0.875rem', borderRadius: '6px', border: '1.5px solid #4db6ac', transition: 'background 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#e0f2f1'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'white'; }}
                >
                  <ExternalLink size={12} />
                  Privacy Portal
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Feature Unlock Celebration */}
        {showUnlockCelebration && unlockedFeature && (
          <FeatureUnlockCelebration
            feature={unlockedFeature}
            description="You've unlocked advanced privacy features! See your privacy report card and get personalized tips."
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
            padding: '0.875rem 0',
            marginBottom: 0,
            marginTop: 0
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


      {/* Quick Actions - Simplified */}
      <section className="quick-actions" style={{ padding: 'clamp(4rem, 8vw, 6rem) 0' }}>
        <div className="container">
          <div className="section-header fade-in" style={{ marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: '700',
              color: 'var(--gray-800)',
              marginBottom: '0.75rem',
              textAlign: 'center'
            }}>
              Get Started
            </h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'var(--gray-600)',
              maxWidth: '600px',
              margin: '0 auto',
              textAlign: 'center',
              lineHeight: '1.6'
            }}>
              Choose your path and begin learning about digital privacy today.
            </p>
          </div>

          <div className="quick-actions-grid" style={{ maxWidth: '1000px', margin: '0 auto' }}>
            {quickActions.slice(0, 3).map((action, index) => (
              <Link 
                key={index} 
                to={action.link} 
                className="quick-action-card fade-in" 
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  background: 'var(--card-color)',
                  border: '1px solid var(--gray-300)',
                  borderRadius: '16px',
                  padding: '2.5rem 2rem',
                  textAlign: 'center',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.3s ease',
                  display: 'block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--primary)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--gray-300)';
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
                  color: 'var(--gray-800)',
                  marginBottom: '0.75rem'
                }}>
                  {action.title}
                </h3>
                <p style={{
                  fontSize: '0.9375rem',
                  color: 'var(--gray-600)',
                  lineHeight: '1.6',
                  marginBottom: '1.5rem'
                }}>
                  {action.description}
                </p>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--primary)',
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


      {/* Why PandaGarde - Simplified to 3-4 Benefits */}
      <section className="key-features" style={{ padding: 'clamp(4rem, 8vw, 6rem) 0', background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header fade-in" style={{ marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: '700',
              color: 'var(--gray-800)',
              marginBottom: '0.75rem',
              textAlign: 'center'
            }}>Why PandaGarde?</h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'var(--gray-600)',
              maxWidth: '600px',
              margin: '0 auto',
              textAlign: 'center',
              lineHeight: '1.6'
            }}>Everything you need to teach your children about online safety, all in one place.</p>
          </div>

          <div className="features-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '2rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            <div className="feature-card fade-in" style={{
              background: 'var(--card-color)',
              borderRadius: '16px',
              padding: '2rem',
              border: '1px solid var(--gray-300)',
              textAlign: 'center'
            }}>
              <div className="feature-icon" style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: '#ecfdf5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}>
                <Shield size={32} className="text-green-500" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--gray-800)', marginBottom: '0.75rem' }}>Age-Appropriate Learning</h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--gray-600)', lineHeight: '1.6' }}>Content designed for kids ages 5-17. Each age group gets activities that match what they can understand.</p>
            </div>

            <div className="feature-card fade-in" style={{
              background: 'var(--card-color)',
              borderRadius: '16px',
              padding: '2rem',
              border: '1px solid var(--gray-300)',
              textAlign: 'center'
            }}>
              <div className="feature-icon" style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: '#fef2f2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}>
                <Heart size={32} className="text-red-500" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--gray-800)', marginBottom: '0.75rem' }}>Learn Together as a Family</h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--gray-600)', lineHeight: '1.6' }}>Activities and guides for parents and kids to explore together. Build healthy digital habits as a family.</p>
            </div>

            <div className="feature-card fade-in" style={{
              background: 'var(--card-color)',
              borderRadius: '16px',
              padding: '2rem',
              border: '1px solid var(--gray-300)',
              textAlign: 'center'
            }}>
              <div className="feature-icon" style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: '#fffbeb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}>
                <Star size={32} className="text-yellow-500" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--gray-800)', marginBottom: '0.75rem' }}>Fun & Engaging</h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--gray-600)', lineHeight: '1.6' }}>Interactive stories, games, and activities that make learning about privacy fun and memorable.</p>
            </div>

            <div className="feature-card fade-in" style={{
              background: 'var(--card-color)',
              borderRadius: '16px',
              padding: '2rem',
              border: '1px solid var(--gray-300)',
              textAlign: 'center'
            }}>
              <div className="feature-icon" style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: '#ecfdf5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem'
              }}>
                <CheckCircle size={32} className="text-emerald-500" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--gray-800)', marginBottom: '0.75rem' }}>100% Free</h3>
              <p style={{ fontSize: '0.9375rem', color: 'var(--gray-600)', lineHeight: '1.6' }}>All features, activities, and resources are free. No hidden costs—just quality privacy education for every family.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Parent-Focused */}
      <section className="cta-section" style={{ padding: 'clamp(4rem, 8vw, 6rem) 0', background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)', color: 'white' }}>
        <div className="container">
          <div className="fade-in text-center">
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: '700',
              color: 'white',
              marginBottom: '1rem',
              textAlign: 'center'
            }}>Start Teaching Your Family About Privacy Today</h2>
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
                Start Learning
              </Link>
              <Link to="/features" className="button secondary" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '2px solid white' }}>
                <BookOpen size={20} />
                See What We Offer
              </Link>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default HomePage;
