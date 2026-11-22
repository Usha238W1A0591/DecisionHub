import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();
  const s = {
    page: { minHeight: '100vh', background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #0f0f1a 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32, textAlign: 'center' },
    badge: { background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', color: '#a5b4fc', padding: '6px 16px', borderRadius: 20, fontSize: 13, marginBottom: 24, display: 'inline-block' },
    h1: { fontSize: 56, fontWeight: 800, lineHeight: 1.1, marginBottom: 20 },
    grad: { background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' },
    sub: { fontSize: 18, color: '#94a3b8', maxWidth: 560, lineHeight: 1.7, marginBottom: 40 },
    btns: { display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' },
    primary: { background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white', border: 'none', padding: '14px 32px', borderRadius: 10, fontSize: 16, fontWeight: 600, cursor: 'pointer' },
    secondary: { background: 'transparent', color: '#e2e8f0', border: '1px solid #3f3f5e', padding: '14px 32px', borderRadius: 10, fontSize: 16, fontWeight: 600, cursor: 'pointer' },
    features: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 20, marginTop: 80, maxWidth: 900, width: '100%' },
    card: { background: 'rgba(255,255,255,0.03)', border: '1px solid #2d2d4e', borderRadius: 12, padding: 24, textAlign: 'left' },
    icon: { fontSize: 32, marginBottom: 12 },
    cardTitle: { fontWeight: 600, marginBottom: 8, color: '#e2e8f0' },
    cardDesc: { fontSize: 13, color: '#64748b', lineHeight: 1.6 },
  };

  const features = [
    { icon: '🗳️', title: 'Smart Polls', desc: 'Single-choice, multiple-choice, and rating-based polls with public/private options.' },
    { icon: '⚖️', title: 'Option Comparison', desc: 'Compare alternatives on cost, risk, pros and cons side-by-side.' },
    { icon: '👥', title: 'Teams', desc: 'Form groups, collaborate and make decisions together.' },
    { icon: '🌐', title: 'Communities', desc: 'Connect with others who share similar interests and goals.' },
    { icon: '📈', title: 'Analytics', desc: 'Visual dashboards showing voting patterns and participation stats.' },
    { icon: '🔔', title: 'Notifications', desc: 'Stay updated on all relevant activities across the platform.' },
  ];

  return (
    <div style={s.page}>
      <div style={s.badge}>🚀 Next-Gen Collaborative Decision Intelligence</div>
      <h1 style={s.h1}>
        Turn Discussions Into<br /><span style={s.grad}>Data-Driven Decisions</span>
      </h1>
      <p style={s.sub}>
        One Platform. Every Discussion. Every Vote. Every Decision.<br />
        Accelerate organizational alignment through collaborative intelligence.
      </p>
      <div style={s.btns}>
        <button style={s.primary} onClick={() => navigate('/register')}>Get Started Free →</button>
        <button style={s.secondary} onClick={() => navigate('/login')}>Sign In</button>
      </div>
      <div style={s.features}>
        {features.map(f => (
          <div key={f.title} style={s.card}>
            <div style={s.icon}>{f.icon}</div>
            <div style={s.cardTitle}>{f.title}</div>
            <div style={s.cardDesc}>{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
