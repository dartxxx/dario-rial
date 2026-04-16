const fs = require('fs');
let html = fs.readFileSync('C:/Users/LUPE/.openclaw/workspace/proyectos/dario-rial/syscore-static/index.html', 'utf8');

// Find sendMsg and replace NVIDIA call with Groq
const sendMsgStart = html.indexOf('async function sendMsg(){');
const sendMsgEnd = html.indexOf('}', html.indexOf('chatHist.push({role:', sendMsgStart)) + 1;

if (sendMsgStart === -1) {
  console.log('sendMsg not found');
  process.exit(1);
}

// Find the try block start within sendMsg
const tryStart = html.indexOf('try{', sendMsgStart);
const tryEnd = html.indexOf('}', html.indexOf('catch(e)', sendMsgStart));
const tryBlock = html.slice(tryStart, tryEnd + 1);

console.log('Found try block at', tryStart, '-', tryEnd);
console.log('Block preview:', tryBlock.slice(0, 200));

// Replace with Groq call
const groqCall = `try{
    const msgs=[{role:'system',content:'Eres Juan, asesor de ventas de SysCoreTech. Solo hablas español argentino, directo y cercano. Servicios: 1)Diseno Web (desde $350 USD), 2)Integracion de IA (desde $500 USD), 3)Redes corporativas (desde $400 USD), 4)Automatizacion (desde $300 USD), 5)Seguridad Informatica (desde $300 USD), 6)Soporte 24/7 ($200 USD/mes), 7)Gestion proyectos IT, 8)Equipos informaticos. Director:Dario Rial. Contacto: +54 9 3705 000427, dar.riall@gmail.com. IMPORTANTE: No menciones El Colorado como municipalidad. Cierra siempre con WhatsApp ante interes.'},...chatHist];
    const r=await fetch('https://api.groq.com/openai/v1/chat/completions',{
      method:'POST',
      headers:{'Authorization':'Bearer gsk_kuWgnMFhGZ7b0m0gKu9cM5E9','Content-Type':'application/json'},
      body:JSON.stringify({model:'mixtral-8x7b-32768',messages:msgs,temperature:0.7,max_tokens:1024})
    });
    const d=await r.json();rmTyping();
    const reply=(d.choices&&d.choices[0]&&d.choices[0].message&&d.choices[0].message.content)||'Juan esta fuori. Escribi a Dario: +54 9 3705 000427';
    addBub(reply,'bot');chatHist.push({role:'assistant',content:reply});
    const cta=document.createElement('a');cta.href='https://wa.me/5493705000427?text=Hola%2C%20vengo%20del%20chat%20de%20SysCoreTech';
    cta.target='_blank';cta.className='chat-wa-cta';
    cta.innerHTML='<span>&#128241;</span><div><strong>&#191;Necesitas mas info?</strong><br><span>Escribinos por WhatsApp directo</span></div>';
    document.getElementById('chatMessages').appendChild(cta);
    document.getElementById('chatMessages').scrollTop=document.getElementById('chatMessages').scrollHeight;
  }catch(e){rmTyping();addBub('Ups, no pude conectar. Escribi directo a <strong>+54 9 3705 000427</strong>','bot');}`;

html = html.slice(0, tryStart) + groqCall + html.slice(tryEnd + 1);

fs.writeFileSync('C:/Users/LUPE/.openclaw/workspace/proyectos/dario-rial/syscore-static/index.html', html);
console.log('Done');