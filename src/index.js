import React from 'react';
import ReactDOM from 'react-dom';

import { UnsplashSearchProvider } from './hooks/unsplash/search';
import { UnsplashPhotosProvider } from './hooks/unsplash/photos';
import { UnsplashRandomPhotosProvider } from './hooks/unsplash/randomPhotos';

import App from './App';
import reportWebVitals from './reportWebVitals';

import 'semantic-ui-less/semantic.less';

ReactDOM.render(
  <React.StrictMode>
    <UnsplashSearchProvider>
      <UnsplashPhotosProvider>
        <UnsplashRandomPhotosProvider>
          <App />
        </UnsplashRandomPhotosProvider>
      </UnsplashPhotosProvider>
    </UnsplashSearchProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
