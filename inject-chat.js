const fs = require('fs');
let html = fs.readFileSync('C:/Users/LUPE/.openclaw/workspace/proyectos/dario-rial/syscore-static/index.html', 'utf8');

// Chat CSS
const chatCSS = `
  .chat-toggle{position:fixed;bottom:100px;right:24px;width:56px;height:56px;background:linear-gradient(135deg,#6366f1,#a855f7,#06b6d4);border-radius:16px;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 32px rgba(99,102,241,0.4);transition:all 0.3s ease;z-index:999;}
  .chat-toggle:hover{transform:scale(1.1);}
  .chat-toggle svg{width:28px;height:28px;color:white;}
  .chat-window{position:fixed;bottom:180px;right:24px;width:380px;max-width:calc(100vw-48px);height:580px;max-height:calc(100vh-220px);background:rgba(15,23,42,0.97);backdrop-filter:blur(20px);border:1px solid rgba(99,102,241,0.3);border-radius:20px;display:none;flex-direction:column;overflow:hidden;z-index:999;box-shadow:0 24px 64px rgba(0,0,0,0.5);}
  .chat-window.open{display:flex;}
  .chat-header{padding:18px 20px;background:linear-gradient(135deg,#6366f1,#a855f7);display:flex;align-items:center;gap:12px;}
  .chat-header-icon{width:42px;height:42px;background:rgba(255,255,255,0.2);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:18px;}
  .chat-header-info h3{color:white;font-weight:700;font-size:14px;margin:0;}
  .chat-header-info span{color:rgba(255,255,255,0.7);font-size:11px;}
  .chat-close{margin-left:auto;background:rgba(255,255,255,0.15);border:none;border-radius:10px;width:34px;height:34px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background 0.2s;}
  .chat-close:hover{background:rgba(255,255,255,0.25);}
  .chat-close svg{width:16px;height:16px;color:white;}
  .chat-messages{flex:1;overflow-y:auto;padding:20px;display:flex;flex-direction:column;gap:14px;}
  .chat-messages::-webkit-scrollbar{width:4px;}
  .chat-messages::-webkit-scrollbar-thumb{background:rgba(99,102,241,0.4);border-radius:4px;}
  .chat-bubble-wrap{display:flex;gap:10px;align-items:flex-end;}
  .chat-bubble-wrap.user{flex-direction:row-reverse;}
  .chat-avatar{width:30px;height:30px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;font-weight:700;}
  .chat-avatar.bot{background:linear-gradient(135deg,#6366f1,#a855f7);color:white;}
  .chat-avatar.user{background:rgba(6,182,212,0.2);color:#06b6d4;}
  .chat-bubble{max-width:75%;padding:11px 15px;border-radius:14px;font-size:13px;line-height:1.5;}
  .chat-bubble.bot{background:rgba(30,41,59,0.9);color:#f1f5f9;border-bottom-left-radius:4px;}
  .chat-bubble.user{background:linear-gradient(135deg,#6366f1,#a855f7);color:white;border-bottom-right-radius:4px;}
  .chat-bubble.typing{display:flex;gap:4px;align-items:center;padding:16px 20px;}
  .chat-bubble.typing span{width:6px;height:6px;background:rgba(255,255,255,0.5);border-radius:50%;animation:typingDot 1.2s infinite;}
  .chat-bubble.typing span:nth-child(2){animation-delay:0.2s;}
  .chat-bubble.typing span:nth-child(3){animation-delay:0.4s;}
  @keyframes typingDot{0%,100%{transform:translateY(0);opacity:0.5;}50%{transform:translateY(-5px);opacity:1;}}
  .chat-quick-replies{display:flex;flex-wrap:wrap;gap:8px;padding:0 20px 16px;}
  .quick-reply{background:rgba(99,102,241,0.15);border:1px solid rgba(99,102,241,0.3);color:#a5b4fc;padding:8px 14px;border-radius:20px;font-size:12px;cursor:pointer;transition:all 0.2s;}
  .quick-reply:hover{background:rgba(99,102,241,0.3);color:white;}
  .chat-input-area{padding:14px 18px;background:rgba(15,23,42,0.8);border-top:1px solid rgba(99,102,241,0.15);display:flex;gap:10px;align-items:flex-end;}
  .chat-input{flex:1;background:rgba(30,41,59,0.8);border:1px solid rgba(99,102,241,0.2);border-radius:12px;padding:11px 15px;color:white;font-size:13px;resize:none;max-height:90px;font-family:Inter,sans-serif;outline:none;transition:border-color 0.2s;}
  .chat-input:focus{border-color:rgba(99,102,241,0.5);}
  .chat-input::placeholder{color:rgba(148,163,184,0.5);}
  .chat-send{width:42px;height:42px;background:linear-gradient(135deg,#6366f1,#a855f7);border-radius:12px;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s;flex-shrink:0;}
  .chat-send:hover{transform:scale(1.05);}
  .chat-send svg{width:17px;height:17px;color:white;}
  .chat-wa-cta{margin-top:4px;background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.3);border-radius:12px;padding:10px 14px;display:flex;align-items:center;gap:10px;cursor:pointer;text-decoration:none;transition:background 0.2s;}
  .chat-wa-cta:hover{background:rgba(34,197,94,0.2);}
  .chat-wa-cta span{font-size:12px;color:#86efac;}
  .chat-wa-cta strong{color:#22c55e;font-size:13px;}
  @media(max-width:500px){.chat-window{width:calc(100vw-32px);right:16px;bottom:160px;}.chat-toggle{bottom:90px;right:16px;}}
`;

