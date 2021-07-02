import { render, fireEvent, waitFor } from '@testing-library/react';

import SearchBox from './SearchBox';

describe('Photo SearchBox component', () => {
  const onSearch = jest.fn();

  afterEach(() => {
    onSearch.mockClear();
  });

  it('should render without crashing', () => {
    expect(() => render(<SearchBox onSearch={onSearch} />)).not.toThrow();
  });

  it('should render the input field', () => {
    const { getByPlaceholderText } = render(<SearchBox onSearch={onSearch} />);
    const inputElement = getByPlaceholderText(/^Search/i);
    expect(inputElement).toBeInTheDocument();
  });

  it('should render the search icon', () => {
    const { getByPlaceholderText } = render(<SearchBox onSearch={onSearch} />);
    const inputElement = getByPlaceholderText(/^Search/i);
    const iconElement = inputElement.nextSibling;
    expect(iconElement).toBeInTheDocument();
  });

  it('should accept text entry', async () => {
    const { getByPlaceholderText } = render(<SearchBox onSearch={onSearch} />);
    const inputElement = getByPlaceholderText(/^Search/i);
    const value = 'foobar';

    fireEvent.change(inputElement, { target: { value: value } });
    await waitFor(() => expect(inputElement.value).toBe(value));
  });

  it('should call onSearch when the enter key is pressed', async () => {
    const { getByPlaceholderText } = render(<SearchBox onSearch={onSearch} />);
    const inputElement = getByPlaceholderText(/^Search/i);
    const value = 'foobar';

    fireEvent.change(inputElement, { target: { value: value } });
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });

    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledTimes(1);
      expect(onSearch).toHaveBeenCalledWith(value);
    });
  });

  it('should ignore the enter key when blank', async () => {
    const { getByPlaceholderText } = render(<SearchBox onSearch={onSearch} />);
    const inputElement = getByPlaceholderText(/^Search/i);
    const value = 'foobar';

    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
    fireEvent.change(inputElement, { target: { value: value } });

    await waitFor(() => {
      expect(inputElement.value).toBe(value);
      expect(onSearch).not.toHaveBeenCalled();
    });
  });

  it('should call onSearch when the search icon is clicked', async () => {
    const { getByPlaceholderText } = render(<SearchBox onSearch={onSearch} />);
    const inputElement = getByPlaceholderText(/^Search/i);
    const iconElement = inputElement.nextSibling;
    const value = 'foobar';

    fireEvent.change(inputElement, { target: { value: value } });
    fireEvent.click(iconElement);

    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledTimes(1);
      expect(onSearch).toHaveBeenCalledWith(value);
    });
  });

  it('should disable the search icon when blank', () => {
    const { getByPlaceholderText } = render(<SearchBox onSearch={onSearch} />);
    const inputElement = getByPlaceholderText(/^Search/i);
    const iconElement = inputElement.nextSibling;

    expect(iconElement.classList).toContain('disabled');
  });

  it('should apply the size property', () => {
    const size = 'large';
    const { getByPlaceholderText } = render(
      <SearchBox onSearch={onSearch} size={size} />
    );
    const inputElement = getByPlaceholderText(/^Search/i);
    const parentElement = inputElement.parentElement;

    expect(parentElement.classList).toContain(size);
  });

  it('should use the small size by default', () => {
    const defaultSize = 'small';
    const { getByPlaceholderText } = render(<SearchBox onSearch={onSearch} />);
    const inputElement = getByPlaceholderText(/^Search/i);
    const parentElement = inputElement.parentElement;

    expect(parentElement.classList).toContain(defaultSize);
  });
});
