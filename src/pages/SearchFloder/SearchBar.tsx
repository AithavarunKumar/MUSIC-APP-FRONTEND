import React, { useState, useEffect } from 'react';
import { fetchSongsByArtist, fetchSongsByGenre } from '../../services/SongService/songService';
import './SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import Modal from './ModalFilter';

interface SearchBarProps {
    setExampleFeaturedSongs: React.Dispatch<React.SetStateAction<Song[]>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ setExampleFeaturedSongs }) => {
    const [searchOption, setSearchOption] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [inputFocused, setInputFocused] = useState<boolean>(false);

    useEffect(() => {
        const handleSearch = async () => {
            if (searchQuery.trim() === '') {
                if (!inputFocused) { // Only show error if input is not focused
                    setErrorMessage('Please enter a search query.');
                }
                return;
            }
            setErrorMessage(''); // Clear previous error messages
            try {
                let data = [];
                if (searchOption === 'artist') {
                    if (!isValidArtistName(searchQuery)) {
                        setErrorMessage('Invalid character(s) entered. Please enter a valid artist name.');
                        return;
                    }
                    data = await fetchSongsByArtist(searchQuery.trim());
                } else if (searchOption === 'genre') {
                    data = await fetchSongsByGenre(searchQuery.trim());
                }

                setExampleFeaturedSongs(data);

                if (data.length === 0) {
                    setErrorMessage(`No songs found for ${searchQuery}`);
                }
            } catch (error) {
                console.error('Error fetching songs:', error);
                setErrorMessage(`No songs found for the entered ${searchOption} -- ${searchQuery}`);
            }
        };

        if (searchOption) {
            handleSearch();
        }
    }, [searchQuery, searchOption, setExampleFeaturedSongs, inputFocused]);

    const isValidArtistName = (name: string): boolean => {
        const regex = /^[a-zA-Z\s']+$/;
        return regex.test(name);
    };

    const handleSelectOption = (option: string) => {
        setSearchOption(option);
        setShowModal(false);
    };

    return (
        <div className="searchbar">
            <div className="search-input">
                <input
                    type="text"
                    id="searchBarInput"
                    placeholder="Search for songs"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setInputFocused(true)} // Set input as focused
                    onBlur={() => setInputFocused(false)} // Set input as blurred
                />
                <FontAwesomeIcon icon={faFilter} onClick={() => setShowModal(true)} className='fasFilter' />
            </div>
            {!inputFocused && errorMessage && <div className="error">{errorMessage}</div>}
            <Modal show={showModal} onClose={() => setShowModal(false)} onSelect={handleSelectOption} />
        </div>
    );
};

interface Song {
    title: string;
    artist: string;
    genre: string;
    likes: number;
}

export default SearchBar;
