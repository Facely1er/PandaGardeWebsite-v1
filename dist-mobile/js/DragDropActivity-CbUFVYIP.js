import{r as l,j as n,$ as F,D as T,C as j}from"./react-vendor-BOZo0wfU.js";import"./vendor-DnBAyVVL.js";import"./app-screens-_0EESrUG.js";import"./components-family-hub-B5GlOXg3.js";import"./state-management-y1LSxOsg.js";import"./encryption-utilities-BBPZ7UWB.js";import"./monitoring-utilities-Bq33XAMw.js";import"./context-family-progress-BlwI39UW.js";import"./utilities-BXq9NOS6.js";import"./pages-family-hub-CPFnR9UC.js";const L=({onComplete:k,onClose:S})=>{const[d,f]=l.useState([]),[p,m]=l.useState(null),[E,u]=l.useState(!1),[y,b]=l.useState(0),x=l.useRef(null),v=l.useMemo(()=>[{id:"1",text:"My full name",category:"private"},{id:"2",text:"My favorite color",category:"safe"},{id:"3",text:"My home address",category:"private"},{id:"4",text:"My pet's name",category:"safe"},{id:"5",text:"My phone number",category:"private"},{id:"6",text:"My favorite food",category:"safe"},{id:"7",text:"My school name",category:"private"},{id:"8",text:"My favorite game",category:"safe"},{id:"9",text:"My social security number",category:"private"},{id:"10",text:"My favorite movie",category:"safe"},{id:"11",text:"My password",category:"private"},{id:"12",text:"My favorite book",category:"safe"}],[]),h=l.useCallback(()=>{const o=v.map((t,e)=>({...t,x:50+e%4*120,y:100+Math.floor(e/4)*80,isDragging:!1}));f(o),u(!1),b(0)},[v]);l.useEffect(()=>{h()},[h]);const M=o=>{const t=x.current?.getBoundingClientRect();if(!t)return{x:0,y:0};if("touches"in o){const e=o.touches[0];return{x:e.clientX-t.left-50,y:e.clientY-t.top-25}}else return{x:o.clientX-t.left-50,y:o.clientY-t.top-25}},w=(o,t)=>{o.preventDefault(),m({...t,isDragging:!0})},C=o=>{if(!p)return;const t=x.current?.getBoundingClientRect();if(!t)return;const{x:e,y:a}=M(o);f(i=>i.map(r=>r.id===p.id?{...r,x:Math.max(0,Math.min(e,t.width-100)),y:Math.max(0,Math.min(a,t.height-50))}:r))},g=()=>{p&&(f(o=>o.map(t=>t.id===p.id?{...t,isDragging:!1}:t)),m(null),z())},z=()=>{const o={x:50,y:300,width:200,height:100},t={x:350,y:300,width:200,height:100};let e=0;const a=d.length;d.forEach(r=>{const s=r.x+50,c=r.y+25;r.category==="safe"?s>=o.x&&s<=o.x+o.width&&c>=o.y&&c<=o.y+o.height&&e++:r.category==="private"&&s>=t.x&&s<=t.x+t.width&&c>=t.y&&c<=t.y+t.height&&e++});const i=Math.round(e/a*100);if(b(i),e===a)u(!0),k(i),setTimeout(()=>{const r=document.createElement("div");r.textContent="🎉✅🛡️",r.style.cssText=`
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 48px;
          z-index: 10000;
          pointer-events: none;
          animation: celebrate 2s ease-out forwards;
        `;const s=document.createElement("style");s.textContent=`
          @keyframes celebrate {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(1) translateY(-100px); }
          }
        `,document.head.appendChild(s),document.body.appendChild(r),setTimeout(()=>{document.body.removeChild(r),document.head.removeChild(s)},2e3)},100);else{const r=e>0?`Great progress! You've correctly placed ${e} out of ${a} items. Keep going!`:"Try placing the items in the correct zones. Remember: Green = Safe to Share, Red = Keep Private!",s=document.createElement("div");s.textContent=r,s.style.cssText=`
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 25px;
        font-size: 16px;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideDown 3s ease-out forwards;
      `;const c=document.createElement("style");c.textContent=`
        @keyframes slideDown {
          0% { opacity: 0; transform: translateX(-50%) translateY(-50px); }
          20% { opacity: 1; transform: translateX(-50%) translateY(0); }
          80% { opacity: 1; transform: translateX(-50%) translateY(0); }
          100% { opacity: 0; transform: translateX(-50%) translateY(-50px); }
        }
      `,document.head.appendChild(c),document.body.appendChild(s),setTimeout(()=>{document.body.removeChild(s),document.head.removeChild(c)},3e3)}},D=()=>{if(!x.current)return;const t=document.createElement("canvas"),e=t.getContext("2d");if(!e)return;t.width=600,t.height=500,e.fillStyle="#F8F9FA",e.fillRect(0,0,t.width,t.height),e.fillStyle="#2C3E50",e.font="bold 24px Arial",e.textAlign="center",e.fillText("Information Sorting Game",t.width/2,40),e.font="16px Arial",e.fillStyle="#6C757D",e.fillText("Safe to Share vs Keep Private",t.width/2,70),e.fillStyle="#28A745",e.fillRect(50,300,200,80),e.fillStyle="white",e.font="bold 18px Arial",e.fillText("Safe to Share",150,345),e.fillStyle="#DC3545",e.fillRect(350,300,200,80),e.fillStyle="white",e.fillText("Keep Private",450,345),e.fillStyle="#2C3E50",e.font="14px Arial",d.forEach(i=>{e.fillStyle=i.category==="safe"?"#28A745":"#DC3545",e.fillRect(i.x-40,i.y-15,80,30),e.fillStyle="white",e.textAlign="center",e.fillText(i.text,i.x,i.y+5)});const a=document.createElement("a");a.download="privacy-sorting-game.png",a.href=t.toDataURL(),a.click()},A=o=>({left:`${o.x}px`,top:`${o.y}px`,zIndex:o.isDragging?1e3:1,transform:o.isDragging?"scale(1.1)":"scale(1)",boxShadow:o.isDragging?"0 8px 25px rgba(0,0,0,0.3)":"0 2px 8px rgba(0,0,0,0.1)"}),N=o=>{const t={x:50,y:300,width:200,height:100},e={x:350,y:300,width:200,height:100},a=o.x+50,i=o.y+25;let r=!1;return o.category==="safe"?r=a>=t.x&&a<=t.x+t.width&&i>=t.y&&i<=t.y+t.height:o.category==="private"&&(r=a>=e.x&&a<=e.x+e.width&&i>=e.y&&i<=e.y+e.height),`drag-item ${o.category} ${r?"correct":""}`};return n.jsxs("div",{className:"drag-drop-activity",children:[n.jsxs("div",{className:"activity-header",children:[n.jsx("h2",{className:"activity-title",children:"Information Sorting Game"}),n.jsx("button",{onClick:S,className:"close-button",children:"×"})]}),n.jsxs("div",{className:"activity-content",children:[n.jsxs("div",{className:"instructions",children:[n.jsxs("p",{children:["Drag each item to the correct category: ",n.jsx("strong",{children:"Safe to Share"})," or ",n.jsx("strong",{children:"Keep Private"})]}),n.jsxs("div",{className:"score",children:["Score: ",y,"%"]})]}),n.jsxs("div",{ref:x,className:"game-container",onMouseMove:C,onMouseUp:g,onMouseLeave:g,onTouchMove:C,onTouchEnd:g,style:{touchAction:"none"},children:[n.jsxs("div",{className:"drop-zone safe-zone",children:[n.jsx("h3",{children:"Safe to Share"}),n.jsx("p",{children:"Things you can tell friends"})]}),n.jsxs("div",{className:"drop-zone private-zone",children:[n.jsx("h3",{children:"Keep Private"}),n.jsx("p",{children:"Personal information to protect"})]}),d.map(o=>n.jsx("div",{className:N(o),style:A(o),onMouseDown:t=>w(t,o),onTouchStart:t=>w(t,o),children:o.text},o.id))]}),n.jsxs("div",{className:"controls",children:[n.jsxs("button",{onClick:h,className:"control-button",children:[n.jsx(F,{size:16}),"Shuffle"]}),n.jsxs("button",{onClick:D,className:"control-button",children:[n.jsx(T,{size:16}),"Download"]}),n.jsxs("button",{onClick:z,className:"control-button primary",children:[n.jsx(j,{size:16}),"Check Answer"]})]}),E&&n.jsx("div",{className:"completion-overlay",children:n.jsxs("div",{className:"completion-message",children:[n.jsx(j,{size:48,className:"success-icon"}),n.jsx("h3",{children:"Excellent Work!"}),n.jsxs("p",{children:["You've correctly sorted all the information! You scored ",y,"%"]}),n.jsx("p",{children:"You now know what information is safe to share and what to keep private."})]})})]}),n.jsx("style",{jsx:!0,children:`
        .drag-drop-activity {
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
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .instructions p {
          margin: 0;
          color: #2C3E50;
          font-size: 16px;
        }

        .score {
          font-size: 18px;
          font-weight: bold;
          color: #4CAF50;
        }

        .game-container {
          flex: 1;
          position: relative;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          overflow: hidden;
        }

        .drop-zone {
          position: absolute;
          width: 200px;
          height: 100px;
          border: 3px dashed #ccc;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          background: rgba(255, 255, 255, 0.8);
          transition: all 0.3s ease;
        }

        .safe-zone {
          top: 300px;
          left: 50px;
          border-color: #4CAF50;
          background: rgba(76, 175, 80, 0.1);
        }

        .private-zone {
          top: 300px;
          right: 50px;
          border-color: #f44336;
          background: rgba(244, 67, 54, 0.1);
        }

        .drop-zone h3 {
          margin: 0 0 5px 0;
          font-size: 16px;
          color: #2C3E50;
        }

        .drop-zone p {
          margin: 0;
          font-size: 12px;
          color: #666;
        }

        .drag-item {
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
        }

        .drag-item:hover {
          transform: scale(1.05);
        }

        .drag-item:active {
          cursor: grabbing;
        }

        .drag-item.safe {
          border-color: #4CAF50;
          background: #E8F5E8;
        }

        .drag-item.private {
          border-color: #f44336;
          background: #FFEBEE;
        }

        .drag-item.correct {
          border-color: #4CAF50;
          background: #C8E6C9;
          box-shadow: 0 0 0 2px #4CAF50;
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

        .control-button.primary {
          background: #4CAF50;
          color: white;
          border-color: #4CAF50;
        }

        .control-button.primary:hover {
          background: #45a049;
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
          .game-container {
            padding: 15px;
            min-height: 400px;
          }

          .drop-zone {
            width: 140px;
            height: 70px;
            font-size: 12px;
          }

          .safe-zone {
            left: 15px;
            top: 250px;
          }

          .private-zone {
            right: 15px;
            top: 250px;
          }

          .drag-item {
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

          .score {
            font-size: 16px;
          }
        }

        @media (max-width: 480px) {
          .game-container {
            padding: 10px;
            min-height: 350px;
          }

          .drop-zone {
            width: 120px;
            height: 60px;
            font-size: 11px;
          }

          .safe-zone {
            left: 10px;
            top: 200px;
          }

          .private-zone {
            right: 10px;
            top: 200px;
          }

          .drag-item {
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
      `})]})};export{L as default};
//# sourceMappingURL=DragDropActivity-CbUFVYIP.js.map
