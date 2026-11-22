import React, { useEffect, useState } from 'react';
import { notificationAPI } from '../services/api';

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const load = () => notificationAPI.getAll().then(r => setNotifications(r.data)).catch(() => {});
  useEffect(() => { load(); }, []);

  const markRead = async (id) => {
    await notificationAPI.markRead(id);
    load();
  };

  const s = {
    h1: { fontSize: 26, fontWeight: 700, color: '#e2e8f0', marginBottom: 24 },
    item: (read) => ({ background: read ? '#1a1a2e' : 'rgba(99,102,241,0.08)', border: `1px solid ${read ? '#2d2d4e' : '#6366f1'}`, borderRadius: 10, padding: 20, marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }),
    msg: { color: '#e2e8f0', fontSize: 14 },
    time: { color: '#64748b', fontSize: 12, marginTop: 4 },
    btn: { background: 'rgba(99,102,241,0.1)', border: '1px solid #6366f1', color: '#a5b4fc', padding: '6px 14px', borderRadius: 6, fontSize: 13, cursor: 'pointer' },
    empty: { color: '#64748b', textAlign: 'center', padding: 60, fontSize: 15 },
  };

  return (
    <div>
      <h1 style={s.h1}>🔔 Notifications</h1>
      {notifications.length === 0
        ? <div style={s.empty}>No notifications yet.</div>
        : notifications.map(n => (
          <div key={n.id} style={s.item(n.read)}>
            <div>
              <div style={s.msg}>{n.message}</div>
              <div style={s.time}>{new Date(n.createdAt).toLocaleString()}</div>
            </div>
            {!n.read && <button style={s.btn} onClick={() => markRead(n.id)}>Mark Read</button>}
          </div>
        ))
      }
    </div>
  );
}
