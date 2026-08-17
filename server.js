const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;
const ROOT = __dirname;
const REMOTE_URL = 'https://vibe-proxy-gqv4.onrender.com/v1/chat/completions';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon'
};

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(payload));
}

function readRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1e6) {
        req.destroy();
        reject(new Error('Request body too large'));
      }
    });

    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/api/chat') {
    try {
      const bodyText = await readRequestBody(req);
      const payload = bodyText ? JSON.parse(bodyText) : { model: 'class-chat-model', messages: [] };

      const response = await fetch(REMOTE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer sk-vibe-summer-2026'
        },
        body: JSON.stringify({
          model: payload.model || 'class-chat-model',
          messages: payload.messages || []
        })
      });

      const data = await response.json();

      if (!response.ok) {
        sendJson(res, response.status || 500, {
          error: data?.error || 'Proxy request failed',
          details: data
        });
        return;
      }

      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      });
      res.end(JSON.stringify(data));
    } catch (error) {
      console.error('Proxy error:', error);
      sendJson(res, 500, { error: 'Failed to process request', details: error.message });
    }
    return;
  }

  let requestedPath = req.url === '/' ? '/index.html' : req.url;
  requestedPath = decodeURIComponent(requestedPath);

  if (requestedPath.includes('..')) {
    sendJson(res, 400, { error: 'Invalid path' });
    return;
  }

  const filePath = path.join(ROOT, requestedPath.replace(/^\//, ''));

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Plant app proxy running at http://localhost:${PORT}`);
});
