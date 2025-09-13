import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Book, Shield as Child, User, UserCheck, Sparkles, Star } from 'lucide-react';
import Logo from './Logo';

interface AgeGroupButtonProps {
  ageGroup: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const AgeGroupButton: React.FC<AgeGroupButtonProps> = ({ ageGroup, label, icon, onClick }) => (
  <a
    href={`#age-${ageGroup}`}
    className="age-group-button"
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
  >
    {icon}
    {label}
  </a>
);

const HeroSection: React.FC = () => {
  const [floatingElements, setFloatingElements] = useState<Array<{id: number, x: number, y: number, delay: number}>>([]);

  useEffect(() => {
    // Create floating elements for animation
    const elements = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5
    }));
    setFloatingElements(elements);
  }, []);

  const switchAgeTab = (ageGroup: string) => {
    const element = document.getElementById(`age-${ageGroup}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Update active tab
    const tabs = document.querySelectorAll('.age-tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    const selectedTab = document.querySelector(`.age-tab[data-age="${ageGroup}"]`);
    if (selectedTab) {
      selectedTab.classList.add('active');
    }
    
    // Update content
    const contents = document.querySelectorAll('.age-content');
    contents.forEach(content => content.classList.remove('active'));
    
    const selectedContent = document.getElementById(`age-${ageGroup}`);
    if (selectedContent) {
      selectedContent.classList.add('active');
    }
  };

  return (
    <section className="hero">
      {/* Floating animated elements */}
      {floatingElements.map((element) => (
        <div
          key={element.id}
          className="floating-element"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            animationDelay: `${element.delay}s`
          }}
        >
          {element.id % 3 === 0 ? <Sparkles size={16} /> : <Star size={12} />}
        </div>
      ))}
      
      <div className="container">
        <div className="hero-content">
          <div className="hero-text slide-in-left">
            <h1>Welcome to the <span className="highlight">Privacy Panda</span> Family Hub</h1>
            <p>Helping children ages 5-17 learn about digital privacy and online safety through fun, engaging activities and stories tailored for different age groups.</p>
            <div className="hero-buttons">
              <Link to="/activity-book" className="btn-primary">
                <BookOpen size={20} />
                Explore Activity Book
              </Link>
              <Link to="/story" className="btn-secondary">
                <Book size={20} />
                Read Privacy Panda's Story
              </Link>
            </div>
            
            <div className="age-group-selector">
              <h3>Choose your age group:</h3>
              <div className="age-group-buttons">
                <AgeGroupButton
                  ageGroup="5-8"
                  label="Ages 5-8"
                  icon={<Child size={20} />}
                  onClick={() => switchAgeTab('5-8')}
                />
                <AgeGroupButton
                  ageGroup="9-12"
                  label="Ages 9-12"
                  icon={<User size={20} />}
                  onClick={() => switchAgeTab('9-12')}
                />
                <AgeGroupButton
                  ageGroup="13-17"
                  label="Ages 13-17"
                  icon={<UserCheck size={20} />}
                  onClick={() => switchAgeTab('13-17')}
                />
              </div>
            </div>
          </div>
          <div className="hero-visual slide-in-right">
            <div className="hero-image floating">
              <div className="hero-logo">
                <img 
                  src="/LogoPandagarde.png" 
                  alt="PandaGarde Logo" 
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              <h3>Privacy Panda Family Hub</h3>
              <p>Interactive learning for ages 5-17</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;