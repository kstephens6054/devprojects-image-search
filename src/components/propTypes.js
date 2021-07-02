import PropTypes from 'prop-types';

const photoPropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string,
  title: PropTypes.string,
  credit: PropTypes.string
});

const photosPropTypes = PropTypes.arrayOf(photoPropTypes).isRequired;

const searchBoxPropTypes = {
  onSearch: PropTypes.func.isRequired,
  size: PropTypes.string
};

export { photoPropTypes, photosPropTypes, searchBoxPropTypes };
