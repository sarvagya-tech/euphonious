import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Playlist from './pages/Playlist';
import CreatePlaylist from './pages/CreatePlaylist';
import Room from './pages/Room';
import RoomSelection from './pages/RoomSelection';
import Upload from './pages/Upload';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" toastOptions={{
        style: {
          background: '#0a0a0a',
          color: '#ffffff',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        success: {
          iconTheme: {
            primary: '#c8f55a',
            secondary: '#0a0a0a',
          },
        },
      }} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/playlist/:playlistId" element={<Playlist />} />
        <Route path="/playlist/create" element={<CreatePlaylist />} />
        <Route path="/room" element={<RoomSelection />} />
        <Route path="/room/:id" element={<Room />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
