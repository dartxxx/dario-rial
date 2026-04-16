const fs = require('fs');
let html = fs.readFileSync('C:/Users/LUPE/.openclaw/workspace/proyectos/dario-rial/syscore-static/index.html', 'utf8');
const key = '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';
html = html.replace("window._nvidiaKey", "'" + key + "'");
fs.writeFileSync('C:/Users/LUPE/.openclaw/workspace/proyectos/dario-rial/syscore-static/index.html', html);
console.log('OK, key injected');