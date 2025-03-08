# A Simple "googlevideo.com" Proxy

This is a simple proxy for googlevideo.com.

## Usage

To use this proxy, send requests to:

```
http://your-server:8080/?url=https://[...].googlevideo.com/videoplayback?...
```

The URL parameter should be a URL-encoded `googlevideo.com` URL.

## Deployment (Docker)

1. Clone the repository
   ```bash
   git clone https://github.com/projectytm/asgvp.git
   cd asgvp
   ```

2. Build and run using Docker Compose
   ```bash
   docker-compose up -d
   ```

This will build the Docker image and start the container in detached mode, with the server accessible on port 8080.

> **Note:** It is recommended to use a reverse proxy (e.g. Nginx) to handle HTTPS and rate limiting.

## Example Usage

In a client application, you would request the proxy by passing the `googlevideo.com` URL:

```javascript
const videoUrl = "https://[...].googlevideo.com/videoplayback?...";
const proxyUrl = `http://your-server:8080/?url=${encodeURIComponent(videoUrl)}`;

fetch(proxyUrl)
  .then(response => response.blob())
  .then(blob => {
    // Process the video data
  });
```

## Notes

- Only works with `googlevideo.com` domains.
- Spoofs the `Referer` and `Origin` headers to be `youtube.com`.
- Does not handle rate limiting or caching.
