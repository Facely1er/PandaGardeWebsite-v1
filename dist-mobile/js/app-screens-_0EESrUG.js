const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["js/ColoringActivity-DasKNv_a.js","js/react-vendor-BOZo0wfU.js","js/vendor-DnBAyVVL.js","js/components-family-hub-B5GlOXg3.js","js/state-management-y1LSxOsg.js","js/encryption-utilities-BBPZ7UWB.js","js/monitoring-utilities-Bq33XAMw.js","js/context-family-progress-BlwI39UW.js","js/utilities-BXq9NOS6.js","assets/components-family-hub-B7whAlSz.css","js/pages-family-hub-CPFnR9UC.js","js/DragDropActivity-CbUFVYIP.js","js/MazeActivity-CM0r-Fa8.js","js/WordSearchActivity-BmVobavK.js","js/ConnectDotsActivity-xbibY_-x.js","js/MatchingActivity-BavQc6ZF.js","js/MemoryGameActivity-Bwoz7em4.js","js/QuizActivity-CwpJ_-dh.js"])))=>i.map(i=>d[i]);
import{j as e,u as F,r,P as Y,U as $,E as B,T as H,b as R,R as W,c as K,A as z,D as N,d as Q,F as O,C as G,e as J,f as M,g as X,X as L,M as Z,h as ee,i as te,k as S,H as re}from"./react-vendor-BOZo0wfU.js";import{F as se,C as ae}from"./components-family-hub-B5GlOXg3.js";import{u as ie,a as E,b as U,c as ne,d as oe}from"./state-management-y1LSxOsg.js";import{u as le}from"./context-family-progress-BlwI39UW.js";import{C as A,A as D}from"./utilities-BXq9NOS6.js";import{u as ce}from"./pages-family-hub-CPFnR9UC.js";const ze=()=>e.jsx("div",{className:"min-h-full",children:e.jsx(se,{appMode:!0})}),Ee=()=>{F();const[s,i]=ie("pandagarde_family",[]),{calculateMemberScore:x}=le(),[h,o]=r.useState(!1),[g,d]=r.useState(null),[a,p]=r.useState({name:"",age:0,role:"Child"}),n=()=>{if(!a.name.trim()||a.age<=0)return;const t={id:Date.now(),name:a.name,age:a.age,role:a.role,privacyScore:0,completedActivities:0,badges:[],lastActive:new Date().toISOString()};i([...s,t]),p({name:"",age:0,role:"Child"}),o(!1)},u=t=>{i(s.filter(m=>m.id!==t))};if(g){const t=s.find(m=>m.id===g);if(t)return e.jsx(ae,{memberId:t.id,memberName:t.name,memberAge:t.age,onBack:()=>d(null)})}return e.jsxs("div",{className:"p-4 sm:p-6 max-w-4xl mx-auto",children:[e.jsxs("div",{className:"flex items-center justify-between mb-6",children:[e.jsx("h1",{className:"text-2xl font-bold text-gray-900 dark:text-white",children:"Family Members"}),e.jsxs("button",{onClick:()=>o(!0),className:"flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors min-h-[44px]",children:[e.jsx(Y,{size:18}),e.jsx("span",{children:"Add Member"})]})]}),s.length===0?e.jsxs("div",{className:"text-center py-12",children:[e.jsx("div",{className:"w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4",children:e.jsx($,{className:"text-gray-400",size:32})}),e.jsx("h3",{className:"text-xl font-bold mb-2 text-gray-900 dark:text-white",children:"No Family Members Yet"}),e.jsx("p",{className:"mb-6 text-gray-600 dark:text-gray-400",children:"Add your first family member to start tracking progress together."}),e.jsx("button",{onClick:()=>o(!0),className:"bg-teal-600 text-white px-6 py-3 rounded-lg hover:bg-teal-700 transition-colors font-semibold min-h-[44px]",children:"Add Your First Member"})]}):e.jsx("div",{className:"space-y-4",children:s.map(t=>e.jsx("div",{className:"bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-4 flex-1",children:[e.jsx("div",{className:"w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-cyan-600 flex items-center justify-center text-white text-lg font-bold",children:t.name.charAt(0).toUpperCase()}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-bold text-lg text-gray-900 dark:text-white",children:t.name}),e.jsxs("p",{className:"text-sm text-gray-600 dark:text-gray-400",children:[t.role," • Age ",t.age]}),e.jsxs("p",{className:"text-xs text-gray-500 dark:text-gray-500 mt-1",children:["Privacy Score: ",x(t.id),"/100"]})]})]}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("button",{onClick:()=>d(t.id),className:"p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center",title:"View detailed progress",children:e.jsx(B,{size:18})}),e.jsx("button",{onClick:()=>u(t.id),className:"p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center",title:"Remove family member",children:e.jsx(H,{size:18})})]})]})},t.id))}),h&&e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",children:e.jsxs("div",{className:"bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6 shadow-xl",children:[e.jsxs("div",{className:"flex items-center justify-between mb-6",children:[e.jsx("h3",{className:"text-xl font-bold text-gray-900 dark:text-white",children:"Add Family Member"}),e.jsx("button",{onClick:()=>o(!1),className:"text-gray-400 hover:text-gray-600 dark:hover:text-gray-300",children:"×"})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300",children:"Name"}),e.jsx("input",{type:"text",value:a.name,onChange:t=>p({...a,name:t.target.value}),className:"w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-600 dark:bg-gray-700 dark:text-white",placeholder:"Enter family member's name",maxLength:50})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300",children:"Age"}),e.jsx("input",{type:"number",value:a.age||"",onChange:t=>p({...a,age:parseInt(t.target.value,10)||0}),className:"w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-600 dark:bg-gray-700 dark:text-white",placeholder:"Enter age",min:"1",max:"100"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300",children:"Role"}),e.jsxs("select",{value:a.role,onChange:t=>p({...a,role:t.target.value}),className:"w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-600 dark:bg-gray-700 dark:text-white",children:[e.jsx("option",{value:"Parent",children:"Parent"}),e.jsx("option",{value:"Child",children:"Child"}),e.jsx("option",{value:"Teen",children:"Teen"}),e.jsx("option",{value:"Guardian",children:"Guardian"})]})]}),e.jsxs("div",{className:"flex gap-3 pt-4",children:[e.jsx("button",{type:"button",onClick:()=>o(!1),className:"flex-1 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 py-3 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors min-h-[44px] font-medium",children:"Cancel"}),e.jsx("button",{type:"button",onClick:n,className:"flex-1 bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition-colors min-h-[44px] font-medium",children:"Add Member"})]})]})]})})]})},de="modulepreload",me=function(s){return"/"+s},I={},v=function(i,x,h){let o=Promise.resolve();if(x&&x.length>0){let p=function(n){return Promise.all(n.map(u=>Promise.resolve(u).then(t=>({status:"fulfilled",value:t}),t=>({status:"rejected",reason:t}))))};document.getElementsByTagName("link");const d=document.querySelector("meta[property=csp-nonce]"),a=d?.nonce||d?.getAttribute("nonce");o=p(x.map(n=>{if(n=me(n),n in I)return;I[n]=!0;const u=n.endsWith(".css"),t=u?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${n}"]${t}`))return;const m=document.createElement("link");if(m.rel=u?"stylesheet":de,u||(m.as="script"),m.crossOrigin="",m.href=n,a&&m.setAttribute("nonce",a),document.head.appendChild(m),u)return new Promise((b,f)=>{m.addEventListener("load",b),m.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${n}`)))})}))}function g(d){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=d,window.dispatchEvent(a),!a.defaultPrevented)throw d}return o.then(d=>{for(const a of d||[])a.status==="rejected"&&g(a.reason);return i().catch(g)})},xe=r.lazy(()=>v(()=>import("./ColoringActivity-DasKNv_a.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10]))),he=r.lazy(()=>v(()=>import("./DragDropActivity-CbUFVYIP.js"),__vite__mapDeps([11,1,2,3,4,5,6,7,8,9,10]))),ge=r.lazy(()=>v(()=>import("./MazeActivity-CM0r-Fa8.js"),__vite__mapDeps([12,1,2,3,4,5,6,7,8,9,10]))),pe=r.lazy(()=>v(()=>import("./WordSearchActivity-BmVobavK.js"),__vite__mapDeps([13,1,2,3,4,5,6,7,8,9,10]))),ue=r.lazy(()=>v(()=>import("./ConnectDotsActivity-xbibY_-x.js"),__vite__mapDeps([14,1,2,3,4,5,6,7,8,9,10]))),ye=r.lazy(()=>v(()=>import("./MatchingActivity-BavQc6ZF.js"),__vite__mapDeps([15,1,2,3,4,5,6,7,8,9,10]))),be=r.lazy(()=>v(()=>import("./MemoryGameActivity-Bwoz7em4.js"),__vite__mapDeps([16,1,2,3,4,5,6,7,8,9,10]))),fe=r.lazy(()=>v(()=>import("./QuizActivity-CwpJ_-dh.js"),__vite__mapDeps([17,1,2,3,4,5,6,7,8,9,10]))),ve=({activityId:s,onClose:i,onComplete:x})=>{const[h,o]=r.useState(!0),[g,d]=r.useState(null),{markActivityCompleted:a}=E(),{showSuccess:p,showError:n}=U(),t={coloring:{title:"Privacy Panda Coloring Activity",description:"Color the Privacy Panda and learn about protecting your digital treasure! This activity teaches you about the importance of keeping your personal information safe online.",instructions:["Choose a color from the palette","Click and drag to color the panda and shield","Adjust brush size if needed","Click 'Check Complete' when you're done coloring","Download your artwork to save it!"],tips:"Take your time and be creative! The more you color, the better you'll understand privacy protection. The shield represents how we protect our personal information online."},sorting:{title:"Information Sorting Game",description:"Learn what information is safe to share and what should be kept private. This activity helps you understand the difference between public and private information.",instructions:["Drag each item to the correct category","Green zone: Safe to Share (things you can tell friends)","Red zone: Keep Private (personal information to protect)","Click 'Check Answer' when you're done sorting","Try to get 100% correct!"],tips:"Think about what information strangers could use to find you or pretend to be you. Personal details like your full name, address, and phone number should always be kept private."},maze:{title:"Safe Online Journey Maze",description:"Help Privacy Panda navigate safely through the digital world. Learn to identify online dangers and make safe choices.",instructions:["Use arrow keys or touch to move the panda","Avoid the red danger zones (like suspicious websites)","Collect green privacy shields (safe practices)","Reach the finish line safely","Try to collect all shields for bonus points!"],tips:"Move carefully and plan your path. Real online safety requires thinking ahead! The red zones represent dangerous websites or situations you should avoid."},wordsearch:{title:"Privacy Word Search",description:"Find important privacy words hidden in the puzzle. Learn key vocabulary that helps you understand online safety.",instructions:["Look for the words listed below the puzzle","Click and drag to highlight words","Words can go in any direction","Find all words to complete the activity","Take your time - there's no rush!"],tips:"These words are important for understanding digital privacy. Words like 'password', 'secure', and 'privacy' help you stay safe online!"},connectdots:{title:"Privacy Shield Connect-the-Dots",description:"Connect the dots to reveal Privacy Panda's protection shield. Learn about the importance of protecting your personal information.",instructions:["Click on the dots in numerical order","Start with dot 1 and work your way up","Complete the shield outline","Color the shield when you're done","The shield represents your privacy protection!"],tips:"Take your time and follow the numbers carefully. The shield represents how we protect our personal information from strangers online!"},matching:{title:"Privacy Symbol Matching",description:"Match privacy symbols with their meanings to learn digital safety signs. These symbols help you identify safe and secure websites.",instructions:["Click on a symbol card to flip it","Click on another card to see if they match","Match all pairs to complete the activity","Remember what each symbol means","Try to complete it in as few moves as possible!"],tips:"These symbols appear on websites and apps. The lock symbol means a website is secure, and the warning symbol means you should be careful!"},memory:{title:"Privacy Memory Game",description:"Test your memory by matching privacy symbols with their meanings! This game helps you remember important online safety concepts.",instructions:["Click on cards to flip them and see what's underneath","Find matching pairs of symbols and meanings","Remember where cards are located","Complete all pairs to win the game","Try to finish in as few moves as possible!"],tips:"This game helps you remember important privacy symbols and what they mean. The better you remember these symbols, the safer you'll be online!"},quiz:{title:"Privacy Knowledge Quiz",description:"Test your knowledge about online privacy and safety! This quiz helps you learn important concepts about staying safe online.",instructions:["Read each question carefully","Choose the best answer from the options","You have 30 seconds per question","Learn from the explanations after each answer","Try to get as many correct as possible!"],tips:"This quiz helps you learn important privacy concepts. Don't worry if you get some wrong - you'll learn from the explanations and become safer online!"}}[s];r.useEffect(()=>{o(!0)},[s]);const m=async c=>{const j=g?Math.round((Date.now()-g.getTime())/1e3):0;try{await a(s,c,j);const P=c!==void 0?` You scored ${c}%!`:"";p("Activity Completed!",`Great job! Your progress has been saved.${P}`),x(s,c)}catch{n("Error","Failed to save progress. Please try again.")}},b=async()=>{d(new Date),o(!1)},f=()=>{o(!0)},l=()=>{const c={onComplete:m,onClose:i};switch(s){case"coloring":return e.jsx(r.Suspense,{fallback:e.jsx("div",{className:"loading-spinner",children:"Loading coloring activity..."}),children:e.jsx(xe,{...c})});case"sorting":return e.jsx(r.Suspense,{fallback:e.jsx("div",{className:"loading-spinner",children:"Loading sorting activity..."}),children:e.jsx(he,{...c})});case"maze":return e.jsx(r.Suspense,{fallback:e.jsx("div",{className:"loading-spinner",children:"Loading maze activity..."}),children:e.jsx(ge,{...c})});case"wordsearch":return e.jsx(r.Suspense,{fallback:e.jsx("div",{className:"loading-spinner",children:"Loading word search activity..."}),children:e.jsx(pe,{...c})});case"connectdots":return e.jsx(r.Suspense,{fallback:e.jsx("div",{className:"loading-spinner",children:"Loading connect dots activity..."}),children:e.jsx(ue,{...c})});case"matching":return e.jsx(r.Suspense,{fallback:e.jsx("div",{className:"loading-spinner",children:"Loading matching activity..."}),children:e.jsx(ye,{...c})});case"memory":return e.jsx(r.Suspense,{fallback:e.jsx("div",{className:"loading-spinner",children:"Loading memory game..."}),children:e.jsx(be,{...c})});case"quiz":return e.jsx(r.Suspense,{fallback:e.jsx("div",{className:"loading-spinner",children:"Loading quiz..."}),children:e.jsx(fe,{...c})});default:return e.jsx("div",{children:"Activity not found"})}};return e.jsxs("div",{className:"activity-manager",children:[h&&t?e.jsxs("div",{className:"activity-instructions",children:[e.jsxs("div",{className:"instructions-header",children:[e.jsx("h2",{className:"instructions-title",children:t.title}),e.jsx("button",{onClick:i,className:"close-button",children:"×"})]}),e.jsxs("div",{className:"instructions-content",children:[e.jsx("div",{className:"instructions-description",children:e.jsx("p",{children:t.description})}),e.jsxs("div",{className:"instructions-steps",children:[e.jsx("h3",{children:"How to Play:"}),e.jsx("ol",{children:t.instructions.map((c,j)=>e.jsx("li",{children:c},j))})]}),e.jsxs("div",{className:"instructions-tips",children:[e.jsx("h3",{children:"💡 Tip:"}),e.jsx("p",{children:t.tips})]}),e.jsxs("div",{className:"instructions-actions",children:[e.jsxs("button",{onClick:b,className:"start-button","aria-label":"Start the activity",children:[e.jsx(R,{size:20}),"Start Activity"]}),e.jsx("button",{onClick:i,className:"cancel-button","aria-label":"Cancel and close activity",children:"Cancel"})]})]})]}):e.jsxs("div",{className:"activity-container",children:[e.jsxs("div",{className:"activity-header",children:[e.jsx("h2",{className:"activity-title",children:t?.title}),e.jsxs("div",{className:"activity-controls",children:[e.jsx("button",{onClick:f,className:"restart-button",title:"Restart Activity","aria-label":"Restart the activity",children:e.jsx(W,{size:20})}),e.jsx("button",{onClick:i,className:"close-button","aria-label":"Close activity",children:"×"})]})]}),l()]}),e.jsx("style",{jsx:!0,children:`
        .activity-manager {
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

        .activity-instructions {
          background: white;
          margin: 20px;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          max-width: 600px;
          max-height: 80vh;
          overflow-y: auto;
          margin: 20px auto;
        }

        .instructions-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #e0e0e0;
          background: #f8f9fa;
          border-radius: 12px 12px 0 0;
        }

        .instructions-title {
          margin: 0;
          color: #2C3E50;
          font-size: 24px;
        }

        .instructions-content {
          padding: 20px;
        }

        .instructions-description {
          margin-bottom: 20px;
        }

        .instructions-description p {
          font-size: 16px;
          color: #666;
          line-height: 1.6;
        }

        .instructions-steps {
          margin-bottom: 20px;
        }

        .instructions-steps h3 {
          color: #2C3E50;
          margin-bottom: 10px;
        }

        .instructions-steps ol {
          padding-left: 20px;
        }

        .instructions-steps li {
          margin-bottom: 8px;
          color: #666;
          line-height: 1.5;
        }

        .instructions-tips {
          background: #fff3cd;
          border: 1px solid #ffeaa7;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 20px;
        }

        .instructions-tips h3 {
          margin: 0 0 8px 0;
          color: #856404;
          font-size: 16px;
        }

        .instructions-tips p {
          margin: 0;
          color: #856404;
          font-style: italic;
        }

        .instructions-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
        }

        .start-button {
          background: #4CAF50;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background 0.2s;
        }

        .start-button:hover {
          background: #45a049;
        }

        .cancel-button {
          background: #f5f5f5;
          color: #666;
          border: 1px solid #ddd;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 16px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .cancel-button:hover {
          background: #e0e0e0;
        }

        .activity-container {
          background: white;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .activity-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          background: #f8f9fa;
          border-bottom: 1px solid #e0e0e0;
        }

        .activity-title {
          margin: 0;
          color: #2C3E50;
          font-size: 20px;
        }

        .activity-controls {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .restart-button {
          background: #f5f5f5;
          border: 1px solid #ddd;
          padding: 8px;
          border-radius: 6px;
          cursor: pointer;
          color: #666;
          transition: background 0.2s;
        }

        .restart-button:hover {
          background: #e0e0e0;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #666;
          padding: 4px;
        }

        .loading-spinner {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 200px;
          font-size: 16px;
          color: #666;
        }

        .loading-spinner::before {
          content: '';
          width: 20px;
          height: 20px;
          border: 2px solid #f3f3f3;
          border-top: 2px solid #4CAF50;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-right: 10px;
        }

        @media (max-width: 768px) {
          .activity-instructions {
            margin: 10px;
            max-height: 90vh;
          }

          .instructions-header {
            padding: 15px;
          }

          .instructions-title {
            font-size: 20px;
          }

          .instructions-content {
            padding: 15px;
          }

          .instructions-actions {
            flex-direction: column;
          }

          .start-button,
          .cancel-button {
            width: 100%;
            justify-content: center;
          }
        }
      `})]})},Te=()=>{F();const[s,i]=r.useState(null),x=[{id:"maze",name:"Safe Online Journey Maze",icon:"🎮",description:"Navigate safely through the digital world"},{id:"memory",name:"Privacy Symbol Matching",icon:"🧩",description:"Match privacy symbols with their meanings"},{id:"quiz",name:"Privacy Quiz",icon:"❓",description:"Test your privacy knowledge"},{id:"coloring",name:"Privacy Panda Coloring",icon:"🎨",description:"Color and learn about privacy protection"},{id:"sorting",name:"Information Sorting",icon:"📦",description:"Learn what information is safe to share"},{id:"wordsearch",name:"Privacy Word Search",icon:"🔍",description:"Find important privacy words"},{id:"connectdots",name:"Privacy Shield Connect-the-Dots",icon:"🔗",description:"Connect dots to reveal the shield"},{id:"matching",name:"Privacy Symbol Matching",icon:"🎯",description:"Match symbols with meanings"}],h=(o,g)=>{i(null)};return s?e.jsxs("div",{className:"h-full flex flex-col",children:[e.jsxs("div",{className:"bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center gap-4",children:[e.jsx("button",{onClick:()=>i(null),className:"p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center",children:e.jsx(K,{size:20})}),e.jsx("h2",{className:"text-lg font-semibold text-gray-900 dark:text-white",children:"Activity"})]}),e.jsx("div",{className:"flex-1 overflow-auto",children:e.jsx(ve,{activityId:s,onClose:()=>i(null),onComplete:h})})]}):e.jsxs("div",{className:"p-4 sm:p-6 max-w-4xl mx-auto",children:[e.jsxs("div",{className:"mb-6",children:[e.jsx("h1",{className:"text-2xl font-bold text-gray-900 dark:text-white mb-2",children:"Activities"}),e.jsx("p",{className:"text-gray-600 dark:text-gray-400",children:"Play fun privacy games and activities to boost your family's privacy score!"})]}),e.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:x.map(o=>e.jsxs("button",{onClick:()=>i(o.id),className:"bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:border-teal-500 dark:hover:border-teal-500 transition-all text-left shadow-sm hover:shadow-md min-h-[120px] flex flex-col justify-between",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center gap-3 mb-2",children:[e.jsx("span",{className:"text-3xl",children:o.icon}),e.jsx("h3",{className:"font-semibold text-gray-900 dark:text-white",children:o.name})]}),e.jsx("p",{className:"text-sm text-gray-600 dark:text-gray-400",children:o.description})]}),e.jsxs("div",{className:"flex items-center gap-2 text-teal-600 dark:text-teal-400 mt-4",children:[e.jsx(R,{size:16}),e.jsx("span",{className:"text-sm font-medium",children:"Start Activity"})]})]},o.id))})]})},je=({onClose:s})=>{const[i,x]=r.useState(""),[h,o]=r.useState(""),[g,d]=r.useState(!1),{progress:a,getOverallProgress:p}=E(),{profile:n}=ce(),{currentFamily:u}=ne(),t=p(),m=A.checkAchievements(a),b=async()=>{d(!0);try{const l=i?D.find(j=>j.id===i):null,c={recipientName:n?.profile_data?.firstName?`${n.profile_data.firstName} ${n.profile_data.lastName||""}`.trim():n?.email?.split("@")[0]||"Privacy Learner",achievement:l?.name||h||"Privacy Education",date:new Date().toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric"}),familyName:u?.name,score:Math.round(t.percentage),totalActivities:t.totalCount,completedActivities:t.completedCount};await A.downloadCertificate(c)}catch(l){console.error("Error generating certificate:",l),alert("Error generating certificate. Please try again.")}finally{d(!1)}},f=async l=>{try{const c=n?.profile_data?.firstName?`${n.profile_data.firstName} ${n.profile_data.lastName||""}`.trim():n?.email?.split("@")[0]||"Privacy Learner";await A.downloadAchievementBadge(l,c)}catch(c){console.error("Error generating achievement badge:",c),alert("Error generating achievement badge. Please try again.")}};return e.jsxs("div",{className:"max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6",children:[e.jsxs("div",{className:"flex items-center justify-between mb-6",children:[e.jsxs("h2",{className:"text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2",children:[e.jsx(z,{className:"text-green-600",size:24}),"Certificate Generator"]}),s&&e.jsx("button",{onClick:s,className:"text-gray-400 hover:text-gray-600 dark:hover:text-gray-300",children:"✕"})]}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-8",children:[e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6",children:[e.jsx("h3",{className:"text-lg font-semibold text-gray-900 dark:text-white mb-4",children:"Your Progress"}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("span",{className:"text-gray-600 dark:text-gray-300",children:"Activities Completed"}),e.jsxs("span",{className:"font-semibold text-gray-900 dark:text-white",children:[t.completedCount,"/",t.totalCount]})]}),e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("span",{className:"text-gray-600 dark:text-gray-300",children:"Overall Progress"}),e.jsxs("span",{className:"font-semibold text-gray-900 dark:text-white",children:[Math.round(t.percentage),"%"]})]}),e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("span",{className:"text-gray-600 dark:text-gray-300",children:"Time Spent"}),e.jsxs("span",{className:"font-semibold text-gray-900 dark:text-white",children:[a.totalTimeSpent," minutes"]})]})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold text-gray-900 dark:text-white mb-4",children:"Earned Achievements"}),e.jsx("div",{className:"space-y-3",children:m.length>0?m.map(l=>e.jsxs("div",{className:"flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("span",{className:"text-2xl",children:l.icon}),e.jsxs("div",{children:[e.jsx("div",{className:"font-medium text-gray-900 dark:text-white",children:l.name}),e.jsx("div",{className:"text-sm text-gray-600 dark:text-gray-300",children:l.description})]})]}),e.jsx("button",{onClick:()=>f(l),className:"p-2 text-gray-400 hover:text-green-600 transition-colors",title:"Download Badge",children:e.jsx(N,{size:16})})]},l.id)):e.jsxs("div",{className:"text-center py-6 text-gray-500 dark:text-gray-400",children:[e.jsx(Q,{size:32,className:"mx-auto mb-2 opacity-50"}),e.jsx("p",{children:"Complete activities to earn achievements!"})]})})]})]}),e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"bg-gray-50 dark:bg-gray-700 rounded-lg p-6",children:[e.jsx("h3",{className:"text-lg font-semibold text-gray-900 dark:text-white mb-4",children:"Generate Certificate"}),e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",children:"Select Achievement"}),e.jsxs("select",{value:i,onChange:l=>x(l.target.value),className:"w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white",children:[e.jsx("option",{value:"",children:"Choose an achievement"}),D.map(l=>e.jsxs("option",{value:l.id,children:[l.icon," ",l.name]},l.id))]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",children:"Or Custom Achievement"}),e.jsx("input",{type:"text",value:h,onChange:l=>o(l.target.value),placeholder:"Enter custom achievement name",className:"w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white"})]}),e.jsx("button",{onClick:b,disabled:g||!i&&!h,className:"w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-2",children:g?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"}),"Generating..."]}):e.jsxs(e.Fragment,{children:[e.jsx(O,{size:16}),"Generate Certificate"]})})]})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("h4",{className:"font-medium text-gray-900 dark:text-white",children:"Quick Actions"}),e.jsxs("button",{onClick:()=>{x("privacy_champion"),b()},className:"w-full flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg hover:from-yellow-100 hover:to-orange-100 dark:hover:from-yellow-900/30 dark:hover:to-orange-900/30 transition-colors",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(z,{className:"text-yellow-600",size:20}),e.jsx("span",{className:"font-medium",children:"Privacy Champion Certificate"})]}),e.jsx(N,{size:16,className:"text-gray-400"})]}),e.jsxs("button",{onClick:()=>{x(""),o("Privacy Education Completion"),b()},className:"w-full flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg hover:from-green-100 hover:to-blue-100 dark:hover:from-green-900/30 dark:hover:to-blue-900/30 transition-colors",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx(G,{className:"text-green-600",size:20}),e.jsx("span",{className:"font-medium",children:"Completion Certificate"})]}),e.jsx(N,{size:16,className:"text-gray-400"})]})]})]})]})]})},we=({onClose:s})=>{const[i,x]=r.useState(!1),[h,o]=r.useState(!1),[g,d]=r.useState(""),[a,p]=r.useState(!1),{progress:n,exportProgress:u,importProgress:t,resetProgress:m}=E(),{showSuccess:b,showError:f}=U(),l=async()=>{x(!0);try{const y=u(),C=new Blob([y],{type:"application/json"}),k=URL.createObjectURL(C),w=document.createElement("a");w.href=k,w.download=`pandagarde-progress-${new Date().toISOString().split("T")[0]}.json`,document.body.appendChild(w),w.click(),document.body.removeChild(w),URL.revokeObjectURL(k),b("Progress exported successfully!","Your learning progress has been saved to a file.")}catch(y){console.error("Export error:",y),f("Export failed","There was an error exporting your progress. Please try again.")}finally{x(!1)}},c=async()=>{if(!g.trim()){f("No data provided","Please paste your progress data to import.");return}o(!0);try{t(g)?(b("Progress imported successfully!","Your learning progress has been restored."),d(""),p(!1)):f("Import failed","The data format is invalid. Please check your progress file.")}catch(y){console.error("Import error:",y),f("Import failed","There was an error importing your progress. Please check the data format.")}finally{o(!1)}},j=async()=>{try{const y=u();await navigator.clipboard.writeText(y),b("Copied to clipboard!","Your progress data has been copied to the clipboard.")}catch(y){console.error("Copy error:",y),f("Copy failed","Could not copy to clipboard. Please try downloading instead.")}},P=y=>{const C=y.target.files?.[0];if(!C)return;const k=new FileReader;k.onload=w=>{const V=w.target?.result;d(V)},k.readAsText(C)},T=n.completedActivities.length,_=6,q=Math.round(T/_*100);return e.jsxs("div",{className:"max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6",children:[e.jsxs("div",{className:"flex items-center justify-between mb-6",children:[e.jsxs("h2",{className:"text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2",children:[e.jsx(O,{className:"text-green-600",size:24}),"Progress Export & Import"]}),s&&e.jsx("button",{onClick:s,className:"text-gray-400 hover:text-gray-600 dark:hover:text-gray-300",children:"✕"})]}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-8",children:[e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6",children:[e.jsx("h3",{className:"text-lg font-semibold text-gray-900 dark:text-white mb-4",children:"Your Current Progress"}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("span",{className:"text-gray-600 dark:text-gray-300",children:"Activities Completed"}),e.jsxs("span",{className:"font-semibold text-gray-900 dark:text-white",children:[T,"/",_]})]}),e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("span",{className:"text-gray-600 dark:text-gray-300",children:"Overall Progress"}),e.jsxs("span",{className:"font-semibold text-gray-900 dark:text-white",children:[q,"%"]})]}),e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("span",{className:"text-gray-600 dark:text-gray-300",children:"Time Spent"}),e.jsxs("span",{className:"font-semibold text-gray-900 dark:text-white",children:[n.totalTimeSpent," minutes"]})]}),e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("span",{className:"text-gray-600 dark:text-gray-300",children:"Achievements"}),e.jsx("span",{className:"font-semibold text-gray-900 dark:text-white",children:n.achievements.length})]})]})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("h3",{className:"text-lg font-semibold text-gray-900 dark:text-white",children:"Export Your Progress"}),e.jsxs("div",{className:"space-y-3",children:[e.jsx("button",{onClick:l,disabled:i,className:"w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-2",children:i?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"}),"Exporting..."]}):e.jsxs(e.Fragment,{children:[e.jsx(N,{size:16}),"Download Progress File"]})}),e.jsxs("button",{onClick:j,className:"w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-2",children:[e.jsx(J,{size:16}),"Copy to Clipboard"]})]})]})]}),e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"bg-gray-50 dark:bg-gray-700 rounded-lg p-6",children:[e.jsx("h3",{className:"text-lg font-semibold text-gray-900 dark:text-white mb-4",children:"Import Progress"}),a?e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",children:"Paste Progress Data"}),e.jsx("textarea",{value:g,onChange:y=>d(y.target.value),placeholder:"Paste your progress data here...",className:"w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white h-32 resize-none"})]}),e.jsxs("div",{className:"flex gap-3",children:[e.jsx("button",{onClick:c,disabled:h||!g.trim(),className:"flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2",children:h?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"}),"Importing..."]}):e.jsxs(e.Fragment,{children:[e.jsx(G,{size:16}),"Import"]})}),e.jsx("button",{onClick:()=>{p(!1),d("")},className:"flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors",children:"Cancel"})]})]}):e.jsxs("div",{className:"space-y-4",children:[e.jsx("p",{className:"text-gray-600 dark:text-gray-300",children:"Restore your progress from a previously exported file or clipboard data."}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("button",{onClick:()=>p(!0),className:"w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-2",children:[e.jsx(M,{size:16}),"Import Progress Data"]}),e.jsxs("label",{className:"w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer",children:[e.jsx(M,{size:16}),"Upload Progress File",e.jsx("input",{type:"file",accept:".json",onChange:P,className:"hidden"})]})]})]})]}),e.jsx("div",{className:"bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4",children:e.jsxs("div",{className:"flex items-start gap-3",children:[e.jsx(X,{className:"text-yellow-600 dark:text-yellow-400 mt-1 flex-shrink-0",size:20}),e.jsxs("div",{children:[e.jsx("h4",{className:"font-medium text-yellow-800 dark:text-yellow-200 mb-1",children:"Important Notes"}),e.jsxs("ul",{className:"text-sm text-yellow-700 dark:text-yellow-300 space-y-1",children:[e.jsx("li",{children:"• Export your progress regularly to avoid losing your achievements"}),e.jsx("li",{children:"• Importing will replace your current progress completely"}),e.jsx("li",{children:"• Keep your progress files safe - they contain your learning history"}),e.jsx("li",{children:"• Progress files are stored locally and never sent to external servers"})]})]})]})}),e.jsxs("div",{className:"bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4",children:[e.jsx("h4",{className:"font-medium text-red-800 dark:text-red-200 mb-2",children:"Reset Progress"}),e.jsx("p",{className:"text-sm text-red-700 dark:text-red-300 mb-3",children:"This will permanently delete all your progress and achievements. Make sure to export your progress first!"}),e.jsx("button",{onClick:()=>{window.confirm("Are you sure you want to reset all progress? This action cannot be undone.")&&(m(),b("Progress reset","All progress has been cleared."))},className:"bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors text-sm",children:"Reset All Progress"})]})]})]})]})},_e=()=>{const[s,i]=r.useState(!1),[x,h]=r.useState(!1);return e.jsxs("div",{className:"p-4 sm:p-6 max-w-4xl mx-auto",children:[e.jsxs("div",{className:"mb-6",children:[e.jsx("h1",{className:"text-2xl font-bold text-gray-900 dark:text-white mb-2",children:"Progress & Certificates"}),e.jsx("p",{className:"text-gray-600 dark:text-gray-400",children:"View your achievements and download certificates for completed activities."})]}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6",children:[e.jsx("button",{onClick:()=>i(!0),className:"bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:border-teal-500 dark:hover:border-teal-500 transition-all shadow-sm hover:shadow-md text-left min-h-[120px] flex flex-col justify-between",children:e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center gap-3 mb-2",children:[e.jsx(z,{className:"text-teal-600 dark:text-teal-400",size:24}),e.jsx("h3",{className:"font-semibold text-gray-900 dark:text-white",children:"Certificates"})]}),e.jsx("p",{className:"text-sm text-gray-600 dark:text-gray-400",children:"Generate and download certificates for completed activities"})]})}),e.jsx("button",{onClick:()=>h(!0),className:"bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:border-teal-500 dark:hover:border-teal-500 transition-all shadow-sm hover:shadow-md text-left min-h-[120px] flex flex-col justify-between",children:e.jsxs("div",{children:[e.jsxs("div",{className:"flex items-center gap-3 mb-2",children:[e.jsx(N,{className:"text-teal-600 dark:text-teal-400",size:24}),e.jsx("h3",{className:"font-semibold text-gray-900 dark:text-white",children:"Export Progress"})]}),e.jsx("p",{className:"text-sm text-gray-600 dark:text-gray-400",children:"Export your learning progress as a JSON file"})]})})]}),s&&e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",children:e.jsxs("div",{className:"bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl relative",children:[e.jsx("button",{onClick:()=>i(!1),className:"absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 min-w-[44px] min-h-[44px] flex items-center justify-center",children:e.jsx(L,{size:20})}),e.jsxs("div",{className:"p-6",children:[e.jsx("h2",{className:"text-2xl font-bold mb-4 text-gray-900 dark:text-white",children:"Certificate Generator"}),e.jsx(je,{})]})]})}),x&&e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4",children:e.jsxs("div",{className:"bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl relative",children:[e.jsx("button",{onClick:()=>h(!1),className:"absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 min-w-[44px] min-h-[44px] flex items-center justify-center",children:e.jsx(L,{size:20})}),e.jsxs("div",{className:"p-6",children:[e.jsx("h2",{className:"text-2xl font-bold mb-4 text-gray-900 dark:text-white",children:"Export Progress"}),e.jsx(we,{onClose:()=>h(!1)})]})]})})]})},Me=()=>{const{theme:s,toggleTheme:i}=oe();return e.jsxs("div",{className:"p-4 sm:p-6 max-w-4xl mx-auto",children:[e.jsxs("div",{className:"mb-6",children:[e.jsx("h1",{className:"text-2xl font-bold text-gray-900 dark:text-white mb-2",children:"Settings"}),e.jsx("p",{className:"text-gray-600 dark:text-gray-400",children:"Manage your app preferences and access help resources."})]}),e.jsxs("div",{className:"space-y-4",children:[e.jsx("div",{className:"bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm",children:e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[s==="dark"?e.jsx(Z,{className:"text-teal-600 dark:text-teal-400",size:20}):e.jsx(ee,{className:"text-teal-600 dark:text-teal-400",size:20}),e.jsxs("div",{children:[e.jsx("h3",{className:"font-semibold text-gray-900 dark:text-white",children:"Theme"}),e.jsx("p",{className:"text-sm text-gray-600 dark:text-gray-400",children:s==="dark"?"Dark mode":"Light mode"})]})]}),e.jsxs("button",{onClick:i,className:"px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors min-h-[44px] font-medium",children:["Switch to ",s==="dark"?"Light":"Dark"]})]})}),e.jsxs("div",{className:"bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[e.jsx(te,{className:"text-teal-600 dark:text-teal-400",size:20}),e.jsx("h3",{className:"font-semibold text-gray-900 dark:text-white",children:"Privacy"})]}),e.jsx("p",{className:"text-sm text-gray-600 dark:text-gray-400 mb-4",children:"Your privacy is important to us. All data is stored locally on your device and is never shared with third parties."}),e.jsxs("a",{href:"https://www.pandagarde.com/privacy-policy",target:"_blank",rel:"noopener noreferrer",className:"text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-2 text-sm font-medium",children:["View Privacy Policy",e.jsx(S,{size:14})]})]}),e.jsxs("div",{className:"bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm",children:[e.jsxs("div",{className:"flex items-center gap-3 mb-4",children:[e.jsx(re,{className:"text-teal-600 dark:text-teal-400",size:20}),e.jsx("h3",{className:"font-semibold text-gray-900 dark:text-white",children:"Help & Support"})]}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("a",{href:"https://www.pandagarde.com/faq",target:"_blank",rel:"noopener noreferrer",className:"block text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-2 text-sm font-medium",children:["Frequently Asked Questions",e.jsx(S,{size:14})]}),e.jsxs("a",{href:"https://www.pandagarde.com/contact",target:"_blank",rel:"noopener noreferrer",className:"block text-teal-600 dark:text-teal-400 hover:underline flex items-center gap-2 text-sm font-medium",children:["Contact Support",e.jsx(S,{size:14})]})]})]})]})]})};export{Te as A,ze as D,Ee as K,_e as P,Me as S,v as _};
//# sourceMappingURL=app-screens-_0EESrUG.js.map
