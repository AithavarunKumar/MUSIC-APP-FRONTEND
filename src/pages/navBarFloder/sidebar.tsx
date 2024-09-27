import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { faMusic, faUsers, faUsersCog, faUserFriends } from '@fortawesome/free-solid-svg-icons';
type SidebarProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate(); 
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };
    
    const handleDelete = () => {
        // Perform deletion logic here
        const userName = localStorage.getItem('username');
        const token = localStorage.getItem('token'); 
        fetch(`http://localhost:8081/user-management/users/${userName}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`${token}`
            },
        })
            .then(response => {
                if (response.ok) {
                    navigate('/'); 
                } else {
                    throw new Error('Failed to delete account');
                }
            })
            .catch(error => {
                console.error('Error deleting account:', error);
                // Handle error scenario as per your application's requirements
            });

        // Close the modal after deletion
        setIsModalOpen(false);
    };


    return (
        <div className="sidenavbar">
            <h1 id='MusicBox'>SongSea</h1>
            <hr />
            <div className="profileImage">
                <img src="user1.jpg" alt="" id='profilepic' />
                <p className="email">{localStorage.getItem('email')}</p>
                <FontAwesomeIcon icon={faEdit} className='faEdit' onClick={toggleModal} />
            </div>

            <ul className='sidenavUl'>
                <li>
                <FontAwesomeIcon icon={faMusic} className='icon' />
                <a href=""><i className="fas fa-music"></i> My Playlist</a>
                </li>
                <li>
                <FontAwesomeIcon icon={faUsersCog} className='icon' />
                <a href=""><i className="fas fa-share-alt"></i> Shared Playlist</a>
                </li>
                <li>
                <FontAwesomeIcon icon={faUsers} className='icon' />
                <a href=""><i className="fas fa-globe"></i> Public Playlist</a>
                </li>
                <li>
                <FontAwesomeIcon icon={faUserFriends} className='icon' />
                <a href=""><i className="fas fa-users"></i> Friends</a>
                </li>
            </ul>

            <hr />

            <p id='aboutTheApp'><a href="">About the App</a></p>
            <p id='AboutAs'><a href="">About as</a></p>
            <hr />
            <div id='logoutdiv'>
                <a href="#" id='logout'>Logout</a>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="accountdeletion-modal">
                    <div className="modal-content">
                        <span className="close" onClick={toggleModal}>&times;</span>
                        <img src="user1.jpg" alt="" id='userImage'/>
                        <p className='usernamePara'>UserName : {localStorage.getItem('username')}</p>
                        <p className='usernamePara'> UserEmail : {localStorage.getItem('email')}</p>
                        <div className='deleteProfileDiv'>
                        <p className='accountdeletion-p'>Are you sure you want to delete your profile?</p>
                        <button onClick={handleDelete} className='accountdeletion-button'>Delete Account</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
