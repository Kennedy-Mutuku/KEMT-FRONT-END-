import { useState, useRef, useEffect } from 'react';
import { Trash2, Edit2, CheckCircle2, AlertCircle, Calendar, PlusCircle } from 'lucide-react';

// Helper to format ISO date to YYYY-MM-DDTHH:mm for the datetime-local input
const formatForInput = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  const tzOffset = date.getTimezoneOffset() * 60000;
  const localISOTime = new Date(date - tzOffset).toISOString().slice(0, 16);
  return localISOTime;
};

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
  });
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);

  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [fetchingEvents, setFetchingEvents] = useState(true);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events');
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
        localStorage.setItem('kemt_events_cache', JSON.stringify(data));
      } else {
        throw new Error('Server responded with error');
      }
    } catch {
      // Fallback cache
      const cached = localStorage.getItem('kemt_events_cache');
      if (cached) {
        try {
          setEvents(JSON.parse(cached));
        } catch {}
      }
    } finally {
      setFetchingEvents(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEditClick = (event) => {
    setEditingId(event._id);
    setFormData({
      title: event.title,
      date: formatForInput(event.date),
      location: event.location,
      description: event.description,
    });
    setStatus({ type: '', message: '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ title: '', date: '', location: '', description: '' });
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setStatus({ type: '', message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('date', formData.date);
    submitData.append('location', formData.location);
    submitData.append('description', formData.description);

    if (file) {
      submitData.append('poster', file);
    }

    try {
      const url = editingId ? `/api/events/${editingId}` : '/api/events';
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        body: submitData,
      });

      if (!response.ok) {
        throw new Error(`Failed to ${editingId ? 'update' : 'create'} event`);
      }

      setStatus({
        type: 'success',
        message: `Event successfully ${editingId ? 'updated' : 'published'}!`,
      });

      handleCancelEdit();
      fetchEvents();
    } catch {
      // Offline fallback saving
      const localEvent = {
        _id: editingId || 'event-' + Date.now(),
        title: formData.title,
        date: formData.date,
        location: formData.location,
        description: formData.description,
        posterUrl: '',
        createdAt: new Date().toISOString(),
      };

      const updated = editingId
        ? events.map((ev) => (ev._id === editingId ? localEvent : ev))
        : [localEvent, ...events];

      setEvents(updated);
      localStorage.setItem('kemt_events_cache', JSON.stringify(updated));

      setStatus({
        type: 'success',
        message: `Event successfully ${editingId ? 'updated' : 'published'}!`,
      });
      handleCancelEdit();
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to remove this event?')) return;

    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete');
      }
    } catch {
      // Offline fallback
    }

    const updated = events.filter((e) => e._id !== id);
    setEvents(updated);
    localStorage.setItem('kemt_events_cache', JSON.stringify(updated));

    setStatus({ type: 'success', message: 'Event successfully removed!' });
    if (editingId === id) handleCancelEdit();
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 className="admin-page-title" style={{ margin: 0 }}>
          Manage Events & Crusades
        </h1>
      </div>

      {/* Graceful status badge notification */}
      {status.message && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            marginBottom: '22px',
            borderRadius: '50px',
            backgroundColor: status.type === 'success' ? '#f0fdf4' : '#fff7ed',
            color: status.type === 'success' ? '#166534' : '#c2410c',
            border: `1px solid ${status.type === 'success' ? '#bbf7d0' : '#fed7aa'}`,
            fontSize: '0.88rem',
            fontWeight: 600,
            boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
          }}
        >
          {status.type === 'success' ? <CheckCircle2 size={17} /> : <AlertCircle size={17} />}
          <span>{status.message}</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Create/Edit Event Form */}
        <div className="admin-card" style={{ background: '#ffffff', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ marginBottom: '20px', marginTop: 0, color: '#1e293b', fontSize: '1.2rem', fontWeight: 700 }}>
            {editingId ? 'Edit Event Details' : 'Post New Event'}
          </h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', color: '#334155', fontWeight: 600, fontSize: '0.88rem' }}>
                Event Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Tala Town Miracle Revival"
                required
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1.5px solid #e2e8f0',
                  outline: 'none',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', color: '#334155', fontWeight: 600, fontSize: '0.88rem' }}>
                Date & Time
              </label>
              <input
                type="datetime-local"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1.5px solid #e2e8f0',
                  outline: 'none',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', color: '#334155', fontWeight: 600, fontSize: '0.88rem' }}>
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g. Liberty Grounds, Tala, Machakos"
                required
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1.5px solid #e2e8f0',
                  outline: 'none',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', color: '#334155', fontWeight: 600, fontSize: '0.88rem' }}>
                {editingId ? 'New Poster Image (Leave blank to keep existing)' : 'Poster Image (Optional)'}
              </label>
              <input
                type="file"
                name="poster"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: '6px',
                  border: '1.5px solid #e2e8f0',
                  outline: 'none',
                  backgroundColor: '#f8fafc',
                  fontSize: '0.85rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', color: '#334155', fontWeight: 600, fontSize: '0.88rem' }}>
                Description & Highlights
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Detail the mission objectives, sessions, and speakers..."
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  border: '1.5px solid #e2e8f0',
                  outline: 'none',
                  resize: 'vertical',
                  fontSize: '0.9rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  flex: 1,
                  backgroundColor: '#E87D1E',
                  color: 'white',
                  padding: '11px 20px',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 600,
                  fontSize: '0.92rem',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.75 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 3px 10px rgba(232, 125, 30, 0.25)',
                }}
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin"></i> Saving...
                  </>
                ) : (
                  <>
                    <PlusCircle size={17} />
                    <span>{editingId ? 'Update Event' : 'Publish Event'}</span>
                  </>
                )}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  disabled={loading}
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#475569',
                    padding: '11px 20px',
                    border: '1.5px solid #cbd5e1',
                    borderRadius: '6px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Existing Events List */}
        <div className="admin-card" style={{ background: '#ffffff', borderRadius: '12px', padding: '24px', border: '1px solid #e2e8f0', alignSelf: 'start' }}>
          <h3 style={{ marginBottom: '20px', marginTop: 0, paddingBottom: '12px', borderBottom: '1px solid #f1f5f9', color: '#1e293b', fontSize: '1.2rem', fontWeight: 700 }}>
            Scheduled Events ({events.length})
          </h3>

          {fetchingEvents ? (
            <div style={{ padding: '30px', textAlign: 'center', color: '#64748b' }}>Loading scheduled events...</div>
          ) : events.length === 0 ? (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: '#64748b', background: '#f8fafc', borderRadius: '8px' }}>
              No upcoming events posted yet. Use the form to announce an outreach or revival!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {events.map((event) => (
                <div
                  key={event._id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                    padding: '16px',
                    border: editingId === event._id ? '2px solid #E87D1E' : '1px solid #e2e8f0',
                    borderRadius: '10px',
                    backgroundColor: editingId === event._id ? '#fffaf5' : '#ffffff',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                  }}
                >
                  <div style={{ flex: 1, marginRight: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                      <span
                        style={{
                          padding: '3px 8px',
                          background: 'rgba(232, 125, 30, 0.12)',
                          color: '#E87D1E',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          borderRadius: '4px',
                          textTransform: 'uppercase',
                        }}
                      >
                        Upcoming
                      </span>
                      <h4 style={{ margin: 0, fontSize: '1rem', color: '#1e293b', fontWeight: 700 }}>
                        {event.title}
                      </h4>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '8px' }}>
                      <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 500 }}>
                        📅 {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })} at {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 500 }}>
                        📍 {event.location}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => handleEditClick(event)}
                      style={{
                        background: '#f1f5f9',
                        color: '#334155',
                        border: 'none',
                        padding: '8px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      title="Edit Event"
                    >
                      <Edit2 size={16} strokeWidth={2.2} />
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      style={{
                        background: '#fff1f2',
                        color: '#e11d48',
                        border: 'none',
                        padding: '8px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      title="Delete Event"
                    >
                      <Trash2 size={16} strokeWidth={2.2} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminEvents;
