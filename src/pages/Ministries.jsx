import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Evangelism dept photos (Rwanyange mission)
import ev1 from '../assets/Ruanyage3.jpg';
import ev2 from '../assets/Ruanyage6.jpg';
import ev3 from '../assets/Ruanyage9.jpg';

// Prayer dept photos (Emali mission)
import pr1 from '../assets/Emali mission5.jpg';
import pr2 from '../assets/Emali mission8.jpg';
import pr3 from '../assets/Emali mission11.jpg';

// Compassion dept photos (Tala mission)
import co1 from '../assets/Tala mission5.jpg';
import co2 from '../assets/Tala mission8.jpg';
import co3 from '../assets/Tala mission11.jpg';

// Rwanyange Secondary school photos
import rs1 from '../assets/Rwanyange secondary1.jpg';
import rs2 from '../assets/Rwanyange secondary5.jpg';
import rs3 from '../assets/Rwanyange secondary9.jpg';

// Githongo Boys / Academic empowerment photos
import gb1 from '../assets/Rwanyange secondary2.jpg';
import gb2 from '../assets/Rwanyange secondary7.jpg';
import gb3 from '../assets/Rwanyange secondary12.jpg';

// St. Kitheo Senior School photos
import ks1 from '../assets/KitheoSiniourSchool1.jpg';
import ks2 from '../assets/KitheoSiniourSchool3.jpg';
import ks3 from '../assets/KitheoSiniourSchool5.jpg';

const schools = [
  {
    number: '01',
    name: 'Rwanyange Senior School',
    program: 'Weekend Challenges',
    icon: 'fas fa-mountain',
    photos: [rs1, rs2, rs3],
    badge: 'Spiritual & Social Empowerment',
    description:
      'A weekend ministry focused on encouraging students to overcome academic, social, and spiritual challenges through mentorship, encouragement, prayer, and the Word of God.',
    pillars: ['Overcoming Challenges', 'Biblical Encouragement', 'Personal Mentorship', 'Fervent Prayer'],
  },
  {
    number: '02',
    name: 'Githongo Boys High School',
    program: 'Academic Excellence Motivation',
    icon: 'fas fa-award',
    photos: [gb1, gb2, gb3],
    badge: 'Academic Discipline & Potential',
    description:
      'A student empowerment program aimed at inspiring learners to pursue academic excellence, discover their potential, develop discipline, and remain focused on their educational goals.',
    pillars: ['Academic Discipline', 'Potential Discovery', 'Goal Setting & Focus', 'Character Building'],
  },
  {
    number: '03',
    name: 'St. Kitheo Senior School',
    program: 'Spiritual Nourishment',
    icon: 'fas fa-seedling',
    photos: [ks1, ks2, ks3],
    badge: 'Faith & Practical Living',
    description:
      'A ministry focused on strengthening students spiritually through the Word of God, prayer, fellowship, and practical Christian teachings, helping them grow in faith and live for Christ.',
    pillars: ['Scripture Grounding', 'Student Fellowship', 'Christian Living', 'Faith Growth'],
  },
];

const compassionWings = [
  {
    icon: 'fas fa-utensils',
    title: 'Food & Clothing Drives',
    desc: 'Meeting essential physical needs with dignity and compassion across vulnerable households.',
  },
  {
    icon: 'fas fa-hands-holding-child',
    title: 'Youth Safe Spaces',
    desc: 'Creating nurturing environments where young people find encouragement, hope, direction, and spiritual nourishment.',
  },
  {
    icon: 'fas fa-comments',
    title: 'Counseling & Guidance',
    desc: 'Walking alongside individuals and families facing distress, offering prayer and compassionate support.',
  },
  {
    icon: 'fas fa-house-chimney-medical',
    title: 'Community Visitation',
    desc: 'Home-to-home outreach praying with the sick, elderly, and vulnerable at their point of need.',
  },
];

const prayerPillars = [
  { icon: 'fas fa-compass', title: "God's Direction", desc: 'Seeking divine guidance before every mission' },
  { icon: 'fas fa-bolt', title: 'Empowerment', desc: 'Equipping missioners with spiritual boldness' },
  { icon: 'fas fa-shield-alt', title: 'Kingdom Intercession', desc: 'Standing in the gap for churches & nations' },
  { icon: 'fas fa-fire', title: 'Fasting & Prayer', desc: 'Consecrated Thursday weekly prayer vigils' },
  { icon: 'fas fa-school', title: 'Schools & Youth', desc: 'Covering students in prayer & mentorship' },
  { icon: 'fas fa-heart', title: 'Souls Harvest', desc: 'Interceding for unreached communities' },
];

