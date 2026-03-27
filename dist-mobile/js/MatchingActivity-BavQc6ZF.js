import{r as c,j as i,E as W,R as G,D as B,C as H}from"./react-vendor-BOZo0wfU.js";import"./vendor-DnBAyVVL.js";import"./app-screens-_0EESrUG.js";import"./components-family-hub-B5GlOXg3.js";import"./state-management-y1LSxOsg.js";import"./encryption-utilities-BBPZ7UWB.js";import"./monitoring-utilities-Bq33XAMw.js";import"./context-family-progress-BlwI39UW.js";import"./utilities-BXq9NOS6.js";import"./pages-family-hub-CPFnR9UC.js";const te=({onComplete:k,onClose:z})=>{const[l,g]=c.useState([]),[m,j]=c.useState([]),[S,F]=c.useState(!1),[h,M]=c.useState(0),[f,N]=c.useState(0),r=c.useMemo(()=>[{symbol:"🔒",meaning:"Password Protection"},{symbol:"🛡️",meaning:"Security Shield"},{symbol:"👁️",meaning:"Privacy Settings"},{symbol:"🚫",meaning:"Block/Deny Access"},{symbol:"✅",meaning:"Safe/Approved"},{symbol:"⚠️",meaning:"Warning/Alert"},{symbol:"🔐",meaning:"Encryption"},{symbol:"🌐",meaning:"Internet/Online"}],[]),C=c.useCallback(()=>{const t=[];r.forEach((n,a)=>{t.push({id:`symbol-${a}`,content:n.symbol,type:"symbol",pairId:`pair-${a}`,isFlipped:!1,isMatched:!1}),t.push({id:`meaning-${a}`,content:n.meaning,type:"meaning",pairId:`pair-${a}`,isFlipped:!1,isMatched:!1})});const e=t.sort(()=>Math.random()-.5);g(e),j([]),F(!1),M(0),N(0)},[r]),D=()=>{const t=document.createElement("canvas"),e=t.getContext("2d");if(!e)return;t.width=600,t.height=500,e.fillStyle="#F8F9FA",e.fillRect(0,0,t.width,t.height),e.fillStyle="#2C3E50",e.font="bold 24px Arial",e.textAlign="center",e.fillText("Privacy Symbol Matching",t.width/2,40),e.font="16px Arial",e.fillStyle="#6C757D",e.fillText("Match symbols with their meanings!",t.width/2,70);const n=80,a=60,s=20,o=(t.width-(4*n+3*s))/2,Y=120;l.forEach((d,A)=>{const $=Math.floor(A/4),I=A%4,x=o+I*(n+s),b=Y+$*(a+s);if(e.fillStyle=d.isMatched?"#4CAF50":"#FFFFFF",e.fillRect(x,b,n,a),e.strokeStyle=d.isMatched?"#4CAF50":"#DDD",e.lineWidth=2,e.strokeRect(x,b,n,a),e.fillStyle=d.isMatched?"#FFFFFF":"#2C3E50",e.font=d.type==="symbol"?"24px Arial":"12px Arial",e.textAlign="center",d.type==="symbol")e.fillText(d.content,x+n/2,b+a/2+8);else{const L=d.content.split(" "),u=[];let p="";for(const y of L){const v=p+(p?" ":"")+y;e.measureText(v).width>n-10?(u.push(p),p=y):p=v}u.push(p),u.forEach((y,v)=>{e.fillText(y,x+n/2,b+a/2+(v-u.length/2)*12)})}}),e.fillStyle="#2C3E50",e.font="bold 16px Arial",e.textAlign="left",e.fillText(`Moves: ${h}`,50,450),e.fillText(`Matches: ${f}/${r.length}`,50,470);const w=document.createElement("a");w.download="privacy-symbol-matching.png",w.href=t.toDataURL(),w.click()},T=t=>{m.length>=2||l.find(e=>e.id===t)?.isFlipped||l.find(e=>e.id===t)?.isMatched||(g(e=>e.map(n=>n.id===t?{...n,isFlipped:!0}:n)),j(e=>[...e,t]))},E=c.useCallback(()=>{const[t,e]=m,n=l.find(s=>s.id===t),a=l.find(s=>s.id===e);n&&a&&n.pairId===a.pairId?(g(s=>s.map(o=>o.id===t||o.id===e?{...o,isMatched:!0}:o)),N(s=>s+1),f+1===r.length&&setTimeout(()=>{F(!0);const s=r.length*2,o=Math.max(0,Math.round((s-h)/s*100));k(o)},500)):setTimeout(()=>{g(s=>s.map(o=>o.id===t||o.id===e?{...o,isFlipped:!1}:o))},1e3),j([]),M(s=>s+1)},[m,l,f,k,r.length,h]);c.useEffect(()=>{C()},[C]),c.useEffect(()=>{m.length===2&&E()},[m,E]);const P=t=>t.isFlipped||t.isMatched?t.content:"?",R=t=>{let e="matching-card";return(t.isFlipped||t.isMatched)&&(e+=" flipped"),t.isMatched&&(e+=" matched"),t.type==="symbol"&&(e+=" symbol-card"),t.type==="meaning"&&(e+=" meaning-card"),e};return i.jsxs("div",{className:"matching-activity",children:[i.jsxs("div",{className:"activity-header",children:[i.jsx("h2",{className:"activity-title",children:"Privacy Symbol Matching"}),i.jsx("button",{onClick:z,className:"close-button",children:"×"})]}),i.jsxs("div",{className:"activity-content",children:[i.jsxs("div",{className:"instructions",children:[i.jsx("p",{children:"Match each privacy symbol with its correct meaning! Click on cards to flip them."}),i.jsxs("div",{className:"stats",children:[i.jsxs("div",{className:"stat",children:[i.jsx("span",{className:"stat-label",children:"Moves:"}),i.jsx("span",{className:"stat-value",children:h})]}),i.jsxs("div",{className:"stat",children:[i.jsx("span",{className:"stat-label",children:"Matches:"}),i.jsxs("span",{className:"stat-value",children:[f," / ",r.length]})]})]})]}),i.jsx("div",{className:"game-container",children:i.jsx("div",{className:"matching-grid",children:l.map(t=>i.jsxs("div",{className:R(t),onClick:()=>T(t.id),children:[i.jsx("div",{className:"card-content",children:P(t)}),i.jsx("div",{className:"card-back",children:i.jsx(W,{size:24})})]},t.id))})}),i.jsxs("div",{className:"controls",children:[i.jsxs("button",{onClick:C,className:"control-button",children:[i.jsx(G,{size:16}),"New Game"]}),i.jsxs("button",{onClick:D,className:"control-button",children:[i.jsx(B,{size:16}),"Download"]})]}),S&&i.jsx("div",{className:"completion-overlay",children:i.jsxs("div",{className:"completion-message",children:[i.jsx(H,{size:48,className:"success-icon"}),i.jsx("h3",{children:"Perfect Matching!"}),i.jsx("p",{children:"You've successfully matched all privacy symbols with their meanings!"}),i.jsxs("p",{children:["You completed the game in ",h," moves. Great job!"]})]})})]}),i.jsx("style",{jsx:!0,children:`
        .matching-activity {
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
        }

        .stat {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .stat-label {
          font-size: 14px;
          color: #666;
          margin-bottom: 5px;
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

        .matching-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 15px;
          max-width: 600px;
          width: 100%;
        }

        .matching-card {
          aspect-ratio: 1;
          position: relative;
          cursor: pointer;
          transform-style: preserve-3d;
          transition: transform 0.6s;
        }

        .matching-card.flipped {
          transform: rotateY(180deg);
        }

        .matching-card.matched {
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

        .matching-card:hover .card-back {
          transform: rotateY(180deg) scale(1.05);
        }

        .matching-card:hover .card-content {
          transform: scale(1.05);
        }

        .matching-card.matched .card-content {
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

        @media (max-width: 768px) {
          .matching-grid {
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
        }
      `})]})};export{te as default};
//# sourceMappingURL=MatchingActivity-BavQc6ZF.js.map