// Chat HTML
const chatHTML = `
<!-- CHAT WIDGET -->
<button class=chat-toggle onclick=toggleChat() title="Chatear con asesor">
  <svg fill=none stroke=currentColor viewBox="0 0 24 24"><path stroke-linecap=round stroke-linejoin=round stroke-width=2 d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
</button>
<div class=chat-window id=chatWindow>
  <div class=chat-header>
    <div class=chat-header-icon>&#9670;</div>
    <div class=chat-header-info><h3>Asesor SysCoreTech</h3><span>Te ayuda a elegir el mejor servicio</span></div>
    <button class=chat-close onclick=toggleChat()>
      <svg fill=none stroke=currentColor viewBox="0 0 24 24"><path stroke-linecap=round stroke-linejoin=round stroke-width=2 d="M6 18L18 6M6 6l12 12"/></svg>
    </button>
  </div>
  <div class=chat-messages id=chatMessages>
    <div class="chat-bubble-wrap bot">
      <div class="chat-avatar bot">SC</div>
      <div class="chat-bubble bot">&#161;Hola! Soy el asistente virtual de <strong>SysCoreTech</strong>. Puedo ayudarte a encontrar el servicio tecnologico ideal. &#191;Que estas buscando?</div>
    </div>
  </div>
  <div class=chat-quick-replies id=quickReplies>
    <button class=quick-reply onclick="sendQR('¿Cuanto cuesta un sitio web?')">&#128187; Precio sitio web</button>
    <button class=quick-reply onclick="sendQR('Necesito una red para mi empresa')">&#127760; Redes corporativas</button>
    <button class=quick-reply onclick="sendQR('Quiero automatizar mi WhatsApp')">&#9889; Automatizacion</button>
    <button class=quick-reply onclick="sendQR('Necesito seguridad para mi red')">&#128274; Seguridad</button>
  </div>
  <div class=chat-input-area>
    <textarea class=chat-input id=chatInput rows=1 placeholder="Escribi tu mensaje..." onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();sendMsg()}"></textarea>
    <button class=chat-send onclick=sendMsg()>
      <svg fill=none stroke=currentColor viewBox="0 0 24 24"><path stroke-linecap=round stroke-linejoin=round stroke-width=2 d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
    </button>
  </div>
</div>
`;

