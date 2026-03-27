import{r as n,j as e,a3 as z,C as E,m as I,R as P}from"./react-vendor-BOZo0wfU.js";import"./vendor-DnBAyVVL.js";import"./app-screens-_0EESrUG.js";import"./components-family-hub-B5GlOXg3.js";import"./state-management-y1LSxOsg.js";import"./encryption-utilities-BBPZ7UWB.js";import"./monitoring-utilities-Bq33XAMw.js";import"./context-family-progress-BlwI39UW.js";import"./utilities-BXq9NOS6.js";import"./pages-family-hub-CPFnR9UC.js";const J=({onComplete:b,onClose:F})=>{const[c,m]=n.useState([]),[d,x]=n.useState([]),[f,y]=n.useState(!1),[p,v]=n.useState(0),[g,j]=n.useState(0),[C,k]=n.useState(0),[h,N]=n.useState(!1),l=n.useMemo(()=>[{symbol:"🔒",meaning:"Password"},{symbol:"🛡️",meaning:"Security"},{symbol:"👁️",meaning:"Privacy"},{symbol:"🚫",meaning:"Block"},{symbol:"✅",meaning:"Safe"},{symbol:"⚠️",meaning:"Warning"},{symbol:"🔐",meaning:"Encrypt"},{symbol:"🌐",meaning:"Internet"}],[]),u=n.useCallback(()=>{const t=[];l.forEach((o,r)=>{t.push({id:`symbol-${r}`,content:o.symbol,isFlipped:!1,isMatched:!1,pairId:`pair-${r}`}),t.push({id:`meaning-${r}`,content:o.meaning,isFlipped:!1,isMatched:!1,pairId:`pair-${r}`})});const s=t.sort(()=>Math.random()-.5);m(s),x([]),y(!1),v(0),j(0),k(0),N(!1)},[l]);n.useEffect(()=>{u()},[u]),n.useEffect(()=>{let t;return h&&!f&&(t=setInterval(()=>{k(s=>s+1)},1e3)),()=>clearInterval(t)},[h,f]);const S=t=>{h||N(!0),!(d.length>=2||c.find(s=>s.id===t)?.isFlipped||c.find(s=>s.id===t)?.isMatched)&&(m(s=>s.map(o=>o.id===t?{...o,isFlipped:!0}:o)),x(s=>[...s,t]))},w=n.useCallback(()=>{const[t,s]=d,o=c.find(a=>a.id===t),r=c.find(a=>a.id===s);o&&r&&o.pairId===r.pairId?(m(a=>a.map(i=>i.id===t||i.id===s?{...i,isMatched:!0}:i)),j(a=>a+1),setTimeout(()=>{const a=document.createElement("div");a.textContent="🎉✨",a.style.cssText=`
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 32px;
          z-index: 10000;
          pointer-events: none;
          animation: celebrate 1s ease-out forwards;
        `;const i=document.createElement("style");i.textContent=`
          @keyframes celebrate {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(1) translateY(-50px); }
          }
        `,document.head.appendChild(i),document.body.appendChild(a),setTimeout(()=>{document.body.removeChild(a),document.head.removeChild(i)},1e3)},200),g+1===l.length&&setTimeout(()=>{y(!0);const a=l.length*2,i=Math.max(0,Math.round((a-p)/a*100));b(i)},500)):setTimeout(()=>{m(a=>a.map(i=>i.id===t||i.id===s?{...i,isFlipped:!1}:i))},1e3),x([]),v(a=>a+1)},[d,c,g,b,l.length,p]);n.useEffect(()=>{d.length===2&&w()},[d,w]);const T=t=>t.isFlipped||t.isMatched?t.content:"?",A=t=>{let s="memory-card";return(t.isFlipped||t.isMatched)&&(s+=" flipped"),t.isMatched&&(s+=" matched"),t.content.length===1&&(s+=" symbol-card"),t.content.length>1&&(s+=" meaning-card"),s},M=t=>{const s=Math.floor(t/60),o=t%60;return`${s}:${o.toString().padStart(2,"0")}`};return e.jsxs("div",{className:"memory-game-activity",children:[e.jsxs("div",{className:"activity-header",children:[e.jsx("h2",{className:"activity-title",children:"Privacy Memory Game"}),e.jsx("button",{onClick:F,className:"close-button",children:"×"})]}),e.jsxs("div",{className:"activity-content",children:[e.jsxs("div",{className:"instructions",children:[e.jsx("p",{children:"Match each privacy symbol with its meaning! Click on cards to flip them and find matching pairs."}),e.jsxs("div",{className:"stats",children:[e.jsxs("div",{className:"stat",children:[e.jsx(z,{size:16}),e.jsx("span",{className:"stat-label",children:"Moves:"}),e.jsx("span",{className:"stat-value",children:p})]}),e.jsxs("div",{className:"stat",children:[e.jsx(E,{size:16}),e.jsx("span",{className:"stat-label",children:"Matches:"}),e.jsxs("span",{className:"stat-value",children:[g," / ",l.length]})]}),e.jsxs("div",{className:"stat",children:[e.jsx(I,{size:16}),e.jsx("span",{className:"stat-label",children:"Time:"}),e.jsx("span",{className:"stat-value",children:M(C)})]})]})]}),e.jsx("div",{className:"game-container",children:e.jsx("div",{className:"memory-grid",children:c.map(t=>e.jsxs("div",{className:A(t),onClick:()=>S(t.id),children:[e.jsx("div",{className:"card-content",children:T(t)}),e.jsx("div",{className:"card-back",children:e.jsx(z,{size:24})})]},t.id))})}),e.jsx("div",{className:"controls",children:e.jsxs("button",{onClick:u,className:"control-button",children:[e.jsx(P,{size:16}),"New Game"]})}),f&&e.jsx("div",{className:"completion-overlay",children:e.jsxs("div",{className:"completion-message",children:[e.jsx(E,{size:48,className:"success-icon"}),e.jsx("h3",{children:"Memory Master!"}),e.jsx("p",{children:"You've successfully matched all privacy symbols!"}),e.jsxs("p",{children:["Completed in ",p," moves and ",M(C)]}),e.jsxs("div",{className:"achievement-badges",children:[e.jsx("span",{className:"badge",children:"🧠 Memory Master"}),e.jsx("span",{className:"badge",children:"⚡ Quick Thinker"}),e.jsx("span",{className:"badge",children:"🛡️ Privacy Expert"})]})]})})]}),e.jsx("style",{jsx:!0,children:`
        .memory-game-activity {
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
        }

        .stats {
          display: flex;
          gap: 30px;
          flex-wrap: wrap;
        }

        .stat {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .stat-label {
          font-size: 14px;
          color: #666;
        }

        .stat-value {
          font-size: 18px;
          font-weight: bold;
          color: #4CAF50;
        }

        .game-container {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }

        .memory-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
          max-width: 600px;
          width: 100%;
        }

        .memory-card {
          aspect-ratio: 1;
          position: relative;
          cursor: pointer;
          transform-style: preserve-3d;
          transition: transform 0.6s;
        }

        .memory-card.flipped {
          transform: rotateY(180deg);
        }

        .memory-card.matched {
          transform: rotateY(180deg);
          opacity: 0.7;
        }

        .card-content,
        .card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }

        .card-back {
          background: linear-gradient(135deg, #4CAF50, #45a049);
          color: white;
          transform: rotateY(180deg);
        }

        .card-content {
          background: white;
          color: #2C3E50;
          font-size: 14px;
          text-align: center;
          padding: 10px;
          border: 2px solid #e0e0e0;
        }

        .symbol-card .card-content {
          font-size: 24px;
          background: #E8F5E8;
          border-color: #4CAF50;
        }

        .meaning-card .card-content {
          background: #E3F2FD;
          border-color: #2196F3;
        }

        .memory-card:hover .card-back {
          transform: rotateY(180deg) scale(1.05);
        }

        .memory-card:hover .card-content {
          transform: scale(1.05);
        }

        .memory-card.matched .card-content {
          background: #d4edda;
          border-color: #4CAF50;
          color: #155724;
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
          color: #4CAF50;
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

        .achievement-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          justify-content: center;
          margin-top: 20px;
        }

        .badge {
          background: #4CAF50;
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: bold;
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
      `})]})};export{J as default};
//# sourceMappingURL=MemoryGameActivity-Bwoz7em4.js.map
