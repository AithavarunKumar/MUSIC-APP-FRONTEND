import React, { useState } from 'react';
import './navBar.css'; // Assuming this is your navbar styling import
import SearchBar from '../SearchFloder/SearchBar'; // Importing SearchBar component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal'; // Import Modal component
import { Sidebar } from './sidebar';

interface Song {
    title: string;
    artist: string;
    genre: string;
    likes: number;
}

type NavProps = {
    links: string[];
    exampleFeaturedSongs: Song[];
    setExampleFeaturedSongs: React.Dispatch<React.SetStateAction<Song[]>>;
};

const Navbar: React.FC<NavProps> = ({ links, exampleFeaturedSongs, setExampleFeaturedSongs }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const openSidebar = () => {
        setIsSidebarOpen(true);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <nav className="nav-Container">
            <div className="nav-left">
                <FontAwesomeIcon icon={faBars} className='fasbars' onClick={openSidebar} />
                <img src="./Music-app-logo.png" id='main-image' alt="" />
                <h1 id='appTitle'>Song Sea</h1>
             
            </div>
            <div className="nav-right">
                <SearchBar setExampleFeaturedSongs={setExampleFeaturedSongs} />
            </div>
            <div className='Friends-icon'>
                <FontAwesomeIcon icon={faUserFriends} className='fasbars' />
                <a href="#" className='linksSignin-signup'>Friends</a>
            </div>
            <Modal className='model' isOpen={isSidebarOpen} onRequestClose={closeSidebar}>
                <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
            </Modal>
        </nav>
    );
};

export default Navbar;
