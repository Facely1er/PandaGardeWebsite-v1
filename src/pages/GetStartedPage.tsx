import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, BookOpen, Play, ShoppingBag, BarChart3 } from 'lucide-react';

const GetStartedPage: React.FC = () => {
  const steps = [
    {
      id: 'family-hub',
      title: 'Join PandaGarde Platform',
      description: 'Create your family profile and access the complete privacy education ecosystem.',
      icon: Users,
      link: '/family-hub',
      action: 'Join Platform'
    },
    {
      id: 'service-catalog',
      title: 'Add Services for Digital Footprint Analysis',
      description: 'Tell us which apps and services your family uses. This enables Digital Footprint Analysis, privacy recommendations, and safety alerts.',
      icon: ShoppingBag,
      link: '/service-catalog',
      action: 'Add Services'
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
      id: 'advanced-features',
      title: 'View Your Digital Footprint Analysis',
      description: 'See your family\'s privacy exposure across all services and get personalized recommendations to improve your privacy.',
      icon: BarChart3,
      link: '/digital-footprint',
      action: 'View Analysis'
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
    <main id="main-content" style={{ minHeight: '100vh', paddingTop: '80px', backgroundColor: '#ffffff' }}>
      {/* Back Navigation */}
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem 1.5rem' }}>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          style={{ textDecoration: 'none', color: '#4b5563' }}
          aria-label="Back to home page"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Home
        </Link>
      </div>

      {/* Page Header */}
      <section style={{ padding: 'clamp(3rem, 6vw, 4rem) 0', background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: '800',
              lineHeight: '1.1',
              marginBottom: '1rem',
              color: '#0f172a'
            }}>
              Get Started with PandaGarde
            </h1>
            <p style={{
              fontSize: '1.125rem',
              color: '#64748b',
              maxWidth: '48rem',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Follow our step-by-step guide to begin your family's digital privacy education journey.
            </p>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section aria-labelledby="steps-heading" style={{ padding: 'clamp(4rem, 8vw, 6rem) 0', background: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 id="steps-heading" style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              color: '#1B5E20',
              textAlign: 'center'
            }}>
              Getting Started Steps
            </h2>
            <p style={{ 
              fontSize: '1.125rem', 
              color: '#757575',
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
                      backgroundColor: '#ffffff',
                      borderRadius: '12px',
                      padding: '1.5rem',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      border: '1px solid #e5e7eb'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                      <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        fontSize: '1.5rem',
                        fontWeight: 'bold'
                      }}>
                        {index + 1}
                      </div>

                      <div style={{ flex: 1, minWidth: '200px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                          <Icon size={20} style={{ color: '#1B5E20' }} />
                          <h3 style={{ 
                            fontSize: '1.25rem', 
                            fontWeight: 'bold',
                            color: '#1B5E20',
                            margin: 0
                          }}>
                            {step.title}
                          </h3>
                        </div>

                        <p style={{ 
                          fontSize: '1rem', 
                          color: '#757575',
                          marginBottom: '1rem',
                          lineHeight: '1.6'
                        }}>
                          {step.description}
                        </p>

                        <Link
                          to={step.link}
                          style={{
                            display: 'inline-block',
                            padding: '0.75rem 1.5rem',
                            background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
                            color: '#ffffff',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontWeight: '600',
                            transition: 'all 0.2s ease'
                          }}
                          aria-label={`${step.action}: ${step.title}`}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.opacity = '0.9';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.opacity = '1';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
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
        </div>
      </section>

      {/* Quick Start Options */}
      <section aria-labelledby="quick-start-heading" style={{ padding: 'clamp(4rem, 8vw, 6rem) 0', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <h2 id="quick-start-heading" style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            marginBottom: '1rem',
            color: '#1B5E20',
            textAlign: 'center'
          }}>
            Quick Start Options
          </h2>
          <p style={{ 
            fontSize: '1.125rem', 
            color: '#757575',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            Jump right into specific areas or follow the complete guide.
          </p>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            maxWidth: '900px',
            margin: '0 auto'
          }} role="list" aria-label="Quick start options">
            <Link
              to="/activity-book"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '2rem',
                textAlign: 'center',
                textDecoration: 'none',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s ease',
                display: 'block'
              }}
              aria-label="Start with Activities - Jump straight into interactive privacy activities"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <Play size={32} />
              </div>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 'bold',
                color: '#1B5E20',
                marginBottom: '0.5rem'
              }}>
                Start with Activities
              </h3>
              <p style={{ color: '#757575', marginBottom: '1rem' }}>
                Jump straight into interactive privacy activities.
              </p>
            </Link>

            <Link
              to="/family-hub"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '2rem',
                textAlign: 'center',
                textDecoration: 'none',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s ease',
                display: 'block'
              }}
              aria-label="Set Up Family Hub - Create your family profile and track progress"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <Users size={32} />
              </div>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 'bold',
                color: '#1B5E20',
                marginBottom: '0.5rem'
              }}>
                Set Up Family Hub
              </h3>
              <p style={{ color: '#757575', marginBottom: '1rem' }}>
                Create your family profile and track progress.
              </p>
            </Link>

            <Link
              to="/story"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '2rem',
                textAlign: 'center',
                textDecoration: 'none',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.2s ease',
                display: 'block'
              }}
              aria-label="Read Our Story - Learn about Privacy Panda through storytelling"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem'
              }}>
                <BookOpen size={32} />
              </div>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 'bold',
                color: '#1B5E20',
                marginBottom: '0.5rem'
              }}>
                Read Our Story
              </h3>
              <p style={{ color: '#757575', marginBottom: '1rem' }}>
                Learn about Privacy Panda through storytelling.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section 
        aria-labelledby="cta-heading"
        style={{ 
          padding: 'clamp(4rem, 8vw, 6rem) 0', 
          background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)', 
          color: '#ffffff',
          textAlign: 'center'
        }}
      >
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <h2 id="cta-heading" style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#ffffff' }}>
            Ready to Begin Your Privacy Education Journey?
          </h2>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto 2rem', color: '#ffffff' }}>
            Join thousands of families who are already learning about digital privacy with PandaGarde.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/activity-book"
              style={{
                backgroundColor: '#ffffff',
                color: '#1B5E20',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease'
              }}
              aria-label="Start Learning - Begin interactive privacy activities"
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.9';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Play size={20} />
              Start Learning
            </Link>
            <Link
              to="/family-hub"
              style={{
                backgroundColor: '#2E7D32',
                color: '#ffffff',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease'
              }}
              aria-label="Family Hub - Create your family profile"
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.9';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.backgroundColor = '#1B5E20';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.backgroundColor = '#2E7D32';
              }}
            >
              <Users size={20} />
              Family Hub
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GetStartedPage;
