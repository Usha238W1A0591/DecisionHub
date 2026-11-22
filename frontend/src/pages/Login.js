import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const s = {
    page: { minHeight: '100vh', background: '#0f0f1a', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    box: { background: '#1a1a2e', border: '1px solid #2d2d4e', borderRadius: 16, padding: 40, width: '100%', maxWidth: 420 },
    logo: { textAlign: 'center', marginBottom: 32 },
    logoText: { fontSize: 24, fontWeight: 700, color: '#6366f1' },
    title: { fontSize: 22, fontWeight: 700, marginBottom: 8, color: '#e2e8f0' },
    sub: { color: '#64748b', fontSize: 14, marginBottom: 28 },
    label: { display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6 },
    input: { width: '100%', background: '#0f0f1a', border: '1px solid #3f3f5e', color: '#e2e8f0', padding: '12px 14px', borderRadius: 8, fontSize: 14, marginBottom: 18, outline: 'none' },
    btn: { width: '100%', background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white', border: 'none', padding: '13px', borderRadius: 8, fontSize: 15, fontWeight: 600, cursor: 'pointer', marginTop: 4 },
    err: { color: '#f87171', fontSize: 13, marginBottom: 16, background: 'rgba(248,113,113,0.1)', padding: '10px 14px', borderRadius: 8 },
    link: { textAlign: 'center', marginTop: 20, fontSize: 14, color: '#64748b' },
    linkA: { color: '#6366f1', marginLeft: 4 },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await authAPI.login(form);
      login(res.data, res.data.token);
      navigate('/app');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div style={s.page}>
      <div style={s.box}>
        <div style={s.logo}><span style={s.logoText}>⚡ DecisionHub</span></div>
        <h2 style={s.title}>Welcome Back</h2>
        <p style={s.sub}>Sign in to your DecisionHub workspace</p>
        {error && <div style={s.err}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <label style={s.label}>Email Address</label>
          <input style={s.input} type="email" placeholder="name@company.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
          <label style={s.label}>Password</label>
          <input style={s.input} type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
          <button style={s.btn} disabled={loading}>{loading ? 'Signing in...' : 'Sign In →'}</button>
        </form>
        <div style={s.link}>Don't have an account?<Link to="/register" style={s.linkA}>Create Account</Link></div>
      </div>
    </div>
  );
}
