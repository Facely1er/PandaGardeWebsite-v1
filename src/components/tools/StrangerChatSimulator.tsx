import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { MessageCircle, Shield, AlertTriangle, CheckCircle, RotateCcw, Users, Heart } from 'lucide-react';

interface StrangerChatSimulatorProps {
  onComplete: () => void;
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'stranger' | 'child';
  timestamp: Date;
  isCorrect?: boolean;
  explanation?: string;
}

interface ChatScenario {
  id: string;
  title: string;
  messages: Message[];
  correctResponses: string[];
  redFlags: string[];
  explanation: string;
  ageAppropriate: boolean;
}

const StrangerChatSimulator: React.FC<StrangerChatSimulatorProps> = ({ onComplete, onClose }) => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedResponse, setSelectedResponse] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [scenarioStarted, setScenarioStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scenarios: ChatScenario[] = useMemo(() => [
    {
      id: '1',
      title: '🎮 Gaming Friend Asking Personal Info',
      messages: [
        { id: '1', text: 'Hey! I saw you playing Roblox. What\'s your username?', sender: 'stranger', timestamp: new Date() },
        { id: '2', text: 'Cool! What school do you go to? I might know someone there.', sender: 'stranger', timestamp: new Date() },
        { id: '3', text: 'Want to be friends? I can give you free Robux if you tell me your real name!', sender: 'stranger', timestamp: new Date() }
      ],
      correctResponses: [
        'I don\'t share personal information online',
        'I need to ask my parents first',
        'I\'m not comfortable sharing that'
      ],
      redFlags: ['Asking for personal information', 'Offering rewards for personal details', 'Trying to be friends quickly'],
      explanation: 'Never share personal information like your real name, school, or address with people you meet online, even if they offer rewards.',
      ageAppropriate: true
    },
    {
      id: '2',
      title: '👨‍👩‍👧‍👦 Someone Pretending to Know Parents',
      messages: [
        { id: '1', text: 'Hi! I\'m your mom\'s friend from work. She asked me to check on you.', sender: 'stranger', timestamp: new Date() },
        { id: '2', text: 'Can you tell me what you\'re doing right now? Your mom is worried.', sender: 'stranger', timestamp: new Date() },
        { id: '3', text: 'She said it\'s okay to talk to me. What\'s your address so I can come help?', sender: 'stranger', timestamp: new Date() }
      ],
      correctResponses: [
        'I need to ask my parents first',
        'I don\'t know you, so I can\'t talk',
        'Let me check with my family'
      ],
      redFlags: ['Claiming to know family members', 'Asking for location information', 'Creating urgency'],
      explanation: 'Real family friends would never ask for personal information online. Always check with your parents first.',
      ageAppropriate: true
    },
    {
      id: '3',
      title: '🎁 Free Game Items Offer',
      messages: [
        { id: '1', text: 'Congratulations! You won free V-Bucks! Click this link to claim them!', sender: 'stranger', timestamp: new Date() },
        { id: '2', text: 'Just enter your username and password to get your prize!', sender: 'stranger', timestamp: new Date() },
        { id: '3', text: 'Hurry! This offer expires in 5 minutes!', sender: 'stranger', timestamp: new Date() }
      ],
      correctResponses: [
        'I don\'t click links from strangers',
        'This sounds like a scam',
        'I need to ask my parents first'
      ],
      redFlags: ['Too good to be true offers', 'Urgent time pressure', 'Asking for passwords'],
      explanation: 'Real companies never ask for passwords through messages. If something seems too good to be true, it probably is!',
      ageAppropriate: true
    },
    {
      id: '4',
      title: '📸 Request for Photos',
      messages: [
        { id: '1', text: 'You seem really cool! Can you send me a picture of yourself?', sender: 'stranger', timestamp: new Date() },
        { id: '2', text: 'I\'ll send you mine first! Here\'s my photo...', sender: 'stranger', timestamp: new Date() },
        { id: '3', text: 'Now it\'s your turn! Just one picture, please?', sender: 'stranger', timestamp: new Date() }
      ],
      correctResponses: [
        'I don\'t send photos to people I don\'t know',
        'I need to ask my parents first',
        'I\'m not comfortable sharing photos'
      ],
      redFlags: ['Asking for personal photos', 'Trying to build trust first', 'Peer pressure'],
      explanation: 'Never send photos to people you don\'t know in real life. Photos can be used in harmful ways.',
      ageAppropriate: true
    },
    {
      id: '5',
      title: '🏠 Meeting Up Request',
      messages: [
        { id: '1', text: 'You seem really fun! Want to meet up at the park sometime?', sender: 'stranger', timestamp: new Date() },
        { id: '2', text: 'I\'ll bring my dog! What\'s your address so I can pick you up?', sender: 'stranger', timestamp: new Date() },
        { id: '3', text: 'Don\'t tell your parents - it\'ll be our secret!', sender: 'stranger', timestamp: new Date() }
      ],
      correctResponses: [
        'I never meet people from online',
        'I need to ask my parents first',
        'I don\'t share my address'
      ],
      redFlags: ['Asking to meet in person', 'Asking for address', 'Telling you to keep secrets'],
      explanation: 'Never meet people you\'ve only met online. Real friends would never ask you to keep secrets from your parents.',
      ageAppropriate: true
    },
    {
      id: '6',
      title: '💰 Money Making Opportunity',
      messages: [
        { id: '1', text: 'Hey kid! Want to make easy money? I can pay you $50!', sender: 'stranger', timestamp: new Date() },
        { id: '2', text: 'Just send me your parent\'s credit card info to get started!', sender: 'stranger', timestamp: new Date() },
        { id: '3', text: 'This is totally legal and your parents will be happy!', sender: 'stranger', timestamp: new Date() }
      ],
      correctResponses: [
        'I don\'t share financial information',
        'This sounds like a scam',
        'I need to ask my parents first'
      ],
      redFlags: ['Offering money to children', 'Asking for financial information', 'Claiming something is legal when it\'s not'],
      explanation: 'Real jobs for kids don\'t ask for credit card information. This is definitely a scam!',
      ageAppropriate: true
    },
    {
      id: '7',
      title: '🎭 Fake Emergency',
      messages: [
        { id: '1', text: 'URGENT! Your mom is in the hospital! She needs you to send money!', sender: 'stranger', timestamp: new Date() },
        { id: '2', text: 'Don\'t tell anyone - this is private family business!', sender: 'stranger', timestamp: new Date() },
        { id: '3', text: 'Send me your parent\'s bank account info right now!', sender: 'stranger', timestamp: new Date() }
      ],
      correctResponses: [
        'I need to check with my family first',
        'This sounds like a scam',
        'I don\'t share financial information'
      ],
      redFlags: ['Creating fake emergencies', 'Asking for money', 'Telling you to keep secrets'],
      explanation: 'Real emergencies are handled by adults. Never send money or financial information to strangers.',
      ageAppropriate: true
    },
    {
      id: '8',
      title: '🎓 Fake School Official',
      messages: [
        { id: '1', text: 'Hi! I\'m calling from your school. We need to update your records.', sender: 'stranger', timestamp: new Date() },
        { id: '2', text: 'Can you tell me your home address and parent\'s phone number?', sender: 'stranger', timestamp: new Date() },
        { id: '3', text: 'This is urgent - your enrollment might be cancelled!', sender: 'stranger', timestamp: new Date() }
      ],
      correctResponses: [
        'I need to ask my parents first',
        'I don\'t share personal information',
        'Let me check with my family'
      ],
      redFlags: ['Claiming to be from school', 'Creating urgency', 'Asking for personal information'],
      explanation: 'Real school officials would contact your parents directly, not ask children for personal information.',
      ageAppropriate: true
    },
    {
      id: '9',
      title: '🎪 Contest Winner Scam',
      messages: [
        { id: '1', text: 'Congratulations! You won our online contest! You get a free iPad!', sender: 'stranger', timestamp: new Date() },
        { id: '2', text: 'Just pay $10 shipping and handling to claim your prize!', sender: 'stranger', timestamp: new Date() },
        { id: '3', text: 'Send me your parent\'s credit card info to get your iPad today!', sender: 'stranger', timestamp: new Date() }
      ],
      correctResponses: [
        'I don\'t pay for "free" prizes',
        'This sounds like a scam',
        'I need to ask my parents first'
      ],
      redFlags: ['Too good to be true prizes', 'Asking for payment for "free" items', 'Asking for financial information'],
      explanation: 'Real contests don\'t ask winners to pay money. If you have to pay for a "free" prize, it\'s a scam!',
      ageAppropriate: true
    },
    {
      id: '10',
      title: '🤝 Fake Friendship',
      messages: [
        { id: '1', text: 'You seem really lonely. I\'ll be your best friend!', sender: 'stranger', timestamp: new Date() },
        { id: '2', text: 'Tell me all your secrets and I\'ll keep them safe.', sender: 'stranger', timestamp: new Date() },
        { id: '3', text: 'Your parents don\'t understand you like I do. Let\'s keep this between us.', sender: 'stranger', timestamp: new Date() }
      ],
      correctResponses: [
        'I don\'t share secrets with strangers',
        'I talk to my parents about problems',
        'I\'m not comfortable with this'
      ],
      redFlags: ['Trying to isolate you from family', 'Asking for secrets', 'Claiming parents don\'t understand'],
      explanation: 'Real friends don\'t ask you to keep secrets from your parents or try to isolate you from your family.',
      ageAppropriate: true
    }
  ], []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startScenario = () => {
    setScenarioStarted(true);
    setMessages(scenarios[currentScenario].messages);
  };

  const handleResponseSelect = (response: string) => {
    setSelectedResponse(response);
  };

  const handleResponseSubmit = useCallback(() => {
    if (!selectedResponse) return;

    const scenario = scenarios[currentScenario];
    const isCorrect = scenario.correctResponses.includes(selectedResponse);

    // Add child's response to messages
    const childMessage: Message = {
      id: `child-${Date.now()}`,
      text: selectedResponse,
      sender: 'child',
      timestamp: new Date(),
      isCorrect,
      explanation: isCorrect ? 'Great choice! This keeps you safe.' : 'This might not be the safest response.'
    };

    setMessages(prev => [...prev, childMessage]);

    if (isCorrect) {
      setScore(prev => prev + 1);
      
      // Celebration animation
      setTimeout(() => {
        const celebration = document.createElement('div');
        celebration.textContent = '🛡️✅';
        celebration.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 48px;
          z-index: 10000;
          pointer-events: none;
          animation: celebrate 1s ease-out forwards;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
          @keyframes celebrate {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(1) translateY(-50px); }
          }
        `;
        document.head.appendChild(style);
        document.body.appendChild(celebration);
        
        setTimeout(() => {
          document.body.removeChild(celebration);
          document.head.removeChild(style);
        }, 1000);
      }, 200);
    }

    setShowExplanation(true);
    setSelectedResponse(null);

    // Move to next scenario after delay
    setTimeout(() => {
      if (currentScenario < scenarios.length - 1) {
        setCurrentScenario(prev => prev + 1);
        setMessages([]);
        setShowExplanation(false);
        setScenarioStarted(false);
      } else {
        setIsCompleted(true);
        onComplete();
      }
    }, 3000);
  }, [selectedResponse, scenarios, currentScenario, onComplete]);

  const resetSimulator = () => {
    setCurrentScenario(0);
    setMessages([]);
    setSelectedResponse(null);
    setShowExplanation(false);
    setScore(0);
    setIsCompleted(false);
    setScenarioStarted(false);
  };

  const currentScenarioData = scenarios[currentScenario];

  if (!scenarioStarted) {
    return (
      <div className="stranger-chat-simulator">
        <div className="activity-header">
          <h2 className="activity-title">💬 Stranger Chat Simulator</h2>
          <button onClick={onClose} className="close-button">×</button>
        </div>

        <div className="scenario-intro">
          <div className="intro-content">
            <h3>🛡️ Practice Safe Online Conversations!</h3>
            <p>Learn how to respond safely when strangers try to talk to you online.</p>
            <div className="scenario-info">
              <div className="info-item">
                <MessageCircle size={20} />
                <span>10 different scenarios</span>
              </div>
              <div className="info-item">
                <Shield size={20} />
                <span>Learn safe responses</span>
              </div>
              <div className="info-item">
                <AlertTriangle size={20} />
                <span>Spot red flags</span>
              </div>
            </div>
            <div className="current-scenario">
              <h4>Current Scenario:</h4>
              <p>{currentScenarioData.title}</p>
            </div>
            <button onClick={startScenario} className="start-scenario-button">
              Start Scenario
            </button>
          </div>
        </div>

        <style jsx>{`
          .stranger-chat-simulator {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            flex-direction: column;
            z-index: 1000;
          }

          .activity-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            background: white;
            border-bottom: 1px solid #e0e0e0;
          }

          .activity-title {
            margin: 0;
            color: #2C3E50;
            font-size: 24px;
          }

          .close-button {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
          }

          .scenario-intro {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          }

          .intro-content {
            background: white;
            padding: 40px;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            max-width: 500px;
          }

          .intro-content h3 {
            margin: 0 0 20px 0;
            color: #2C3E50;
            font-size: 28px;
          }

          .intro-content p {
            margin: 0 0 30px 0;
            color: #666;
            font-size: 18px;
          }

          .scenario-info {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin-bottom: 30px;
          }

          .info-item {
            display: flex;
            align-items: center;
            gap: 10px;
            color: #666;
            font-size: 16px;
          }

          .current-scenario {
            background: #E3F2FD;
            border: 1px solid #2196F3;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 30px;
          }

          .current-scenario h4 {
            margin: 0 0 10px 0;
            color: #1976D2;
            font-size: 18px;
          }

          .current-scenario p {
            margin: 0;
            color: #1976D2;
            font-size: 16px;
            font-weight: bold;
          }

          .start-scenario-button {
            background: #4CAF50;
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 8px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.2s;
          }

          .start-scenario-button:hover {
            background: #45a049;
          }
        `}</style>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="stranger-chat-simulator">
        <div className="activity-header">
          <h2 className="activity-title">Simulation Complete!</h2>
          <button onClick={onClose} className="close-button">×</button>
        </div>

        <div className="completion-results">
          <div className="results-content">
            <h3>🛡️ Great Job Learning Online Safety!</h3>
            <div className="score-display">
              <div className="score-circle">
                <span className="score-number">{score}</span>
                <span className="score-total">/{scenarios.length}</span>
              </div>
              <div className="score-percentage">
                {Math.round((score / scenarios.length) * 100)}%
              </div>
            </div>
            <p>You made {score} out of {scenarios.length} safe choices!</p>
            <div className="safety-tips">
              <h4>🛡️ Remember These Safety Rules:</h4>
              <ul>
                <li>Never share personal information with strangers</li>
                <li>Always ask your parents before responding to strangers</li>
                <li>If something feels wrong, trust your instincts</li>
                <li>Real friends don't ask you to keep secrets</li>
              </ul>
            </div>
            <div className="result-actions">
              <button onClick={resetSimulator} className="action-button">
                <RotateCcw size={16} />
                Try Again
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
          .stranger-chat-simulator {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            flex-direction: column;
            z-index: 1000;
          }

          .activity-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            background: white;
            border-bottom: 1px solid #e0e0e0;
          }

          .activity-title {
            margin: 0;
            color: #2C3E50;
            font-size: 24px;
          }

          .close-button {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
          }

          .completion-results {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            padding: 20px;
          }

          .results-content {
            background: white;
            padding: 40px;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            max-width: 500px;
          }

          .results-content h3 {
            margin: 0 0 30px 0;
            color: #2C3E50;
            font-size: 28px;
          }

          .score-display {
            margin-bottom: 30px;
          }

          .score-circle {
            display: inline-flex;
            align-items: baseline;
            gap: 5px;
            margin-bottom: 10px;
          }

          .score-number {
            font-size: 48px;
            font-weight: bold;
            color: #4CAF50;
          }

          .score-total {
            font-size: 24px;
            color: #666;
          }

          .score-percentage {
            font-size: 24px;
            font-weight: bold;
            color: #4CAF50;
          }

          .results-content p {
            margin: 0 0 30px 0;
            color: #666;
            font-size: 16px;
          }

          .safety-tips {
            text-align: left;
            margin-bottom: 30px;
          }

          .safety-tips h4 {
            margin: 0 0 15px 0;
            color: #2C3E50;
            font-size: 18px;
          }

          .safety-tips ul {
            margin: 0;
            padding-left: 20px;
          }

          .safety-tips li {
            margin-bottom: 8px;
            color: #666;
            font-size: 14px;
          }

          .result-actions {
            display: flex;
            gap: 15px;
            justify-content: center;
          }

          .action-button {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 12px 24px;
            border: 1px solid #ddd;
            background: white;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 14px;
            font-weight: 500;
          }

          .action-button:hover {
            background: #f0f0f0;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="stranger-chat-simulator">
      <div className="activity-header">
        <h2 className="activity-title">💬 Stranger Chat Simulator</h2>
        <div className="header-info">
          <span className="scenario-number">Scenario {currentScenario + 1} of {scenarios.length}</span>
          <span className="score">Score: {score}</span>
          <button onClick={onClose} className="close-button">×</button>
        </div>
      </div>

      <div className="activity-content">
        <div className="scenario-title">
          <h3>{currentScenarioData.title}</h3>
        </div>

        <div className="chat-container">
          <div className="messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.sender}`}>
                <div className="message-content">
                  <span className="message-text">{message.text}</span>
                  {message.isCorrect !== undefined && (
                    <div className={`response-feedback ${message.isCorrect ? 'correct' : 'incorrect'}`}>
                      {message.isCorrect ? '✅' : '❌'} {message.explanation}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {!showExplanation && (
          <div className="response-options">
            <h4>How would you respond?</h4>
            <div className="options">
              {currentScenarioData.correctResponses.map((response, index) => (
                <button
                  key={index}
                  className={`response-button ${selectedResponse === response ? 'selected' : ''}`}
                  onClick={() => handleResponseSelect(response)}
                >
                  {response}
                </button>
              ))}
            </div>
            <button
              onClick={handleResponseSubmit}
              disabled={!selectedResponse}
              className="submit-button"
            >
              Submit Response
            </button>
          </div>
        )}

        {showExplanation && (
          <div className="explanation">
            <h4>🛡️ Safety Explanation:</h4>
            <p>{currentScenarioData.explanation}</p>
            <div className="red-flags">
              <h5>🚩 Red Flags to Watch For:</h5>
              <ul>
                {currentScenarioData.redFlags.map((flag, index) => (
                  <li key={index}>{flag}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .stranger-chat-simulator {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          flex-direction: column;
          z-index: 1000;
        }

        .activity-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          background: white;
          border-bottom: 1px solid #e0e0e0;
        }

        .activity-title {
          margin: 0;
          color: #2C3E50;
          font-size: 24px;
        }

        .header-info {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .scenario-number {
          color: #666;
          font-size: 14px;
        }

        .score {
          color: #4CAF50;
          font-weight: bold;
          font-size: 16px;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #666;
        }

        .activity-content {
          flex: 1;
          background: white;
          display: flex;
          flex-direction: column;
        }

        .scenario-title {
          padding: 20px;
          background: #f8f9fa;
          border-bottom: 1px solid #e0e0e0;
          text-align: center;
        }

        .scenario-title h3 {
          margin: 0;
          color: #2C3E50;
          font-size: 20px;
        }

        .chat-container {
          flex: 1;
          padding: 20px;
          background: #f5f5f5;
        }

        .messages {
          max-height: 300px;
          overflow-y: auto;
          padding: 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .message {
          margin-bottom: 15px;
        }

        .message.stranger {
          text-align: left;
        }

        .message.child {
          text-align: right;
        }

        .message-content {
          display: inline-block;
          max-width: 80%;
          padding: 12px 16px;
          border-radius: 12px;
          position: relative;
        }

        .message.stranger .message-content {
          background: #E3F2FD;
          border: 1px solid #2196F3;
        }

        .message.child .message-content {
          background: #E8F5E8;
          border: 1px solid #4CAF50;
        }

        .message-text {
          color: #2C3E50;
          font-size: 16px;
          line-height: 1.4;
        }

        .response-feedback {
          margin-top: 8px;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: bold;
        }

        .response-feedback.correct {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .response-feedback.incorrect {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }

        .response-options {
          padding: 20px;
          background: #f8f9fa;
          border-top: 1px solid #e0e0e0;
        }

        .response-options h4 {
          margin: 0 0 15px 0;
          color: #2C3E50;
          text-align: center;
        }

        .options {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }

        .response-button {
          padding: 15px 20px;
          border: 2px solid #e0e0e0;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 16px;
          text-align: left;
        }

        .response-button:hover {
          border-color: #4CAF50;
          background: #f8f9fa;
        }

        .response-button.selected {
          border-color: #4CAF50;
          background: #E8F5E8;
        }

        .submit-button {
          width: 100%;
          padding: 15px;
          background: #4CAF50;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.2s;
        }

        .submit-button:hover:not(:disabled) {
          background: #45a049;
        }

        .submit-button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }

        .explanation {
          padding: 20px;
          background: #E3F2FD;
          border-top: 1px solid #2196F3;
        }

        .explanation h4 {
          margin: 0 0 15px 0;
          color: #1976D2;
          font-size: 18px;
        }

        .explanation p {
          margin: 0 0 20px 0;
          color: #1976D2;
          font-size: 16px;
          line-height: 1.5;
        }

        .red-flags {
          background: #FFF3E0;
          border: 1px solid #FF9800;
          border-radius: 8px;
          padding: 15px;
        }

        .red-flags h5 {
          margin: 0 0 10px 0;
          color: #E65100;
          font-size: 16px;
        }

        .red-flags ul {
          margin: 0;
          padding-left: 20px;
        }

        .red-flags li {
          margin-bottom: 5px;
          color: #E65100;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .header-info {
            flex-direction: column;
            gap: 10px;
          }

          .messages {
            max-height: 250px;
          }

          .message-content {
            max-width: 90%;
          }

          .response-button {
            padding: 12px 16px;
            font-size: 14px;
          }

          .submit-button {
            padding: 12px;
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  );
};

export default StrangerChatSimulator;