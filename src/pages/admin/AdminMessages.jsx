import React, { useState, useEffect } from 'react';
import {
  Mail,
  MailOpen,
  Trash2,
  CheckCircle,
  Clock,
  RefreshCw,
  Search,
  Send,
  AlertCircle,
  Filter,
  BookOpen,
  ChevronDown,
  UserCheck,
  X,
  Tv,
  Users,
  Phone
} from 'lucide-react';

const CATEGORIES = [
  { label: 'All Messages', value: 'all' },
  { label: 'General Inquiry', value: 'General Inquiry' },
  { label: 'Prayer Requests', value: 'Prayer Request' },
  { label: 'Bible Study', value: 'Bible Study' },
  { label: 'Media & Tech', value: 'Media & Tech' },
  { label: 'Praise & Worship', value: 'Praise & Worship' },
  { label: 'Outreach', value: 'Outreach' },
  { label: 'High School', value: 'High School' },
];

const BIBLE_GROUPS = [
  'Central Meru Fellowship',
  'Nairobi Bible Study Group',
  'Machakos Study Circle',
  'Embu Word & Growth Group',
  'Nakuru Faith Fellowship',
  'Mombasa Coast Study Group',
];

const TEAM_LEADERS = [
  'Pastor Peter Mwiti',
  'Evaline Mukami',
  'Raymond Ewoi',
  'Vincent Mwendwa',
  'Morice Mutharimi',
  'Kennedy Mutuku',
];

