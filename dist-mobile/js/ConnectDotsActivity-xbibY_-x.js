import{r as l,j as n,C as P,R as z,D as T}from"./react-vendor-BOZo0wfU.js";import"./vendor-DnBAyVVL.js";import"./app-screens-_0EESrUG.js";import"./components-family-hub-B5GlOXg3.js";import"./state-management-y1LSxOsg.js";import"./encryption-utilities-BBPZ7UWB.js";import"./monitoring-utilities-Bq33XAMw.js";import"./context-family-progress-BlwI39UW.js";import"./utilities-BXq9NOS6.js";import"./pages-family-hub-CPFnR9UC.js";const G=({onComplete:C,onClose:w})=>{const x=l.useRef(null),[a,j]=l.useState([]),[s,p]=l.useState([]),[d,h]=l.useState(!1),[u,f]=l.useState(null),[k,m]=l.useState(0),[g,S]=l.useState(null),y=()=>{j([{id:1,x:300,y:100,connected:!1},{id:2,x:250,y:150,connected:!1},{id:3,x:200,y:200,connected:!1},{id:4,x:200,y:250,connected:!1},{id:5,x:200,y:300,connected:!1},{id:6,x:200,y:350,connected:!1},{id:7,x:250,y:400,connected:!1},{id:8,x:300,y:420,connected:!1},{id:9,x:350,y:400,connected:!1},{id:10,x:400,y:350,connected:!1},{id:11,x:400,y:300,connected:!1},{id:12,x:400,y:250,connected:!1},{id:13,x:400,y:200,connected:!1},{id:14,x:350,y:150,connected:!1},{id:15,x:300,y:100,connected:!1}]),p([]),h(!1),f(null),m(0),S(new Date)},b=l.useCallback(()=>{const t=x.current;if(!t)return;const e=t.getContext("2d");if(e){t.width=600,t.height=500,e.clearRect(0,0,t.width,t.height),e.fillStyle="#f8f9fa",e.fillRect(0,0,t.width,t.height),e.fillStyle="#2C3E50",e.font="bold 24px Arial",e.textAlign="center",e.fillText("Privacy Shield Connect the Dots",300,40),e.font="16px Arial",e.fillStyle="#666",e.fillText("Connect the dots in order to reveal Privacy Panda's protection shield!",300,70),e.strokeStyle="#4CAF50",e.lineWidth=3,e.beginPath();for(let o=0;o<s.length-1;o++){const i=a.find(r=>r.id===s[o]),c=a.find(r=>r.id===s[o+1]);i&&c&&(o===0&&e.moveTo(i.x,i.y),e.lineTo(c.x,c.y))}e.stroke(),a.forEach(o=>{const i=s.includes(o.id),c=u===o.id;e.beginPath(),e.arc(o.x,o.y,i?12:8,0,2*Math.PI),e.fillStyle=i?"#4CAF50":c?"#FFD700":"#2C3E50",e.fill(),e.strokeStyle=i?"#2E7D32":"#2C3E50",e.lineWidth=2,e.stroke(),e.fillStyle="white",e.font="bold 12px Arial",e.textAlign="center",e.textBaseline="middle",e.fillText(o.id.toString(),o.x,o.y)}),d&&(e.fillStyle="rgba(0, 0, 0, 0.8)",e.fillRect(0,0,t.width,t.height),e.fillStyle="#4CAF50",e.font="bold 32px Arial",e.textAlign="center",e.fillText("Shield Complete!",300,200),e.fillStyle="white",e.font="18px Arial",e.fillText("Privacy Panda's protection shield is now active!",300,240))}},[a,s,u,d]);l.useEffect(()=>{y()},[]),l.useEffect(()=>{b()},[b]);const D=t=>{if(d||!a.find(i=>i.id===t))return;m(i=>i+1);const o=s.length===0?1:s[s.length-1]+1;t===o||s.length===0&&t===1?(p(i=>[...i,t]),f(t),s.length+1===a.length-1&&setTimeout(()=>{h(!0);const i=g?Math.round((Date.now()-g.getTime())/1e3):0,c=a.length-1,r=Math.round(c/k*100),v=Math.max(0,Math.round((60-i)/60*30)),E=Math.min(100,Math.max(0,r+v));C(E)},500)):(f(t),setTimeout(()=>f(null),200))},N=()=>{y()},A=()=>{const t=x.current;if(!t)return;const e=document.createElement("a");e.download="privacy-shield-connect-dots.png",e.href=t.toDataURL(),e.click()};return n.jsxs("div",{className:"connect-dots-activity",children:[n.jsxs("div",{className:"activity-header",children:[n.jsx("h2",{className:"activity-title",children:"Privacy Shield Connect the Dots"}),n.jsx("button",{onClick:w,className:"close-button",children:"×"})]}),n.jsxs("div",{className:"activity-content",children:[n.jsxs("div",{className:"instructions",children:[n.jsx("p",{children:"Connect the dots in numerical order to reveal Privacy Panda's protection shield!"}),n.jsxs("div",{className:"progress",children:["Connected: ",s.length," / ",a.length-1," dots"]})]}),n.jsxs("div",{className:"canvas-container",children:[n.jsx("canvas",{ref:x,className:"connect-dots-canvas",onClick:t=>{if(d)return;const e=x.current?.getBoundingClientRect();if(!e)return;const o=t.clientX-e.left,i=t.clientY-e.top,c=a.find(r=>Math.sqrt((o-r.x)**2+(i-r.y)**2)<=15);c&&D(c.id)}}),d&&n.jsx("div",{className:"completion-overlay",children:n.jsxs("div",{className:"completion-message",children:[n.jsx(P,{size:48,className:"success-icon"}),n.jsx("h3",{children:"Shield Complete!"}),n.jsx("p",{children:"You've successfully connected all the dots!"}),n.jsx("p",{children:"Privacy Panda's protection shield is now active and ready to guard your digital privacy!"})]})})]}),n.jsxs("div",{className:"controls",children:[n.jsxs("button",{onClick:N,className:"control-button",children:[n.jsx(z,{size:16}),"Reset"]}),n.jsxs("button",{onClick:A,className:"control-button",children:[n.jsx(T,{size:16}),"Download"]})]})]}),n.jsx("style",{jsx:!0,children:`
        .connect-dots-activity {
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

        .progress {
          font-size: 16px;
          font-weight: bold;
          color: #4CAF50;
        }

        .canvas-container {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          position: relative;
        }

        .connect-dots-canvas {
          border: 2px solid #ddd;
          border-radius: 8px;
          background: white;
          cursor: crosshair;
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

        @media (max-width: 768px) {
          .canvas-container {
            padding: 10px;
          }

          .connect-dots-canvas {
            max-width: 100%;
            height: auto;
          }

          .controls {
            flex-direction: column;
            align-items: center;
          }
        }
      `})]})};export{G as default};
//# sourceMappingURL=ConnectDotsActivity-xbibY_-x.js.map
