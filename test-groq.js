const https = require('https');
const data = JSON.stringify({
  model: 'mixtral-8x7b-32768',
  messages: [{ role: 'user', content: 'Responde solo HOLA en una palabra' }],
  max_tokens: 10
});
const req = https.request({
  hostname: 'api.groq.com',
  path: '/openai/v1/chat/completions',
  method: 'POST',
  headers: {
    'Authorization': 'Bearer gsk_test',
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}, res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => console.log('Status:', res.statusCode, 'Response:', d.slice(0, 400)));
});
req.on('error', e => console.error(e));
req.write(data);
req.end();