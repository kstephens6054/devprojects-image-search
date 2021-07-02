describe('Unsplash API Proxy setup', () => {
  let setupProxy, app;

  beforeAll(() => {
    process.env.UNSPLASH_API_URL = 'https://api.unsplash.com';
    process.env.UNSPLASH_API_KEY = 'SUPER_SECRET';
    process.env.USE_MOCK_DATA = false;

    setupProxy = require('./setupProxy');

    app = {
      get: jest.fn(),
      use: jest.fn()
    };
  });

  afterEach(() => {
    app.use.mockClear();
    app.get.mockClear();
  });

  it('should register the proxy routes through app.use', () => {
    setupProxy(app);
    const [path, proxy] = app.use.mock.calls[0];
    console.log(path, proxy);
    expect(app.use).toHaveBeenCalledTimes(1);
  });
});
