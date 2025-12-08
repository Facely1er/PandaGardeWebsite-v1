import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AgeSpecificConversations from '../../components/parent/AgeSpecificConversations';

const AgeSpecificPrivacyPage: React.FC = () => {
  return (
    <main id="main-content">
      <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <Link 
          to="/parent-resources" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          style={{ marginBottom: '2rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#666', textDecoration: 'none' }}
        >
          <ArrowLeft size={16} />
          Back to Parent Resources
        </Link>
      </div>

      <section style={{ padding: '2rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2C3E50', marginBottom: '1rem' }}>
              Age-Specific Privacy Guidance
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#666', maxWidth: '800px', margin: '0 auto' }}>
              Ready-to-use conversation starters and privacy guidance tailored to your child's age group. Learn what to say and how to say it.
            </p>
          </div>

          <AgeSpecificConversations />
        </div>
      </section>
    </main>
  );
};

export default AgeSpecificPrivacyPage;

