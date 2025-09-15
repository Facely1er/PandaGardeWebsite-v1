import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield as Child, User, UserCheck, BookOpen, Palette, Puzzle, Shield, Globe, Smartphone, Wrench, Scale, ArrowRight } from 'lucide-react';

const ageGroups = [
  {
    id: '5-8',
    label: 'Ages 5-8',
    icon: Child,
    description: 'Our resources for younger children focus on basic concepts through colorful activities and simple stories:',
    resources: [
      {
        icon: BookOpen,
        title: "Beginner's Privacy Activity Book",
        description: "Colorful activities that introduce privacy concepts with fun characters and simple exercises. Features Privacy Panda guiding children through basic online safety.",
        link: '/activity-book'
      },
      {
        icon: Palette,
        title: "Privacy Panda Tales",
        description: "Illustrated stories that teach privacy lessons through Panda's adventures in the Digital Bamboo Forest. Age-appropriate language and concepts.",
        link: '/story'
      }
    ]
  },
  {
    id: '9-12',
    label: 'Ages 9-12',
    icon: User,
    description: 'Our resources for older children include more advanced concepts and interactive challenges:',
    resources: [
      {
        icon: Puzzle,
        title: "Digital Privacy Challenge",
        description: "Interactive puzzles, quizzes and games that help tweens understand social media privacy, digital footprints, and online safety concepts.",
        link: '/privacy-explorers'
      },
      {
        icon: Shield,
        title: "Privacy Protector's Guide",
        description: "Hands-on projects and practical guides that teach tweens how to protect personal information and navigate online spaces safely.",
        link: '/privacy-handbook'
      },
      {
        icon: Globe,
        title: "Digital Citizenship Academy",
        description: "Interactive modules that teach tweens about responsible online behavior, critical thinking, and evaluating digital information.",
        link: '/digital-citizenship'
      }
    ]
  },
  {
    id: '13-17',
    label: 'Ages 13-17',
    icon: UserCheck,
    description: 'Advanced privacy education for teenagers focusing on real-world applications and digital rights:',
    resources: [
      {
        icon: Smartphone,
        title: "Teen Privacy Handbook",
        description: "Comprehensive guide covering social media privacy, data rights, online reputation management, and advanced security concepts for teenagers.",
        link: '/teen-handbook'
      },
      {
        icon: Wrench,
        title: "Privacy Tools Workshop",
        description: "Hands-on tutorials for setting up VPNs, password managers, encrypted messaging, and other real privacy tools that teens can use.",
        link: '/privacy-tools'
      },
      {
        icon: Scale,
        title: "Digital Rights & Law",
        description: "Understanding privacy legislation, digital rights, data protection laws, and how they affect teenagers in the digital world.",
        link: '/digital-rights'
      }
    ]
  }
];

const AgeGroupSection: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('5-8');

  const handleTabClick = (ageId: string) => {
    setActiveTab(ageId);
  };

  const handleCardClick = (link: string) => {
 
    // Navigate to the resource page
    window.location.href = link;
 
    // Navigate to the resource page using React Router
    navigate(link);
 
  };

  return (
    <section className="age-group-section" id="age-groups">
      <div className="container">
        <div className="section-header fade-in">
          <span className="badge">AGE-APPROPRIATE LEARNING</span>
          <h2><User size={32} />Age-Appropriate Learning Paths</h2>
          <p>Tailored content and interactions designed specifically for different developmental stages.</p>
        </div>

        <div className="age-group-tabs">
          {ageGroups.map((group) => (
            <button
              key={group.id}
              className={`age-tab ${activeTab === group.id ? 'active' : ''}`}
              data-age={group.id}
              onClick={() => handleTabClick(group.id)}
            >
              {group.label}
            </button>
          ))}
        </div>

        <div className="age-group-content">
          {ageGroups.map((group) => (
            <div
              key={group.id}
              className={`age-content ${activeTab === group.id ? 'active' : ''}`}
              id={`age-${group.id}`}
            >
              <p>{group.description}</p>
              <div className="featured-grid">
                {group.resources.map((resource, index) => (
 
                  <div 
                    key={index} 
 
                    className="feature-card"
                    onClick={() => handleCardClick(resource.link)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleCardClick(resource.link);
                      }
                    }}
                  >
                    <div className="card-image">
                      <resource.icon size={80} />
                    </div>
                    <div className="card-content">
                      <h3><resource.icon size={20} /> {resource.title}</h3>
                      <p>{resource.description}</p>
                      <div className="card-link">
 
                        {resource.title.includes('Explore') ? 'Explore' : 
                         resource.title.includes('Start') ? 'Start' : 
                         resource.title.includes('Enter') ? 'Enter' : 
                         resource.title.includes('Read') ? 'Read' : 
                         resource.title.includes('Access') ? 'Access' : 'Learn More'} 
 
                        {resource.title.includes('Explore') ? 'Explore' :
                         resource.title.includes('Start') ? 'Start' :
                         resource.title.includes('Enter') ? 'Enter' :
                         resource.title.includes('Read') ? 'Read' :
                         resource.title.includes('Access') ? 'Access' : 'Learn More'}
 
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgeGroupSection;