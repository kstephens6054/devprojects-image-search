import { render } from '@testing-library/react';

import App from './App';
import { UnsplashSearchProvider } from './hooks/unsplash/search';

describe('App component', () => {
  it('renders the header', () => {
    const { getByText } = render(<App />, {
      wrapper: UnsplashSearchProvider
    });
    const headerElement = getByText(/unsplash/i);
    expect(headerElement).toBeInTheDocument();
  });
});
