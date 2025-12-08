import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Star, Users, BookOpen, Shield, Clock, Play } from 'lucide-react';
import Logo from '../components/Logo';

interface Step {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  completed: boolean;
  estimatedTime: string;
  action: string;
}

const GetStartedPage: React.FC = () => {
  const navigate = useNavigate();
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const steps: Step[] = [
    {
      id: 'create-account',
      title: 'Create Your Family Account',
      description: 'Sign up for Family Hub and create your family profile. It only takes a few minutes.',
      icon: Users,
      completed: false,
      estimatedTime: '3 mins',
      action: 'Create account'
    },
    {
      id: 'add-children',
      title: 'Add Your Children',
      description: 'Add your children to your family account so you can see their privacy status.',
      icon: Users,
      completed: false,
      estimatedTime: '2 mins',
      action: 'Add children'
    },
    {
      id: 'see-risks',
      title: 'See Their Privacy Risks',
      description: 'View your dashboard to see which apps and websites your children use and their privacy risks.',
      icon: Shield,
      completed: false,
      estimatedTime: '2 mins',
      action: 'View dashboard'
    },
    {
      id: 'start-education',
      title: 'Start Privacy Education',
      description: 'Begin privacy education activities with your children to help them learn about staying safe online.',
      icon: Play,
      completed: false,
      estimatedTime: '10 mins',
      action: 'Start education'
    }
  ];

  const handleStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }
  };

  const getStepAction = (step: Step) => {
    switch (step.id) {
      case 'create-account':
        return () => window.open('https://www.hub.pandagarde.com', '_blank');
      case 'add-children':
        return () => window.open('https://www.hub.pandagarde.com', '_blank');
      case 'see-risks':
        return () => window.open('https://www.hub.pandagarde.com', '_blank');
      case 'start-education':
        return () => navigate('/privacy-panda');
      default:
        return () => {};
    }
  };

  const completionPercentage = Math.round((completedSteps.length / steps.length) * 100);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--white)', color: 'var(--gray-800)' }}>
      {/* Header */}
      <header className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><pattern id='grain' width='100' height='100' patternUnits='userSpaceOnUse'><circle cx='20' cy='20' r='1' fill='rgba(255,255,255,0.1)'/><circle cx='80' cy='40' r='1' fill='rgba(255,255,255,0.05)'/><circle cx='40' cy='80' r='1' fill='rgba(255,255,255,0.1)'/></pattern></defs><rect width='100%' height='100%' fill='url(%23grain)'/></svg>")`
          }} />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex items-center justify-center mb-8">
            <div className="w-20 h-20 mr-4">
              <Logo />
            </div>
          </div>

          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6">
              <Star size={16} />
              <span className="text-sm font-semibold">GET STARTED</span>
            </div>

            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Get Started: Protect Your Family Online
              <span className="block text-yellow-300">Simple Steps for Parents</span>
            </h1>

            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Follow these simple steps to start protecting your family's online privacy. Everything is designed to be easy, even if you're not tech-savvy.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock size={16} />
                <span>~20 minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={16} />
                <span>Family Friendly</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} />
                <span>Privacy First</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-gray-50" style={{ backgroundColor: 'var(--light)' }}>
        <div className="container mx-auto px-6 py-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
            style={{ color: 'var(--primary-light)' }}
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Progress Overview */}
      <section className="container mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12" style={{
          backgroundColor: 'var(--card-color)',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
              Your Progress
            </h2>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div
                className="h-4 rounded-full transition-all duration-500 bg-gradient-to-r from-green-500 to-blue-600"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
            <p className="text-lg" style={{ color: 'var(--gray-600)' }}>
              {completedSteps.length} of {steps.length} steps completed ({completionPercentage}%)
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="container mx-auto px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
              Steps to Protect Your Family
            </h2>
            <p className="text-lg" style={{ color: 'var(--gray-600)' }}>
              Follow these four simple steps to start protecting your family's online privacy. Each step is designed for parents.
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = completedSteps.includes(step.id);

              return (
                <div
                  key={step.id}
                  className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all border-2 ${
                    isCompleted ? 'border-green-500' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: 'var(--card-color)' }}
                >
                  <div className="p-6">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                          isCompleted
                            ? 'bg-green-500 text-white'
                            : 'bg-gradient-to-r from-green-500 to-blue-600 text-white'
                        }`}>
                          {isCompleted ? (
                            <CheckCircle size={32} />
                          ) : (
                            <span className="text-2xl font-bold">{index + 1}</span>
                          )}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold" style={{ color: 'var(--primary)' }}>
                            {step.title}
                          </h3>
                          {isCompleted && (
                            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full">
                              Completed
                            </span>
                          )}
                        </div>

                        <p className="text-lg mb-4" style={{ color: 'var(--gray-600)' }}>
                          {step.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock size={16} />
                              {step.estimatedTime}
                            </span>
                            <span className="flex items-center gap-1">
                              <Icon size={16} />
                              Step {index + 1}
                            </span>
                          </div>

                          <button
                            onClick={() => {
                              getStepAction(step)();
                              handleStepComplete(step.id);
                            }}
                            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                              isCompleted
                                ? 'bg-gray-100 text-gray-600 cursor-not-allowed'
                                : 'bg-gradient-to-r from-green-500 to-blue-600 text-white hover:from-green-600 hover:to-blue-700'
                            }`}
                            disabled={isCompleted}
                          >
                            {isCompleted ? 'Completed' : step.action}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Start Options */}
      <section className="bg-gray-50 py-16" style={{ backgroundColor: 'var(--light)' }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
              Quick Start Options
            </h2>
            <p className="text-lg" style={{ color: 'var(--gray-600)' }}>
              Jump right into protecting your family or follow the complete guide step by step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <a
              href="https://www.hub.pandagarde.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all transform hover:scale-105 text-center"
              style={{ backgroundColor: 'var(--card-color)' }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <Shield size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--primary)' }}>
                Start Protecting Your Family
              </h3>
              <p className="text-gray-600 mb-4">
                Go straight to Family Hub to see your family's privacy status and start taking action.
              </p>
              <span className="text-green-600 font-semibold">Go to Family Hub →</span>
            </a>

            <Link
              to="/parent-resources"
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all transform hover:scale-105 text-center"
              style={{ backgroundColor: 'var(--card-color)' }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <BookOpen size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--primary)' }}>
                View Parent Guides
              </h3>
              <p className="text-gray-600 mb-4">
                Get guides, conversation starters, and resources to help you protect your family.
              </p>
              <span className="text-green-600 font-semibold">View Guides →</span>
            </Link>

            <Link
              to="/privacy-panda"
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all transform hover:scale-105 text-center"
              style={{ backgroundColor: 'var(--card-color)' }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                <Play size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: 'var(--primary)' }}>
                Start Privacy Education
              </h3>
              <p className="text-gray-600 mb-4">
                Begin privacy education activities with your children to help them learn about staying safe online.
              </p>
              <span className="text-green-600 font-semibold">Start Activities →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Protecting Your Family?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of parents who are already keeping their families safe online with simple, easy-to-use tools.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://www.hub.pandagarde.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
            >
              <Shield size={20} />
              Start Protecting Your Family
            </a>
            <Link
              to="/overview"
              className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors inline-flex items-center gap-2"
            >
              <BookOpen size={20} />
              See How It Works
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetStartedPage;