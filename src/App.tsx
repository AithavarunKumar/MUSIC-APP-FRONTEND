import { BrowserRouter as Router, Routes, Route ,Navigate} from 'react-router-dom';
import { Songs } from './pages/AllSongsFloder/Songs';
import { useState } from 'react';
import SignUp from './pages/SignUp/SignUp';
import SignIn from './pages/SignInPage/SignIn';
import './pages/SignInPage/SignIn.css';
import EmailPage from './pages/VerificationFolder/Email';
import PlaylistForm from './pages/PlayListFloder/CreatePlaylist/createPlaylist';
import VerificationPage from './pages/EmailVerification';
import ForgetPassword from './pages/SignInPage/UpdatePassword';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to set login status
  const handleLogin = (status: boolean) => {
    setIsLoggedIn(status);
  };

  // Mock userId for demonstration (replace with actual logic to get userId)
  const userId = 'user123';
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/allsongs" element={isLoggedIn ? <Songs /> : <Navigate to="/signin" />} />
        <Route path="/signin" element={<SignIn onLogin={handleLogin}/>} />
        <Route path="/email" element={<EmailPage />} />
        <Route path="/VerificationPage" element={<VerificationPage />} />
        <Route path="/PlaylistForm" element={<PlaylistForm />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
