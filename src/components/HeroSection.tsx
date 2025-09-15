 
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Book, Shield as Child, User, UserCheck, Sparkles, Star } from 'lucide-react';
import Logo from './Logo';
 
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Shield as Child, User, UserCheck, Sparkles, Star, ArrowRight, Play, Download, Heart } from 'lucide-react';
 

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
 
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
 

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

 
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      return () => heroElement.removeEventListener('mousemove', handleMouseMove);
    }
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
 
    <section className="hero" ref={heroRef}>
      {/* Interactive background gradient that follows mouse */}
      <div
        className="hero-bg-interactive"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)`
        }}
      />

 
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
            <h1>Welcome to <span className="highlight">PandaGarde</span></h1>
            <p>Helping children ages 5-17 learn about digital privacy and online safety through fun, engaging activities and stories tailored for different age groups.</p>

            {/* Enhanced action buttons with hover effects */}
            <div className="hero-buttons">
              <Link
                to="/activity-book"
                className="btn-primary"
                onMouseEnter={() => setIsHovered('activity')}
                onMouseLeave={() => setIsHovered(null)}
              >
                <BookOpen size={20} />
                Explore Activity Book
                <ArrowRight size={16} className={`btn-icon ${isHovered === 'activity' ? 'btn-icon-active' : ''}`} />
              </Link>
              <Link
                to="/story"
                className="btn-primary"
                onMouseEnter={() => setIsHovered('story')}
                onMouseLeave={() => setIsHovered(null)}
                style={{ 
                  background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                  border: 'none',
                  color: 'white'
                }}
              >
                <Play size={20} />
                Watch Privacy Panda's Interactive Story
                <Heart size={16} className={`btn-icon ${isHovered === 'story' ? 'btn-icon-active' : ''}`} />
              </Link>
            </div>

            {/* Quick stats */}
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">3</span>
                <span className="stat-label">Age Groups</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Activities</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Free</span>
              </div>
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
            <div className="family-hub-banner">
              <div className="banner-content">
                <h3>Join Our Family Hub</h3>
                <p>Connect with other families, share experiences, and access exclusive resources for digital safety education.</p>
                
                <div className="banner-features">
                  <div className="feature-item">
                    <Heart size={16} />
                    <span>Community Support</span>
                  </div>
                  <div className="feature-item">
                    <Sparkles size={16} />
                    <span>Exclusive Resources</span>
                  </div>
                  <div className="feature-item">
                    <UserCheck size={16} />
                    <span>Parent Guidance</span>
                  </div>
                </div>

                <a 
                  href="https://www.hub.pandagarde.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-hub"
                  onMouseEnter={() => setIsHovered('hub')}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  <ArrowRight size={16} />
                  Visit Family Hub
                  <ArrowRight size={16} className={`btn-icon ${isHovered === 'hub' ? 'btn-icon-active' : ''}`} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;