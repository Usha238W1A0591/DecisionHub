import React, { useState } from 'react';
import { feedbackAPI } from '../services/api';

export default function Feedback() {
  const [form, setForm] = useState({ message: '', rating: 5 });
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await feedbackAPI.submit(form);
      setMsg('Thank you for your feedback!');
      setForm({ message: '', rating: 5 });
      setTimeout(() => setMsg(''), 4000);
    } catch { setMsg('Failed to submit'); }
  };

  const s = {
    h1: { fontSize: 26, fontWeight: 700, color: '#e2e8f0', marginBottom: 8 },
    sub: { color: '#64748b', marginBottom: 32, fontSize: 14 },
    card: { background: '#1a1a2e', border: '1px solid #2d2d4e', borderRadius: 12, padding: 32, maxWidth: 560 },
    label: { display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6 },
    textarea: { width: '100%', background: '#0f0f1a', border: '1px solid #3f3f5e', color: '#e2e8f0', padding: '12px 14px', borderRadius: 8, fontSize: 14, marginBottom: 20, outline: 'none', minHeight: 140, resize: 'vertical' },
    stars: { display: 'flex', gap: 8, marginBottom: 24 },
    star: (active) => ({ fontSize: 28, cursor: 'pointer', color: active ? '#f59e0b' : '#3f3f5e', transition: 'color 0.1s' }),
    btn: { background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white', border: 'none', padding: '12px 28px', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer' },
    msg: { color: '#6ee7b7', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', padding: '12px 16px', borderRadius: 8, marginBottom: 20, fontSize: 14 },
  };

  return (
    <div>
      <h1 style={s.h1}>💬 Feedback</h1>
      <p style={s.sub}>Share your thoughts to help us improve DecisionHub</p>
      <div style={s.card}>
        {msg && <div style={s.msg}>{msg}</div>}
        <form onSubmit={handleSubmit}>
          <label style={s.label}>Rating</label>
          <div style={s.stars}>
            {[1, 2, 3, 4, 5].map(n => (
              <span key={n} style={s.star(n <= form.rating)} onClick={() => setForm({...form, rating: n})}>★</span>
            ))}
          </div>
          <label style={s.label}>Your Feedback</label>
          <textarea style={s.textarea} placeholder="Share your experience, suggestions or report issues..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} required />
          <button type="submit" style={s.btn}>Submit Feedback</button>
        </form>
      </div>
    </div>
  );
}
