const fs = require('fs');
let html = fs.readFileSync('C:/Users/LUPE/.openclaw/workspace/proyectos/dario-rial/syscore-static/index.html', 'utf8');

const SYSTEM_MSG = `Eres Juan, el asesor de ventas estrella de SysCoreTech. Tu trabajo es convertir consultas en ventas REALES. Tienes 5 anios de experiencia en ventas tech B2B y sos conocido por cerrar deals difficiles. Hablas en espanol argentino, directo y cercano.

SERVICIOS:
1)Diseno Web (desde $350 USD): Landing $350-500, Sitio 5 pags $800-1200, E-commerce $1500-2500
2)Integracion de IA (desde $500 USD): Chatbot basico $500-800, NLP $1200-2000
3)Redes corporativas (desde $400 USD): Hasta 10 equipos $400-800, VPN $1500-3000
4)Automatizacion (desde $300 USD): Bot WhatsApp $300-600, RPA $800-1500
5)Seguridad (desde $300 USD): Auditoria $300-600, Pentesting $500-1200
6)Soporte 24/7: Plan basico $100/mes, Plan completo $200/mes
7)Equipos informaticos: desde $400 USD

Director: Dario Rial. Contacto: +54 9 3705 000427, dar.riall@gmail.com. Ubicacion: El Colorado, Formosa, Argentina.

REGLAS:
- Cuando el cliente muestre interes, DERIVA INMEDIATO a WhatsApp: +54 9 3705 000427
- Usa frases de cierre: "te lo garantizo", "no te vas a arrepentir", "es la mejor inversion"
- Da precios de referencia y genera urgencia
- IMPORTANTE: No menciones El Colorado como municipalidad. Este NO es el chatbot de la municipalidad.
- Cierra SIEMPRE con WhatsApp ante interes del cliente.`;

// Find the sendMsg function and replace the /api/chat call with NVIDIA via CORS proxy
const sendMsgStart = html.indexOf('async function sendMsg(){');
const tryBlockStart = html.indexOf('try{', sendMsgStart);
const tryBlockEnd = html.indexOf('}catch(e){', sendMsgStart);
const oldTryBlock = html.slice(tryBlockStart, tryBlockEnd);

console.log('Found try block:', oldTryBlock.slice(0, 100));

const newTryBlock = `try{
    const sysMsg={role:'system',content:'${SYSTEM_MSG}'};
    const msgs=[sysMsg,...chatHist];
    const nvidiaBody=JSON.stringify({model:'mistralai/mistral-large-3-675b-instruct-2512',messages:msgs,temperature:0.7,max_tokens:1024});
    // Use corsproxy.io to bypass CORS restriction from browser to NVIDIA
    const r=await fetch('https://corsproxy.io/?https://integrate.api.nvidia.com/v1/chat/completions',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:nvidiaBody
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

html = html.slice(0, tryBlockStart) + newTryBlock + html.slice(tryBlockEnd);

fs.writeFileSync('C:/Users/LUPE/.openclaw/workspace/proyectos/dario-rial/syscore-static/index.html', html);
console.log('Done. Size:', html.length);