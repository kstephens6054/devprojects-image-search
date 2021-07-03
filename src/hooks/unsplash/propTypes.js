import PropTypes from 'prop-types';

const unsplashUserPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  updated_at: PropTypes.string,
  username: PropTypes.string,
  name: PropTypes.string,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  twitter_username: PropTypes.any,
  portfolio_url: PropTypes.string,
  bio: PropTypes.any,
  location: PropTypes.string,
  links: PropTypes.objectOf(PropTypes.string),
  profile_image: PropTypes.objectOf(PropTypes.string),
  instagram_username: PropTypes.string,
  total_collections: PropTypes.number,
  total_likes: PropTypes.number,
  total_photos: PropTypes.number,
  accepted_tos: PropTypes.bool,
  for_hire: PropTypes.bool
});

const unsplashPhotoPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  created_at: PropTypes.string,
  updated_at: PropTypes.string,
  promoted_at: PropTypes.string,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  color: PropTypes.string,
  blur_hash: PropTypes.string,
  description: PropTypes.string,
  alt_description: PropTypes.string,
  urls: PropTypes.objectOf(PropTypes.string),
  links: PropTypes.objectOf(PropTypes.string),
  categories: PropTypes.arrayOf(PropTypes.any),
  likes: PropTypes.number,
  liked_by_user: PropTypes.bool,
  current_user_collections: PropTypes.arrayOf(PropTypes.any),
  sponsorship: PropTypes.any,
  user: unsplashUserPropType.isRequired,
  tags: PropTypes.arrayOf(PropTypes.object)
});

const unsplashPhotosPropType = PropTypes.arrayOf(unsplashPhotoPropType);

export { unsplashPhotoPropType, unsplashPhotosPropType, unsplashUserPropType };
