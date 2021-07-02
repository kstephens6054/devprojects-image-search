import getData from './apicall';
import axios from 'axios';

jest.mock('axios');

describe('apicall module', () => {
  const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();

  afterEach(() => {
    mockConsoleLog.mockClear();
  });

  afterAll(() => {
    mockConsoleLog.mockReset();
  });

  it('should call the api', async () => {
    const url = '/search/photos';
    const options = {
      params: {
        query: 'birds'
      }
    };
    const data = 'Success';

    axios.get.mockImplementationOnce(() => {
      return Promise.resolve({
        status: 200,
        statusText: 'OK',
        data: data
      });
    });

    await getData(url, options);

    await expect(axios.get).toHaveBeenCalledTimes(1);
    await expect(axios.get).toHaveBeenCalledWith(url, options);
  });

  it('should return data on success', async () => {
    const url = '/search/photos';
    const options = {
      params: {
        query: 'birds'
      }
    };
    const data = 'Success';

    axios.get.mockImplementationOnce(() => {
      return Promise.resolve({
        status: 200,
        statusText: 'OK',
        data: data
      });
    });

    const response = await getData(url, options);

    await expect(response.data).toBe(data);
    await expect(response.error).toBe(null);
  });

  it('should return response errors', async () => {
    const url = '/search/photos';
    const options = {
      params: {
        query: 'birds'
      }
    };
    const status = 404;
    const statusText = 'Not found';

    axios.get.mockImplementationOnce(() => {
      const error = new Error('Axios mock error');
      error.response = {
        status,
        statusText,
        data: null
      };
      return Promise.reject(error);
    });

    const response = await getData(url, options);

    await expect(response.data).toBe(null);
    await expect(response.error).toBe(statusText);
  });

  it('should return request errors', async () => {
    const url = '/search/photos';
    const options = {
      params: {
        query: 'birds'
      }
    };
    const statusText = 'Bad request';

    axios.get.mockImplementationOnce(() => {
      const error = new Error('Axios mock error');
      error.request = {};

      return Promise.reject(error);
    });

    const response = await getData(url, options);

    await expect(mockConsoleLog).toHaveBeenCalledTimes(1);
    await expect(response.data).toBe(null);
    await expect(response.error).toBe(statusText);
  });

  it('should return generic errors', async () => {
    const url = '/search/photos';
    const options = {
      params: {
        query: 'birds'
      }
    };

    const statusText = 'Internal error';

    axios.get.mockImplementationOnce(() => {
      return Promise.reject(new Error('Axios mock error'));
    });

    const response = await getData(url, options);

    await expect(mockConsoleLog).toHaveBeenCalledTimes(1);
    await expect(response.data).toBe(null);
    await expect(response.error).toBe(statusText);
  });
});
