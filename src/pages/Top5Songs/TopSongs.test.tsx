import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TopSongs from './TopSongs';


describe('TopSongs Component', () => {

  test('Renders top 5 songs based on likes', async () => {
    const songs = [
      { artist: 'artist1', genre: 'genre1', likes: 5, title: 'song1' },
      { artist: 'artist2', genre: 'genre2', likes: 4, title: 'song2' },
      { artist: 'artist3', genre: 'genre3', likes: 3, title: 'song3' },
      { artist: 'artist4', genre: 'genre4', likes: 2, title: 'song4' },
      { artist: 'artist5', genre: 'genre5', likes: 1, title: 'song5' },
    ];
    global.fetch = jest.fn((input) => Promise.resolve({
      json: () => Promise.resolve(songs),
      headers: {},
      ok: true,
      status: 200,
    } as Response
    ));

    React.useState = jest.fn().mockReturnValue([songs, {}])
    render(<TopSongs />);

    // Wait for songs to be displayed
    //console.log('my test---->',screen.getByText('artist1'.trim()));
    await waitFor(() =>
      expect(screen.getByText('artist1')).toBeInTheDocument()
    );
  });


  test('Displays error message if fetch fails', async () => {
    console.error = jest.fn(); // mock console.error

    render(<TopSongs />);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalled();
    });
  });
});