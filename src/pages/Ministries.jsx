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

const evangelismMethodologies = [
  {
    icon: 'fas fa-bullhorn',
    title: 'One-on-One Outreach',
    desc: 'Meeting individuals at their homes and workplaces with personal Gospel conversations.',
  },
  {
    icon: 'fas fa-users',
    title: 'Street Evangelism',
    desc: 'Public proclaiming of the message of salvation in town centers and busy markets.',
  },
  {
    icon: 'fas fa-fire',
    title: 'Crusades & Revivals',
    desc: 'Open-air revival crusades igniting faith, healings and spiritual awakening.',
  },
  {
    icon: 'fas fa-person-walking',
    title: 'Prayer Walks',
    desc: 'Covering entire towns and villages in intercessory prayer before outreaches.',
  },
  {
    icon: 'fas fa-seedling',
    title: 'Integral Mission',
    desc: 'Combining spiritual evangelism with practical community transformation.',
  },
];

const schools = [
  {
    number: '01',
    name: 'Rwanyange Senior School',
    program: 'Weekend Challenges',
    icon: 'fas fa-mountain',
    photos: [rs1, rs2, rs3],
    badge: 'Spiritual & Social Empowerment',
    description:
      'A weekend ministry focused on encouraging students to overcome academic, social and spiritual challenges through mentorship, encouragement, prayer and the Word of God.',
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
      'A student empowerment program aimed at inspiring learners to pursue academic excellence, discover their potential, develop discipline and remain focused on their educational goals.',
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
      'A ministry focused on strengthening students spiritually through the Word of God, prayer, fellowship and practical Christian teachings, helping them grow in faith and live for Christ.',
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
    desc: 'Creating nurturing environments where young people find encouragement, hope, direction and spiritual nourishment.',
  },
  {
    icon: 'fas fa-comments',
    title: 'Counseling & Guidance',
    desc: 'Walking alongside individuals and families facing distress, offering prayer and compassionate support.',
  },
  {
    icon: 'fas fa-house-chimney-medical',
    title: 'Community Visitation',
    desc: 'Home-to-home outreach praying with the sick, elderly and vulnerable at their point of need.',
  },
];

