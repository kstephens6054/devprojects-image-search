import React from 'react';
import { Grid } from 'semantic-ui-react';

import PhotoCard from './PhotoCard';
import { unsplashPhotosPropType } from '../hooks/unsplash/propTypes';

const PhotoGrid = ({ photos }) => {
  return (
    <Grid columns={15} centered={true}>
      {photos.map(photo => (
        <Grid.Column key={photo.id} mobile={15} tablet={7} computer={5}>
          <PhotoCard photo={photo} />
        </Grid.Column>
      ))}
    </Grid>
  );
};

PhotoGrid.propTypes = {
  photos: unsplashPhotosPropType
};

export default PhotoGrid;
