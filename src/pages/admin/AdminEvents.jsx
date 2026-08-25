import { useState, useRef, useEffect } from 'react';
import { Trash2, Edit2 } from 'lucide-react';

// Helper to format ISO date to YYYY-MM-DDTHH:mm for the datetime-local input
const formatForInput = (isoString) => {
  if (!isoString) return '';
  const date = new Date(isoString);
  // Adjust for local timezone offset
  const tzOffset = date.getTimezoneOffset() * 60000; 
  const localISOTime = (new Date(date - tzOffset)).toISOString().slice(0, 16);
  return localISOTime;
};

const AdminEvents = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    location: '',
    description: ''
  });
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);
  
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [fetchingEvents, setFetchingEvents] = useState(true);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/events');
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      }
    } catch (err) {
      console.error('Failed to fetch events', err);
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
      description: event.description
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
      const url = editingId 
        ? `http://localhost:5000/api/events/${editingId}`
        : 'http://localhost:5000/api/events';
      
      const method = editingId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        body: submitData 
      });

      if (!response.ok) {
        throw new Error(`Failed to ${editingId ? 'update' : 'create'} event`);
      }

      setStatus({ 
        type: 'success', 
        message: `Event successfully ${editingId ? 'updated' : 'created'}!` 
      });
      
      handleCancelEdit(); // Reset form
      fetchEvents(); // Refresh the event list
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;

    try {
      const response = await fetch(`http://localhost:5000/api/events/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      setStatus({ type: 'success', message: 'Event successfully deleted!' });
      
      if (editingId === id) {
        handleCancelEdit();
      }
      
      fetchEvents(); // Refresh list after deletion
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    }
  };

  return (
    <>
      <h1 className="admin-page-title">Manage Events</h1>
      
      {status.message && (
        <div style={{
          padding: '12px',
          marginBottom: '20px',
          borderRadius: '4px',
          backgroundColor: status.type === 'success' ? '#10B98115' : '#EF444415',
          color: status.type === 'success' ? '#10B981' : '#EF4444',
          border: `1px solid ${status.type === 'success' ? '#10B981' : '#EF4444'}`
        }}>
          {status.message}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        {/* Create/Edit Event Form */}
        <div className="admin-card">
          <h3 style={{ marginBottom: '20px', marginTop: 0 }}>
            {editingId ? 'Edit Event' : 'Post New Event'}
          </h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--admin-text-main)', fontWeight: 600 }}>Event Title</label>
              <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                required
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--admin-border-color)', outline: 'none' }} 
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--admin-text-main)', fontWeight: 600 }}>Date & Time</label>
              <input 
                type="datetime-local" 
                name="date" 
                value={formData.date} 
                onChange={handleChange} 
                required
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--admin-border-color)', outline: 'none' }} 
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--admin-text-main)', fontWeight: 600 }}>Location</label>
              <input 
                type="text" 
                name="location" 
                value={formData.location} 
                onChange={handleChange} 
                required
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--admin-border-color)', outline: 'none' }} 
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--admin-text-main)', fontWeight: 600 }}>
                {editingId ? 'New Poster Image (Leave blank to keep existing)' : 'Poster Image (Optional)'}
              </label>
              <input 
                type="file" 
                name="poster" 
                accept="image/*"
                onChange={handleFileChange} 
                ref={fileInputRef}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--admin-border-color)', outline: 'none', backgroundColor: 'var(--admin-bg-primary)' }} 
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--admin-text-main)', fontWeight: 600 }}>Description</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                required
                rows="5"
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--admin-border-color)', outline: 'none', resize: 'vertical' }} 
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                type="submit" 
                disabled={loading}
                style={{ 
                  flex: 1,
                  backgroundColor: 'var(--admin-primary)', 
                  color: 'white', 
                  padding: '12px 24px', 
                  border: 'none', 
                  borderRadius: '6px', 
                  fontWeight: 600, 
                  cursor: loading ? 'not-allowed' : 'pointer',
                  opacity: loading ? 0.7 : 1
                }}
              >
                {loading ? (editingId ? 'Updating...' : 'Posting...') : (editingId ? 'Update Event' : 'Post Event')}
              </button>
              
              {editingId && (
                <button 
                  type="button" 
                  onClick={handleCancelEdit}
                  disabled={loading}
                  style={{ 
                    backgroundColor: 'white', 
                    color: 'var(--admin-text-main)', 
                    padding: '12px 24px', 
                    border: '1px solid var(--admin-border-color)', 
                    borderRadius: '6px', 
                    fontWeight: 600, 
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Existing Events List */}
        <div className="admin-card" style={{ alignSelf: 'start' }}>
          <h3 style={{ marginBottom: '24px', marginTop: 0, paddingBottom: '16px', borderBottom: '1px solid var(--admin-border-color)', color: 'var(--admin-text-main)' }}>Existing Events</h3>
          
          {fetchingEvents ? (
            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--admin-text-muted)' }}>Loading events...</div>
          ) : events.length === 0 ? (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--admin-text-muted)', background: 'var(--admin-bg-primary)', borderRadius: '8px' }}>
              No events posted yet. Fill the form to create your first event!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {events.map((event) => (
                <div key={event._id} style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  justifyContent: 'space-between',
                  padding: '20px',
                  border: editingId === event._id ? '2px solid var(--admin-primary)' : '1px solid var(--admin-border-color)',
                  borderRadius: '12px',
                  backgroundColor: editingId === event._id ? '#EFF4FB' : 'white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}>
                  <div style={{ flex: 1, marginRight: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                      <span style={{ padding: '4px 8px', background: 'var(--admin-primary)', color: 'white', fontSize: '0.7rem', fontWeight: 700, borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Event</span>
                      <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--admin-text-main)', fontWeight: 700 }}>{event.title}</h4>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--admin-text-muted)', fontWeight: 500 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                        {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })} at {new Date(event.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--admin-text-muted)', fontWeight: 500 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        {event.location}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => handleEditClick(event)}
                      style={{ 
                        background: editingId === event._id ? 'white' : '#EFF4FB', 
                        color: 'var(--admin-primary)', 
                        border: 'none', 
                        padding: '10px', 
                        borderRadius: '8px', 
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background 0.2s'
                      }}
                      title="Edit Event"
                    >
                      <Edit2 size={18} strokeWidth={2.5} />
                    </button>
                    <button 
                      onClick={() => handleDelete(event._id)}
                      style={{ 
                        background: '#EF444415', 
                        color: '#EF4444', 
                        border: 'none', 
                        padding: '10px', 
                        borderRadius: '8px', 
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'background 0.2s'
                      }}
                      title="Delete Event"
                    >
                      <Trash2 size={18} strokeWidth={2.5} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </>
  );
};

export default AdminEvents;
