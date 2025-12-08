import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, FileText, Shield, Download, Users, Award, Eye, Heart, Brain, BookOpen, Calendar, CheckSquare, Network } from 'lucide-react';
import AgeSpecificConversations from '../components/parent/AgeSpecificConversations';
import ConversationApproaches from '../components/parent/ConversationApproaches';
import PrivacyChecklists from '../components/parent/PrivacyChecklists';
import PrivacyDayPlanner from '../components/parent/PrivacyDayPlanner';
import SafetyNetBuilder from '../components/parent/SafetyNetBuilder';

const ParentResourcesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('what-to-do-now');

  const openResourceTab = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <main id="main-content">
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <span className="badge">FOR PARENTS</span>
            <h1>Parent Guides & Resources</h1>
            <p>Simple guides, conversation starters, and tools to help you protect your family online. Everything explained in plain language, no technical knowledge needed.</p>
            
            {/* Quick Stats */}
            <div className="flex items-center justify-center gap-8 mt-8 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">50+</div>
                <div className="text-sm text-gray-600">Resources</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">10</div>
                <div className="text-sm text-gray-600">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">100%</div>
                <div className="text-sm text-gray-600">Free</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="resources-section">
        <div className="container">
          {/* Quick Help Section */}
          <div style={{ 
            backgroundColor: '#f0f9ff', 
            border: '2px solid #3b82f6', 
            borderRadius: '12px', 
            padding: '2rem', 
            marginBottom: '3rem',
            marginTop: '2rem'
          }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1e40af' }}>
              Quick Help: Common Questions
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#1e40af' }}>How do I see what my children do online?</h3>
                <p style={{ color: '#666', fontSize: '0.95rem' }}>Create a Family Hub account to see all apps and websites your children use.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#1e40af' }}>What is a privacy risk score?</h3>
                <p style={{ color: '#666', fontSize: '0.95rem' }}>A simple number showing how safe your child's privacy is. Lower is safer.</p>
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: '#1e40af' }}>How do I talk to my child about privacy?</h3>
                <p style={{ color: '#666', fontSize: '0.95rem' }}>Use our conversation starters - ready-to-use questions based on what your child uses.</p>
              </div>
            </div>
          </div>

          <div className="resources-tabs">
            <div
              className={`resource-tab ${activeTab === 'what-to-do-now' ? 'active' : ''}`}
              onClick={() => openResourceTab('what-to-do-now')}
            >
              <Shield size={16} />
              What to Do Now
            </div>
            <div
              className={`resource-tab ${activeTab === 'how-to-talk' ? 'active' : ''}`}
              onClick={() => openResourceTab('how-to-talk')}
            >
              <MessageCircle size={16} />
              How to Talk to Kids
            </div>
            <div
              className={`resource-tab ${activeTab === 'conversation-guides' ? 'active' : ''}`}
              onClick={() => openResourceTab('conversation-guides')}
            >
              <BookOpen size={16} />
              Conversation Guides
            </div>
            <div
              className={`resource-tab ${activeTab === 'privacy-settings' ? 'active' : ''}`}
              onClick={() => openResourceTab('privacy-settings')}
            >
              <Shield size={16} />
              Privacy Settings Help
            </div>
            <div
              className={`resource-tab ${activeTab === 'family-privacy-plan' ? 'active' : ''}`}
              onClick={() => openResourceTab('family-privacy-plan')}
            >
              <FileText size={16} />
              Family Privacy Plan
            </div>
            <div
              className={`resource-tab ${activeTab === 'safety-net' ? 'active' : ''}`}
              onClick={() => openResourceTab('safety-net')}
            >
              <Network size={16} />
              Safety Net Setup
            </div>
            <div
              className={`resource-tab ${activeTab === 'checklists' ? 'active' : ''}`}
              onClick={() => openResourceTab('checklists')}
            >
              <CheckSquare size={16} />
              Privacy Checklists
            </div>
            <div
              className={`resource-tab ${activeTab === 'privacy-day' ? 'active' : ''}`}
              onClick={() => openResourceTab('privacy-day')}
            >
              <Calendar size={16} />
              Privacy Day Planner
            </div>
            <div
              className={`resource-tab ${activeTab === 'printable-resources' ? 'active' : ''}`}
              onClick={() => openResourceTab('printable-resources')}
            >
              <Download size={16} />
              Printable Resources
            </div>
          </div>

          {/* What to Do Now Tab */}
          <div className={`resource-content ${activeTab === 'what-to-do-now' ? 'active' : ''}`}>
            <h2>What to Do Now: Action Items</h2>
            <p>Immediate steps you can take right now to protect your family's online privacy. Start with these quick actions.</p>

            <div className="resource-grid">
              <div className="resource-card">
                <div className="flex items-center gap-3 mb-3">
                  <Heart size={20} className="text-red-500" />
                  <h3>Complete Family Privacy Guide</h3>
                </div>
                <p>Everything parents need to know about teaching digital privacy to children of all ages. Includes age-specific strategies, conversation starters, and practical implementation tips.</p>
                <div className="flex items-center gap-4 mt-4">
                  <Link to="/guides/family-privacy" className="button">
                    <Download size={16} />
                    View Guide
                  </Link>
                  <span className="text-sm text-green-600 font-medium">Available Now</span>
                </div>
              </div>

              <div className="resource-card">
                <div className="flex items-center gap-3 mb-3">
                  <Brain size={20} className="text-purple-500" />
                  <h3>Educator's Privacy Toolkit</h3>
                </div>
                <p>Comprehensive resources for teachers and educators, including curriculum guides, lesson plans, assessment tools, and professional development materials.</p>
                <div className="flex items-center gap-4 mt-4">
                  <Link to="/educator-tools" className="button">
                    <Download size={16} />
                    View Toolkit
                  </Link>
                  <span className="text-sm text-gray-500">Available Now</span>
                </div>
              </div>

              <div className="resource-card">
                <div className="flex items-center gap-3 mb-3">
                  <Shield size={20} className="text-green-500" />
                  <h3>Digital Safety Emergency Guide</h3>
                </div>
                <p>Step-by-step instructions for handling privacy breaches, cyberbullying, and other digital safety emergencies. Includes legal considerations and recovery strategies.</p>
                <div className="flex items-center gap-4 mt-4">
                  <Link to="/guides/emergency-safety" className="button">
                    <Download size={16} />
                    View Guide
                  </Link>
                  <span className="text-sm text-green-600 font-medium">Available Now</span>
                </div>
              </div>

              <div className="resource-card">
                <div className="flex items-center gap-3 mb-3">
                  <Users size={20} className="text-blue-500" />
                  <h3>Age-Specific Privacy Guides</h3>
                </div>
                <p>Tailored guides for different age groups (5-8, 9-12, 13-17), covering developmentally appropriate concepts and teaching strategies for each stage.</p>
                <div className="flex items-center gap-4 mt-4">
                  <Link to="/guides/age-specific" className="button">
                    <Download size={16} />
                    View Guide
                  </Link>
                  <span className="text-sm text-green-600 font-medium">Available Now</span>
                </div>
              </div>
            </div>
          </div>

          {/* How to Talk to Kids Tab */}
          <div className={`resource-content ${activeTab === 'how-to-talk' ? 'active' : ''}`}>
            <h2>How to Talk to Your Children About Privacy</h2>
            <p>Ready-to-use conversation starters and guides to help you talk with your children about staying safe online. Each guide includes simple language and example questions.</p>

            <div className="discussion-guide">
              <h3>How to Talk About Personal Information</h3>
              <p>A guide to helping children understand what personal information is and why it's important to protect it.</p>
              <ul>
                <li><strong>Start with examples:</strong> "Personal information is like your special bamboo - it belongs just to you! This includes your full name, home address, phone number, and birthday."</li>
                <li><strong>Use the playground analogy:</strong> "Would you tell a stranger at the playground where you live? The internet is like a big playground with lots of people we don't know."</li>
                <li><strong>Follow-up questions:</strong> "What kind of information do you think is okay to share online? What information should we keep private?"</li>
              </ul>
            </div>

            <div className="discussion-guide">
              <h3>Password Safety Conversations</h3>
              <p>Help children understand the importance of strong passwords and keeping them secret.</p>
              <ul>
                <li><strong>Explain with a door lock analogy:</strong> "Passwords are like special keys to your digital home. Just like we don't give house keys to strangers, we don't share our passwords."</li>
                <li><strong>Practice creating strong passwords:</strong> "Let's make up a special code that would be hard for someone else to guess!"</li>
                <li><strong>Follow-up questions:</strong> "Why do we need different passwords for different places? Who is it okay to share your password with?"</li>
              </ul>
            </div>

            <div className="discussion-guide">
              <h3>Digital Footprint Awareness</h3>
              <p>Teaching children about their digital footprint and how their online actions create a permanent record.</p>
              <ul>
                <li><strong>Use the footprint metaphor:</strong> "Every time you do something online, it's like leaving a footprint in the sand. Even if you try to erase it, there might still be a mark."</li>
                <li><strong>Discuss permanence:</strong> "Once something is posted online, it can be shared, saved, and seen by many people, even if you delete it later."</li>
                <li><strong>Follow-up questions:</strong> "What kind of footprint do you want to leave online? How can we make sure our digital footprint shows our best self?"</li>
              </ul>
            </div>
          </div>

          {/* Printable Resources Tab */}
          <div className={`resource-content ${activeTab === 'printable-resources' ? 'active' : ''}`}>
            <h2>Printable Resources</h2>
            <p>A collection of printable materials to support privacy education at home or in the classroom.</p>

            <div className="resource-grid">
              <div className="resource-card">
                <h3>Privacy Panda Coloring Sheets</h3>
                <p>A set of 10 coloring pages featuring Privacy Panda and friends learning about online safety. Each page includes a simple privacy tip.</p>
                <Link
                  to="/downloads/coloring-sheets"
                  className="button"
                >
                  View & Download
                </Link>
              </div>

              <div className="resource-card">
                <h3>Digital Safety Posters</h3>
                <p>Classroom-ready posters highlighting key privacy concepts. Print and display these colorful reminders about password safety and personal information.</p>
                <Link
                  to="/downloads/safety-posters"
                  className="button"
                >
                  View & Download
                </Link>
              </div>

              <div className="resource-card">
                <h3>Privacy Panda Certificate</h3>
                <p>Celebrate learning with these printable certificates to award children after they complete privacy education activities.</p>
                <Link
                  to="/downloads/certificates"
                  className="button"
                >
                  View & Download
                </Link>
              </div>

              <div className="resource-card">
                <h3>Family Internet Agreement</h3>
                <p>A customizable document to help families establish guidelines for internet use, with child-friendly language and signature spaces.</p>
                <Link
                  to="/downloads/family-agreement"
                  className="button"
                >
                  View & Download
                </Link>
              </div>
            </div>
          </div>

          {/* Privacy Settings Help Tab */}
          <div className={`resource-content ${activeTab === 'privacy-settings' ? 'active' : ''}`}>
            <h2>Privacy Settings Help: Step-by-Step Guides</h2>
            <p>Simple, step-by-step guides to help you set up privacy settings on your children's devices and apps. No technical knowledge needed.</p>

            <div className="resource-grid">
              <div className="resource-card">
                <h3>Setting Up Child-Friendly Devices</h3>
                <p>Learn how to configure tablets, smartphones, and computers with appropriate controls and settings for young children.</p>
                <Link to="/guides/device-setup" className="button">Read More</Link>
              </div>

              <div className="resource-card">
                <h3>Choosing Child-Safe Apps and Games</h3>
                <p>What to look for when selecting digital content for children. Learn about privacy ratings and app permissions.</p>
                <Link to="/guides/app-selection" className="button">Read More</Link>
              </div>

              <div className="resource-card">
                <h3>Modeling Good Digital Citizenship</h3>
                <p>Tips for parents on how to demonstrate healthy online behavior. Children learn by watching adults.</p>
                <Link to="/guides/modeling-behavior" className="button">Read More</Link>
              </div>

              <div className="resource-card">
                <h3>Responding to Privacy Concerns</h3>
                <p>What to do if you encounter privacy issues or if your child accidentally shares sensitive information online.</p>
                <Link to="/guides/privacy-concerns" className="button">Read More</Link>
              </div>
            </div>
          </div>

          {/* Activities & Tools Tab */}
          <div className={`resource-content ${activeTab === 'activities-tools' ? 'active' : ''}`}>
            <h2>Interactive Activities & Practical Tools</h2>
            <p>Hands-on activities, games, and practical tools to make privacy education engaging and effective for children of all ages.</p>

            <div className="resource-grid">
              <div className="resource-card">
                <div className="flex items-center gap-3 mb-3">
                  <Users size={20} className="text-green-500" />
                  <h3>Privacy Learning Activities Kit</h3>
                </div>
                <p>20 hands-on activities including games, crafts, role-playing scenarios, and interactive exercises to teach privacy concepts through play.</p>
                <div className="flex items-center gap-4 mt-4">
                  <Link to="/activities/privacy-learning-kit" className="button">
                    <Download size={16} />
                    View Activities
                  </Link>
                  <span className="text-sm text-green-600 font-medium">Available Now</span>
                </div>
              </div>

              <div className="resource-card">
                <div className="flex items-center gap-3 mb-3">
                  <FileText size={20} className="text-blue-500" />
                  <h3>Family Privacy Agreement Template</h3>
                </div>
                <p>Customizable template for creating family rules about digital privacy, device usage, and online behavior. Includes child-friendly language and signature spaces.</p>
                <div className="flex items-center gap-4 mt-4">
                  <Link to="/downloads/family-agreement" className="button">
                    <Download size={16} />
                    View Template
                  </Link>
                  <span className="text-sm text-gray-500">Available Now</span>
                </div>
              </div>

              <div className="resource-card">
                <div className="flex items-center gap-3 mb-3">
                  <Award size={20} className="text-yellow-500" />
                  <h3>Privacy Achievement Certificates</h3>
                </div>
                <p>Printable certificates and badges to celebrate children's privacy learning milestones. Includes Privacy Panda certificates, Digital Citizen awards, and more.</p>
                <div className="flex items-center gap-4 mt-4">
                  <Link to="/downloads/certificates" className="button">
                    <Download size={16} />
                    Generate Certificates
                  </Link>
                  <span className="text-sm text-gray-500">All Ages</span>
                </div>
              </div>

              <div className="resource-card">
                <div className="flex items-center gap-3 mb-3">
                  <Eye size={20} className="text-purple-500" />
                  <h3>Privacy Education Posters</h3>
                </div>
                <p>Set of 12 colorful posters featuring key privacy concepts, safety rules, and reminders. Perfect for home or classroom display.</p>
                <div className="flex items-center gap-4 mt-4">
                  <Link to="/downloads/safety-posters" className="button">
                    <Download size={16} />
                    View Posters
                  </Link>
                  <span className="text-sm text-gray-500">Available Now</span>
                </div>
              </div>

              <div className="resource-card">
                <div className="flex items-center gap-3 mb-3">
                  <FileText size={20} className="text-orange-500" />
                  <h3>Privacy Learning Worksheets</h3>
                </div>
                <p>Educational worksheets and activity sheets for reinforcing privacy concepts through writing, drawing, and reflection exercises.</p>
                <div className="flex items-center gap-4 mt-4">
                  <Link to="/downloads/worksheets" className="button">
                    <Download size={16} />
                    View Worksheets
                  </Link>
                  <span className="text-sm text-green-600 font-medium">Available Now</span>
                </div>
              </div>

              <div className="resource-card">
                <div className="flex items-center gap-3 mb-3">
                  <Shield size={20} className="text-red-500" />
                  <h3>Device Setup Checklists</h3>
                </div>
                <p>Step-by-step checklists for configuring child-safe settings on phones, tablets, computers, and gaming devices. Includes all major platforms.</p>
                <div className="flex items-center gap-4 mt-4">
                  <Link to="/guides/device-setup" className="button">
                    <Download size={16} />
                    View Checklists
                  </Link>
                  <span className="text-sm text-gray-500">Available Now</span>
                </div>
              </div>
            </div>
          </div>

          {/* Conversation Guides Tab */}
          <div className={`resource-content ${activeTab === 'conversation-guides' ? 'active' : ''}`}>
            <h2>Conversation Guides</h2>
            <p>Learn effective ways to talk with your children about online privacy, plus ready-to-use conversation starters for different age groups.</p>
            
            <div style={{ marginTop: '2rem' }}>
              <ConversationApproaches />
            </div>
            
            <div style={{ marginTop: '3rem' }}>
              <AgeSpecificConversations />
            </div>
          </div>

          {/* Family Privacy Plan Tab */}
          <div className={`resource-content ${activeTab === 'family-privacy-plan' ? 'active' : ''}`}>
            <h2>Family Privacy Plan Builder</h2>
            <p>Create a family privacy plan together. Set clear rules, choose safety tools, and schedule regular check-ups.</p>
            
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <Link
                to="/family-privacy-plan"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 2rem',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '1.125rem'
                }}
              >
                <FileText size={20} />
                Create Your Family Privacy Plan
              </Link>
            </div>
          </div>

          {/* Safety Net Setup Tab */}
          <div className={`resource-content ${activeTab === 'safety-net' ? 'active' : ''}`}>
            <h2>Digital Safety Net Setup</h2>
            <p>Build your family's support network for handling online privacy issues and emergencies. Designate tech guides and establish points of contact.</p>
            
            <div style={{ marginTop: '2rem' }}>
              <SafetyNetBuilder />
            </div>
          </div>

          {/* Privacy Checklists Tab */}
          <div className={`resource-content ${activeTab === 'checklists' ? 'active' : ''}`}>
            <h2>Interactive Privacy Checklists</h2>
            <p>Track your family's privacy progress with age-appropriate checklists. Complete items as you work through privacy education together.</p>
            
            <div style={{ marginTop: '2rem' }}>
              <PrivacyChecklists />
            </div>
          </div>

          {/* Privacy Day Planner Tab */}
          <div className={`resource-content ${activeTab === 'privacy-day' ? 'active' : ''}`}>
            <h2>Family Privacy Day Planner</h2>
            <p>Schedule quarterly "Privacy Days" to review and update your family's online privacy together. Make privacy maintenance a regular family activity.</p>
            
            <div style={{ marginTop: '2rem' }}>
              <PrivacyDayPlanner />
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Need More Help?</h2>
            <p>Our team is here to support you in implementing privacy education for your family or classroom.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="button primary">
                Contact Our Team
              </Link>
              <Link to="/faq" className="button secondary">
                View FAQ
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ParentResourcesPage;