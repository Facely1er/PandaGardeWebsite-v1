import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Baby, User, GraduationCap, Users, Play, BookOpen, Shield, Heart, Star, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';

const FeaturesPage: React.FC = () => {
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

    const animationElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animationElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <PageLayout
      title="What We Offer"
      subtitle="Everything your family needs to learn about digital privacy and online safety. Fun activities for kids, expert guidance for parents, and tools to track your progress together."
      icon={Sparkles}
      badge="FEATURES"
    >
      {/* For Kids Section */}
      <section className="features-section" style={{ padding: 'clamp(4rem, 8vw, 6rem) 0', background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header fade-in" style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: '700',
              color: 'var(--gray-800)',
              marginBottom: '0.75rem'
            }}>For Kids: Fun Learning Activities</h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'var(--gray-600)',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>Age-appropriate activities that make learning about privacy fun and engaging</p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {[
              {
                age: 'Ages 5-8',
                icon: Baby,
                color: 'from-purple-500 to-pink-500',
                description: 'Stories & Activities',
                link: '/activity-book',
                features: [
                  'Interactive Privacy Panda stories',
                  'Coloring pages and fun activities',
                  'Simple online safety rules',
                  'Family-friendly learning games'
                ]
              },
              {
                age: 'Ages 9-12',
                icon: User,
                color: 'from-blue-500 to-cyan-500',
                description: 'Privacy Explorers',
                link: '/privacy-explorers',
                features: [
                  'Social media privacy basics',
                  'Password security lessons',
                  'Online communication safety',
                  'Critical thinking activities'
                ]
              },
              {
                age: 'Ages 13-17',
                icon: GraduationCap,
                color: 'from-green-500 to-emerald-500',
                description: 'Teen Handbook',
                link: '/teen-handbook',
                features: [
                  'Advanced privacy settings',
                  'Data protection and rights',
                  'Online reputation management',
                  'Digital citizenship skills'
                ]
              }
            ].map((group, index) => {
              const gradientMap: Record<string, string> = {
                'from-purple-500 to-pink-500': 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                'from-blue-500 to-cyan-500': 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                'from-green-500 to-emerald-500': 'linear-gradient(135deg, #22c55e 0%, #10b981 100%)'
              };
              const gradient = gradientMap[group.color] || gradientMap['from-purple-500 to-pink-500'];
              
              return (
                <div 
                  key={index}
                  className="fade-in"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    background: 'var(--card-color)',
                    borderRadius: '16px',
                    padding: '2rem',
                    border: '1px solid var(--gray-300)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <div style={{ 
                    background: gradient,
                    borderRadius: '12px',
                    padding: '1.5rem',
                    marginBottom: '1.5rem',
                    textAlign: 'center',
                    color: 'white'
                  }}>
                    <div style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1rem'
                    }}>
                      <group.icon size={32} style={{ color: 'white' }} />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                      {group.age}
                    </h3>
                    <p style={{ fontSize: '0.9375rem', opacity: 0.9 }}>
                      {group.description}
                    </p>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {group.features.map((feature, idx) => (
                      <li key={idx} style={{ 
                        display: 'flex',
                        alignItems: 'start',
                        marginBottom: '0.75rem',
                        fontSize: '0.9375rem',
                        color: 'var(--gray-700)'
                      }}>
                        <CheckCircle size={18} style={{ color: '#10b981', marginRight: '0.75rem', flexShrink: 0, marginTop: '0.125rem' }} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link 
                    to={group.link}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginTop: '1.5rem',
                      color: 'var(--primary)',
                      fontWeight: '600',
                      textDecoration: 'none',
                      fontSize: '0.9375rem'
                    }}
                  >
                    Explore {group.age}
                    <ArrowRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* For Parents Section */}
      <section className="features-section" style={{ padding: 'clamp(4rem, 8vw, 6rem) 0', background: 'var(--gray-100)' }}>
        <div className="container">
          <div className="section-header fade-in" style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: '700',
              color: 'var(--gray-800)',
              marginBottom: '0.75rem'
            }}>For Parents: Expert Guidance</h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'var(--gray-600)',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>Tools and resources to help you guide your family's digital privacy journey</p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '2rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {[
              {
                icon: BookOpen,
                title: 'Parent Guides',
                description: 'Step-by-step guides on topics like setting up devices safely, choosing age-appropriate apps, and having privacy conversations with your kids.',
                link: '/resources',
                color: '#3b82f6'
              },
              {
                icon: Shield,
                title: 'Privacy Report Card',
                description: 'See which apps your family uses share the most data. Get simple tips to make those apps safer for your kids.',
                link: '/digital-footprint',
                color: '#10b981'
              },
              {
                icon: Users,
                title: 'Family Hub',
                description: 'Connect with other parents, share tips, and access exclusive resources. All while keeping your data private.',
                link: '/family-hub',
                color: '#9333ea'
              },
              {
                icon: Heart,
                title: 'Conversation Starters',
                description: 'Age-appropriate questions and activities to help you talk with your kids about online privacy in a way they\'ll understand.',
                link: '/resources',
                color: '#ef4444'
              }
            ].map((feature, index) => (
              <Link
                key={index}
                to={feature.link}
                className="fade-in"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  background: 'var(--card-color)',
                  borderRadius: '16px',
                  padding: '2rem',
                  border: '1px solid var(--gray-300)',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all 0.3s ease',
                  display: 'block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = feature.color;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = `0 8px 24px ${feature.color}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--gray-300)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  background: `${feature.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem'
                }}>
                  <feature.icon size={28} style={{ color: feature.color }} />
                </div>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '700', 
                  color: 'var(--gray-800)', 
                  marginBottom: '0.75rem' 
                }}>
                  {feature.title}
                </h3>
                <p style={{ 
                  fontSize: '0.9375rem', 
                  color: 'var(--gray-600)', 
                  lineHeight: '1.6',
                  marginBottom: '1rem'
                }}>
                  {feature.description}
                </p>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: feature.color,
                  fontWeight: '600',
                  fontSize: '0.875rem'
                }}>
                  Learn More
                  <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* For Families Section */}
      <section className="features-section" style={{ padding: 'clamp(4rem, 8vw, 6rem) 0', background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header fade-in" style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: '700',
              color: 'var(--gray-800)',
              marginBottom: '0.75rem'
            }}>For Families: Track Progress Together</h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'var(--gray-600)',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>See what your kids are learning and celebrate their privacy education achievements</p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            {[
              {
                icon: Star,
                title: 'Learning Progress',
                description: 'Track which privacy topics your kids have learned and see their progress over time.',
                color: '#f59e0b'
              },
              {
                icon: CheckCircle,
                title: 'Achievements & Certificates',
                description: 'Celebrate milestones with printable certificates and achievement badges.',
                color: '#10b981'
              },
              {
                icon: Play,
                title: 'Family Activities',
                description: 'Fun activities designed for parents and kids to do together, building healthy digital habits as a family.',
                color: '#3b82f6'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="fade-in"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  background: 'var(--card-color)',
                  borderRadius: '16px',
                  padding: '2rem',
                  border: '1px solid var(--gray-300)',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: `${feature.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem'
                }}>
                  <feature.icon size={32} style={{ color: feature.color }} />
                </div>
                <h3 style={{ 
                  fontSize: '1.25rem', 
                  fontWeight: '700', 
                  color: 'var(--gray-800)', 
                  marginBottom: '0.75rem' 
                }}>
                  {feature.title}
                </h3>
                <p style={{ 
                  fontSize: '0.9375rem', 
                  color: 'var(--gray-600)', 
                  lineHeight: '1.6'
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" style={{ padding: 'clamp(4rem, 8vw, 6rem) 0', background: 'linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)', color: 'white' }}>
        <div className="container">
          <div className="fade-in text-center">
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: '700',
              color: 'white',
              marginBottom: '1rem'
            }}>Ready to Get Started?</h2>
            <p style={{
              fontSize: '1.125rem',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '2rem',
              maxWidth: '700px',
              margin: '0 auto 2rem'
            }}>
              Join families who are teaching their children essential digital privacy skills through fun, interactive learning.
            </p>
            <div className="cta-buttons" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/privacy-panda" className="button primary" style={{ background: 'white', color: '#1B5E20', fontWeight: '600' }}>
                <Play size={20} />
                Start Learning Now
              </Link>
              <Link to="/get-started" className="button secondary" style={{ background: 'rgba(255,255,255,0.2)', color: 'white', border: '2px solid white' }}>
                <BookOpen size={20} />
                See How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default FeaturesPage;

