import React, { useState, useEffect } from 'react';
import { fetchTop5Songs } from '../../services/SongService/songService';
import '../Top5Songs/topsongs.css'

interface Song {
  artist: string;
  genre: string;
  likes: number;
  title: string;
  imageUrl?: string; // Optional property for image URLs
}

const TopSongs: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    fetchSongs();
  }, []);

  const fetchSongs = async () => {
    try {
      const data: Song[] = await fetchTop5Songs(); // Ensure TypeScript knows the type of data
      const images: string[] = [
        "song11.png",
        "song9.png",
        "song14.png",
        "song13.png",
        "song8.png",
      ];

      // Attach images to the fetched songs
      const topSongs = data.map((song, index): Song => ({
        ...song,
        imageUrl: images[index], // Assigning each song an image
      })).sort((a, b) => b.likes - a.likes);

      setSongs(topSongs);
    } catch (error) {
      console.error('Failed to fetch songs', error);
    }
  }

  return (
    <div id='top-songs-main'>
      {songs.map((song, index) => (
        <div className="mostPopularContainer" key={index}>
          <div id="mostPopularcontent">
            <img src={song.imageUrl} alt={`Image for ${song.title}`} id='topsongimage' />
          </div>
          <div id="mostPopularcontent">
            <p className='artistTitle'>{song.artist}</p>
            <p className='topsongspara'>{song.genre}, {song.likes}</p>
            <p className='topsongspara'>{song.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopSongs;
