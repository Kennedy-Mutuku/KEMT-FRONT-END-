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
        const res = await fetch('/api/events');
        if (res.ok) {
          const data = await res.json();
          setEvents(data);
          localStorage.setItem('kemt_events_cache', JSON.stringify(data));
        } else {
          throw new Error('Could not load events');
        }
      } catch {
        const cached = localStorage.getItem('kemt_events_cache');
        if (cached) {
          try {
            setEvents(JSON.parse(cached));
          } catch {}
        } else {
          // Default upcoming event if fresh
          setEvents([
            {
              _id: 'sample-event-1',
              title: 'Kingdom Outreach Revival & Leadership Conference',
              date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
              location: 'Methodist Church Grounds, Meru Central',
              description: 'A powerful gathering of believers, youths, and community leaders for spiritual renewal, prayer vigils, and missionary training.',
              posterUrl: ''
            }
          ]);
        }
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
      <section className="dept-section upcoming-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">What's Next</span>
            <h2 className="section-title">Upcoming Events</h2>
          </div>
          
          {loading && <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}><i className="fas fa-spinner fa-spin"></i> Loading upcoming events...</div>}
          
          {!loading && events.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px', marginBottom: '40px' }}>
              {events.map((event) => (
                <div key={event._id} style={{ 
                  backgroundColor: '#FFFFFF', 
                  borderRadius: '12px', 
                  boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                  border: '1px solid #f1f5f9',
                  overflow: 'hidden',
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)';
                }}
                >
                  {event.posterUrl ? (
                    <div style={{ height: '200px', width: '100%', overflow: 'hidden', background: '#f8fafc' }}>
                      <img 
                        src={event.posterUrl.startsWith('http') ? event.posterUrl : `/${event.posterUrl}`} 
                        alt={event.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    </div>
                  ) : (
                    <div style={{ height: '160px', backgroundColor: 'rgba(232, 125, 30, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E87D1E' }}>
                      <Calendar size={48} opacity={0.7} />
                    </div>
                  )}
                  <div style={{ padding: '24px' }}>
                    <div style={{ display: 'inline-block', padding: '3px 10px', background: 'rgba(232, 125, 30, 0.12)', color: '#E87D1E', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '10px' }}>
                      Upcoming Outreach
                    </div>
                    <h3 style={{ margin: '0 0 12px 0', color: '#1e293b', fontSize: '1.25rem', fontWeight: 700, lineHeight: 1.35 }}>{event.title}</h3>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', marginBottom: '8px', fontSize: '0.88rem' }}>
                      <Clock size={16} color="#E87D1E" />
                      <span>{new Date(event.date).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</span>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748b', marginBottom: '16px', fontSize: '0.88rem' }}>
                      <MapPin size={16} color="#E87D1E" />
                      <span>{event.location}</span>
                    </div>
                    
                    <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: '1.55', margin: 0 }}>
                      {event.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && events.length === 0 && (
            <div className="no-events-card">
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
      <section className="dept-section past-events-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">2025 – 2026</span>
            <h2 className="section-title">Completed Missions</h2>
            <p className="section-description">A record of the outreach missions KEMT has carried out, each one a testimony of God's faithfulness.</p>
          </div>
          <div className="past-events-list">
            {pastEvents.map((event, i) => (
              <div key={event.id} className="past-event-item">
                {/* Left Column: Date & Impact */}
                <div className="pe-left">
                  <div className="pe-dates">{event.dates}</div>
                  {event.souls ? (
                    <div className="pe-souls">
                      {event.souls}
                      <span>Souls Won</span>
                    </div>
                  ) : (
                    <div className="pe-ongoing">Ongoing Impact</div>
                  )}
                </div>
                
                {/* Right Column: Details */}
                <div className="pe-right">
                  <h3 className="pe-title">{event.name}</h3>
                  <div className="pe-location">
                    {event.location}, {event.type}
                  </div>
                  
                  <div className="pe-highlights">
                    {event.highlights.map((h, j) => (
                      <span key={j} className="pe-highlight-pill">
                        {h}
                      </span>
                    ))}
                  </div>
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