const prayerPillars = [
  { icon: 'fas fa-compass', title: "God's Direction", desc: 'Seeking divine guidance before every mission' },
  { icon: 'fas fa-bolt', title: 'Empowerment', desc: 'Equipping missioners with spiritual boldness' },
  { icon: 'fas fa-shield-alt', title: 'Kingdom Intercession', desc: 'Standing in the gap for churches and nations' },
  { icon: 'fas fa-fire', title: 'Fasting & Prayer', desc: 'Consecrated Thursday weekly prayer vigils' },
  { icon: 'fas fa-school', title: 'Schools & Youth', desc: 'Covering students in prayer and mentorship' },
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
  const [activeSection, setActiveSection] = useState('prayer');
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
      const sections = ['prayer', 'worship', 'welfare', 'outreach', 'discipleship', 'highschool', 'digital'];
      const scrollPosition = window.scrollY + 220;

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
              { id: 'prayer',       hash: '#prayer',       label: 'Prayer Department' },
              { id: 'worship',      hash: '#worship',      label: 'Praise and Worship' },
              { id: 'welfare',      hash: '#welfare',      label: 'Welfare/Compassion' },
              { id: 'outreach',     hash: '#outreach',     label: 'Outreach' },
              { id: 'discipleship', hash: '#discipleship', label: 'Discipleship' },
              { id: 'highschool',   hash: '#highschool',   label: 'High School' },
              { id: 'digital',      hash: '#digital',      label: 'Digital Infrastructure' },
            ].map(({ id, hash: h, label }) => (
              <button
                key={h}
                className={`dept-nav__pill ${activeSection === id ? 'dept-nav__pill--active' : ''}`}
                onClick={() => {
                  setActiveSection(id);
                  scrollToHash(h);
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 01 — Prayer Department */}
      <section id="prayer" className="dept-section section">
        <div className="container">
          <div className="dept-unified-grid">
            <div className="dept-media-sleek" onClick={() => openLightbox([pr1, pr2, pr3], 0, 'Prayer Department')} title="Click to view gallery">
              <img src={pr1} alt="Prayer" />
              <div className="dept-media-badge"><i className="fas fa-expand"></i> View Gallery</div>
            </div>
            
            <div className="dept-content-sleek">
              <h2 className="section-title">Prayer Department</h2>
              <p className="lead">
                Prayer is the foundation of everything we do. Our Prayer Department provides a strong spiritual foundation through a dedicated committee committed to seeking God.
              </p>
              
              <div className="sleek-prayer-box">
                <h5><i className="fas fa-fire"></i> Thursday Prayer &amp; Fasting</h5>
                <p>Every Thursday, our team intercedes for our missions, communities, and schools (6:00 AM – 6:00 PM).</p>
              </div>
              
              <div className="dept-actions">
                <Link to="/contact" className="btn btn-primary">Submit Prayer Request</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Praise and Worship */}
      <section id="worship" className="dept-section dept-section--alt section">
        <div className="container">
          <div className="dept-unified-grid dept-unified-grid--reverse">
            <div className="dept-content-sleek">
              <h2 className="section-title">Praise and Worship</h2>
              <p className="lead">
                Leading the congregation into the presence of God through spirit-filled worship and praise. We believe worship is a lifestyle that transforms hearts.
              </p>
              
              <blockquote className="sleek-quote">
                "God is spirit, and his worshipers must worship in the Spirit and in truth."
              </blockquote>
              
              <div className="dept-actions">
                <Link to="/contact" className="btn btn-primary">Join the Worship Team</Link>
              </div>
            </div>

            <div className="dept-media-sleek" onClick={() => openLightbox([ev2], 0, 'Praise and Worship')} title="Click to view gallery">
              <img src={ev2} alt="Worship" />
              <div className="dept-media-badge"><i className="fas fa-expand"></i> View Image</div>
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Welfare/Compassion */}
      <section id="welfare" className="dept-section section">
        <div className="container">
          <div className="dept-unified-grid">
            <div className="dept-media-sleek" onClick={() => openLightbox([co1, co2, co3], 0, 'Welfare & Compassion Ministry')} title="Click to view gallery">
              <img src={co1} alt="Welfare" />
              <div className="dept-media-badge"><i className="fas fa-expand"></i> View Gallery</div>
            </div>
            
            <div className="dept-content-sleek">
              <h2 className="section-title">Welfare/Compassion</h2>
              <p className="lead">
                Through our missions we engage communities with compassion, reaching people at their point of need and reminding them that they are seen, valued and loved by God.
              </p>
              
              <blockquote className="sleek-quote">
                "We serve because Christ first loved us. We care because every soul matters."
              </blockquote>
              
              <div className="dept-actions">
                <Link to="/donate" className="btn btn-primary">Support Compassion Fund</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 — Outreach */}
      <section id="outreach" className="dept-section dept-section--alt section">
        <div className="container">
          <div className="dept-unified-grid dept-unified-grid--reverse">
            <div className="dept-content-sleek">
              <h2 className="section-title">Outreach</h2>
              <p className="lead">
                We are called to go — and go we do. KEMT's outreach arm takes the Gospel to communities across Kenya through strategic mission trips, street evangelism, and mass crusades.
              </p>
              
              <div className="dept-actions">
                <Link to="/programs" className="btn btn-primary">Explore Missions</Link>
              </div>
            </div>

            <div className="dept-media-sleek" onClick={() => openLightbox([ev1, ev2, ev3], 0, 'Outreach & Missions')} title="Click to view gallery">
              <img src={ev1} alt="Outreach" />
              <div className="dept-media-badge"><i className="fas fa-expand"></i> View Gallery</div>
            </div>
          </div>
        </div>
      </section>

      {/* 05 — Discipleship */}
      <section id="discipleship" className="dept-section section">
        <div className="container">
          <div className="dept-unified-grid">
            <div className="dept-media-sleek" onClick={() => openLightbox([ks1], 0, 'Discipleship')} title="Click to view gallery">
              <img src={ks1} alt="Discipleship" />
              <div className="dept-media-badge"><i className="fas fa-expand"></i> View Image</div>
            </div>
            
            <div className="dept-content-sleek">
              <h2 className="section-title">Discipleship</h2>
              <p className="lead">
                Grounding believers in the Word of God to ensure long-term spiritual growth. We focus on teaching, mentorship, and building mature followers of Christ.
              </p>
              
              <blockquote className="sleek-quote">
                "Therefore go and make disciples of all nations, teaching them to obey everything I have commanded you."
              </blockquote>
              
              <div className="dept-actions">
                <Link to="/contact" className="btn btn-primary">Join a Study Group</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — High School Ministry */}
      <section id="highschool" className="dept-section dept-section--alt section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">High School Ministry</h2>
            <p className="section-description">
              Reaching the next generation where they are — in the classroom, the dormitory and the heart. Empowering students through spiritual nourishment, academic motivation and life mentorship.
            </p>
          </div>

          <div className="schools-compact-grid">
            {schools.map((school, i) => (
              <div className="school-compact-card" key={i}>
                <div className="scc-img" onClick={() => openLightbox(school.photos, 0, school.name)} title="View gallery">
                  <img src={school.photos[0]} alt={school.name} />
                  <i className="fas fa-search-plus scc-zoom"></i>
                </div>
                <div className="scc-body">
                  <span className="scc-badge">{school.badge}</span>
                  <h3>{school.name}</h3>
                  <p className="scc-program"><i className={school.icon}></i> {school.program}</p>
                  <p className="scc-desc">{school.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="school-invite-sleek">
            <div className="sis-text">
              <h4>Want KEMT at Your School?</h4>
              <p>We partner with schools for Weekend Challenges &amp; Mentorship.</p>
            </div>
            <Link to="/contact" className="btn btn-primary">Invite Us <i className="fas fa-paper-plane"></i></Link>
          </div>
        </div>
      </section>

      {/* 07 — Digital Infrastructure */}
      <section id="digital" className="dept-section section">
        <div className="container">
          <div className="dept-unified-grid">
            <div className="dept-media-sleek" onClick={() => openLightbox([gb2], 0, 'Digital Infrastructure')} title="Click to view gallery">
              <img src={gb2} alt="Digital Infrastructure" />
              <div className="dept-media-badge"><i className="fas fa-expand"></i> View Image</div>
            </div>
            
            <div className="dept-content-sleek">
              <h2 className="section-title">Digital Infrastructure</h2>
              <p className="lead">
                Leveraging modern technology to amplify the reach of the Gospel. Our Digital Infrastructure team manages online platforms, media production, and digital evangelism.
              </p>
              
              <blockquote className="sleek-quote">
                "Taking the timeless message of the Gospel into the modern digital frontier."
              </blockquote>
              
              <div className="dept-actions">
                <Link to="/contact" className="btn btn-primary">Volunteer in Tech</Link>
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
            <p>Whether through prayer, giving or serving — there is a place for you in what God is doing through KEMT.</p>
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
