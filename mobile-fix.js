const fs = require('fs');
let html = fs.readFileSync('C:/Users/LUPE/.openclaw/workspace/proyectos/dario-rial/syscore-static/index.html', 'utf8');

// New mobile CSS
const mobileCSS = `
  .chat-toggle{position:fixed;bottom:24px;right:24px;width:54px;height:54px;background:linear-gradient(135deg,#6366f1,#a855f7,#06b6d4);border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 24px rgba(99,102,241,0.5);transition:all 0.3s ease;z-index:999;}
  .chat-toggle:hover{transform:scale(1.1);}
  .chat-toggle svg{width:26px;height:26px;color:white;}
  .chat-window{position:fixed;bottom:90px;right:16px;width:calc(100vw-32px);height:75vh;max-height:580px;background:rgba(15,23,42,0.98);backdrop-filter:blur(20px);border:1px solid rgba(99,102,241,0.3);border-radius:20px;display:none;flex-direction:column;overflow:hidden;z-index:999;box-shadow:0 20px 60px rgba(0,0,0,0.6);}
  .chat-window.open{display:flex;}
  .chat-header{padding:16px 18px;background:linear-gradient(135deg,#6366f1,#a855f7);display:flex;align-items:center;gap:10px;flex-shrink:0;}
  .chat-header-icon{width:38px;height:38px;background:rgba(255,255,255,0.2);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:16px;}
  .chat-header-info h3{color:white;font-weight:700;font-size:13px;margin:0;}
  .chat-header-info span{color:rgba(255,255,255,0.7);font-size:10px;}
  .chat-close{margin-left:auto;background:rgba(255,255,255,0.15);border:none;border-radius:8px;width:32px;height:32px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background 0.2s;}
  .chat-close:hover{background:rgba(255,255,255,0.25);}
  .chat-close svg{width:15px;height:15px;color:white;}
  .chat-messages{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px;}
  .chat-messages::-webkit-scrollbar{width:3px;}
  .chat-messages::-webkit-scrollbar-thumb{background:rgba(99,102,241,0.4);border-radius:4px;}
  .chat-bubble-wrap{display:flex;gap:8px;align-items:flex-end;}
  .chat-bubble-wrap.user{flex-direction:row-reverse;}
  .chat-avatar{width:28px;height:28px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:11px;flex-shrink:0;font-weight:700;}
  .chat-avatar.bot{background:linear-gradient(135deg,#6366f1,#a855f7);color:white;}
  .chat-avatar.user{background:rgba(6,182,212,0.2);color:#06b6d4;}
  .chat-bubble{max-width:80%;padding:10px 14px;border-radius:14px;font-size:13px;line-height:1.5;}
  .chat-bubble.bot{background:rgba(30,41,59,0.9);color:#f1f5f9;border-bottom-left-radius:4px;}
  .chat-bubble.user{background:linear-gradient(135deg,#6366f1,#a855f7);color:white;border-bottom-right-radius:4px;}
  .chat-bubble.typing{display:flex;gap:4px;align-items:center;padding:14px 18px;}
  .chat-bubble.typing span{width:5px;height:5px;background:rgba(255,255,255,0.5);border-radius:50%;animation:typingDot 1.2s infinite;}
  .chat-bubble.typing span:nth-child(2){animation-delay:0.2s;}
  .chat-bubble.typing span:nth-child(3){animation-delay:0.4s;}
  @keyframes typingDot{0%,100%{transform:translateY(0);opacity:0.5;}50%{transform:translateY(-4px);opacity:1;}}
  .chat-quick-replies{display:flex;flex-wrap:nowrap;overflow-x:auto;gap:6px;padding:0 16px 12px;scrollbar-width:none;}
  .chat-quick-replies::-webkit-scrollbar{display:none;}
  .quick-reply{background:rgba(99,102,241,0.15);border:1px solid rgba(99,102,241,0.3);color:#a5b4fc;padding:7px 12px;border-radius:20px;font-size:11px;cursor:pointer;transition:all 0.2s;white-space:nowrap;}
  .quick-reply:hover{background:rgba(99,102,241,0.3);color:white;}
  .chat-input-area{padding:12px 16px;background:rgba(15,23,42,0.8);border-top:1px solid rgba(99,102,241,0.15);display:flex;gap:8px;align-items:flex-end;flex-shrink:0;}
  .chat-input{flex:1;background:rgba(30,41,59,0.8);border:1px solid rgba(99,102,241,0.2);border-radius:12px;padding:10px 14px;color:white;font-size:13px;resize:none;max-height:80px;font-family:Inter,sans-serif;outline:none;transition:border-color 0.2s;}
  .chat-input:focus{border-color:rgba(99,102,241,0.5);}
  .chat-input::placeholder{color:rgba(148,163,184,0.5);}
  .chat-send{width:40px;height:40px;background:linear-gradient(135deg,#6366f1,#a855f7);border-radius:12px;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.2s;flex-shrink:0;}
  .chat-send:hover{transform:scale(1.05);}
  .chat-send svg{width:16px;height:16px;color:white;}
  .chat-wa-cta{margin-top:4px;background:rgba(34,197,94,0.1);border:1px solid rgba(34,197,94,0.3);border-radius:12px;padding:10px 14px;display:flex;align-items:center;gap:10px;cursor:pointer;text-decoration:none;transition:background 0.2s;}
  .chat-wa-cta:hover{background:rgba(34,197,94,0.2);}
  .chat-wa-cta span{font-size:12px;color:#86efac;}
  .chat-wa-cta strong{color:#22c55e;font-size:12px;}
  @media(max-width:500px){.chat-window{right:12px;bottom:86px;width:calc(100vw-24px);height:70vh;}.chat-toggle{bottom:20px;right:16px;width:50px;height:50px;}}
`;

// Find the old chat CSS and replace it
const oldCSSStart = html.indexOf('  .chat-toggle{position:fixed;bottom:100px;right:24px;');
const oldCSSEnd = html.indexOf('  @media(max-width:500px){.chat-window{width:calc(100vw-32px);right:16px;bottom:160px;}.chat-toggle{bottom:90px;right:16px;}}') + '  @media(max-width:500px){.chat-window{width:calc(100vw-32px);right:16px;bottom:160px;}.chat-toggle{bottom:90px;right:16px;}}'.length;

if (oldCSSStart !== -1) {
  html = html.slice(0, oldCSSStart) + mobileCSS + '\n' + html.slice(oldCSSEnd);
  console.log('CSS replaced');
} else {
  console.log('Old CSS not found at:', oldCSSStart);
  // Try to find any existing chat CSS
  const idx = html.indexOf('.chat-toggle{position:fixed');
  console.log('chat-toggle found at:', idx);
  const idx2 = html.indexOf('@media(max-width:500px)');
  console.log('mobile media found at:', idx2);
}

// Move chat widget HTML to right before </body>
const oldChatHTML = `<button class=chat-toggle onclick=toggleChat() title="Chatear con asesor">`;
const bodyEnd = html.lastIndexOf('</body>');
console.log('body end at:', bodyEnd);

// Also fix the sendMsg function - change NVIDIA call to use CORS proxy approach
// For now just commit the mobile fix
fs.writeFileSync('C:/Users/LUPE/.openclaw/workspace/proyectos/dario-rial/syscore-static/index.html', html);
console.log('Mobile fix saved. Size:', html.length);