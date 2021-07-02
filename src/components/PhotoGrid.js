import React from 'react';
import { Grid } from 'semantic-ui-react';

import PhotoCard from './PhotoCard';
import { photosPropTypes } from './propTypes';

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

PhotoGrid.propTypes = photosPropTypes;

export default PhotoGrid;
