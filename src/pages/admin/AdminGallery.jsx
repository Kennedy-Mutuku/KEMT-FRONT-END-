import { useState, useRef, useEffect } from 'react';
import { Trash2, Edit2, Link } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const categories = [
  { value: 'missions', label: 'Missions' },
  { value: 'outreach', label: 'Outreach' },
  { value: 'worship', label: 'Worship' },
  { value: 'conferences', label: 'Conferences' },
  { value: 'youth', label: 'Youth' },
  { value: 'children', label: 'Children' },
  { value: 'community', label: 'Community' },
  { value: 'special_events', label: 'Special Events' },
];

const emptyForm = {
  title: '',
  description: '',
  category: 'missions',
  eventName: '',
  eventDate: '',
  location: '',
  altText: '',
  externalLink: '',
  isFeatured: false,
  isPublished: true,
  displayOrder: 0,
};

const AdminGallery = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [fetchingItems, setFetchingItems] = useState(true);
  const fileInputRef = useRef(null);

  const fetchItems = async () => {
    try {
      const response = await fetch(`${API_URL}/api/gallery/all`);
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      }
    } catch (err) {
      console.error('Failed to fetch gallery items', err);
    } finally {
      setFetchingItems(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEditClick = (item) => {
    setEditingId(item._id);
    setFormData({
      title: item.title || '',
      description: item.description || '',
      category: item.category || 'missions',
      eventName: item.eventName || '',
      eventDate: item.eventDate ? new Date(item.eventDate).toISOString().split('T')[0] : '',
      location: item.location || '',
      altText: item.altText || '',
      externalLink: item.externalLink || '',
      isFeatured: item.isFeatured || false,
      isPublished: item.isPublished !== false,
      displayOrder: item.displayOrder || 0,
    });
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setStatus({ type: '', message: '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setStatus({ type: '', message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    if (!editingId && !file && !formData.externalLink) {
      setStatus({ type: 'error', message: 'Please upload a thumbnail image or provide a Google Photos link.' });
      setLoading(false);
      return;
    }

    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('description', formData.description);
    submitData.append('category', formData.category);
    submitData.append('eventName', formData.eventName);
    submitData.append('eventDate', formData.eventDate);
    submitData.append('location', formData.location);
    submitData.append('altText', formData.altText || formData.title);
    submitData.append('externalLink', formData.externalLink);
    submitData.append('isFeatured', String(formData.isFeatured));
    submitData.append('isPublished', String(formData.isPublished));
    submitData.append('displayOrder', formData.displayOrder);

    if (file) {
      submitData.append('image', file);
    }

    try {
      const url = editingId ? `${API_URL}/api/gallery/${editingId}` : `${API_URL}/api/gallery`;
      const response = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        body: submitData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || `Failed to ${editingId ? 'update' : 'create'} gallery item`);
      }

      setStatus({
        type: 'success',
        message: `Gallery item successfully ${editingId ? 'updated' : 'created'}!`,
      });

      handleCancelEdit(); // Reset form
      fetchItems(); // Refresh the list
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this gallery item?')) return;

    try {
      const response = await fetch(`${API_URL}/api/gallery/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete gallery item');
      }

      setStatus({ type: 'success', message: 'Gallery item successfully deleted!' });

      if (editingId === id) {
        handleCancelEdit();
      }

      fetchItems(); // Refresh list after deletion
    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    }
  };

  return (
    <>
      <h1 className="admin-page-title">Gallery Management</h1>

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

        {/* Create/Edit Gallery Item Form */}
        <div className="admin-card">
          <h3 style={{ marginBottom: '20px', marginTop: 0 }}>
            {editingId ? 'Edit Gallery Item' : 'Add New Gallery Item'}
          </h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--admin-text-main)', fontWeight: 600 }}>Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g. Mission Outreach - Kisii"
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--admin-border-color)', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--admin-text-main)', fontWeight: 600 }}>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--admin-border-color)', outline: 'none' }}
              >
                {categories.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--admin-text-main)', fontWeight: 600 }}>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Kisii, Kenya"
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--admin-border-color)', outline: 'none' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--admin-text-main)', fontWeight: 600 }}>Event Date</label>
                <input
                  type="date"
                  name="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--admin-border-color)', outline: 'none' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--admin-text-main)', fontWeight: 600 }}>Event Name</label>
              <input
                type="text"
                name="eventName"
                value={formData.eventName}
                onChange={handleChange}
                placeholder="e.g. Youth Conference 2026"
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--admin-border-color)', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--admin-text-main)', fontWeight: 600 }}>
                Google Photos Link {editingId ? '' : '(or upload a thumbnail below)'}
              </label>
              <input
                type="url"
                name="externalLink"
                value={formData.externalLink}
                onChange={handleChange}
                placeholder="https://photos.app.goo.gl/..."
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--admin-border-color)', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--admin-text-main)', fontWeight: 600 }}>
                {editingId ? 'New Thumbnail Image (Leave blank to keep existing)' : 'Thumbnail Image (or paste a link above)'}
              </label>
              <input
                type="file"
                name="image"
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
                rows="3"
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--admin-border-color)', outline: 'none', resize: 'vertical' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--admin-text-main)', fontWeight: 600 }}>Alt Text (for accessibility)</label>
              <input
                type="text"
                name="altText"
                value={formData.altText}
                onChange={handleChange}
                placeholder="Defaults to the title if left blank"
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid var(--admin-border-color)', outline: 'none' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', cursor: 'pointer', color: 'var(--admin-text-main)' }}>
                <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} /> Featured
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', cursor: 'pointer', color: 'var(--admin-text-main)' }}>
                <input type="checkbox" name="isPublished" checked={formData.isPublished} onChange={handleChange} /> Published
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: 'var(--admin-text-main)' }}>
                Order
                <input
                  type="number"
                  name="displayOrder"
                  value={formData.displayOrder}
                  onChange={handleChange}
                  style={{ width: '60px', padding: '6px', borderRadius: '6px', border: '1px solid var(--admin-border-color)', outline: 'none' }}
                />
              </label>
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
                {loading ? (editingId ? 'Updating...' : 'Adding...') : (editingId ? 'Update Item' : 'Add Item')}
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

        {/* Existing Gallery Items List */}
        <div className="admin-card" style={{ alignSelf: 'start' }}>
          <h3 style={{ marginBottom: '24px', marginTop: 0, paddingBottom: '16px', borderBottom: '1px solid var(--admin-border-color)', color: 'var(--admin-text-main)' }}>
            Gallery Items ({items.length})
          </h3>

          {fetchingItems ? (
            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--admin-text-muted)' }}>Loading gallery items...</div>
          ) : items.length === 0 ? (
            <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--admin-text-muted)', background: 'var(--admin-bg-primary)', borderRadius: '8px' }}>
              No gallery items yet. Fill the form to add your first item!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {items.map((item) => (
                <div key={item._id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px',
                  border: editingId === item._id ? '2px solid var(--admin-primary)' : '1px solid var(--admin-border-color)',
                  borderRadius: '12px',
                  backgroundColor: editingId === item._id ? '#EFF4FB' : 'white',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, background: 'var(--admin-bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl.startsWith('http') ? item.imageUrl : `${API_URL}/${item.imageUrl}`}
                          alt={item.altText || item.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <Link size={20} color="var(--admin-primary)" />
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <strong style={{ fontSize: '0.9rem', color: 'var(--admin-text-main)' }}>{item.title}</strong>
                        {!item.isPublished && (
                          <span style={{ fontSize: '0.65rem', padding: '2px 8px', background: '#F59E0B15', color: '#D97706', fontWeight: 700, borderRadius: '4px', textTransform: 'uppercase' }}>Draft</span>
                        )}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ padding: '2px 8px', background: 'var(--admin-primary)', color: 'white', fontSize: '0.62rem', fontWeight: 700, borderRadius: '4px', textTransform: 'uppercase' }}>
                          {categories.find((c) => c.value === item.category)?.label || item.category}
                        </span>
                        {item.location && <span style={{ fontSize: '0.78rem', color: 'var(--admin-text-muted)' }}>{item.location}</span>}
                        {item.eventDate && <span style={{ fontSize: '0.78rem', color: 'var(--admin-text-muted)' }}>{new Date(item.eventDate).toLocaleDateString()}</span>}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                    <button
                      onClick={() => handleEditClick(item)}
                      style={{
                        background: '#EFF4FB',
                        color: 'var(--admin-primary)',
                        border: 'none',
                        padding: '10px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      title="Edit Item"
                    >
                      <Edit2 size={18} strokeWidth={2.5} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      style={{
                        background: '#EF444415',
                        color: '#EF4444',
                        border: 'none',
                        padding: '10px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      title="Delete Item"
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

export default AdminGallery;