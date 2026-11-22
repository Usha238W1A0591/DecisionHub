import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { path: '/app', label: '📊 Dashboard', end: true },
  { path: '/app/polls', label: '🗳️ Polls' },
  { path: '/app/create-poll', label: '➕ Create Poll' },
  { path: '/app/compare', label: '⚖️ Option Compare' },
  { path: '/app/teams', label: '👥 Teams' },
  { path: '/app/communities', label: '🌐 Communities' },
  { path: '/app/analytics', label: '📈 Analytics' },
  { path: '/app/notifications', label: '🔔 Notifications' },
  { path: '/app/profile', label: '👤 Profile' },
  { path: '/app/feedback', label: '💬 Feedback' },
];

const styles = {
  layout: { display: 'flex', minHeight: '100vh', background: '#0f0f1a' },
  sidebar: { width: 240, background: '#1a1a2e', borderRight: '1px solid #2d2d4e', display: 'flex', flexDirection: 'column', padding: '20px 0' },
  logo: { padding: '0 20px 24px', borderBottom: '1px solid #2d2d4e', marginBottom: 16 },
  logoTitle: { fontSize: 20, fontWeight: 700, color: '#6366f1' },
  logoSub: { fontSize: 11, color: '#64748b', marginTop: 2 },
  nav: { flex: 1, overflowY: 'auto' },
  navLink: { display: 'block', padding: '10px 20px', color: '#94a3b8', fontSize: 14, transition: 'all 0.2s', borderLeft: '3px solid transparent' },
  navLinkActive: { color: '#6366f1', background: 'rgba(99,102,241,0.1)', borderLeft: '3px solid #6366f1' },
  userSection: { padding: '16px 20px', borderTop: '1px solid #2d2d4e' },
  username: { fontSize: 13, color: '#e2e8f0', fontWeight: 600 },
  logoutBtn: { marginTop: 8, background: 'transparent', border: '1px solid #3f3f5e', color: '#94a3b8', padding: '6px 12px', borderRadius: 6, fontSize: 12, width: '100%', cursor: 'pointer' },
  main: { flex: 1, overflowY: 'auto', padding: 32 },
};

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div style={styles.layout}>
      <div style={styles.sidebar}>
        <div style={styles.logo}>
          <div style={styles.logoTitle}>⚡ DecisionHub</div>
          <div style={styles.logoSub}>Collaborative Decisions</div>
        </div>
        <nav style={styles.nav}>
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              style={({ isActive }) => ({
                ...styles.navLink,
                ...(isActive ? styles.navLinkActive : {})
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div style={styles.userSection}>
          <div style={styles.username}>{user?.username || user?.email}</div>
          <button style={styles.logoutBtn} onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <main style={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
