import React from 'react';
import { Card, Image } from 'semantic-ui-react';

import { photoPropTypes } from './propTypes';

const PhotoCard = ({ photo }) => {
  return (
    <Card className="PhotoCard" fluid={true}>
      <Card.Content>
        <Card.Header className="PhotoCard__header">{photo.title}</Card.Header>
        <Image
          className="PhotoCard__image"
          src={photo.url}
          alt={photo.title}
          fluid={true}
        />
      </Card.Content>
      <Card.Content>
        <div className="PhotoCard__description">{photo.description}</div>
      </Card.Content>
      <Card.Content>
        <Card.Meta className="PhotoCard__credit">
          Photographer: {photo.credit}
        </Card.Meta>
      </Card.Content>
    </Card>
  );
};

PhotoCard.propTypes = {
  photo: photoPropTypes
};

export default PhotoCard;
