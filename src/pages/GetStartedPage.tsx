import React from 'react';
import { Link } from 'react-router-dom';
import { Users, BookOpen, Play, ShoppingBag, BarChart3, Rocket, Scale } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';
import { PRIVACY_PORTAL_URL } from '../config/portal';
import './GetStartedPage.css';

const GetStartedPage: React.FC = () => {
  // Journey centered on Digital Footprint Analysis: Add services → View analysis → Rest of ecosystem
  const steps = [
    {
      id: 'service-catalog',
      title: 'Add Your Family’s Services',
      description: 'Tell us which apps and services your family uses. Adding at least 3 services unlocks your Digital Footprint Analysis—the central view of your family’s privacy.',
      icon: ShoppingBag,
      link: '/service-catalog',
      action: 'Add Services'
    },
    {
      id: 'digital-footprint',
      title: 'View Digital Footprint Analysis',
      description: 'Your central privacy view: see exposure scores, high-risk services, and personalized recommendations. This is the heart of your PandaGarde journey.',
      icon: BarChart3,
      link: '/digital-footprint',
      action: 'View Analysis'
    },
    {
      id: 'family-hub',
      title: 'Create Your Family Profile',
      description: 'Set up your family so you can use all our free privacy tools and activities in one place.',
      icon: Users,
      link: '/family-hub',
      action: 'Create Profile'
    },
    {
      id: 'first-activity',
      title: 'Start Learning with Privacy Panda',
      description: 'Try our interactive stories and activities, made for your child’s age.',
      icon: Play,
      link: '/privacy-panda',
      action: 'Start Learning'
    },
    {
      id: 'explore-resources',
      title: 'Download Free Resources',
      description: 'Get guides, activities, and printables to keep learning at home or in the classroom.',
      icon: BookOpen,
      link: '/resources',
      action: 'Get Resources'
    }
  ];

  return (
    <PageLayout
      title="Get Started"
      subtitle="Your journey centers on Digital Footprint Analysis: add the services your family uses, then view your privacy analysis and recommendations."
      icon={Rocket}
      badge="GET STARTED"
      breadcrumbs={true}
    >
      <div className="get-started-container">
          {/* Steps Section */}
          <section className="get-started-steps-section" aria-labelledby="steps-heading">
            <div className="get-started-steps-inner">
              <h2 id="steps-heading" className="get-started-steps-heading">
                Simple Steps to Get Started
              </h2>
              <p className="get-started-steps-intro">
                Do these in order, or jump to any step you like.
              </p>

              <div className="get-started-steps-list" role="list" aria-label="Getting started steps">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.id} role="listitem" className="get-started-step-card">
                      <div className="get-started-step-row">
                        <div className="get-started-step-number">
                          {index + 1}
                        </div>

                        <div className="get-started-step-content">
                          <div className="get-started-step-header">
                            <Icon size={24} className="get-started-step-icon" aria-hidden />
                            <h3 className="get-started-step-title">
                              {step.title}
                            </h3>
                          </div>

                          <p className="get-started-step-desc">
                            {step.description}
                          </p>

                          <Link
                            to={step.link}
                            className="get-started-step-link"
                            aria-label={`${step.action}: ${step.title}`}
                          >
                            {step.action}
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Quick Start Options */}
          <section className="get-started-quick-section" aria-labelledby="quick-start-heading">
            <div className="get-started-steps-inner">
              <h2 id="quick-start-heading" className="get-started-quick-heading">
                Or Jump Straight In
              </h2>
              <p className="get-started-quick-intro">
                Prefer to explore? Start with any of these.
              </p>

              <div className="get-started-quick-grid">
                <Link
                  to="/activity-book"
                  className="get-started-quick-card"
                  aria-label="Start with Activities - Jump straight into interactive privacy activities"
                >
                  <div className="get-started-quick-icon-wrap">
                    <Play size={32} aria-hidden />
                  </div>
                  <h3 className="get-started-quick-card-title">
                    Start with Activities
                  </h3>
                  <p className="get-started-quick-card-desc">
                    Jump straight into interactive privacy activities.
                  </p>
                </Link>

                <Link
                  to="/family-hub"
                  className="get-started-quick-card"
                  aria-label="Set Up Family Hub - Create your family profile and track progress"
                >
                  <div className="get-started-quick-icon-wrap">
                    <Users size={32} aria-hidden />
                  </div>
                  <h3 className="get-started-quick-card-title">
                    Set Up Family Hub
                  </h3>
                  <p className="get-started-quick-card-desc">
                    Create your family profile and track progress.
                  </p>
                </Link>

                <Link
                  to="/privacy-panda"
                  className="get-started-quick-card"
                  aria-label="Read Our Story - Learn about Privacy Panda through storytelling"
                >
                  <div className="get-started-quick-icon-wrap">
                    <BookOpen size={32} aria-hidden />
                  </div>
                  <h3 className="get-started-quick-card-title">
                    Read Our Story
                  </h3>
                  <p className="get-started-quick-card-desc">
                    Learn about Privacy Panda through storytelling.
                  </p>
                </Link>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="get-started-cta-section" aria-labelledby="cta-heading">
            <div className="get-started-cta-inner">
              <h2 id="cta-heading" className="get-started-cta-heading">
                Ready to Get Started?
              </h2>
              <p className="get-started-cta-text">
                Pick an option below and start learning about online privacy together—no sign-up required to try.
              </p>
              <div className="get-started-cta-buttons">
                <Link
                  to="/activity-book"
                  className="get-started-cta-btn-primary"
                  aria-label="Start Learning - Begin interactive privacy activities"
                >
                  <Play size={20} aria-hidden />
                  <span>Start Learning</span>
                </Link>
                <Link
                  to="/family-hub"
                  className="get-started-cta-btn-secondary"
                  aria-label="Family Hub - Create your family profile"
                >
                  <Users size={20} aria-hidden />
                  <span>Family Hub</span>
                </Link>
              </div>
              <p className="get-started-cta-legal">
                Maryland residents (MODPA):{' '}
                <a href={PRIVACY_PORTAL_URL} target="_blank" rel="noopener noreferrer">
                  <Scale size={14} aria-hidden />
                  Exercise your privacy rights
                </a>
              </p>
            </div>
          </section>
      </div>
    </PageLayout>
  );
};

export default GetStartedPage;
