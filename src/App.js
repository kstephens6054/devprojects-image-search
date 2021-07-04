import React from 'react';
import { Container, Header, Segment } from 'semantic-ui-react';

import { useUnsplashSearch } from './hooks/unsplash/search';

import SearchBox from './components/SearchBox';
import PhotoGrid from './components/PhotoGrid';

import './App.less';

function App() {
  // { search, photos, metadata, error, isLoading }
  const { search, photos } = useUnsplashSearch();

  const onSearch = searchTerm => {
    search({ query: { query: searchTerm } });
  };

  return (
    <Container className="App">
      <Header as="h1">Unsplash Image Search</Header>
      <SearchBox onSearch={onSearch} size="large" />
      {photos && (
        <Segment>
          <PhotoGrid photos={photos} />
        </Segment>
      )}
    </Container>
  );
}

export default App;
