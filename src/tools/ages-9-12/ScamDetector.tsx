import React, { useState, useCallback, useMemo } from 'react';
import { AlertTriangle, CheckCircle, RotateCcw, Search, Shield, Mail, MessageSquare, Globe, Gamepad2 } from 'lucide-react';

interface ScamDetectorProps {
  onComplete: () => void;
  onClose: () => void;
}

interface ScamScenario {
  type: 'email' | 'message' | 'website' | 'game_chat';
  content: string;
  sender: string;
  redFlags: string[];
  isScam: boolean;
  explanation: string;
  investigationHints: string[];
}

const ScamDetector: React.FC<ScamDetectorProps> = ({ onComplete, onClose }) => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [userAnswer, setUserAnswer] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showInvestigation, setShowInvestigation] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [scenarioStarted, setScenarioStarted] = useState(false);

  const scenarios: ScamScenario[] = useMemo(() => [
    {
      type: 'email',
      content: 'URGENT! Your Roblox account will be deleted in 24 hours! Click here to verify: bit.ly/roblox-verify-now',
      sender: 'noreply@roblox-security.com',
      redFlags: ['Urgent time pressure', 'Suspicious link', 'Fake sender email', 'Threat of account deletion'],
      isScam: true,
      explanation: 'Real companies never threaten to delete accounts via email. The link is suspicious and the sender email is fake.',
      investigationHints: ['Check the sender email carefully', 'Look for urgent language', 'Examine the link']
    },
    {
      type: 'message',
      content: 'Hey! I can give you free V-Bucks! Just send me your username and password. I work for Epic Games!',
      sender: 'EpicGamesHelper',
      redFlags: ['Asking for password', 'Claiming to work for company', 'Offering free items', 'Direct message from stranger'],
      isScam: true,
      explanation: 'Real employees never ask for passwords. Companies don\'t give away free items through random messages.',
      investigationHints: ['Real employees don\'t ask for passwords', 'Check if the offer seems too good to be true', 'Verify the sender\'s identity']
    },
    {
      type: 'website',
      content: 'Congratulations! You\'ve won a free iPhone 15! Just pay $5 shipping to claim your prize. Limited time offer!',
      sender: 'PrizeWinners.com',
      redFlags: ['Too good to be true', 'Asking for payment for "free" prize', 'Urgent time pressure', 'Suspicious website'],
      isScam: true,
      explanation: 'Real contests don\'t ask winners to pay money. If you have to pay for a "free" prize, it\'s a scam!',
      investigationHints: ['Real prizes are truly free', 'Check if the website looks professional', 'Look for contact information']
    },
    {
      type: 'game_chat',
      content: 'Join our Discord server for free skins! We have exclusive codes. Link: discord.gg/free-skins-roblox',
      sender: 'SkinGiver2024',
      redFlags: ['Offering free items', 'Suspicious Discord link', 'Random user in game chat', 'Too good to be true'],
      isScam: true,
      explanation: 'Random users offering free items are usually scammers. The Discord link could lead to phishing or malware.',
      investigationHints: ['Be suspicious of random free offers', 'Check if the Discord server is official', 'Look for spelling errors']
    },
    {
      type: 'email',
      content: 'Your Minecraft account has been compromised! Click here to secure it: minecraft.net/account-security',
      sender: 'security@minecraft.net',
      redFlags: ['Claiming account is compromised', 'Urgent action required', 'Suspicious link'],
      isScam: true,
      explanation: 'Real security emails don\'t create panic. Always go directly to the official website instead of clicking links.',
      investigationHints: ['Real security emails are less urgent', 'Go directly to the official website', 'Check the sender\'s email domain']
    },
    {
      type: 'message',
      content: 'Hi! I\'m your mom\'s friend. She asked me to check on you. Can you tell me your address?',
      sender: 'MomFriend123',
      redFlags: ['Claiming to know family', 'Asking for personal information', 'Creating false authority', 'Direct message from stranger'],
      isScam: true,
      explanation: 'Real family friends would never ask for personal information online. Always verify with your parents first.',
      investigationHints: ['Real family friends contact parents directly', 'Be suspicious of requests for personal info', 'Always verify with family']
    },
    {
      type: 'website',
      content: 'Earn $50/hour working from home! No experience needed. Just enter your parent\'s credit card to get started.',
      sender: 'EasyMoneyJobs.com',
      redFlags: ['Unrealistic earnings', 'Asking for credit card info', 'No experience required', 'Targeting children'],
      isScam: true,
      explanation: 'Real jobs don\'t ask for credit card information. Jobs that promise easy money are usually scams.',
      investigationHints: ['Real jobs don\'t require payment', 'Check if the company is legitimate', 'Look for realistic job requirements']
    },
    {
      type: 'email',
      content: 'Your Fortnite account has been suspended for cheating. Appeal here: fortnite-appeal-security.com',
      sender: 'EpicGames',
      redFlags: ['Fake website URL', 'Claiming account suspension', 'Urgent action required', 'Suspicious domain'],
      isScam: true,
      explanation: 'The website URL is fake. Real Epic Games emails come from official domains and don\'t create panic.',
      investigationHints: ['Check the website URL carefully', 'Real companies use official domains', 'Look for spelling errors in URLs']
    },
    {
      type: 'message',
      content: 'I can help you get unlimited Robux! Just send me your account details and I\'ll hack the game for you.',
      sender: 'RobuxHacker2024',
      redFlags: ['Claiming to hack games', 'Asking for account details', 'Offering unlimited currency', 'Illegal activity'],
      isScam: true,
      explanation: 'Hacking games is illegal and against terms of service. Anyone offering to hack your account is a scammer.',
      investigationHints: ['Hacking is illegal', 'Real companies don\'t offer unlimited currency', 'Be suspicious of illegal offers']
    },
    {
      type: 'website',
      content: 'You\'ve been selected for a free iPad! Just pay $10 processing fee. Limited time offer - act now!',
      sender: 'AppleGifts.com',
      redFlags: ['Claiming to be from Apple', 'Asking for payment for "free" item', 'Urgent time pressure', 'Fake company name'],
      isScam: true,
      explanation: 'Apple doesn\'t give away free iPads through random websites. Real companies don\'t ask for payment for free items.',
      investigationHints: ['Check if the company is real', 'Real free items don\'t require payment', 'Look for official company branding']
    },
    {
      type: 'email',
      content: 'Your YouTube channel has been flagged for copyright. Click here to appeal: youtube-copyright-appeal.net',
      sender: 'YouTubeCopyright',
      redFlags: ['Fake website URL', 'Claiming copyright issues', 'Urgent action required', 'Suspicious domain'],
      isScam: true,
      explanation: 'The website URL is fake. Real YouTube emails come from youtube.com and don\'t create panic.',
      investigationHints: ['Check the website URL carefully', 'Real YouTube emails use official domains', 'Look for spelling errors']
    },
    {
      type: 'message',
      content: 'I can help you get followers on TikTok! Just send me your login info and I\'ll boost your account.',
      sender: 'TikTokBooster',
      redFlags: ['Asking for login information', 'Offering to boost accounts', 'Direct message from stranger', 'Against platform rules'],
      isScam: true,
      explanation: 'Never share login information with strangers. Buying followers violates platform terms and is often a scam.',
      investigationHints: ['Never share login information', 'Buying followers is against rules', 'Be suspicious of account boosting offers']
    },
    {
      type: 'website',
      content: 'Win a free PlayStation 5! Just enter your parent\'s credit card for verification. You\'ll be charged $1 but get it back!',
      sender: 'PS5Winners.com',
      redFlags: ['Asking for credit card info', 'Claiming to charge and refund', 'Too good to be true', 'Targeting children'],
      isScam: true,
      explanation: 'Real contests don\'t ask for credit card information. The "charge and refund" trick is a common scam.',
      investigationHints: ['Real contests don\'t need credit cards', 'Be suspicious of "verification" charges', 'Check if the website is legitimate']
    },
    {
      type: 'email',
      content: 'Your Instagram account will be deleted! Verify your identity here: instagram-verify-account.com',
      sender: 'InstagramSecurity',
      redFlags: ['Fake website URL', 'Threat of account deletion', 'Urgent action required', 'Suspicious domain'],
      isScam: true,
      explanation: 'The website URL is fake. Real Instagram emails come from instagram.com and don\'t threaten account deletion.',
      investigationHints: ['Check the website URL carefully', 'Real Instagram emails use official domains', 'Look for spelling errors']
    },
    {
      type: 'message',
      content: 'I can help you get free skins in Among Us! Just download this app and enter your account info.',
      sender: 'AmongUsSkins',
      redFlags: ['Offering free items', 'Asking to download unknown app', 'Requesting account information', 'Direct message from stranger'],
      isScam: true,
      explanation: 'Random apps asking for account information are usually malware or phishing attempts. Never download unknown apps.',
      investigationHints: ['Be suspicious of unknown apps', 'Never enter account info in random apps', 'Check if the app is official']
    },
    {
      type: 'website',
      content: 'You\'ve won $1000! Just pay $20 processing fee to claim your prize. This offer expires in 1 hour!',
      sender: 'CashPrizeWinners.net',
      redFlags: ['Asking for payment for "free" money', 'Urgent time pressure', 'Too good to be true', 'Suspicious website'],
      isScam: true,
      explanation: 'Real prizes don\'t require payment. The urgent time pressure is used to make you act without thinking.',
      investigationHints: ['Real prizes are truly free', 'Be suspicious of urgent deadlines', 'Check if the website is legitimate']
    },
    {
      type: 'email',
      content: 'Your Discord account has been compromised! Secure it here: discord-security-verify.net',
      sender: 'DiscordSecurity',
      redFlags: ['Fake website URL', 'Claiming account compromise', 'Urgent action required', 'Suspicious domain'],
      isScam: true,
      explanation: 'The website URL is fake. Real Discord emails come from discord.com and don\'t create panic.',
      investigationHints: ['Check the website URL carefully', 'Real Discord emails use official domains', 'Look for spelling errors']
    },
    {
      type: 'message',
      content: 'I can help you get free coins in Clash of Clans! Just send me your account details and I\'ll hack the game.',
      sender: 'ClashHacker2024',
      redFlags: ['Claiming to hack games', 'Asking for account details', 'Offering unlimited currency', 'Illegal activity'],
      isScam: true,
      explanation: 'Hacking games is illegal and against terms of service. Anyone offering to hack your account is a scammer.',
      investigationHints: ['Hacking is illegal', 'Real companies don\'t offer unlimited currency', 'Be suspicious of illegal offers']
    },
    {
      type: 'website',
      content: 'Congratulations! You\'ve won a free Nintendo Switch! Just pay $15 shipping to claim your prize.',
      sender: 'NintendoWinners.com',
      redFlags: ['Asking for payment for "free" prize', 'Claiming to be from Nintendo', 'Too good to be true', 'Fake company name'],
      isScam: true,
      explanation: 'Nintendo doesn\'t give away free consoles through random websites. Real companies don\'t ask for payment for free items.',
      investigationHints: ['Check if the company is real', 'Real free items don\'t require payment', 'Look for official company branding']
    },
    {
      type: 'email',
      content: 'Your TikTok account has been suspended! Appeal here: tiktok-appeal-security.com',
      sender: 'TikTokSecurity',
      redFlags: ['Fake website URL', 'Claiming account suspension', 'Urgent action required', 'Suspicious domain'],
      isScam: true,
      explanation: 'The website URL is fake. Real TikTok emails come from tiktok.com and don\'t create panic.',
      investigationHints: ['Check the website URL carefully', 'Real TikTok emails use official domains', 'Look for spelling errors']
    }
  ], []);

  const startScenario = () => {
    setScenarioStarted(true);
  };

  const handleAnswerSelect = (answer: boolean) => {
    setUserAnswer(answer);
  };

  const handleAnswerSubmit = useCallback(() => {
    if (userAnswer === null) {
      return;
    }

    const scenario = scenarios[currentScenario];
    const isCorrect = userAnswer === scenario.isScam;

    setShowResult(true);

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

    // Move to next scenario after delay
    setTimeout(() => {
      if (currentScenario < scenarios.length - 1) {
        setCurrentScenario(prev => prev + 1);
        setUserAnswer(null);
        setShowResult(false);
        setShowInvestigation(false);
        setScenarioStarted(false);
      } else {
        setIsCompleted(true);
        onComplete();
      }
    }, 3000);
  }, [userAnswer, scenarios, currentScenario, onComplete]);

  const resetDetector = () => {
    setCurrentScenario(0);
    setUserAnswer(null);
    setShowResult(false);
    setShowInvestigation(false);
    setScore(0);
    setIsCompleted(false);
    setScenarioStarted(false);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail size={20} />;
      case 'message': return <MessageSquare size={20} />;
      case 'website': return <Globe size={20} />;
      case 'game_chat': return <Gamepad2 size={20} />;
      default: return <AlertTriangle size={20} />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'email': return '#2196F3';
      case 'message': return '#4CAF50';
      case 'website': return '#FF9800';
      case 'game_chat': return '#9C27B0';
      default: return '#666';
    }
  };

  const currentScenarioData = scenarios[currentScenario];

  if (!scenarioStarted) {
    return (
      <div className="scam-detector">
        <div className="activity-header">
          <h2 className="activity-title">🛡️ Scam Detector</h2>
          <button onClick={onClose} className="close-button">×</button>
        </div>

        <div className="detector-intro">
          <div className="intro-content">
            <h3>🔍 Learn to Spot Scams!</h3>
            <p>Practice identifying scams in emails, messages, websites, and game chats.</p>
            <div className="detector-info">
              <div className="info-item">
                <AlertTriangle size={20} />
                <span>20+ scam scenarios</span>
              </div>
              <div className="info-item">
                <Search size={20} />
                <span>Investigation tools</span>
              </div>
              <div className="info-item">
                <Shield size={20} />
                <span>Learn red flags</span>
              </div>
            </div>
            <div className="current-scenario">
              <h4>Current Scenario:</h4>
              <div className="scenario-preview">
                <div className="scenario-type" style={{ color: getTypeColor(currentScenarioData.type) }}>
                  {getTypeIcon(currentScenarioData.type)}
                  <span>{currentScenarioData.type.toUpperCase()}</span>
                </div>
                <p>From: {currentScenarioData.sender}</p>
              </div>
            </div>
            <button onClick={startScenario} className="start-scenario-button">
              Start Investigation
            </button>
          </div>
        </div>

        <style jsx>{`
          .scam-detector {
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

          .detector-intro {
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

          .detector-info {
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
            margin: 0 0 15px 0;
            color: #1976D2;
            font-size: 18px;
          }

          .scenario-preview {
            text-align: left;
          }

          .scenario-type {
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: bold;
            margin-bottom: 10px;
          }

          .scenario-preview p {
            margin: 0;
            color: #1976D2;
            font-size: 16px;
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
      <div className="scam-detector">
        <div className="activity-header">
          <h2 className="activity-title">Investigation Complete!</h2>
          <button onClick={onClose} className="close-button">×</button>
        </div>

        <div className="completion-results">
          <div className="results-content">
            <h3>🛡️ Excellent Scam Detection Skills!</h3>
            <div className="score-display">
              <div className="score-circle">
                <span className="score-number">{score}</span>
                <span className="score-total">/{scenarios.length}</span>
              </div>
              <div className="score-percentage">
                {Math.round((score / scenarios.length) * 100)}%
              </div>
            </div>
            <p>You correctly identified {score} out of {scenarios.length} scams!</p>
            <div className="safety-tips">
              <h4>🛡️ Remember These Scam Red Flags:</h4>
              <ul>
                <li>Urgent time pressure</li>
                <li>Asking for personal information</li>
                <li>Too good to be true offers</li>
                <li>Suspicious links or websites</li>
                <li>Asking for money for "free" items</li>
              </ul>
            </div>
            <div className="result-actions">
              <button onClick={resetDetector} className="action-button">
                <RotateCcw size={16} />
                Try Again
              </button>
            </div>
          </div>
        </div>

        <style jsx>{`
          .scam-detector {
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
    <div className="scam-detector">
      <div className="activity-header">
        <h2 className="activity-title">🛡️ Scam Detector</h2>
        <div className="header-info">
          <span className="scenario-number">Scenario {currentScenario + 1} of {scenarios.length}</span>
          <span className="score">Score: {score}</span>
          <button onClick={onClose} className="close-button">×</button>
        </div>
      </div>

      <div className="activity-content">
        <div className="scenario-header">
          <div className="scenario-type" style={{ color: getTypeColor(currentScenarioData.type) }}>
            {getTypeIcon(currentScenarioData.type)}
            <span>{currentScenarioData.type.toUpperCase()}</span>
          </div>
          <h3>From: {currentScenarioData.sender}</h3>
        </div>

        <div className="scenario-content">
          <div className="content-box">
            <p>{currentScenarioData.content}</p>
          </div>
        </div>

        {!showResult && (
          <div className="investigation-tools">
            <button 
              onClick={() => setShowInvestigation(!showInvestigation)} 
              className="investigation-button"
            >
              <Search size={16} />
              Investigation Tools
            </button>
            
            {showInvestigation && (
              <div className="investigation-panel">
                <h4>🔍 Investigation Hints:</h4>
                <ul>
                  {currentScenarioData.investigationHints.map((hint, index) => (
                    <li key={index}>{hint}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {!showResult && (
          <div className="answer-options">
            <h4>Is this a scam?</h4>
            <div className="options">
              <button
                className={`answer-button ${userAnswer === true ? 'selected' : ''}`}
                onClick={() => handleAnswerSelect(true)}
              >
                <AlertTriangle size={20} />
                Yes, it's a scam
              </button>
              <button
                className={`answer-button ${userAnswer === false ? 'selected' : ''}`}
                onClick={() => handleAnswerSelect(false)}
              >
                <CheckCircle size={20} />
                No, it's legitimate
              </button>
            </div>
            <button
              onClick={handleAnswerSubmit}
              disabled={userAnswer === null}
              className="submit-button"
            >
              Submit Answer
            </button>
          </div>
        )}

        {showResult && (
          <div className="result-explanation">
            <div className={`result-header ${currentScenarioData.isScam ? 'scam' : 'legitimate'}`}>
              <h4>
                {currentScenarioData.isScam ? '🚨 SCAM DETECTED!' : '✅ LEGITIMATE'}
              </h4>
              <p>
                {userAnswer === currentScenarioData.isScam ? 'Correct!' : 'Incorrect. Let\'s learn why.'}
              </p>
            </div>
            
            <div className="explanation">
              <h5>💡 Explanation:</h5>
              <p>{currentScenarioData.explanation}</p>
            </div>

            <div className="red-flags">
              <h5>🚩 Red Flags:</h5>
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
        .scam-detector {
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

        .scenario-header {
          padding: 20px;
          background: #f8f9fa;
          border-bottom: 1px solid #e0e0e0;
          text-align: center;
        }

        .scenario-type {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-weight: bold;
          font-size: 18px;
          margin-bottom: 10px;
        }

        .scenario-header h3 {
          margin: 0;
          color: #2C3E50;
          font-size: 20px;
        }

        .scenario-content {
          flex: 1;
          padding: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .content-box {
          background: #f5f5f5;
          border: 2px solid #ddd;
          border-radius: 12px;
          padding: 30px;
          max-width: 600px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .content-box p {
          margin: 0;
          color: #2C3E50;
          font-size: 18px;
          line-height: 1.6;
          text-align: center;
        }

        .investigation-tools {
          padding: 20px;
          background: #f8f9fa;
          border-top: 1px solid #e0e0e0;
        }

        .investigation-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          border: 1px solid #2196F3;
          background: #E3F2FD;
          color: #1976D2;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
          font-weight: 500;
        }

        .investigation-button:hover {
          background: #BBDEFB;
        }

        .investigation-panel {
          margin-top: 15px;
          background: white;
          border: 1px solid #2196F3;
          border-radius: 8px;
          padding: 20px;
        }

        .investigation-panel h4 {
          margin: 0 0 15px 0;
          color: #1976D2;
          font-size: 18px;
        }

        .investigation-panel ul {
          margin: 0;
          padding-left: 20px;
        }

        .investigation-panel li {
          margin-bottom: 8px;
          color: #1976D2;
          font-size: 14px;
        }

        .answer-options {
          padding: 20px;
          background: #f8f9fa;
          border-top: 1px solid #e0e0e0;
        }

        .answer-options h4 {
          margin: 0 0 20px 0;
          color: #2C3E50;
          text-align: center;
          font-size: 20px;
        }

        .options {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
        }

        .answer-button {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 20px;
          border: 2px solid #e0e0e0;
          background: white;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 16px;
          font-weight: 500;
        }

        .answer-button:hover {
          border-color: #4CAF50;
          background: #f8f9fa;
        }

        .answer-button.selected {
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

        .result-explanation {
          padding: 20px;
          background: #f8f9fa;
          border-top: 1px solid #e0e0e0;
        }

        .result-header {
          text-align: center;
          margin-bottom: 20px;
          padding: 20px;
          border-radius: 8px;
        }

        .result-header.scam {
          background: #FFEBEE;
          border: 2px solid #f44336;
        }

        .result-header.legitimate {
          background: #E8F5E8;
          border: 2px solid #4CAF50;
        }

        .result-header h4 {
          margin: 0 0 10px 0;
          font-size: 24px;
        }

        .result-header.scam h4 {
          color: #c62828;
        }

        .result-header.legitimate h4 {
          color: #2E7D32;
        }

        .result-header p {
          margin: 0;
          font-size: 18px;
          font-weight: bold;
        }

        .explanation {
          background: #E3F2FD;
          border: 1px solid #2196F3;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
        }

        .explanation h5 {
          margin: 0 0 10px 0;
          color: #1976D2;
          font-size: 18px;
        }

        .explanation p {
          margin: 0;
          color: #1976D2;
          font-size: 16px;
          line-height: 1.5;
        }

        .red-flags {
          background: #FFF3E0;
          border: 1px solid #FF9800;
          border-radius: 8px;
          padding: 20px;
        }

        .red-flags h5 {
          margin: 0 0 15px 0;
          color: #E65100;
          font-size: 18px;
        }

        .red-flags ul {
          margin: 0;
          padding-left: 20px;
        }

        .red-flags li {
          margin-bottom: 8px;
          color: #E65100;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .header-info {
            flex-direction: column;
            gap: 10px;
          }

          .options {
            flex-direction: column;
          }

          .content-box {
            padding: 20px;
          }

          .content-box p {
            font-size: 16px;
          }

          .answer-button {
            padding: 15px;
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

export default ScamDetector;