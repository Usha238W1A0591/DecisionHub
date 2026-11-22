import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyticsAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    analyticsAPI.getDashboard().then(r => setStats(r.data)).catch(() => {});
  }, []);

  const s = {
    welcome: { marginBottom: 32 },
    h1: { fontSize: 28, fontWeight: 700, color: '#e2e8f0' },
    sub: { color: '#64748b', marginTop: 6, fontSize: 15 },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 32 },
    card: { background: '#1a1a2e', border: '1px solid #2d2d4e', borderRadius: 12, padding: 20 },
    cardLabel: { color: '#64748b', fontSize: 13, marginBottom: 8 },
    cardValue: { fontSize: 32, fontWeight: 700, color: '#6366f1' },
    cardSub: { color: '#94a3b8', fontSize: 12, marginTop: 4 },
    section: { marginBottom: 32 },
    sectionTitle: { fontSize: 18, fontWeight: 600, color: '#e2e8f0', marginBottom: 16 },
    quickGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 },
    quickCard: { background: '#1a1a2e', border: '1px solid #2d2d4e', borderRadius: 12, padding: 20, cursor: 'pointer', transition: 'border-color 0.2s' },
    quickIcon: { fontSize: 28, marginBottom: 10 },
    quickTitle: { fontWeight: 600, color: '#e2e8f0', marginBottom: 4 },
    quickDesc: { color: '#64748b', fontSize: 13 },
  };

  const statCards = stats ? [
    { label: 'Total Users', value: stats.totalUsers, sub: 'Registered users' },
    { label: 'Total Teams', value: stats.totalTeams, sub: 'Active teams' },
    { label: 'Total Decisions', value: 0, sub: 'Created decisions' },
    { label: 'Total Polls', value: stats.totalPolls, sub: 'Available polls' },
    { label: 'Total Votes', value: stats.totalVotes, sub: 'Votes submitted' },
  ] : [];

  const quickLinks = [
    { icon: '🗳️', title: 'Polls', desc: 'Participate in active decisions', path: '/app/polls' },
    { icon: '🔔', title: 'Notifications', desc: 'View your activity updates', path: '/app/notifications' },
    { icon: '⚖️', title: 'Option Compare', desc: 'Evaluate your alternatives', path: '/app/compare' },
    { icon: '➕', title: 'Create Poll', desc: 'Start a new decision poll', path: '/app/create-poll' },
    { icon: '👥', title: 'Teams', desc: 'Collaborate with your team', path: '/app/teams' },
    { icon: '📈', title: 'Analytics', desc: 'View participation insights', path: '/app/analytics' },
  ];

  return (
    <div>
      <div style={s.welcome}>
        <h1 style={s.h1}>Welcome back, {user?.fullName || user?.username} 👋</h1>
        <p style={s.sub}>Here is what's happening across your team workspace today.</p>
      </div>

      <div style={s.grid}>
        {statCards.map(c => (
          <div key={c.label} style={s.card}>
            <div style={s.cardLabel}>{c.label}</div>
            <div style={s.cardValue}>{c.value}</div>
            <div style={s.cardSub}>✓ {c.sub}</div>
          </div>
        ))}
      </div>

      <div style={s.section}>
        <div style={s.sectionTitle}>Quick Access</div>
        <div style={s.quickGrid}>
          {quickLinks.map(q => (
            <div key={q.title} style={s.quickCard} onClick={() => navigate(q.path)}>
              <div style={s.quickIcon}>{q.icon}</div>
              <div style={s.quickTitle}>{q.title}</div>
              <div style={s.quickDesc}>{q.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
