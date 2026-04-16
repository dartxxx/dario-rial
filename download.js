const https = require('https');
const fs = require('fs');

const url = 'https://raw.githubusercontent.com/dartxxx/dario-rial/1d231c5/syscore-static/index.html';
const file = fs.createWriteStream('C:/Users/LUPE/.openclaw/workspace/proyectos/dario-rial/syscore-static/index.html');

https.get(url, (res) => {
  console.log('Status:', res.statusCode);
  res.pipe(file);
  file.on('finish', () => {
    file.close();
    const content = fs.readFileSync('C:/Users/LUPE/.openclaw/workspace/proyectos/dario-rial/syscore-static/index.html', 'utf8');
    console.log('Size:', content.length);
    console.log('First 200:', content.slice(0, 200));
  });
}).on('error', (e) => {
  console.error('Error:', e.message);
  fs.unlinkSync('C:/Users/LUPE/.openclaw/workspace/proyectos/dario-rial/syscore-static/index.html');
});