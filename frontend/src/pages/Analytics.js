import React, { useEffect, useState } from 'react';
import { analyticsAPI } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function Analytics() {
  const [stats, setStats] = useState(null);

  useEffect(() => { analyticsAPI.getDashboard().then(r => setStats(r.data)).catch(() => {}); }, []);

  if (!stats) return <div style={{ color: '#64748b', padding: 40 }}>Loading analytics...</div>;

  const barData = [
    { name: 'Users', value: stats.totalUsers },
    { name: 'Polls', value: stats.totalPolls },
    { name: 'Votes', value: stats.totalVotes },
    { name: 'Teams', value: stats.totalTeams },
    { name: 'Communities', value: stats.totalCommunities },
  ];

  const pieData = [
    { name: 'Active Polls', value: stats.activePolls || 0 },
    { name: 'Inactive Polls', value: stats.inactivePolls || 0 },
  ];

  const COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];

  const s = {
    h1: { fontSize: 26, fontWeight: 700, color: '#e2e8f0', marginBottom: 24 },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px,1fr))', gap: 16, marginBottom: 32 },
    card: { background: '#1a1a2e', border: '1px solid #2d2d4e', borderRadius: 12, padding: 20, textAlign: 'center' },
    cardVal: { fontSize: 36, fontWeight: 700, color: '#6366f1' },
    cardLabel: { color: '#64748b', fontSize: 13, marginTop: 6 },
    charts: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 },
    chartCard: { background: '#1a1a2e', border: '1px solid #2d2d4e', borderRadius: 12, padding: 24 },
    chartTitle: { fontWeight: 600, color: '#e2e8f0', marginBottom: 20 },
  };

  return (
    <div>
      <h1 style={s.h1}>📈 Analytics Dashboard</h1>
      <div style={s.grid}>
        {[['Total Users', stats.totalUsers], ['Total Polls', stats.totalPolls], ['Total Votes', stats.totalVotes], ['Active Polls', stats.activePolls], ['Teams', stats.totalTeams], ['Communities', stats.totalCommunities]].map(([label, val]) => (
          <div key={label} style={s.card}>
            <div style={s.cardVal}>{val}</div>
            <div style={s.cardLabel}>{label}</div>
          </div>
        ))}
      </div>
      <div style={s.charts}>
        <div style={s.chartCard}>
          <div style={s.chartTitle}>Platform Overview</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData}>
              <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} />
              <YAxis tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid #2d2d4e', color: '#e2e8f0' }} />
              <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={s.chartCard}>
          <div style={s.chartTitle}>Poll Status Distribution</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ background: '#1a1a2e', border: '1px solid #2d2d4e', color: '#e2e8f0' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
