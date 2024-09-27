// ForgetPassword.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import './updatepassword.css';

const ForgetPassword: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const encryptPassword = (password: string, key: string): string => {
    const keyUtf8 = CryptoJS.enc.Utf8.parse(key);
    const encrypted = CryptoJS.AES.encrypt(password, keyUtf8, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(''); // Reset error message

    if (userPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const secretKey = 'secret key 12356';
    const encryptedPassword = encryptPassword(userPassword, secretKey);

    try {
      await axios.post('http://localhost:8081/user-management/users/change_password', {
        username: userName,
        password: encryptedPassword,
      });
      alert('Password updated successfully');
      navigate('/signin'); // Redirect to the sign-in page on successful update
    } catch (err) {
      setError('Failed to update password');
      console.error(err);
    }
  };

  return (
    <div className='updatepassword'>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <h1>Update your password </h1>
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>New Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter new password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label>Confirm New Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className="text-danger">{error}</p>}

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
