import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ClipboardCheck as ChalkboardTeacher, MessageCircle, FileText, Shield } from 'lucide-react';

const ResourcesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('discussion-guides');

  const openResourceTab = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <section className="resources-section" id="parent-resources">
      <div className="container">
        <div className="section-header fade-in">
          <span className="badge">SUPPORTING RESOURCES</span>
          <h2><ChalkboardTeacher size={32} />Parent & Educator Resources</h2>
          <p>Supporting tools and guides to help adults facilitate privacy education for children.</p>
        </div>
        
        <div className="resources-tabs">
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
              <button 
                onClick={() => window.open('/downloads/coloring-sheets.html', '_blank')}
                className="button"
              >
                Download PDF
              </button>
            </div>
            
            <div className="resource-card">
              <h4>Digital Safety Posters</h4>
              <p>Classroom-ready posters highlighting key privacy concepts. Print and display these colorful reminders about password safety and personal information.</p>
              <button 
                onClick={() => window.open('/downloads/safety-posters.html', '_blank')}
                className="button"
              >
                Download PDF
              </button>
            </div>
            
            <div className="resource-card">
              <h4>Privacy Panda Certificate</h4>
              <p>Celebrate learning with these printable certificates to award children after they complete privacy education activities.</p>
              <button 
                onClick={() => window.open('/downloads/certificates.html', '_blank')}
                className="button"
              >
                Download PDF
              </button>
            </div>
            
            <div className="resource-card">
              <h4>Family Internet Agreement</h4>
              <p>A customizable document to help families establish guidelines for internet use, with child-friendly language and signature spaces.</p>
              <button 
                onClick={() => window.open('/downloads/family-agreement.html', '_blank')}
                className="button"
              >
                Download PDF
              </button>
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
      </div>
    </section>
  );
};

export default ResourcesSection;