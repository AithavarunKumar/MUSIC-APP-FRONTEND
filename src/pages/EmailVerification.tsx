import React from 'react';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { useNavigate } from 'react-router-dom';
import './EmailVerfication.css';

const VerificationPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const token = queryParams.token as string;

  const handleVerifyClick = async () => {
    try {
      const response = await fetch(`http://localhost:8081/user-management/users/verify?token=${token}`);
      console.log(response);
      if (!response.ok) {
        alert('User verified successfully!');
        navigate('/signin');
      } else {
        const errorData = await response.json();
        alert(`Verification failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error verifying user:', error);
      alert('Verification failed. Please try again later.');
    }
  };

  return (
    <div className="container">
      <div className="content">
      <h1>Verify Email</h1>
        <p>SongSea is your ultimate music companion, bringing you the best of tunes from around the world. With personalized playlists, exclusive content, and seamless integration across all your devices, SongSea is here to revolutionize your music experience.</p>
        <ul>
          <li>Create and share custom playlists</li>
          <li>Discover new music with our intelligent recommendations</li>
          <li>Enjoy offline listening</li>
          <li>Experience high-quality audio streaming</li>
        </ul>
        
        <p>Click the button below to verify your email address.</p>
        <button onClick={handleVerifyClick}>Verify</button>
      </div>
    
    </div>
  );
};

export default VerificationPage;
