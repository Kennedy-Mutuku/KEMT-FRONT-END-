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
  Filter
} from 'lucide-react';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // 'all' | 'unread' | 'read'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [actionStatus, setActionStatus] = useState({ type: '', message: '' });

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/messages');
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
        localStorage.setItem('kemt_messages_cache', JSON.stringify(data));
      } else {
        throw new Error('Failed to fetch messages');
      }
    } catch {
      const cached = localStorage.getItem('kemt_messages_cache');
      if (cached) {
        try {
          setMessages(JSON.parse(cached));
        } catch {}
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleToggleRead = async (id, currentStatus) => {
    try {
      const res = await fetch(`/api/messages/${id}/read`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: !currentStatus })
      });
      if (res.ok) {
        const updated = messages.map(m => m._id === id ? { ...m, isRead: !currentStatus } : m);
        setMessages(updated);
        localStorage.setItem('kemt_messages_cache', JSON.stringify(updated));
        if (selectedMessage && selectedMessage._id === id) {
          setSelectedMessage({ ...selectedMessage, isRead: !currentStatus });
        }
      }
    } catch {
      // Offline toggle
      const updated = messages.map(m => m._id === id ? { ...m, isRead: !currentStatus } : m);
      setMessages(updated);
      localStorage.setItem('kemt_messages_cache', JSON.stringify(updated));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact inquiry?')) return;

    try {
      await fetch(`/api/messages/${id}`, { method: 'DELETE' });
    } catch {}

    const updated = messages.filter(m => m._id !== id);
    setMessages(updated);
    localStorage.setItem('kemt_messages_cache', JSON.stringify(updated));
    if (selectedMessage && selectedMessage._id === id) {
      setSelectedMessage(null);
    }
    setActionStatus({ type: 'success', message: 'Message removed successfully.' });
    setTimeout(() => setActionStatus({ type: '', message: '' }), 3000);
  };

  const filteredMessages = messages.filter(msg => {
    const matchesFilter = 
      filter === 'all' ? true :
      filter === 'unread' ? !msg.isRead :
      msg.isRead;
    
    const matchesSearch = 
      msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (msg.subject && msg.subject.toLowerCase().includes(searchQuery.toLowerCase())) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const unreadCount = messages.filter(m => !m.isRead).length;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 className="admin-page-title" style={{ margin: 0 }}>
            Contact Inquiries & Messages
          </h1>
          <p style={{ color: '#64748b', margin: '4px 0 0', fontSize: '0.9rem' }}>
            Messages received from the website contact form and forwarded to <strong>info@kingdomenlightenment.org</strong>
          </p>
        </div>

        <button 
          onClick={fetchMessages}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#ffffff',
            border: '1.5px solid #e2e8f0',
            padding: '8px 16px',
            borderRadius: '8px',
            color: '#475569',
            fontWeight: 600,
            fontSize: '0.88rem',
            cursor: 'pointer',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}
        >
          <RefreshCw size={15} className={loading ? 'fa-spin' : ''} />
          Refresh Messages
        </button>
      </div>

      {actionStatus.message && (
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 16px',
          marginBottom: '20px',
          borderRadius: '50px',
          backgroundColor: '#f0fdf4',
          color: '#166534',
          border: '1px solid #bbf7d0',
          fontSize: '0.88rem',
          fontWeight: 600
        }}>
          <CheckCircle size={16} />
          <span>{actionStatus.message}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div style={{
        background: '#ffffff',
        padding: '16px 20px',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        marginBottom: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setFilter('all')}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: 'none',
              backgroundColor: filter === 'all' ? '#E87D1E' : '#f1f5f9',
              color: filter === 'all' ? 'white' : '#475569',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            All Messages ({messages.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: 'none',
              backgroundColor: filter === 'unread' ? '#E87D1E' : '#f1f5f9',
              color: filter === 'unread' ? 'white' : '#475569',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            Unread
            {unreadCount > 0 && (
              <span style={{
                background: filter === 'unread' ? 'white' : '#ef4444',
                color: filter === 'unread' ? '#E87D1E' : 'white',
                padding: '1px 6px',
                borderRadius: '10px',
                fontSize: '0.72rem',
                fontWeight: 700
              }}>
                {unreadCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setFilter('read')}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: 'none',
              backgroundColor: filter === 'read' ? '#E87D1E' : '#f1f5f9',
              color: filter === 'read' ? 'white' : '#475569',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            Read ({messages.length - unreadCount})
          </button>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email, subject..."
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              borderRadius: '6px',
              border: '1.5px solid #e2e8f0',
              outline: 'none',
              fontSize: '0.88rem',
              boxSizing: 'border-box'
            }}
          />
        </div>
      </div>

      {/* Main Grid: Messages List + Detailed View */}
      <div style={{ display: 'grid', gridTemplateColumns: selectedMessage ? '1fr 1fr' : '1fr', gap: '24px' }}>
        {/* Messages List */}
        <div className="admin-card" style={{ background: '#ffffff', borderRadius: '12px', padding: '20px', border: '1px solid #e2e8f0' }}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
              <RefreshCw size={24} className="fa-spin" style={{ margin: '0 auto 10px', display: 'block' }} />
              Loading messages...
            </div>
          ) : filteredMessages.length === 0 ? (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: '#64748b', background: '#f8fafc', borderRadius: '8px' }}>
              <Mail size={36} opacity={0.4} style={{ margin: '0 auto 12px', display: 'block' }} />
              <p style={{ margin: '0 0 6px', fontWeight: 600 }}>No inquiries found</p>
              <p style={{ margin: 0, fontSize: '0.85rem' }}>
                {filter !== 'all' ? 'No messages match the selected filter.' : 'Messages submitted via the Contact Us page will appear here.'}
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filteredMessages.map((msg) => (
                <div
                  key={msg._id}
                  onClick={() => {
                    setSelectedMessage(msg);
                    if (!msg.isRead) handleToggleRead(msg._id, false);
                  }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '16px',
                    borderRadius: '10px',
                    border: selectedMessage?._id === msg._id 
                      ? '2px solid #E87D1E' 
                      : !msg.isRead 
                        ? '1.5px solid #fed7aa' 
                        : '1px solid #e2e8f0',
                    backgroundColor: selectedMessage?._id === msg._id
                      ? '#fffaf5'
                      : !msg.isRead 
                        ? '#fffdfa' 
                        : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: !msg.isRead ? '0 2px 6px rgba(232, 125, 30, 0.08)' : '0 1px 3px rgba(0,0,0,0.02)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {!msg.isRead ? (
                        <span style={{
                          display: 'inline-block',
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: '#E87D1E'
                        }} title="Unread" />
                      ) : (
                        <span style={{
                          display: 'inline-block',
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: '#cbd5e1'
                        }} title="Read" />
                      )}
                      <h4 style={{ 
                        margin: 0, 
                        fontSize: '0.98rem', 
                        color: '#1e293b', 
                        fontWeight: !msg.isRead ? 700 : 600 
                      }}>
                        {msg.name}
                      </h4>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#94a3b8' }}>
                      <Clock size={13} />
                      <span>{new Date(msg.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>

                  <div style={{ 
                    fontSize: '0.88rem', 
                    fontWeight: 600, 
                    color: '#334155', 
                    marginBottom: '6px' 
                  }}>
                    {msg.subject || 'General Inquiry'}
                  </div>

                  <p style={{
                    margin: 0,
                    fontSize: '0.84rem',
                    color: '#64748b',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detailed Message Drawer / Panel */}
        {selectedMessage && (
          <div className="admin-card" style={{ 
            background: '#ffffff', 
            borderRadius: '12px', 
            padding: '24px', 
            border: '1px solid #e2e8f0',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' }}>
              <div>
                <span style={{
                  display: 'inline-block',
                  padding: '3px 10px',
                  borderRadius: '20px',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  backgroundColor: selectedMessage.isRead ? '#f1f5f9' : '#fff7ed',
                  color: selectedMessage.isRead ? '#64748b' : '#c2410c',
                  marginBottom: '8px'
                }}>
                  {selectedMessage.isRead ? 'Read' : 'New / Unread'}
                </span>
                <h3 style={{ margin: '0 0 6px', color: '#1e293b', fontSize: '1.25rem', fontWeight: 700 }}>
                  {selectedMessage.subject || 'General Inquiry'}
                </h3>
                <div style={{ fontSize: '0.88rem', color: '#64748b' }}>
                  From: <strong>{selectedMessage.name}</strong> &lt;{selectedMessage.email}&gt;
                </div>
                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>
                  Received: {new Date(selectedMessage.createdAt).toLocaleString()}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => handleToggleRead(selectedMessage._id, selectedMessage.isRead)}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    color: '#475569',
                    padding: '8px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title={selectedMessage.isRead ? "Mark as unread" : "Mark as read"}
                >
                  {selectedMessage.isRead ? <Mail size={16} /> : <MailOpen size={16} />}
                </button>
                <button
                  onClick={() => handleDelete(selectedMessage._id)}
                  style={{
                    background: '#fff1f2',
                    border: '1px solid #fecdd3',
                    color: '#e11d48',
                    padding: '8px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title="Delete message"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Message Body */}
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: '#64748b', fontSize: '0.82rem', fontWeight: 600, textTransform: 'uppercase' }}>
                Message Content
              </label>
              <div style={{
                background: '#f8fafc',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                color: '#1e293b',
                lineHeight: '1.65',
                fontSize: '0.94rem',
                whiteSpace: 'pre-wrap'
              }}>
                {selectedMessage.message}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px', marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
              <a
                href={`mailto:${selectedMessage.email}?subject=${encodeURIComponent('Re: ' + (selectedMessage.subject || 'Your inquiry to KEMT'))}`}
                style={{
                  flex: 1,
                  backgroundColor: '#E87D1E',
                  color: 'white',
                  textDecoration: 'none',
                  padding: '10px 16px',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 2px 8px rgba(232, 125, 30, 0.25)'
                }}
              >
                <Send size={15} />
                <span>Reply via Email ({selectedMessage.email})</span>
              </a>

              <button
                onClick={() => setSelectedMessage(null)}
                style={{
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  color: '#475569',
                  padding: '10px 16px',
                  borderRadius: '6px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
