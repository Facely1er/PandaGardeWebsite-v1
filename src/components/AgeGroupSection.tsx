import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield as Child, User, UserCheck, BookOpen, Palette, Puzzle, Shield, Globe, Smartphone, Wrench, Scale, ArrowRight } from 'lucide-react';

const ageGroups = [
  {
    id: '5-8',
    label: 'Little Explorers (5-8)',
    icon: Child,
    description: 'Perfect for young children just starting their digital journey. Follow Po the Panda as he learns about privacy shields in simple, colorful adventures:',
    resources: [
      {
        icon: Book,
        title: "Privacy Panda's First Adventure",
        description: "Join Po the Panda in the Digital Bamboo Forest as he discovers the importance of protecting his personal information. A gentle introduction to privacy concepts.",
        link: '/story'
      },
      {
        icon: Palette,
        title: "Coloring & Fun Activities",
        description: "Extend the story with coloring pages, simple puzzles, and interactive games that reinforce privacy lessons through play.",
        link: '/activity-book'
      }
    ]
  },
  {
    id: '9-12',
    label: 'Privacy Champions (9-12)',
    icon: User,
    description: 'For children ready to become privacy champions! Watch Po grow into the expert Privacy Panda and learn advanced concepts:',
    resources: [
      {
        icon: Book,
        title: "Privacy Panda's Growing Wisdom",
        description: "Follow Po as he becomes the forest's Privacy Panda expert, teaching other animals about digital safety and helping them protect their information.",
        link: '/story'
      },
      {
        icon: Puzzle,
        title: "Advanced Privacy Challenges",
        description: "Interactive puzzles, quizzes, and games that help children understand social media privacy, digital footprints, and online safety concepts.",
        link: '/activity-book'
      },
      {
        icon: Shield,
        title: "Privacy Protector's Guide",
        description: "Hands-on projects and practical guides that teach children how to protect personal information and navigate online spaces safely.",
        link: '/privacy-handbook'
      }
    ]
  },
  {
    id: '13-17',
    label: 'Digital Citizens (13-17)',
    icon: UserCheck,
    description: 'For teens ready to become digital citizens! Learn from Privacy Panda\'s wisdom and apply advanced privacy concepts in real-world scenarios:',
    resources: [
      {
        icon: Book,
        title: "Privacy Panda's Legacy",
        description: "Discover how Po's journey continues as he mentors new animals in the Digital Bamboo Forest, teaching advanced privacy concepts and digital citizenship.",
        link: '/story'
      },
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
    // Navigate to the resource page using React Router
    navigate(link);
  };

  return (
    <section className="age-group-section" id="age-groups">
      <div className="container">
        <div className="section-header fade-in">
          <span className="badge">PRIVACY PANDA'S JOURNEY</span>
          <h2>🌟 Follow Po's Growth Through the Forest</h2>
          <p>Watch Privacy Panda grow from a shy animal to the forest's expert teacher. Each age group experiences Po's journey differently, with content tailored to their developmental stage.</p>
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