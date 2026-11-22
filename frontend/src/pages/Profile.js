import React, { useEffect, useState } from 'react';
import { userAPI } from '../services/api';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ fullName: '', bio: '' });
  const [msg, setMsg] = useState('');

  useEffect(() => {
    userAPI.getProfile().then(r => { setProfile(r.data); setForm({ fullName: r.data.fullName || '', bio: r.data.bio || '' }); }).catch(() => {});
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    try { await userAPI.updateProfile(form); setMsg('Profile updated!'); setTimeout(() => setMsg(''), 3000); }
    catch { setMsg('Update failed'); }
  };

  const s = {
    h1: { fontSize: 26, fontWeight: 700, color: '#e2e8f0', marginBottom: 24 },
    layout: { display: 'grid', gridTemplateColumns: '300px 1fr', gap: 24 },
    card: { background: '#1a1a2e', border: '1px solid #2d2d4e', borderRadius: 12, padding: 24 },
    avatar: { width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, marginBottom: 16 },
    name: { fontWeight: 700, fontSize: 18, color: '#e2e8f0', marginBottom: 4 },
    email: { color: '#64748b', fontSize: 13, marginBottom: 16 },
    statRow: { display: 'flex', gap: 16, marginTop: 16 },
    statBox: { background: '#0f0f1a', borderRadius: 8, padding: '10px 16px', textAlign: 'center', flex: 1 },
    statVal: { fontWeight: 700, color: '#6366f1', fontSize: 20 },
    statLabel: { color: '#64748b', fontSize: 11, marginTop: 2 },
    label: { display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6 },
    input: { width: '100%', background: '#0f0f1a', border: '1px solid #3f3f5e', color: '#e2e8f0', padding: '11px 14px', borderRadius: 8, fontSize: 14, marginBottom: 16, outline: 'none' },
    textarea: { width: '100%', background: '#0f0f1a', border: '1px solid #3f3f5e', color: '#e2e8f0', padding: '11px 14px', borderRadius: 8, fontSize: 14, marginBottom: 16, outline: 'none', minHeight: 100, resize: 'vertical' },
    saveBtn: { background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white', border: 'none', padding: '11px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' },
    msg: { color: '#6ee7b7', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 14 },
  };

  if (!profile) return <div style={{ color: '#64748b', padding: 40 }}>Loading profile...</div>;

  return (
    <div>
      <h1 style={s.h1}>👤 Profile</h1>
      <div style={s.layout}>
        <div style={s.card}>
          <div style={s.avatar}>{profile.username?.[0]?.toUpperCase() || '?'}</div>
          <div style={s.name}>{profile.fullName || profile.username}</div>
          <div style={s.email}>{profile.email}</div>
          <div style={{ color: '#64748b', fontSize: 13 }}>@{profile.username}</div>
          <div style={s.statRow}>
            <div style={s.statBox}><div style={s.statVal}>0</div><div style={s.statLabel}>Polls</div></div>
            <div style={s.statBox}><div style={s.statVal}>0</div><div style={s.statLabel}>Votes</div></div>
            <div style={s.statBox}><div style={s.statVal}>0</div><div style={s.statLabel}>Teams</div></div>
          </div>
        </div>
        <div style={s.card}>
          <div style={{ fontWeight: 600, color: '#e2e8f0', marginBottom: 20, fontSize: 16 }}>Edit Profile</div>
          {msg && <div style={s.msg}>{msg}</div>}
          <form onSubmit={handleSave}>
            <label style={s.label}>Full Name</label>
            <input style={s.input} value={form.fullName} onChange={e => setForm({...form, fullName: e.target.value})} placeholder="Your full name" />
            <label style={s.label}>Bio</label>
            <textarea style={s.textarea} value={form.bio} onChange={e => setForm({...form, bio: e.target.value})} placeholder="Tell us about yourself..." />
            <button type="submit" style={s.saveBtn}>Save Changes</button>
          </form>
        </div>
      </div>
    </div>
  );
}
