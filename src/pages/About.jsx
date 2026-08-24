import React from 'react';
import { Link } from 'react-router-dom';

import bannerPhoto from '../assets/Ruanyage2.jpg';
import storyPhoto1 from '../assets/Tala mission6.jpg';
import storyPhoto2 from '../assets/Emali mission6.jpg';
import storyPhoto3 from '../assets/Ruanyage7.jpg';

const leadership = [
  { name: 'Vincent Mwendwa',   role: 'Director',            initials: 'VM', color: '#e67e22' },
  { name: 'Morice Mutharimi',  role: 'Chairperson',         initials: 'MM', color: '#2980b9' },
  { name: 'Mwanzia David',     role: 'Outreach Incharge',   initials: 'MD', color: '#27ae60' },
  { name: 'Kennedy Mutuku',    role: 'Media Director',      initials: 'KM', color: '#8e44ad' },
  { name: 'Evaline Mukami',    role: 'Secretary',           initials: 'EM', color: '#16a085' },
  { name: 'Raymond Ewoi',      role: 'Prayer Coordinator',  initials: 'RE', color: '#c0392b' },
  { name: 'Victor Muriungi',   role: 'Worship Coordinator', initials: 'VM', color: '#d4ac0d' },
];

const values = [
  { icon: 'fas fa-bible',          label: 'Biblical Authority',    desc: 'Everything we do is rooted in and guided by the Word of God.' },
  { icon: 'fas fa-hands-praying',  label: 'Prayer',               desc: 'We seek God in prayer before and throughout every mission.' },
  { icon: 'fas fa-heart',          label: 'Compassion',           desc: 'We meet people at their point of need with the love of Christ.' },
  { icon: 'fas fa-star',           label: 'Excellence',           desc: 'We give our best to God in everything we do.' },
  { icon: 'fas fa-handshake',      label: 'Integrity',            desc: 'We uphold honesty and transparency in all our dealings.' },
  { icon: 'fas fa-users',          label: 'Unity',                desc: 'We work together as one body, honouring and serving one another.' },
];

const faith = [
  'We believe in one God, eternally existing in three Persons: Father, Son, and Holy Spirit.',
  'We believe in the full inspiration and authority of the Holy Scriptures as the Word of God.',
  'We believe in the deity and humanity of Jesus Christ, His virgin birth, sinless life, atoning death, bodily resurrection, and imminent return.',
  'We believe in salvation by grace through faith in Jesus Christ alone.',
  'We believe in the present ministry of the Holy Spirit, by whose indwelling the Christian is enabled to live a godly life.',
  'We believe in the resurrection of the dead and the eternal life of believers with God.',
  'We believe in the Great Commission — the call to make disciples of all nations.',
];

const About = () => (
  <main className="about-page">

    {/* Banner */}
    <section className="page-banner" style={{ backgroundImage: `url(${bannerPhoto})` }}>
      <div className="banner-overlay"></div>
      <div className="container">
        <div className="banner-content">
          <span className="banner-tag">Who We Are</span>
          <h1>About KEMT</h1>
          <p>A Christ-centred team carrying the light of the Gospel to every community we enter.</p>
        </div>
      </div>
    </section>

    {/* Who We Are */}
    <section id="who-we-are" className="section about-intro-section">
      <div className="container">
        <div className="dept-grid">
          <div className="dept-content">
            <span className="section-subtitle">Who We Are</span>
            <h2 className="section-title">Kingdom Enlightenment Missions Team</h2>
            <p className="lead">
              Kingdom Enlightenment Missions Team (KEMT) is a Christ-centred missions organisation
              dedicated to spreading the Gospel of Jesus Christ across Kenya and beyond.
            </p>
            <p>
              Founded on the Great Commission, we are committed to reaching the unreached,
              discipling believers, and establishing vibrant Christian communities. Our team
              comprises passionate men and women who have answered God's call to serve in various
              capacities — through evangelism, prayer, compassion, and mentorship.
            </p>
            <p>
              We believe in the power of the Gospel to transform lives and communities. Through our
              various departments and mission outreaches, we seek to bring hope, healing, and the
              light of Christ to every corner of the land.
            </p>
            <div className="about-quick-stats">
              <div className="aq-stat"><strong>445+</strong><span>Souls Won</span></div>
              <div className="aq-stat"><strong>5</strong><span>Mission Trips</span></div>
              <div className="aq-stat"><strong>4</strong><span>Counties</span></div>
              <div className="aq-stat"><strong>3</strong><span>Schools</span></div>
            </div>
          </div>
          <div className="dept-media">
            <div className="dept-photo-collage">
              <img src={storyPhoto1} alt="KEMT in the field" className="collage-main" />
              <div className="collage-side">
                <img src={storyPhoto2} alt="" />
                <img src={storyPhoto3} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Vision Mission Values */}
    <section id="vision-mission" className="vision-mission-section">
      <div className="container">
        <div className="vm-cards">
          <div className="vm-card vision-card">
            <div className="vm-icon"><i className="fas fa-eye"></i></div>
            <h3>Our Vision</h3>
            <p>To see every person in Kenya and beyond encounter the transforming love of Jesus Christ and become a committed disciple who impacts their world for God's Kingdom.</p>
          </div>
          <div className="vm-card mission-card">
            <div className="vm-icon"><i className="fas fa-bullseye"></i></div>
            <h3>Our Mission</h3>
            <p>To glorify God by evangelizing the lost, discipling believers, equipping leaders, and establishing communities of faith that reproduce and multiply across nations.</p>
          </div>
          <div className="vm-card values-card">
            <div className="vm-icon"><i className="fas fa-heart"></i></div>
            <h3>Our Mandate</h3>
            <p>The Great Commission — Go into all the world, preach the Gospel, make disciples of all nations, baptizing them and teaching them to observe all that Christ commanded. Matthew 28:19-20.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Our Values */}
    <section className="section values-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">What Drives Us</span>
          <h2 className="section-title">Our Core Values</h2>
        </div>
        <div className="values-grid">
          {values.map((v, i) => (
            <div className="value-card" key={i}>
              <div className="value-icon"><i className={v.icon}></i></div>
              <h4>{v.label}</h4>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Leadership Team */}
    <section id="leadership" className="section leadership-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">The Team</span>
          <h2 className="section-title">Leadership Team</h2>
          <p className="section-description">Servant-leaders committed to advancing the Kingdom of God through humility, faith, and dedication.</p>
        </div>
        <div className="leadership-grid">
          {leadership.map((person, i) => (
            <div className="leader-card" key={i}>
              <div className="leader-avatar" style={{ background: `linear-gradient(135deg, ${person.color}, ${person.color}cc)` }}>
                <span>{person.initials}</span>
              </div>
              <h3 className="leader-name">{person.name}</h3>
              <p className="leader-role">{person.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Statement of Faith */}
    <section id="statement-of-faith" className="section faith-section">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">What We Believe</span>
          <h2 className="section-title">Statement of Faith</h2>
        </div>
        <div className="faith-list">
          {faith.map((point, i) => (
            <div className="faith-item" key={i}>
              <div className="faith-num">{String(i + 1).padStart(2, '0')}</div>
              <p>{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2>Join Us in This Mission</h2>
          <p>Whether through prayer, giving, or going — there is a place for you in what God is doing through KEMT.</p>
          <div className="cta-buttons">
            <Link to="/contact" className="btn btn-primary">Get in Touch</Link>
            <Link to="/donate" className="btn btn-secondary">Support Us</Link>
          </div>
        </div>
      </div>
    </section>

  </main>
);

export default About;
