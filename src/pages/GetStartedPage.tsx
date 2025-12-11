import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Users, BookOpen, Play, ShoppingBag, BarChart3 } from 'lucide-react';

const GetStartedPage: React.FC = () => {
  const steps = [
    {
      id: 'family-hub',
      title: 'Join PandaGarde Platform',
      description: 'Create your family profile and access the complete privacy education ecosystem.',
      icon: Users,
      link: '/family-hub',
      action: 'Join Platform'
    },
    {
      id: 'service-catalog',
      title: 'Add Services for Digital Footprint Analysis',
      description: 'Tell us which apps and services your family uses. This enables Digital Footprint Analysis, privacy recommendations, and safety alerts.',
      icon: ShoppingBag,
      link: '/service-catalog',
      action: 'Add Services'
    },
    {
      id: 'first-activity',
      title: 'Start Privacy Panda Learning',
      description: 'Begin interactive stories and activities designed for your child\'s age group.',
      icon: Play,
      link: '/privacy-panda',
      action: 'Start Learning'
    },
    {
      id: 'advanced-features',
      title: 'View Your Digital Footprint Analysis',
      description: 'See your family\'s privacy exposure across all services and get personalized recommendations to improve your privacy.',
      icon: BarChart3,
      link: '/digital-footprint',
      action: 'View Analysis'
    },
    {
      id: 'explore-resources',
      title: 'Access Resources',
      description: 'Download guides, activities, and printable materials for continued learning.',
      icon: BookOpen,
      link: '/resources',
      action: 'Access Resources'
    }
  ];

  return (
    <main className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <div className="py-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Back to home page"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Page Header */}
        <section className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-white rounded-lg mb-12">
          <div className="text-center max-w-3xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get Started with PandaGarde
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              Follow our step-by-step guide to begin your family's digital privacy education journey.
            </p>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-12 md:py-16" aria-labelledby="steps-heading">
          <div className="max-w-4xl mx-auto">
            <h2 
              id="steps-heading" 
              className="text-3xl font-bold text-center mb-3 text-[#1B5E20]"
            >
              Getting Started Steps
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12">
              Follow these steps to set up your family's privacy education journey.
            </p>

            <div className="space-y-6" role="list" aria-label="Getting started steps">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div
                    key={step.id}
                    role="listitem"
                    className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row gap-6 items-start">
                      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] text-white flex items-center justify-center text-xl font-bold">
                        {index + 1}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3">
                          <Icon size={24} className="text-[#1B5E20] flex-shrink-0" />
                          <h3 className="text-xl font-bold text-[#1B5E20]">
                            {step.title}
                          </h3>
                        </div>

                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {step.description}
                        </p>

                        <Link
                          to={step.link}
                          className="inline-block px-6 py-3 bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
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
        <section className="py-12 md:py-16 bg-gray-50 rounded-lg mb-12" aria-labelledby="quick-start-heading">
          <div className="max-w-5xl mx-auto px-4">
            <h2 
              id="quick-start-heading" 
              className="text-3xl font-bold text-center mb-3 text-[#1B5E20]"
            >
              Quick Start Options
            </h2>
            <p className="text-lg text-gray-600 text-center mb-12">
              Jump right into specific areas or follow the complete guide.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Link
                to="/activity-book"
                className="bg-white rounded-xl p-8 text-center shadow-md border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                aria-label="Start with Activities - Jump straight into interactive privacy activities"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] text-white flex items-center justify-center mx-auto mb-4">
                  <Play size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#1B5E20] mb-2">
                  Start with Activities
                </h3>
                <p className="text-gray-600">
                  Jump straight into interactive privacy activities.
                </p>
              </Link>

              <Link
                to="/family-hub"
                className="bg-white rounded-xl p-8 text-center shadow-md border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                aria-label="Set Up Family Hub - Create your family profile and track progress"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] text-white flex items-center justify-center mx-auto mb-4">
                  <Users size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#1B5E20] mb-2">
                  Set Up Family Hub
                </h3>
                <p className="text-gray-600">
                  Create your family profile and track progress.
                </p>
              </Link>

              <Link
                to="/story"
                className="bg-white rounded-xl p-8 text-center shadow-md border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                aria-label="Read Our Story - Learn about Privacy Panda through storytelling"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] text-white flex items-center justify-center mx-auto mb-4">
                  <BookOpen size={32} />
                </div>
                <h3 className="text-xl font-bold text-[#1B5E20] mb-2">
                  Read Our Story
                </h3>
                <p className="text-gray-600">
                  Learn about Privacy Panda through storytelling.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section 
          className="py-12 md:py-16 bg-gradient-to-r from-[#1B5E20] to-[#2E7D32] text-white text-center rounded-lg mb-12"
          aria-labelledby="cta-heading"
        >
          <div className="max-w-3xl mx-auto px-4">
            <h2 
              id="cta-heading" 
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Ready to Begin Your Privacy Education Journey?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of families who are already learning about digital privacy with PandaGarde.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/activity-book"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#1B5E20] px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
                aria-label="Start Learning - Begin interactive privacy activities"
              >
                <Play size={20} />
                <span>Start Learning</span>
              </Link>
              <Link
                to="/family-hub"
                className="inline-flex items-center justify-center gap-2 bg-[#2E7D32] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1B5E20] transition-colors border-2 border-white"
                aria-label="Family Hub - Create your family profile"
              >
                <Users size={20} />
                <span>Family Hub</span>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default GetStartedPage;
