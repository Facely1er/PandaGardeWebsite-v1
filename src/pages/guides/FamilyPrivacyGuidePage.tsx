import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart, Users, Shield, BookOpen, Download, CheckCircle } from 'lucide-react';
import Logo from '../../components/Logo';

const FamilyPrivacyGuidePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
        <div className="max-w-4xl mx-auto">
          
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

          {/* Age-Specific Strategies */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--primary)' }}>
              Age-Specific Teaching Strategies
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Ages 5-8 */}
              <div className="bg-white rounded-xl p-6 shadow-md" style={{ backgroundColor: 'var(--card-color)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users size={24} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold" style={{ color: 'var(--primary)' }}>Ages 5-8</h3>
                </div>
                <h4 className="font-semibold mb-3" style={{ color: 'var(--primary)' }}>Basic Concepts</h4>
                <ul className="space-y-2 text-sm" style={{ color: 'var(--gray-600)' }}>
                  <li>• Personal information is like a secret - only share with trusted adults</li>
                  <li>• The internet is like a big playground - stay where adults can see you</li>
                  <li>• If something online makes you feel uncomfortable, tell an adult</li>
                  <li>• Never share your name, address, or school with strangers</li>
                </ul>
                <h4 className="font-semibold mb-3 mt-4" style={{ color: 'var(--primary)' }}>Activities</h4>
                <ul className="space-y-2 text-sm" style={{ color: 'var(--gray-600)' }}>
                  <li>• Privacy Panda coloring activities</li>
                  <li>• "Safe or Unsafe" sorting games</li>
                  <li>• Role-playing scenarios</li>
                </ul>
              </div>

              {/* Ages 9-12 */}
              <div className="bg-white rounded-xl p-6 shadow-md" style={{ backgroundColor: 'var(--card-color)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Shield size={24} className="text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold" style={{ color: 'var(--primary)' }}>Ages 9-12</h3>
                </div>
                <h4 className="font-semibold mb-3" style={{ color: 'var(--primary)' }}>Intermediate Concepts</h4>
                <ul className="space-y-2 text-sm" style={{ color: 'var(--gray-600)' }}>
                  <li>• Understanding digital footprints and permanence</li>
                  <li>• Password security and why it matters</li>
                  <li>• Recognizing phishing and suspicious content</li>
                  <li>• Privacy settings and how to use them</li>
                </ul>
                <h4 className="font-semibold mb-3 mt-4" style={{ color: 'var(--primary)' }}>Activities</h4>
                <ul className="space-y-2 text-sm" style={{ color: 'var(--gray-600)' }}>
                  <li>• Password strength challenges</li>
                  <li>• Digital footprint mapping</li>
                  <li>• Privacy settings exploration</li>
                </ul>
              </div>

              {/* Ages 13-17 */}
              <div className="bg-white rounded-xl p-6 shadow-md" style={{ backgroundColor: 'var(--card-color)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <BookOpen size={24} className="text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold" style={{ color: 'var(--primary)' }}>Ages 13-17</h3>
                </div>
                <h4 className="font-semibold mb-3" style={{ color: 'var(--primary)' }}>Advanced Concepts</h4>
                <ul className="space-y-2 text-sm" style={{ color: 'var(--gray-600)' }}>
                  <li>• Data privacy and how companies collect information</li>
                  <li>• Social media privacy and reputation management</li>
                  <li>• Cybersecurity threats and protection strategies</li>
                  <li>• Digital rights and responsibilities</li>
                </ul>
                <h4 className="font-semibold mb-3 mt-4" style={{ color: 'var(--primary)' }}>Activities</h4>
                <ul className="space-y-2 text-sm" style={{ color: 'var(--gray-600)' }}>
                  <li>• Privacy policy analysis</li>
                  <li>• Social media audit projects</li>
                  <li>• Cybersecurity simulations</li>
                </ul>
              </div>

              {/* All Ages */}
              <div className="bg-white rounded-xl p-6 shadow-md" style={{ backgroundColor: 'var(--card-color)' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Heart size={24} className="text-yellow-600" />
                  </div>
                  <h3 className="text-xl font-bold" style={{ color: 'var(--primary)' }}>All Ages</h3>
                </div>
                <h4 className="font-semibold mb-3" style={{ color: 'var(--primary)' }}>Universal Principles</h4>
                <ul className="space-y-2 text-sm" style={{ color: 'var(--gray-600)' }}>
                  <li>• Think before you share</li>
                  <li>• Treat others online with respect</li>
                  <li>• Ask for help when unsure</li>
                  <li>• Keep personal information private</li>
                </ul>
                <h4 className="font-semibold mb-3 mt-4" style={{ color: 'var(--primary)' }}>Family Activities</h4>
                <ul className="space-y-2 text-sm" style={{ color: 'var(--gray-600)' }}>
                  <li>• Family internet agreement</li>
                  <li>• Regular privacy check-ins</li>
                  <li>• Device-free time together</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Conversation Starters */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--primary)' }}>
              Conversation Starters by Topic
            </h2>
            
            <div className="space-y-8">
              <div className="bg-white rounded-xl p-6 shadow-md" style={{ backgroundColor: 'var(--card-color)' }}>
                <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--primary)' }}>Personal Information</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2" style={{ color: 'var(--primary)' }}>For Younger Children (5-8):</h4>
                    <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                      "What information about yourself would you tell a stranger at the playground? 
                      The internet is like a big playground with lots of people we don't know."
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2" style={{ color: 'var(--primary)' }}>For Older Children (9-17):</h4>
                    <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                      "If you had to choose between sharing your location with a friend or keeping it private, 
                      what would you do? Why? Let's talk about the pros and cons of each choice."
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md" style={{ backgroundColor: 'var(--card-color)' }}>
                <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--primary)' }}>Password Security</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2" style={{ color: 'var(--primary)' }}>For All Ages:</h4>
                    <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                      "If your password was like a key to your house, would you give copies to all your friends? 
                      Let's create a strong password together and talk about why we keep passwords secret."
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md" style={{ backgroundColor: 'var(--card-color)' }}>
                <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--primary)' }}>Digital Footprint</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2" style={{ color: 'var(--primary)' }}>For Teens (13-17):</h4>
                    <p className="text-sm" style={{ color: 'var(--gray-600)' }}>
                      "Imagine everything you post online is like writing in permanent marker on a public wall. 
                      How would that change what you choose to share? Let's look at your social media profiles together."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Implementation Tips */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8" style={{ color: 'var(--primary)' }}>
              Practical Implementation Tips
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-md" style={{ backgroundColor: 'var(--card-color)' }}>
                <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--primary)' }}>Start Early and Be Consistent</h3>
                <ul className="space-y-2 text-sm" style={{ color: 'var(--gray-600)' }}>
                  <li>• Introduce privacy concepts as soon as children start using devices</li>
                  <li>• Use age-appropriate language and examples</li>
                  <li>• Make privacy education a regular part of family conversations</li>
                  <li>• Lead by example with your own online behavior</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md" style={{ backgroundColor: 'var(--card-color)' }}>
                <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--primary)' }}>Create a Safe Learning Environment</h3>
                <ul className="space-y-2 text-sm" style={{ color: 'var(--gray-600)' }}>
                  <li>• Use devices in common areas where you can supervise</li>
                  <li>• Set up parental controls appropriate for your child's age</li>
                  <li>• Encourage questions and open communication</li>
                  <li>• Celebrate good privacy practices</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md" style={{ backgroundColor: 'var(--card-color)' }}>
                <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--primary)' }}>Use Real-World Examples</h3>
                <ul className="space-y-2 text-sm" style={{ color: 'var(--gray-600)' }}>
                  <li>• Discuss news stories about privacy and cybersecurity</li>
                  <li>• Share your own experiences with online privacy</li>
                  <li>• Use current events to start conversations</li>
                  <li>• Point out privacy settings in apps and websites</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md" style={{ backgroundColor: 'var(--card-color)' }}>
                <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--primary)' }}>Make It Interactive and Fun</h3>
                <ul className="space-y-2 text-sm" style={{ color: 'var(--gray-600)' }}>
                  <li>• Use games and activities to teach concepts</li>
                  <li>• Create family challenges around privacy practices</li>
                  <li>• Use the Privacy Panda activities and stories</li>
                  <li>• Celebrate milestones and achievements</li>
                </ul>
              </div>
            </div>
          </section>

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