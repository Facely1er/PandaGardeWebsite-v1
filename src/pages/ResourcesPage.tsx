import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MessageCircle, FileText, Shield, Download, Users, Award, Eye, Heart, Brain, BookOpen, Globe, ArrowRight } from 'lucide-react';

const ResourcesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('comprehensive-guides');

  const openResourceTab = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <main id="main-content">
      {/* Back Navigation */}
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem 1.5rem' }}>
        <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors" style={{ textDecoration: 'none' }}>
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>

      {/* Page Header */}
      <section style={{ padding: 'clamp(3rem, 6vw, 4rem) 0', background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)' }}>
        <div className="container">
          <div className="text-center fade-in" style={{ textAlign: 'center' }}>
            <h1 style={{
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: '800',
              lineHeight: '1.1',
              marginBottom: '1rem',
              color: '#0f172a'
            }}>
              Parent & Educator Resources
            </h1>
            <p style={{
              fontSize: '1.125rem',
              color: '#64748b',
              maxWidth: '48rem',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Comprehensive tools, guides, and materials to help adults facilitate privacy education for children. Everything you need to create a safe digital environment for your family.
            </p>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="resources-section" id="parent-resources" style={{ padding: 'clamp(4rem, 8vw, 6rem) 0', background: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div className="resources-tabs" style={{ 
            display: 'flex', 
            gap: '0.5rem', 
            marginBottom: '3rem', 
            flexWrap: 'wrap', 
            justifyContent: 'center' 
          }}>
            <div
              className={`resource-tab ${activeTab === 'comprehensive-guides' ? 'active' : ''}`}
              onClick={() => openResourceTab('comprehensive-guides')}
            >
              <BookOpen size={16} />
              Comprehensive Guides
            </div>
            <div
              className={`resource-tab ${activeTab === 'discussion-guides' ? 'active' : ''}`}
              onClick={() => openResourceTab('discussion-guides')}
            >
              <MessageCircle size={16} />
              Discussion Guides
            </div>
            <div
              className={`resource-tab ${activeTab === 'printable-resources' ? 'active' : ''}`}
              onClick={() => openResourceTab('printable-resources')}
            >
              <FileText size={16} />
              Printable Resources
            </div>
            <div
              className={`resource-tab ${activeTab === 'digital-safety' ? 'active' : ''}`}
              onClick={() => openResourceTab('digital-safety')}
            >
              <Shield size={16} />
              Digital Safety Tips
            </div>
            <div
              className={`resource-tab ${activeTab === 'activities-tools' ? 'active' : ''}`}
              onClick={() => openResourceTab('activities-tools')}
            >
              <Users size={16} />
              Activities & Tools
            </div>
          </div>

          {/* Comprehensive Guides Tab */}
          <div className={`resource-content ${activeTab === 'comprehensive-guides' ? 'active' : ''}`} style={{ display: activeTab === 'comprehensive-guides' ? 'block' : 'none' }}>
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
              <h3 style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: '700',
                color: '#0f172a',
                marginBottom: '0.75rem'
              }}>Comprehensive Privacy Education Guides</h3>
              <p style={{
                fontSize: '1.125rem',
                color: '#64748b',
                maxWidth: '800px',
                margin: '0 auto',
                lineHeight: '1.6'
              }}>In-depth guides covering all aspects of digital privacy education for families and educators. These comprehensive resources provide everything you need to teach children about online safety.</p>
            </div>

            <div className="resource-grid">
              <div className="resource-card">
                <div className="flex items-center gap-3 mb-3">
                  <Heart size={20} className="text-red-500" />
                  <h4>Complete Family Privacy Guide</h4>
                </div>
                <p>Everything parents need to know about teaching digital privacy to children of all ages. Includes age-specific strategies, conversation starters, and practical implementation tips.</p>
                <div className="flex items-center gap-4 mt-4">
                  <Link to="/parent-resources" className="button">
                    <Download size={16} />
                    Download PDF
                  </Link>
                  <span className="text-sm text-gray-500">45 min read</span>
                </div>
              </div>

              <div className="resource-card">
                <div className="flex items-center gap-3 mb-3">
                  <Brain size={20} className="text-purple-500" />
                  <h4>Educator's Privacy Toolkit</h4>
                </div>
                <p>Comprehensive resources for teachers and educators, including curriculum guides, lesson plans, assessment tools, and professional development materials.</p>
                <div className="flex items-center gap-4 mt-4">
                  <Link to="/educator-tools" className="button">
                    <Download size={16} />
                    View Toolkit
                  </Link>
                  <span className="text-sm text-gray-500">Full Year Curriculum</span>
                </div>
              </div>

              <div className="resource-card">
                <div className="flex items-center gap-3 mb-3">
                  <Shield size={20} className="text-green-500" />
                  <h4>Digital Safety Emergency Guide</h4>
                </div>
                <p>Step-by-step instructions for handling privacy breaches, cyberbullying, and other digital safety emergencies. Includes legal considerations and recovery strategies.</p>
                <div className="flex items-center gap-4 mt-4">
                  <Link to="/parent-resources" className="button">
                    <Download size={16} />
                    Download PDF
                  </Link>
                  <span className="text-sm text-gray-500">25 min read</span>
                </div>
              </div>

              <div className="resource-card">
                <div className="flex items-center gap-3 mb-3">
                  <Users size={20} className="text-blue-500" />
                  <h4>Age-Specific Privacy Guides</h4>
                </div>
                <p>Tailored guides for different age groups (5-8, 9-12, 13-17), covering developmentally appropriate concepts and teaching strategies for each stage.</p>
                <div className="flex items-center gap-4 mt-4">
                  <Link to="/parent-resources" className="button">
                    <Download size={16} />
                    Download PDF
                  </Link>
                  <span className="text-sm text-gray-500">35 min read</span>
                </div>
              </div>
            </div>
          </div>

          {/* Discussion Guides Tab */}
          <div className={`resource-content ${activeTab === 'discussion-guides' ? 'active' : ''}`} style={{ display: activeTab === 'discussion-guides' ? 'block' : 'none' }}>
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
              <h3 style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: '700',
                color: '#0f172a',
                marginBottom: '0.75rem'
              }}>Discussion Guides for Parents & Educators</h3>
              <p style={{
                fontSize: '1.125rem',
                color: '#64748b',
                maxWidth: '800px',
                margin: '0 auto',
                lineHeight: '1.6'
              }}>These discussion guides are designed to help you have meaningful conversations about digital privacy with children. Each guide includes age-appropriate language, example scenarios, and follow-up questions.</p>
            </div>

            <div className="discussion-guide">
              <h4>How to Talk About Personal Information</h4>
              <p>A guide to helping children understand what personal information is and why it's important to protect it.</p>
              <ul>
                <li><strong>Start with examples:</strong> "Personal information is like your special bamboo - it belongs just to you! This includes your full name, home address, phone number, and birthday."</li>
                <li><strong>Use the playground analogy:</strong> "Would you tell a stranger at the playground where you live? The internet is like a big playground with lots of people we don't know."</li>
                <li><strong>Follow-up questions:</strong> "What kind of information do you think is okay to share online? What information should we keep private?"</li>
              </ul>
            </div>

            <div className="discussion-guide">
              <h4>Password Safety Conversations</h4>
              <p>Help children understand the importance of strong passwords and keeping them secret.</p>
              <ul>
                <li><strong>Explain with a door lock analogy:</strong> "Passwords are like special keys to your digital home. Just like we don't give house keys to strangers, we don't share our passwords."</li>
                <li><strong>Practice creating strong passwords:</strong> "Let's make up a special code that would be hard for someone else to guess!"</li>
                <li><strong>Follow-up questions:</strong> "Why do we need different passwords for different places? Who is it okay to share your password with?"</li>
              </ul>
            </div>
          </div>

          {/* Printable Resources Tab */}
          <div className={`resource-content ${activeTab === 'printable-resources' ? 'active' : ''}`} style={{ display: activeTab === 'printable-resources' ? 'block' : 'none' }}>
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
              <h3 style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: '700',
                color: '#0f172a',
                marginBottom: '0.75rem'
              }}>Printable Resources</h3>
              <p style={{
                fontSize: '1.125rem',
                color: '#64748b',
                maxWidth: '800px',
                margin: '0 auto',
                lineHeight: '1.6'
              }}>A collection of printable materials to support privacy education at home or in the classroom.</p>
            </div>

            <div className="resource-grid">
              <div className="resource-card">
                <h4>Privacy Panda Coloring Sheets</h4>
                <p>A set of 10 coloring pages featuring Privacy Panda and friends learning about online safety. Each page includes a simple privacy tip.</p>
                <Link
                  to="/downloads/coloring-sheets"
                  className="button"
                >
                  Download PDF
                </Link>
              </div>

              <div className="resource-card">
                <h4>Digital Safety Posters</h4>
                <p>Classroom-ready posters highlighting key privacy concepts. Print and display these colorful reminders about password safety and personal information.</p>
                <Link
                  to="/downloads/safety-posters"
                  className="button"
                >
                  Download PDF
                </Link>
              </div>

              <div className="resource-card">
                <h4>Privacy Panda Certificate</h4>
                <p>Celebrate learning with these printable certificates to award children after they complete privacy education activities.</p>
                <Link
                  to="/downloads/certificates"
                  className="button"
                >
                  Download PDF
                </Link>
              </div>

              <div className="resource-card">
                <h4>Family Internet Agreement</h4>
                <p>A customizable document to help families establish guidelines for internet use, with child-friendly language and signature spaces.</p>
                <Link
                  to="/downloads/family-agreement"
                  className="button"
                >
                  Download PDF
                </Link>
              </div>
            </div>
          </div>

          {/* Digital Safety Tips Tab */}
          <div className={`resource-content ${activeTab === 'digital-safety' ? 'active' : ''}`} style={{ display: activeTab === 'digital-safety' ? 'block' : 'none' }}>
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
              <h3 style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: '700',
                color: '#0f172a',
                marginBottom: '0.75rem'
              }}>Digital Safety Tips for Families</h3>
              <p style={{
                fontSize: '1.125rem',
                color: '#64748b',
                maxWidth: '800px',
                margin: '0 auto',
                lineHeight: '1.6'
              }}>Expert advice to help parents and caregivers create a safe digital environment for children.</p>
            </div>

            <div className="resource-grid">
              <div className="resource-card">
                <h4>Setting Up Child-Friendly Devices</h4>
                <p>Learn how to configure tablets, smartphones, and computers with appropriate controls and settings for young children.</p>
                <Link to="/guides/device-setup" className="button">Read More</Link>
              </div>

              <div className="resource-card">
                <h4>Choosing Child-Safe Apps and Games</h4>
                <p>What to look for when selecting digital content for children. Learn about privacy ratings and app permissions.</p>
                <Link to="/guides/app-selection" className="button">Read More</Link>
              </div>

              <div className="resource-card">
                <h4>Modeling Good Digital Citizenship</h4>
                <p>Tips for parents on how to demonstrate healthy online behavior. Children learn by watching adults.</p>
                <Link to="/guides/modeling-behavior" className="button">Read More</Link>
              </div>

              <div className="resource-card">
                <h4>Responding to Privacy Concerns</h4>
                <p>What to do if you encounter privacy issues or if your child accidentally shares sensitive information online.</p>
                <Link to="/guides/privacy-concerns" className="button">Read More</Link>
              </div>
            </div>
          </div>

          {/* Activities & Tools Tab */}
          <div className={`resource-content ${activeTab === 'activities-tools' ? 'active' : ''}`} style={{ display: activeTab === 'activities-tools' ? 'block' : 'none' }}>
            <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
              <h3 style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: '700',
                color: '#0f172a',
                marginBottom: '0.75rem'
              }}>Interactive Activities & Practical Tools</h3>
              <p style={{
                fontSize: '1.125rem',
                color: '#64748b',
                maxWidth: '800px',
                margin: '0 auto',
                lineHeight: '1.6'
              }}>Hands-on activities, games, and practical tools to make privacy education engaging and effective for children of all ages.</p>
            </div>

            <div className="resource-grid">
              <div className="resource-card">
                <div className="flex items-center gap-3 mb-3">
                  <Users size={20} className="text-green-500" />
                  <h4>Privacy Learning Activities Kit</h4>
                </div>
                <p>20 hands-on activities including games, crafts, role-playing scenarios, and interactive exercises to teach privacy concepts through play.</p>
                <div className="flex items-center gap-4 mt-4">
                  <Link to="/parent-resources" className="button">
                    <Download size={16} />
                    Download Kit
                  </Link>
                  <span className="text-sm text-gray-500">Ages 5-12</span>
                </div>
              </div>

              <div className="resource-card">
                <div className="flex items-center gap-3 mb-3">
                  <FileText size={20} className="text-blue-500" />
                  <h4>Family Privacy Agreement Template</h4>
                </div>
                <p>Customizable template for creating family rules about digital privacy, device usage, and online behavior. Includes child-friendly language and signature spaces.</p>
                <div className="flex items-center gap-4 mt-4">
                  <Link to="/parent-resources" className="button">
                    <Download size={16} />
                    Download Template
                  </Link>
                  <span className="text-sm text-gray-500">All Ages</span>
                </div>
              </div>

              <div className="resource-card">
                <div className="flex items-center gap-3 mb-3">
                  <Award size={20} className="text-yellow-500" />
                  <h4>Privacy Achievement Certificates</h4>
                </div>
                <p>Printable certificates and badges to celebrate children's privacy learning milestones. Includes Privacy Panda certificates, Digital Citizen awards, and more.</p>
                <div className="flex items-center gap-4 mt-4">
                  <Link to="/certificates" className="button">
                    <Download size={16} />
                    Generate Certificates
                  </Link>
                  <span className="text-sm text-gray-500">All Ages</span>
                </div>
              </div>

              <div className="resource-card">
                <div className="flex items-center gap-3 mb-3">
                  <Eye size={20} className="text-purple-500" />
                  <h4>Privacy Education Posters</h4>
                </div>
                <p>Set of 12 colorful posters featuring key privacy concepts, safety rules, and reminders. Perfect for home or classroom display.</p>
                <div className="flex items-center gap-4 mt-4">
                  <Link to="/parent-resources" className="button">
                    <Download size={16} />
                    Download Posters
                  </Link>
                  <span className="text-sm text-gray-500">Print & Display</span>
                </div>
              </div>

              <div className="resource-card">
                <div className="flex items-center gap-3 mb-3">
                  <FileText size={20} className="text-orange-500" />
                  <h4>Privacy Learning Worksheets</h4>
                </div>
                <p>Educational worksheets and activity sheets for reinforcing privacy concepts through writing, drawing, and reflection exercises.</p>
                <div className="flex items-center gap-4 mt-4">
                  <Link to="/parent-resources" className="button">
                    <Download size={16} />
                    Download Worksheets
                  </Link>
                  <span className="text-sm text-gray-500">Ages 5-12</span>
                </div>
              </div>

              <div className="resource-card">
                <div className="flex items-center gap-3 mb-3">
                  <Shield size={20} className="text-red-500" />
                  <h4>Device Setup Checklists</h4>
                </div>
                <p>Step-by-step checklists for configuring child-safe settings on phones, tablets, computers, and gaming devices. Includes all major platforms.</p>
                <div className="flex items-center gap-4 mt-4">
                  <Link to="/parent-resources" className="button">
                    <Download size={16} />
                    Download Checklists
                  </Link>
                  <span className="text-sm text-gray-500">All Devices</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Resources Section */}
      <section className="community-resources" style={{ padding: 'clamp(4rem, 8vw, 6rem) 0', background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div className="section-header fade-in text-center" style={{ marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              fontWeight: '700',
              color: '#1B5E20',
              marginBottom: '0.75rem'
            }}>Community Resources</h2>
            <p style={{
              fontSize: '1.125rem',
              color: '#64748b',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Connect with other families, share success stories, and discover community-voted privacy resources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Link to="/community/forum" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all transform hover:scale-105" style={{ backgroundColor: 'var(--card-color)' }}>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white mb-4">
                <MessageCircle size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--primary)' }}>
                Privacy Tips Forum
              </h3>
              <p className="text-gray-600 mb-4">
                Join discussions, share tips, and ask questions in our privacy-first forum.
              </p>
              <span className="text-green-600 font-semibold flex items-center gap-2">
                Visit Forum <ArrowRight size={16} />
              </span>
            </Link>

            <Link to="/community/stories" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all transform hover:scale-105" style={{ backgroundColor: 'var(--card-color)' }}>
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg flex items-center justify-center text-white mb-4">
                <Heart size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--primary)' }}>
                Success Stories
              </h3>
              <p className="text-gray-600 mb-4">
                Read and share anonymous success stories about teaching privacy to children.
              </p>
              <span className="text-green-600 font-semibold flex items-center gap-2">
                View Stories <ArrowRight size={16} />
              </span>
            </Link>

            <Link to="/community/resources" className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all transform hover:scale-105" style={{ backgroundColor: 'var(--card-color)' }}>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white mb-4">
                <Globe size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--primary)' }}>
                Community Resources
              </h3>
              <p className="text-gray-600 mb-4">
                Discover privacy tools and resources shared and voted on by the community.
              </p>
              <span className="text-green-600 font-semibold flex items-center gap-2">
                Browse Resources <ArrowRight size={16} />
              </span>
            </Link>
          </div>

          <div className="mt-8 text-center">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 inline-block">
              <p className="text-sm text-green-800">
                <strong>Privacy First:</strong> All community features use localStorage—your data never leaves your device. Completely anonymous and private.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ResourcesPage;