import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Eye, MessageCircle, TrendingUp, ArrowRight, CheckCircle, HelpCircle } from 'lucide-react';

const ParentLandingPage: React.FC = () => {
  const faqs = [
    {
      question: 'How do I see what my children do online?',
      answer: 'Once you create a Family Hub account and add your children, you can see all the apps and websites they use, along with privacy risk scores for each one.'
    },
    {
      question: 'What is a privacy risk score?',
      answer: 'A simple number that shows how safe your child\'s privacy is with each app or website. Lower is safer, higher means more risk. We explain what each score means in plain language.'
    },
    {
      question: 'Do I need to be tech-savvy to use this?',
      answer: 'Not at all! Everything is designed for parents who aren\'t tech experts. We use simple language and clear explanations, not technical jargon.'
    },
    {
      question: 'How do conversation starters help?',
      answer: 'We provide ready-to-use questions and topics based on what your children are actually using online, so you know exactly what to talk about and how to start the conversation.'
    },
    {
      question: 'Is my family\'s information safe?',
      answer: 'Yes. We take privacy seriously - we\'re helping you protect your family\'s privacy, so we protect yours too. All information is encrypted and stored securely.'
    }
  ];

  return (
    <main id="main-content" style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '4rem 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: 'bold' }}>
            For Parents: Keep Your Family Safe Online
          </h1>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', maxWidth: '800px', margin: '0 auto 2rem' }}>
            Simple tools to see what your children do online, understand their privacy risks, and get help talking to them about staying safe.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a 
              href="https://www.hub.pandagarde.com" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 2rem',
                backgroundColor: 'white',
                color: '#667eea',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '1.1rem'
              }}
            >
              <Shield size={20} />
              Start Protecting Your Family
              <ArrowRight size={16} />
            </a>
            <Link 
              to="/overview"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '1rem 2rem',
                backgroundColor: 'transparent',
                color: 'white',
                border: '2px solid white',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '1.1rem'
              }}
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Three Column Layout */}
      <section style={{ padding: '4rem 0', backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem',
            marginTop: '2rem'
          }}>
            {/* See Risks */}
            <div style={{ 
              backgroundColor: 'white', 
              padding: '2.5rem', 
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <div style={{ 
                width: '64px', 
                height: '64px', 
                backgroundColor: '#fee2e2', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <Eye size={32} style={{ color: '#dc2626' }} />
              </div>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#2C3E50' }}>
                See Risks
              </h2>
              <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                Get a clear view of your family's privacy status. See which apps and websites your children use, and understand the privacy risks for each one - all explained in simple terms.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, color: '#666' }}>
                <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                  <CheckCircle size={20} style={{ color: '#4CAF50', flexShrink: 0, marginTop: '2px' }} />
                  <span>View all apps and websites your children use</span>
                </li>
                <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                  <CheckCircle size={20} style={{ color: '#4CAF50', flexShrink: 0, marginTop: '2px' }} />
                  <span>See privacy risk scores for each service</span>
                </li>
                <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                  <CheckCircle size={20} style={{ color: '#4CAF50', flexShrink: 0, marginTop: '2px' }} />
                  <span>Get alerts when new risks appear</span>
                </li>
              </ul>
            </div>

            {/* Take Action */}
            <div style={{ 
              backgroundColor: 'white', 
              padding: '2.5rem', 
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <div style={{ 
                width: '64px', 
                height: '64px', 
                backgroundColor: '#dbeafe', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <Shield size={32} style={{ color: '#2563eb' }} />
              </div>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#2C3E50' }}>
                Take Action
              </h2>
              <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                Don't just see the problems - get clear, actionable steps to fix them. Approve or deny app requests, get privacy setting guides, and take control of your family's online safety.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, color: '#666' }}>
                <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                  <CheckCircle size={20} style={{ color: '#4CAF50', flexShrink: 0, marginTop: '2px' }} />
                  <span>Approve or deny app requests from your children</span>
                </li>
                <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                  <CheckCircle size={20} style={{ color: '#4CAF50', flexShrink: 0, marginTop: '2px' }} />
                  <span>Get step-by-step privacy setting guides</span>
                </li>
                <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                  <CheckCircle size={20} style={{ color: '#4CAF50', flexShrink: 0, marginTop: '2px' }} />
                  <span>See what needs your attention right away</span>
                </li>
              </ul>
            </div>

            {/* Stay Informed */}
            <div style={{ 
              backgroundColor: 'white', 
              padding: '2.5rem', 
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <div style={{ 
                width: '64px', 
                height: '64px', 
                backgroundColor: '#fef3c7', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                marginBottom: '1.5rem'
              }}>
                <TrendingUp size={32} style={{ color: '#d97706' }} />
              </div>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', color: '#2C3E50' }}>
                Stay Informed
              </h2>
              <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                Get conversation starters, track your family's privacy progress, and stay up-to-date with tips and resources designed specifically for parents.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, color: '#666' }}>
                <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                  <CheckCircle size={20} style={{ color: '#4CAF50', flexShrink: 0, marginTop: '2px' }} />
                  <span>Get ready-to-use conversation starters</span>
                </li>
                <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                  <CheckCircle size={20} style={{ color: '#4CAF50', flexShrink: 0, marginTop: '2px' }} />
                  <span>Track your family's privacy improvements</span>
                </li>
                <li style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'start', gap: '0.5rem' }}>
                  <CheckCircle size={20} style={{ color: '#4CAF50', flexShrink: 0, marginTop: '2px' }} />
                  <span>Access parent guides and resources</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Dashboard Preview */}
      <section style={{ padding: '4rem 0', backgroundColor: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#2C3E50' }}>
              Your Privacy Dashboard
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#666', maxWidth: '700px', margin: '0 auto' }}>
              See everything you need to know about your family's online privacy in one simple dashboard.
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            borderRadius: '12px', 
            padding: '2rem',
            border: '2px dashed #ddd'
          }}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '1.5rem',
              marginBottom: '2rem'
            }}>
              <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#4CAF50', marginBottom: '0.5rem' }}>85</div>
                <div style={{ color: '#666' }}>Family Privacy Score</div>
              </div>
              <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f59e0b', marginBottom: '0.5rem' }}>3</div>
                <div style={{ color: '#666' }}>Action Items</div>
              </div>
              <div style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: 'white', borderRadius: '8px' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '0.5rem' }}>2</div>
                <div style={{ color: '#666' }}>Children</div>
              </div>
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
                Access Your Dashboard
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ padding: '4rem 0', backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#2C3E50' }}>
              Common Questions from Parents
            </h2>
            <p style={{ fontSize: '1.25rem', color: '#666' }}>
              Everything you need to know to get started
            </p>
          </div>
          
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {faqs.map((faq, index) => (
              <div 
                key={index}
                style={{ 
                  backgroundColor: 'white', 
                  padding: '1.5rem', 
                  borderRadius: '8px',
                  marginBottom: '1rem',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                  <HelpCircle size={24} style={{ color: '#4CAF50', flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: '#2C3E50' }}>
                      {faq.question}
                    </h3>
                    <p style={{ color: '#666', lineHeight: '1.8' }}>
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link 
              to="/faq"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#4CAF50',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '1.1rem'
              }}
            >
              See All Questions
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section style={{ 
        padding: '4rem 0', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            Ready to Protect Your Family?
          </h2>
          <p style={{ fontSize: '1.25rem', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Join thousands of parents who are already keeping their families safe online with simple, easy-to-use tools.
          </p>
          <a 
            href="https://www.hub.pandagarde.com" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '1.25rem 2.5rem',
              backgroundColor: 'white',
              color: '#667eea',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 'bold',
              fontSize: '1.2rem'
            }}
          >
            <Shield size={24} />
            Start Protecting Your Family Now
            <ArrowRight size={20} />
          </a>
        </div>
      </section>
    </main>
  );
};

export default ParentLandingPage;

