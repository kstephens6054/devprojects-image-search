import { render } from '@testing-library/react';

import PhotoCard from './PhotoCard';

describe('PhotoCard component', () => {
  const testPhoto = {
    id: 'photo001',
    width: 1280,
    height: 720,
    urls: { small: 'http://photos.example.com/photo001.png' },
    description: 'Yet another cat picture!',
    title: 'Boots',
    credit: 'Mr. Vittles'
  };

  it('should render without crashing', () => {
    expect(() => render(<PhotoCard photo={testPhoto} />)).not.toThrow();
  });

  it('should render the photo', () => {
    const { getByAltText } = render(<PhotoCard photo={testPhoto} />);
    const imageElement = getByAltText(testPhoto.title);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.src).toBe(testPhoto.urls.small);
    expect(imageElement.classList).toContain('PhotoCard__image');
  });

  it('should render the title', () => {
    const { getByText } = render(<PhotoCard photo={testPhoto} />);
    const titleElement = getByText(testPhoto.title);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.classList).toContain('PhotoCard__header');
  });

  it('should render the description', () => {
    const { getByText } = render(<PhotoCard photo={testPhoto} />);
    const descriptionElement = getByText(testPhoto.description);
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement.classList).toContain('PhotoCard__description');
  });

  it('should render the photo credits', () => {
    const { getByText } = render(<PhotoCard photo={testPhoto} />);
    const creditElement = getByText(new RegExp(testPhoto.credit, 'i'));
    expect(creditElement).toBeInTheDocument();
    expect(creditElement.classList).toContain('PhotoCard__credit');
  });
});
