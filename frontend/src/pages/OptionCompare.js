import React, { useEffect, useState } from 'react';
import { comparisonAPI } from '../services/api';

// Simple score: count non-empty pros vs cons+risk fields
function scoreOption(name, pros, cons, cost, risk) {
  let score = 0;
  if (pros)  score += pros.split(',').filter(x => x.trim()).length;   // each pro +1
  if (cons)  score -= cons.split(',').filter(x => x.trim()).length;   // each con -1
  if (risk)  score -= (risk.toLowerCase().includes('high') ? 2 : risk.toLowerCase().includes('medium') ? 1 : 0);
  if (cost)  score -= (cost.toLowerCase().includes('high') ? 1 : 0);
  return score;
}

function ScoreBadge({ score, isWinner }) {
  const s = {
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: 20,
    fontSize: 12,
    fontWeight: 700,
    background: isWinner ? 'rgba(16,185,129,0.15)' : 'rgba(100,116,139,0.15)',
    color: isWinner ? '#6ee7b7' : '#94a3b8',
    marginLeft: 8,
  };
  return <span style={s}>{isWinner ? '🏆 Recommended' : `Score: ${score}`}</span>;
}

export default function OptionCompare() {
  const [items, setItems] = useState([]);
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState('');
  const [isError, setIsError] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [form, setForm] = useState({
    title: '', description: '',
    optionAName: '', optionAPros: '', optionACons: '', optionACost: '', optionARisk: '',
    optionBName: '', optionBPros: '', optionBCons: '', optionBCost: '', optionBRisk: '',
  });

  const load = () => comparisonAPI.getAll().then(r => setItems(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const resetForm = () => setForm({
    title: '', description: '',
    optionAName: '', optionAPros: '', optionACons: '', optionACost: '', optionARisk: '',
    optionBName: '', optionBPros: '', optionBCons: '', optionBCost: '', optionBRisk: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(''); setIsError(false);
    try {
      await comparisonAPI.create(form);
      setMsg('Comparison created!');
      setIsError(false);
      setShow(false);
      resetForm();
      load();
      setTimeout(() => setMsg(''), 3000);
    } catch (err) {
      setIsError(true);
      const serverMsg = err.response?.data?.message || err.message;
      setMsg('Failed to create comparison' + (serverMsg ? ': ' + serverMsg : ''));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this comparison?')) return;
    setDeleting(id);
    try {
      await comparisonAPI.delete(id);
      load();
    } catch {
      setMsg('Failed to delete'); setIsError(true);
    } finally { setDeleting(null); }
  };

  const s = {
    header:    { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
    h1:        { fontSize: 26, fontWeight: 700, color: '#e2e8f0' },
    newBtn:    { background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' },
    msgOk:     { background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#6ee7b7', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 14 },
    msgErr:    { background: 'rgba(239,68,68,0.1)',  border: '1px solid rgba(239,68,68,0.3)',  color: '#f87171', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 14 },
    formCard:  { background: '#1a1a2e', border: '1px solid #2d2d4e', borderRadius: 12, padding: 28, marginBottom: 24 },
    label:     { display: 'block', fontSize: 13, color: '#94a3b8', marginBottom: 6 },
    input:     { width: '100%', background: '#0f0f1a', border: '1px solid #3f3f5e', color: '#e2e8f0', padding: '10px 14px', borderRadius: 8, fontSize: 14, marginBottom: 16, outline: 'none', boxSizing: 'border-box' },
    twoCol:    { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 16 },
    colTitle:  { fontWeight: 600, color: '#6366f1', marginBottom: 12, fontSize: 15, borderBottom: '1px solid #2d2d4e', paddingBottom: 8 },
    submitBtn: { background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: 'white', border: 'none', padding: '10px 24px', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', marginTop: 4 },
    card:      { background: '#1a1a2e', border: '1px solid #2d2d4e', borderRadius: 12, padding: 24, marginBottom: 16 },
    cardTop:   { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 },
    cardTitle: { fontSize: 18, fontWeight: 700, color: '#e2e8f0' },
    cardDesc:  { color: '#64748b', fontSize: 13, marginBottom: 16 },
    delBtn:    { background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', padding: '5px 12px', borderRadius: 8, cursor: 'pointer', fontSize: 13, flexShrink: 0 },
    compRow:   { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 },
    col:       (winner) => ({ background: '#0f0f1a', borderRadius: 8, padding: 16, border: winner ? '1px solid rgba(16,185,129,0.4)' : '1px solid transparent' }),
    optName:   { fontWeight: 600, color: '#6366f1', marginBottom: 12, fontSize: 15, display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 4 },
    fieldRow:  { marginBottom: 10 },
    fieldLbl:  { fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 },
    fieldVal:  { color: '#e2e8f0', fontSize: 14, marginTop: 2 },
    hint:      { color: '#475569', fontSize: 12, marginBottom: 16, fontStyle: 'italic' },
  };

  const Field = ({ label, field, required, placeholder }) => (
    <div>
      <label style={s.label}>{label}{required && <span style={{ color: '#f87171' }}> *</span>}</label>
      <input
        style={s.input}
        placeholder={placeholder || ''}
        value={form[field]}
        onChange={e => setForm({ ...form, [field]: e.target.value })}
        required={required}
      />
    </div>
  );

  return (
    <div>
      <div style={s.header}>
        <h1 style={s.h1}>⚖️ Option Comparison</h1>
        <button style={s.newBtn} onClick={() => { setShow(!show); resetForm(); }}>
          {show ? '✕ Cancel' : '+ New Comparison'}
        </button>
      </div>

      {msg && <div style={isError ? s.msgErr : s.msgOk}>{msg}</div>}

      {show && (
        <div style={s.formCard}>
          <form onSubmit={handleSubmit}>
            <label style={s.label}>Title <span style={{ color: '#f87171' }}>*</span></label>
            <input style={s.input} placeholder="e.g. Cloud Provider Comparison" value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })} required />
            <label style={s.label}>Description</label>
            <input style={s.input} placeholder="Brief context for this comparison" value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })} />
            <p style={s.hint}>Tip: separate multiple Pros/Cons with commas. Scoring is automatic.</p>
            <div style={s.twoCol}>
              <div>
                <div style={s.colTitle}>🅐 Option A</div>
                <Field label="Name" field="optionAName" required placeholder="e.g. AWS" />
                <Field label="Pros (comma-separated)" field="optionAPros" placeholder="e.g. Scalable, Reliable" />
                <Field label="Cons (comma-separated)" field="optionACons" placeholder="e.g. Expensive, Complex" />
                <Field label="Cost" field="optionACost" placeholder="e.g. High / $500/mo" />
                <Field label="Risk" field="optionARisk" placeholder="e.g. Low / Medium / High" />
              </div>
              <div>
                <div style={s.colTitle}>🅑 Option B</div>
                <Field label="Name" field="optionBName" required placeholder="e.g. Azure" />
                <Field label="Pros (comma-separated)" field="optionBPros" placeholder="e.g. Good support, Familiar" />
                <Field label="Cons (comma-separated)" field="optionBCons" placeholder="e.g. Slower, Costly" />
                <Field label="Cost" field="optionBCost" placeholder="e.g. Medium / $300/mo" />
                <Field label="Risk" field="optionBRisk" placeholder="e.g. Low / Medium / High" />
              </div>
            </div>
            <button type="submit" style={s.submitBtn}>Save Comparison</button>
          </form>
        </div>
      )}

      {items.length === 0 && !show && (
        <div style={{ color: '#64748b', textAlign: 'center', padding: 60 }}>
          No comparisons yet. Click "+ New Comparison" to start.
        </div>
      )}

      {items.map(item => {
        const scoreA = scoreOption(item.optionAName, item.optionAPros, item.optionACons, item.optionACost, item.optionARisk);
        const scoreB = scoreOption(item.optionBName, item.optionBPros, item.optionBCons, item.optionBCost, item.optionBRisk);
        const winnerA = scoreA > scoreB;
        const winnerB = scoreB > scoreA;
        const tie = scoreA === scoreB;

        return (
          <div key={item.id} style={s.card}>
            <div style={s.cardTop}>
              <div>
                <div style={s.cardTitle}>
                  {item.title}
                  {tie
                    ? <span style={{ fontSize: 12, color: '#94a3b8', marginLeft: 8, fontWeight: 400 }}>🤝 Tie</span>
                    : null}
                </div>
              </div>
              <button style={s.delBtn} disabled={deleting === item.id}
                onClick={() => handleDelete(item.id)}>
                {deleting === item.id ? '...' : '🗑 Delete'}
              </button>
            </div>
            {item.description && <div style={s.cardDesc}>{item.description}</div>}

            <div style={s.compRow}>
              {[
                { side: 'A', name: item.optionAName, pros: item.optionAPros, cons: item.optionACons, cost: item.optionACost, risk: item.optionARisk, score: scoreA, winner: winnerA },
                { side: 'B', name: item.optionBName, pros: item.optionBPros, cons: item.optionBCons, cost: item.optionBCost, risk: item.optionBRisk, score: scoreB, winner: winnerB },
              ].map(opt => (
                <div key={opt.side} style={s.col(opt.winner)}>
                  <div style={s.optName}>
                    {opt.name || `Option ${opt.side}`}
                    <ScoreBadge score={opt.score} isWinner={opt.winner} />
                  </div>
                  {[['Pros', opt.pros], ['Cons', opt.cons], ['Cost', opt.cost], ['Risk', opt.risk]].map(([lbl, val]) => (
                    <div key={lbl} style={s.fieldRow}>
                      <div style={s.fieldLbl}>{lbl}</div>
                      <div style={s.fieldVal}>{val || '—'}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
