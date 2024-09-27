import React, { useState } from 'react';
import './createPlaylist.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

interface Playlist {
  id: number;
  name: string;
}

function PlaylistForm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [playlists, setPlaylists] = useState<Playlist[]>([]); // State to hold playlists

  const [editPlaylistId, setEditPlaylistId] = useState<number | null>(null); // State to hold the ID of playlist being edited

  const [contextMenuPlaylist, setContextMenuPlaylist] = useState<Playlist | null>(null); // State to track which playlist's context menu is open

  const openModal = () => {
    setIsModalOpen(true);
    setEditPlaylistId(null); // Reset edit state when opening modal
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setPlaylistName('');
    setEditPlaylistId(null); // Reset edit state when closing modal
  };

  const handlePlaylistNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistName(event.target.value);
  };

  const handleCreatePlaylist = () => {
    if (playlistName.trim() !== '') {
      if (editPlaylistId !== null) {
        // Editing existing playlist
        const updatedPlaylists = playlists.map(playlist => {
          if (playlist.id === editPlaylistId) {
            return { ...playlist, name: playlistName };
          }
          return playlist;
        });
        setPlaylists(updatedPlaylists);
      } else {
        // Creating new playlist
        const newPlaylist: Playlist = {
          id: Date.now(),
          name: playlistName
        };
        setPlaylists([...playlists, newPlaylist]);
      }
      console.log('Creating/Editing playlist:', playlistName);
      closeModal(); // Close modal after creating or editing playlist
    } else {
      alert('Please enter a playlist name.');
    }
  };

  const handleEditPlaylist = () => {
    if (contextMenuPlaylist) {
      setPlaylistName(contextMenuPlaylist.name);
      setEditPlaylistId(contextMenuPlaylist.id);
      setIsModalOpen(true);
      setContextMenuPlaylist(null); // Close context menu after opening modal
    }
  };

  const handleDeletePlaylist = () => {
    if (contextMenuPlaylist) {
      const updatedPlaylists = playlists.filter(playlist => playlist.id !== contextMenuPlaylist.id);
      setPlaylists(updatedPlaylists);
      setContextMenuPlaylist(null); // Close context menu after deleting playlist
    }
  };

  const toggleContextMenu = (id: number) => {
    const playlist = playlists.find(playlist => playlist.id === id);
    if (playlist) {
      setContextMenuPlaylist(playlist); // Open context menu for clicked playlist
    } else {
      setContextMenuPlaylist(null); // Close context menu if clicked again or outside
    }
  };

  return (
    <div className="Playlist-container">
      <h1>My Playlists</h1>
      <div>
        <button id='createNewPlaylistButton' onClick={openModal}>+</button>
      </div>
      <hr />

      {/* Display created playlists */}
      {playlists.length > 0 && (
        <ul className='addedPlaylists'>
          {playlists.map(playlist => (
            <li key={playlist.id}>
              {playlist.name}
             
              <span className="ellipsis" onClick={() => toggleContextMenu(playlist.id)}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </span>
              {contextMenuPlaylist && contextMenuPlaylist.id === playlist.id && (
                <div className="context-menu">
                  <button onClick={handleEditPlaylist} className='modiifyButtons'>Edit</button>
                  <button onClick={handleDeletePlaylist} className='modiifyButtons'>Delete</button>
                </div>
              )}
              
            </li>
          ))}
        </ul>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2 id='NewPlaylist'>{editPlaylistId !== null ? 'Edit Playlist' : 'New Playlist'}</h2>
            <input
              type="text"
              id='inputPlaylistName'
              placeholder="Enter playlist name"
              value={playlistName}
              onChange={handlePlaylistNameChange}
              required
            />
            <button onClick={handleCreatePlaylist} id='createPlaylistButton'>
              {editPlaylistId !== null ? 'Save Changes' : 'Create'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlaylistForm;
