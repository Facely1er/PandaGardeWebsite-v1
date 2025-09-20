import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Cookie, Eye, Shield, Target, RotateCcw, Download, Trophy, Star } from 'lucide-react';

interface CookieMonsterTrackerProps {
  onComplete: () => void;
  onClose: () => void;
}

interface Cookie {
  id: string;
  type: 'necessary' | 'tracking' | 'advertising';
  website: string;
  purpose: string;
  icon: string;
  x: number;
  y: number;
  isDragging: boolean;
  isInJar: boolean;
}

const CookieMonsterTracker: React.FC<CookieMonsterTrackerProps> = ({ onComplete, onClose }) => {
  const [cookies, setCookies] = useState<Cookie[]>([]);
  const [draggedCookie, setDraggedCookie] = useState<Cookie | null>(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [_showExplanation, setShowExplanation] = useState(false);
  const [currentCookie, setCurrentCookie] = useState<Cookie | null>(null);
  const [highScore, setHighScore] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const initialCookies: Omit<Cookie, 'x' | 'y' | 'isDragging' | 'isInJar'>[] = useMemo(() => [
    { id: '1', type: 'necessary', website: 'Google', purpose: 'Remember your login', icon: '🔐' },
    { id: '2', type: 'tracking', website: 'Facebook', purpose: 'Track your browsing', icon: '👁️' },
    { id: '3', type: 'advertising', website: 'Amazon', purpose: 'Show you ads', icon: '📢' },
    { id: '4', type: 'necessary', website: 'YouTube', purpose: 'Save your preferences', icon: '⚙️' },
    { id: '5', type: 'tracking', website: 'Twitter', purpose: 'Follow your activity', icon: '🕵️' },
    { id: '6', type: 'advertising', website: 'Instagram', purpose: 'Target ads to you', icon: '🎯' },
    { id: '7', type: 'necessary', website: 'Netflix', purpose: 'Remember your language', icon: '🌐' },
    { id: '8', type: 'tracking', website: 'TikTok', purpose: 'Learn your interests', icon: '🧠' },
    { id: '9', type: 'advertising', website: 'Snapchat', purpose: 'Show sponsored content', icon: '💰' },
    { id: '10', type: 'necessary', website: 'Spotify', purpose: 'Save your playlists', icon: '🎵' },
    { id: '11', type: 'tracking', website: 'Pinterest', purpose: 'Track your pins', icon: '📌' },
    { id: '12', type: 'advertising', website: 'Roblox', purpose: 'Show game ads', icon: '🎮' },
    { id: '13', type: 'necessary', website: 'Discord', purpose: 'Remember your settings', icon: '💬' },
    { id: '14', type: 'tracking', website: 'Reddit', purpose: 'Track your posts', icon: '📝' },
    { id: '15', type: 'advertising', website: 'Twitch', purpose: 'Show streamer ads', icon: '📺' },
  ], []);

  // Load high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem('cookieMonsterHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  const shuffleCookies = useCallback(() => {
    const shuffled = initialCookies.map((cookie, index) => ({
      ...cookie,
      x: 50 + (index % 4) * 120,
      y: 100 + Math.floor(index / 4) * 80,
      isDragging: false,
      isInJar: false,
    }));
    setCookies(shuffled);
    setIsCompleted(false);
    setScore(0);
    setShowExplanation(false);
    setCurrentCookie(null);
  }, [initialCookies]);

  useEffect(() => {
    shuffleCookies();
  }, [shuffleCookies]);

  const getEventPos = (e: React.MouseEvent | React.TouchEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) {
      return { x: 0, y: 0 };
    }

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left - 50,
        y: touch.clientY - rect.top - 25
      };
    } else {
      return {
        x: e.clientX - rect.left - 50,
        y: e.clientY - rect.top - 25
      };
    }
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent, cookie: Cookie) => {
    e.preventDefault();
    setDraggedCookie({ ...cookie, isDragging: true });
    setCurrentCookie(cookie);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!draggedCookie) {
      return;
    }

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) {
      return;
    }

    const { x, y } = getEventPos(e);

    setCookies(prev => prev.map(cookie =>
      cookie.id === draggedCookie.id
        ? { ...cookie, x: Math.max(0, Math.min(x, rect.width - 100)), y: Math.max(0, Math.min(y, rect.height - 50)) }
        : cookie
    ));
  };

  const handleEnd = () => {
    if (!draggedCookie) {
      return;
    }

    const jarZone = { x: 200, y: 300, width: 200, height: 150 };
    const cookieCenterX = draggedCookie.x + 50;
    const cookieCenterY = draggedCookie.y + 25;

    const isInJar = cookieCenterX >= jarZone.x && cookieCenterX <= jarZone.x + jarZone.width &&
                   cookieCenterY >= jarZone.y && cookieCenterY <= jarZone.y + jarZone.height;

    setCookies(prev => prev.map(cookie =>
      cookie.id === draggedCookie.id
        ? { ...cookie, isDragging: false, isInJar }
        : cookie
    ));

    if (isInJar) {
      setScore(prev => prev + 1);
      
      // Celebration animation
      setTimeout(() => {
        const celebration = document.createElement('div');
        celebration.textContent = '🍪✨';
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

    setDraggedCookie(null);
    checkCompletion();
  };

  const checkCompletion = () => {
    const totalCookies = cookies.length;
    const cookiesInJar = cookies.filter(cookie => cookie.isInJar).length;

    if (cookiesInJar === totalCookies) {
      setIsCompleted(true);
      
      // Save high score
      if (cookiesInJar > highScore) {
        setHighScore(cookiesInJar);
        localStorage.setItem('cookieMonsterHighScore', cookiesInJar.toString());
      }
      
      onComplete();
      
      // Final celebration
      setTimeout(() => {
        const celebration = document.createElement('div');
        celebration.textContent = '🎉🍪🛡️';
        celebration.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 48px;
          z-index: 10000;
          pointer-events: none;
          animation: celebrate 2s ease-out forwards;
        `;
        
        const style = document.createElement('style');
        style.textContent = `
          @keyframes celebrate {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(1) translateY(-100px); }
          }
        `;
        document.head.appendChild(style);
        document.body.appendChild(celebration);
        
        setTimeout(() => {
          document.body.removeChild(celebration);
          document.head.removeChild(style);
        }, 2000);
      }, 100);
    }
  };

  const downloadImage = () => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    canvas.width = 600;
    canvas.height = 500;

    // Draw background
    ctx.fillStyle = '#F8F9FA';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw title
    ctx.fillStyle = '#2C3E50';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Cookie Monster Tracker', canvas.width / 2, 40);

    // Draw instructions
    ctx.font = '16px Arial';
    ctx.fillStyle = '#6C757D';
    ctx.fillText('Feed the Cookie Monster!', canvas.width / 2, 70);

    // Draw cookie jar
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(200, 300, 200, 150);
    ctx.fillStyle = '#A0522D';
    ctx.fillRect(210, 310, 180, 130);

    // Draw cookies
    ctx.fillStyle = '#2C3E50';
    ctx.font = '14px Arial';
    cookies.forEach(cookie => {
      ctx.fillStyle = getCookieColor(cookie.type);
      ctx.fillRect(cookie.x - 40, cookie.y - 15, 80, 30);
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.fillText(cookie.website, cookie.x, cookie.y + 5);
    });

    const link = document.createElement('a');
    link.download = 'cookie-monster-tracker.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const getCookieColor = (type: string) => {
    switch (type) {
      case 'necessary': return '#4CAF50';
      case 'tracking': return '#FF9800';
      case 'advertising': return '#f44336';
      default: return '#666';
    }
  };

  const getCookieStyle = (cookie: Cookie) => ({
    left: `${cookie.x}px`,
    top: `${cookie.y}px`,
    zIndex: cookie.isDragging ? 1000 : 1,
    transform: cookie.isDragging ? 'scale(1.1)' : 'scale(1)',
    boxShadow: cookie.isDragging ? '0 8px 25px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
  });

  const getCookieClassName = (cookie: Cookie) => {
    return `cookie-item ${cookie.type} ${cookie.isInJar ? 'in-jar' : ''}`;
  };

  const getTypeExplanation = (type: string) => {
    switch (type) {
      case 'necessary':
        return 'These cookies help websites work properly. They remember your login and preferences.';
      case 'tracking':
        return 'These cookies track your browsing activity across different websites to learn about you.';
      case 'advertising':
        return 'These cookies help show you targeted ads based on your interests and behavior.';
      default:
        return '';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'necessary': return <Shield size={16} />;
      case 'tracking': return <Eye size={16} />;
      case 'advertising': return <Target size={16} />;
      default: return <Cookie size={16} />;
    }
  };

  return (
    <div className="cookie-monster-tracker">
      <div className="activity-header">
        <h2 className="activity-title">🍪 Cookie Monster Tracker</h2>
        <div className="header-info">
          <span className="score">Cookies Fed: {score}</span>
          <span className="high-score">🏆 Best: {highScore}</span>
          <button onClick={onClose} className="close-button">×</button>
        </div>
      </div>

      <div className="activity-content">
        <div className="instructions">
          <p>Drag cookies to feed the Cookie Monster! Learn about different types of website cookies.</p>
          <div className="cookie-types">
            <div className="type-legend">
              <div className="legend-item necessary">
                <Shield size={16} />
                <span>Necessary</span>
              </div>
              <div className="legend-item tracking">
                <Eye size={16} />
                <span>Tracking</span>
              </div>
              <div className="legend-item advertising">
                <Target size={16} />
                <span>Advertising</span>
              </div>
            </div>
          </div>
        </div>

        <div
          ref={containerRef}
          className="game-container"
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
          style={{ touchAction: 'none' }}
        >
          {/* Cookie Monster Jar */}
          <div className="cookie-jar">
            <div className="jar-body">
              <div className="jar-label">🍪</div>
              <div className="jar-mouth">Feed Me!</div>
            </div>
          </div>

          {/* Draggable Cookies */}
          {cookies.map(cookie => (
            <div
              key={cookie.id}
              className={getCookieClassName(cookie)}
              style={getCookieStyle(cookie)}
              onMouseDown={(e) => handleStart(e, cookie)}
              onTouchStart={(e) => handleStart(e, cookie)}
              title={`${cookie.website} - ${cookie.purpose}`}
            >
              <span className="cookie-icon">{cookie.icon}</span>
              <span className="cookie-text">{cookie.website}</span>
            </div>
          ))}
        </div>

        <div className="controls">
          <button onClick={shuffleCookies} className="control-button">
            <RotateCcw size={16} />
            Shuffle
          </button>
          <button onClick={downloadImage} className="control-button">
            <Download size={16} />
            Download
          </button>
        </div>

        {currentCookie && (
          <div className="cookie-info">
            <h4>🍪 Cookie Information</h4>
            <div className="info-content">
              <div className="info-header">
                <span className="cookie-icon-large">{currentCookie.icon}</span>
                <div>
                  <h5>{currentCookie.website}</h5>
                  <p>{currentCookie.purpose}</p>
                </div>
              </div>
              <div className="type-info">
                <div className={`type-badge ${currentCookie.type}`}>
                  {getTypeIcon(currentCookie.type)}
                  <span>{currentCookie.type.toUpperCase()}</span>
                </div>
                <p>{getTypeExplanation(currentCookie.type)}</p>
              </div>
            </div>
          </div>
        )}

        {isCompleted && (
          <div className="completion-overlay">
            <div className="completion-message">
              <Trophy size={48} className="success-icon" />
              <h3>Cookie Monster is Happy! 🎉</h3>
              <p>You've fed all {cookies.length} cookies to the Cookie Monster!</p>
              <p>You now understand the different types of website cookies.</p>
              {score === cookies.length && (
                <div className="perfect-score">
                  <Star size={24} />
                  <span>Perfect Score! You're a cookie expert! 🌟</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .cookie-monster-tracker {
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

        .score {
          color: #4CAF50;
          font-weight: bold;
          font-size: 16px;
        }

        .high-score {
          color: #FF9800;
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

        .instructions {
          padding: 20px;
          background: #f8f9fa;
          border-bottom: 1px solid #e0e0e0;
        }

        .instructions p {
          margin: 0 0 15px 0;
          color: #2C3E50;
          font-size: 16px;
          text-align: center;
        }

        .cookie-types {
          display: flex;
          justify-content: center;
        }

        .type-legend {
          display: flex;
          gap: 20px;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
        }

        .legend-item.necessary {
          background: #E8F5E8;
          color: #2E7D32;
        }

        .legend-item.tracking {
          background: #FFF3E0;
          color: #E65100;
        }

        .legend-item.advertising {
          background: #FFEBEE;
          color: #c62828;
        }

        .game-container {
          flex: 1;
          position: relative;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          overflow: hidden;
        }

        .cookie-jar {
          position: absolute;
          top: 300px;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          height: 150px;
        }

        .jar-body {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #8B4513 0%, #A0522D 100%);
          border-radius: 20px 20px 50px 50px;
          border: 3px solid #654321;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
          box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        }

        .jar-label {
          font-size: 48px;
          margin-bottom: 10px;
        }

        .jar-mouth {
          color: white;
          font-size: 16px;
          font-weight: bold;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
        }

        .cookie-item {
          position: absolute;
          width: 100px;
          height: 50px;
          background: white;
          border: 2px solid #ddd;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: grab;
          user-select: none;
          font-size: 12px;
          font-weight: 500;
          text-align: center;
          padding: 5px;
          transition: all 0.2s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          gap: 5px;
        }

        .cookie-item:hover {
          transform: scale(1.05);
        }

        .cookie-item:active {
          cursor: grabbing;
        }

        .cookie-item.necessary {
          border-color: #4CAF50;
          background: #E8F5E8;
        }

        .cookie-item.tracking {
          border-color: #FF9800;
          background: #FFF3E0;
        }

        .cookie-item.advertising {
          border-color: #f44336;
          background: #FFEBEE;
        }

        .cookie-item.in-jar {
          border-color: #4CAF50;
          background: #C8E6C9;
          box-shadow: 0 0 0 2px #4CAF50;
        }

        .cookie-icon {
          font-size: 16px;
        }

        .cookie-text {
          font-size: 10px;
          line-height: 1.2;
        }

        .controls {
          padding: 20px;
          background: #f8f9fa;
          border-top: 1px solid #e0e0e0;
          display: flex;
          gap: 15px;
          justify-content: center;
        }

        .control-button {
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

        .control-button:hover {
          background: #f0f0f0;
        }

        .cookie-info {
          padding: 20px;
          background: #E3F2FD;
          border-top: 1px solid #2196F3;
        }

        .cookie-info h4 {
          margin: 0 0 15px 0;
          color: #1976D2;
          font-size: 18px;
          text-align: center;
        }

        .info-content {
          background: white;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .info-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 15px;
        }

        .cookie-icon-large {
          font-size: 32px;
        }

        .info-header h5 {
          margin: 0 0 5px 0;
          color: #2C3E50;
          font-size: 20px;
        }

        .info-header p {
          margin: 0;
          color: #666;
          font-size: 14px;
        }

        .type-info {
          text-align: center;
        }

        .type-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 10px;
        }

        .type-badge.necessary {
          background: #E8F5E8;
          color: #2E7D32;
        }

        .type-badge.tracking {
          background: #FFF3E0;
          color: #E65100;
        }

        .type-badge.advertising {
          background: #FFEBEE;
          color: #c62828;
        }

        .type-info p {
          margin: 0;
          color: #666;
          font-size: 14px;
          line-height: 1.5;
        }

        .completion-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10;
        }

        .completion-message {
          background: white;
          padding: 40px;
          border-radius: 12px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          max-width: 400px;
        }

        .success-icon {
          color: #FF9800;
          margin-bottom: 20px;
        }

        .completion-message h3 {
          margin: 0 0 15px 0;
          color: #2C3E50;
          font-size: 24px;
        }

        .completion-message p {
          margin: 0 0 10px 0;
          color: #666;
          font-size: 16px;
        }

        .perfect-score {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 20px;
          padding: 15px;
          background: #FFF3E0;
          border: 2px solid #FF9800;
          border-radius: 8px;
          color: #E65100;
          font-weight: bold;
        }

        @media (max-width: 768px) {
          .game-container {
            padding: 15px;
            min-height: 400px;
          }

          .cookie-jar {
            width: 150px;
            height: 120px;
          }

          .jar-label {
            font-size: 36px;
          }

          .jar-mouth {
            font-size: 14px;
          }

          .cookie-item {
            width: 90px;
            height: 45px;
            font-size: 11px;
            padding: 8px;
            min-height: 45px;
            touch-action: none;
            user-select: none;
          }

          .controls {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 10px;
            justify-content: center;
          }

          .control-button {
            flex: 1;
            min-width: 120px;
            padding: 10px 16px;
            font-size: 13px;
          }

          .instructions {
            padding: 15px;
            font-size: 14px;
          }

          .type-legend {
            flex-direction: column;
            gap: 10px;
          }

          .header-info {
            flex-direction: column;
            gap: 10px;
          }

          .score {
            font-size: 14px;
          }

          .high-score {
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .game-container {
            padding: 10px;
            min-height: 350px;
          }

          .cookie-jar {
            width: 120px;
            height: 100px;
          }

          .jar-label {
            font-size: 28px;
          }

          .jar-mouth {
            font-size: 12px;
          }

          .cookie-item {
            width: 80px;
            height: 40px;
            font-size: 10px;
            padding: 6px;
          }

          .controls {
            flex-direction: column;
          }

          .control-button {
            width: 100%;
            margin-bottom: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default CookieMonsterTracker;