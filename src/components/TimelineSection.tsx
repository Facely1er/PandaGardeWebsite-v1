import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

const timelines = {
  classroom: {
    title: '6-Week Classroom Implementation',
    weeks: [
      {
        number: 1,
        title: 'Introduction & Personal Information',
        description: 'Read Chapter 1, identity activities, public vs. private sorting'
      },
      {
        number: 2,
        title: 'Password Safety',
        description: 'Chapter 2 part 1, password strength activities, secret message creation'
      },
      {
        number: 3,
        title: 'Digital Footprints',
        description: 'Chapter 2 completion, footprint art projects, understanding permanence'
      },
      {
        number: 4,
        title: 'Asking Permission',
        description: 'Chapter 3, photo sharing activities, decision-making practice'
      },
      {
        number: 5,
        title: 'Being a Privacy Hero',
        description: 'Chapter 4, badge creation, problem-solving scenarios'
      },
      {
        number: 6,
        title: 'Review & Celebration',
        description: 'Culminating projects, assessment, Privacy Hero ceremony'
      }
    ]
  },
  condensed: {
    title: '2-Week Condensed Program',
    weeks: [
      {
        number: 1,
        title: 'Privacy Basics & Personal Info',
        description: 'Core concepts, password safety, and digital footprint awareness'
      },
      {
        number: 2,
        title: 'Advanced Concepts & Practice',
        description: 'Permission protocols, privacy hero skills, and celebration'
      }
    ]
  },
  afterschool: {
    title: '8-Week After-School Program',
    weeks: [
      {
        number: 1,
        title: 'Getting Started',
        description: 'Introduction to digital privacy and Privacy Panda'
      },
      {
        number: 2,
        title: 'Personal Information Deep Dive',
        description: 'Extended activities on protecting personal data'
      },
      {
        number: 3,
        title: 'Password Power',
        description: 'Comprehensive password security training'
      },
      {
        number: 4,
        title: 'Digital Detective Work',
        description: 'Understanding and managing digital footprints'
      },
      {
        number: 5,
        title: 'Permission Protocols',
        description: 'Advanced decision-making for sharing and posting'
      },
      {
        number: 6,
        title: 'Community & Communication',
        description: 'Safe online communication and community building'
      },
      {
        number: 7,
        title: 'Privacy Hero Training',
        description: 'Advanced scenarios and leadership skills'
      },
      {
        number: 8,
        title: 'Showcase & Graduation',
        description: 'Final projects and Privacy Hero graduation ceremony'
      }
    ]
  },
  home: {
    title: 'Flexible Home Learning',
    weeks: [
      {
        number: 1,
        title: 'Family Privacy Discussion',
        description: 'Start conversations about online safety at home'
      },
      {
        number: 2,
        title: 'Activity-Based Learning',
        description: 'Use printable activities and interactive resources'
      },
      {
        number: 3,
        title: 'Story Time & Reflection',
        description: 'Read Privacy Panda stories and discuss lessons learned'
      },
      {
        number: 4,
        title: 'Ongoing Practice',
        description: 'Continue learning with family challenges and check-ins'
      }
    ]
  }
};

const TimelineSection: React.FC = () => {
  const [activeTimeline, setActiveTimeline] = useState<keyof typeof timelines>('classroom');

  return (
    <section className="timeline-section" id="implementation">
      <div className="container">
        <div className="section-header fade-in">
          <span className="badge">IMPLEMENTATION GUIDE</span>
          <h2><Calendar size={32} />Implementation Timeline</h2>
          <p>Flexible guides to implementing Privacy Panda education in various settings.</p>
        </div>
        
        <div className="timeline-intro">
          <p>The Privacy Panda curriculum is designed to be flexible and adaptable to different educational settings and timeframes. Choose the implementation model that best fits your needs:</p>
        </div>
        
        <div className="timeline-options">
          {Object.entries(timelines).map(([key, timeline]) => (
            <div
              key={key}
              className={`timeline-option ${activeTimeline === key ? 'active' : ''}`}
              onClick={() => setActiveTimeline(key as keyof typeof timelines)}
            >
              {timeline.title.split(' (')[0]} ({timeline.weeks.length} {timeline.weeks.length === 1 ? 'Week' : 'Weeks'})
            </div>
          ))}
        </div>
        
        <div className="timeline-container fade-in">
          <div className="timeline-summary">
            <h3>{timelines[activeTimeline].title}</h3>
            <ul>
              {timelines[activeTimeline].weeks.map((week) => (
                <li key={week.number}>
                  <div className="week-number">{week.number}</div>
                  <div>
                    <strong>{week.title}:</strong> {week.description}
                  </div>
                </li>
              ))}
            </ul>
            <Link to="/implementation-guide" className="button">View Detailed Timeline</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;