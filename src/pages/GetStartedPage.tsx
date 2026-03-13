import React from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, Play, ShoppingBag, BarChart3, Rocket, Scale } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import { PRIVACY_PORTAL_URL } from '../config/portal';

const GetStartedPage: React.FC = () => {
  // Journey centered on Digital Footprint Analysis: Add services → View analysis → Rest of ecosystem
  const steps = [
    {
      id: 'service-catalog',
      title: 'Add Your Family’s Services',
      description: 'Tell us which apps and services your family uses. Adding at least 3 services unlocks your Digital Footprint Analysis—the central view of your family’s privacy.',
      icon: ShoppingBag,
      link: '/service-catalog',
      action: 'Add Services'
    },
    {
      id: 'digital-footprint',
      title: 'View Digital Footprint Analysis',
      description: 'Your central privacy view: see exposure scores, high-risk services, and personalized recommendations. This is the heart of your PandaGarde journey.',
      icon: BarChart3,
      link: '/digital-footprint',
      action: 'View Analysis'
    },
    {
      id: 'family-hub',
      title: 'Join PandaGarde Platform',
      description: 'Create your family profile and access the complete privacy education ecosystem.',
      icon: Users,
      link: '/family-hub',
      action: 'Join Platform'
    },
    {
      id: 'first-activity',
      title: 'Start Privacy Panda Learning',
      description: 'Begin interactive stories and activities designed for your child\'s age group.',
      icon: Play,
      link: '/privacy-panda',
      action: 'Start Learning'
    },
    {
      id: 'explore-resources',
      title: 'Access Resources',
      description: 'Download guides, activities, and printable materials for continued learning.',
      icon: BookOpen,
      link: '/resources',
      action: 'Access Resources'
    }
  ];

  return (
    <PageLayout
      title="Get Started"
      subtitle="Your journey centers on Digital Footprint Analysis: add the services your family uses, then view your privacy analysis and recommendations."
      icon={Rocket}
      badge="GET STARTED"
      breadcrumbs={true}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          {/* Steps Section */}
          <section style={{ padding: '2rem 0', marginBottom: '3rem' }} aria-labelledby="steps-heading">
            <div style={{ maxWidth: '100%', margin: '0 auto' }}>
              <h2 
                id="steps-heading" 
                style={{
                  fontSize: '1.875rem',
                  fontWeight: 700,
                  textAlign: 'center',
                  marginBottom: '0.75rem',
                  color: '#1B5E20'
                }}
              >
                Getting Started Steps
              </h2>
              <p style={{
                fontSize: '1.125rem',
                color: '#4B5563',
                textAlign: 'center',
                marginBottom: '3rem'
              }}>
                Follow these steps to set up your family's privacy education journey.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} role="list" aria-label="Getting started steps">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div
                      key={step.id}
                      role="listitem"
                      style={{
                        backgroundColor: '#FFFFFF',
                        borderRadius: '0.75rem',
                        padding: '1.5rem',
                        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                        border: '1px solid #E5E7EB'
                      }}
                    >
                      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                        <div style={{
                          flexShrink: 0,
                          width: '4rem',
                          height: '4rem',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.25rem',
                          fontWeight: 700
                        }}>
                          {index + 1}
                        </div>

                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                            <Icon size={24} style={{ color: '#1B5E20', flexShrink: 0 }} />
                            <h3 style={{
                              fontSize: '1.25rem',
                              fontWeight: 700,
                              color: '#1B5E20'
                            }}>
                              {step.title}
                            </h3>
                          </div>

                          <p style={{
                            color: '#4B5563',
                            marginBottom: '1rem',
                            lineHeight: 1.75
                          }}>
                            {step.description}
                          </p>

                          <Link
                            to={step.link}
                            style={{
                              display: 'inline-block',
                              padding: '0.75rem 1.5rem',
                              background: 'linear-gradient(90deg, #1B5E20 0%, #2E7D32 100%)',
                              color: '#FFFFFF',
                              borderRadius: '0.5rem',
                              fontWeight: 600,
                              textDecoration: 'none'
                            }}
                            aria-label={`${step.action}: ${step.title}`}
                          >
                            {step.action}
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Quick Start Options */}
          <section style={{
            padding: '3rem 0',
            backgroundColor: '#F9FAFB',
            borderRadius: '0.5rem',
            marginBottom: '3rem'
          }} aria-labelledby="quick-start-heading">
            <div style={{ maxWidth: '100%', margin: '0 auto' }}>
              <h2 
                id="quick-start-heading" 
                style={{
                  fontSize: '1.875rem',
                  fontWeight: 700,
                  textAlign: 'center',
                  marginBottom: '0.75rem',
                  color: '#1B5E20'
                }}
              >
                Quick Start Options
              </h2>
              <p style={{
                fontSize: '1.125rem',
                color: '#4B5563',
                textAlign: 'center',
                marginBottom: '3rem'
              }}>
                Jump right into specific areas or follow the complete guide.
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1.5rem',
                maxWidth: '100%',
                margin: '0 auto'
              }}>
                <Link
                  to="/activity-book"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '0.75rem',
                    padding: '2rem',
                    textAlign: 'center',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                    border: '1px solid #E5E7EB',
                    textDecoration: 'none',
                    display: 'block'
                  }}
                  aria-label="Start with Activities - Jump straight into interactive privacy activities"
                >
                  <div style={{
                    width: '4rem',
                    height: '4rem',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem'
                  }}>
                    <Play size={32} />
                  </div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#1B5E20',
                    marginBottom: '0.5rem'
                  }}>
                    Start with Activities
                  </h3>
                  <p style={{ color: '#4B5563' }}>
                    Jump straight into interactive privacy activities.
                  </p>
                </Link>

                <Link
                  to="/family-hub"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '0.75rem',
                    padding: '2rem',
                    textAlign: 'center',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                    border: '1px solid #E5E7EB',
                    textDecoration: 'none',
                    display: 'block'
                  }}
                  aria-label="Set Up Family Hub - Create your family profile and track progress"
                >
                  <div style={{
                    width: '4rem',
                    height: '4rem',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem'
                  }}>
                    <Users size={32} />
                  </div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#1B5E20',
                    marginBottom: '0.5rem'
                  }}>
                    Set Up Family Hub
                  </h3>
                  <p style={{ color: '#4B5563' }}>
                    Create your family profile and track progress.
                  </p>
                </Link>

                <Link
                  to="/privacy-panda"
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '0.75rem',
                    padding: '2rem',
                    textAlign: 'center',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                    border: '1px solid #E5E7EB',
                    textDecoration: 'none',
                    display: 'block'
                  }}
                  aria-label="Read Our Story - Learn about Privacy Panda through storytelling"
                >
                  <div style={{
                    width: '4rem',
                    height: '4rem',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem'
                  }}>
                    <BookOpen size={32} />
                  </div>
                  <h3 style={{
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    color: '#1B5E20',
                    marginBottom: '0.5rem'
                  }}>
                    Read Our Story
                  </h3>
                  <p style={{ color: '#4B5563' }}>
                    Learn about Privacy Panda through storytelling.
                  </p>
                </Link>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section 
            style={{
              padding: '3rem 0',
              background: 'linear-gradient(90deg, #1B5E20 0%, #2E7D32 100%)',
              color: '#FFFFFF',
              textAlign: 'center',
              borderRadius: '0.5rem',
              marginBottom: '3rem'
            }}
            aria-labelledby="cta-heading"
          >
            <div style={{ maxWidth: '100%', margin: '0 auto' }}>
              <h2 
                id="cta-heading" 
                style={{
                  fontSize: 'clamp(1.875rem, 4vw, 2.25rem)',
                  fontWeight: 700,
                  marginBottom: '1rem',
                  color: '#FFFFFF'
                }}
              >
                Ready to Begin Your Privacy Education Journey?
              </h2>
              <p style={{
                fontSize: '1.25rem',
                marginBottom: '2rem',
                opacity: 0.9,
                color: '#FFFFFF'
              }}>
                Start learning about digital privacy with PandaGarde's comprehensive resources and activities.
              </p>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Link
                  to="/activity-book"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    backgroundColor: '#FFFFFF',
                    color: '#1B5E20',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                  aria-label="Start Learning - Begin interactive privacy activities"
                >
                  <Play size={20} />
                  <span>Start Learning</span>
                </Link>
                <Link
                  to="/family-hub"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    backgroundColor: '#2E7D32',
                    color: '#FFFFFF',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    fontWeight: 600,
                    border: '2px solid #FFFFFF',
                    textDecoration: 'none'
                  }}
                  aria-label="Family Hub - Create your family profile"
                >
                  <Users size={20} />
                  <span>Family Hub</span>
                </Link>
              </div>
              <p style={{ marginTop: '1.5rem', fontSize: '0.9375rem', opacity: 0.95 }}>
                Maryland residents (MODPA):{' '}
                <a href={PRIVACY_PORTAL_URL} target="_blank" rel="noopener noreferrer" style={{ color: '#FFFFFF', textDecoration: 'underline' }} className="inline-flex items-center gap-1">
                  <Scale size={14} />
                  Exercise your privacy rights
                </a>
              </p>
            </div>
          </section>
      </div>
    </PageLayout>
  );
};

export default GetStartedPage;
