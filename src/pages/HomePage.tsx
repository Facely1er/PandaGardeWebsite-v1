import React, { useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection';
import FeaturedSection from '../components/FeaturedSection';
import AgeGroupSection from '../components/AgeGroupSection';
import TimelineSection from '../components/TimelineSection';
import ResourcesSection from '../components/ResourcesSection';
import CTASection from '../components/CTASection';

const HomePage: React.FC = () => {
  useEffect(() => {
    // Intersection Observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe all animation elements
    const animationElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animationElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main id="main-content">
      <HeroSection />
      <StatsSection />
      <FeaturedSection />
      <AgeGroupSection />
      <TimelineSection />
      <ResourcesSection />
      <CTASection />
    </main>
  );
};

export default HomePage;