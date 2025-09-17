import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BookOpen, Shield as Child, User, UserCheck, Sparkles, Star, ArrowRight, Play, Download, Heart, Shield, Book, Users } from 'lucide-react';
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
            <h1>Meet <span className="highlight rainbow-text sparkle">Privacy Panda</span></h1>
            <p className="hero-subtitle">Join Po the Panda on an adventure through the Digital Bamboo Forest, where he learns about protecting personal information and staying safe online. A heartwarming story that teaches children ages 5-12 about digital privacy through engaging storytelling.</p>

            {/* Story-focused action buttons */}
            <div className="hero-buttons">
              <Link
                to="/story"
                className="btn-primary bounce-hover"
                onMouseEnter={() => setIsHovered('story')}
                onMouseLeave={() => setIsHovered(null)}
                style={{ 
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  border: 'none',
                  color: 'white',
                  fontSize: '1.1rem',
                  padding: '1rem 2rem'
                }}
              >
                <Play size={20} />
                Start Privacy Panda's Story
                <Heart size={16} className={`btn-icon ${isHovered === 'story' ? 'btn-icon-active' : ''}`} />
              </Link>
              <Link
                to="/family-hub"
                className="btn-primary wiggle-hover"
                onMouseEnter={() => setIsHovered('hub')}
                onMouseLeave={() => setIsHovered(null)}
                style={{ 
                  background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                  border: 'none',
                  color: 'white',
                  fontSize: '1rem',
                  padding: '0.8rem 1.5rem'
                }}
              >
                <Users size={20} />
                Join Family Hub
                <ArrowRight size={16} className={`btn-icon ${isHovered === 'hub' ? 'btn-icon-active' : ''}`} />
              </Link>
            </div>

            {/* Story highlights */}
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">🐼</span>
                <span className="stat-label">Privacy Panda</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">🌲</span>
                <span className="stat-label">Digital Bamboo Forest</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">🛡️</span>
                <span className="stat-label">Privacy Shield</span>
              </div>
            </div>

            <div className="age-group-selector">
              <h3>Join Privacy Panda's Adventure: 🌟</h3>
              <div className="age-group-buttons">
                <AgeGroupButton
                  ageGroup="5-8"
                  label="Little Explorers (5-8)"
                  icon={<Child size={20} />}
                  route="/story"
                />
                <AgeGroupButton
                  ageGroup="9-12"
                  label="Privacy Champions (9-12)"
                  icon={<User size={20} />}
                  route="/story"
                />
                <AgeGroupButton
                  ageGroup="13-17"
                  label="Digital Citizens (13-17)"
                  icon={<UserCheck size={20} />}
                  route="/story"
                />
              </div>
            </div>
          </div>

          <div className="hero-visual slide-in-right">
            <div className="story-preview-card">
              <div className="card-content">
                <div className="story-character">
                  <div className="panda-avatar">🐼</div>
                  <div className="character-info">
                    <h4>Meet Po the Panda</h4>
                    <p>The shyest animal in the Digital Bamboo Forest</p>
                  </div>
                </div>
                
                <div className="story-teaser">
                  <h3>🌲 The Digital Bamboo Forest</h3>
                  <p>Follow Po's journey as he learns about privacy shields, protecting personal information, and becoming the forest's Privacy Panda expert.</p>
                  
                  <div className="story-features">
                    <div className="feature-item">
                      <Book size={16} />
                      <span>Interactive Story</span>
                    </div>
                    <div className="feature-item">
                      <Shield size={16} />
                      <span>Privacy Lessons</span>
                    </div>
                    <div className="feature-item">
                      <Heart size={16} />
                      <span>Family Friendly</span>
                    </div>
                  </div>
                </div>

                <div className="family-hub-cta">
                  <h4>🏠 Join Our Family Hub</h4>
                  <p>Connect with other families learning about digital privacy together</p>
                  
                  <Link 
                    to="/family-hub"
                    className="btn-hub"
                    onMouseEnter={() => setIsHovered('hub')}
                    onMouseLeave={() => setIsHovered(null)}
                  >
                    <Users size={16} />
                    Start Family Journey
                    <ArrowRight size={16} className={`btn-icon ${isHovered === 'hub' ? 'btn-icon-active' : ''}`} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;