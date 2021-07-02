import React, { useState } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { UnsplashSearchProvider, useUnsplashSearch } from './search';

import axios from 'axios';
jest.mock('axios');

const Fixture = () => {
  const { search, photos, metadata, error, isLoading } = useUnsplashSearch();
  const [query, setQuery] = useState('');

  return (
    <div>
      <label>
        Query
        <input
          type="text"
          onChange={event => setQuery(event.target.value)}
          value={query}
        />
      </label>
      <button onClick={() => search({ query: query })}>Search</button>
      <div data-testid="photos">{JSON.stringify(photos)}</div>
      <div data-testid="metadata">{JSON.stringify(metadata)}</div>
      <div data-testid="error">{JSON.stringify(error)}</div>
      <div data-testid="isLoading">{JSON.stringify(isLoading)}</div>
    </div>
  );
};

const sleep = msDelay => new Promise(resolve => setTimeout(resolve, msDelay));

describe('Unsplash API search context', () => {
  const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();

  afterEach(() => {
    mockConsoleLog.mockClear();
  });

  afterAll(() => {
    mockConsoleLog.mockReset();
  });

  it('should initialize to a null state', () => {
    render(<Fixture query={null} />, { wrapper: UnsplashSearchProvider });

    expect(screen.getByTestId('photos')).toHaveTextContent('null');
    expect(screen.getByTestId('metadata')).toHaveTextContent('null');
    expect(screen.getByTestId('error')).toHaveTextContent('null');
    expect(screen.getByTestId('isLoading')).toHaveTextContent('false');
  });

  it('should call the API', async () => {
    const options = { params: { query: 'birds' } };

    axios.get.mockImplementationOnce(async () => {
      await sleep(100);
      return {
        status: 200,
        statusText: 'OK',
        data: {
          total: 0,
          total_pages: 0,
          results: []
        }
      };
    });

    render(<Fixture />, { wrapper: UnsplashSearchProvider });

    fireEvent.change(screen.getByLabelText(/query/i), {
      target: {
        value: options.params.query
      }
    });

    fireEvent.click(screen.getByText(/search/i));

    await waitFor(() =>
      expect(screen.getByTestId('isLoading')).toHaveTextContent('true')
    );

    await waitFor(() => {
      expect(screen.getByTestId('isLoading')).toHaveTextContent('false');
    });
  });

  it('should toggle the isLoading state', async () => {
    const options = { params: { query: 'birds' } };

    axios.get.mockImplementationOnce(async () => {
      await sleep(100);
      return {
        status: 200,
        statusText: 'OK',
        data: {
          total: 100,
          total_pages: 10,
          results: [
            { id: 'photo0001' },
            { id: 'photo0002' },
            { id: 'photo0003' }
          ]
        }
      };
    });

    render(<Fixture />, { wrapper: UnsplashSearchProvider });

    fireEvent.change(screen.getByLabelText(/query/i), {
      target: {
        value: options.params.query
      }
    });

    fireEvent.click(screen.getByText(/search/i));

    await waitFor(() =>
      expect(screen.getByTestId('isLoading')).toHaveTextContent('true')
    );

    await waitFor(() =>
      expect(screen.getByTestId('isLoading')).toHaveTextContent('false')
    );
  });

  it('should return the search results', async () => {
    const options = { params: { query: 'birds' } };
    const metadata = {
      total: 100,
      total_pages: 10
    };
    const photos = [
      { id: 'photo0001' },
      { id: 'photo0002' },
      { id: 'photo0003' }
    ];

    axios.get.mockImplementationOnce(async () => {
      await sleep(100);
      return {
        status: 200,
        statusText: 'OK',
        data: {
          total: metadata.total,
          total_pages: metadata.total_pages,
          results: photos
        }
      };
    });

    render(<Fixture />, { wrapper: UnsplashSearchProvider });

    fireEvent.change(screen.getByLabelText(/query/i), {
      target: {
        value: options.params.query
      }
    });

    fireEvent.click(screen.getByText(/search/i));

    await waitFor(() =>
      expect(screen.getByTestId('isLoading')).toHaveTextContent('true')
    );

    await waitFor(() => {
      expect(screen.getByTestId('isLoading')).toHaveTextContent('false');
      expect(screen.getByTestId('photos')).toHaveTextContent(
        JSON.stringify(photos)
      );
      expect(screen.getByTestId('metadata')).toHaveTextContent(
        JSON.stringify(metadata)
      );
      expect(screen.getByTestId('error')).toHaveTextContent('null');
    });
  });

  it('should handle errors', async () => {
    const options = { params: { query: 'birds' } };
    const error = new Error('Not found');
    error.response = {
      status: 404,
      statusText: 'Not found'
    };

    axios.get.mockImplementationOnce(async () => {
      await sleep(100);
      throw error;
    });

    render(<Fixture />, { wrapper: UnsplashSearchProvider });

    fireEvent.change(screen.getByLabelText(/query/i), {
      target: {
        value: options.params.query
      }
    });

    fireEvent.click(screen.getByText(/search/i));

    await waitFor(() =>
      expect(screen.getByTestId('isLoading')).toHaveTextContent('true')
    );

    await waitFor(() => {
      expect(screen.getByTestId('isLoading')).toHaveTextContent('false');
      expect(screen.getByTestId('photos')).toHaveTextContent('null');
      expect(screen.getByTestId('metadata')).toHaveTextContent('null');
      expect(screen.getByTestId('error')).toHaveTextContent(
        error.response.statusText
      );
    });
  });
});
