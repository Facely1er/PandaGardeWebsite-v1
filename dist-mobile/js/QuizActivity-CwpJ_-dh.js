import{r as o,j as e,m as I,d as W,C as D,R as L,b as U,a4 as K,a5 as M,c as G,a1 as B}from"./react-vendor-BOZo0wfU.js";import"./vendor-DnBAyVVL.js";import"./app-screens-_0EESrUG.js";import"./components-family-hub-B5GlOXg3.js";import"./state-management-y1LSxOsg.js";import"./encryption-utilities-BBPZ7UWB.js";import"./monitoring-utilities-Bq33XAMw.js";import"./context-family-progress-BlwI39UW.js";import"./utilities-BXq9NOS6.js";import"./pages-family-hub-CPFnR9UC.js";const ie=({onComplete:g,onClose:y})=>{const[n,m]=o.useState(0),[u,x]=o.useState(null),[a,f]=o.useState(!1),[l,z]=o.useState(0),[j,w]=o.useState(!1),[h,p]=o.useState(30),[v,k]=o.useState(!1),[c,C]=o.useState(!1),[r,q]=o.useState(!0),i=o.useMemo(()=>[{id:"1",question:"What should you do if someone online asks for your password?",options:["Give it to them","Never share it","Share it with friends","Write it down"],correctAnswer:1,explanation:"Never share your password with anyone, even friends! Passwords are private and should be kept secret.",difficulty:"easy"},{id:"2",question:"Which information is safe to share online?",options:["Your home address","Your favorite color","Your phone number","Your full name"],correctAnswer:1,explanation:"Your favorite color is safe to share! Personal information like addresses, phone numbers, and full names should be kept private.",difficulty:"easy"},{id:"3",question:"What does the lock symbol 🔒 mean on a website?",options:["The website is broken","The website is secure","The website is slow","The website is old"],correctAnswer:1,explanation:"The lock symbol means the website is secure and your information is protected when you visit it.",difficulty:"medium"},{id:"4",question:"If you see a pop-up asking for personal information, what should you do?",options:["Fill it out quickly","Close the pop-up","Ask your parents","Both B and C"],correctAnswer:3,explanation:"Always close suspicious pop-ups and ask your parents for help. Never give personal information to unknown websites.",difficulty:"medium"},{id:"5",question:"What is the best way to create a strong password?",options:["Use your name","Use random letters and numbers","Use your birthday","Use your pet's name"],correctAnswer:1,explanation:"Strong passwords use random letters, numbers, and symbols. Avoid using personal information that others might guess.",difficulty:"hard"},{id:"6",question:"What should you do if someone online makes you feel uncomfortable?",options:["Ignore them","Tell them to stop","Tell a trusted adult","All of the above"],correctAnswer:3,explanation:"If someone makes you uncomfortable online, ignore them, tell them to stop, and always tell a trusted adult like your parents or teacher.",difficulty:"medium"}],[]),A=t=>{a||x(t)},N=o.useCallback(()=>{u!==null&&(f(!0),u===i[n].correctAnswer&&(z(t=>t+1),setTimeout(()=>{const t=document.createElement("div");t.textContent="🎉✅",t.style.cssText=`
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 48px;
          z-index: 10000;
          pointer-events: none;
          animation: celebrate 1s ease-out forwards;
        `;const s=document.createElement("style");s.textContent=`
          @keyframes celebrate {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            50% { opacity: 1; transform: translate(-50%, -50%) scale(1.2); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(1) translateY(-50px); }
          }
        `,document.head.appendChild(s),document.body.appendChild(t),setTimeout(()=>{document.body.removeChild(t),document.head.removeChild(s)},1e3)},200)),setTimeout(()=>{if(n<i.length-1)m(t=>t+1),x(null),f(!1),p(30);else{w(!0);const t=Math.round((l+(u===i[n].correctAnswer?1:0))/i.length*100);g(t)}},3e3))},[u,i,n,l,g]);o.useEffect(()=>{let t;return r&&v&&h>0&&!a&&!j&&!c?t=setInterval(()=>{p(s=>s-1)},1e3):r&&h===0&&!a&&N(),()=>clearInterval(t)},[h,v,a,j,N,c,r]);const T=()=>{C(t=>!t)},E=()=>{q(t=>!t),r||p(30)},S=()=>{n<i.length-1?(m(t=>t+1),x(null),f(!1),p(30)):(w(!0),g())},F=()=>{n>0&&(m(t=>t-1),x(null),f(!1),p(30))},P=()=>{m(0),x(null),f(!1),z(0),w(!1),p(30),k(!1)},Q=()=>{k(!0)},Y=t=>{switch(t){case"easy":return"#4CAF50";case"medium":return"#FF9800";case"hard":return"#f44336";default:return"#666"}},R=()=>{const t=l/i.length*100;return t>=80?"Privacy Expert! 🌟":t>=60?"Great Job! 👍":t>=40?"Good Try! 💪":"Keep Learning! 📚"},d=i[n];return v?j?e.jsxs("div",{className:"quiz-activity",children:[e.jsxs("div",{className:"activity-header",children:[e.jsx("h2",{className:"activity-title",children:"Quiz Complete!"}),e.jsx("button",{onClick:y,className:"close-button",children:"×"})]}),e.jsx("div",{className:"quiz-results",children:e.jsxs("div",{className:"results-content",children:[e.jsx("h3",{children:R()}),e.jsxs("div",{className:"score-display",children:[e.jsxs("div",{className:"score-circle",children:[e.jsx("span",{className:"score-number",children:l}),e.jsxs("span",{className:"score-total",children:["/",i.length]})]}),e.jsxs("div",{className:"score-percentage",children:[Math.round(l/i.length*100),"%"]})]}),e.jsxs("p",{children:["You answered ",l," out of ",i.length," questions correctly!"]}),e.jsx("div",{className:"result-actions",children:e.jsxs("button",{onClick:P,className:"action-button",children:[e.jsx(L,{size:16}),"Try Again"]})})]})}),e.jsx("style",{jsx:!0,children:`
          .quiz-activity {
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

          .quiz-results {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          }

          .results-content {
            background: white;
            padding: 40px;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            max-width: 400px;
          }

          .results-content h3 {
            margin: 0 0 30px 0;
            color: #2C3E50;
            font-size: 28px;
          }

          .score-display {
            margin-bottom: 30px;
          }

          .score-circle {
            display: inline-flex;
            align-items: baseline;
            gap: 5px;
            margin-bottom: 10px;
          }

          .score-number {
            font-size: 48px;
            font-weight: bold;
            color: #4CAF50;
          }

          .score-total {
            font-size: 24px;
            color: #666;
          }

          .score-percentage {
            font-size: 24px;
            font-weight: bold;
            color: #4CAF50;
          }

          .results-content p {
            margin: 0 0 30px 0;
            color: #666;
            font-size: 16px;
          }

          .result-actions {
            display: flex;
            gap: 15px;
            justify-content: center;
          }

          .action-button {
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

          .action-button:hover {
            background: #f0f0f0;
          }
        `})]}):e.jsxs("div",{className:"quiz-activity",children:[e.jsxs("div",{className:"activity-header",children:[e.jsx("h2",{className:"activity-title",children:"Privacy Knowledge Quiz"}),e.jsx("button",{onClick:y,className:"close-button",children:"×"})]}),e.jsxs("div",{className:"activity-content",children:[e.jsxs("div",{className:"quiz-progress",children:[e.jsxs("div",{className:"progress-info",children:[e.jsxs("span",{className:"question-number",children:["Question ",n+1," of ",i.length]}),r&&e.jsxs("div",{className:"timer-controls",children:[e.jsx("button",{onClick:T,className:"timer-button","aria-label":c?"Resume timer":"Pause timer",title:c?"Resume timer":"Pause timer",children:c?e.jsx(U,{size:16,"aria-hidden":"true"}):e.jsx(K,{size:16,"aria-hidden":"true"})}),e.jsxs("span",{className:`time-left ${c?"paused":""}`,"aria-live":"polite",children:["⏰ ",h,"s ",c&&"(Paused)"]})]}),!r&&e.jsxs("span",{className:"time-left disabled","aria-label":"Timer disabled",children:[e.jsx(M,{size:16,"aria-hidden":"true"})," No time limit"]})]}),e.jsx("div",{className:"progress-bar",children:e.jsx("div",{className:"progress-fill",style:{width:`${(n+1)/i.length*100}%`}})})]}),e.jsxs("div",{className:"question-container",children:[e.jsxs("div",{className:"question-header",children:[e.jsx("span",{className:"difficulty-badge",style:{backgroundColor:Y(d.difficulty)},children:d.difficulty.toUpperCase()}),e.jsx("h3",{className:"question-text",children:d.question})]}),e.jsx("div",{className:"options-container",children:d.options.map((t,s)=>{let b="option-button";return a?s===d.correctAnswer?b+=" correct":s===u&&s!==d.correctAnswer&&(b+=" incorrect"):u===s&&(b+=" selected"),e.jsx("button",{className:b,onClick:()=>A(s),disabled:a,children:t},s)})}),a&&e.jsxs("div",{className:"explanation",children:[e.jsx("h4",{children:"💡 Explanation:"}),e.jsx("p",{children:d.explanation})]})]}),e.jsxs("div",{className:"quiz-controls",children:[e.jsxs("button",{onClick:F,disabled:n===0,className:"control-button",children:[e.jsx(G,{size:16}),"Previous"]}),e.jsxs("div",{className:"score-display",children:["Score: ",l," / ",i.length]}),e.jsxs("button",{onClick:S,disabled:n===i.length-1,className:"control-button",children:["Next",e.jsx(B,{size:16})]})]})]}),e.jsx("style",{jsx:!0,children:`
        .quiz-activity {
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

        .quiz-progress {
          padding: 20px;
          background: #f8f9fa;
          border-bottom: 1px solid #e0e0e0;
        }

        .progress-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .question-number {
          font-weight: bold;
          color: #2C3E50;
        }

        .timer-controls {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .timer-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          padding: 0;
          border: 1px solid #ddd;
          background: white;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .timer-button:hover {
          background: #f0f0f0;
          border-color: #4CAF50;
        }

        .timer-button:focus {
          outline: 2px solid #4CAF50;
          outline-offset: 2px;
        }

        .time-left {
          color: #f44336;
          font-weight: bold;
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .time-left.paused {
          color: #FF9800;
        }

        .time-left.disabled {
          color: #666;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: #e0e0e0;
          border-radius: 4px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background: #4CAF50;
          transition: width 0.3s ease;
        }

        .question-container {
          flex: 1;
          padding: 30px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .question-header {
          text-align: center;
          margin-bottom: 30px;
        }

        .difficulty-badge {
          display: inline-block;
          padding: 5px 15px;
          border-radius: 20px;
          color: white;
          font-size: 12px;
          font-weight: bold;
          margin-bottom: 15px;
        }

        .question-text {
          margin: 0;
          color: #2C3E50;
          font-size: 24px;
          line-height: 1.4;
        }

        .options-container {
          display: grid;
          gap: 15px;
          margin-bottom: 30px;
        }

        .option-button {
          padding: 20px;
          border: 2px solid #e0e0e0;
          background: white;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 16px;
          text-align: left;
        }

        .option-button:hover:not(:disabled) {
          border-color: #4CAF50;
          background: #f8f9fa;
        }

        .option-button.selected {
          border-color: #4CAF50;
          background: #E8F5E8;
        }

        .option-button.correct {
          border-color: #4CAF50;
          background: #d4edda;
          color: #155724;
        }

        .option-button.incorrect {
          border-color: #f44336;
          background: #f8d7da;
          color: #721c24;
        }

        .option-button:disabled {
          cursor: not-allowed;
        }

        .explanation {
          background: #E3F2FD;
          border: 1px solid #2196F3;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
        }

        .explanation h4 {
          margin: 0 0 10px 0;
          color: #1976D2;
        }

        .explanation p {
          margin: 0;
          color: #1976D2;
          line-height: 1.5;
        }

        .quiz-controls {
          padding: 20px;
          background: #f8f9fa;
          border-top: 1px solid #e0e0e0;
          display: flex;
          justify-content: space-between;
          align-items: center;
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

        .control-button:hover:not(:disabled) {
          background: #f0f0f0;
        }

        .control-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .score-display {
          font-size: 18px;
          font-weight: bold;
          color: #4CAF50;
        }

        @media (max-width: 768px) {
          .question-text {
            font-size: 20px;
          }

          .option-button {
            padding: 15px;
            font-size: 14px;
          }

          .quiz-controls {
            flex-direction: column;
            gap: 15px;
          }

          .progress-info {
            flex-direction: column;
            gap: 10px;
            text-align: center;
          }
        }
      `})]}):e.jsxs("div",{className:"quiz-activity",children:[e.jsxs("div",{className:"activity-header",children:[e.jsx("h2",{className:"activity-title",children:"Privacy Knowledge Quiz"}),e.jsx("button",{onClick:y,className:"close-button",children:"×"})]}),e.jsx("div",{className:"quiz-intro",children:e.jsxs("div",{className:"intro-content",children:[e.jsx("h3",{children:"🧠 Test Your Privacy Knowledge!"}),e.jsxs("p",{children:["Answer ",i.length," questions about online privacy and safety."]}),e.jsxs("div",{className:"quiz-info",children:[e.jsxs("div",{className:"info-item",children:[e.jsx(I,{size:20,"aria-hidden":"true"}),e.jsx("span",{children:"30 seconds per question (optional)"})]}),e.jsxs("div",{className:"info-item",children:[e.jsx(W,{size:20,"aria-hidden":"true"}),e.jsx("span",{children:"Different difficulty levels"})]}),e.jsxs("div",{className:"info-item",children:[e.jsx(D,{size:20,"aria-hidden":"true"}),e.jsx("span",{children:"Learn with explanations"})]})]}),e.jsxs("div",{className:"accessibility-options",children:[e.jsx("h4",{children:"Accessibility Options"}),e.jsxs("label",{className:"timer-toggle",children:[e.jsx("input",{type:"checkbox",checked:r,onChange:E,"aria-describedby":"timer-description"}),e.jsx("span",{children:"Enable Timer"})]}),e.jsx("p",{id:"timer-description",className:"timer-description",children:r?"Timer is enabled. You can pause it during the quiz.":"Timer is disabled. Take your time answering questions."})]}),e.jsx("button",{onClick:Q,className:"start-quiz-button",children:"Start Quiz"})]})}),e.jsx("style",{jsx:!0,children:`
          .quiz-activity {
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

          .quiz-intro {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          }

          .intro-content {
            background: white;
            padding: 40px;
            border-radius: 12px;
            text-align: center;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            max-width: 500px;
          }

          .intro-content h3 {
            margin: 0 0 20px 0;
            color: #2C3E50;
            font-size: 28px;
          }

          .intro-content p {
            margin: 0 0 30px 0;
            color: #666;
            font-size: 18px;
          }

          .quiz-info {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin-bottom: 30px;
          }

          .info-item {
            display: flex;
            align-items: center;
            gap: 10px;
            color: #666;
            font-size: 16px;
          }

          .start-quiz-button {
            background: #4CAF50;
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 8px;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.2s;
          }

          .start-quiz-button:hover {
            background: #45a049;
          }

          .accessibility-options {
            margin: 20px 0;
            padding: 20px;
            background: #f8f9fa;
            border-radius: 8px;
            text-align: left;
          }

          .accessibility-options h4 {
            margin: 0 0 15px 0;
            color: #2C3E50;
            font-size: 16px;
          }

          .timer-toggle {
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            font-size: 16px;
            color: #2C3E50;
          }

          .timer-toggle input[type="checkbox"] {
            width: 20px;
            height: 20px;
            cursor: pointer;
          }

          .timer-description {
            margin: 10px 0 0 0;
            font-size: 14px;
            color: #666;
          }
        `})]})};export{ie as default};
//# sourceMappingURL=QuizActivity-CwpJ_-dh.js.map
