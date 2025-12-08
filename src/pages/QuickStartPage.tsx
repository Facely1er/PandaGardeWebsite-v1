import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, Users, BookOpen, Download, CheckCircle, ArrowRight, Clock, Star, Shield } from 'lucide-react';

const QuickStartPage: React.FC = () => {
  const quickActions = [
    {
      title: 'Start with Privacy Panda',
      description: 'Try our interactive story and activities designed for children ages 5-17',
      icon: Play,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      link: '/privacy-panda',
      time: '5 min',
      difficulty: 'Easy'
    },
    {
      title: 'Join Family Hub',
      description: 'Connect with other families and access exclusive resources',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      link: '/family-hub',
      time: '2 min',
      difficulty: 'Easy'
    },
    {
      title: 'Download Activity Book',
      description: 'Get printable activities and coloring sheets for offline learning',
      icon: BookOpen,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      link: '/activity-book',
      time: '1 min',
      difficulty: 'Easy'
    },
    {
      title: 'Access Parent Resources',
      description: 'Browse comprehensive guides and tools for parents and educators',
      icon: Download,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      link: '/resources',
      time: '10 min',
      difficulty: 'Medium'
    }
  ];

  const ageGroupPaths = [
    {
      age: 'Ages 5-8',
      icon: '👶',
      description: 'Start with Privacy Panda\'s story and coloring activities',
      steps: [
        'Watch Privacy Panda\'s story',
        'Complete coloring activities',
        'Try simple privacy games',
        'Download printable materials'
      ],
      link: '/activity-book',
      color: 'from-purple-500 to-pink-500'
    },
    {
      age: 'Ages 9-12',
      icon: '🧒',
      description: 'Explore interactive activities and learn about digital footprints',
      steps: [
        'Join Privacy Explorers program',
        'Learn about social media privacy',
        'Practice password safety',
        'Complete digital citizenship activities'
      ],
      link: '/privacy-explorers',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      age: 'Ages 13-17',
      icon: '👦',
      description: 'Master advanced privacy settings and digital rights',
      steps: [
        'Access Teen Handbook',
        'Learn about data protection',
        'Practice privacy tools',
        'Join digital citizenship discussions'
      ],
      link: '/teen-handbook',
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const parentQuickSteps = [
    {
      step: 1,
      title: 'See Your Family\'s Privacy Status',
      description: 'Create your Family Hub account and see what your children do online',
      icon: Shield,
      link: 'https://www.hub.pandagarde.com',
      isExternal: true
    },
    {
      step: 2,
      title: 'Review Your Children\'s Online Services',
      description: 'See which apps and websites your children use and their privacy risks',
      icon: Users,
      link: 'https://www.hub.pandagarde.com',
      isExternal: true
    },
    {
      step: 3,
      title: 'Get Conversation Starters',
      description: 'Get ready-to-use questions and topics to talk with your children about online safety',
      icon: BookOpen,
      link: '/parent-resources',
      isExternal: false
    },
    {
      step: 4,
      title: 'Set Up Privacy Education',
      description: 'Start privacy education activities with your children',
      icon: Play,
      link: '/privacy-panda',
      isExternal: false
    }
  ];

  return (
    <main id="main-content">
      {/* Back Navigation */}
      <div className="container py-6">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <section className="hero-simple">
        <div className="container">
          <div className="text-center fade-in">
            <span className="badge">FOR PARENTS</span>
            <h1>Get Started: Protect Your Family Online</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow these simple steps to start protecting your family's online privacy. Everything is designed to be easy, even if you're not tech-savvy.
            </p>
          </div>
        </div>
      </section>

      {/* Parent Journey Steps */}
      <section className="parent-journey" style={{ padding: '4rem 0', backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="section-header fade-in" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#2C3E50' }}>Your Parent Journey</h2>
            <p style={{ fontSize: '1.25rem', color: '#666', maxWidth: '700px', margin: '0 auto' }}>
              Follow these four simple steps to start protecting your family
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {parentQuickSteps.map((step, index) => (
              <div key={index} className="fade-in" style={{ 
                backgroundColor: 'white', 
                padding: '2rem', 
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                position: 'relative'
              }}>
                <div style={{ 
                  position: 'absolute',
                  top: '-20px',
                  left: '2rem',
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#4CAF50',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '1.25rem'
                }}>
                  {step.step}
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <div style={{ 
                    width: '48px', 
                    height: '48px', 
                    backgroundColor: '#f0f9ff', 
                    borderRadius: '8px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}>
                    <step.icon size={24} style={{ color: '#2563eb' }} />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2C3E50' }}>
                    {step.title}
                  </h3>
                  <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                    {step.description}
                  </p>
                  {step.isExternal ? (
                    <a 
                      href={step.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#4CAF50',
                        textDecoration: 'none',
                        fontWeight: 'bold'
                      }}
                    >
                      Go to Step {step.step}
                      <ArrowRight size={16} />
                    </a>
                  ) : (
                    <Link 
                      to={step.link}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#4CAF50',
                        textDecoration: 'none',
                        fontWeight: 'bold'
                      }}
                    >
                      Go to Step {step.step}
                      <ArrowRight size={16} />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <a 
              href="https://www.hub.pandagarde.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 2rem',
                backgroundColor: '#4CAF50',
                color: 'white',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '1.1rem'
              }}
            >
              <Shield size={20} />
              Skip to Family Hub
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions">
        <div className="container">
          <div className="section-header fade-in">
            <h2>Choose Your Starting Point</h2>
            <p>Pick the option that feels right for your family and start learning today.</p>
          </div>

          <div className="quick-actions-grid">
            {quickActions.map((action, index) => (
              <div key={index} className="quick-action-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`action-icon ${action.bgColor}`}>
                  <action.icon size={32} className={action.color} />
                </div>
                <div className="action-content">
                  <h3>{action.title}</h3>
                  <p>{action.description}</p>
                  <div className="action-meta">
                    <span className="meta-item">
                      <Clock size={14} />
                      {action.time}
                    </span>
                    <span className="meta-item">
                      <Star size={14} />
                      {action.difficulty}
                    </span>
                  </div>
                  <Link to={action.link} className="action-button">
                    Get Started
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Age Group Paths */}
      <section className="age-paths">
        <div className="container">
          <div className="section-header fade-in">
            <h2>Age-Appropriate Learning Paths</h2>
            <p>Find the perfect starting point for your child's age and development level.</p>
          </div>

          <div className="age-paths-grid">
            {ageGroupPaths.map((path, index) => (
              <div key={index} className="age-path-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`path-header bg-gradient-to-r ${path.color}`}>
                  <div className="path-icon text-4xl">{path.icon}</div>
                  <h3>{path.age}</h3>
                </div>
                <div className="path-content">
                  <p className="path-description">{path.description}</p>
                  <ul className="path-steps">
                    {path.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="path-step">
                        <CheckCircle size={16} className="check-icon" />
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={path.link} className="path-button">
                    Start Learning
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Success Tips */}
      <section className="success-tips">
        <div className="container">
          <div className="section-header fade-in">
            <h2>Tips for Success</h2>
            <p>Make the most of your family's privacy education journey with these helpful tips.</p>
          </div>

          <div className="tips-grid">
            <div className="tip-card fade-in">
              <div className="tip-icon">
                <Shield size={24} className="text-green-500" />
              </div>
              <h3>Start Small</h3>
              <p>Begin with 10-15 minutes of learning time and gradually increase as your family gets comfortable.</p>
            </div>

            <div className="tip-card fade-in">
              <div className="tip-icon">
                <Users size={24} className="text-blue-500" />
              </div>
              <h3>Learn Together</h3>
              <p>Make it a family activity. Children learn better when parents are involved and engaged.</p>
            </div>

            <div className="tip-card fade-in">
              <div className="tip-icon">
                <BookOpen size={24} className="text-purple-500" />
              </div>
              <h3>Practice Regularly</h3>
              <p>Consistency is key. Try to incorporate privacy learning into your regular routine.</p>
            </div>

            <div className="tip-card fade-in">
              <div className="tip-icon">
                <Star size={24} className="text-yellow-500" />
              </div>
              <h3>Celebrate Progress</h3>
              <p>Use our certificates and achievement system to celebrate your family's learning milestones.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="fade-in text-center">
            <h2>Ready to Start Protecting Your Family?</h2>
            <p>Begin your journey to keep your family safe online with simple, easy-to-use tools.</p>
            <div className="cta-buttons">
              <a href="https://www.hub.pandagarde.com" target="_blank" rel="noopener noreferrer" className="button primary">
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

export default QuickStartPage;