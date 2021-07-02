import { render } from '@testing-library/react';

import PhotoGrid from './PhotoGrid';

describe('PhotoGrid component', () => {
  const testPhotos = [
    {
      id: 'photo001',
      width: 1280,
      height: 720,
      url: 'http://photos.example.com/photo001.png',
      description: 'Yet another cat picture!',
      title: 'Boots',
      credit: 'Mr. Vittles'
    },
    {
      id: 'photo002',
      width: 1280,
      height: 720,
      url: 'http://photos.example.com/photo002.png',
      description: 'One more cat picture.',
      title: 'Mittens',
      credit: 'Dr. Snuffy'
    },
    {
      id: 'photo003',
      width: 1280,
      height: 720,
      url: 'http://photos.example.com/photo003.png',
      description: 'Thppt!',
      title: 'Bill the Cat',
      credit: 'Milo Bloom'
    }
  ];

  it('should render without crashing', () => {
    expect(() => render(<PhotoGrid photos={testPhotos} />)).not.toThrow();
  });

  it('should display all of the photo cards', () => {
    const { getByText, getByAltText } = render(
      <PhotoGrid photos={testPhotos} />
    );

    testPhotos.forEach(photo => {
      expect(getByText(photo.title)).toBeInTheDocument();
      expect(getByText(photo.description)).toBeInTheDocument();
      expect(getByAltText(photo.title)).toBeInTheDocument();
      expect(getByText(new RegExp(photo.credit, 'i'))).toBeInTheDocument();
    });
  });
});
