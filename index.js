const http = require('http');

const server = http.createServer(async (req, res) => {
  try {
    if (!req.url.startsWith('/?url=')) {
      res.writeHead(307, 'Temporary Redirect', {
        'location': 'https://github.com/projectytm/asgvp/tree/main'
      });
      return res.end();
    }
  
    const uri = new URL('http://localhost:8080' + req.url);
    const headers = req.headers;
    const proxying = uri.searchParams.get('url');
  
    if (!(new URL(proxying).hostname).endsWith('googlevideo.com')) {
      res.writeHead(418);
      return res.end('You may want to use me~~ow~~~~~~ as an any proxy server, but I\'m a tea pot. :3');
    }
  
    const reqq = new Request(decodeURIComponent(proxying));
    for (const [key, value] of Object.entries(headers)) {
      reqq.headers.set(key, value);
    }
    reqq.headers.set('Origin', 'https://www.youtube.com/');
    reqq.headers.set('Referer', 'https://www.youtube.com/');

    const f = await fetch(reqq);
    const data = await f.arrayBuffer();
  
    const resH = new Headers();
    const contentLength = f.headers.get('Content-Length');
    if (contentLength) resH.set('Content-Length', contentLength);
    const contentType = f.headers.get('Content-Type');
    if (contentType) resH.set('Content-Type', contentType);
    const contentDisposition = f.headers.get('Content-Disposition');
    if (contentDisposition) resH.set('Content-Disposition', contentDisposition);
    const acceptRanges = f.headers.get('Accept-Ranges');
    if (acceptRanges) resH.set('Accept-Ranges', acceptRanges);
    const contentRange = f.headers.get('Content-Range');
    if (contentRange) resH.set('Content-Range', contentRange);
    
    resH.set('Cache-Control', 'no-cache'/*'private, max-age=21298'*/);

    resH.set('Access-Control-Allow-Origin', '*');
    resH.set('Access-Control-Allow-Headers', '*');
    resH.set('Access-Control-Allow-Methods', '*');
    resH.set('Access-Control-Allow-Credentials', 'true');
  
    res.setHeaders(resH);
  
    if (!f.ok) {
      res.statusCode = f.status;
      res.statusMessage = f.statusText;
  
      return res.end();
    }
  
    res.end(Buffer.from(data));
  } catch (e) {
    res.writeHead(500);
    res.end(e.stack);
  }
});

server.listen(8080, () => {
  console.log('Server is running on http://localhost:8080');
});