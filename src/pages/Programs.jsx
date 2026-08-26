import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';

// Rwanyange Mission photos
import r1 from '../assets/Ruanyage1.jpg';
import r2 from '../assets/Ruanyage2.jpg';
import r3 from '../assets/Ruanyage3.jpg';
import r4 from '../assets/Ruanyage4.jpg';

// Gikumene Mission photos (Gaukene ntakira circuit 1–4)
import g1 from '../assets/Gaukene ntakira circuit mission1.jpg';
import g2 from '../assets/Gaukene ntakira circuit mission2.jpg';
import g3 from '../assets/Gaukene ntakira circuit mission3.jpg';
import g4 from '../assets/Gaukene ntakira circuit mission4.jpg';

// Tala Mission photos
import t1 from '../assets/Tala mission1.jpg';
import t2 from '../assets/Tala mission2.jpg';
import t3 from '../assets/Tala mission3.jpg';
import t4 from '../assets/Tala mission4.jpg';

// Emali Mission photos
import e1 from '../assets/Emali mission1.jpg';
import e2 from '../assets/Emali mission2.jpg';
import e3 from '../assets/Emali mission3.jpg';
import e4 from '../assets/Emali mission4.jpg';

// Ntakira Mission photos (Gaukene ntakira circuit 5–8)
import n1 from '../assets/Gaukene ntakira circuit mission5.jpg';
import n2 from '../assets/Gaukene ntakira circuit mission6.jpg';
import n3 from '../assets/Gaukene ntakira circuit mission7.jpg';
import n4 from '../assets/Gaukene ntakira circuit mission8.jpg';

const missions = [
  {
    id: 1,
    name: 'Rwanyange Mission',
    location: 'Meru',
    county: 'Meru',
    dates: '19th – 24th August 2025',
    year: '2025',
    church: 'East Africa Pentecostal Church, Rwanyange',
    souls: 145,
    photos: [r1, r2, r3, r4],
    description:
      'Our Rwanyange mission focused on taking the Gospel directly to the people through one-on-one evangelism and street evangelism, while also meeting practical community needs through integral mission and compassion ministry. The mission featured powerful crusades and revival meetings, alongside youth workshops and mentorship, creating opportunities for both salvation and spiritual growth.',
    activities: [
      'One-on-One Evangelism',
      'Street Evangelism',
      'Crusades & Revivals',
      'Youth Workshops',
      'Mentorship',
      'Compassion Ministry',
      'Integral Mission',
    ],
    highlights: 'Crusades, Street Evangelism, Youth Mentorship & Integral Mission',
  },
  {
    id: 2,
    name: 'Gikumene Mission',
    location: 'Meru',
    county: 'Meru',
    dates: '29th December 2025 – 4th January 2026',
    year: '2025–2026',
    church: 'Deliverance Church, Gikumene',
    souls: 130,
    photos: [g1, g2, g3, g4],
    description:
      'The Gikumene mission was a powerful Gospel outreach that combined personal evangelism, street outreach, compassion, and integral mission. Through crusades and revival meetings, the Gospel was proclaimed publicly, while youth workshops and mentorship provided a platform to encourage and equip the next generation.',
    activities: [
      'One-on-One Evangelism',
      'Street Evangelism',
      'Crusades & Revivals',
      'Youth Workshops',
      'Mentorship',
      'Compassion Ministry',
      'Integral Mission',
    ],
    highlights: 'Personal Evangelism, Revival Meetings & Next-Gen Equipping',
  },
  {
    id: 3,
    name: 'Tala Mission',
    location: 'Machakos',
    county: 'Machakos',
    dates: '20th – 26th April 2026',
    year: '2026',
    church: 'Liberty Church, Tala',
    souls: 170,
    photos: [t1, t2, t3, t4],
    description:
      'The Tala mission carried the Gospel into the community through one-on-one and street evangelism, complemented by integral mission and compassion outreach. The team also conducted prayer walks, interceding for the community and preparing the ground spiritually. Crusades, revival meetings, youth workshops, and mentorship further strengthened the outreach.',
    activities: [
      'One-on-One Evangelism',
      'Street Evangelism',
      'Prayer Walks',
      'Crusades & Revivals',
      'Youth Workshops',
      'Mentorship',
      'Compassion Ministry',
      'Integral Mission',
    ],
    highlights: 'Spiritual Prayer Walks, Mass Crusades & Community Compassion',
  },
  {
    id: 4,
    name: 'Emali Mission',
    location: 'Makueni & Kajiado',
    county: 'Makueni & Kajiado',
    dates: '10th – 16th August 2026',
    year: '2026',
    church: 'Methodist Church of Kenya, Emali',
    souls: 76,
    photos: [e1, e2, e3, e4],
    description:
      'The Emali mission brought together evangelism and practical community transformation. The team engaged people through one-on-one evangelism, street evangelism, compassion ministry, and integral mission, while prayer walks helped establish a strong spiritual foundation. Crusades, revival meetings, youth workshops, and mentorship created spaces for people to encounter Christ and grow in faith.',
    activities: [
      'One-on-One Evangelism',
      'Street Evangelism',
      'Prayer Walks',
      'Crusades & Revivals',
      'Youth Workshops',
      'Mentorship',
      'Compassion Ministry',
      'Integral Mission',
    ],
    highlights: 'Cross-County Outreach, Practical Transformation & Discipleship',
  },
  {
    id: 5,
    name: 'Ntakira Mission',
    location: 'Meru',
    county: 'Meru',
    dates: '20th – 23rd August 2026',
    year: '2026',
    church: 'Methodist Church of Kenya, Ntakira Parish',
    souls: null,
    photos: [n1, n2, n3, n4],
    description:
      "The Ntakira mission continued the team's commitment to reaching communities with the Gospel. Through one-on-one evangelism, street evangelism, integral mission, and compassion, we connected with people at a personal and community level. The mission also featured crusades, revival meetings, youth mentorship, and prayer, creating opportunities for people to encounter the transforming power of Jesus Christ.",
    activities: [
      'One-on-One Evangelism',
      'Street Evangelism',
      'Crusades & Revivals',
      'Youth Mentorship',
      'Prayer',
      'Compassion Ministry',
      'Integral Mission',
    ],
    highlights: 'Parish Revival, Community Connection & Transforming Prayer',
  },
];

