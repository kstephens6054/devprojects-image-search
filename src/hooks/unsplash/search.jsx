import React, { useContext, useEffect, useState } from 'react';
import getData from './apicall';

const unsplashSearchContext = React.createContext(null);
const useUnsplashSearch = () => useContext(unsplashSearchContext);

const UnsplashSearchProvider = ({ children }) => {
  const [query, setQuery] = useState(null);
  const [photos, setPhotos] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const search = query => {
    setQuery(query);
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);

      const response = await getData('/api/unsplash/search/photos', {
        params: query
      });

      if (response.error) {
        setPhotos(null);
        setMetadata(null);
        setError(response.error);
        setIsLoading(false);
        return;
      }

      setPhotos(response.data.results);
      setMetadata({
        total: response.data.total,
        total_pages: response.data.total_pages
      });
      setError(null);
      setIsLoading(false);
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  return (
    <unsplashSearchContext.Provider
      value={{
        search,
        photos,
        metadata,
        error,
        isLoading
      }}
    >
      {children}
    </unsplashSearchContext.Provider>
  );
};

export { UnsplashSearchProvider, useUnsplashSearch };
