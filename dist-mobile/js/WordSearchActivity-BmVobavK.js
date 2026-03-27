import{r as h,j as r,R as P,D as I,C as O}from"./react-vendor-BOZo0wfU.js";import"./vendor-DnBAyVVL.js";import"./app-screens-_0EESrUG.js";import"./components-family-hub-B5GlOXg3.js";import"./state-management-y1LSxOsg.js";import"./encryption-utilities-BBPZ7UWB.js";import"./monitoring-utilities-Bq33XAMw.js";import"./context-family-progress-BlwI39UW.js";import"./utilities-BXq9NOS6.js";import"./pages-family-hub-CPFnR9UC.js";const J=({onComplete:A,onClose:E})=>{const[b,z]=h.useState([]),[x,j]=h.useState([]),[w,m]=h.useState([]),[v,k]=h.useState(!1),[y,S]=h.useState(0),N=h.useRef(null),p=12,C=h.useCallback(()=>{const s=["PRIVACY","PASSWORD","SECURE","SAFE","PROTECT","ONLINE","DIGITAL","DATA","INFORMATION","SECURITY"],o=Array(p).fill(null).map(()=>Array(p).fill("")),t=s.map(e=>({text:e,found:!1,positions:[]}));t.forEach(e=>{let n=!1,a=0;for(;!n&&a<100;){const d=Math.floor(Math.random()*8),l=Math.floor(Math.random()*p),c=Math.floor(Math.random()*p);W(o,e.text,l,c,d)&&(F(o,e.text,l,c,d,e),n=!0),a++}});for(let e=0;e<p;e++)for(let n=0;n<p;n++)o[e][n]===""&&(o[e][n]=String.fromCharCode(65+Math.floor(Math.random()*26)));z(o),j(t),m([]),k(!1),S(0)},[p]);h.useEffect(()=>{C()},[C]);const R=()=>{if(!N.current)return;const o=document.createElement("canvas"),t=o.getContext("2d");if(!t)return;o.width=600,o.height=500,t.fillStyle="#F8F9FA",t.fillRect(0,0,o.width,o.height),t.fillStyle="#2C3E50",t.font="bold 24px Arial",t.textAlign="center",t.fillText("Privacy Word Search",o.width/2,40),t.font="16px Arial",t.fillStyle="#6C757D",t.fillText("Find all the privacy-related words!",o.width/2,70);const e=25,n=(o.width-p*e)/2,a=100;for(let l=0;l<p;l++)for(let c=0;c<p;c++){const f=n+c*e,i=a+l*e;t.strokeStyle="#ddd",t.strokeRect(f,i,e,e),t.fillStyle="#2C3E50",t.font="16px Arial",t.textAlign="center",t.fillText(b[l][c],f+e/2,i+e/2+5)}t.fillStyle="#2C3E50",t.font="bold 18px Arial",t.textAlign="left",t.fillText("Words to Find:",50,450),t.font="14px Arial",x.forEach((l,c)=>{const f=50+c%3*150,i=470+Math.floor(c/3)*20;t.fillStyle=l.found?"#4CAF50":"#6C757D",t.fillText(l.text,f,i)});const d=document.createElement("a");d.download="privacy-word-search.png",d.href=o.toDataURL(),d.click()},W=(s,o,t,e,n)=>{const a=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]],[d,l]=a[n],c=t+(o.length-1)*d,f=e+(o.length-1)*l;if(c<0||c>=p||f<0||f>=p)return!1;for(let i=0;i<o.length;i++){const u=t+i*d,g=e+i*l;if(s[u][g]!==""&&s[u][g]!==o[i])return!1}return!0},F=(s,o,t,e,n,a)=>{const d=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]],[l,c]=d[n],f=[];for(let i=0;i<o.length;i++){const u=t+i*l,g=e+i*c;s[u][g]=o[i],f.push({row:u,col:g})}a.positions=f},M=(s,o)=>{if(!v)if(w.length===0)m([{row:s,col:o}]);else{const t=[...w,{row:s,col:o}];m(t),T(t)}},T=s=>{if(s.length<3)return;const o=s.sort((e,n)=>e.row!==n.row?e.row-n.row:e.col-n.col).map(e=>b[e.row][e.col]).join(""),t=x.find(e=>!e.found&&(e.text===o||e.text===o.split("").reverse().join("")));if(t){const e=x.map(n=>n.text===t.text?{...n,found:!0}:n);if(j(e),S(n=>n+1),y+1===x.length){k(!0);const n=Math.round((y+1)/x.length*100);A(n)}}m([])},D=(s,o)=>{const t=w.some(a=>a.row===s&&a.col===o),e=x.some(a=>a.found&&a.positions.some(d=>d.row===s&&d.col===o));let n="word-search-cell";return t&&(n+=" selected"),e&&(n+=" found"),n};return r.jsxs("div",{className:"word-search-activity",children:[r.jsxs("div",{className:"activity-header",children:[r.jsx("h2",{className:"activity-title",children:"Privacy Word Search"}),r.jsx("button",{onClick:E,className:"close-button",children:"×"})]}),r.jsxs("div",{className:"activity-content",children:[r.jsxs("div",{className:"instructions",children:[r.jsx("p",{children:"Find all the privacy-related words hidden in the grid! Click on letters to select them."}),r.jsxs("div",{className:"word-list",children:[r.jsx("h3",{children:"Words to Find:"}),r.jsx("div",{className:"words-grid",children:x.map((s,o)=>r.jsx("span",{className:`word-item ${s.found?"found":""}`,children:s.text},o))})]}),r.jsxs("div",{className:"progress",children:["Found: ",y," / ",x.length," words"]})]}),r.jsx("div",{className:"game-container",children:r.jsx("div",{ref:N,className:"word-search-grid",children:b.map((s,o)=>s.map((t,e)=>r.jsx("div",{className:D(o,e),onClick:()=>M(o,e),children:t},`${o}-${e}`)))})}),r.jsxs("div",{className:"controls",children:[r.jsxs("button",{onClick:C,className:"control-button",children:[r.jsx(P,{size:16}),"New Puzzle"]}),r.jsxs("button",{onClick:R,className:"control-button",children:[r.jsx(I,{size:16}),"Download"]}),r.jsx("button",{onClick:()=>{m([])},className:"control-button",children:"Clear Selection"})]}),v&&r.jsx("div",{className:"completion-overlay",children:r.jsxs("div",{className:"completion-message",children:[r.jsx(O,{size:48,className:"success-icon"}),r.jsx("h3",{children:"Excellent Work!"}),r.jsx("p",{children:"You've found all the privacy words!"}),r.jsx("p",{children:"You now know important privacy vocabulary to stay safe online."})]})})]}),r.jsx("style",{jsx:!0,children:`
        .word-search-activity {
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

        .word-list h3 {
          margin: 0 0 10px 0;
          color: #2C3E50;
          font-size: 16px;
        }

        .words-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 8px;
          margin-bottom: 15px;
        }

        .word-item {
          padding: 8px 12px;
          background: #e9ecef;
          border-radius: 6px;
          font-size: 14px;
          font-weight: 500;
          text-align: center;
          transition: all 0.3s ease;
        }

        .word-item.found {
          background: #d4edda;
          color: #155724;
          text-decoration: line-through;
        }

        .progress {
          font-size: 16px;
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

        .word-search-grid {
          display: grid;
          grid-template-columns: repeat(${p}, 1fr);
          gap: 2px;
          background: #2C3E50;
          padding: 10px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .word-search-cell {
          width: 35px;
          height: 35px;
          background: white;
          border: 1px solid #ddd;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s ease;
          user-select: none;
        }

        .word-search-cell:hover {
          background: #f0f0f0;
          transform: scale(1.05);
        }

        .word-search-cell.selected {
          background: #4CAF50;
          color: white;
          transform: scale(1.1);
        }

        .word-search-cell.found {
          background: #d4edda;
          color: #155724;
          border-color: #4CAF50;
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
          .word-search-cell {
            width: 28px;
            height: 28px;
            font-size: 14px;
          }

          .words-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .controls {
            flex-direction: column;
            align-items: center;
          }
        }
      `})]})};export{J as default};
//# sourceMappingURL=WordSearchActivity-BmVobavK.js.map
