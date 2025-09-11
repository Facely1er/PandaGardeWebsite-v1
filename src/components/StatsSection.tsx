import React from 'react';
import { GraduationCap, Users, Shield, Star } from 'lucide-react';

const stats = [
  {
    icon: GraduationCap,
    title: 'Complete',
    description: 'Learning Platform'
  },
  {
    icon: Users,
    title: 'Growing',
    description: 'Family Community'
  },
  {
    icon: Shield,
    title: 'Proven',
    description: 'Privacy Methods'
  },
  {
    icon: Star,
    title: 'Expert',
    description: 'Guidance & Support'
  }
];

const StatsSection: React.FC = () => {
  return (
    <section className="stats">
      <div className="container">
        <div className="stats-grid fade-in">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item">
              <div className="icon">
                <stat.icon size={24} />
              </div>
              <h3>{stat.title}</h3>
              <p>{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;