import React, { useState } from 'react';

import bannerPhoto from '../assets/Emali mission4.jpg';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // 'sending' | 'success' | 'error'

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
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

            {/* Info */}
            <div className="contact-info-col">
              <h2 className="section-title">Get in Touch</h2>
              <p className="lead">Have a question, want to get involved, or need to reach our team? We are happy to connect with you.</p>

              <div className="contact-details">
                <div className="contact-detail-item">
                  <div className="contact-detail-icon"><i className="fas fa-phone"></i></div>
                  <div>
                    <h4>Phone</h4>
                    <a href="tel:+254714476295">+254 714 476 295</a>
                  </div>
                </div>
                <div className="contact-detail-item">
                  <div className="contact-detail-icon"><i className="fas fa-envelope"></i></div>
                  <div>
                    <h4>Email</h4>
                    <a href="mailto:info@kingdomenlightenment.org">info@kingdomenlightenment.org</a>
                  </div>
                </div>
              </div>

              <div className="contact-social">
                <h4>Follow Us</h4>
                <div className="contact-social-links">
                  <a href="https://www.youtube.com/@KingdomEnlightenmentMinistries" target="_blank" rel="noopener noreferrer" className="social-btn youtube">
                    <i className="fab fa-youtube"></i> YouTube
                  </a>
                  <a href="https://www.tiktok.com/@kingdom_enlightment" target="_blank" rel="noopener noreferrer" className="social-btn tiktok">
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

            {/* Form */}
            <div className="contact-form-col">
              <div className="contact-form-card">
                <h3>Send Us a Message</h3>
                {status === 'success' ? (
                  <div className="form-success">
                    <i className="fas fa-check-circle"></i>
                    <h4>Message Sent!</h4>
                    <p>Thank you for reaching out. We will get back to you as soon as possible.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label>Your Name</label>
                        <input type="text" name="name" value={form.name} onChange={handle} placeholder="e.g. John Kamau" required />
                      </div>
                      <div className="form-group">
                        <label>Email Address</label>
                        <input type="email" name="email" value={form.email} onChange={handle} placeholder="you@example.com" required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Subject</label>
                      <input type="text" name="subject" value={form.subject} onChange={handle} placeholder="How can we help?" required />
                    </div>
                    <div className="form-group">
                      <label>Message</label>
                      <textarea name="message" value={form.message} onChange={handle} rows={6} placeholder="Write your message here..." required></textarea>
                    </div>
                    {status === 'error' && (
                      <p className="form-error"><i className="fas fa-exclamation-circle"></i> Something went wrong. Please try again or call us directly.</p>
                    )}
                    <button type="submit" className="btn btn-primary btn-full" disabled={status === 'sending'}>
                      {status === 'sending' ? (
                        <><i className="fas fa-spinner fa-spin"></i> Sending...</>
                      ) : (
                        <><i className="fas fa-paper-plane"></i> Send Message</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
};

export default Contact;
