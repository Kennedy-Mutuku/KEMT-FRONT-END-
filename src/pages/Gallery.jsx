import React, { useState, useMemo } from 'react';

// Use Vite glob import to pull all assets
const allAssets = import.meta.glob('../assets/*.jpg', { eager: true });

const categorize = () => {
  const cats = {
    rwanyange_mission:  [],
    gikumene_ntakira:   [],
    tala:               [],
    emali:              [],
    rwanyange_school:   [],
    kitheo:             [],
  };

  Object.entries(allAssets).forEach(([path, mod]) => {
    const name = path.split('/').pop();
    const url  = mod.default;
    if (name.startsWith('Ruanyage'))          cats.rwanyange_mission.push(url);
    else if (name.startsWith('Gaukene'))      cats.gikumene_ntakira.push(url);
    else if (name.startsWith('Tala'))         cats.tala.push(url);
    else if (name.startsWith('Emali'))        cats.emali.push(url);
    else if (name.startsWith('Rwanyange'))    cats.rwanyange_school.push(url);
    else if (name.startsWith('Kitheo'))       cats.kitheo.push(url);
  });

  return cats;
};

const photos = categorize();

const tabs = [
  { key: 'all',               label: 'All Photos',             icon: 'fas fa-th' },
  { key: 'rwanyange_mission', label: 'Rwanyange Mission',      icon: 'fas fa-globe-africa' },
  { key: 'gikumene_ntakira',  label: 'Gikumene & Ntakira',    icon: 'fas fa-globe-africa' },
  { key: 'tala',              label: 'Tala Mission',           icon: 'fas fa-globe-africa' },
  { key: 'emali',             label: 'Emali Mission',          icon: 'fas fa-globe-africa' },
  { key: 'rwanyange_school',  label: 'Rwanyange School',       icon: 'fas fa-graduation-cap' },
  { key: 'kitheo',            label: 'St. Kitheo School',      icon: 'fas fa-graduation-cap' },
];

const Gallery = () => {
  const [active, setActive] = useState('all');
  const [lightbox, setLightbox] = useState(null);

  const displayed = useMemo(() => {
    if (active === 'all') return Object.values(photos).flat();
    return photos[active] || [];
  }, [active]);

  const openLightbox = (url, index) => setLightbox({ url, index, set: displayed });

  const closeLightbox = () => setLightbox(null);

  const prevPhoto = () => {
    if (!lightbox) return;
    const prev = (lightbox.index - 1 + lightbox.set.length) % lightbox.set.length;
    setLightbox({ ...lightbox, url: lightbox.set[prev], index: prev });
  };

  const nextPhoto = () => {
    if (!lightbox) return;
    const next = (lightbox.index + 1) % lightbox.set.length;
    setLightbox({ ...lightbox, url: lightbox.set[next], index: next });
  };

  return (
    <main className="gallery-page">

      {/* Page Banner */}
      <section className="page-banner">
        <div className="banner-overlay"></div>
        <div className="container">
          <div className="banner-content">
            <span className="banner-tag">Visual Stories</span>
            <h1>Photo Gallery</h1>
            <p>A glimpse into the lives touched, communities reached and moments of grace captured in the field.</p>
          </div>
        </div>
      </section>

      {/* Tab Filter */}
      <div className="gallery-tab-bar">
        <div className="container">
          <div className="gallery-tabs">
            {tabs.map(tab => (
              <button
                key={tab.key}
                className={`gallery-tab ${active === tab.key ? 'gallery-tab--active' : ''}`}
                onClick={() => setActive(tab.key)}
              >
                <i className={tab.icon}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Count */}
      <div className="gallery-count">
        <div className="container">
          <p>{displayed.length} photo{displayed.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {/* Photo Grid */}
      <section className="gallery-grid-section">
        <div className="container">
          <div className="gallery-masonry">
            {displayed.map((url, i) => (
              <div
                key={i}
                className="gallery-item"
                onClick={() => openLightbox(url, i)}
              >
                <img src={url} alt="" loading="lazy" />
                <div className="gallery-item__overlay">
                  <i className="fas fa-expand-alt"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox__close" onClick={closeLightbox}>
            <i className="fas fa-times"></i>
          </button>
          <button className="lightbox__prev" onClick={(e) => { e.stopPropagation(); prevPhoto(); }}>
            <i className="fas fa-chevron-left"></i>
          </button>
          <div className="lightbox__img-wrap" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.url} alt="" />
          </div>
          <button className="lightbox__next" onClick={(e) => { e.stopPropagation(); nextPhoto(); }}>
            <i className="fas fa-chevron-right"></i>
          </button>
          <div className="lightbox__counter">
            {lightbox.index + 1} / {lightbox.set.length}
          </div>
        </div>
      )}

    </main>
  );
};

export default Gallery;
