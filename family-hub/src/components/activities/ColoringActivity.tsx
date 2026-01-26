import React, { useRef, useEffect, useState } from 'react';
import { RotateCcw, Download, CheckCircle } from 'lucide-react';

interface ColoringActivityProps {
  onComplete: (score?: number) => void;
  onClose: () => void;
}

const ColoringActivity: React.FC<ColoringActivityProps> = ({ onComplete, onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#FF6B6B');
  const [brushSize, setBrushSize] = useState(10);
  const [isCompleted, setIsCompleted] = useState(false);

  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
    '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D2B4DE'
  ];

  const drawColoringPage = (ctx: CanvasRenderingContext2D) => {
    // Clear canvas
    ctx.clearRect(0, 0, 600, 400);

    // Set background with gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, '#E8F5E8');
    gradient.addColorStop(1, '#F8F9FA');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 600, 400);

    // Draw decorative border
    ctx.strokeStyle = '#4CAF50';
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 10, 580, 380);

    // Draw Privacy Panda outline with thicker, more child-friendly lines
    ctx.strokeStyle = '#2C3E50';
    ctx.lineWidth = 4;
    ctx.beginPath();

    // Panda head (larger and more rounded)
    ctx.arc(300, 150, 90, 0, 2 * Math.PI);
    ctx.stroke();

    // Panda ears (larger)
    ctx.beginPath();
    ctx.arc(250, 100, 35, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(350, 100, 35, 0, 2 * Math.PI);
    ctx.stroke();

    // Panda eyes (larger and more expressive)
    ctx.fillStyle = '#2C3E50';
    ctx.beginPath();
    ctx.arc(280, 140, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(320, 140, 10, 0, 2 * Math.PI);
    ctx.fill();

    // Eye highlights
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(282, 138, 3, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(322, 138, 3, 0, 2 * Math.PI);
    ctx.fill();

    // Panda nose (larger)
    ctx.fillStyle = '#2C3E50';
    ctx.beginPath();
    ctx.arc(300, 160, 6, 0, 2 * Math.PI);
    ctx.fill();

    // Panda mouth (more expressive)
    ctx.strokeStyle = '#2C3E50';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(300, 170, 18, 0, Math.PI);
    ctx.stroke();

    // Panda body
    ctx.strokeStyle = '#2C3E50';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(300, 200, 60, 0, 2 * Math.PI);
    ctx.stroke();

    // Panda arms
    ctx.beginPath();
    ctx.arc(250, 220, 25, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(350, 220, 25, 0, 2 * Math.PI);
    ctx.stroke();

    // Shield outline (more detailed)
    ctx.strokeStyle = '#2C3E50';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(200, 250);
    ctx.lineTo(200, 350);
    ctx.lineTo(300, 380);
    ctx.lineTo(400, 350);
    ctx.lineTo(400, 250);
    ctx.lineTo(300, 220);
    ctx.closePath();
    ctx.stroke();

    // Shield decoration lines
    ctx.strokeStyle = '#2C3E50';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(250, 250);
    ctx.lineTo(250, 350);
    ctx.moveTo(300, 250);
    ctx.lineTo(300, 350);
    ctx.moveTo(350, 250);
    ctx.lineTo(350, 350);
    ctx.stroke();

    // Lock symbol on shield (more detailed)
    ctx.strokeStyle = '#2C3E50';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(300, 300, 25, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(275, 300);
    ctx.lineTo(275, 275);
    ctx.lineTo(325, 275);
    ctx.lineTo(325, 300);
    ctx.stroke();

    // Lock keyhole
    ctx.fillStyle = '#2C3E50';
    ctx.beginPath();
    ctx.arc(300, 300, 8, 0, 2 * Math.PI);
    ctx.fill();

    // Add some decorative elements
    ctx.fillStyle = '#4CAF50';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🔒', 300, 320);

    // Text with better styling
    ctx.fillStyle = '#2C3E50';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Privacy Panda', 300, 50);
    ctx.font = '18px Arial';
    ctx.fillStyle = '#4CAF50';
    ctx.fillText('Protect Your Digital Treasure!', 300, 75);

    // Add some stars for decoration
    ctx.fillStyle = '#FFD700';
    ctx.font = '20px Arial';
    ctx.fillText('⭐', 50, 50);
    ctx.fillText('⭐', 550, 50);
    ctx.fillText('⭐', 50, 350);
    ctx.fillText('⭐', 550, 350);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {return;}

    const ctx = canvas.getContext('2d');
    if (!ctx) {return;}

    // Set canvas size
    canvas.width = 600;
    canvas.height = 400;

    // Draw the coloring page outline
    drawColoringPage(ctx);
  }, []);

  const getEventPos = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) {return { x: 0, y: 0 };}

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e) {
      // Touch event
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY
      };
    } else {
      // Mouse event
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    setIsDrawing(true);
    const pos = getEventPos(e);
    drawAt(pos.x, pos.y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) {return;}
    e.preventDefault();
    const pos = getEventPos(e);
    drawAt(pos.x, pos.y);
  };

  const drawAt = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) {return;}

    const ctx = canvas.getContext('2d');
    if (!ctx) {return;}

    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = selectedColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLCanvasElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // Allow keyboard users to "draw" by pressing Enter or Space
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const x = rect.width / 2;
        const y = rect.height / 2;
        drawAt(x, y);
      }
    } else if (e.key === 'c' || e.key === 'C') {
      e.preventDefault();
      checkCompletion();
    } else if (e.key === 'r' || e.key === 'R') {
      e.preventDefault();
      clearCanvas();
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) {return;}

    const ctx = canvas.getContext('2d');
    if (!ctx) {return;}

    drawColoringPage(ctx);
    setIsCompleted(false);
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) {return;}

    const link = document.createElement('a');
    link.download = 'privacy-panda-coloring.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const checkCompletion = () => {
    // Enhanced completion check - if user has drawn significantly
    const canvas = canvasRef.current;
    if (!canvas) {return;}

    const ctx = canvas.getContext('2d');
    if (!ctx) {return;}

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let coloredPixels = 0;
    let totalPixels = 0;
    
    // Check only the main drawing areas (panda and shield)
    for (let y = 50; y < 350; y++) {
      for (let x = 100; x < 500; x++) {
        const i = (y * canvas.width + x) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        // Skip background colors
        if (!(r === 232 && g === 245 && b === 232) && // Light green background
            !(r === 248 && g === 249 && b === 250) && // Light gray background
            !(r === 44 && g === 62 && b === 80)) {    // Dark outline
          totalPixels++;
          if (a > 0) {
            coloredPixels++;
          }
        }
      }
    }

    // Calculate completion percentage
    const completionPercentage = totalPixels > 0 ? (coloredPixels / totalPixels) * 100 : 0;
    
    // If more than 30% of the drawing area is colored, consider it complete
    if (completionPercentage > 30) {
      setIsCompleted(true);
      // Calculate score based on completion percentage (capped at 100)
      const finalScore = Math.min(100, Math.round(completionPercentage));
      onComplete(finalScore);
      
      // Add celebration animation
      setTimeout(() => {
        const celebration = document.createElement('div');
        celebration.textContent = '🎉🎨✨';
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
    } else {
      // Show progress feedback
      const progressMessage = `Keep coloring! You've filled ${Math.round(completionPercentage)}% of the drawing area.`;
      alert(progressMessage);
    }
  };

  return (
    <div className="coloring-activity" style={{ display: 'flex', flexDirection: 'column', width: '100%', minHeight: '600px', backgroundColor: 'white', position: 'relative' }}>
      {/* Header removed - ActivityManager handles it */}

      <div className="activity-content" style={{ display: 'flex', flex: 1, minHeight: '500px', backgroundColor: 'white', position: 'relative' }}>
        <div className="tools-panel">
          <div className="color-palette">
            <h3>Colors</h3>
            <div className="colors-grid">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`color-button ${selectedColor === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          <div className="brush-controls">
            <h3>Brush Size</h3>
            <input
              type="range"
              min="5"
              max="25"
              value={brushSize}
              onChange={(e) => setBrushSize(Number(e.target.value))}
              className="brush-slider"
            />
            <span className="brush-size">{brushSize}px</span>
          </div>

          <div className="action-buttons">
            <button onClick={clearCanvas} className="action-button">
              <RotateCcw size={16} />
              Clear
            </button>
            <button onClick={downloadImage} className="action-button">
              <Download size={16} />
              Download
            </button>
            <button onClick={checkCompletion} className="action-button primary">
              <CheckCircle size={16} />
              Check Complete
            </button>
          </div>
        </div>

        <div className="canvas-container">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            onKeyDown={handleKeyDown}
            className="coloring-canvas"
            style={{ touchAction: 'none' }}
            role="img"
            aria-label="Privacy Panda coloring page with panda and shield outline. Use mouse or touch to color, or press Enter or Space to add color. Press C to check completion, R to reset."
            tabIndex={0}
          />
          {isCompleted && (
            <div className="completion-overlay">
              <div className="completion-message">
                <CheckCircle size={48} className="success-icon" />
                <h3>Great Job!</h3>
                <p>You've completed the Privacy Panda coloring activity!</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .coloring-activity {
          position: relative !important;
          width: 100% !important;
          min-height: 600px !important;
          display: flex !important;
          flex-direction: column !important;
          background: white !important;
          visibility: visible !important;
          opacity: 1 !important;
        }

        /* Header removed - ActivityManager handles it */

        .activity-content {
          display: flex !important;
          flex: 1 !important;
          min-height: 500px !important;
          background: white !important;
          visibility: visible !important;
          opacity: 1 !important;
        }

        .tools-panel {
          width: 280px;
          padding: 24px;
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          border-right: 1px solid rgba(0, 0, 0, 0.08);
          overflow-y: auto;
          box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
        }

        .color-palette h3,
        .brush-controls h3 {
          margin: 0 0 16px 0;
          color: #1e293b;
          font-size: 16px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .colors-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-bottom: 30px;
        }

        .color-button {
          width: 44px;
          height: 44px;
          border: 3px solid transparent;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
        }

        .color-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
          pointer-events: none;
        }

        .color-button:hover {
          transform: scale(1.15) translateY(-2px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        }

        .color-button.selected {
          border-color: #0ea5e9;
          transform: scale(1.15) translateY(-2px);
          box-shadow: 0 6px 20px rgba(14, 165, 233, 0.4),
                      0 0 0 3px rgba(14, 165, 233, 0.1);
        }

        .brush-controls {
          margin-bottom: 30px;
        }

        .brush-slider {
          width: 100%;
          margin: 12px 0;
          height: 8px;
          border-radius: 4px;
          background: linear-gradient(to right, #e0f2fe, #0ea5e9);
          outline: none;
          -webkit-appearance: none;
        }

        .brush-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0ea5e9, #06b6d4);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(14, 165, 233, 0.4);
          transition: all 0.3s ease;
        }

        .brush-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.6);
        }

        .brush-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0ea5e9, #06b6d4);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(14, 165, 233, 0.4);
        }

        .brush-size {
          display: block;
          text-align: center;
          color: #0ea5e9;
          font-size: 15px;
          font-weight: 600;
          margin-top: 8px;
        }

        .action-buttons {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .action-button {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 20px;
          border: 1px solid rgba(14, 165, 233, 0.2);
          background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 14px;
          font-weight: 600;
          color: #0ea5e9;
          box-shadow: 0 2px 8px rgba(14, 165, 233, 0.1);
        }

        .action-button:hover {
          background: linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%);
          color: white;
          border-color: #0ea5e9;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
        }

        .action-button:active {
          transform: translateY(0);
        }

        .action-button.primary {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          border-color: #10b981;
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.2);
        }

        .action-button.primary:hover {
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
        }

        .action-button.primary:hover {
          background: #45a049;
        }

        .canvas-container {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 32px;
          position: relative;
          top: 0;
          left: 0;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        }

        .coloring-canvas {
          border: 2px solid #ddd;
          border-radius: 8px;
          cursor: crosshair;
          background: white;
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
        }

        .success-icon {
          color: #4CAF50;
          margin-bottom: 20px;
        }

        .completion-message h3 {
          margin: 0 0 10px 0;
          color: #2C3E50;
          font-size: 24px;
        }

        .completion-message p {
          margin: 0;
          color: #666;
          font-size: 16px;
        }

        @media (max-width: 768px) {
          .activity-content {
            flex-direction: column;
          }

          .tools-panel {
            width: 100%;
            height: auto;
            max-height: 250px;
            overflow-y: auto;
            padding: 15px;
          }

          .colors-grid {
            grid-template-columns: repeat(6, 1fr);
            gap: 8px;
          }

          .color-button {
            width: 35px;
            height: 35px;
            min-width: 35px;
            min-height: 35px;
          }

          .action-buttons {
            flex-direction: row;
            flex-wrap: wrap;
            gap: 8px;
          }

          .action-button {
            flex: 1;
            min-width: 80px;
            padding: 10px 12px;
            font-size: 13px;
          }

          .coloring-canvas {
            width: 100%;
            max-width: 350px;
            height: 250px;
            touch-action: none;
          }

          .canvas-container {
            padding: 15px;
            min-height: 300px;
          }
        }

        @media (max-width: 480px) {
          .tools-panel {
            max-height: 200px;
            padding: 10px;
          }

          .colors-grid {
            grid-template-columns: repeat(5, 1fr);
            gap: 6px;
          }

          .color-button {
            width: 30px;
            height: 30px;
            min-width: 30px;
            min-height: 30px;
          }

          .action-buttons {
            flex-direction: column;
          }

          .action-button {
            width: 100%;
            margin-bottom: 5px;
          }

          .coloring-canvas {
            max-width: 300px;
            height: 200px;
          }
        }
      `}</style>
    </div>
  );
};

export default ColoringActivity;