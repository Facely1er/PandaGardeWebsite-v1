import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { RotateCcw, CheckCircle, Brain, Clock } from 'lucide-react';

interface MemoryGameActivityProps {
  onComplete: (score?: number) => void;
  onClose: () => void;
}

interface Card {
  id: string;
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
  pairId: string;
}

const MemoryGameActivity: React.FC<MemoryGameActivityProps> = ({ onComplete, onClose }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const cardPairs = useMemo(() => [
    { symbol: '🔒', meaning: 'Password' },
    { symbol: '🛡️', meaning: 'Security' },
    { symbol: '👁️', meaning: 'Privacy' },
    { symbol: '🚫', meaning: 'Block' },
    { symbol: '✅', meaning: 'Safe' },
    { symbol: '⚠️', meaning: 'Warning' },
    { symbol: '🔐', meaning: 'Encrypt' },
    { symbol: '🌐', meaning: 'Internet' },
  ], []);

  const initializeCards = useCallback(() => {
    const newCards: Card[] = [];

    cardPairs.forEach((pair, index) => {
      // Add symbol card
      newCards.push({
        id: `symbol-${index}`,
        content: pair.symbol,
        isFlipped: false,
        isMatched: false,
        pairId: `pair-${index}`,
      });

      // Add meaning card
      newCards.push({
        id: `meaning-${index}`,
        content: pair.meaning,
        isFlipped: false,
        isMatched: false,
        pairId: `pair-${index}`,
      });
    });

    // Shuffle cards
    const shuffled = newCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedCards([]);
    setIsCompleted(false);
    setMoves(0);
    setMatches(0);
    setTimeElapsed(0);
    setGameStarted(false);
  }, [cardPairs]);

  useEffect(() => {
    initializeCards();
  }, [initializeCards]);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && !isCompleted) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, isCompleted]);

  const handleCardClick = (cardId: string) => {
    if (!gameStarted) {
      setGameStarted(true);
    }

    if (flippedCards.length >= 2 || cards.find(c => c.id === cardId)?.isFlipped || cards.find(c => c.id === cardId)?.isMatched) {
      return;
    }

    setCards(prev => prev.map(card =>
      card.id === cardId ? { ...card, isFlipped: true } : card
    ));

    setFlippedCards(prev => [...prev, cardId]);
  };

  const checkForMatch = useCallback(() => {
    const [firstId, secondId] = flippedCards;
    const firstCard = cards.find(c => c.id === firstId);
    const secondCard = cards.find(c => c.id === secondId);

    if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
      // Match found
      setCards(prev => prev.map(card =>
        card.id === firstId || card.id === secondId
          ? { ...card, isMatched: true }
          : card
      ));
      setMatches(prev => prev + 1);

      // Add match celebration
      setTimeout(() => {
        const celebration = document.createElement('div');
        celebration.textContent = '🎉✨';
        celebration.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 32px;
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

      if (matches + 1 === cardPairs.length) {
        setTimeout(() => {
          setIsCompleted(true);
          // Calculate score based on efficiency (fewer moves = higher score)
          const maxPossibleMoves = cardPairs.length * 2; // Worst case: flip every card twice
          const efficiency = Math.max(0, Math.round(((maxPossibleMoves - moves) / maxPossibleMoves) * 100));
          onComplete(efficiency);
        }, 500);
      }
    } else {
      // No match - flip cards back after delay
      setTimeout(() => {
        setCards(prev => prev.map(card =>
          card.id === firstId || card.id === secondId
            ? { ...card, isFlipped: false }
            : card
        ));
      }, 1000);
    }

    setFlippedCards([]);
    setMoves(prev => prev + 1);
  }, [flippedCards, cards, matches, onComplete, cardPairs.length, moves]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      checkForMatch();
    }
  }, [flippedCards, checkForMatch]);

  const getCardContent = (card: Card) => {
    if (card.isFlipped || card.isMatched) {
      return card.content;
    }
    return '?';
  };

  const getCardClassName = (card: Card) => {
    let className = 'memory-card';
    if (card.isFlipped || card.isMatched) {className += ' flipped';}
    if (card.isMatched) {className += ' matched';}
    if (card.content.length === 1) {className += ' symbol-card';}
    if (card.content.length > 1) {className += ' meaning-card';}
    return className;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="memory-game-activity">
      {/* Header removed - ActivityManager handles it */}

      <div className="activity-content">
        <div className="instructions">
          <p>Match each privacy symbol with its meaning! Click on cards to flip them and find matching pairs.</p>
          <div className="stats">
            <div className="stat">
              <Brain size={16} />
              <span className="stat-label">Moves:</span>
              <span className="stat-value">{moves}</span>
            </div>
            <div className="stat">
              <CheckCircle size={16} />
              <span className="stat-label">Matches:</span>
              <span className="stat-value">{matches} / {cardPairs.length}</span>
            </div>
            <div className="stat">
              <Clock size={16} />
              <span className="stat-label">Time:</span>
              <span className="stat-value">{formatTime(timeElapsed)}</span>
            </div>
          </div>
        </div>

        <div className="game-container">
          <div className="memory-grid">
            {cards.map(card => (
              <div
                key={card.id}
                className={getCardClassName(card)}
                onClick={() => handleCardClick(card.id)}
              >
                <div className="card-content">
                  {getCardContent(card)}
                </div>
                <div className="card-back">
                  <Brain size={24} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="controls">
          <button onClick={initializeCards} className="control-button">
            <RotateCcw size={16} />
            New Game
          </button>
        </div>

        {isCompleted && (
          <div className="completion-overlay">
            <div className="completion-message">
              <CheckCircle size={48} className="success-icon" />
              <h3>Memory Master!</h3>
              <p>You've successfully matched all privacy symbols!</p>
              <p>Completed in {moves} moves and {formatTime(timeElapsed)}</p>
              <div className="achievement-badges">
                <span className="badge">🧠 Memory Master</span>
                <span className="badge">⚡ Quick Thinker</span>
                <span className="badge">🛡️ Privacy Expert</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .memory-game-activity {
          position: relative;
          width: 100%;
          min-height: 100%;
          display: flex;
          flex-direction: column;
          background: white;
          overflow: visible;
          padding: 0;
          margin: 0;
        }

        /* Header removed - ActivityManager handles it */

        .activity-content {
          flex: 1;
          min-height: 0;
          background: white;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          padding: 0;
          margin: 0;
        }

        .instructions {
          padding: 28px;
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #ffffff 100%);
          border-bottom: 1px solid rgba(14, 165, 233, 0.1);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04),
                      0 2px 8px rgba(0, 0, 0, 0.02);
        }

        .instructions p {
          margin: 0 0 24px 0;
          color: #1e293b;
          font-size: 16px;
          line-height: 1.7;
          font-weight: 500;
        }

        .stats {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          padding: 20px;
          background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(14, 165, 233, 0.1),
                      0 2px 8px rgba(14, 165, 233, 0.05),
                      inset 0 1px 0 rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(14, 165, 233, 0.15);
        }

        .stat {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 20px;
          background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);
          border-radius: 12px;
          border: 1px solid rgba(14, 165, 233, 0.2);
          box-shadow: 0 2px 8px rgba(14, 165, 233, 0.1);
          transition: all 0.3s ease;
        }

        .stat:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.2);
          border-color: rgba(14, 165, 233, 0.3);
        }

        .stat-label {
          font-size: 13px;
          color: #64748b;
          font-weight: 500;
        }

        .stat-value {
          font-size: 18px;
          font-weight: 700;
          color: #0ea5e9;
        }

        .game-container {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px 24px;
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 25%, #bae6fd 50%, #e0f2fe 75%, #f0f9ff 100%);
          position: relative;
          top: 0;
          left: 0;
          min-height: 500px;
        }

        .game-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 20% 50%, rgba(14, 165, 233, 0.1) 0%, transparent 50%),
                      radial-gradient(circle at 80% 80%, rgba(6, 182, 212, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }

        .memory-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
          max-width: 650px;
          width: 100%;
          position: relative;
          z-index: 1;
        }

        .memory-card {
          aspect-ratio: 1;
          position: relative;
          cursor: pointer;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          perspective: 1000px;
        }

        .memory-card.flipped {
          transform: rotateY(180deg);
        }

        .memory-card.matched {
          transform: rotateY(180deg) scale(0.95);
          opacity: 0.8;
          animation: matchPulse 0.6s ease;
        }

        @keyframes matchPulse {
          0%, 100% { transform: rotateY(180deg) scale(0.95); }
          50% { transform: rotateY(180deg) scale(1.1); }
        }

        .card-content,
        .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-back {
          background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 50%, #0891b2 100%);
          color: white;
          transform: rotateY(180deg);
          box-shadow: 0 8px 24px rgba(14, 165, 233, 0.3),
                      0 4px 12px rgba(14, 165, 233, 0.2),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .card-back::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%);
          border-radius: 16px;
          pointer-events: none;
        }

        .card-content {
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          color: #1e293b;
          font-size: 14px;
          text-align: center;
          padding: 12px;
          border: 2px solid rgba(14, 165, 233, 0.2);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08),
                      0 2px 8px rgba(0, 0, 0, 0.04),
                      inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }

        .symbol-card .card-content {
          font-size: 28px;
          background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
          border-color: #10b981;
          box-shadow: 0 4px 16px rgba(16, 185, 129, 0.15),
                      0 2px 8px rgba(16, 185, 129, 0.1),
                      inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }

        .meaning-card .card-content {
          background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
          border-color: #3b82f6;
          box-shadow: 0 4px 16px rgba(59, 130, 246, 0.15),
                      0 2px 8px rgba(59, 130, 246, 0.1),
                      inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }

        .memory-card:hover:not(.matched) .card-back {
          transform: rotateY(180deg) scale(1.08);
          box-shadow: 0 12px 32px rgba(14, 165, 233, 0.4),
                      0 6px 16px rgba(14, 165, 233, 0.3),
                      inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }

        .memory-card:hover:not(.matched) .card-content {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12),
                      0 3px 10px rgba(0, 0, 0, 0.08),
                      inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }

        .memory-card.matched .card-content {
          background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
          border-color: #10b981;
          color: #065f46;
          box-shadow: 0 4px 16px rgba(16, 185, 129, 0.25),
                      0 2px 8px rgba(16, 185, 129, 0.15),
                      inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }

        .memory-card:active:not(.matched) {
          transform: scale(0.98);
        }

        .controls {
          padding: 24px;
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          display: flex;
          gap: 16px;
          justify-content: center;
          box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.03);
        }

        .control-button {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 28px;
          border: 1px solid rgba(14, 165, 233, 0.2);
          background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 15px;
          font-weight: 600;
          color: #0ea5e9;
          box-shadow: 0 2px 8px rgba(14, 165, 233, 0.1);
        }

        .control-button:hover {
          background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
          color: white;
          border-color: #0ea5e9;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
        }

        .control-button:active {
          transform: translateY(0);
        }

        .completion-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(14, 165, 233, 0.95) 0%, rgba(6, 182, 212, 0.95) 100%);
          backdrop-filter: blur(8px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 10;
          animation: fadeIn 0.4s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .completion-message {
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          padding: 48px;
          border-radius: 24px;
          text-align: center;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3),
                      0 8px 24px rgba(0, 0, 0, 0.2),
                      inset 0 1px 0 rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.2);
          max-width: 500px;
          animation: scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .success-icon {
          color: #10b981;
          margin-bottom: 24px;
          filter: drop-shadow(0 4px 12px rgba(16, 185, 129, 0.3));
          animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        @keyframes bounceIn {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }

        .completion-message h3 {
          margin: 0 0 16px 0;
          color: #1e293b;
          font-size: 28px;
          font-weight: 800;
          background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .completion-message p {
          margin: 12px 0;
          color: #64748b;
          font-size: 16px;
          line-height: 1.6;
        }

        .achievement-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
          margin-top: 28px;
        }

        .badge {
          padding: 10px 20px;
          background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
          border: 2px solid #10b981;
          border-radius: 24px;
          font-size: 14px;
          font-weight: 600;
          color: #065f46;
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.2);
          transition: all 0.3s ease;
        }

        .badge:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }

        @media (max-width: 768px) {
          .memory-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
          }

          .card-content {
            font-size: 12px;
            padding: 8px;
          }

          .symbol-card .card-content {
            font-size: 20px;
          }

          .stats {
            flex-direction: column;
            gap: 15px;
            align-items: center;
          }

          .achievement-badges {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
};

export default MemoryGameActivity;