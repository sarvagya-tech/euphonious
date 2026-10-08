import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Search from './pages/Search';
import Profile from './pages/Profile';
import Playlist from './pages/Playlist';
import CreatePlaylist from './pages/CreatePlaylist';
import Room from './pages/Room';
import RoomSelection from './pages/RoomSelection';
import Upload from './pages/Upload';
import ProtectedRoute from './components/common/ProtectedRoute';
import { Toaster } from 'react-hot-toast';
import { authClient } from './lib/auth-client.js';
import useAuthStore from './store/authStore.js';

function AuthSessionSync() {
  const { setUser } = useAuthStore();

  useEffect(() => {
    const syncSession = async () => {
      try {
        const sessionRes = await authClient.getSession();
        if (sessionRes?.data?.user) {
          const u = sessionRes.data.user;
          const normalized = {
            _id: u.id,
            id: u.id,
            fullname: u.name || 'SyncTune User',
            name: u.name,
            email: u.email,
            avatar: u.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400',
            createdAt: u.createdAt,
          };
          const token = sessionRes.data.session?.token || sessionRes.data.session?.id || 'google_session_active';
          setUser(normalized, token);
        }
      } catch (err) {
        console.log('Session sync error:', err);
      }
    };

    syncSession();
  }, [setUser]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <AuthSessionSync />
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
        {/* Landing directly on Home */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Navigate to="/login" replace />} />
        <Route path="/playlist/:playlistId" element={<Playlist />} />

        {/* Protected Features */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/playlist/create" element={
          <ProtectedRoute>
            <CreatePlaylist />
          </ProtectedRoute>
        } />
        <Route path="/room" element={
          <ProtectedRoute>
            <RoomSelection />
          </ProtectedRoute>
        } />
        <Route path="/room/:id" element={
          <ProtectedRoute>
            <Room />
          </ProtectedRoute>
        } />
        <Route path="/upload" element={
          <ProtectedRoute>
            <Upload />
          </ProtectedRoute>
        } />

        {/* Fallback to Home */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

//if there are some other tutorial related to this then i will prefer that instead of this for this time i am going to commit it  //