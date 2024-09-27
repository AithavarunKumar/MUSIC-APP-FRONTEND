import './songs.css';
import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import TopSongs from '../Top5Songs/TopSongs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPlay } from '@fortawesome/free-solid-svg-icons';
import { AllSongs } from '../../services/SongService/songService';
import Navbar from '../navBarFloder/navBar';

interface Song {
    title: string;
    artist: string;
    genre: string;
    likes: number;
    imageUrl?: string;
}

interface MyPlaylistSongsProps {
    songTitle: string;
    Featured: Song[];
}

interface FeaturedSongsProps {
    title: string;
    genre: string;
    artist: string;
    likes: number;
    imageUrl?: string;
}

const FeaturedSongs: React.FC<FeaturedSongsProps> = ({ title, genre, artist, likes, imageUrl }) => {
    return (
        <div className="song-content">
            <div id="imagediv">
                <img src={imageUrl || "default-image.png"} alt="" id='song-image' />
                <p className='playIcon'><FontAwesomeIcon icon={faPlay} /></p>
            </div>
            <div className="styled-table">
                <p className='artistTitle'>{artist}</p>
                <p className='topsongspara'>{genre} <FontAwesomeIcon icon={faHeart} />{likes}</p>
                <p className='topsongspara'>{title}</p>
            </div>
        </div>
    );
};

const itemsPerPageDesktop = 6; // Items per page for desktop
const itemsPerPageMobile = 4; // Items per page for mobile

const MyPlaylistSongs: React.FC<MyPlaylistSongsProps> = ({ songTitle, Featured }) => {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [itemsPerPage, setItemsPerPage] = useState<number>(itemsPerPageDesktop);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 900) {
                setItemsPerPage(itemsPerPageMobile);
            } else {
                setItemsPerPage(itemsPerPageDesktop);
            }
        }
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handlePageClick = (data: { selected: number }) => {
        setCurrentPage(data.selected);
    };

    const getSlicedFeatured = () => {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return Featured.slice(startIndex, endIndex);
    };

    const slicedFeatured = getSlicedFeatured();

    return (
        <div className='songs-container'>
            <p id='songTitlePara'>{songTitle}</p>
            <div className="song-list">
                {slicedFeatured.map((song, index) => (
                    <FeaturedSongs
                        key={index}
                        title={song.title}
                        artist={song.artist}
                        genre={song.genre}
                        likes={song.likes}
                        imageUrl={song.imageUrl} // Pass the imageUrl here
                    />
                ))}
            </div>
            <ReactPaginate
                pageCount={Math.ceil(Featured.length / itemsPerPage)}
                onPageChange={handlePageClick}
                containerClassName="pagination"
                forcePage={currentPage}
                disableInitialCallback={true}
                previousLabel={'<<'}
                nextLabel={'>>'}
                breakLabel={null}
                pageRangeDisplayed={0}
                marginPagesDisplayed={0}
            />
        </div>
    );
};

const Songs: React.FC = () => {
    const [exampleFeaturedSongs, setExampleFeaturedSongs] = useState<Song[]>([]);

    useEffect(() => {
        viewAllSongs();
    }, []);

    const viewAllSongs = async () => {
        try {
            const data: Song[] = await AllSongs();
            const images: string[] = [
                "song8.png",
                "song9.png",
                "song7.png",
                "song11.png",
                "song12.png",
                "song13.png",
                "song14.png",
                "song15.png",
                "song16.png",
                "song17.png",

            ];

            // Attach images to the fetched songs
            const songsWithImages = data.map((song, index): Song => ({
                ...song,
                imageUrl: images[index % images.length],
            }));

            setExampleFeaturedSongs(songsWithImages);
        } catch (error) {
            console.error('Failed to fetch songs', error);
        }
    };

    return (
        <section id='sectioncolor'>
            <div id="allSongs">
                <Navbar links={[]} setExampleFeaturedSongs={setExampleFeaturedSongs} exampleFeaturedSongs={exampleFeaturedSongs} />
                <div className='topSongsContainer'>
                    <p>Playlists</p>
                    <p>Most Popular</p>
                    <div>
                        <TopSongs />
                    </div>
                </div>
                <MyPlaylistSongs songTitle="Featured" Featured={exampleFeaturedSongs} />
                <MyPlaylistSongs songTitle="Latest Added" Featured={exampleFeaturedSongs} />
                <MyPlaylistSongs songTitle="Most Popular" Featured={exampleFeaturedSongs} />
                <MyPlaylistSongs songTitle="Top for 5 most popular" Featured={exampleFeaturedSongs} />
                <footer>
                    <p id='footerpara'>© 2024 Song Sea. All Rights Reserved.</p>
                </footer>
            </div>
        </section>
    );
};

export { MyPlaylistSongs, Songs };
