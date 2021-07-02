import React, { useContext, useEffect, useState } from 'react';
import getData from './apicall';

const unsplashRandomPhotosContext = React.createContext(null);
const useUnsplashRandomPhotos = () => useContext(unsplashRandomPhotosContext);

const UnsplashRandomPhotosProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadRandomPhoto = () => {
    setRefresh(true);
  };

  useEffect(() => {
    const fetchRandomPhoto = async () => {
      setIsLoading(true);

      const response = await getData(`/api/unsplash/photos/random`);

      if (response.error) {
        setPhoto(null);
        setError(response.error);
        setIsLoading(false);
        return;
      }

      setPhoto(response.data);
      setError(null);
      setIsLoading(false);
    };

    if (refresh) {
      fetchRandomPhoto();
      setRefresh(false);
    }
  }, [refresh]);

  return (
    <unsplashRandomPhotosContext.Provider
      value={{
        loadRandomPhoto,
        photo,
        error,
        isLoading
      }}
    >
      {children}
    </unsplashRandomPhotosContext.Provider>
  );
};

export { UnsplashRandomPhotosProvider, useUnsplashRandomPhotos };