// Chat JS
const chatJS = `
// CHAT WIDGET
let chatHist=[],chatOpen=false;
function toggleChat(){chatOpen=!chatOpen;document.getElementById('chatWindow').classList.toggle('open',chatOpen);}
function addBub(content,type){
  const w=document.createElement('div');w.className='chat-bubble-wrap '+type;
  const a=document.createElement('div');a.className='chat-avatar '+type;a.textContent=type==='bot'?'SC':'Tu';
  const b=document.createElement('div');b.className='chat-bubble '+type;b.innerHTML=content;
  w.appendChild(a);w.appendChild(b);document.getElementById('chatMessages').appendChild(w);
  document.getElementById('chatMessages').scrollTop=document.getElementById('chatMessages').scrollHeight;
}
function showTyping(){
  const w=document.createElement('div');w.id='typingBubble';w.className='chat-bubble-wrap bot';
  const a=document.createElement('div');a.className='chat-avatar bot';a.textContent='SC';
  const b=document.createElement('div');b.className='chat-bubble bot typing';
  b.innerHTML='<span></span><span></span><span></span>';
  w.appendChild(a);w.appendChild(b);document.getElementById('chatMessages').appendChild(w);
  document.getElementById('chatMessages').scrollTop=document.getElementById('chatMessages').scrollHeight;
}
function rmTyping(){const t=document.getElementById('typingBubble');if(t)t.remove();}
async function sendMsg(){
  const text=document.getElementById('chatInput').value.trim();
  if(!text)return;
  document.getElementById('chatInput').value='';document.getElementById('chatInput').style.height='auto';
  addBub(text,'user');chatHist.push({role:'user',content:text});showTyping();
  document.getElementById('quickReplies').style.display='none';
  try{
    const r=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:chatHist})});
    const d=await r.json();rmTyping();
    const reply=d.reply||'Para mas detalles, contacta a Dario por WhatsApp.';
    addBub(reply,'bot');chatHist.push({role:'assistant',content:reply});
    const cta=document.createElement('a');cta.href='https://wa.me/5493705000427?text=Hola%2C%20vengo%20del%20chat%20de%20SysCoreTech';
    cta.target='_blank';cta.className='chat-wa-cta';
    cta.innerHTML='<span>&#128241;</span><div><strong>&#191;Necesitas mas info?</strong><br><span>Escribinos por WhatsApp directo</span></div>';
    document.getElementById('chatMessages').appendChild(cta);
    document.getElementById('chatMessages').scrollTop=document.getElementById('chatMessages').scrollHeight;
  }catch(e){rmTyping();addBub('Ups, no pude conectar. Escribi directo a <strong>+54 9 3705 000427</strong>','bot');}
}
function sendQR(t){document.getElementById('chatInput').value=t;sendMsg();}
`;

// Find insertion points
const styleEnd = html.indexOf('</style>');
const scriptEnd = html.lastIndexOf('</script>');
const bodyEnd = html.lastIndexOf('</body>');

console.log('Style end:', styleEnd, 'Script end:', scriptEnd, 'Body end:', bodyEnd);

// Inject CSS before </style>
html = html.slice(0, styleEnd) + chatCSS + '\n' + html.slice(styleEnd);

// Re-find script and body positions after CSS injection
const newScriptEnd = html.lastIndexOf('</script>');
const newBodyEnd = html.lastIndexOf('</body>');

// Inject JS before </script>
html = html.slice(0, newScriptEnd) + chatJS + '\n' + html.slice(newScriptEnd);

// Inject HTML before </body>
const finalBodyEnd = html.lastIndexOf('</body>');
html = html.slice(0, finalBodyEnd) + chatHTML + '\n' + html.slice(finalBodyEnd);

fs.writeFileSync('C:/Users/LUPE/.openclaw/workspace/proyectos/dario-rial/syscore-static/index.html', html);
console.log('Done. New size:', html.length);