describe('Mock API Proxy setup', () => {
  let setupProxy, app;

  beforeAll(() => {
    process.env.USE_MOCK_DATA = true;
    setupProxy = require('./setupProxy');

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

  it('should register the proxy routes through app.get', () => {
    setupProxy(app);
    expect(app.get).toHaveBeenCalledTimes(3);
  });
});
