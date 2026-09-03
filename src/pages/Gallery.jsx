import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CATEGORIES, galleryAlbums } from '../data/galleryData';

const Gallery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeShortcut, setActiveShortcut] = useState('');

  const albumIdFromUrl = searchParams.get('album');
  const photoIndexFromUrl = searchParams.get('photo');

  // Selected Album derived from URL
  const selectedAlbum = useMemo(() => {
    if (!albumIdFromUrl) return null;
    return galleryAlbums.find(album => album.id === albumIdFromUrl) || null;
  }, [albumIdFromUrl]);

  // Lightbox Item derived from active album & URL photo index
  const lightboxItem = useMemo(() => {
    if (!selectedAlbum || photoIndexFromUrl === null) return null;
    const photoIdx = parseInt(photoIndexFromUrl, 10);
    if (isNaN(photoIdx) || photoIdx < 0 || photoIdx >= selectedAlbum.photos.length) {
      return null;
    }
    const photosSet = selectedAlbum.photos.map(photoSrc => ({
      src: photoSrc,
      title: selectedAlbum.title,
      fullDescription: selectedAlbum.shortCaption,
      category: selectedAlbum.category,
      objectPosition: selectedAlbum.objectPosition || 'center'
    }));
    return {
      item: photosSet[photoIdx],
      index: photoIdx,
      set: photosSet
    };
  }, [selectedAlbum, photoIndexFromUrl]);

  // Filter items based on active category and search query
  const filteredAlbums = useMemo(() => {
    let result = galleryAlbums;
    if (activeCategory !== 'All') {
      result = result.filter(album => album.category === activeCategory);
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(album => 
        album.title.toLowerCase().includes(q) || 
        album.date.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, searchQuery]);

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const counts = { All: galleryAlbums.length };
    CATEGORIES.slice(1).forEach(cat => {
      counts[cat] = galleryAlbums.filter(album => album.category === cat).length;
    });
    return counts;
  }, []);

  // Select Album (Pushes state to URL history)
  const selectAlbum = (album) => {
    setSearchParams({ album: album.id });
    window.scrollTo({ top: 350, behavior: 'smooth' });
  };

  // Close Album (Steps back in browser history to All Albums view)
  const closeAlbum = () => {
    if (searchParams.has('album')) {
      window.history.back();
    } else {
      setSearchParams({});
    }
  };

  // Open Lightbox for a photo (Pushes state to URL history)
  const openLightbox = (album, startIndex = 0) => {
    setSearchParams({ album: album.id, photo: startIndex });
  };

  // Close Lightbox (Steps back in browser history to Album Detail view)
  const closeLightbox = () => {
    if (searchParams.has('photo')) {
      window.history.back();
    } else {
      const newParams = new URLSearchParams(searchParams);
      newParams.delete('photo');
      setSearchParams(newParams);
    }
  };

  // Next Lightbox Item
  const nextPhoto = useCallback(() => {
    if (!lightboxItem || !selectedAlbum) return;
    const nextIdx = (lightboxItem.index + 1) % lightboxItem.set.length;
    setSearchParams({ album: selectedAlbum.id, photo: nextIdx }, { replace: true });
  }, [lightboxItem, selectedAlbum, setSearchParams]);

  // Previous Lightbox Item
  const prevPhoto = useCallback(() => {
    if (!lightboxItem || !selectedAlbum) return;
    const prevIdx = (lightboxItem.index - 1 + lightboxItem.set.length) % lightboxItem.set.length;
    setSearchParams({ album: selectedAlbum.id, photo: prevIdx }, { replace: true });
  }, [lightboxItem, selectedAlbum, setSearchParams]);

  // Keyboard navigation & body scroll lock support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxItem) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };

    if (lightboxItem) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxItem, nextPhoto, prevPhoto]);

  const scrollToSection = (id) => {
    setActiveShortcut(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Account for fixed navbar if any
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const renderAlbumCard = (album) => (
    <article
      key={album.id}
      className="gallery-card-v2"
      onClick={() => selectAlbum(album)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectAlbum(album);
        }
      }}
    >
      <div className="gallery-card-v2__media">
        <img
          src={album.coverImage}
          alt={album.title}
          loading="lazy"
          className="gallery-card-v2__img"
          style={{ objectPosition: album.objectPosition || 'center' }}
        />
      </div>
      <div className="gallery-card-v2__content">
        <h3 className="gallery-card-v2__title">{album.title.toUpperCase()}</h3>
        <p className="gallery-card-v2__date">{album.date}</p>
        <button className="gallery-card-v2__btn">View Photos</button>
      </div>
    </article>
  );

  return (
    <main className="gallery-page">
      {/* Page Banner */}
      <section className="page-banner">
        <div className="banner-overlay"></div>
        <div className="container">
          <div className="banner-content">
            <span className="banner-tag">Visual Stories & Field Impact</span>
            <h1>Photo Gallery</h1>
            <p>
              Explore moments of grace, community transformation, school mentorships, and servant leadership across our mission fields.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Category Bar */}
      <div className="gallery-filter-bar">
        <div className="container">
          <div className="gallery-filter-nav" role="tablist" aria-label="Gallery categories">
            {CATEGORIES.map(category => (
              <button
                key={category}
                role="tab"
                aria-selected={activeCategory === category}
                className={`gallery-filter-btn ${activeCategory === category ? 'gallery-filter-btn--active' : ''}`}
                onClick={() => setActiveCategory(category)}
              >
                <span className="gallery-filter-btn__label">{category}</span>
                <span className="gallery-filter-btn__count">
                  {categoryCounts[category] || 0}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <section className="gallery-grid-section">
        <div className="container">
          {!selectedAlbum ? (
            <>
              {/* Compact Header: Search, Count, & Shortcuts */}
              <div className="gallery-results-header-compact">
                <div className="gallery-results-meta-compact">
                  <h2 className="gallery-results-heading">
                    {activeCategory === 'All' ? 'All Missions & Events' : activeCategory}
                  </h2>
                  <span className="gallery-results-count">
                    Showing {filteredAlbums.length} {filteredAlbums.length === 1 ? 'event album' : 'event albums'}
                  </span>
                </div>

                <div className="gallery-header-controls">
                  <div className="gallery-search-bar">
                    <i className="fas fa-search gallery-search-icon"></i>
                    <input 
                      type="text" 
                      placeholder="Search by name or date..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="gallery-search-input"
                    />
                    {searchQuery && (
                      <button className="gallery-search-clear" onClick={() => setSearchQuery('')}>
                        <i className="fas fa-times"></i>
                      </button>
                    )}
                  </div>

                  {activeCategory === 'All' && !searchQuery && (
                    <div className="gallery-branch-shortcuts-compact">
                      <button 
                        onClick={() => scrollToSection('kemt-section')} 
                        className={`branch-shortcut-btn-compact ${activeShortcut === 'kemt-section' ? 'active-shortcut' : ''}`}
                      >
                        <i className="fas fa-globe-africa"></i> KEMT
                      </button>
                      <button 
                        onClick={() => scrollToSection('kesip-section')} 
                        className={`branch-shortcut-btn-compact ${activeShortcut === 'kesip-section' ? 'active-shortcut' : ''}`}
                      >
                        <i className="fas fa-user-graduate"></i> Students (KESIP)
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Responsive Uniform Image Grid with KEMT vs KESIP Branching */}
              {activeCategory === 'All' && !searchQuery ? (
                <div className="gallery-branches-container">
                  <div className="gallery-branch-section" id="kemt-section">
                    <h3 className="gallery-branch-title">Kingdom Enlightenment Missions Team (KEMT)</h3>
                    <div className="gallery-grid-uniform">
                      {filteredAlbums.filter(a => a.category !== 'Youth & Schools').map(renderAlbumCard)}
                    </div>
                  </div>

                  <div className="gallery-branch-section" id="kesip-section">
                    <h3 className="gallery-branch-title">Kingdom Enlightenment Student Impact Program (KESIP)</h3>
                    <div className="gallery-grid-uniform">
                      {filteredAlbums.filter(a => a.category === 'Youth & Schools').map(renderAlbumCard)}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="gallery-grid-uniform">
                  {filteredAlbums.map(renderAlbumCard)}
                </div>
              )}

              {filteredAlbums.length === 0 && (
                <div className="gallery-empty-state">
                  <i className="fas fa-images gallery-empty-icon" aria-hidden="true"></i>
                  <p>No event albums found in this category.</p>
                </div>
              )}
            </>
          ) : (
            <div className="album-detail-view">
              <button 
                className="album-back-btn" 
                onClick={closeAlbum}
                aria-label="Back to Albums"
              >
                <i className="fas fa-arrow-left"></i> Back to Albums
              </button>
              
              <div className="album-detail-header">
                <h2>{selectedAlbum.title}</h2>
                <div className="album-meta">
                  <span className="album-date"><i className="far fa-calendar-alt"></i> {selectedAlbum.date}</span>
                  <span className="album-count"><i className="fas fa-camera"></i> {selectedAlbum.photos.length} Photos</span>
                </div>
                <p>{selectedAlbum.shortCaption}</p>
              </div>

              <div className="album-photos-grid">
                {selectedAlbum.photos.map((photo, index) => (
                  <div 
                    key={index} 
                    className="album-photo-item"
                    onClick={() => openLightbox(selectedAlbum, index)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openLightbox(selectedAlbum, index);
                      }
                    }}
                  >
                    <img 
                      src={photo} 
                      alt={`${selectedAlbum.title} - photo ${index + 1}`} 
                      loading="lazy"
                    />
                    <div className="photo-item-overlay">
                      <i className="fas fa-expand-alt"></i>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Lightbox Modal */}
      {lightboxItem && (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.item.title}
          onClick={closeLightbox}
        >
          <div className="gallery-lightbox__backdrop"></div>

          {/* Close Button */}
          <button
            className="gallery-lightbox__close"
            onClick={closeLightbox}
            aria-label="Close modal"
          >
            <i className="fas fa-times" aria-hidden="true"></i>
          </button>

          {/* Navigation - Prev */}
          <button
            className="gallery-lightbox__nav gallery-lightbox__nav--prev"
            onClick={(e) => {
              e.stopPropagation();
              prevPhoto();
            }}
            aria-label="Previous photo"
          >
            <i className="fas fa-chevron-left" aria-hidden="true"></i>
          </button>

          {/* Modal Container */}
          <div
            className="gallery-lightbox__container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="gallery-lightbox__image-wrapper">
              <img
                src={lightboxItem.item.src}
                alt={lightboxItem.item.title}
                className="gallery-lightbox__img"
              />
            </div>

            {/* Lightbox Information Details Pane */}
            <div className="gallery-lightbox__details">
              <div className="gallery-lightbox__header">
                <span className="gallery-lightbox__badge">
                  {lightboxItem.item.category}
                </span>
                <span className="gallery-lightbox__counter">
                  {lightboxItem.index + 1} of {lightboxItem.set.length}
                </span>
                <a 
                  href={lightboxItem.item.src} 
                  download={`kemt-photo-${lightboxItem.index + 1}.jpg`}
                  className="gallery-lightbox__download"
                  onClick={(e) => e.stopPropagation()}
                >
                  <i className="fas fa-download"></i> Download
                </a>
              </div>
              <h3 className="gallery-lightbox__title">{lightboxItem.item.title}</h3>
              <p className="gallery-lightbox__description">
                {lightboxItem.item.fullDescription}
              </p>
            </div>
          </div>

          {/* Navigation - Next */}
          <button
            className="gallery-lightbox__nav gallery-lightbox__nav--next"
            onClick={(e) => {
              e.stopPropagation();
              nextPhoto();
            }}
            aria-label="Next photo"
          >
            <i className="fas fa-chevron-right" aria-hidden="true"></i>
          </button>
        </div>
      )}
    </main>
  );
};

export default Gallery;
