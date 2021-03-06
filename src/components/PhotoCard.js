import React from 'react';
import { Card, Image } from 'semantic-ui-react';

import { unsplashPhotoPropType } from '../hooks/unsplash/propTypes';

const PhotoCard = ({ photo }) => {
  return (
    <Card className="PhotoCard" fluid={true}>
      <Card.Content>
        <Card.Header className="PhotoCard__header">
          {photo.alt_description}
        </Card.Header>
        <Image
          className="PhotoCard__image"
          src={photo.urls.small}
          alt={photo.alt_description}
          fluid={true}
        />
      </Card.Content>
      <Card.Content>
        <div className="PhotoCard__description">{photo.description}</div>
      </Card.Content>
      <Card.Content>
        <Card.Meta className="PhotoCard__credit">
          Photographer: {photo.user.name}
        </Card.Meta>
      </Card.Content>
    </Card>
  );
};

PhotoCard.propTypes = {
  photo: unsplashPhotoPropType
};

export default PhotoCard;
