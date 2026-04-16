const fs = require('fs');
let html = fs.readFileSync('C:/Users/LUPE/.openclaw/workspace/proyectos/dario-rial/syscore-static/index.html', 'utf8');

// Replace the NVIDIA direct call with /api/chat backend call
const oldSendMsg = `async function sendMsg(){
  const text=document.getElementById('chatInput').value.trim();
  if(!text)return;
  document.getElementById('chatInput').value='';document.getElementById('chatInput').style.height='auto';
  addBub(text,'user');chatHist.push({role:'user',content:text});showTyping();
  document.getElementById('quickReplies').style.display='none';
  try{
    const sysMsg={role:'system',content:'Eres el asistente virtual de ventas de SysCoreTech. Solo hablas español. Servicios: 1)Integracion de IA (chatbots,NLP,ML),2)Redes LAN/WAN certificadas UTN,3)Diseno Web (responsivo,e-commerce,SEO),4)Automatizacion (WhatsApp bots,RPA,Zapier),5)Gestion de Proyectos IT (Scrum,Kanban),6)Seguridad Informatica (auditoria,pentesting,firewall),7)Soporte Tecnico 24/7 (1h respuesta,99.9% uptime),8)Equipos informaticos. Director:Dario Rial. Contacto: +54 9 3705 000427, dar.riall@gmail.com. IMPORTANTE: No menciones El Colorado como municipalidad ni tramites municipales. Este NO es el chatbot de la municipalidad. Deriva a WhatsApp para cotizaciones y temas complejos.'};
    const msgs=[sysMsg,...chatHist];
    const r=await fetch('https://integrate.api.nvidia.com/v1/chat/completions',{
      method:'POST',
      headers:{'Authorization':'Bearer '+window._nvidiaKey,'Content-Type':'application/json'},
      body:JSON.stringify({model:'mistralai/mistral-large-3-675b-instruct-2512',messages:msgs,temperature:0.7,max_tokens:1024})
    });
    const d=await r.json();rmTyping();
    const reply=(d.choices&&d.choices[0]&&d.choices[0].message&&d.choices[0].message.content)||'Para mas detalles, contacta a Dario por WhatsApp.';
    addBub(reply,'bot');chatHist.push({role:'assistant',content:reply});
    const cta=document.createElement('a');cta.href='https://wa.me/5493705000427?text=Hola%2C%20vengo%20del%20chat%20de%20SysCoreTech';
    cta.target='_blank';cta.className='chat-wa-cta';
    cta.innerHTML='<span>&#128241;</span><div><strong>&#191;Necesitas mas info?</strong><br><span>Escribinos por WhatsApp directo</span></div>';
    document.getElementById('chatMessages').appendChild(cta);
    document.getElementById('chatMessages').scrollTop=document.getElementById('chatMessages').scrollHeight;
  }catch(e){rmTyping();addBub('Ups, no pude conectar. Escribi directo a <strong>+54 9 3705 000427</strong>','bot');}
}`;

const newSendMsg = `async function sendMsg(){
  const text=document.getElementById('chatInput').value.trim();
  if(!text)return;
  document.getElementById('chatInput').value='';document.getElementById('chatInput').style.height='auto';
  addBub(text,'user');chatHist.push({role:'user',content:text});showTyping();
  document.getElementById('quickReplies').style.display='none';
  try{
    const r=await fetch('/api/chat',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({messages:chatHist})
    });
    const d=await r.json();rmTyping();
    const reply=d.reply||'Juan esta fuori de oficina. Escribile a Dario: +54 9 3705 000427';
    addBub(reply,'bot');chatHist.push({role:'assistant',content:reply});
    const cta=document.createElement('a');cta.href='https://wa.me/5493705000427?text=Hola%2C%20vengo%20del%20chat%20de%20SysCoreTech';
    cta.target='_blank';cta.className='chat-wa-cta';
    cta.innerHTML='<span>&#128241;</span><div><strong>&#191;Necesitas mas info?</strong><br><span>Escribinos por WhatsApp directo</span></div>';
    document.getElementById('chatMessages').appendChild(cta);
    document.getElementById('chatMessages').scrollTop=document.getElementById('chatMessages').scrollHeight;
  }catch(e){rmTyping();addBub('Ups, no pude conectar. Escribi directo a <strong>+54 9 3705 000427</strong>','bot');}
}`;

if (html.includes(oldSendMsg)) {
  html = html.replace(oldSendMsg, newSendMsg);
  console.log('Replaced sendMsg OK');
} else {
  console.log('sendMsg NOT FOUND');
  const idx = html.indexOf('integrate.api.nvidia.com');
  console.log('NVIDIA URL at:', idx);
  const idx2 = html.indexOf("'Bearer '+window._nvidiaKey");
  console.log('Bearer key at:', idx2);
}

fs.writeFileSync('C:/Users/LUPE/.openclaw/workspace/proyectos/dario-rial/syscore-static/index.html', html);
console.log('Saved');