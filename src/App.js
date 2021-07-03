import React from 'react';
import { Container, Header } from 'semantic-ui-react';

import { useUnsplashSearch } from './hooks/unsplash/search';

import SearchBox from './components/SearchBox';
import PhotoGrid from './components/PhotoGrid';

import './App.css';

function App() {
  // { search, photos, metadata, error, isLoading }
  const { search, photos } = useUnsplashSearch();

  const onSearch = searchTerm => {
    search({ query: { query: searchTerm } });
  };

  return (
    <Container className="App">
      <Header>Unsplash Image Search</Header>
      <SearchBox onSearch={onSearch} size="large" />
      {photos && <PhotoGrid photos={photos} />}
    </Container>
  );
}

export default App;
