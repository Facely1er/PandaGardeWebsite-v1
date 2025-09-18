import React from 'react';
import { Shield as Child, User, UserCheck, Users, Check } from 'lucide-react';

const CurriculumSection: React.FC = () => {
  const ageGroups = [
    {
      id: '5-8',
      title: 'Ages 5-8',
      icon: Child,
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
      icon: User,
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
      icon: UserCheck,
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
      title: 'Parents',
      icon: Users,
      gradient: 'from-orange-500 to-red-500',
      features: [
        'Family privacy policy creation',
        'Device and app management',
        'Monitoring and guidance strategies',
        'Privacy education resources',
        'Community support and networking'
      ]
    }
  ];

  return (
    <section className="curriculum-section" id="curriculum">
      <div className="container">
        <div className="section-header fade-in">
          <span className="badge">AGE-APPROPRIATE CURRICULUM</span>
          <h2>Age-Appropriate Curriculum</h2>
          <p>Comprehensive learning paths designed for every family member, from young children to parents.</p>
        </div>

        <div className="curriculum-grid">
          {ageGroups.map((group, index) => (
            <div key={group.id} className="curriculum-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className={`card-header bg-gradient-to-r ${group.gradient}`}>
                <div className="card-icon">
                  <group.icon size={32} />
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
  );
};

export default CurriculumSection;