import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import bannerPhoto from '../assets/Emali mission4.jpg';

const API_URL = import.meta.env.VITE_API_URL;

const enquiryTypes = [
  { value: 'general', label: 'General Enquiry' },
  { value: 'missions', label: 'Missions' },
  { value: 'prayer', label: 'Prayer Request' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'volunteering', label: 'Volunteering' },
  { value: 'donations', label: 'Donations' },
  { value: 'ministry_invitation', label: 'Ministry Invitation' },
  { value: 'testimony', label: 'Testimony' },
  { value: 'technical', label: 'Technical/Website Enquiry' },
  { value: 'other', label: 'Other' },
];

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  subject: '',
  enquiryType: 'general',
  message: '',
  consent: false,
};

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // 'sending' | 'success' | 'error'

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (form.fullName.length > 150) {
      newErrors.fullName = 'Full name must be 150 characters or less';
    }

    if (!form.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (form.email.length > 150) {
      newErrors.email = 'Email must be 150 characters or less';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (form.phone && form.phone.length > 30) {
      newErrors.phone = 'Phone number must be 30 characters or less';
    }

    if (!form.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (form.subject.length > 200) {
      newErrors.subject = 'Subject must be 200 characters or less';
    }

    if (!form.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (form.message.length > 5000) {
      newErrors.message = 'Message must be 5000 characters or less';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('sending');
    setErrors({});

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          subject: form.subject,
          enquiryType: form.enquiryType,
          message: form.message,
          consent: form.consent,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus('success');
        setForm(initialForm);
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
            <p>We would love to hear from you. Connect with Kingdom Enlightenment Missions.</p>
            <nav className="breadcrumb" aria-label="Breadcrumb" style={{ marginTop: '0.75rem' }}>
              <Link to="/">Home</Link>
              <span> &gt; </span>
              <span style={{ color: 'var(--secondary-color)' }}>Contact</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="section" style={{ paddingBottom: '0' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Connect With Us</span>
            <h2 className="section-title">Get in Touch</h2>
            <p className="section-description" style={{ maxWidth: '700px', margin: '0 auto' }}>
              Whether you would like to learn more about our missions, partner with us, request prayer, volunteer, or make an enquiry, we would be glad to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Body */}
      <section className="section contact-section">
        <div className="container">
          <div className="contact-grid">

            {/* Info */}
            <div className="contact-info-col">
              <h2 className="section-title" style={{ fontSize: '1.5rem', textAlign: 'left' }}>Contact Information</h2>
              <p className="lead" style={{ fontSize: '1rem', marginBottom: '2rem' }}>Have a question, want to get involved, or need to reach our team? We are happy to connect with you.</p>

              <div className="contact-details">
                <div className="contact-detail-item">
                  <div className="contact-detail-icon"><i className="fas fa-envelope" aria-hidden="true"></i></div>
                  <div>
                    <h4>Email</h4>
                    <a href="mailto:info@kingdomenlightenment.org">info@kingdomenlightenment.org</a>
                  </div>
                </div>
                <div className="contact-detail-item">
                  <div className="contact-detail-icon"><i className="fas fa-phone" aria-hidden="true"></i></div>
                  <div>
                    <h4>Phone</h4>
                    <a href="tel:+254714476295">+254 714 476 295</a>
                  </div>
                </div>
                <div className="contact-detail-item">
                  <div className="contact-detail-icon"><i className="fas fa-map-marker-alt" aria-hidden="true"></i></div>
                  <div>
                    <h4>Address</h4>
                    <span>P.O. Box 00000-00100<br />Nairobi, Kenya</span>
                  </div>
                </div>
                <div className="contact-detail-item">
                  <div className="contact-detail-icon"><i className="fas fa-clock" aria-hidden="true"></i></div>
                  <div>
                    <h4>Office Hours</h4>
                    <span>Monday – Friday: 8:00 AM – 5:00 PM</span>
                  </div>
                </div>
              </div>

              <div className="contact-social">
                <h4>Follow Us</h4>
                <div className="contact-social-links">
                  <a href="https://www.youtube.com/@KingdomEnlightenmentMinistries" target="_blank" rel="noopener noreferrer" className="social-btn youtube" aria-label="YouTube">
                    <i className="fab fa-youtube" aria-hidden="true"></i> YouTube
                  </a>
                  <a href="https://www.tiktok.com/@kingdom_enlightment" target="_blank" rel="noopener noreferrer" className="social-btn tiktok" aria-label="TikTok">
                    <i className="fab fa-tiktok" aria-hidden="true"></i> TikTok
                  </a>
                  <a href="#" className="social-btn facebook" aria-label="Facebook">
                    <i className="fab fa-facebook-f" aria-hidden="true"></i> Facebook
                  </a>
                  <a href="#" className="social-btn instagram" aria-label="Instagram">
                    <i className="fab fa-instagram" aria-hidden="true"></i> Instagram
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="contact-form-col">
              <div className="contact-form-card">
                <h3>Send Us a Message</h3>
                {status === 'success' ? (
                  <div className="form-success" role="alert">
                    <i className="fas fa-check-circle" aria-hidden="true"></i>
                    <h4>Message Sent!</h4>
                    <p>Thank you for contacting Kingdom Enlightenment Missions. Your message has been received and our team will get back to you.</p>
                    <button className="btn btn-primary" onClick={() => setStatus(null)} style={{ marginTop: '1rem' }}>Send Another Message</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form" noValidate>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="fullName">Full Name <span style={{ color: 'var(--accent-color)' }}>*</span></label>
                        <input type="text" id="fullName" name="fullName" value={form.fullName} onChange={handleChange} placeholder="e.g. John Kamau" maxLength={150} aria-required="true" aria-invalid={!!errors.fullName} aria-describedby={errors.fullName ? 'fullName-error' : undefined} />
                        {errors.fullName && <span id="fullName-error" className="field-error" role="alert">{errors.fullName}</span>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email Address <span style={{ color: 'var(--accent-color)' }}>*</span></label>
                        <input type="email" id="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" maxLength={150} aria-required="true" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} />
                        {errors.email && <span id="email-error" className="field-error" role="alert">{errors.email}</span>}
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone" value={form.phone} onChange={handleChange} placeholder="+254 700 000 000" maxLength={30} />
                        {errors.phone && <span className="field-error" role="alert">{errors.phone}</span>}
                      </div>
                      <div className="form-group">
                        <label htmlFor="enquiryType">Reason for Contact</label>
                        <select id="enquiryType" name="enquiryType" value={form.enquiryType} onChange={handleChange}>
                          {enquiryTypes.map((type) => (<option key={type.value} value={type.value}>{type.label}</option>))}
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="subject">Subject <span style={{ color: 'var(--accent-color)' }}>*</span></label>
                      <input type="text" id="subject" name="subject" value={form.subject} onChange={handleChange} placeholder="How can we help?" maxLength={200} aria-required="true" aria-invalid={!!errors.subject} aria-describedby={errors.subject ? 'subject-error' : undefined} />
                      {errors.subject && <span id="subject-error" className="field-error" role="alert">{errors.subject}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Message <span style={{ color: 'var(--accent-color)' }}>*</span></label>
                      <textarea id="message" name="message" value={form.message} onChange={handleChange} rows={6} placeholder="Write your message here..." maxLength={5000} aria-required="true" aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined}></textarea>
                      {errors.message && <span id="message-error" className="field-error" role="alert">{errors.message}</span>}
                    </div>
                    <div className="form-group">
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} style={{ width: 'auto' }} />
                        <span>I consent to Kingdom Enlightenment Missions contacting me regarding this enquiry.</span>
                      </label>
                    </div>
                    {status === 'error' && (
                      <p className="form-error" role="alert"><i className="fas fa-exclamation-circle" aria-hidden="true"></i> We couldn't send your message at this time. Please try again.</p>
                    )}
                    <button type="submit" className="btn btn-primary btn-full" disabled={status === 'sending'}>
                      {status === 'sending' ? (<><i className="fas fa-spinner fa-spin" aria-hidden="true"></i> Sending...</>) : (<><i className="fas fa-paper-plane" aria-hidden="true"></i> Send Message</>)}
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
