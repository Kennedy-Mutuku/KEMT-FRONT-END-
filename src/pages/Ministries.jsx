import React from 'react';
import { Link } from 'react-router-dom';

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
    description:
      'A weekend ministry focused on encouraging students to overcome academic, social, and spiritual challenges through mentorship, encouragement, prayer, and the Word of God.',
  },
  {
    number: '02',
    name: 'Githongo Boys High School',
    program: 'Academic Excellence Motivation',
    icon: 'fas fa-award',
    photos: null,
    description:
      'A student empowerment program aimed at inspiring learners to pursue academic excellence, discover their potential, develop discipline, and remain focused on their educational goals.',
  },
  {
    number: '03',
    name: 'St. Kitheo Senior School',
    program: 'Spiritual Nourishment',
    icon: 'fas fa-seedling',
    photos: [ks1, ks2, ks3],
    description:
      'A ministry focused on strengthening students spiritually through the Word of God, prayer, fellowship, and practical Christian teachings, helping them grow in faith and live for Christ.',
  },
];

const compassionItems = [
  { icon: 'fas fa-utensils', label: 'Food & Clothing' },
  { icon: 'fas fa-comments', label: 'Counselling' },
  { icon: 'fas fa-hands-praying', label: 'Prayer Ministry' },
  { icon: 'fas fa-users', label: 'Youth Support' },
];

const prayerPillars = [
  { icon: 'fas fa-compass', label: "God's Direction" },
  { icon: 'fas fa-bolt', label: 'Empowerment' },
  { icon: 'fas fa-shield-alt', label: 'Intercession' },
  { icon: 'fas fa-fire', label: 'Fasting' },
];

const PhotoCollage = ({ photos, alt }) => (
  <div className="dept-photo-collage">
    <img src={photos[0]} alt={alt} className="collage-main" />
    <div className="collage-side">
      <img src={photos[1]} alt="" />
      <img src={photos[2]} alt="" />
    </div>
  </div>
);

const Ministries = () => {
  return (
    <main className="ministries-page">

      {/* Page Banner */}
      <section className="page-banner" style={{ backgroundImage: `url(${ev1})` }}>
        <div className="banner-overlay"></div>
        <div className="container">
          <div className="banner-content">
            <span className="banner-tag">What We Do</span>
            <h1>Our Departments</h1>
            <p>Serving God's people through dedicated ministry arms — each one a vessel of His grace.</p>
          </div>
        </div>
      </section>

      {/* Sticky Dept Nav */}
      <div className="dept-nav">
        <div className="container">
          <div className="dept-nav__inner">
            <a href="#evangelism" className="dept-nav__pill">
              <i className="fas fa-globe-africa"></i> Evangelism &amp; Missions
            </a>
            <a href="#prayer" className="dept-nav__pill">
              <i className="fas fa-hands-praying"></i> Prayer Department
            </a>
            <a href="#compassion" className="dept-nav__pill">
              <i className="fas fa-hand-holding-heart"></i> Compassion Ministry
            </a>
            <a href="#highschool" className="dept-nav__pill">
              <i className="fas fa-graduation-cap"></i> High School Ministry
            </a>
          </div>
        </div>
      </div>

      {/* 01 — Evangelism & Missions */}
      <section id="evangelism" className="dept-section section">
        <div className="container">
          <div className="dept-grid">
            <div className="dept-media">
              <PhotoCollage photos={[ev1, ev2, ev3]} alt="Evangelism & Missions" />
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
                From Meru to Machakos, from Makueni to Kajiado, our missioners carry the light of Christ into
                every community they enter. Between 2025 and 2026, we have seen <strong>445+ souls</strong> come
                to Christ through five major mission outreaches.
              </p>
              <Link to="/programs" className="btn btn-primary dept-cta">
                View All Missions <i className="fas fa-arrow-right"></i>
              </Link>
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
                Our Prayer Department provides a strong spiritual foundation through a dedicated prayer committee
                committed to seeking God and standing in the gap for the work of the Kingdom.
              </p>
              <p>
                Every <strong>Thursday</strong>, our team comes together for a dedicated time of{' '}
                <strong>prayer and fasting</strong>, interceding for our missions, missioners, communities,
                churches, schools, and the advancement of the Gospel.
              </p>
              <p>
                Through prayer, we seek God's direction, strength, wisdom, and empowerment as we continue to
                fulfil our mandate of reaching the unreached and advancing the Kingdom of God.
              </p>
              <blockquote className="dept-quote">
                "Before we go out to reach people, we must first go before God in prayer."
              </blockquote>
              <div className="prayer-pillars">
                {prayerPillars.map((p, i) => (
                  <div className="prayer-pillar" key={i}>
                    <i className={p.icon}></i>
                    <span>{p.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="dept-media">
              <PhotoCollage photos={[pr1, pr2, pr3]} alt="Prayer Department" />
            </div>
          </div>
        </div>
      </section>

      {/* 03 — Compassion Ministry */}
      <section id="compassion" className="dept-section section">
        <div className="container">
          <div className="dept-grid">
            <div className="dept-media">
              <PhotoCollage photos={[co1, co2, co3]} alt="Compassion Ministry" />
            </div>
            <div className="dept-content">
              <span className="dept-number">03</span>
              <span className="section-subtitle">Department</span>
              <h2 className="section-title">Compassion Ministry</h2>
              <p className="lead">
                We believe that the Gospel must not only be preached with our lips but also demonstrated through
                our actions.
              </p>
              <p>
                Through our missions, we engage communities with compassion — reaching people at their point of
                need and reminding them that they are seen, valued, and loved by God.
              </p>
              <p>
                Our compassion ministry involves giving food and clothing, offering counsel, praying with people,
                and walking alongside those facing challenges — with special attention to the young generation.
                We create safe spaces where young people can find encouragement, hope, direction, and spiritual
                nourishment.
              </p>
              <p>
                For us, compassion is more than meeting a physical need — it is an opportunity to reveal the
                heart of Christ. Every meal shared, garment given, prayer offered, and life encouraged becomes a
                bridge through which the love of Jesus reaches the community.
              </p>
              <div className="compassion-items">
                {compassionItems.map((item, i) => (
                  <div className="compassion-item" key={i}>
                    <i className={item.icon}></i>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
              <blockquote className="dept-quote">
                "We serve because Christ first loved us. We care because every soul matters."
              </blockquote>
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
            </p>
          </div>
          <div className="schools-grid">
            {schools.map((school, i) => (
              <div className="school-card" key={i}>
                {/* Photo header */}
                <div className="school-card__img">
                  {school.photos ? (
                    <>
                      <img src={school.photos[0]} alt={school.name} className="school-main-photo" />
                      <div className="school-photo-strip">
                        <img src={school.photos[1]} alt="" />
                        <img src={school.photos[2]} alt="" />
                      </div>
                    </>
                  ) : (
                    <div className="school-img-placeholder">
                      <i className={school.icon}></i>
                    </div>
                  )}
                  <div className="school-card__num">{school.number}</div>
                </div>
                {/* Card body */}
                <div className="school-card__body">
                  <div className="school-card__icon">
                    <i className={school.icon}></i>
                  </div>
                  <h3 className="school-card__name">{school.name}</h3>
                  <p className="school-card__program">{school.program}</p>
                  <p className="school-card__desc">{school.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