const countyOptions = [
  { key: 'all', label: 'All Counties', count: 5 },
  { key: 'Meru', label: 'Meru County', count: 3 },
  { key: 'Machakos', label: 'Machakos County', count: 1 },
  { key: 'Makueni & Kajiado', label: 'Makueni & Kajiado', count: 1 },
];

const activityFilters = [
  'All Activities',
  'Crusades & Revivals',
  'Street Evangelism',
  'One-on-One Evangelism',
  'Prayer Walks',
  'Youth Workshops',
  'Compassion Ministry',
  'Integral Mission',
];

const Programs = () => {
  const [animated, setAnimated] = useState(false);
  const [selectedCounty, setSelectedCounty] = useState('all');
  const [selectedActivity, setSelectedActivity] = useState('All Activities');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' | 'timeline'
  const [lightbox, setLightbox] = useState(null);

  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Filtered Missions Logic
  const filteredMissions = useMemo(() => {
    return missions.filter((m) => {
      // County filter
      const matchesCounty = selectedCounty === 'all' || m.county === selectedCounty;

      // Activity filter
      const matchesActivity =
        selectedActivity === 'All Activities' ||
        m.activities.some((a) => a.toLowerCase().includes(selectedActivity.toLowerCase()));

      // Search query
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        m.name.toLowerCase().includes(q) ||
        m.location.toLowerCase().includes(q) ||
        m.church.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.activities.some((act) => act.toLowerCase().includes(q)) ||
        m.dates.toLowerCase().includes(q);

      return matchesCounty && matchesActivity && matchesSearch;
    });
  }, [selectedCounty, selectedActivity, searchQuery]);

  const openLightbox = (photos, index = 0, title = '') => {
    setLightbox({ photos, index, title });
  };

  const closeLightbox = () => setLightbox(null);

  const prevPhoto = () => {
    if (!lightbox) return;
    const prev = (lightbox.index - 1 + lightbox.photos.length) % lightbox.photos.length;
    setLightbox({ ...lightbox, index: prev });
  };

  const nextPhoto = () => {
    if (!lightbox) return;
    const next = (lightbox.index + 1) % lightbox.photos.length;
    setLightbox({ ...lightbox, index: next });
  };

  const resetFilters = () => {
    setSelectedCounty('all');
    setSelectedActivity('All Activities');
    setSearchQuery('');
  };

  return (
    <main className="programs-page">

      {/* Page Banner */}
      <section className="page-banner" style={{ backgroundImage: `url(${r1})` }}>
        <div className="banner-overlay"></div>
        <div className="container">
          <div className="banner-content">
            <span className="banner-tag">2025 — 2026 Outreaches</span>
            <h1>Mission Outreach</h1>
            <p>Taking the Gospel to communities across Kenya — one soul and one transformed life at a time.</p>
          </div>
        </div>
      </section>

      {/* Intro Overview */}
      <section className="section outreach-intro-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Our Outreach Mandate</span>
            <h2 className="section-title">Lighting Communities With the Gospel</h2>
            <p className="section-description">
              Kingdom Enlightenment Missions Team (KEMT) is committed to taking the Gospel of Jesus Christ to
              communities through evangelism, prayer, compassion, mentorship, and integral mission. From 2025 to
              2026, KEMT conducted several outreach missions across Kenya, witnessing lives transformed and people
              coming to Christ.
            </p>
          </div>

          {/* Quick Impact Highlight Ribbon */}
          <div className="outreach-stats-ribbon">
            <div className="stat-ribbon-item">
              <div className="stat-ribbon-icon"><i className="fas fa-heart"></i></div>
              <div>
                <span className="stat-ribbon-num">445+</span>
                <span className="stat-ribbon-label">Souls Received Christ</span>
              </div>
            </div>
            <div className="stat-ribbon-item">
              <div className="stat-ribbon-icon"><i className="fas fa-map-location-dot"></i></div>
              <div>
                <span className="stat-ribbon-num">5</span>
                <span className="stat-ribbon-label">Missions Conducted</span>
              </div>
            </div>
            <div className="stat-ribbon-item">
              <div className="stat-ribbon-icon"><i className="fas fa-church"></i></div>
              <div>
                <span className="stat-ribbon-num">4</span>
                <span className="stat-ribbon-label">Counties Reached</span>
              </div>
            </div>
            <div className="stat-ribbon-item">
              <div className="stat-ribbon-icon"><i className="fas fa-hands-praying"></i></div>
              <div>
                <span className="stat-ribbon-num">100%</span>
                <span className="stat-ribbon-label">Gospel-Driven</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Filter & View Control Bar */}
      <section className="mission-filter-section">
        <div className="container">
          <div className="filter-controls-wrapper">

            {/* Search Box */}
            <div className="filter-search-box">
              <i className="fas fa-search filter-search-icon"></i>
              <input
                type="text"
                placeholder="Search missions by church, county, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="filter-search-input"
              />
              {searchQuery && (
                <button className="filter-search-clear" onClick={() => setSearchQuery('')}>
                  <i className="fas fa-times"></i>
                </button>
              )}
            </div>

            {/* County Pills */}
            <div className="filter-county-pills">
              {countyOptions.map((c) => (
                <button
                  key={c.key}
                  className={`county-pill ${selectedCounty === c.key ? 'county-pill--active' : ''}`}
                  onClick={() => setSelectedCounty(c.key)}
                >
                  <span>{c.label}</span>
                  <span className="pill-count">{c.count}</span>
                </button>
              ))}
            </div>

            {/* Activity Select & View Toggle */}
            <div className="filter-secondary-row">
              <div className="activity-filter-wrap">
                <label htmlFor="activity-select"><i className="fas fa-filter"></i> Activity:</label>
                <select
                  id="activity-select"
                  className="activity-select"
                  value={selectedActivity}
                  onChange={(e) => setSelectedActivity(e.target.value)}
                >
                  {activityFilters.map((act, i) => (
                    <option key={i} value={act}>{act}</option>
                  ))}
                </select>
              </div>

              <div className="view-mode-toggle">
                <span className="view-label">View:</span>
                <button
                  className={`view-btn ${viewMode === 'cards' ? 'view-btn--active' : ''}`}
                  onClick={() => setViewMode('cards')}
                  title="Card View"
                >
                  <i className="fas fa-th-large"></i> Cards
                </button>
                <button
                  className={`view-btn ${viewMode === 'timeline' ? 'view-btn--active' : ''}`}
                  onClick={() => setViewMode('timeline')}
                  title="Timeline View"
                >
                  <i className="fas fa-stream"></i> Timeline
                </button>
              </div>
            </div>

            {/* Results count & reset */}
            <div className="filter-results-status">
              <span>Showing <strong>{filteredMissions.length}</strong> of {missions.length} missions</span>
              {(selectedCounty !== 'all' || selectedActivity !== 'All Activities' || searchQuery) && (
                <button className="filter-reset-btn" onClick={resetFilters}>
                  <i className="fas fa-rotate-left"></i> Reset Filters
                </button>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* No Results State */}
      {filteredMissions.length === 0 && (
        <section className="no-results-section section">
          <div className="container">
            <div className="no-results-box">
              <i className="fas fa-magnifying-glass-location"></i>
              <h3>No missions match your filter</h3>
              <p>Try searching for a different keyword or reset your filters to see all missions.</p>
              <button className="btn btn-primary" onClick={resetFilters}>
                View All Missions
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Card View Mode */}
      {viewMode === 'cards' && filteredMissions.length > 0 && (
        <section className="section missions-list-section" ref={sectionRef}>
          <div className="container">
            {filteredMissions.map((mission, index) => (
              <div
                key={mission.id}
                className={`mission-entry ${index % 2 !== 0 ? 'mission-entry--reverse' : ''} ${animated ? 'mission-entry--visible' : ''}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                {/* Photo Panel with Lightbox click */}
                <div
                  className="mission-entry__image"
                  onClick={() => openLightbox(mission.photos, 0, `${mission.name} (${mission.location})`)}
                  title="Click to view full photo gallery"
                >
                  <img src={mission.photos[0]} alt={mission.name} className="mission-cover-img" />
                  <div className="mission-photo-strip">
                    <img src={mission.photos[1]} alt="" />
                    <img src={mission.photos[2]} alt="" />
                    <img src={mission.photos[3]} alt="" />
                  </div>
                  <div className="mission-entry__number">0{mission.id}</div>
                  <div className="mission-photo-zoom-hint">
                    <i className="fas fa-expand-alt"></i> View {mission.photos.length} Photos
                  </div>
                </div>

                {/* Content Panel */}
                <div className="mission-entry__body">
                  <div className="mission-entry__meta">
                    <span className="mission-entry__location">
                      <i className="fas fa-map-marker-alt"></i> {mission.location}
                    </span>
                    <span className="mission-entry__dates">
                      <i className="fas fa-calendar-alt"></i> {mission.dates}
                    </span>
                  </div>

                  <h2 className="mission-entry__title">{mission.name}</h2>

                  <p className="mission-entry__church">
                    <i className="fas fa-church"></i> {mission.church}
                  </p>

                  <p className="mission-entry__desc">{mission.description}</p>

                  <div className="mission-entry__activities">
                    <h4>Activities &amp; Focus Areas</h4>
                    <div className="activity-tags">
                      {mission.activities.map((act, i) => (
                        <span
                          className={`activity-tag ${selectedActivity === act ? 'activity-tag--highlight' : ''}`}
                          key={i}
                        >
                          {act}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mission-entry__bottom">
                    {mission.souls ? (
                      <div className="souls-badge">
                        <i className="fas fa-heart"></i>
                        <strong>{mission.souls}</strong>
                        <span>souls received Christ</span>
                      </div>
                    ) : (
                      <div className="souls-badge souls-badge--pending">
                        <i className="fas fa-clock"></i>
                        <span>Impact statistics to be updated</span>
                      </div>
                    )}

                    <button
                      className="mission-gallery-btn"
                      onClick={() => openLightbox(mission.photos, 0, `${mission.name} Gallery`)}
                    >
                      <i className="fas fa-images"></i> Photos
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Timeline Journey View Mode */}
      {viewMode === 'timeline' && filteredMissions.length > 0 && (
        <section className="section mission-timeline-section">
          <div className="container">
            <div className="timeline-container">
              {filteredMissions.map((mission, index) => (
                <div
                  key={mission.id}
                  className={`timeline-item ${index % 2 === 0 ? 'timeline-item--left' : 'timeline-item--right'}`}
                >
                  <div className="timeline-marker">
                    <span>0{mission.id}</span>
                  </div>
                  <div className="timeline-content-card">
                    <div className="timeline-dates">
                      <i className="fas fa-calendar-check"></i> {mission.dates}
                    </div>
                    <h3 className="timeline-title">{mission.name}</h3>
                    <div className="timeline-location">
                      <i className="fas fa-map-pin"></i> {mission.location} &bull; <i className="fas fa-church"></i> {mission.church}
                    </div>

                    <div
                      className="timeline-photo-preview"
                      onClick={() => openLightbox(mission.photos, 0, `${mission.name} (${mission.location})`)}
                    >
                      <img src={mission.photos[0]} alt={mission.name} />
                      <div className="timeline-photo-overlay">
                        <i className="fas fa-expand"></i> View Photos
                      </div>
                    </div>

                    <p className="timeline-desc">{mission.description}</p>

                    <div className="timeline-tags">
                      {mission.activities.slice(0, 4).map((act, i) => (
                        <span key={i} className="timeline-tag">{act}</span>
                      ))}
                      {mission.activities.length > 4 && (
                        <span className="timeline-tag timeline-tag--more">+{mission.activities.length - 4} more</span>
                      )}
                    </div>

                    <div className="timeline-footer">
                      {mission.souls ? (
                        <span className="timeline-souls-badge">
                          <i className="fas fa-heart"></i> <strong>{mission.souls}</strong> Souls Saved
                        </span>
                      ) : (
                        <span className="timeline-souls-badge timeline-souls-badge--pending">
                          <i className="fas fa-clock"></i> Follow-up in Progress
                        </span>
                      )}
                      <button
                        className="timeline-view-photos-btn"
                        onClick={() => openLightbox(mission.photos, 0, `${mission.name} (${mission.location})`)}
                      >
                        <i className="fas fa-images"></i> Full Gallery
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Global Lightbox Modal */}
      {lightbox && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox__close" onClick={closeLightbox} aria-label="Close lightbox">
            <i className="fas fa-times"></i>
          </button>
          <button
            className="lightbox__prev"
            onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
            aria-label="Previous photo"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <div className="lightbox__img-wrap" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.photos[lightbox.index]} alt={lightbox.title} />
            {lightbox.title && (
              <div className="lightbox__title">{lightbox.title}</div>
            )}
          </div>
          <button
            className="lightbox__next"
            onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
            aria-label="Next photo"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
          <div className="lightbox__counter">
            {lightbox.index + 1} / {lightbox.photos.length}
          </div>
        </div>
      )}

      {/* Impact Total Section */}
      <section className="impact-total-section" style={{ backgroundImage: `url(${t1})` }}>
        <div className="impact-total-overlay"></div>
        <div className="container">
          <div className="impact-total-content">
            <span className="banner-tag" style={{ background: 'rgba(255,255,255,0.15)', color: '#fff' }}>
              Transforming Lives
            </span>
            <h2>Our Impact So Far</h2>
            <p>
              Through these missions, <strong>445 people</strong> have so far made decisions to receive Christ,
              with many more reached through evangelism, prayer, compassion, mentorship, and community outreach.
            </p>

            <div className="impact-total-stats">
              <div className="impact-total-stat">
                <span className="impact-total-num">445+</span>
                <span className="impact-total-label">Souls Received Christ</span>
              </div>
              <div className="impact-total-stat">
                <span className="impact-total-num">5</span>
                <span className="impact-total-label">Mission Trips</span>
              </div>
              <div className="impact-total-stat">
                <span className="impact-total-num">4</span>
                <span className="impact-total-label">Counties Reached</span>
              </div>
              <div className="impact-total-stat">
                <span className="impact-total-num">2025–26</span>
                <span className="impact-total-label">Active Period</span>
              </div>
            </div>

            {/* Geographic Breakdown Cards */}
            <div className="county-impact-breakdown">
              <div className="county-breakdown-card">
                <i className="fas fa-location-dot"></i>
                <h4>Meru County</h4>
                <span>275+ Souls</span>
                <small>Rwanyange, Gikumene &amp; Ntakira</small>
              </div>
              <div className="county-breakdown-card">
                <i className="fas fa-location-dot"></i>
                <h4>Machakos County</h4>
                <span>170 Souls</span>
                <small>Tala Mission</small>
              </div>
              <div className="county-breakdown-card">
                <i className="fas fa-location-dot"></i>
                <h4>Makueni &amp; Kajiado</h4>
                <span>76 Souls</span>
                <small>Emali Mission</small>
              </div>
            </div>

            <p className="impact-tagline">
              Kingdom Enlightenment Missions Team — Lighting the world with the Gospel of Christ.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Partner With Us In Reaching The Lost</h2>
            <p>Your prayers and generous giving enable us to continue spreading the Gospel and transforming lives across Kenya.</p>
            <div className="cta-buttons">
              <Link to="/donate" className="btn btn-primary">Give Now</Link>
              <Link to="/contact" className="btn btn-secondary">Get Involved</Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Programs;
