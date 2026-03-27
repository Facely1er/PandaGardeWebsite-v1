import{r as d,j as o,R as Y,D as K,C as D}from"./react-vendor-BOZo0wfU.js";import"./vendor-DnBAyVVL.js";import"./app-screens-_0EESrUG.js";import"./components-family-hub-B5GlOXg3.js";import"./state-management-y1LSxOsg.js";import"./encryption-utilities-BBPZ7UWB.js";import"./monitoring-utilities-Bq33XAMw.js";import"./context-family-progress-BlwI39UW.js";import"./utilities-BXq9NOS6.js";import"./pages-family-hub-CPFnR9UC.js";const V=({onComplete:S,onClose:F})=>{const a=d.useRef(null),[M,v]=d.useState(!1),[C,A]=d.useState("#FF6B6B"),[h,N]=d.useState(10),[z,x]=d.useState(!1),I=["#FF6B6B","#4ECDC4","#45B7D1","#96CEB4","#FFEAA7","#DDA0DD","#98D8C8","#F7DC6F","#BB8FCE","#85C1E9","#F8C471","#82E0AA","#F1948A","#85C1E9","#D2B4DE"],k=e=>{e.clearRect(0,0,600,400);const t=e.createLinearGradient(0,0,0,400);t.addColorStop(0,"#E8F5E8"),t.addColorStop(1,"#F8F9FA"),e.fillStyle=t,e.fillRect(0,0,600,400),e.strokeStyle="#4CAF50",e.lineWidth=4,e.strokeRect(10,10,580,380),e.strokeStyle="#2C3E50",e.lineWidth=4,e.beginPath(),e.arc(300,150,90,0,2*Math.PI),e.stroke(),e.beginPath(),e.arc(250,100,35,0,2*Math.PI),e.stroke(),e.beginPath(),e.arc(350,100,35,0,2*Math.PI),e.stroke(),e.fillStyle="#2C3E50",e.beginPath(),e.arc(280,140,10,0,2*Math.PI),e.fill(),e.beginPath(),e.arc(320,140,10,0,2*Math.PI),e.fill(),e.fillStyle="#FFFFFF",e.beginPath(),e.arc(282,138,3,0,2*Math.PI),e.fill(),e.beginPath(),e.arc(322,138,3,0,2*Math.PI),e.fill(),e.fillStyle="#2C3E50",e.beginPath(),e.arc(300,160,6,0,2*Math.PI),e.fill(),e.strokeStyle="#2C3E50",e.lineWidth=3,e.beginPath(),e.arc(300,170,18,0,Math.PI),e.stroke(),e.strokeStyle="#2C3E50",e.lineWidth=4,e.beginPath(),e.arc(300,200,60,0,2*Math.PI),e.stroke(),e.beginPath(),e.arc(250,220,25,0,2*Math.PI),e.stroke(),e.beginPath(),e.arc(350,220,25,0,2*Math.PI),e.stroke(),e.strokeStyle="#2C3E50",e.lineWidth=4,e.beginPath(),e.moveTo(200,250),e.lineTo(200,350),e.lineTo(300,380),e.lineTo(400,350),e.lineTo(400,250),e.lineTo(300,220),e.closePath(),e.stroke(),e.strokeStyle="#2C3E50",e.lineWidth=2,e.beginPath(),e.moveTo(250,250),e.lineTo(250,350),e.moveTo(300,250),e.lineTo(300,350),e.moveTo(350,250),e.lineTo(350,350),e.stroke(),e.strokeStyle="#2C3E50",e.lineWidth=3,e.beginPath(),e.arc(300,300,25,0,2*Math.PI),e.stroke(),e.beginPath(),e.moveTo(275,300),e.lineTo(275,275),e.lineTo(325,275),e.lineTo(325,300),e.stroke(),e.fillStyle="#2C3E50",e.beginPath(),e.arc(300,300,8,0,2*Math.PI),e.fill(),e.fillStyle="#4CAF50",e.font="bold 16px Arial",e.textAlign="center",e.fillText("🔒",300,320),e.fillStyle="#2C3E50",e.font="bold 24px Arial",e.textAlign="center",e.fillText("Privacy Panda",300,50),e.font="18px Arial",e.fillStyle="#4CAF50",e.fillText("Protect Your Digital Treasure!",300,75),e.fillStyle="#FFD700",e.font="20px Arial",e.fillText("⭐",50,50),e.fillText("⭐",550,50),e.fillText("⭐",50,350),e.fillText("⭐",550,350)};d.useEffect(()=>{const e=a.current;if(!e)return;const t=e.getContext("2d");t&&(e.width=600,e.height=400,k(t))},[]);const w=e=>{const t=a.current;if(!t)return{x:0,y:0};const i=t.getBoundingClientRect(),n=t.width/i.width,p=t.height/i.height;if("touches"in e){const c=e.touches[0];return{x:(c.clientX-i.left)*n,y:(c.clientY-i.top)*p}}else return{x:(e.clientX-i.left)*n,y:(e.clientY-i.top)*p}},P=e=>{e.preventDefault(),v(!0);const t=w(e);u(t.x,t.y)},j=e=>{if(!M)return;e.preventDefault();const t=w(e);u(t.x,t.y)},u=(e,t)=>{const i=a.current;if(!i)return;const n=i.getContext("2d");n&&(n.globalCompositeOperation="source-over",n.strokeStyle=C,n.lineWidth=h,n.lineCap="round",n.lineJoin="round",n.beginPath(),n.moveTo(e,t),n.lineTo(e,t),n.stroke())},g=()=>{v(!1)},B=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();const t=a.current?.getBoundingClientRect();if(t){const i=t.width/2,n=t.height/2;u(i,n)}}else e.key==="c"||e.key==="C"?(e.preventDefault(),T()):(e.key==="r"||e.key==="R")&&(e.preventDefault(),E())},E=()=>{const e=a.current;if(!e)return;const t=e.getContext("2d");t&&(k(t),x(!1))},R=()=>{const e=a.current;if(!e)return;const t=document.createElement("a");t.download="privacy-panda-coloring.png",t.href=e.toDataURL(),t.click()},T=()=>{const e=a.current;if(!e)return;const t=e.getContext("2d");if(!t)return;const n=t.getImageData(0,0,e.width,e.height).data;let p=0,c=0;for(let l=50;l<350;l++)for(let r=100;r<500;r++){const s=(l*e.width+r)*4,f=n[s],b=n[s+1],y=n[s+2],W=n[s+3];!(f===232&&b===245&&y===232)&&!(f===248&&b===249&&y===250)&&!(f===44&&b===62&&y===80)&&(c++,W>0&&p++)}const m=c>0?p/c*100:0;if(m>30){x(!0);const l=Math.min(100,Math.round(m));S(l),setTimeout(()=>{const r=document.createElement("div");r.textContent="🎉🎨✨",r.style.cssText=`
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
        `,document.head.appendChild(s),document.body.appendChild(r),setTimeout(()=>{document.body.removeChild(r),document.head.removeChild(s)},2e3)},100)}else{const l=`Keep coloring! You've filled ${Math.round(m)}% of the drawing area.`;alert(l)}};return o.jsxs("div",{className:"coloring-activity",children:[o.jsxs("div",{className:"activity-header",children:[o.jsx("h2",{className:"activity-title",children:"Privacy Panda Coloring Activity"}),o.jsx("button",{onClick:F,className:"close-button",children:"×"})]}),o.jsxs("div",{className:"activity-content",children:[o.jsxs("div",{className:"tools-panel",children:[o.jsxs("div",{className:"color-palette",children:[o.jsx("h3",{children:"Colors"}),o.jsx("div",{className:"colors-grid",children:I.map(e=>o.jsx("button",{className:`color-button ${C===e?"selected":""}`,style:{backgroundColor:e},onClick:()=>A(e)},e))})]}),o.jsxs("div",{className:"brush-controls",children:[o.jsx("h3",{children:"Brush Size"}),o.jsx("input",{type:"range",min:"5",max:"25",value:h,onChange:e=>N(Number(e.target.value)),className:"brush-slider"}),o.jsxs("span",{className:"brush-size",children:[h,"px"]})]}),o.jsxs("div",{className:"action-buttons",children:[o.jsxs("button",{onClick:E,className:"action-button",children:[o.jsx(Y,{size:16}),"Clear"]}),o.jsxs("button",{onClick:R,className:"action-button",children:[o.jsx(K,{size:16}),"Download"]}),o.jsxs("button",{onClick:T,className:"action-button primary",children:[o.jsx(D,{size:16}),"Check Complete"]})]})]}),o.jsxs("div",{className:"canvas-container",children:[o.jsx("canvas",{ref:a,onMouseDown:P,onMouseMove:j,onMouseUp:g,onMouseLeave:g,onTouchStart:P,onTouchMove:j,onTouchEnd:g,onKeyDown:B,className:"coloring-canvas",style:{touchAction:"none"},role:"img","aria-label":"Privacy Panda coloring page with panda and shield outline. Use mouse or touch to color, or press Enter or Space to add color. Press C to check completion, R to reset.",tabIndex:0}),z&&o.jsx("div",{className:"completion-overlay",children:o.jsxs("div",{className:"completion-message",children:[o.jsx(D,{size:48,className:"success-icon"}),o.jsx("h3",{children:"Great Job!"}),o.jsx("p",{children:"You've completed the Privacy Panda coloring activity!"})]})})]})]}),o.jsx("style",{jsx:!0,children:`
        .coloring-activity {
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
          display: flex;
          flex: 1;
          background: white;
        }

        .tools-panel {
          width: 250px;
          padding: 20px;
          background: #f8f9fa;
          border-right: 1px solid #e0e0e0;
          overflow-y: auto;
        }

        .color-palette h3,
        .brush-controls h3 {
          margin: 0 0 15px 0;
          color: #2C3E50;
          font-size: 16px;
        }

        .colors-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-bottom: 30px;
        }

        .color-button {
          width: 40px;
          height: 40px;
          border: 2px solid transparent;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .color-button:hover {
          transform: scale(1.1);
        }

        .color-button.selected {
          border-color: #2C3E50;
          transform: scale(1.1);
        }

        .brush-controls {
          margin-bottom: 30px;
        }

        .brush-slider {
          width: 100%;
          margin: 10px 0;
        }

        .brush-size {
          display: block;
          text-align: center;
          color: #666;
          font-size: 14px;
        }

        .action-buttons {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .action-button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          border: 1px solid #ddd;
          background: white;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 14px;
        }

        .action-button:hover {
          background: #f0f0f0;
        }

        .action-button.primary {
          background: #4CAF50;
          color: white;
          border-color: #4CAF50;
        }

        .action-button.primary:hover {
          background: #45a049;
        }

        .canvas-container {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
          position: relative;
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
      `})]})};export{V as default};
//# sourceMappingURL=ColoringActivity-DasKNv_a.js.map
