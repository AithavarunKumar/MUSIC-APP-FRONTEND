import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar'; // Adjust the import path as necessary
import { fetchSongsByArtist, fetchSongsByGenre } from '../../services/SongService/songService';

// Mock the fetchSongsByArtist and fetchSongsByGenre functions
jest.mock('../../services/SongService/songService', () => ({
    fetchSongsByArtist: jest.fn(),
    fetchSongsByGenre: jest.fn(),
}));

describe('SearchBar Component', () => {
    const setExampleFeaturedSongs = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders without crashing', () => {
        render(<SearchBar setExampleFeaturedSongs={setExampleFeaturedSongs} />);
        expect(screen.getByPlaceholderText('Search for songs')).toBeInTheDocument();
    });
  
  

});
