import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, Shield, Wrench, Check, BookOpen, Heart, Brain } from 'lucide-react';

const OverviewPage: React.FC = () => {
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

  const ageGroups = [
    {
      id: '5-8',
      title: 'Ages 5-8',
      icon: '👶',
      gradient: 'from-purple-500 to-pink-500',
      features: [
        'Basic privacy concepts through stories',
        'Interactive coloring activities',
        'Simple online safety rules',
        'Privacy Panda character adventures',
        'Family-friendly learning games'
      ]
    },
    {
      id: '9-12',
      title: 'Ages 9-12',
      icon: '🧒',
      gradient: 'from-blue-500 to-cyan-500',
      features: [
        'Social media privacy basics',
        'Digital footprint awareness',
        'Password security fundamentals',
        'Online communication safety',
        'Critical thinking about online content'
      ]
    },
    {
      id: '13-17',
      title: 'Ages 13-17',
      icon: '👦',
      gradient: 'from-green-500 to-emerald-500',
      features: [
        'Advanced privacy settings management',
        'Data protection and rights',
        'Online reputation management',
        'Privacy tools and technologies',
        'Digital citizenship and ethics'
      ]
    },
    {
      id: 'parents',
      title: 'For Parents',
      icon: '👨‍👩‍👧‍👦',
      gradient: 'from-orange-500 to-red-500',
      features: [
        'See what your children do online',
        'Know their privacy risks',
        'Get conversation starters',
        'Approve or deny app requests',
        'Track your family\'s safety progress'
      ]
    }
  ];

  const products = [
    {
      id: 'family-hub',
      title: 'Family Hub',
      icon: Users,
      gradient: 'from-purple-500 to-pink-500',
      description: 'Your family\'s privacy control center. See what your children do online, know their privacy risks, and get conversation starters.',
      features: [
        'See all apps and websites your children use',
        'Get clear privacy risk scores',
        'Approve or deny app requests',
        'Get ready-to-use conversation starters',
        'Track your family\'s privacy progress'
      ],
      ctaText: 'Start Protecting Your Family',
      ctaLink: '/family-hub'
    },
    {
      id: 'privacy-panda',
      title: 'PrivacyPanda',
      icon: Shield,
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Interactive learning platform with gamified activities and stories for children ages 5-17.',
      features: [
        'Interactive stories and games',
        'Age-appropriate learning paths',
        'Progress tracking and rewards',
        'Offline activities and printables',
        'Parent dashboard and insights'
      ],
      ctaText: 'Try PrivacyPanda',
      ctaLink: '/privacy-panda'
    },
    {
      id: 'parent-toolkit',
      title: 'Parent Guides',
      icon: Wrench,
      gradient: 'from-green-500 to-emerald-500',
      description: 'Simple guides and resources to help you protect your family. Everything explained in plain language.',
      features: [
        'How to talk to your children about privacy',
        'Step-by-step privacy setting guides',
        'Family privacy plan templates',
        'Safety checklists you can use',
        'Answers to common parent questions'
      ],
      ctaText: 'View Parent Guides',
      ctaLink: '/parent-resources'
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
            <span className="badge">HOW IT WORKS</span>
            <h1>How PandaGarde Helps Protect Your Family</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple tools that help you see what your children do online, understand their privacy risks, and get help talking to them about staying safe. No technical knowledge needed.
            </p>
          </div>
        </div>
      </section>

      {/* What Parents Get Section */}
      <section style={{ padding: '4rem 0', backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="section-header fade-in" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#2C3E50' }}>What Parents Get</h2>
            <p style={{ fontSize: '1.25rem', color: '#666', maxWidth: '700px', margin: '0 auto' }}>
              Everything you need to keep your family safe online, explained in simple terms
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '2rem',
            marginTop: '2rem'
          }}>
            <div className="fade-in" style={{ 
              backgroundColor: 'white', 
              padding: '2rem', 
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👀</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2C3E50' }}>See What Your Children Do Online</h3>
              <p style={{ color: '#666', lineHeight: '1.8' }}>
                Know which apps and websites your children use. See everything in one simple dashboard, so you always know what's happening.
              </p>
            </div>

            <div className="fade-in" style={{ 
              backgroundColor: 'white', 
              padding: '2rem', 
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚠️</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2C3E50' }}>Understand Privacy Risks</h3>
              <p style={{ color: '#666', lineHeight: '1.8' }}>
                Get clear, easy-to-understand risk scores. We explain what each score means and what you need to do about it - no technical jargon.
              </p>
            </div>

            <div className="fade-in" style={{ 
              backgroundColor: 'white', 
              padding: '2rem', 
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2C3E50' }}>Get Conversation Starters</h3>
              <p style={{ color: '#666', lineHeight: '1.8' }}>
                Ready-to-use questions and topics based on what your children are actually using. Know exactly what to talk about and how to start.
              </p>
            </div>

            <div className="fade-in" style={{ 
              backgroundColor: 'white', 
              padding: '2rem', 
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2C3E50' }}>Take Action Easily</h3>
              <p style={{ color: '#666', lineHeight: '1.8' }}>
                Approve or deny app requests, get step-by-step guides for privacy settings, and see what needs your attention right away.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Visual Flow */}
      <section style={{ padding: '4rem 0', backgroundColor: 'white' }}>
        <div className="container">
          <div className="section-header fade-in" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#2C3E50' }}>How It Works</h2>
            <p style={{ fontSize: '1.25rem', color: '#666', maxWidth: '700px', margin: '0 auto' }}>
              Three simple steps to start protecting your family
            </p>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem',
            maxWidth: '1000px',
            margin: '0 auto'
          }}>
            <div className="fade-in" style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                backgroundColor: '#4CAF50', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'white'
              }}>1</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2C3E50' }}>Create Your Family Account</h3>
              <p style={{ color: '#666', lineHeight: '1.8' }}>
                Sign up for Family Hub and add your children. It takes just a few minutes.
              </p>
            </div>

            <div className="fade-in" style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                backgroundColor: '#4CAF50', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'white'
              }}>2</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2C3E50' }}>See Your Family's Privacy Status</h3>
              <p style={{ color: '#666', lineHeight: '1.8' }}>
                View your dashboard to see risk scores, active apps, and what needs your attention.
              </p>
            </div>

            <div className="fade-in" style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                backgroundColor: '#4CAF50', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                fontSize: '2rem',
                fontWeight: 'bold',
                color: 'white'
              }}>3</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2C3E50' }}>Take Action</h3>
              <p style={{ color: '#666', lineHeight: '1.8' }}>
                Review service requests, get conversation starters, and start protecting your family.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Age-Appropriate Curriculum */}
      <section className="curriculum-section" id="curriculum">
        <div className="container">
          <div className="section-header fade-in">
            <span className="badge">AGE-APPROPRIATE CURRICULUM</span>
            <h2>Learning Paths for Every Family Member</h2>
            <p>Comprehensive learning paths designed for every family member, from young children to parents.</p>
          </div>

          <div className="curriculum-grid">
            {ageGroups.map((group, index) => (
              <div key={group.id} className="curriculum-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`card-header bg-gradient-to-r ${group.gradient}`}>
                  <div className="card-icon text-4xl">
                    {group.icon}
                  </div>
                  <h3>{group.title}</h3>
                </div>
                <div className="card-content">
                  <ul className="feature-list">
                    {group.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="feature-item">
                        <Check size={16} className="check-icon" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Complete Ecosystem */}
      <section className="products-section" id="products">
        <div className="container">
          <div className="section-header fade-in">
            <span className="badge">OUR COMPLETE ECOSYSTEM</span>
            <h2>Three Powerful Tools Working Together</h2>
            <p>Everything your family needs for comprehensive digital privacy education and protection.</p>
          </div>

          <div className="products-grid">
            {products.map((product, index) => (
              <div key={product.id} className="product-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`card-header bg-gradient-to-r ${product.gradient}`}>
                  <div className="card-icon">
                    <product.icon size={32} />
                  </div>
                  <h3>{product.title}</h3>
                </div>
                <div className="card-content">
                  <p className="product-description">{product.description}</p>
                  <ul className="feature-list">
                    {product.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="feature-item">
                        <Check size={16} className="check-icon" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to={product.ctaLink} className="product-cta">
                    {product.ctaText}
                    <ArrowLeft size={16} className="rotate-180" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Highlight */}
      <section className="features-highlight">
        <div className="container">
          <div className="section-header fade-in">
            <span className="badge">WHY PARENTS TRUST PANDAGARDE</span>
            <h2>Built for Parents Who Aren't Tech Experts</h2>
            <p>Simple tools that help you protect your family without needing to understand complicated technology.</p>
          </div>

          <div className="features-grid">
            <div className="feature-card fade-in">
              <div className="feature-icon">
                <Heart size={32} className="text-red-500" />
              </div>
              <h3>Easy to Understand</h3>
              <p>No technical jargon. We explain everything in simple terms so you know exactly what's happening with your children's privacy.</p>
            </div>

            <div className="feature-card fade-in">
              <div className="feature-icon">
                <Shield size={32} className="text-green-500" />
              </div>
              <h3>Built for Parents</h3>
              <p>Everything is designed with parents in mind. See risks, take action, and get help talking to your children - all in one place.</p>
            </div>

            <div className="feature-card fade-in">
              <div className="feature-icon">
                <BookOpen size={32} className="text-blue-500" />
              </div>
              <h3>Actionable Guidance</h3>
              <p>Get clear next steps, conversation starters, and practical advice - not just information, but real help you can use right away.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="fade-in text-center">
            <h2>Ready to Keep Your Family Safe Online?</h2>
            <p>Start protecting your family today with simple, easy-to-use tools designed for parents.</p>
            <div className="cta-buttons">
              <a href="https://www.hub.pandagarde.com" target="_blank" rel="noopener noreferrer" className="button primary">
                <Shield size={20} />
                Start Protecting Your Family
              </a>
              <Link to="/quick-start" className="button secondary">
                <BookOpen size={20} />
                See How to Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default OverviewPage;