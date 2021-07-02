import React, { useState } from 'react';
import { Input, Icon } from 'semantic-ui-react';

import { searchBoxPropTypes } from './propTypes';

function SearchBox({ onSearch, size }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = event => {
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
      size={size || 'small'}
      icon={icon}
      placeholder="Search..."
      value={searchTerm}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
    />
  );
}

SearchBox.propTypes = searchBoxPropTypes;

export default SearchBox;
