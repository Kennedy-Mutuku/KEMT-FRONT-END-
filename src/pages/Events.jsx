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
  {
    id: 6,
    name: 'DOXA IGNITE WORSHIP ENCOUNTER 2026',
    dates: '10th July 2026',
    location: 'KAG Meru Town',
    type: 'Worship Encounter',
    souls: null,
    description: 'Kingdom Enlightenment Missions Team (KEMT) hosted Doxa Ignite Worship Encounter, a powerful night of worship, prayer, fellowship, and an encounter with the presence of God. Under the theme "Arise and Shine for His Glory," believers gathered to exalt Christ, experience spiritual renewal, and respond to the call to live a life of authentic worship. Doxa Ignite a generation awakened to worship, ignited by His presence, and committed to His glory. Isaiah 60:1 "Arise, shine, for your light has come."',
    highlights: ['Worship & Prayer', 'Spiritual Renewal', 'Fellowship', 'Theme: Arise and Shine'],
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
                  
                  {event.description && (
                    <p className="pe-desc" style={{ fontSize: '0.9rem', color: '#5a5a6a', margin: '12px 0 16px', lineHeight: '1.6' }}>
                      {event.description}
                    </p>
                  )}
                  
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
