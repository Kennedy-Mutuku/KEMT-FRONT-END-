import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

const Events = () => {
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

  return (
    <div className="container section" style={{ minHeight: '80vh', padding: '60px 20px' }}>
      <div className="section-header" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 className="section-title" style={{ fontSize: '2.5rem', color: '#1C2434', marginBottom: '10px' }}>Upcoming Events</h2>
        <p style={{ color: '#64748B', maxWidth: '600px', margin: '0 auto' }}>Join us for our upcoming gatherings and special events. We'd love to see you there!</p>
      </div>

      {loading && <div style={{ textAlign: 'center', padding: '40px' }}>Loading events...</div>}
      {error && <div style={{ textAlign: 'center', color: '#EF4444', padding: '40px' }}>Error loading events: {error}</div>}

      {!loading && !error && events.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>
          No upcoming events at the moment. Please check back later.
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
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
    </div>
  );
};

export default Events;
