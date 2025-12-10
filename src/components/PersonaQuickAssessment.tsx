import React, { useState } from 'react';
import { Users, Shield, BookOpen, Settings, Target, AlertTriangle, ArrowRight, ArrowLeft } from 'lucide-react';
import { familyPersonaDetectionEngine } from '../lib/familyPersonaDetection';
import type { FamilyPersonaProfile } from '../data/familyPersonaProfiles';

interface PersonaQuickAssessmentProps {
  onComplete: (persona: FamilyPersonaProfile) => void;
  onSkip?: () => void;
}

const PersonaQuickAssessment: React.FC<PersonaQuickAssessmentProps> = ({
  onComplete,
  onSkip
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const questions = [
    {
      id: 'q1',
      question: 'What best describes your primary concern about digital privacy?',
      options: [
        { value: 'child-safety', label: 'Protecting my children from online threats', icon: Users },
        { value: 'data-privacy', label: 'Minimizing data collection and sharing', icon: Shield },
        { value: 'education', label: 'Learning privacy best practices as a family', icon: BookOpen },
        { value: 'technical', label: 'Implementing advanced security measures', icon: Settings },
      ]
    },
    {
      id: 'q2',
      question: 'How would you describe your current privacy knowledge?',
      options: [
        { value: 'beginner', label: 'Just starting to learn about privacy', icon: BookOpen },
        { value: 'aware', label: 'Aware of risks, need practical solutions', icon: Target },
        { value: 'experienced', label: 'Experienced, want advanced tools', icon: Settings },
        { value: 'concerned', label: 'Recently discovered risks, need urgent help', icon: AlertTriangle },
      ]
    },
    {
      id: 'q3',
      question: 'How do you prefer to manage family privacy?',
      options: [
        { value: 'strict', label: 'Strict controls and close monitoring', icon: Shield },
        { value: 'balanced', label: 'Balance between privacy and convenience', icon: Target },
        { value: 'educational', label: 'Focus on education and empowerment', icon: BookOpen },
        { value: 'technical', label: 'Technical solutions and automation', icon: Settings },
      ]
    },
    {
      id: 'q4',
      question: 'What is your biggest challenge with digital privacy?',
      options: [
        { value: 'monitoring', label: 'Monitoring what my children access', icon: Users },
        { value: 'understanding', label: 'Understanding privacy risks and policies', icon: BookOpen },
        { value: 'time', label: 'Finding practical, time-saving solutions', icon: Target },
        { value: 'immediate', label: 'Addressing current privacy exposures', icon: AlertTriangle },
      ]
    },
    {
      id: 'q5',
      question: 'How much time can you dedicate to privacy management?',
      options: [
        { value: 'minimal', label: 'Very little - need quick, easy solutions', icon: Target },
        { value: 'moderate', label: 'Regular reviews and monitoring', icon: Shield },
        { value: 'dedicated', label: 'Willing to invest time in learning', icon: BookOpen },
        { value: 'technical', label: 'Can set up automated solutions', icon: Settings },
      ]
    }
  ];

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [questions[currentStep].id]: value });
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate persona based on answers
      const persona = calculatePersona({ ...answers, [questions[currentStep].id]: value });
      onComplete(persona);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculatePersona = (allAnswers: Record<string, string>): FamilyPersonaProfile => {
    const scores: Record<string, number> = {
      'cautious-parent': 0,
      'privacy-focused-family': 0,
      'learning-family': 0,
      'tech-savvy-family': 0,
      'balanced-family': 0,
      'concerned-family': 0
    };

    // Score based on Q1 (primary concern)
    if (allAnswers.q1 === 'child-safety') scores['cautious-parent'] += 3;
    if (allAnswers.q1 === 'data-privacy') scores['privacy-focused-family'] += 3;
    if (allAnswers.q1 === 'education') scores['learning-family'] += 3;
    if (allAnswers.q1 === 'technical') scores['tech-savvy-family'] += 3;

    // Score based on Q2 (knowledge level)
    if (allAnswers.q2 === 'beginner') {
      scores['learning-family'] += 2;
      scores['concerned-family'] += 1;
    }
    if (allAnswers.q2 === 'aware') {
      scores['balanced-family'] += 2;
      scores['cautious-parent'] += 1;
    }
    if (allAnswers.q2 === 'experienced') {
      scores['tech-savvy-family'] += 2;
      scores['privacy-focused-family'] += 1;
    }
    if (allAnswers.q2 === 'concerned') {
      scores['concerned-family'] += 3;
    }

    // Score based on Q3 (management style)
    if (allAnswers.q3 === 'strict') scores['cautious-parent'] += 2;
    if (allAnswers.q3 === 'balanced') scores['balanced-family'] += 2;
    if (allAnswers.q3 === 'educational') scores['learning-family'] += 2;
    if (allAnswers.q3 === 'technical') scores['tech-savvy-family'] += 2;

    // Score based on Q4 (biggest challenge)
    if (allAnswers.q4 === 'monitoring') scores['cautious-parent'] += 2;
    if (allAnswers.q4 === 'understanding') scores['learning-family'] += 2;
    if (allAnswers.q4 === 'time') scores['balanced-family'] += 2;
    if (allAnswers.q4 === 'immediate') scores['concerned-family'] += 2;

    // Score based on Q5 (time commitment)
    if (allAnswers.q5 === 'minimal') scores['balanced-family'] += 1;
    if (allAnswers.q5 === 'moderate') scores['cautious-parent'] += 1;
    if (allAnswers.q5 === 'dedicated') scores['learning-family'] += 1;
    if (allAnswers.q5 === 'technical') scores['tech-savvy-family'] += 1;

    // Find highest scoring persona
    const sortedScores = Object.entries(scores).sort(([, a], [, b]) => b - a);
    const personaId = sortedScores[0][0];

    // Import personas dynamically to get the profile
    const { FamilyPersonaProfiles } = require('../data/familyPersonaProfiles');
    return FamilyPersonaProfiles[personaId];
  };

  const progress = ((currentStep + 1) / questions.length) * 100;
  const currentQuestion = questions[currentStep];

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Question {currentStep + 1} of {questions.length}
          </span>
          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
            {Math.round(progress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {currentQuestion.question}
        </h2>

        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className="w-full flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 border-2 border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500 rounded-xl transition-all group"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 group-hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                <option.icon 
                  size={24} 
                  className="text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors" 
                />
              </div>
              <span className="flex-1 text-left font-medium text-gray-900 dark:text-white">
                {option.label}
              </span>
              <ArrowRight 
                size={20} 
                className="text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" 
              />
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>

        {onSkip && (
          <button
            onClick={onSkip}
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            Skip for now
          </button>
        )}
      </div>
    </div>
  );
};

export default PersonaQuickAssessment;
