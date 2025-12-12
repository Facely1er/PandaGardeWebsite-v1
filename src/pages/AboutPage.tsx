import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, GraduationCap, Accessibility as UniversalAccess, Gamepad2, Lock, Users, Shield, School, Rocket } from 'lucide-react';
import PageLayout from '../components/layout/PageLayout';

const AboutPage: React.FC = () => {

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const values = [
    {
      icon: Heart,
      title: 'Family-Centered',
      description: 'We design for families, understanding that privacy education is most effective when it involves parents, children, and educators working together toward common goals.'
    },
    {
      icon: GraduationCap,
      title: 'Evidence-Based',
      description: 'Our educational content is grounded in research on child development, learning science, and privacy best practices, ensuring effective and age-appropriate education.'
    },
    {
      icon: UniversalAccess,
      title: 'Accessible',
      description: 'Privacy education should be available to all families, regardless of technical background or economic circumstances. We strive to make our resources widely accessible.'
    },
    {
      icon: Gamepad2,
      title: 'Engaging',
      description: 'Learning about privacy should be fun and engaging. We use games, stories, and interactive activities to make complex concepts accessible and memorable.'
    },
    {
      icon: Lock,
      title: 'Privacy-Respecting',
      description: 'We practice what we teach. Our platform is designed with privacy by design principles, collecting minimal data and respecting user privacy at every step.'
    },
    {
      icon: Users,
      title: 'Community-Driven',
      description: 'We believe in the power of community. Parents, educators, and privacy experts all contribute to making PandaGarde a better resource for families.'
    }
  ];

  return (
    <PageLayout
      title="About PandaGarde"
      subtitle="We're on a mission to build privacy skills for tomorrow's world through comprehensive, engaging, and age-appropriate digital privacy education."
      icon={Shield}
      badge="ABOUT US"
    >
      <div className="max-w-6xl mx-auto">

          {/* Mission Section */}
          <section className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--primary)' }}>
                  Our Mission
                </h2>
                <div className="space-y-6 text-lg leading-relaxed" style={{ color: 'var(--gray-600)' }}>
                  <p>
                    At PandaGarde, we believe that privacy education should start early and be accessible to everyone.
                    Our mission is to empower children and families with the knowledge and skills they need to navigate
                    the digital world safely and confidently.
                  </p>
                  <p>
                    Through our Privacy Panda character and comprehensive educational resources, we aim to build a
                    foundation of digital literacy that will serve children throughout their lives, helping them make
                    informed decisions about their online privacy and security.
                  </p>
                  <p>
                    We're committed to making privacy education fun, engaging, and effective for learners of all ages,
                    from young children just beginning their digital journey to teenagers preparing for independent online life.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-12 text-center"
                   style={{ backgroundColor: 'var(--light)' }}>
                <div className="w-32 h-32 bg-gradient-to-r from-green-600 to-green-500 rounded-full flex items-center justify-center text-white text-5xl mx-auto mb-6">
                  <Shield size={64} />
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
                  Privacy First
                </h3>
                <p style={{ color: 'var(--gray-600)' }}>
                  Building a safer digital future for families everywhere
                </p>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6" style={{ color: 'var(--primary)' }}>
                Our Core Values
              </h2>
              <p className="text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: 'var(--gray-600)' }}>
                These principles guide everything we do at PandaGarde, from product development to community engagement.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-2 border-2 border-gray-100"
                    style={{
                      backgroundColor: 'var(--card-color)',
                      borderColor: 'var(--gray-200)'
                    }}
                  >
                    <div className="w-20 h-20 bg-gradient-to-r from-green-600 to-green-500 rounded-xl flex items-center justify-center text-white mx-auto mb-6">
                      <IconComponent size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
                      {value.title}
                    </h3>
                    <p className="leading-relaxed" style={{ color: 'var(--gray-600)' }}>
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Educational Approach Section */}
          <section className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="bg-gray-50 rounded-2xl p-12 text-center order-2 lg:order-1"
                   style={{ backgroundColor: 'var(--light)' }}>
                <div className="w-32 h-32 bg-gradient-to-r from-green-600 to-green-500 rounded-full flex items-center justify-center text-white text-5xl mx-auto mb-6">
                  <School size={64} />
                </div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--primary)' }}>
                  K-12 Standards
                </h3>
                <p style={{ color: 'var(--gray-600)' }}>
                  Curriculum aligned with educational standards nationwide
                </p>
              </div>

              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold mb-6" style={{ color: 'var(--primary)' }}>
                  Comprehensive K-12 Integration
                </h2>
                <div className="space-y-6 text-lg leading-relaxed" style={{ color: 'var(--gray-600)' }}>
                  <p>
                    PandaGarde serves both families and educational institutions with a complete K-12 privacy curriculum.
                    Our standards-aligned approach ensures seamless integration into existing digital citizenship and
                    computer science programs.
                  </p>
                  <p>
                    We provide flexible implementation timelines (6-week, 2-week, condensed, and after-school formats)
                    with complete lesson plans, assessments, and teacher support materials.
                  </p>
                  <p>
                    Our curriculum progression builds privacy literacy from elementary through high school, preparing
                    students for lifelong digital citizenship and privacy awareness.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Team Approach Section */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6" style={{ color: 'var(--primary)' }}>
                Our Approach
              </h2>
            </div>

            <div className="bg-gray-50 rounded-2xl p-12 text-center max-w-4xl mx-auto"
                 style={{ backgroundColor: 'var(--light)' }}>
              <h3 className="text-3xl font-bold mb-6" style={{ color: 'var(--primary)' }}>
                Expert-Designed, Family-Tested
              </h3>
              <p className="text-lg leading-relaxed" style={{ color: 'var(--gray-600)' }}>
                PandaGarde is developed by a team of privacy experts, educators, and child development specialists
                who understand both the technical aspects of digital privacy and the unique challenges of teaching
                these concepts to children. Every resource is tested with real families to ensure it's both
                educational and engaging.
              </p>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center">
            <div className="bg-gradient-to-r from-green-800 via-green-600 to-green-500 rounded-2xl p-16 text-white">
              <h2 className="text-4xl font-bold mb-6">
                Join Our Mission
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
                Ready to start building privacy skills with your family? Explore our platform and discover how
                PandaGarde can help your family navigate the digital world with confidence.
              </p>
              <Link
                to="/family-hub"
                className="inline-flex items-center gap-3 bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
              >
                <Rocket size={24} />
                Start Your Journey
              </Link>
            </div>
          </section>
        </div>
    </PageLayout>
  );
};

export default AboutPage;