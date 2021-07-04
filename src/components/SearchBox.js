import React, { useState } from 'react';
import { Input, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

function SearchBox({ onSearch, size }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event, data) => {
    console.log(`data keys = ${Object.keys(data)}`);
    console.log(`data.value = ${data.value}`);
    setSearchTerm(event.currentTarget.value);
  };

  const handleKeyDown = event => {
    if (event.key !== 'Enter') return;
    if (searchTerm === '') return;

    const inputElement = event.currentTarget;
    inputElement.blur();
    onSearch(searchTerm);
  };

  const handleClick = event => {
    onSearch(searchTerm);
  };

  const icon = (
    <Icon
      className="SearchBox__icon"
      name="search"
      onClick={handleClick}
      disabled={searchTerm === ''}
      inverted
      circular
      link
    />
  );

  return (
    <Input
      className="SearchBox"
      size={size}
      icon={icon}
      placeholder="Search..."
      value={searchTerm}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
}

SearchBox.propTypes = {
  onSearch: PropTypes.func.isRequired,
  size: PropTypes.oneOf(['mini', 'small', 'large', 'big', 'huge', 'massive'])
};

SearchBox.defaultProps = {
  size: 'small'
};

export default SearchBox;
