import React, { useState, useEffect } from 'react';
import {
  BookOpen, Users, Trash2, RefreshCw, Shuffle, ChevronDown, ChevronUp,
  CheckCircle, UserCheck, MapPin, Mail, Phone
} from 'lucide-react';

const GROUP_COLORS = [
  { bg: '#eff6ff', border: '#bfdbfe', header: '#1d4ed8', badge: '#dbeafe', badgeText: '#1e40af' },
  { bg: '#f0fdf4', border: '#bbf7d0', header: '#166534', badge: '#dcfce7', badgeText: '#14532d' },
  { bg: '#fff7ed', border: '#fed7aa', header: '#c2410c', badge: '#ffedd5', badgeText: '#9a3412' },
  { bg: '#fdf4ff', border: '#e9d5ff', header: '#7e22ce', badge: '#f3e8ff', badgeText: '#6b21a8' },
  { bg: '#fefce8', border: '#fde68a', header: '#a16207', badge: '#fef9c3', badgeText: '#854d0e' },
  { bg: '#fff1f2', border: '#fecdd3', header: '#be123c', badge: '#ffe4e6', badgeText: '#9f1239' },
];

const AdminBibleGroups = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [arranging, setArranging] = useState(false);
  const [actionMsg, setActionMsg] = useState('');
  const [expanded, setExpanded] = useState({});

  const toast = (msg) => { setActionMsg(msg); setTimeout(() => setActionMsg(''), 4000); };

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/bible-groups');
      if (res.ok) setGroups(await res.json());
    } catch {
      const cached = localStorage.getItem('kemt_bible_groups');
      if (cached) try { setGroups(JSON.parse(cached)); } catch {}
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchGroups(); }, []);

  useEffect(() => {
    localStorage.setItem('kemt_bible_groups', JSON.stringify(groups));
  }, [groups]);

  const handleArrange = async () => {
    if (!window.confirm('This will auto-arrange all Bible Study submissions into new groups (max 5 per group). Continue?')) return;
    setArranging(true);
    try {
      const res = await fetch('/api/bible-groups/arrange', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setGroups(data.groups);
        setExpanded(Object.fromEntries(data.groups.map(g => [g.id, true])));
        toast(`✓ ${data.groups.length} group(s) arranged from Bible Study submissions.`);
      } else {
        toast('⚠ ' + (data.message || 'Could not arrange groups — check if Bible Study messages exist.'));
      }
    } catch {
      toast('⚠ Server offline. Please ensure the backend is running.');
    } finally {
      setArranging(false);
    }
  };

  const handleDeleteGroup = async (id) => {
    if (!window.confirm('Delete this entire Bible Study group?')) return;
    try {
      await fetch(`/api/bible-groups/${id}`, { method: 'DELETE' });
    } catch {}
    const updated = groups.filter(g => g.id !== id);
    setGroups(updated);
    toast('Group removed.');
  };

  const handleRemoveMember = (groupId, memberId) => {
    const updated = groups.map(g =>
      g.id === groupId ? { ...g, members: g.members.filter(m => m._id !== memberId) } : g
    ).filter(g => g.members.length > 0);
    setGroups(updated);
    fetch('/api/bible-groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ groups: updated }),
    }).catch(() => {});
    toast('Member removed from group.');
  };

  const handleRenameGroup = (id, newName) => {
    const updated = groups.map(g => g.id === id ? { ...g, name: newName } : g);
    setGroups(updated);
    fetch('/api/bible-groups', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ groups: updated }),
    }).catch(() => {});
  };

  const toggleExpand = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  const totalMembers = groups.reduce((acc, g) => acc + g.members.length, 0);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 className="admin-page-title" style={{ margin: 0, fontSize: '1.45rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BookOpen size={22} color="#E87D1E" /> Bible Study Groups
          </h1>
          <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: '0.88rem' }}>
            Manage discipleship groups · {groups.length} group{groups.length !== 1 ? 's' : ''} · {totalMembers} member{totalMembers !== 1 ? 's' : ''}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button onClick={fetchGroups} style={btnStyle('#fff', '#e2e8f0', '#475569')}>
            <RefreshCw size={14} className={loading ? 'fa-spin' : ''} /> Refresh
          </button>
          <button onClick={handleArrange} disabled={arranging} style={btnStyle('#E87D1E', '#E87D1E', 'white', true)}>
            <Shuffle size={14} /> {arranging ? 'Arranging...' : 'Auto-Arrange Groups'}
          </button>
        </div>
      </div>

      {/* Toast */}
      {actionMsg && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '7px 16px', marginBottom: '18px', borderRadius: '50px', backgroundColor: '#f0fdf4', color: '#166534', border: '1px solid #bbf7d0', fontSize: '0.85rem', fontWeight: 600 }}>
          <CheckCircle size={14} /> {actionMsg}
        </div>
      )}

      {/* Info card */}
      <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '10px', padding: '12px 16px', marginBottom: '22px', fontSize: '0.85rem', color: '#1e40af', lineHeight: 1.6 }}>
        <strong>How Auto-Arrange works:</strong> Groups all Bible Study form submissions into teams of up to <strong>5 people</strong>.
        Members with the same residence are placed in different groups. Leadership members (Evaline Mukami, Raymond Ewoi, etc.) are spread one per group.
        Click <strong>Auto-Arrange Groups</strong> to re-run anytime.
      </div>

      {/* Empty state */}
      {!loading && groups.length === 0 && (
        <div style={{ padding: '48px 24px', textAlign: 'center', background: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
          <BookOpen size={38} style={{ display: 'block', margin: '0 auto 12px', opacity: 0.3, color: '#475569' }} />
          <p style={{ margin: '0 0 6px', fontWeight: 700, color: '#1e293b', fontSize: '1rem' }}>No groups yet</p>
          <p style={{ margin: '0 0 20px', color: '#64748b', fontSize: '0.88rem' }}>
            Submit Bible Study requests via the Contact page, then click <em>Auto-Arrange Groups</em> above.
          </p>
          <button onClick={handleArrange} style={btnStyle('#E87D1E', '#E87D1E', 'white', true)}>
            <Shuffle size={14} /> Auto-Arrange Groups
          </button>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
          <RefreshCw size={22} className="fa-spin" style={{ display: 'block', margin: '0 auto 10px' }} />
          Loading groups...
        </div>
      )}

      {/* Groups Grid */}
      {!loading && groups.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '18px' }}>
          {groups.map((group, gi) => {
            const palette = GROUP_COLORS[gi % GROUP_COLORS.length];
            const isOpen = expanded[group.id] !== false;
            return (
              <div key={group.id} style={{ background: palette.bg, border: `1.5px solid ${palette.border}`, borderRadius: '12px', overflow: 'hidden' }}>
                {/* Group Header */}
                <div style={{ background: palette.header, padding: '12px 15px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: 0 }}>
                    <Users size={16} color="rgba(255,255,255,0.9)" />
                    <input
                      value={group.name}
                      onChange={e => handleRenameGroup(group.id, e.target.value)}
                      style={{ background: 'transparent', border: 'none', color: 'white', fontWeight: 700, fontSize: '0.95rem', width: '100%', outline: 'none', cursor: 'text' }}
                      title="Click to rename group"
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                    <span style={{ background: 'rgba(255,255,255,0.25)', color: 'white', padding: '2px 8px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: 700 }}>
                      {group.members.length}/5
                    </span>
                    <button onClick={() => toggleExpand(group.id)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '4px 6px', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                    <button onClick={() => handleDeleteGroup(group.id)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '4px 6px', borderRadius: '5px', cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="Delete group">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Members */}
                {isOpen && (
                  <div style={{ padding: '12px' }}>
                    {group.members.length === 0 ? (
                      <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.82rem', padding: '12px 0', margin: 0 }}>No members</p>
                    ) : (
                      group.members.map((m, mi) => (
                        <div key={m._id || mi} style={{
                          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                          padding: '9px 10px', borderRadius: '8px',
                          background: 'white', border: `1px solid ${palette.border}`,
                          marginBottom: mi < group.members.length - 1 ? '6px' : 0
                        }}>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                              <UserCheck size={13} color={palette.header} />
                              <span style={{ fontWeight: 700, fontSize: '0.87rem', color: '#1e293b' }}>{m.name}</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                              <span style={{ fontSize: '0.76rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                <Mail size={10} /> {m.email}
                              </span>
                              {m.phone && (
                                <span style={{ fontSize: '0.76rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                  <Phone size={10} /> {m.phone}
                                </span>
                              )}
                              {m.residence && (
                                <span style={{ fontSize: '0.74rem', padding: '1px 6px', borderRadius: '8px', background: palette.badge, color: palette.badgeText, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '3px', marginTop: '2px', alignSelf: 'flex-start' }}>
                                  <MapPin size={9} /> {m.residence}
                                </span>
                              )}
                            </div>
                          </div>
                          <button onClick={() => handleRemoveMember(group.id, m._id)} title="Remove from group" style={{ background: '#fff1f2', border: 'none', color: '#e11d48', padding: '4px', borderRadius: '5px', cursor: 'pointer', flexShrink: 0, display: 'flex', alignItems: 'center', marginLeft: '6px' }}>
                            <Trash2 size={12} />
                          </button>
                        </div>
                      ))
                    )}
                    {group.members.length < 5 && (
                      <p style={{ textAlign: 'center', fontSize: '0.74rem', color: '#94a3b8', margin: '8px 0 0', fontStyle: 'italic' }}>
                        {5 - group.members.length} slot{5 - group.members.length !== 1 ? 's' : ''} available
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Reusable button style helper
const btnStyle = (bg, borderColor, color, filled = false) => ({
  display: 'flex', alignItems: 'center', gap: '7px',
  background: bg, border: `1.5px solid ${borderColor}`,
  padding: '8px 14px', borderRadius: '8px',
  color, fontWeight: 600, fontSize: '0.85rem',
  cursor: 'pointer', whiteSpace: 'nowrap',
  ...(filled ? { boxShadow: '0 2px 8px rgba(232,125,30,0.25)' } : {}),
});

export default AdminBibleGroups;
