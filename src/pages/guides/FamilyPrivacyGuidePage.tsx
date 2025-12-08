import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Users, Shield, BookOpen, Download, CheckCircle, MessageCircle, Brain, UserCheck } from 'lucide-react';
import Logo from '../../components/Logo';
import { allGuideSections, getRelevantSectionsForAges, type GuideSection } from '../../data/familyPrivacyGuide';
import GuideContentRenderer from '../../components/GuideContentRenderer';
import { useFamily } from '../../contexts/FamilyContext';

const FamilyPrivacyGuidePage: React.FC = () => {
  const { familyMembers } = useFamily();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get relevant sections based on family member ages
  const relevantSections = useMemo(() => {
    const ages = familyMembers
      .filter(m => m.profile_data?.age)
      .map(m => m.profile_data!.age!);
    
    if (ages.length > 0) {
      return getRelevantSectionsForAges(ages);
    }
    return allGuideSections;
  }, [familyMembers]);

  const getSectionIcon = (sectionId: string) => {
    switch (sectionId) {
      case 'children-5-12': return Heart;
      case 'teens-13-17': return Brain;
      case 'adults': return Shield;
      case 'seniors': return UserCheck;
      case 'conversation-approaches': return MessageCircle;
      case 'privacy-plan': return CheckCircle;
      case 'safety-net': return Users;
      default: return BookOpen;
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--white)', color: 'var(--gray-800)' }}>
      {/* Page Header */}
      <header className="bg-gradient-to-r from-green-600 to-green-500 text-white py-20 relative overflow-hidden">
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
              <Heart size={16} />
              <span className="text-sm font-semibold">FAMILY GUIDE</span>
            </div>

            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Complete Family Privacy Guide
            </h1>

            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Everything parents need to know about teaching digital privacy to children of all ages. Includes age-specific strategies, conversation starters, and practical implementation tips.
            </p>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-gray-50" style={{ backgroundColor: 'var(--light)' }}>
        <div className="container mx-auto px-6 py-4">
          <Link
            to="/parent-resources"
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
            style={{ color: 'var(--primary-light)' }}
          >
            <ArrowLeft size={16} />
            Back to Parent Resources
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-20">
        <div className="flex gap-8">
          {/* Sticky Sidebar Navigation */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl p-4 shadow-md" style={{ backgroundColor: 'var(--card-color)' }}>
                <h3 className="font-semibold mb-4" style={{ color: 'var(--primary)' }}>Guide Sections</h3>
                <nav className="space-y-2">
                  {allGuideSections.map((section) => {
                    const Icon = getSectionIcon(section.id);
                    return (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                          activeSection === section.id
                            ? 'bg-green-100 text-green-700'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                        style={{
                          backgroundColor: activeSection === section.id ? 'var(--secondary)' : undefined,
                          color: activeSection === section.id ? 'var(--primary)' : undefined
                        }}
                      >
                        <Icon size={16} />
                        <span className="truncate">{section.title}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 max-w-4xl">
            {/* Introduction */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--primary)' }}>
                Why Digital Privacy Education Matters
              </h2>
              <p className="text-lg leading-relaxed mb-6" style={{ color: 'var(--gray-600)' }}>
                In today's digital world, children are growing up with technology as a natural part of their lives. 
                Teaching them about digital privacy from an early age helps them develop healthy online habits and 
                protects them from potential risks.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6" style={{ backgroundColor: 'var(--light)' }}>
                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--primary)' }}>
                  Key Benefits of Early Privacy Education
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Builds critical thinking skills about online information sharing</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Creates a foundation for responsible digital citizenship</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Reduces risk of cyberbullying and online exploitation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-600 mt-1 flex-shrink-0" />
                    <span>Empowers children to make informed decisions about their digital footprint</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Comprehensive Guide Sections */}
            {allGuideSections.map((section) => {
              const Icon = getSectionIcon(section.id);
              return (
                <section
                  key={section.id}
                  id={section.id}
                  className="mb-16 scroll-mt-24"
                >
                  <div className="bg-white rounded-xl p-8 shadow-md" style={{ backgroundColor: 'var(--card-color)' }}>
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                        <Icon size={24} />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-3xl font-bold mb-2" style={{ color: 'var(--primary)' }}>
                          {section.title}
                        </h2>
                        {section.subtitle && (
                          <p className="text-lg italic" style={{ color: 'var(--gray-600)' }}>
                            {section.subtitle}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-2 mt-3">
                          {section.ageGroups.map((ageGroup) => (
                            <span
                              key={ageGroup}
                              className="px-2 py-1 bg-gray-100 rounded text-xs font-medium"
                              style={{ backgroundColor: 'var(--light)', color: 'var(--gray-600)' }}
                            >
                              {ageGroup === 'all' ? 'All Ages' : 
                               ageGroup === 'adult' ? 'Adults' :
                               ageGroup === 'senior' ? 'Seniors' :
                               `Ages ${ageGroup}`}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="prose max-w-none">
                      {section.content.map((contentItem, idx) => (
                        <GuideContentRenderer key={idx} content={contentItem} index={idx} />
                      ))}
                    </div>
                  </div>
                </section>
              );
            })}


          {/* Resources */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--primary)' }}>
              Additional Resources
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link
                to="/downloads/family-agreement"
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-center"
                style={{ backgroundColor: 'var(--card-color)' }}
              >
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Download size={24} className="text-green-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                  Family Internet Agreement
                </h3>
                <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                  Customizable template for family rules
                </p>
              </Link>

              <Link
                to="/activities/privacy-learning-kit"
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-center"
                style={{ backgroundColor: 'var(--card-color)' }}
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <BookOpen size={24} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                  Learning Activities Kit
                </h3>
                <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                  Hands-on activities for all ages
                </p>
              </Link>

              <Link
                to="/guides/age-specific"
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-center"
                style={{ backgroundColor: 'var(--card-color)' }}
              >
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Users size={24} className="text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                  Age-Specific Guides
                </h3>
                <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                  Detailed guides for each age group
                </p>
              </Link>

              <Link
                to="/family-privacy-plan"
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow text-center"
                style={{ backgroundColor: 'var(--card-color)' }}
              >
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <CheckCircle size={24} className="text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--primary)' }}>
                  Privacy Plan Builder
                </h3>
                <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                  Create your family privacy plan
                </p>
              </Link>
            </div>
          </section>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">
              Ready to Start Your Family's Privacy Journey?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Download our family agreement template and start having meaningful conversations about digital privacy today.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/downloads/family-agreement"
                className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Download Family Agreement
              </Link>
              <Link
                to="/parent-resources"
                className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition-colors"
              >
                Explore More Resources
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FamilyPrivacyGuidePage;