import React, { useEffect, useState } from 'react';
import { pollAPI } from '../services/api';

export default function Polls() {
  const [polls, setPolls] = useState([]);
  const [tab, setTab] = useState('public');
  const [voting, setVoting] = useState({});
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (tab === 'public') pollAPI.getAll().then(r => setPolls(r.data)).catch(() => {});
    else pollAPI.getMy().then(r => setPolls(r.data)).catch(() => {});
  }, [tab]);

  const handleVote = async (pollId, optionId) => {
    try {
      await pollAPI.vote(pollId, { optionId });
      setMsg('Vote submitted successfully!');
      setTimeout(() => setMsg(''), 3000);
    } catch (e) { setMsg(e.response?.data?.message || 'Already voted'); setTimeout(() => setMsg(''), 3000); }
  };

  const s = {
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
    h1: { fontSize: 26, fontWeight: 700, color: '#e2e8f0' },
    tabs: { display: 'flex', gap: 8, marginBottom: 24 },
    tab: (active) => ({ padding: '8px 20px', borderRadius: 8, border: '1px solid #3f3f5e', background: active ? '#6366f1' : 'transparent', color: active ? 'white' : '#94a3b8', cursor: 'pointer', fontSize: 14, fontWeight: 500 }),
    msg: { background: 'rgba(99,102,241,0.1)', border: '1px solid #6366f1', color: '#a5b4fc', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 14 },
    card: { background: '#1a1a2e', border: '1px solid #2d2d4e', borderRadius: 12, padding: 24, marginBottom: 16 },
    cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
    title: { fontSize: 17, fontWeight: 600, color: '#e2e8f0' },
    badge: (type) => ({ padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 500, background: type === 'SINGLE_CHOICE' ? 'rgba(99,102,241,0.15)' : type === 'MULTIPLE_CHOICE' ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)', color: type === 'SINGLE_CHOICE' ? '#a5b4fc' : type === 'MULTIPLE_CHOICE' ? '#6ee7b7' : '#fcd34d' }),
    question: { color: '#94a3b8', fontSize: 14, marginBottom: 16 },
    options: { display: 'flex', flexDirection: 'column', gap: 8 },
    optBtn: { background: 'rgba(99,102,241,0.08)', border: '1px solid #3f3f5e', color: '#e2e8f0', padding: '10px 16px', borderRadius: 8, fontSize: 14, textAlign: 'left', cursor: 'pointer', transition: 'all 0.2s' },
    empty: { color: '#64748b', textAlign: 'center', padding: 60, fontSize: 15 },
  };

  return (
    <div>
      <div style={s.header}>
        <h1 style={s.h1}>🗳️ Team Polls & Ballots</h1>
      </div>
      {msg && <div style={s.msg}>{msg}</div>}
      <div style={s.tabs}>
        <button style={s.tab(tab === 'public')} onClick={() => setTab('public')}>🌐 Public</button>
        <button style={s.tab(tab === 'my')} onClick={() => setTab('my')}>🔒 My Polls</button>
      </div>
      {polls.length === 0
        ? <div style={s.empty}>No polls found. Create one to get started!</div>
        : polls.map(poll => (
          <div key={poll.id} style={s.card}>
            <div style={s.cardTop}>
              <div style={s.title}>{poll.title}</div>
              <span style={s.badge(poll.pollType)}>{poll.pollType?.replace('_', ' ')}</span>
            </div>
            <div style={s.question}>{poll.question}</div>
            <div style={s.options}>
              {poll.options?.map(opt => (
                <button key={opt.id} style={s.optBtn} onClick={() => handleVote(poll.id, opt.id)}>
                  {opt.optionText}
                </button>
              ))}
            </div>
          </div>
        ))
      }
    </div>
  );
}
