import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock } from 'lucide-react';
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
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

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

      {/* Upcoming Events from Backend */}
      <section className="section upcoming-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">What's Next</span>
            <h2 className="section-title">Upcoming Events</h2>
          </div>
          
          {loading && <div style={{ textAlign: 'center', padding: '40px' }}>Loading events...</div>}
          {error && <div style={{ textAlign: 'center', color: '#EF4444', padding: '40px' }}>Error loading events: {error}</div>}
          
          {!loading && !error && events.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px', marginBottom: '40px' }}>
              {events.map((event) => (
                <div key={event._id} style={{ 
                  backgroundColor: '#FFFFFF', 
                  borderRadius: '12px', 
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
                  overflow: 'hidden',
                  transition: 'transform 0.2s',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  {event.posterUrl ? (
                    <div style={{ height: '200px', width: '100%', overflow: 'hidden' }}>
                      <img src={`http://localhost:5000/${event.posterUrl}`} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ) : (
                    <div style={{ height: '160px', backgroundColor: '#3C50E0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                      <Calendar size={48} opacity={0.5} />
                    </div>
                  )}
                  <div style={{ padding: '24px' }}>
                    <h3 style={{ margin: '0 0 12px 0', color: '#1C2434', fontSize: '1.25rem' }}>{event.title}</h3>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', marginBottom: '8px', fontSize: '0.9rem' }}>
                      <Clock size={16} color="#3C50E0" />
                      <span>{new Date(event.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</span>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', marginBottom: '16px', fontSize: '0.9rem' }}>
                      <MapPin size={16} color="#3C50E0" />
                      <span>{event.location}</span>
                    </div>
                    
                    <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && !error && events.length === 0 && (
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
          )}
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
