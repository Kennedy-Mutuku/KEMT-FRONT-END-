import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import bannerPhoto from '../assets/Tala mission4.jpg';

const pastEvents = [
  {
    id: 1,
    name: 'Rwanyange Mission',
    dates: '19th – 24th August 2025',
    location: 'East Africa Pentecostal Church, Rwanyange, Meru',
    type: 'Mission Outreach',
    souls: 145,
    highlights: ['Street Evangelism', 'Crusades & Revivals', 'Youth Workshops', 'Compassion Ministry'],
  },
  {
    id: 2,
    name: 'Gikumene Mission',
    dates: '29th December 2025 – 4th January 2026',
    location: 'Deliverance Church, Gikumene, Meru',
    type: 'Mission Outreach',
    souls: 130,
    highlights: ['One-on-One Evangelism', 'Crusades & Revivals', 'Youth Mentorship', 'Compassion Ministry'],
  },
  {
    id: 3,
    name: 'Tala Mission',
    dates: '20th – 26th April 2026',
    location: 'Liberty Church, Tala, Machakos',
    type: 'Mission Outreach',
    souls: 170,
    highlights: ['Prayer Walks', 'Street Evangelism', 'Crusades & Revivals', 'Youth Workshops'],
  },
  {
    id: 4,
    name: 'Emali Mission',
    dates: '10th – 16th August 2026',
    location: 'Methodist Church of Kenya, Emali, Makueni & Kajiado',
    type: 'Mission Outreach',
    souls: 76,
    highlights: ['Prayer Walks', 'Compassion Ministry', 'Crusades & Revivals', 'Mentorship'],
  },
  {
    id: 5,
    name: 'Ntakira Mission',
    dates: '20th – 23rd August 2026',
    location: 'Methodist Church of Kenya, Ntakira Parish, Meru',
    type: 'Mission Outreach',
    souls: null,
    highlights: ['Street Evangelism', 'Crusades & Revivals', 'Youth Mentorship', 'Prayer'],
  },
];

const Events = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <main className="events-page">

      {/* Banner */}
      <section className="page-banner" style={{ backgroundImage: `url(${bannerPhoto})` }}>
        <div className="banner-overlay"></div>
        <div className="container">
          <div className="banner-content">
            <span className="banner-tag">What's Happening</span>
            <h1>Events</h1>
            <p>Stay connected with what God is doing through Kingdom Enlightenment Missions Team.</p>
          </div>
        </div>
      </section>

      {/* Upcoming */}
      <section className="section upcoming-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">What's Next</span>
            <h2 className="section-title">Upcoming Events</h2>
          </div>
          <div className="no-events-card">
            <div className="no-events-icon"><i className="fas fa-calendar-plus"></i></div>
            <h3>New Events Coming Soon</h3>
            <p>We are always planning the next outreach, revival, or ministry engagement. Subscribe below to be the first to know when new events are announced.</p>
            {subscribed ? (
              <div className="subscribe-success">
                <i className="fas fa-check-circle"></i> Thank you! You will be notified of upcoming events.
              </div>
            ) : (
              <form className="subscribe-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-primary">Notify Me</button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="section past-events-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">2025 – 2026</span>
            <h2 className="section-title">Completed Missions</h2>
            <p className="section-description">A record of the outreach missions KEMT has carried out — each one a testimony of God's faithfulness.</p>
          </div>
          <div className="past-events-timeline">
            {pastEvents.map((event, i) => (
              <div className="past-event-card" key={event.id}>
                <div className="past-event-marker">
                  <div className="marker-dot"></div>
                  {i < pastEvents.length - 1 && <div className="marker-line"></div>}
                </div>
                <div className="past-event-body">
                  <div className="past-event-top">
                    <span className="past-event-type">{event.type}</span>
                    <span className="past-event-dates"><i className="fas fa-calendar-alt"></i> {event.dates}</span>
                  </div>
                  <h3 className="past-event-name">{event.name}</h3>
                  <p className="past-event-location"><i className="fas fa-map-marker-alt"></i> {event.location}</p>
                  <div className="past-event-highlights">
                    {event.highlights.map((h, j) => (
                      <span className="activity-tag" key={j}>{h}</span>
                    ))}
                  </div>
                  {event.souls ? (
                    <div className="souls-badge" style={{ marginTop: '1rem' }}>
                      <i className="fas fa-heart"></i>
                      <strong>{event.souls}</strong>
                      <span>souls received Christ</span>
                    </div>
                  ) : (
                    <div className="souls-badge souls-badge--pending" style={{ marginTop: '1rem' }}>
                      <i className="fas fa-clock"></i>
                      <span>Statistics to be updated</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/programs" className="btn btn-primary">View Full Outreach Reports</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Want to Participate in the Next Mission?</h2>
            <p>Join us in taking the Gospel to communities across Kenya. Reach out and we will connect you.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">Get Involved</Link>
              <Link to="/donate" className="btn btn-secondary">Support a Mission</Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default Events;
