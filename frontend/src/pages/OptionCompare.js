import React, { useEffect, useState } from 'react';
import { comparisonAPI } from '../services/api';

export default function OptionCompare() {
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState('');
  const [form, setForm] = useState({ title: '', description: '', optionAName: '', optionAPros: '', optionACons: '', optionACost: '', optionARisk: '', optionBName: '', optionBPros: '', optionBCons: '', optionBCost: '', optionBRisk: '' });

  const load = () => comparisonAPI.getAll().then(r => setItems(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { await comparisonAPI.create(form); setMsg('Comparison created!'); setShow(false); load(); setTimeout(() => setMsg(''), 3000); }
    catch { setMsg('Failed'); }
  };

  const s = {
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
    h1: { fontSize: 26, fontWeight: 700, color: '#e2e8f0' },
    btn: { background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' },
    msg: { background: 'rgba(99,102,241,0.1)', border: '1px solid #6366f1', color: '#a5b4fc', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 14 },
    formCard: { background: '#1a1a2e', border: '1px solid #2d2d4e', borderRadius: 12, padding: 28, marginBottom: 24 },
    label: { display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6 },
    input: { width: '100%', background: '#0f0f1a', border: '1px solid #3f3f5e', color: '#e2e8f0', padding: '10px 14px', borderRadius: 8, fontSize: 14, marginBottom: 16, outline: 'none' },
    row: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 16 },
    colTitle: { fontWeight: 600, color: '#6366f1', marginBottom: 12, fontSize: 15 },
    submitBtn: { background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white', border: 'none', padding: '10px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' },
    card: { background: '#1a1a2e', border: '1px solid #2d2d4e', borderRadius: 12, padding: 24, marginBottom: 16 },
    cardTitle: { fontSize: 18, fontWeight: 700, color: '#e2e8f0', marginBottom: 8 },
    compRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 16 },
    col: { background: '#0f0f1a', borderRadius: 8, padding: 16 },
    optName: { fontWeight: 600, color: '#6366f1', marginBottom: 12 },
    item: { marginBottom: 8 },
    itemLabel: { fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 },
    itemVal: { color: '#e2e8f0', fontSize: 14, marginTop: 2 },
  };

  const F = ({ label, field }) => (
    <div>
      <label style={s.label}>{label}</label>
      <input style={s.input} value={form[field]} onChange={e => setForm({...form, [field]: e.target.value})} />
    </div>
  );

  return (
    <div>
      <div style={s.header}>
        <h1 style={s.h1}>⚖️ Option Comparison</h1>
        <button style={s.btn} onClick={() => setShow(!show)}>+ New Comparison</button>
      </div>
      {msg && <div style={s.msg}>{msg}</div>}
      {show && (
        <div style={s.formCard}>
          <form onSubmit={handleSubmit}>
            <label style={s.label}>Title</label>
            <input style={s.input} placeholder="e.g. Tech Stack Comparison" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required />
            <label style={s.label}>Description</label>
            <input style={s.input} placeholder="Brief context" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
            <div style={s.row}>
              <div>
                <div style={s.colTitle}>Option A</div>
                <F label="Name" field="optionAName" />
                <F label="Pros" field="optionAPros" />
                <F label="Cons" field="optionACons" />
                <F label="Cost" field="optionACost" />
                <F label="Risk" field="optionARisk" />
              </div>
              <div>
                <div style={s.colTitle}>Option B</div>
                <F label="Name" field="optionBName" />
                <F label="Pros" field="optionBPros" />
                <F label="Cons" field="optionBCons" />
                <F label="Cost" field="optionBCost" />
                <F label="Risk" field="optionBRisk" />
              </div>
            </div>
            <button type="submit" style={s.submitBtn}>Save Comparison</button>
          </form>
        </div>
      )}
      {items.map(item => (
        <div key={item.id} style={s.card}>
          <div style={s.cardTitle}>{item.title}</div>
          <div style={{ color: '#64748b', fontSize: 13, marginBottom: 8 }}>{item.description}</div>
          <div style={s.compRow}>
            {['A', 'B'].map(side => (
              <div key={side} style={s.col}>
                <div style={s.optName}>{side === 'A' ? item.optionAName : item.optionBName} (Option {side})</div>
                {[['Pros', side === 'A' ? item.optionAPros : item.optionBPros], ['Cons', side === 'A' ? item.optionACons : item.optionBCons], ['Cost', side === 'A' ? item.optionACost : item.optionBCost], ['Risk', side === 'A' ? item.optionARisk : item.optionBRisk]].map(([lbl, val]) => (
                  <div key={lbl} style={s.item}>
                    <div style={s.itemLabel}>{lbl}</div>
                    <div style={s.itemVal}>{val || '—'}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
      {items.length === 0 && <div style={{ color: '#64748b', textAlign: 'center', padding: 60 }}>No comparisons yet. Create one!</div>}
    </div>
  );
}
