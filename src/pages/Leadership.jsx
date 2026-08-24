import React from 'react';
import { Link } from 'react-router-dom';

const leadership = [
  { name: 'Vincent Mwendwa',   role: 'Director',            initials: 'VM', color: '#e67e22' },
  { name: 'Morice Mutharimi',  role: 'Chairperson',         initials: 'MM', color: '#2980b9' },
  { name: 'Mwanzia David',     role: 'Outreach Incharge',   initials: 'MD', color: '#27ae60' },
  { name: 'Kennedy Mutuku',    role: 'Media Director',      initials: 'KM', color: '#8e44ad' },
  { name: 'Evaline Mukami',    role: 'Secretary',           initials: 'EM', color: '#16a085' },
  { name: 'Raymond Ewoi',      role: 'Prayer Coordinator',  initials: 'RE', color: '#c0392b' },
  { name: 'Victor Muriungi',   role: 'Worship Coordinator', initials: 'VM', color: '#d4ac0d' },
];

const Leadership = () => (
  <main className="leadership-page">

    {/* Banner */}
    <section className="page-banner leadership-banner">
      <div className="banner-overlay"></div>
      <div className="container">
        <div className="banner-content">
          <span className="banner-tag">The Team</span>
          <h1>Leadership Team</h1>
          <p>Servant-leaders committed to advancing the Kingdom of God through humility, faith, and dedication.</p>
        </div>
      </div>
    </section>

    {/* Leadership Grid */}
    <section className="section">
      <div className="container">
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

export default Leadership;
