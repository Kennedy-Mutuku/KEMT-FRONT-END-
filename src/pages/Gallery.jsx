import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import bannerPhoto from '../assets/Tala mission4.jpg';

const API_URL = import.meta.env.VITE_API_URL;

const categories = [
  { key: 'all', label: 'All', icon: 'fas fa-th' },
  { key: 'missions', label: 'Missions', icon: 'fas fa-globe-africa' },
  { key: 'outreach', label: 'Outreach', icon: 'fas fa-hand-holding-heart' },
  { key: 'worship', label: 'Worship', icon: 'fas fa-hands-praying' },
  { key: 'conferences', label: 'Conferences', icon: 'fas fa-microphone' },
  { key: 'youth', label: 'Youth', icon: 'fas fa-users' },
  { key: 'children', label: "Children", icon: 'fas fa-child' },
  { key: 'community', label: 'Community', icon: 'fas fa-people-group' },
  { key: 'special_events', label: 'Special Events', icon: 'fas fa-star' },
];

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightbox, setLightbox] = useState(null);
  const lightboxRef = useRef(null);

  const fetchItems = useCallback(async (category) => {
    setLoading(true);
    setError(null);
    try {
      const url = category === 'all'
        ? `${API_URL}/api/gallery`
        : `${API_URL}/api/gallery?category=${category}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to load gallery items');
      }
      const data = await response.json();
      setItems(data);
    } catch {
      setError('Unable to load gallery items at this time. Please try again later.');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems(activeCategory);
  }, [activeCategory, fetchItems]);

  const displayedItems = items;

  const openLightbox = (item, index) => {
    if (item.externalLink) {
      window.open(item.externalLink, '_blank', 'noopener,noreferrer');
      return;
    }
    setLightbox({ item, index });
  };

  const getImageSrc = (item) => {
    if (item.imageUrl) {
      return item.imageUrl.startsWith('http') ? item.imageUrl : `${API_URL}/${item.imageUrl}`;
    }
    return '';
  };

  const closeLightbox = () => {
    setLightbox(null);
  };

  const prevPhoto = useCallback(() => {
    if (!lightbox) return;
    const prevIndex = (lightbox.index - 1 + displayedItems.length) % displayedItems.length;
    setLightbox({ item: displayedItems[prevIndex], index: prevIndex });
  }, [lightbox, displayedItems]);

  const nextPhoto = useCallback(() => {
    if (!lightbox) return;
    const nextIndex = (lightbox.index + 1) % displayedItems.length;
    setLightbox({ item: displayedItems[nextIndex], index: nextIndex });
  }, [lightbox, displayedItems]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightbox) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'ArrowRight') nextPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox, prevPhoto, nextPhoto]);

  useEffect(() => {
    if (lightbox && lightboxRef.current) {
      lightboxRef.current.focus();
    }
  }, [lightbox]);

  return (
    <main className="gallery-page">

      {/* Page Banner with Background Image */}
      <section className="page-banner" style={{ backgroundImage: `url(${bannerPhoto})` }}>
        <div className="banner-overlay"></div>
        <div className="container">
          <div className="banner-content">
            <span className="banner-tag">Visual Stories</span>
            <h1>Gallery</h1>
            <p>Moments of Faith, Fellowship and Kingdom Impact</p>
            <nav className="breadcrumb" aria-label="Breadcrumb" style={{ marginTop: '0.75rem' }}>
              <Link to="/">Home</Link>
              <span> &gt; </span>
              <span style={{ color: 'var(--secondary-color)' }}>Gallery</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="gallery-tab-bar">
        <div className="container">
          <div className="gallery-tabs" role="tablist" aria-label="Gallery categories">
            {categories.map((cat) => (
              <button
                key={cat.key}
                className={`gallery-tab ${activeCategory === cat.key ? 'gallery-tab--active' : ''}`}
                onClick={() => setActiveCategory(cat.key)}
                role="tab"
                aria-selected={activeCategory === cat.key}
                aria-controls="gallery-grid-section"
              >
                <i className={cat.icon} aria-hidden="true"></i>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Count */}
      {!loading && !error && (
        <div className="gallery-count">
          <div className="container">
            <p>{displayedItems.length} photo{displayedItems.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
      )}

      {/* Photo Grid */}
      <section className="gallery-grid-section" id="gallery-grid-section" role="tabpanel" aria-label="Gallery photos">
        <div className="container">

          {/* Loading State */}
          {loading && (
            <div className="gallery-loading" style={{ textAlign: 'center', padding: '4rem 0' }}>
              <div style={{
                width: '40px', height: '40px', border: '3px solid var(--border-color)',
                borderTopColor: 'var(--primary-color)', borderRadius: '50%',
                animation: 'gallery-spin 0.8s linear infinite', margin: '0 auto 1rem'
              }}></div>
              <p style={{ color: 'var(--text-light)' }}>Loading gallery...</p>
            </div>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="gallery-error" style={{ textAlign: 'center', padding: '4rem 0' }}>
              <i className="fas fa-exclamation-circle" style={{ fontSize: '2.5rem', color: 'var(--accent-color)', marginBottom: '1rem', display: 'block' }}></i>
              <p style={{ color: 'var(--text-light)', marginBottom: '1rem' }}>{error}</p>
              <button className="btn btn-primary" onClick={() => fetchItems(activeCategory)}>Try Again</button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && displayedItems.length === 0 && (
            <div className="gallery-empty" style={{ textAlign: 'center', padding: '4rem 0' }}>
              <i className="fas fa-images" style={{ fontSize: '2.5rem', color: 'var(--border-color)', marginBottom: '1rem', display: 'block' }}></i>
              <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>
                No gallery items are currently available in this category.
              </p>
            </div>
          )}

          {/* Photo Grid */}
          {!loading && !error && displayedItems.length > 0 && (
            <div className="gallery-masonry">
              {displayedItems.map((item, i) => (
                <div
                  key={item._id || i}
                  className="gallery-item"
                  onClick={() => openLightbox(item, i)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${item.title}`}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(item, i); } }}
                >
                  {item.imageUrl ? (
                    <img
                      src={getImageSrc(item)}
                      alt={item.altText || item.title}
                      loading="lazy"
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                    />
                  ) : (
                    <div style={{
                      width: '100%', minHeight: '200px',
                      background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexDirection: 'column', color: '#fff', padding: '1rem', textAlign: 'center'
                    }}>
                      <i className="fas fa-images" style={{ fontSize: '2rem', marginBottom: '0.5rem' }}></i>
                      <strong style={{ fontSize: '0.9rem' }}>{item.title}</strong>
                      <span style={{ fontSize: '0.75rem', opacity: 0.8, marginTop: '0.25rem' }}>View on Google Photos</span>
                    </div>
                  )}
                  <div className="gallery-item__overlay">
                    {item.externalLink ? (
                      <i className="fas fa-external-link-alt" aria-hidden="true"></i>
                    ) : (
                      <i className="fas fa-expand-alt" aria-hidden="true"></i>
                    )}
                  </div>
                  <div className="gallery-item__info" style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%)',
                    padding: '2rem 0.75rem 0.75rem', color: '#fff', opacity: 0,
                    transition: 'opacity 0.3s ease', pointerEvents: 'none'
                  }}>
                    <strong style={{ fontSize: '0.85rem', display: 'block' }}>{item.title}</strong>
                    {item.location && (
                      <span style={{ fontSize: '0.75rem', opacity: 0.8, display: 'block' }}>
                        <i className="fas fa-map-marker-alt" style={{ marginRight: '3px' }}></i>{item.location}
                      </span>
                    )}
                    {item.eventDate && (
                      <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>{formatDate(item.eventDate)}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="lightbox"
          onClick={closeLightbox}
          ref={lightboxRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label={`Image viewer: ${lightbox.item.title}`}
          style={{ outline: 'none' }}
        >
          <button className="lightbox__close" onClick={closeLightbox} aria-label="Close image viewer">
            <i className="fas fa-times" aria-hidden="true"></i>
          </button>
          <button className="lightbox__prev" onClick={(e) => { e.stopPropagation(); prevPhoto(); }} aria-label="Previous image">
            <i className="fas fa-chevron-left" aria-hidden="true"></i>
          </button>
          <div className="lightbox__img-wrap" onClick={(e) => e.stopPropagation()}>
            <img
              src={getImageSrc(lightbox.item)}
              alt={lightbox.item.altText || lightbox.item.title}
            />
            <div className="lightbox__info" style={{
              position: 'absolute', bottom: '-3.5rem', left: '50%', transform: 'translateX(-50%)',
              color: '#fff', textAlign: 'center', width: '100%'
            }}>
              <strong style={{ display: 'block', fontSize: '1rem' }}>{lightbox.item.title}</strong>
              {lightbox.item.location && (
                <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>
                  <i className="fas fa-map-marker-alt" style={{ marginRight: '3px' }}></i>{lightbox.item.location}
                </span>
              )}
              {lightbox.item.eventDate && (
                <span style={{ fontSize: '0.8rem', opacity: 0.7, display: 'block' }}>{formatDate(lightbox.item.eventDate)}</span>
              )}
              {lightbox.item.description && (
                <p style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: '0.25rem', maxWidth: '500px', margin: '0.25rem auto 0' }}>{lightbox.item.description}</p>
              )}
            </div>
          </div>
          <button className="lightbox__next" onClick={(e) => { e.stopPropagation(); nextPhoto(); }} aria-label="Next image">
            <i className="fas fa-chevron-right" aria-hidden="true"></i>
          </button>
          <div className="lightbox__counter">
            {lightbox.index + 1} / {displayedItems.length}
          </div>
        </div>
      )}

      <style>{`
        @keyframes gallery-spin { to { transform: rotate(360deg); } }
        .gallery-item:hover .gallery-item__info { opacity: 1 !important; }
      `}</style>

    </main>
  );
};

export default Gallery;
