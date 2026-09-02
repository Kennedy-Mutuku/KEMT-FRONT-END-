import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { CATEGORIES, galleryItems } from '../data/galleryData';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxItem, setLightboxItem] = useState(null); // { item, index, set }

  // Filter items based on active category
  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return galleryItems;
    return galleryItems.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const counts = { All: galleryItems.length };
    CATEGORIES.slice(1).forEach(cat => {
      counts[cat] = galleryItems.filter(item => item.category === cat).length;
    });
    return counts;
  }, []);

  // Open Lightbox
  const openLightbox = (item, index) => {
    setLightboxItem({ item, index, set: filteredItems });
  };

  // Close Lightbox
  const closeLightbox = () => {
    setLightboxItem(null);
  };

  // Next Lightbox Item
  const nextPhoto = useCallback(() => {
    if (!lightboxItem) return;
    const nextIdx = (lightboxItem.index + 1) % lightboxItem.set.length;
    setLightboxItem({
      item: lightboxItem.set[nextIdx],
      index: nextIdx,
      set: lightboxItem.set,
    });
  }, [lightboxItem]);

  // Previous Lightbox Item
  const prevPhoto = useCallback(() => {
    if (!lightboxItem) return;
    const prevIdx = (lightboxItem.index - 1 + lightboxItem.set.length) % lightboxItem.set.length;
    setLightboxItem({
      item: lightboxItem.set[prevIdx],
      index: prevIdx,
      set: lightboxItem.set,
    });
  }, [lightboxItem]);

  // Keyboard navigation support
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
          {/* Header Count & Category Title */}
          <div className="gallery-results-meta">
            <h2 className="gallery-results-heading">
              {activeCategory === 'All' ? 'All Visual Stories' : activeCategory}
            </h2>
            <span className="gallery-results-count">
              Showing {filteredItems.length} {filteredItems.length === 1 ? 'photo' : 'photos'}
            </span>
          </div>

          {/* Responsive Uniform Image Grid */}
          <div className="gallery-grid-uniform">
            {filteredItems.map((item, index) => (
              <article
                key={item.id}
                className="gallery-card"
                onClick={() => openLightbox(item, index)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(item, index);
                  }
                }}
              >
                <div className="gallery-card__media">
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="gallery-card__img"
                  />
                  <div className="gallery-card__badge-top">
                    <span className="gallery-card__category-tag">{item.category}</span>
                  </div>
                </div>

                {/* Hover Gradient Overlay */}
                <div className="gallery-card__overlay">
                  <div className="gallery-card__overlay-content">
                    <span className="gallery-card__overlay-tag">{item.category}</span>
                    <h3 className="gallery-card__title">{item.title}</h3>
                    <p className="gallery-card__caption">{item.shortCaption}</p>
                    <div className="gallery-card__action">
                      <span className="gallery-card__view-btn">
                        <i className="fas fa-expand-alt" aria-hidden="true"></i>
                        <span>View Details</span>
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="gallery-empty-state">
              <i className="fas fa-images gallery-empty-icon" aria-hidden="true"></i>
              <p>No photos found in this category.</p>
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
