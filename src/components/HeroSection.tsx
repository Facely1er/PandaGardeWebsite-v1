import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Shield as Child, User, UserCheck, Sparkles, Star, ArrowRight, Play, Download, Heart } from 'lucide-react';
import Logo from './Logo';


interface AgeGroupButtonProps {
  ageGroup: string;
  label: string;
  icon: React.ReactNode;
  route: string;
}

const AgeGroupButton: React.FC<AgeGroupButtonProps> = ({ ageGroup, label, icon, route }) => (
  <Link
    to={route}
    className="age-group-button pulse-hover"
  >
    {icon}
    {label}
  </Link>
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

  return (
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
            <h1>Welcome to <span className="highlight rainbow-text sparkle">PandaGarde</span></h1>
            <p>Helping children ages 5-17 learn about digital privacy and online safety through fun, engaging activities and stories tailored for different age groups.</p>

            {/* Enhanced action buttons with hover effects */}
            <div className="hero-buttons">
              <Link
                to="/activity-book"
                className="btn-primary bounce-hover"
                onMouseEnter={() => setIsHovered('activity')}
                onMouseLeave={() => setIsHovered(null)}
              >
                <BookOpen size={20} />
                Explore Activity Book
                <ArrowRight size={16} className={`btn-icon ${isHovered === 'activity' ? 'btn-icon-active' : ''}`} />
              </Link>
              <Link
                to="/story"
                className="btn-primary wiggle-hover"
                onMouseEnter={() => setIsHovered('story')}
                onMouseLeave={() => setIsHovered(null)}
                style={{ 
                  background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                  border: 'none',
                  color: 'white'
                }}
              >
                <Play size={20} />
                Interactive Privacy Panda Story
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
              <h3>Choose your age group: 🎯</h3>
              <div className="age-group-buttons">
                <AgeGroupButton
                  ageGroup="5-8"
                  label="Ages 5-8"
                  icon={<Child size={20} />}
                  route="/activity-book"
                />
                <AgeGroupButton
                  ageGroup="9-12"
                  label="Ages 9-12"
                  icon={<User size={20} />}
                  route="/privacy-explorers"
                />
                <AgeGroupButton
                  ageGroup="13-17"
                  label="Ages 13-17"
                  icon={<UserCheck size={20} />}
                  route="/teen-handbook"
                />
              </div>
            </div>
          </div>

          <div className="hero-visual slide-in-right">
            <div className="family-hub-banner">
              <div className="banner-content">
                <div className="banner-logo">
                  <img 
                    src="/LogoPandagarde.png" 
                    alt="PandaGarde Logo" 
                    style={{ 
                      width: '100%', 
                      height: 'auto', 
                      maxWidth: '200px',
                      objectFit: 'contain'
                    }} 
                  />
                </div>
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