import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import {
  UnsplashRandomPhotosProvider,
  useUnsplashRandomPhotos
} from './randomPhotos';

import axios from 'axios';
jest.mock('axios');

const Fixture = () => {
  const { loadRandomPhoto, photo, error, isLoading } =
    useUnsplashRandomPhotos();

  return (
    <div>
      <button onClick={() => loadRandomPhoto()}>Load Random Photo</button>
      <div data-testid="photo">{JSON.stringify(photo)}</div>
      <div data-testid="error">{JSON.stringify(error)}</div>
      <div data-testid="isLoading">{JSON.stringify(isLoading)}</div>
    </div>
  );
};

const sleep = msDelay => new Promise(resolve => setTimeout(resolve, msDelay));

describe('Unsplash API photos context', () => {
  const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();

  afterEach(() => {
    mockConsoleLog.mockClear();
  });

  afterAll(() => {
    mockConsoleLog.mockReset();
  });

  it('should initialize to a null state', () => {
    render(<Fixture />, { wrapper: UnsplashRandomPhotosProvider });

    expect(screen.getByTestId('photo')).toHaveTextContent('null');
    expect(screen.getByTestId('error')).toHaveTextContent('null');
    expect(screen.getByTestId('isLoading')).toHaveTextContent('false');
  });

  it('should call the API', async () => {
    const photoID = 'photo001';

    axios.get.mockImplementationOnce(async () => {
      await sleep(100);
      return {
        status: 200,
        statusText: 'OK',
        data: {
          id: photoID
        }
      };
    });

    render(<Fixture />, { wrapper: UnsplashRandomPhotosProvider });

    fireEvent.click(screen.getByText(/load random photo/i));

    await waitFor(() =>
      expect(screen.getByTestId('isLoading')).toHaveTextContent('true')
    );

    await waitFor(() => {
      expect(screen.getByTestId('isLoading')).toHaveTextContent('false');
    });
  });

  it('should toggle the isLoading state', async () => {
    const photoID = 'photo001';

    axios.get.mockImplementationOnce(async () => {
      await sleep(100);
      return {
        status: 200,
        statusText: 'OK',
        data: {
          id: photoID
        }
      };
    });

    render(<Fixture />, { wrapper: UnsplashRandomPhotosProvider });

    fireEvent.click(screen.getByText(/load random photo/i));

    await waitFor(() =>
      expect(screen.getByTestId('isLoading')).toHaveTextContent('true')
    );

    await waitFor(() =>
      expect(screen.getByTestId('isLoading')).toHaveTextContent('false')
    );
  });

  it('should return the search results', async () => {
    const photoID = 'photo001';
    const result = { id: photoID };

    axios.get.mockImplementationOnce(async () => {
      await sleep(100);
      return {
        status: 200,
        statusText: 'OK',
        data: {
          id: photoID
        }
      };
    });

    render(<Fixture />, { wrapper: UnsplashRandomPhotosProvider });

    fireEvent.click(screen.getByText(/load random photo/i));

    await waitFor(() =>
      expect(screen.getByTestId('isLoading')).toHaveTextContent('true')
    );

    await waitFor(() => {
      expect(screen.getByTestId('isLoading')).toHaveTextContent('false');
      expect(screen.getByTestId('photo')).toHaveTextContent(
        JSON.stringify(result)
      );
      expect(screen.getByTestId('error')).toHaveTextContent('null');
    });
  });

  it('should handle errors', async () => {
    const error = new Error('Axios mock error');
    error.response = {
      status: 404,
      statusText: 'Not found'
    };

    axios.get.mockImplementationOnce(async () => {
      await sleep(100);
      throw error;
    });

    render(<Fixture />, { wrapper: UnsplashRandomPhotosProvider });

    fireEvent.click(screen.getByText(/load random photo/i));

    await waitFor(() =>
      expect(screen.getByTestId('isLoading')).toHaveTextContent('true')
    );

    await waitFor(() => {
      expect(screen.getByTestId('isLoading')).toHaveTextContent('false');
      expect(screen.getByTestId('photo')).toHaveTextContent('null');
      expect(screen.getByTestId('error')).toHaveTextContent(
        error.response.statusText
      );
    });
  });
});
