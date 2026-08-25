import React, { useState, useEffect, useRef } from 'react';
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
    dates: '19th – 24th August 2025',
    church: 'East Africa Pentecostal Church, Rwanyange',
    souls: 145,
    photos: [r1, r2, r3, r4],
    description:
      'Our Rwanyange mission focused on taking the Gospel directly to the people through one-on-one evangelism and street evangelism, while also meeting practical community needs through integral mission and compassion ministry. The mission featured powerful crusades and revival meetings, alongside youth workshops and mentorship, creating opportunities for both salvation and spiritual growth.',
    activities: [
      'One-on-One Evangelism', 'Street Evangelism', 'Crusades & Revivals',
      'Youth Workshops', 'Mentorship', 'Compassion Ministry', 'Integral Mission',
    ],
  },
  {
    id: 2,
    name: 'Gikumene Mission',
    location: 'Meru',
    dates: '29th December 2025 – 4th January 2026',
    church: 'Deliverance Church, Gikumene',
    souls: 130,
    photos: [g1, g2, g3, g4],
    description:
      'The Gikumene mission was a powerful Gospel outreach that combined personal evangelism, street outreach, compassion, and integral mission. Through crusades and revival meetings, the Gospel was proclaimed publicly, while youth workshops and mentorship provided a platform to encourage and equip the next generation.',
    activities: [
      'One-on-One Evangelism', 'Street Evangelism', 'Crusades & Revivals',
      'Youth Workshops', 'Mentorship', 'Compassion Ministry', 'Integral Mission',
    ],
  },
  {
    id: 3,
    name: 'Tala Mission',
    location: 'Machakos',
    dates: '20th – 26th April 2026',
    church: 'Liberty Church, Tala',
    souls: 170,
    photos: [t1, t2, t3, t4],
    description:
      'The Tala mission carried the Gospel into the community through one-on-one and street evangelism, complemented by integral mission and compassion outreach. The team also conducted prayer walks, interceding for the community and preparing the ground spiritually. Crusades, revival meetings, youth workshops, and mentorship further strengthened the outreach.',
    activities: [
      'One-on-One Evangelism', 'Street Evangelism', 'Prayer Walks',
      'Crusades & Revivals', 'Youth Workshops', 'Mentorship', 'Compassion Ministry', 'Integral Mission',
    ],
  },
  {
    id: 4,
    name: 'Emali Mission',
    location: 'Makueni & Kajiado',
    dates: '10th – 16th August 2026',
    church: 'Methodist Church of Kenya, Emali',
    souls: 76,
    photos: [e1, e2, e3, e4],
    description:
      'The Emali mission brought together evangelism and practical community transformation. The team engaged people through one-on-one evangelism, street evangelism, compassion ministry, and integral mission, while prayer walks helped establish a strong spiritual foundation. Crusades, revival meetings, youth workshops, and mentorship created spaces for people to encounter Christ and grow in faith.',
    activities: [
      'One-on-One Evangelism', 'Street Evangelism', 'Prayer Walks',
      'Crusades & Revivals', 'Youth Workshops', 'Mentorship', 'Compassion Ministry', 'Integral Mission',
    ],
  },
  {
    id: 5,
    name: 'Ntakira Mission',
    location: 'Meru',
    dates: '20th – 23rd August 2026',
    church: 'Methodist Church of Kenya, Ntakira Parish',
    souls: null,
    photos: [n1, n2, n3, n4],
    description:
      "The Ntakira mission continued the team's commitment to reaching communities with the Gospel. Through one-on-one evangelism, street evangelism, integral mission, and compassion, we connected with people at a personal and community level. The mission also featured crusades, revival meetings, youth mentorship, and prayer, creating opportunities for people to encounter the transforming power of Jesus Christ.",
    activities: [
      'One-on-One Evangelism', 'Street Evangelism', 'Crusades & Revivals',
      'Youth Mentorship', 'Prayer', 'Compassion Ministry', 'Integral Mission',
    ],
  },
];

const Programs = () => {
  const [animated, setAnimated] = useState(false);
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

  return (
    <main className="programs-page">

      {/* Page Banner */}
      <section className="page-banner" style={{ backgroundImage: `url(${r1})` }}>
        <div className="banner-overlay"></div>
        <div className="container">
          <div className="banner-content">
            <span className="banner-tag">2025 — 2026</span>
            <h1>Mission Outreach</h1>
            <p>Taking the Gospel to communities across Kenya — one soul at a time.</p>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="section outreach-intro-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Our Outreach</span>
            <h2 className="section-title">Lighting Communities With the Gospel</h2>
            <p className="section-description">
              Kingdom Enlightenment Missions Team (KEMT) is committed to taking the Gospel of Jesus Christ to
              communities through evangelism, prayer, compassion, mentorship, and integral mission. From 2025 to
              2026, KEMT conducted several outreach missions across Kenya, witnessing lives transformed and people
              coming to Christ.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Cards */}
      <section className="section missions-list-section" ref={sectionRef}>
        <div className="container">
          {missions.map((mission, index) => (
            <div
              key={mission.id}
              className={`mission-entry ${index % 2 !== 0 ? 'mission-entry--reverse' : ''} ${animated ? 'mission-entry--visible' : ''}`}
              style={{ transitionDelay: `${index * 0.12}s` }}
            >
              {/* Photo Panel */}
              <div className="mission-entry__image">
                <img src={mission.photos[0]} alt={mission.name} className="mission-cover-img" />
                <div className="mission-photo-strip">
                  <img src={mission.photos[1]} alt="" />
                  <img src={mission.photos[2]} alt="" />
                  <img src={mission.photos[3]} alt="" />
                </div>
                <div className="mission-entry__number">0{mission.id}</div>
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
                  <h4>Activities</h4>
                  <div className="activity-tags">
                    {mission.activities.map((act, i) => (
                      <span className="activity-tag" key={i}>{act}</span>
                    ))}
                  </div>
                </div>

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
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Impact Total */}
      <section className="impact-total-section" style={{ backgroundImage: `url(${t1})` }}>
        <div className="impact-total-overlay"></div>
        <div className="container">
          <div className="impact-total-content">
            <h2>Our Impact So Far</h2>
            <p>
              Through these missions, <strong>445 people</strong> have made decisions to receive Christ, with many
              more reached through evangelism, prayer, compassion, mentorship, and community outreach.
            </p>
            <div className="impact-total-stats">
              <div className="impact-total-stat">
                <span className="impact-total-num">445+</span>
                <span className="impact-total-label">Souls Won</span>
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