const categoryColor = (cat) => {
  const map = {
    'Prayer Request': { bg: '#fff7ed', color: '#c2410c', border: '#fed7aa' },
    'Bible Study': { bg: '#eff6ff', color: '#1d4ed8', border: '#bfdbfe' },
    'Media & Tech': { bg: '#f0fdf4', color: '#166534', border: '#bbf7d0' },
    'Praise & Worship': { bg: '#fdf4ff', color: '#7e22ce', border: '#e9d5ff' },
    'Outreach': { bg: '#fff1f2', color: '#be123c', border: '#fecdd3' },
    'High School': { bg: '#fefce8', color: '#a16207', border: '#fde68a' },
    'General Inquiry': { bg: '#f8fafc', color: '#475569', border: '#e2e8f0' },
  };
  return map[cat] || map['General Inquiry'];
};

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [readFilter, setReadFilter] = useState('all');      // 'all' | 'unread' | 'read'
  const [categoryFilter, setCategoryFilter] = useState('all'); // category value or 'all'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [actionStatus, setActionStatus] = useState({ type: '', message: '' });

  // Bible Study allocation state
  const [allocGroup, setAllocGroup] = useState('');
  const [allocLeader, setAllocLeader] = useState('');
  const [allocating, setAllocating] = useState(false);
  const [allocSaved, setAllocSaved] = useState(false);

  // Media & Tech team add state
  const [mediaAdded, setMediaAdded] = useState(false);
  const [mediaAdding, setMediaAdding] = useState(false);
  const [waHover, setWaHover] = useState(false);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/messages');
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
        localStorage.setItem('kemt_messages_cache', JSON.stringify(data));
      } else throw new Error();
    } catch {
      const cached = localStorage.getItem('kemt_messages_cache');
      if (cached) {
        try { setMessages(JSON.parse(cached)); } catch {}
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMessages(); }, []);

  // Sync allocation fields & media status when selected message changes
  useEffect(() => {
    if (selectedMessage?.allocation) {
      setAllocGroup(selectedMessage.allocation.groupName || '');
      setAllocLeader(selectedMessage.allocation.teamLeader || '');
      setAllocSaved(true);
    } else {
      setAllocGroup('');
      setAllocLeader('');
      setAllocSaved(false);
    }
    setMediaAdded(!!selectedMessage?.addedToTeam);
  }, [selectedMessage?._id]);

  const handleToggleRead = async (id, currentStatus) => {
    try {
      await fetch(`/api/messages/${id}/read`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: !currentStatus }),
      });
    } catch {}
    const updated = messages.map(m => m._id === id ? { ...m, isRead: !currentStatus } : m);
    setMessages(updated);
    localStorage.setItem('kemt_messages_cache', JSON.stringify(updated));
    if (selectedMessage?._id === id) {
      setSelectedMessage({ ...selectedMessage, isRead: !currentStatus });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message permanently?')) return;
    try { await fetch(`/api/messages/${id}`, { method: 'DELETE' }); } catch {}
    const updated = messages.filter(m => m._id !== id);
    setMessages(updated);
    localStorage.setItem('kemt_messages_cache', JSON.stringify(updated));
    if (selectedMessage?._id === id) setSelectedMessage(null);
    setActionStatus({ type: 'success', message: 'Message deleted.' });
    setTimeout(() => setActionStatus({ type: '', message: '' }), 3000);
  };

  const handleDeleteAll = async () => {
    if (!window.confirm('Delete ALL messages permanently? This cannot be undone.')) return;
    try { await fetch('/api/messages', { method: 'DELETE' }); } catch {}
    setMessages([]);
    setSelectedMessage(null);
    localStorage.removeItem('kemt_messages_cache');
    setActionStatus({ type: 'success', message: 'All messages cleared.' });
    setTimeout(() => setActionStatus({ type: '', message: '' }), 3000);
  };

  const handleAddToTeam = async () => {
    if (!selectedMessage) return;
    setMediaAdding(true);
    try {
      const res = await fetch('/api/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: selectedMessage.name,
          email: selectedMessage.email,
          phone: selectedMessage.phone || '',
          skills: selectedMessage.skills || '',
          messageId: selectedMessage._id,
        }),
      });
      const data = await res.json();
      if (data.success || res.status === 409) {
        const updatedMsg = { ...selectedMessage, addedToTeam: true };
        const updated = messages.map(m => m._id === selectedMessage._id ? updatedMsg : m);
        setMessages(updated);
        setSelectedMessage(updatedMsg);
        localStorage.setItem('kemt_messages_cache', JSON.stringify(updated));
        setMediaAdded(true);
        setActionStatus({ type: 'success', message: res.status === 409 ? 'Already on the media team.' : `${selectedMessage.name} added to Media & Tech Team.` });
        setTimeout(() => setActionStatus({ type: '', message: '' }), 4000);
      }
    } catch {
      setMediaAdded(true);
      setActionStatus({ type: 'success', message: `${selectedMessage.name} marked as added to team.` });
      setTimeout(() => setActionStatus({ type: '', message: '' }), 4000);
    } finally {
      setMediaAdding(false);
    }
  };

  const handleAllocate = async () => {
    if (!allocGroup || !allocLeader) return;
    setAllocating(true);
    try {
      const res = await fetch(`/api/messages/${selectedMessage._id}/allocate`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ groupName: allocGroup, teamLeader: allocLeader }),
      });
      const data = await res.json();
      if (data.success) {
        const updatedMsg = data.message;
        const updated = messages.map(m => m._id === updatedMsg._id ? updatedMsg : m);
        setMessages(updated);
        setSelectedMessage(updatedMsg);
        localStorage.setItem('kemt_messages_cache', JSON.stringify(updated));
        setAllocSaved(true);
        setActionStatus({ type: 'success', message: `Allocated to ${allocGroup} under ${allocLeader}.` });
        setTimeout(() => setActionStatus({ type: '', message: '' }), 4000);
      }
    } catch {
      // Optimistic local update
      const allocation = { groupName: allocGroup, teamLeader: allocLeader, allocatedAt: new Date().toISOString() };
      const updatedMsg = { ...selectedMessage, allocation };
      const updated = messages.map(m => m._id === selectedMessage._id ? updatedMsg : m);
      setMessages(updated);
      setSelectedMessage(updatedMsg);
      localStorage.setItem('kemt_messages_cache', JSON.stringify(updated));
      setAllocSaved(true);
    } finally {
      setAllocating(false);
    }
  };

  const filteredMessages = messages.filter(msg => {
    const matchesRead =
      readFilter === 'all' ? true :
      readFilter === 'unread' ? !msg.isRead :
      msg.isRead;

    const matchesCat =
      categoryFilter === 'all' ? true :
      (msg.category || 'General Inquiry') === categoryFilter;

    const q = searchQuery.toLowerCase();
    const matchesSearch = !q ||
      (msg.name || '').toLowerCase().includes(q) ||
      (msg.email || '').toLowerCase().includes(q) ||
      (msg.subject || '').toLowerCase().includes(q) ||
      (msg.message || '').toLowerCase().includes(q) ||
      (msg.category || '').toLowerCase().includes(q);

    return matchesRead && matchesCat && matchesSearch;
  });

  const unreadCount = messages.filter(m => !m.isRead).length;

  // ─── Pill style helpers ───────────────────────────────────────────────────
  const pillStyle = (active) => ({
    padding: '5px 13px',
    borderRadius: '20px',
    border: 'none',
    backgroundColor: active ? '#E87D1E' : '#f1f5f9',
    color: active ? 'white' : '#475569',
    fontWeight: 600,
    fontSize: '0.82rem',
    cursor: 'pointer',
    transition: 'all 0.18s',
    whiteSpace: 'nowrap',
  });

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 className="admin-page-title" style={{ margin: 0, fontSize: '1.45rem' }}>
            Ministry Inbox
          </h1>
          <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: '0.88rem' }}>
            All department submissions from the website — forwarded to <strong>info@kingdomenlightenment.org</strong>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={handleDeleteAll}
            disabled={messages.length === 0}
            title="Delete all messages"
            style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              background: '#fff', border: '1.5px solid #E87D1E',
              padding: '8px 14px', borderRadius: '8px',
              color: '#E87D1E', fontWeight: 600, fontSize: '0.85rem',
              cursor: messages.length === 0 ? 'not-allowed' : 'pointer',
              opacity: messages.length === 0 ? 0.5 : 1,
              transition: 'all 0.18s',
            }}
          >
            <Trash2 size={14} />
            Delete All Messages
          </button>
          <button
            onClick={fetchMessages}
            style={{
              display: 'flex', alignItems: 'center', gap: '7px',
              background: '#fff', border: '1.5px solid #e2e8f0',
              padding: '8px 14px', borderRadius: '8px',
              color: '#475569', fontWeight: 600, fontSize: '0.85rem',
              cursor: 'pointer',
            }}
          >
            <RefreshCw size={14} className={loading ? 'fa-spin' : ''} />
            Refresh
          </button>
        </div>
      </div>

      {/* ── Status Toast ────────────────────────────────────────────────── */}
      {actionStatus.message && (
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '7px 16px', marginBottom: '18px', borderRadius: '50px',
          backgroundColor: '#f0fdf4', color: '#166534',
          border: '1px solid #bbf7d0', fontSize: '0.85rem', fontWeight: 600
        }}>
          <CheckCircle size={15} />
          {actionStatus.message}
        </div>
      )}

      {/* ── Filter Bar ──────────────────────────────────────────────────── */}
      <div style={{
        background: '#fff', padding: '14px 18px', borderRadius: '12px',
        border: '1px solid #e2e8f0', marginBottom: '20px',
        display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center',
      }}>
        {/* Read status pills */}
        <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
          <button style={pillStyle(readFilter === 'all')} onClick={() => setReadFilter('all')}>
            All ({messages.length})
          </button>
          <button style={{ ...pillStyle(readFilter === 'unread'), display: 'flex', alignItems: 'center', gap: '5px' }}
            onClick={() => setReadFilter('unread')}>
            Unread
            {unreadCount > 0 && (
              <span style={{
                background: readFilter === 'unread' ? 'white' : '#ef4444',
                color: readFilter === 'unread' ? '#E87D1E' : 'white',
                padding: '1px 5px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: 700
              }}>{unreadCount}</span>
            )}
          </button>
          <button style={pillStyle(readFilter === 'read')} onClick={() => setReadFilter('read')}>
            Read ({messages.length - unreadCount})
          </button>
        </div>

        {/* Divider */}
        <div style={{ width: '1px', height: '24px', background: '#e2e8f0', flexShrink: 0 }} />

        {/* Category dropdown */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <Filter size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            style={{
              padding: '6px 30px 6px 30px', borderRadius: '8px',
              border: '1.5px solid #e2e8f0', fontSize: '0.83rem',
              fontWeight: 600, color: '#334155', background: 'white',
              cursor: 'pointer', appearance: 'none', minWidth: '165px',
            }}
          >
            {CATEGORIES.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          <ChevronDown size={13} style={{ position: 'absolute', right: '9px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
        </div>

        {/* Search */}
        <div style={{ position: 'relative', flex: '1 1 220px', minWidth: '180px' }}>
          <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search name, email, subject..."
            style={{
              width: '100%', padding: '7px 10px 7px 32px',
              borderRadius: '8px', border: '1.5px solid #e2e8f0',
              fontSize: '0.84rem', boxSizing: 'border-box', outline: 'none', color: '#1e293b'
            }}
          />
        </div>
      </div>

      {/* ── Main Grid ───────────────────────────────────────────────────── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedMessage ? 'minmax(300px, 1fr) minmax(320px, 1.2fr)' : '1fr',
        gap: '20px',
        alignItems: 'start',
      }}>

        {/* ── Messages List ─────────────────────────────────────────────── */}
        <div style={{ background: '#fff', borderRadius: '12px', padding: '18px', border: '1px solid #e2e8f0' }}>
          {loading ? (
            <div style={{ padding: '36px', textAlign: 'center', color: '#94a3b8' }}>
              <RefreshCw size={22} className="fa-spin" style={{ display: 'block', margin: '0 auto 10px' }} />
              Loading messages...
            </div>
          ) : filteredMessages.length === 0 ? (
            <div style={{ padding: '36px 20px', textAlign: 'center', color: '#94a3b8', background: '#f8fafc', borderRadius: '8px' }}>
              <Mail size={32} opacity={0.3} style={{ display: 'block', margin: '0 auto 10px' }} />
              <p style={{ margin: '0 0 4px', fontWeight: 600, color: '#475569' }}>No messages found</p>
              <p style={{ margin: 0, fontSize: '0.82rem' }}>
                {readFilter !== 'all' || categoryFilter !== 'all' || searchQuery
                  ? 'Try adjusting your filters or search.'
                  : 'Submissions from the website will appear here.'}
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filteredMessages.map(msg => {
                const cc = categoryColor(msg.category);
                const isSelected = selectedMessage?._id === msg._id;
                return (
                  <div
                    key={msg._id}
                    onClick={() => {
                      setSelectedMessage(msg);
                      if (!msg.isRead) handleToggleRead(msg._id, false);
                    }}
                    style={{
                      padding: '13px 15px',
                      borderRadius: '9px',
                      border: isSelected ? '2px solid #E87D1E' : !msg.isRead ? '1.5px solid #fed7aa' : '1px solid #e2e8f0',
                      backgroundColor: isSelected ? '#fffaf5' : !msg.isRead ? '#fffdfa' : '#fff',
                      cursor: 'pointer',
                      transition: 'all 0.18s',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                        <span style={{
                          width: '7px', height: '7px', borderRadius: '50%', flexShrink: 0,
                          backgroundColor: !msg.isRead ? '#E87D1E' : '#cbd5e1'
                        }} />
                        <span style={{ fontWeight: !msg.isRead ? 700 : 600, fontSize: '0.9rem', color: '#1e293b' }}>
                          {msg.name}
                        </span>
                      </div>
                      <span style={{ fontSize: '0.74rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <Clock size={11} />
                        {new Date(msg.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                      <p style={{ margin: 0, fontSize: '0.82rem', color: '#475569', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                        {msg.subject || msg.category || 'General Inquiry'}
                      </p>
                      {msg.category && (
                        <span style={{
                          padding: '2px 7px', borderRadius: '10px', fontSize: '0.68rem', fontWeight: 700, flexShrink: 0,
                          backgroundColor: cc.bg, color: cc.color, border: `1px solid ${cc.border}`
                        }}>
                          {msg.category}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Message Detail Panel ──────────────────────────────────────── */}
        {selectedMessage && (() => {
          const cc = categoryColor(selectedMessage.category);
          const isBibleStudy = selectedMessage.category === 'Bible Study';
          return (
            <div style={{
              background: '#fff', borderRadius: '12px', border: '1px solid #e2e8f0',
              display: 'flex', flexDirection: 'column', overflow: 'hidden',
            }}>
              {/* Detail header */}
              <div style={{ padding: '16px 18px', borderBottom: '1px solid #f1f5f9', background: '#fafafa' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '5px', flexWrap: 'wrap' }}>
                      <span style={{
                        padding: '2px 9px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: 700,
                        textTransform: 'uppercase', backgroundColor: cc.bg, color: cc.color, border: `1px solid ${cc.border}`
                      }}>
                        {selectedMessage.category || 'General Inquiry'}
                      </span>
                      <span style={{
                        padding: '2px 9px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: 700,
                        backgroundColor: selectedMessage.isRead ? '#f1f5f9' : '#fff7ed',
                        color: selectedMessage.isRead ? '#64748b' : '#c2410c',
                        border: selectedMessage.isRead ? '1px solid #e2e8f0' : '1px solid #fed7aa'
                      }}>
                        {selectedMessage.isRead ? 'Read' : '● Unread'}
                      </span>
                      {selectedMessage.isUrgent && (
                        <span style={{ padding: '2px 9px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: 700, background: '#fff1f2', color: '#be123c', border: '1px solid #fecdd3' }}>
                          🔴 URGENT
                        </span>
                      )}
                    </div>
                    <h3 style={{ margin: '0 0 4px', fontSize: '1.05rem', fontWeight: 700, color: '#1e293b', lineHeight: 1.3, wordBreak: 'break-word' }}>
                      {selectedMessage.subject || selectedMessage.category || 'General Inquiry'}
                    </h3>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748b' }}>
                      From: <strong>{selectedMessage.name}</strong> · {selectedMessage.email}
                      {selectedMessage.phone && <span> · {selectedMessage.phone}</span>}
                    </p>
                    <p style={{ margin: '2px 0 0', fontSize: '0.75rem', color: '#94a3b8' }}>
                      {new Date(selectedMessage.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {/* Action buttons */}
                  <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                    <button
                      onClick={() => handleToggleRead(selectedMessage._id, selectedMessage.isRead)}
                      title={selectedMessage.isRead ? 'Mark as unread' : 'Mark as read'}
                      style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#475569', padding: '7px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    >
                      {selectedMessage.isRead ? <Mail size={15} /> : <MailOpen size={15} />}
                    </button>
                    <button
                      onClick={() => handleDelete(selectedMessage._id)}
                      title="Delete message"
                      style={{ background: '#fff1f2', border: '1px solid #fecdd3', color: '#e11d48', padding: '7px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    >
                      <Trash2 size={15} />
                    </button>
                    <button
                      onClick={() => setSelectedMessage(null)}
                      title="Close"
                      style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', color: '#64748b', padding: '7px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                    >
                      <X size={15} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Detail body */}
              <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', maxHeight: 'calc(100vh - 320px)' }}>

                {/* Extra fields */}
                {(selectedMessage.residence || selectedMessage.skills || selectedMessage.institution) && (
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {selectedMessage.residence && (
                      <div style={{ padding: '7px 12px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '0.8rem' }}>
                        <span style={{ color: '#94a3b8', fontWeight: 600, marginRight: '4px' }}>📍 Area:</span>
                        <span style={{ color: '#334155', fontWeight: 600 }}>{selectedMessage.residence}</span>
                      </div>
                    )}
                    {selectedMessage.skills && (
                      <div style={{ padding: '7px 12px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '0.8rem' }}>
                        <span style={{ color: '#94a3b8', fontWeight: 600, marginRight: '4px' }}>🎯 Skills:</span>
                        <span style={{ color: '#334155', fontWeight: 600 }}>{selectedMessage.skills}</span>
                      </div>
                    )}
                    {selectedMessage.institution && (
                      <div style={{ padding: '7px 12px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '0.8rem' }}>
                        <span style={{ color: '#94a3b8', fontWeight: 600, marginRight: '4px' }}>🏫 School:</span>
                        <span style={{ color: '#334155', fontWeight: 600 }}>{selectedMessage.institution}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Message content */}
                <div>
                  <p style={{ margin: '0 0 6px', fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Message
                  </p>
                  <div style={{
                    background: '#f8fafc', padding: '13px 15px',
                    borderRadius: '8px', border: '1px solid #e2e8f0',
                    color: '#1e293b', lineHeight: '1.65',
                    fontSize: '0.88rem', whiteSpace: 'pre-wrap',
                  }}>
                    {selectedMessage.message}
                  </div>
                </div>

                {/* ── Bible Study Allocation Module ───────────────────── */}
                {isBibleStudy && (
                  <div style={{
                    background: allocSaved ? '#eff6ff' : '#f8fafc',
                    borderRadius: '10px', border: `1px solid ${allocSaved ? '#bfdbfe' : '#e2e8f0'}`,
                    padding: '14px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                      <BookOpen size={16} color={allocSaved ? '#1d4ed8' : '#E87D1E'} />
                      <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#1e293b' }}>
                        Bible Study Allocation
                      </span>
                      {allocSaved && selectedMessage.allocation && (
                        <span style={{ marginLeft: 'auto', fontSize: '0.72rem', color: '#1d4ed8', fontWeight: 700, padding: '2px 8px', background: '#dbeafe', borderRadius: '10px' }}>
                          ✓ Allocated
                        </span>
                      )}
                    </div>

                    {allocSaved && selectedMessage.allocation && (
                      <div style={{ padding: '9px 12px', borderRadius: '8px', background: '#dbeafe', border: '1px solid #93c5fd', marginBottom: '12px', fontSize: '0.83rem', color: '#1e3a8a' }}>
                        <strong>Group:</strong> {selectedMessage.allocation.groupName} &nbsp;·&nbsp;
                        <strong>Leader:</strong> {selectedMessage.allocation.teamLeader}<br />
                        <span style={{ fontSize: '0.74rem', opacity: 0.75 }}>Allocated: {new Date(selectedMessage.allocation.allocatedAt).toLocaleDateString()}</span>
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <div style={{ flex: '1 1 150px' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#64748b', marginBottom: '4px' }}>
                          Assign Bible Group
                        </label>
                        <select
                          value={allocGroup}
                          onChange={e => { setAllocGroup(e.target.value); setAllocSaved(false); }}
                          style={{ width: '100%', padding: '7px 10px', borderRadius: '7px', border: '1.5px solid #bfdbfe', fontSize: '0.82rem', background: 'white', color: '#1e293b' }}
                        >
                          <option value="">Select group...</option>
                          {BIBLE_GROUPS.map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                      </div>
                      <div style={{ flex: '1 1 140px' }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#64748b', marginBottom: '4px' }}>
                          Team Leader
                        </label>
                        <select
                          value={allocLeader}
                          onChange={e => { setAllocLeader(e.target.value); setAllocSaved(false); }}
                          style={{ width: '100%', padding: '7px 10px', borderRadius: '7px', border: '1.5px solid #bfdbfe', fontSize: '0.82rem', background: 'white', color: '#1e293b' }}
                        >
                          <option value="">Select leader...</option>
                          {TEAM_LEADERS.map(l => <option key={l} value={l}>{l}</option>)}
                        </select>
                      </div>
                    </div>
                    <button
                      onClick={handleAllocate}
                      disabled={!allocGroup || !allocLeader || allocating}
                      style={{
                        marginTop: '10px', width: '100%', padding: '8px',
                        borderRadius: '8px', border: 'none', fontWeight: 700,
                        fontSize: '0.85rem', cursor: !allocGroup || !allocLeader ? 'not-allowed' : 'pointer',
                        background: !allocGroup || !allocLeader ? '#e2e8f0' : '#1d4ed8',
                        color: !allocGroup || !allocLeader ? '#94a3b8' : 'white',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
                        transition: 'all 0.18s',
                      }}
                    >
                      <UserCheck size={15} />
                      {allocating ? 'Saving Allocation...' : allocSaved ? 'Update Allocation' : 'Confirm Bible Study Allocation'}
                    </button>
                  </div>
                )}

                {/* ── Media & Tech Ministry Module ───────────────────── */}
                {selectedMessage.category === 'Media & Tech' && (
                  <div style={{
                    background: mediaAdded ? '#f0fdf4' : '#f8fafc',
                    borderRadius: '10px', border: `1px solid ${mediaAdded ? '#bbf7d0' : '#e2e8f0'}`,
                    padding: '14px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <Tv size={16} color={mediaAdded ? '#16a34a' : '#E87D1E'} />
                      <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#1e293b' }}>
                        Media &amp; Tech Team Roster
                      </span>
                      {mediaAdded && (
                        <span style={{ marginLeft: 'auto', fontSize: '0.72rem', color: '#166534', fontWeight: 700, padding: '2px 8px', background: '#dcfce7', borderRadius: '10px' }}>
                          ✓ Added to Team
                        </span>
                      )}
                    </div>
                    <p style={{ margin: '0 0 10px', fontSize: '0.8rem', color: '#64748b' }}>
                      Add this volunteer to the official KEMT Media &amp; Digital Infrastructure roster.
                    </p>
                    <button
                      onClick={handleAddToTeam}
                      disabled={mediaAdding || mediaAdded}
                      style={{
                        width: '100%', padding: '8px',
                        borderRadius: '8px', border: 'none', fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: mediaAdded ? 'default' : 'pointer',
                        background: mediaAdded ? '#16a34a' : '#E87D1E',
                        color: 'white',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '7px',
                        transition: 'all 0.18s',
                      }}
                    >
                      <Users size={15} />
                      {mediaAdding ? 'Adding to Team...' : mediaAdded ? '✓ Added to Media & Tech Team' : 'Add to Media & Tech Team'}
                    </button>
                  </div>
                )}

                {/* ── Reply / WhatsApp / Close actions — Horizontal Alignment ── */}
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                  paddingTop: '8px',
                  borderTop: '1px solid #f1f5f9',
                  marginTop: '4px'
                }}>
                  <a
                    href={`mailto:${selectedMessage.email}?subject=${encodeURIComponent('Re: ' + (selectedMessage.subject || 'Your inquiry to KEMT'))}`}
                    style={{
                      flex: 1, backgroundColor: '#E87D1E', color: 'white',
                      textDecoration: 'none', padding: '9px 12px', borderRadius: '7px',
                      fontWeight: 700, fontSize: '0.84rem',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <Send size={14} />
                    Reply via Email
                  </a>

                  {selectedMessage.phone && (() => {
                    const cleanPhone = selectedMessage.phone.replace(/[^0-9]/g, '');
                    const formattedPhone = cleanPhone.startsWith('0') ? '254' + cleanPhone.slice(1) : cleanPhone;
                    const waUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent('Hello ' + selectedMessage.name + ', greetings from KEMT!')}`;
                    return (
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => setWaHover(true)}
                        onMouseLeave={() => setWaHover(false)}
                        style={{
                          flex: 1,
                          backgroundColor: waHover ? '#E87D1E' : '#ffffff',
                          color: waHover ? '#ffffff' : '#E87D1E',
                          border: '1.5px solid #E87D1E',
                          textDecoration: 'none', padding: '9px 12px', borderRadius: '7px',
                          fontWeight: 700, fontSize: '0.84rem',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                          transition: 'all 0.18s',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        <Phone size={14} />
                        WhatsApp
                      </a>
                    );
                  })()}

                  <button
                    onClick={() => setSelectedMessage(null)}
                    style={{
                      background: '#f1f5f9', border: '1px solid #e2e8f0',
                      color: '#475569', padding: '9px 14px', borderRadius: '7px',
                      fontWeight: 600, fontSize: '0.84rem', cursor: 'pointer',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};

export default AdminMessages;
