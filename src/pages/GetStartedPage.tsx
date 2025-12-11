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
    <main id="main-content" style={{ minHeight: '100vh', paddingTop: '80px' }}>
      {/* Back Navigation */}
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem' }}>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          style={{ textDecoration: 'none' }}
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>

      {/* Header */}
      <header style={{ 
        background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)', 
        color: 'white', 
        padding: '4rem 0',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Get Started with PandaGarde
          </h1>
          <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
            Follow our step-by-step guide to begin your family's digital privacy education journey.
          </p>
        </div>
      </header>

      {/* Steps Section */}
      <section style={{ padding: '4rem 0', background: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              marginBottom: '1rem',
              color: 'var(--primary)',
              textAlign: 'center'
            }}>
              Getting Started Steps
            </h2>
            <p style={{ 
              fontSize: '1.125rem', 
              color: 'var(--gray-600)',
              textAlign: 'center',
              marginBottom: '3rem'
            }}>
              Follow these steps to set up your family's privacy education journey.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.id}
                    style={{
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      padding: '1.5rem',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      border: '1px solid #e5e7eb'
                    }}
                  >
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                      <div style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        fontSize: '1.5rem',
                        fontWeight: 'bold'
                      }}>
                        {index + 1}
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                          <Icon size={20} style={{ color: 'var(--primary)' }} />
                          <h3 style={{ 
                            fontSize: '1.25rem', 
                            fontWeight: 'bold',
                            color: 'var(--primary)',
                            margin: 0
                          }}>
                            {step.title}
                          </h3>
                        </div>

                        <p style={{ 
                          fontSize: '1rem', 
                          color: 'var(--gray-600)',
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
                            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                            color: 'white',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontWeight: '600',
                            transition: 'opacity 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                          onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
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
      <section style={{ padding: '4rem 0', background: '#f8fafc' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            marginBottom: '1rem',
            color: 'var(--primary)',
            textAlign: 'center'
          }}>
            Quick Start Options
          </h2>
          <p style={{ 
            fontSize: '1.125rem', 
            color: 'var(--gray-600)',
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
          }}>
            <Link
              to="/activity-book"
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '2rem',
                textAlign: 'center',
                textDecoration: 'none',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
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
                color: 'var(--primary)',
                marginBottom: '0.5rem'
              }}>
                Start with Activities
              </h3>
              <p style={{ color: 'var(--gray-600)', marginBottom: '1rem' }}>
                Jump straight into interactive privacy activities.
              </p>
            </Link>

            <Link
              to="/family-hub"
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '2rem',
                textAlign: 'center',
                textDecoration: 'none',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
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
                color: 'var(--primary)',
                marginBottom: '0.5rem'
              }}>
                Set Up Family Hub
              </h3>
              <p style={{ color: 'var(--gray-600)', marginBottom: '1rem' }}>
                Create your family profile and track progress.
              </p>
            </Link>

            <Link
              to="/story"
              style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '2rem',
                textAlign: 'center',
                textDecoration: 'none',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
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
                color: 'var(--primary)',
                marginBottom: '0.5rem'
              }}>
                Read Our Story
              </h3>
              <p style={{ color: 'var(--gray-600)', marginBottom: '1rem' }}>
                Learn about Privacy Panda through storytelling.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{ 
        padding: '4rem 0', 
        background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)', 
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Ready to Begin Your Privacy Education Journey?
          </h2>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto 2rem' }}>
            Join thousands of families who are already learning about digital privacy with PandaGarde.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/activity-book"
              style={{
                backgroundColor: 'white',
                color: '#1B5E20',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Play size={20} />
              Start Learning
            </Link>
            <Link
              to="/family-hub"
              style={{
                backgroundColor: '#2E7D32',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
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
