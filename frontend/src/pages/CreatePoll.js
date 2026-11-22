import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pollAPI } from '../services/api';

export default function CreatePoll() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '', question: '', pollType: 'SINGLE_CHOICE', visibility: 'PUBLIC', anonymousVoting: false });
  const [options, setOptions] = useState(['', '']);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const s = {
    h1: { fontSize: 26, fontWeight: 700, color: '#e2e8f0', marginBottom: 8 },
    sub: { color: '#64748b', marginBottom: 32, fontSize: 14 },
    card: { background: '#1a1a2e', border: '1px solid #2d2d4e', borderRadius: 12, padding: 32, maxWidth: 640 },
    label: { display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6 },
    input: { width: '100%', background: '#0f0f1a', border: '1px solid #3f3f5e', color: '#e2e8f0', padding: '11px 14px', borderRadius: 8, fontSize: 14, marginBottom: 20, outline: 'none' },
    select: { width: '100%', background: '#0f0f1a', border: '1px solid #3f3f5e', color: '#e2e8f0', padding: '11px 14px', borderRadius: 8, fontSize: 14, marginBottom: 20, outline: 'none' },
    row: { display: 'flex', gap: 16 },
    optRow: { display: 'flex', gap: 8, marginBottom: 10 },
    optInput: { flex: 1, background: '#0f0f1a', border: '1px solid #3f3f5e', color: '#e2e8f0', padding: '10px 14px', borderRadius: 8, fontSize: 14, outline: 'none' },
    removeBtn: { background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', padding: '0 12px', borderRadius: 8, cursor: 'pointer', fontSize: 18 },
    addBtn: { background: 'transparent', border: '1px dashed #3f3f5e', color: '#6366f1', padding: '10px', borderRadius: 8, width: '100%', cursor: 'pointer', marginBottom: 20, fontSize: 14 },
    submitBtn: { background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white', border: 'none', padding: '13px 28px', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer' },
    msg: { color: '#6ee7b7', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', padding: '10px 16px', borderRadius: 8, marginBottom: 20, fontSize: 14 },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await pollAPI.create({ ...form, options: options.filter(o => o.trim()) });
      setMsg('Poll created successfully!');
      setTimeout(() => navigate('/app/polls'), 1500);
    } catch { setMsg('Failed to create poll'); }
    finally { setLoading(false); }
  };

  return (
    <div>
      <h1 style={s.h1}>➕ Create Team Poll</h1>
      <p style={s.sub}>Setup real-time voting options for your squad</p>
      <div style={s.card}>
        {msg && <div style={s.msg}>{msg}</div>}
        <form onSubmit={handleSubmit}>
          <label style={s.label}>Poll Title</label>
          <input style={s.input} placeholder="e.g. Q4 Tech Stack Decision" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
          <label style={s.label}>Poll Question</label>
          <input style={s.input} placeholder="e.g. Which framework should we adopt?" value={form.question} onChange={e => setForm({...form, question: e.target.value})} required />
          <label style={s.label}>Description (optional)</label>
          <input style={s.input} placeholder="Brief context for voters" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
          <div style={s.row}>
            <div style={{ flex: 1 }}>
              <label style={s.label}>Poll Type</label>
              <select style={s.select} value={form.pollType} onChange={e => setForm({...form, pollType: e.target.value})}>
                <option value="SINGLE_CHOICE">Single Choice</option>
                <option value="MULTIPLE_CHOICE">Multiple Choice</option>
                <option value="RATING">Rating</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={s.label}>Visibility</label>
              <select style={s.select} value={form.visibility} onChange={e => setForm({...form, visibility: e.target.value})}>
                <option value="PUBLIC">Public — Anyone can see and vote</option>
                <option value="PRIVATE">Private</option>
              </select>
            </div>
          </div>
          <label style={s.label}>Voting Options</label>
          {options.map((opt, i) => (
            <div key={i} style={s.optRow}>
              <input style={s.optInput} placeholder={`Option ${i + 1}`} value={opt} onChange={e => { const o = [...options]; o[i] = e.target.value; setOptions(o); }} />
              {options.length > 2 && <button type="button" style={s.removeBtn} onClick={() => setOptions(options.filter((_, idx) => idx !== i))}>×</button>}
            </div>
          ))}
          <button type="button" style={s.addBtn} onClick={() => setOptions([...options, ''])}>+ Add Another Option</button>
          <div>
            <label style={{ ...s.label, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
              <input type="checkbox" checked={form.anonymousVoting} onChange={e => setForm({...form, anonymousVoting: e.target.checked})} />
              Anonymous Voting
            </label>
          </div>
          <br />
          <button type="submit" style={s.submitBtn} disabled={loading}>{loading ? 'Creating...' : 'Create Poll'}</button>
        </form>
      </div>
    </div>
  );
}
