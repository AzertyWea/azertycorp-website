import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const defaultRoot = path.resolve(here, '..');
const blockedPaths = new Set(['/content-engine.html', '/content-engine.js']);

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8'
};

function readRewrites(root) {
  const vercelPath = path.join(root, 'vercel.json');
  if (!fs.existsSync(vercelPath)) return [];
  const config = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));
  return config.rewrites || [];
}

function resolvePath(root, pathname) {
  const rewrites = readRewrites(root);
  let resolved = pathname === '/' ? '/index.html' : pathname;

  const rewrite = rewrites.find((item) => item.source === pathname);
  if (rewrite) resolved = rewrite.destination;

  if (blockedPaths.has(pathname) || blockedPaths.has(resolved)) return null;

  const absolute = path.resolve(root, `.${resolved}`);
  if (!absolute.startsWith(root + path.sep) && absolute !== root) return null;
  return absolute;
}

export function createStaticServer({ root = defaultRoot } = {}) {
  return http.createServer((req, res) => {
    const url = new URL(req.url || '/', 'http://localhost');
    let decoded;
    try { decoded = decodeURIComponent(url.pathname); } catch { decoded = url.pathname; }

    const filePath = resolvePath(root, decoded);
    if (!filePath || !fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      const fallback = path.join(root, '404.html');
      const body = fs.existsSync(fallback)
        ? fs.readFileSync(fallback)
        : Buffer.from('<!doctype html><title>404</title><h1>Not found</h1>');
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(body);
      return;
    }

    const extension = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': contentTypes[extension] || 'application/octet-stream',
      'Cache-Control': 'no-store'
    });
    fs.createReadStream(filePath).pipe(res);
  });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT || 4174);
  createStaticServer().listen(port, '127.0.0.1', () => {
    console.log(`AZERTYCORP static server listening on http://127.0.0.1:${port}`);
  });
}
