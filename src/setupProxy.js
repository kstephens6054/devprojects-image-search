const { createProxyMiddleware } = require('http-proxy-middleware');

const unsplashAPIProxy = app => {
  const proxyOptions = {
    target: process.env.UNSPLASH_API_URL,
    changeOrigin: true,
    pathRewrite: {
      '^/api/unsplash': ''
    },
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_API_KEY}`
    }
  };

  app.use('/api/unsplash', createProxyMiddleware(proxyOptions));
};

const mockAPIProxy = app => {
  app.get('/api/unsplash/search/photos', (req, res) => {
    res.sendFile(__dirname + '/mock-data/search.json');
  });

  app.get('/api/unsplash/photos/random', (req, res) => {
    res.sendFile(__dirname + '/mock-data/randomphotos.json');
  });

  app.get('/api/unsplash/photos/:photoID', (req, res) => {
    res.sendFile(__dirname + '/mock-data/photos.json');
  });
};

const useMockData =
  process.env.USE_MOCK_DATA &&
  process.env.USE_MOCK_DATA.toLowerCase() === 'true';

module.exports = useMockData ? mockAPIProxy : unsplashAPIProxy;
