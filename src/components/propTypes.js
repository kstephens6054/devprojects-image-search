import PropTypes from 'prop-types';

const photoPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string,
  title: PropTypes.string,
  credit: PropTypes.string
});

const photosPropType = PropTypes.arrayOf(photoPropType).isRequired;

export { photoPropType, photosPropType };