const scrollToHash = (hash) => {
  if (!hash) return;
  const el = document.querySelector(hash);
  if (!el) return;
  const headerHeight = document.querySelector('.site-header-wrapper')?.offsetHeight || 80;
  const top = el.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;
  window.scrollTo({ top, behavior: 'smooth' });
};

const Ministries = () => {
  const { hash } = useLocation();
  const [activeSection, setActiveSection] = useState('evangelism');
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    if (!hash) return;
    const timer = setTimeout(() => {
      scrollToHash(hash);
      setActiveSection(hash.replace('#', ''));
    }, 120);
    return () => clearTimeout(timer);
  }, [hash]);

  // ScrollSpy listener to highlight active navigation pill
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['evangelism', 'prayer', 'compassion', 'highschool'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <main className="ministries-page">

      {/* Page Banner */}
      <section className="page-banner" style={{ backgroundImage: `url(${ev1})` }}>
        <div className="banner-overlay"></div>
        <div className="container">
          <div className="banner-content">
            <span className="banner-tag">What We Do</span>
            <h1>Our Departments</h1>
            <p>Serving God's people through dedicated ministry arms — each one a vessel of His transforming grace.</p>
          </div>
        </div>
      </section>

      {/* Sticky Dept Nav */}
      <div className="dept-nav">
        <div className="container">
          <div className="dept-nav__inner">
            {[
              { id: 'evangelism', hash: '#evangelism', icon: 'fas fa-globe-africa', label: 'Evangelism & Missions' },
              { id: 'prayer',     hash: '#prayer',     icon: 'fas fa-hands-praying', label: 'Prayer Department' },
              { id: 'compassion', hash: '#compassion', icon: 'fas fa-hand-holding-heart', label: 'Compassion Ministry' },
              { id: 'highschool', hash: '#highschool', icon: 'fas fa-graduation-cap', label: 'High School Ministry' },
            ].map(({ id, hash: h, icon, label }) => (
              <button
                key={h}
                className={`dept-nav__pill ${activeSection === id ? 'dept-nav__pill--active' : ''}`}
                onClick={() => {
                  setActiveSection(id);
                  scrollToHash(h);
                }}
              >
                <i className={icon}></i> {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 01 — Evangelism & Missions */}
      <section id="evangelism" className="dept-section section">
        <div className="container">
          <div className="dept-grid">
            <div className="dept-media">
              <div
                className="dept-photo-collage"
                onClick={() => openLightbox([ev1, ev2, ev3], 0, 'Evangelism & Missions Outreach')}
                title="Click to view full photos"
              >
                <img src={ev1} alt="Evangelism & Missions" className="collage-main" />
                <div className="collage-side">
                  <img src={ev2} alt="Street Evangelism" />
                  <img src={ev3} alt="Crusades & Revivals" />
                </div>
                <div className="collage-zoom-badge">
                  <i className="fas fa-expand"></i> View Photos
                </div>
              </div>
            </div>
            <div className="dept-content">
              <span className="dept-number">01</span>
              <span className="section-subtitle">Department</span>
              <h2 className="section-title">Evangelism &amp; Missions</h2>
              <p className="lead">
                We are called to go — and go we do. KEMT's evangelism arm takes the Gospel to communities across
                Kenya through strategic mission trips, street evangelism, one-on-one outreach, and mass crusades.
              </p>
              <p>
                From Meru to Machakos, and from Makueni to Kajiado, our missioners carry the light of Christ into
                every community they enter. Between 2025 and 2026, we have witnessed <strong>445+ souls</strong> come
                to Christ across five major mission outreaches.
              </p>

              <div className="dept-feature-pills">
                <span className="feature-pill"><i className="fas fa-bullhorn"></i> One-on-One Outreach</span>
                <span className="feature-pill"><i className="fas fa-users"></i> Street Evangelism</span>
                <span className="feature-pill"><i className="fas fa-fire"></i> Crusades & Revivals</span>
                <span className="feature-pill"><i className="fas fa-person-walking"></i> Prayer Walks</span>
                <span className="feature-pill"><i className="fas fa-seedling"></i> Integral Mission</span>
              </div>

              <div className="dept-actions">
                <Link to="/programs" className="btn btn-primary dept-cta">
                  Explore Mission Outreaches <i className="fas fa-arrow-right"></i>
                </Link>
                <Link to="/gallery" className="btn btn-secondary dept-cta">
                  <i className="fas fa-images"></i> Mission Gallery
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Prayer Department */}
      <section id="prayer" className="dept-section dept-section--alt section">
        <div className="container">
          <div className="dept-grid dept-grid--reverse">
            <div className="dept-content">
              <span className="dept-number">02</span>
              <span className="section-subtitle">Department</span>
              <h2 className="section-title">Prayer Department</h2>
              <p className="lead">
                Prayer is the foundation of everything we do at Kingdom Enlightenment Missions Team.
              </p>
              <p>
                Our Prayer Department provides a strong spiritual foundation for the ministry through a dedicated
                prayer committee committed to seeking God and standing in the gap for the work of the Kingdom.
              </p>

              {/* Spotlight Thursday Prayer & Fasting Box */}
              <div className="prayer-schedule-box">
                <div className="prayer-schedule-box__header">
                  <div className="prayer-schedule-box__icon">
                    <i className="fas fa-fire"></i>
                  </div>
                  <div>
                    <h4>Every Thursday Prayer &amp; Fasting</h4>
                    <span className="prayer-schedule-box__tag">Weekly Spiritual Foundation</span>
                  </div>
                </div>
                <p>
                  Every <strong>Thursday</strong>, our entire team comes together for a dedicated time of{' '}
                  <strong>prayer and fasting</strong>, interceding for our missions, missioners, communities,
                  churches, schools, and the advancement of the Gospel.
                </p>
                <div className="prayer-schedule-box__footer">
                  <span><i className="fas fa-clock"></i> 6:00 AM – 6:00 PM (EAT)</span>
                  <span><i className="fas fa-users"></i> Dedicated Intercession Committee</span>
                </div>
              </div>

              <p>
                Through prayer, we seek God's direction, strength, wisdom, and empowerment as we continue to
                fulfil our mandate of reaching the unreached and advancing the Kingdom of God.
              </p>

              <blockquote className="dept-quote">
                "We believe that before we go out to reach people, we must first go before God in prayer."
              </blockquote>

              <div className="prayer-pillars-grid">
                {prayerPillars.map((p, i) => (
                  <div className="prayer-pillar-card" key={i}>
                    <div className="prayer-pillar-card__icon">
                      <i className={p.icon}></i>
                    </div>
                    <div>
                      <h5>{p.title}</h5>
                      <p>{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="dept-actions" style={{ marginTop: '1.75rem' }}>
                <Link to="/contact" className="btn btn-primary dept-cta">
                  <i className="fas fa-hands-praying"></i> Submit Prayer Request
                </Link>
              </div>
            </div>

            <div className="dept-media">
              <div
                className="dept-photo-collage"
                onClick={() => openLightbox([pr1, pr2, pr3], 0, 'Prayer & Fasting Department')}
                title="Click to view full photos"
              >
                <img src={pr1} alt="Prayer Department" className="collage-main" />
                <div className="collage-side">
                  <img src={pr2} alt="Intercession Sessions" />
                  <img src={pr3} alt="Team Prayer Walks" />
                </div>
                <div className="collage-zoom-badge">
                  <i className="fas fa-expand"></i> View Photos
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Compassion Ministry */}
      <section id="compassion" className="dept-section section">
        <div className="container">
          <div className="dept-grid">
            <div className="dept-media">
              <div
                className="dept-photo-collage"
                onClick={() => openLightbox([co1, co2, co3], 0, 'Compassion Ministry Outreaches')}
                title="Click to view full photos"
              >
                <img src={co1} alt="Compassion Ministry" className="collage-main" />
                <div className="collage-side">
                  <img src={co2} alt="Food and Clothing Outreach" />
                  <img src={co3} alt="Youth Guidance & Counsel" />
                </div>
                <div className="collage-zoom-badge">
                  <i className="fas fa-expand"></i> View Photos
                </div>
              </div>
            </div>

            <div className="dept-content">
              <span className="dept-number">03</span>
              <span className="section-subtitle">Department</span>
              <h2 className="section-title">Compassion Ministry</h2>
              <p className="lead">
                At Kingdom Enlightenment Missions Team, we believe that the Gospel must not only be preached with
                our lips but also demonstrated through our actions.
              </p>
              <p>
                Through our missions, we engage communities with compassion, reaching people at their point of
                need and reminding them that they are seen, valued, and loved by God.
              </p>
              <p>
                Our compassion ministry involves giving food and clothing, offering counsel, praying with people,
                and walking alongside those facing different challenges, with special attention to the young generation.
                We create safe spaces where young people can find encouragement, hope, direction, and spiritual nourishment.
              </p>
              <p>
                For us, compassion is more than meeting a physical need — it is an opportunity to reveal the heart
                of Christ. Every meal shared, garment given, prayer offered, and life encouraged becomes a bridge
                through which the love of Jesus reaches the community.
              </p>

              {/* 4 Compassion Wings */}
              <div className="compassion-wings-grid">
                {compassionWings.map((item, i) => (
                  <div className="compassion-wing-card" key={i}>
                    <div className="compassion-wing-card__icon">
                      <i className={item.icon}></i>
                    </div>
                    <div className="compassion-wing-card__text">
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <blockquote className="dept-quote">
                "We serve because Christ first loved us. We care because every soul matters."
              </blockquote>

              <div className="dept-actions" style={{ marginTop: '1.5rem' }}>
                <Link to="/donate" className="btn btn-primary dept-cta">
                  <i className="fas fa-heart"></i> Support Compassion Fund
                </Link>
                <Link to="/contact" className="btn btn-secondary dept-cta">
                  Partner in Giving
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — High School Ministry */}
      <section id="highschool" className="dept-section dept-section--alt section">
        <div className="container">
          <div className="section-header">
            <span className="dept-number" style={{ textAlign: 'center', display: 'block' }}>04</span>
            <span className="section-subtitle">Department</span>
            <h2 className="section-title">High School Ministry</h2>
            <p className="section-description">
              Reaching the next generation where they are — in the classroom, the dormitory, and the heart.
              Empowering students through spiritual nourishment, academic motivation, and life mentorship.
            </p>
          </div>

          <div className="schools-grid">
            {schools.map((school, i) => (
              <div className="school-card" key={i}>
                {/* Photo header */}
                <div
                  className="school-card__img"
                  onClick={() => openLightbox(school.photos, 0, `${school.name} - ${school.program}`)}
                  title="Click to view photos"
                >
                  <img src={school.photos[0]} alt={school.name} className="school-main-photo" />
                  <div className="school-photo-strip">
                    <img src={school.photos[1]} alt="" />
                    <img src={school.photos[2]} alt="" />
                  </div>
                  <div className="school-card__num">{school.number}</div>
                  <div className="school-card__zoom-hint">
                    <i className="fas fa-search-plus"></i>
                  </div>
                </div>

                {/* Card body */}
                <div className="school-card__body">
                  <span className="school-badge">{school.badge}</span>
                  <h3 className="school-card__name">{school.name}</h3>
                  <p className="school-card__program">
                    <i className={school.icon}></i> {school.program}
                  </p>
                  <p className="school-card__desc">{school.description}</p>

                  <div className="school-pillars">
                    {school.pillars.map((pillar, pIdx) => (
                      <span className="school-pillar-tag" key={pIdx}>
                        <i className="fas fa-check-circle"></i> {pillar}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* School Ministry Impact & Invitation Banner */}
          <div className="school-invite-box">
            <div className="school-invite-box__content">
              <div className="school-invite-box__icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <div className="school-invite-box__text">
                <h3>Would You Like KEMT To Visit Your School or Youth Fellowship?</h3>
                <p>
                  We partner with secondary schools, high schools, and youth groups across Kenya to conduct
                  Weekend Challenges, Academic Mentorship, and Spiritual Nourishment sessions.
                </p>
              </div>
              <div className="school-invite-box__action">
                <Link to="/contact" className="btn btn-primary">
                  Invite Us Today <i className="fas fa-paper-plane"></i>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Global Lightbox Modal */}
      {lightbox && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox__close" onClick={closeLightbox} aria-label="Close photo preview">
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

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Get Involved In Our Ministries</h2>
            <p>Whether through prayer, giving, or serving — there is a place for you in what God is doing through KEMT.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">Partner With Us</Link>
              <Link to="/donate" className="btn btn-secondary">Give Now</Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Ministries;
