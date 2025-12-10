import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ClipboardCheck as ChalkboardTeacher, MessageCircle, FileText, Shield, Download, Users, Award, Eye, Heart, Brain, BookOpen, Globe, ArrowRight } from 'lucide-react';

const ResourcesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('comprehensive-guides');

  const openResourceTab = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <main id="main-content">
      {/* Back Navigation */}
      <div className="container py-6">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>

      {/* Resource Categories */}
      <section className="resources-section" id="parent-resources">
        <div className="container">
          <div className="resources-tabs">
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
          <div className={`resource-content ${activeTab === 'comprehensive-guides' ? 'active' : ''}`}>
            <h3>Comprehensive Privacy Education Guides</h3>
            <p>In-depth guides covering all aspects of digital privacy education for families and educators. These comprehensive resources provide everything you need to teach children about online safety.</p>

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
          <div className={`resource-content ${activeTab === 'discussion-guides' ? 'active' : ''}`}>
            <h3>Discussion Guides for Parents & Educators</h3>
            <p>These discussion guides are designed to help you have meaningful conversations about digital privacy with children. Each guide includes age-appropriate language, example scenarios, and follow-up questions.</p>

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
          <div className={`resource-content ${activeTab === 'printable-resources' ? 'active' : ''}`}>
            <h3>Printable Resources</h3>
            <p>A collection of printable materials to support privacy education at home or in the classroom.</p>

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
          <div className={`resource-content ${activeTab === 'digital-safety' ? 'active' : ''}`}>
            <h3>Digital Safety Tips for Families</h3>
            <p>Expert advice to help parents and caregivers create a safe digital environment for children.</p>

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
          <div className={`resource-content ${activeTab === 'activities-tools' ? 'active' : ''}`}>
            <h3>Interactive Activities & Practical Tools</h3>
            <p>Hands-on activities, games, and practical tools to make privacy education engaging and effective for children of all ages.</p>

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
      <section className="community-resources" style={{ padding: '4rem 0', background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' }}>
        <div className="container">
          <div className="section-header fade-in text-center">
            <h2 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Community Resources</h2>
            <p style={{ fontSize: '1.125rem', color: '#6b7280', maxWidth: '2xl', margin: '0 auto 2rem' }}>
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