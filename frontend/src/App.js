import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Polls from './pages/Polls';
import CreatePoll from './pages/CreatePoll';
import Teams from './pages/Teams';
import Communities from './pages/Communities';
import OptionCompare from './pages/OptionCompare';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import Notifications from './pages/Notifications';
import Feedback from './pages/Feedback';
import Layout from './components/Layout';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div style={{color:'white',padding:40}}>Loading...</div>;
  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/app" element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="polls" element={<Polls />} />
            <Route path="create-poll" element={<CreatePoll />} />
            <Route path="teams" element={<Teams />} />
            <Route path="communities" element={<Communities />} />
            <Route path="compare" element={<OptionCompare />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="profile" element={<Profile />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="feedback" element={<Feedback />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
