import React, { useContext, useEffect, useState } from 'react';
import getData from './apicall';

const unsplashPhotosContext = React.createContext(null);
const useUnsplashPhotos = () => useContext(unsplashPhotosContext);

const UnsplashPhotosProvider = ({ children }) => {
  const [photoID, setphotoID] = useState('');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadPhoto = id => {
    setphotoID(id);
  };

  useEffect(() => {
    const fetchPhoto = async () => {
      setIsLoading(true);

      const response = await getData(`/api/unsplash/photos/${photoID}`);

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

    if (photoID) {
      fetchPhoto();
    }
  }, [photoID]);

  return (
    <unsplashPhotosContext.Provider
      value={{
        loadPhoto,
        photo,
        error,
        isLoading
      }}
    >
      {children}
    </unsplashPhotosContext.Provider>
  );
};

export { UnsplashPhotosProvider, useUnsplashPhotos };
