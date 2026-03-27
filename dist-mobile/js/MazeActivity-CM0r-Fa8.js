import{r as i,j as e,C as D,a0 as E,c as R,a1 as F,a2 as $,R as I,D as L}from"./react-vendor-BOZo0wfU.js";import"./vendor-DnBAyVVL.js";import"./app-screens-_0EESrUG.js";import"./components-family-hub-B5GlOXg3.js";import"./state-management-y1LSxOsg.js";import"./encryption-utilities-BBPZ7UWB.js";import"./monitoring-utilities-Bq33XAMw.js";import"./context-family-progress-BlwI39UW.js";import"./utilities-BXq9NOS6.js";import"./pages-family-hub-CPFnR9UC.js";const O=({onComplete:k,onClose:S})=>{const g=i.useRef(null),[s,f]=i.useState({x:1,y:1}),[l,b]=i.useState(!1),[d,z]=i.useState([]),[n]=i.useState({width:15,height:15}),[p,w]=i.useState(0),[v,M]=i.useState(null),y=i.useCallback(()=>{const a=Array(n.height).fill(null).map(()=>Array(n.width).fill(1));for(let t=1;t<n.height-1;t+=2)for(let o=1;o<n.width-1;o+=2)a[t][o]=0,o+1<n.width-1&&(a[t][o+1]=0),t+1<n.height-1&&(a[t+1][o]=0);for(let t=0;t<20;t++){const o=Math.floor(Math.random()*(n.width-2))+1,r=Math.floor(Math.random()*(n.height-2))+1;a[r][o]===0&&(a[r][o]=1)}return a[1][1]=2,a[n.height-2][n.width-2]=3,a},[n]),C=i.useCallback(()=>{const a=g.current;if(!a)return;const t=a.getContext("2d");if(!t)return;const o=30;a.width=n.width*o,a.height=n.height*o,t.clearRect(0,0,a.width,a.height);for(let h=0;h<n.height;h++)for(let x=0;x<n.width;x++){const u=x*o,N=h*o;switch(d[h][x]){case 0:t.fillStyle="#f8f9fa";break;case 1:t.fillStyle="#2C3E50";break;case 2:t.fillStyle="#4CAF50";break;case 3:t.fillStyle="#FF6B6B";break}t.fillRect(u,N,o,o),t.strokeRect(u,N,o,o)}const r=s.x*o+o/2,m=s.y*o+o/2;t.fillStyle="#FFD700",t.beginPath(),t.arc(r,m,o/3,0,2*Math.PI),t.fill(),t.fillStyle="#2C3E50",t.beginPath(),t.arc(r-5,m-3,2,0,2*Math.PI),t.fill(),t.beginPath(),t.arc(r+5,m-3,2,0,2*Math.PI),t.fill()},[d,s,n]);i.useEffect(()=>{const a=y();z(a),f({x:1,y:1}),b(!1),w(0),M(new Date)},[y]),i.useEffect(()=>{d.length!==0&&C()},[d,s,C]);const c=i.useCallback(a=>{if(l)return;let t=s.x,o=s.y;switch(a){case"up":o=Math.max(0,s.y-1);break;case"down":o=Math.min(n.height-1,s.y+1);break;case"left":t=Math.max(0,s.x-1);break;case"right":t=Math.min(n.width-1,s.x+1);break}if(d[o]&&d[o][t]!==1&&(f({x:t,y:o}),w(r=>r+1),d[o][t]===3)){b(!0);const r=v?Math.round((Date.now()-v.getTime())/1e3):0,m=n.width*n.height,h=Math.max(0,Math.round((m-p)/m*100)),x=Math.max(0,Math.round((300-r)/300*50)),u=Math.min(100,h+x);k(u)}},[s,d,l,k,n,p,v]),P=()=>{const a=y();z(a),f({x:1,y:1}),b(!1),w(0),M(new Date)},A=()=>{const a=g.current;if(!a)return;const t=document.createElement("a");t.download="privacy-maze-game.png",t.href=a.toDataURL(),t.click()},j=i.useCallback(a=>{switch(a.key){case"ArrowUp":case"w":case"W":a.preventDefault(),c("up");break;case"ArrowDown":case"s":case"S":a.preventDefault(),c("down");break;case"ArrowLeft":case"a":case"A":a.preventDefault(),c("left");break;case"ArrowRight":case"d":case"D":a.preventDefault(),c("right");break}},[c]);return i.useEffect(()=>(window.addEventListener("keydown",j),()=>window.removeEventListener("keydown",j)),[j]),e.jsxs("div",{className:"maze-activity",children:[e.jsxs("div",{className:"activity-header",children:[e.jsx("h2",{className:"activity-title",children:"Safe Online Journey Maze"}),e.jsx("button",{onClick:S,className:"close-button",children:"×"})]}),e.jsxs("div",{className:"activity-content",children:[e.jsxs("div",{className:"instructions",children:[e.jsx("p",{children:"Help Privacy Panda navigate through the digital world safely! Use arrow keys or buttons to move."}),e.jsxs("div",{className:"legend",role:"list","aria-label":"Maze legend",children:[e.jsxs("div",{className:"legend-item",role:"listitem",children:[e.jsx("div",{className:"legend-color start","aria-hidden":"true"}),e.jsx("span",{children:"Start - Green (Safe Zone)"})]}),e.jsxs("div",{className:"legend-item",role:"listitem",children:[e.jsx("div",{className:"legend-color end","aria-hidden":"true"}),e.jsx("span",{children:"End - Red (Privacy Goal)"})]}),e.jsxs("div",{className:"legend-item",role:"listitem",children:[e.jsx("div",{className:"legend-color wall","aria-hidden":"true"}),e.jsx("span",{children:"Walls - Dark (Avoid)"})]}),e.jsxs("div",{className:"legend-item",role:"listitem",children:[e.jsx("div",{className:"legend-color path","aria-hidden":"true"}),e.jsx("span",{children:"Path - Light Gray (Safe to walk)"})]})]})]}),e.jsxs("div",{className:"maze-container",children:[e.jsx("canvas",{ref:g,className:"maze-canvas",role:"img","aria-label":`Privacy Panda maze game. Navigate from the green start zone to the red goal. Current position: row ${s.y+1}, column ${s.x+1}. Moves made: ${p}. ${l?"Maze completed!":"Use arrow keys or WASD to move."}`,tabIndex:0}),e.jsx("div",{role:"status","aria-live":"polite",className:"sr-only",children:l?"Congratulations! You completed the maze!":`Current position: row ${s.y+1}, column ${s.x+1}. Moves: ${p}`}),l&&e.jsx("div",{className:"completion-overlay",children:e.jsxs("div",{className:"completion-message",children:[e.jsx(D,{size:48,className:"success-icon"}),e.jsx("h3",{children:"Congratulations!"}),e.jsx("p",{children:"You've successfully navigated Privacy Panda to safety!"}),e.jsx("p",{children:"You've learned how to avoid digital dangers and protect your privacy."})]})})]}),e.jsxs("div",{className:"controls",children:[e.jsxs("div",{className:"movement-controls",children:[e.jsx("button",{onClick:()=>c("up"),className:"control-button movement",disabled:l,children:e.jsx(E,{size:20})}),e.jsxs("div",{className:"horizontal-controls",children:[e.jsx("button",{onClick:()=>c("left"),className:"control-button movement",disabled:l,children:e.jsx(R,{size:20})}),e.jsx("button",{onClick:()=>c("right"),className:"control-button movement",disabled:l,children:e.jsx(F,{size:20})})]}),e.jsx("button",{onClick:()=>c("down"),className:"control-button movement",disabled:l,children:e.jsx($,{size:20})})]}),e.jsxs("button",{onClick:P,className:"control-button",children:[e.jsx(I,{size:16}),"Reset Maze"]}),e.jsxs("button",{onClick:A,className:"control-button",children:[e.jsx(L,{size:16}),"Download"]})]})]}),e.jsx("style",{jsx:!0,children:`
        .maze-activity {
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

        .legend {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #666;
        }

        .legend-color {
          width: 20px;
          height: 20px;
          border-radius: 4px;
          border: 1px solid #ccc;
        }

        .legend-color.start {
          background: #4CAF50;
        }

        .legend-color.end {
          background: #FF6B6B;
        }

        .legend-color.wall {
          background: #2C3E50;
        }

        .legend-color.path {
          background: #f8f9fa;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        .maze-container {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          position: relative;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }

        .maze-canvas {
          border: 2px solid #ddd;
          border-radius: 8px;
          background: white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
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

        .controls {
          padding: 20px;
          background: #f8f9fa;
          border-top: 1px solid #e0e0e0;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
        }

        .movement-controls {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
        }

        .horizontal-controls {
          display: flex;
          gap: 5px;
        }

        .control-button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
          border: 1px solid #ddd;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 14px;
          font-weight: 500;
          min-width: 50px;
          min-height: 50px;
        }

        .control-button:hover:not(:disabled) {
          background: #f0f0f0;
        }

        .control-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .control-button.movement {
          background: #4CAF50;
          color: white;
          border-color: #4CAF50;
        }

        .control-button.movement:hover:not(:disabled) {
          background: #45a049;
        }

        @media (max-width: 768px) {
          .maze-container {
            padding: 10px;
          }

          .maze-canvas {
            max-width: 100%;
            height: auto;
          }

          .controls {
            flex-direction: column;
            gap: 15px;
          }

          .legend {
            flex-direction: column;
            gap: 10px;
          }
        }
      `})]})};export{O as default};
//# sourceMappingURL=MazeActivity-CM0r-Fa8.js.map
