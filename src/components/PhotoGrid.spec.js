import { render } from '@testing-library/react';

import PhotoGrid from './PhotoGrid';

describe('PhotoGrid component', () => {
  const testPhotos = [
    {
      id: 'photo001',
      width: 1280,
      height: 720,
      urls: { small: 'http://photos.example.com/photo001.png' },
      description: 'Yet another cat picture!',
      alt_description: 'Boots',
      user: {
        id: 'user001',
        name: 'Mr. Vittles'
      }
    },
    {
      id: 'photo002',
      width: 1280,
      height: 720,
      urls: { small: 'http://photos.example.com/photo002.png' },
      description: 'One more cat picture.',
      alt_description: 'Mittens',
      user: {
        id: 'user002',
        name: 'Dr. Snuffy'
      }
    },
    {
      id: 'photo003',
      width: 1280,
      height: 720,
      urls: { small: 'http://photos.example.com/photo003.png' },
      description: 'Thppt!',
      alt_description: 'Bill the Cat',
      user: {
        id: 'user003',
        name: 'Milo Bloom'
      }
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
      expect(getByText(photo.alt_description)).toBeInTheDocument();
      expect(getByText(photo.description)).toBeInTheDocument();
      expect(getByAltText(photo.alt_description)).toBeInTheDocument();
      expect(getByText(new RegExp(photo.user.name, 'i'))).toBeInTheDocument();
    });
  });
});
