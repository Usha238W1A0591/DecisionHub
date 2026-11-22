import React, { useEffect, useState } from 'react';
import { communityAPI } from '../services/api';

export default function Communities() {
  const [communities, setCommunities] = useState([]);
  const [form, setForm] = useState({ name: '', description: '' });
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState('');

  const load = () => communityAPI.getAll().then(r => setCommunities(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try { await communityAPI.create(form); setMsg('Community created!'); setForm({ name: '', description: '' }); setShow(false); load(); setTimeout(() => setMsg(''), 3000); }
    catch { setMsg('Failed'); }
  };

  const handleJoin = async (id) => {
    try { await communityAPI.join(id); setMsg('Joined!'); load(); setTimeout(() => setMsg(''), 3000); }
    catch { setMsg('Could not join'); }
  };

  const s = {
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
    h1: { fontSize: 26, fontWeight: 700, color: '#e2e8f0' },
    btn: { background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' },
    msg: { background: 'rgba(99,102,241,0.1)', border: '1px solid #6366f1', color: '#a5b4fc', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 14 },
    form: { background: '#1a1a2e', border: '1px solid #2d2d4e', borderRadius: 12, padding: 24, marginBottom: 24 },
    label: { display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6 },
    input: { width: '100%', background: '#0f0f1a', border: '1px solid #3f3f5e', color: '#e2e8f0', padding: '11px 14px', borderRadius: 8, fontSize: 14, marginBottom: 16, outline: 'none' },
    submitBtn: { background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white', border: 'none', padding: '10px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px,1fr))', gap: 16 },
    card: { background: '#1a1a2e', border: '1px solid #2d2d4e', borderRadius: 12, padding: 24 },
    name: { fontWeight: 600, color: '#e2e8f0', marginBottom: 6, fontSize: 16 },
    desc: { color: '#64748b', fontSize: 13, marginBottom: 16 },
    joinBtn: { background: 'rgba(99,102,241,0.1)', border: '1px solid #6366f1', color: '#a5b4fc', padding: '8px 16px', borderRadius: 8, fontSize: 13, cursor: 'pointer' },
  };

  return (
    <div>
      <div style={s.header}>
        <h1 style={s.h1}>🌐 Communities</h1>
        <button style={s.btn} onClick={() => setShow(!show)}>+ Create Community</button>
      </div>
      {msg && <div style={s.msg}>{msg}</div>}
      {show && (
        <div style={s.form}>
          <form onSubmit={handleCreate}>
            <label style={s.label}>Community Name</label>
            <input style={s.input} placeholder="e.g. Tech Enthusiasts" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            <label style={s.label}>Description</label>
            <input style={s.input} placeholder="What is this community about?" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
            <button type="submit" style={s.submitBtn}>Create Community</button>
          </form>
        </div>
      )}
      <div style={s.grid}>
        {communities.map(c => (
          <div key={c.id} style={s.card}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>🌐</div>
            <div style={s.name}>{c.name}</div>
            <div style={s.desc}>{c.description || 'No description'}</div>
            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 16 }}>{c.members?.length || 0} members</div>
            <button style={s.joinBtn} onClick={() => handleJoin(c.id)}>Join Community</button>
          </div>
        ))}
        {communities.length === 0 && <div style={{ color: '#64748b', gridColumn: '1/-1', textAlign: 'center', padding: 40 }}>No communities yet.</div>}
      </div>
    </div>
  );
}
