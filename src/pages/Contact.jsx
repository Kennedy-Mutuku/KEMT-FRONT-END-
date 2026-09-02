import React, { useState } from 'react';
import { Mail, Phone, Send, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import bannerPhoto from '../assets/Emali mission4.jpg';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // 'sending' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Unable to deliver message right now.');
      }
    } catch {
      // Graceful offline message
      setStatus('error');
      setErrorMessage('Direct email is available at info@kingdomenlightenment.org.');
    }
  };

  return (
    <main className="contact-page">
      {/* Banner */}
      <section className="page-banner" style={{ backgroundImage: `url(${bannerPhoto})` }}>
        <div className="banner-overlay"></div>
        <div className="container">
          <div className="banner-content">
            <span className="banner-tag">Reach Out</span>
            <h1>Contact Us</h1>
            <p>We would love to hear from you — whether you want to partner, volunteer, or simply connect.</p>
          </div>
        </div>
      </section>

      {/* Contact Body */}
      <section className="section contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Form */}
            <div className="contact-form-col">
              <div className="contact-form-card">
                <h3>Send Us a Message</h3>

                {status === 'success' ? (
                  <div className="form-success" style={{ padding: '2.5rem 1.5rem', textAlign: 'center' }}>
                    <div
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        background: '#f0fdf4',
                        color: '#16a34a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px',
                      }}
                    >
                      <CheckCircle2 size={36} />
                    </div>
                    <h4 style={{ color: '#166534', margin: '0 0 8px', fontSize: '1.3rem' }}>
                      Message Received!
                    </h4>
                    <p style={{ color: '#4b5563', fontSize: '0.95rem', margin: '0 0 20px' }}>
                      Thank you for reaching out. We have sent your inquiry to{' '}
                      <strong>info@kingdomenlightenment.org</strong> and will get back to you shortly.
                    </p>
                    <button
                      onClick={() => setStatus(null)}
                      className="btn btn-primary"
                      style={{ padding: '0.5rem 1.25rem', fontSize: '0.88rem' }}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label>Your Name</label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handle}
                          placeholder="e.g. John Kamau"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handle}
                          placeholder="you@example.com"
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handle}
                        placeholder="How can we help?"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Message</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handle}
                        rows={5}
                        placeholder="Write your message here..."
                        required
                      ></textarea>
                    </div>

                    {/* Graceful Brand-themed Feedback Button / Card */}
                    {status === 'error' && (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '10px 14px',
                          marginBottom: '16px',
                          borderRadius: '8px',
                          backgroundColor: '#fff7ed',
                          border: '1px solid #fed7aa',
                          color: '#c2410c',
                          fontSize: '0.85rem',
                          fontWeight: 500,
                        }}
                      >
                        <AlertCircle size={18} style={{ flexShrink: 0 }} />
                        <span style={{ flex: 1 }}>
                          {errorMessage || 'Connection paused. You can also reach us directly at info@kingdomenlightenment.org.'}
                        </span>
                      </div>
                    )}

                    <button
                      type="submit"
                      className="btn btn-primary btn-full"
                      disabled={status === 'sending'}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                      }}
                    >
                      {status === 'sending' ? (
                        <>
                          <RefreshCw size={16} className="fa-spin" />
                          <span>Sending to info@kingdomenlightenment.org...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="contact-info-col">
              <h2 className="section-title">Get in Touch</h2>
              <p className="lead">
                Have a question, want to get involved, or need to reach our team? We are happy to connect with you.
              </p>

              <div className="contact-details">
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div>
                    <h4>Phone</h4>
                    <a href="tel:+254714476295">+254 714 476 295</a>
                  </div>
                </div>
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4>Email</h4>
                    <a href="mailto:info@kingdomenlightenment.org">info@kingdomenlightenment.org</a>
                  </div>
                </div>
              </div>

              <div className="contact-social">
                <h4>Follow Us</h4>
                <div className="contact-social-links">
                  <a
                    href="https://www.youtube.com/@KingdomEnlightenmentMinistries"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn youtube"
                  >
                    <i className="fab fa-youtube"></i> YouTube
                  </a>
                  <a
                    href="https://www.tiktok.com/@kingdom_enlightment"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-btn tiktok"
                  >
                    <i className="fab fa-tiktok"></i> TikTok
                  </a>
                  <a href="#" className="social-btn facebook">
                    <i className="fab fa-facebook-f"></i> Facebook
                  </a>
                  <a href="#" className="social-btn instagram">
                    <i className="fab fa-instagram"></i> Instagram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
