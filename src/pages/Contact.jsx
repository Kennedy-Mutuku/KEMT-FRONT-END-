import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Heart, 
  BookOpen, 
  Tv, 
  Music, 
  Compass, 
  GraduationCap 
} from 'lucide-react';
import bannerPhoto from '../assets/Emali mission4.jpg';

const deptConfig = {
  prayer: {
    tag: 'Prayer Intercession',
    title: 'Submit a Prayer Request',
    subtitle: 'Our dedicated prayer team intercedes every Thursday. Share your prayer burdens with us in confidence.',
    category: 'Prayer Request',
    subjectPlaceholder: 'e.g. Healing, Family Breakthrough, Guidance',
    messagePlaceholder: 'Detail your prayer points or thanksgiving testimony...',
    icon: Heart
  },
  discipleship: {
    tag: 'Spiritual Growth',
    title: 'Join a Bible Study Group',
    subtitle: 'Grow deeper in the Word of God through our discipleship and Bible study fellowships.',
    category: 'Bible Study',
    subjectPlaceholder: 'e.g. Request to join weekly Bible study group',
    messagePlaceholder: 'Tell us a bit about yourself and any specific Bible study topics you are eager to explore...',
    icon: BookOpen
  },
  digital: {
    tag: 'Media & Technology',
    title: 'Volunteer with Media & Digital Team',
    subtitle: 'Join the tech and media ministry amplifying the Gospel through digital platforms and creative production.',
    category: 'Media & Tech',
    subjectPlaceholder: 'e.g. Volunteer for Video Editing / Social Media / Sound',
    messagePlaceholder: 'Share your background, tools you use, or your passion for digital ministry...',
    icon: Tv
  },
  worship: {
    tag: 'Praise & Worship',
    title: 'Join the Praise & Worship Team',
    subtitle: 'Serve the Lord through anointed music, vocal ministry, and instruments.',
    category: 'Praise & Worship',
    subjectPlaceholder: 'e.g. Vocalist / Keyboardist / Instrumentalist Application',
    messagePlaceholder: 'Share your musical experience, vocal part or instrument, and spiritual journey...',
    icon: Music
  },
  outreach: {
    tag: 'Evangelism & Missions',
    title: 'Join Mission Outreach Team',
    subtitle: 'Step into the harvest field with us in upcoming crusades, door-to-door evangelism, and revival missions.',
    category: 'Outreach',
    subjectPlaceholder: 'e.g. Volunteer for upcoming rural mission outreach',
    messagePlaceholder: 'Tell us about your mission experience or willingness to participate...',
    icon: Compass
  },
  highschool: {
    tag: 'School Ministry',
    title: 'Invite KEMT to Your School',
    subtitle: 'Partner with KEMT for Weekend Challenges, academic motivation, and spiritual empowerment in secondary schools.',
    category: 'High School',
    subjectPlaceholder: 'e.g. Invitation for Weekend Challenge / Student Mentorship',
    messagePlaceholder: 'Please specify the school name, proposed dates, and topics you would like covered...',
    icon: GraduationCap
  }
};

const Contact = () => {
  const [searchParams] = useSearchParams();
  const deptParam = searchParams.get('dept') || searchParams.get('type');
  const currentDept = deptConfig[deptParam] || null;

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    residence: '',
    skills: '',
    institution: '',
    message: '',
    isUrgent: false,
    category: currentDept ? currentDept.category : 'General Inquiry'
  });

  const [status, setStatus] = useState(null); // 'sending' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  // Sync form category when query param changes — DO NOT pre-fill subject
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      category: currentDept ? currentDept.category : 'General Inquiry',
      subject: '',
      residence: '',
      skills: '',
      institution: '',
    }));
  }, [deptParam]);

  const handle = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          category: currentDept ? currentDept.category : 'General Inquiry'
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setForm({
          name: '',
          email: '',
          phone: '',
          subject: '',
          residence: '',
          skills: '',
          institution: '',
          message: '',
          isUrgent: false,
          category: currentDept ? currentDept.category : 'General Inquiry'
        });
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Unable to deliver message right now.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Connection paused. Direct email is available at info@kingdomenlightenment.org.');
    }
  };

  return (
    <main className="contact-page">
      {/* Banner */}
      <section className="page-banner" style={{ backgroundImage: `url(${bannerPhoto})` }}>
        <div className="banner-overlay"></div>
        <div className="container">
          <div className="banner-content">
            <span className="banner-tag">{currentDept ? currentDept.tag : 'Reach Out'}</span>
            <h1>{currentDept ? currentDept.title : 'Contact Us'}</h1>
            <p>{currentDept ? currentDept.subtitle : 'We would love to hear from you — whether you want to partner, volunteer, or connect.'}</p>
          </div>
        </div>
      </section>

      {/* Contact Body */}
      <section className="section contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Info Column */}
            <div className="contact-info-col">
              <h2 className="section-title">
                {currentDept ? currentDept.title : 'Get in Touch'}
              </h2>
              <p className="lead">
                {currentDept 
                  ? `Your submission will be immediately routed to the ${currentDept.category} coordinator and the KEMT ministry administration.`
                  : 'Have a question, want to get involved, or need to reach our team? We are happy to connect with you.'}
              </p>

              <div className="contact-details">
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div>
                    <h4>Phone &amp; WhatsApp</h4>
                    <a href="tel:+254714476295">+254 714 476 295</a>
                  </div>
                </div>
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4>Ministry Email</h4>
                    <a href="mailto:info@kingdomenlightenment.org">info@kingdomenlightenment.org</a>
                  </div>
                </div>
              </div>

              {/* Department Shortcut Chips if on General Contact */}
              {!currentDept && (
                <div style={{ marginTop: '28px', padding: '18px', background: '#fff9f0', borderRadius: '12px', border: '1px solid #fed7aa' }}>
                  <h4 style={{ margin: '0 0 10px', color: '#1e293b', fontSize: '0.95rem', fontWeight: 700 }}>Looking for a specific department?</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    <Link to="/contact?dept=prayer" style={{ fontSize: '0.8rem', padding: '4px 10px', background: 'white', borderRadius: '16px', border: '1px solid #fed7aa', color: '#E87D1E', fontWeight: 600 }}>🙏 Prayer Request</Link>
                    <Link to="/contact?dept=discipleship" style={{ fontSize: '0.8rem', padding: '4px 10px', background: 'white', borderRadius: '16px', border: '1px solid #fed7aa', color: '#E87D1E', fontWeight: 600 }}>📖 Bible Study</Link>
                    <Link to="/contact?dept=digital" style={{ fontSize: '0.8rem', padding: '4px 10px', background: 'white', borderRadius: '16px', border: '1px solid #fed7aa', color: '#E87D1E', fontWeight: 600 }}>💻 Tech &amp; Media</Link>
                    <Link to="/contact?dept=worship" style={{ fontSize: '0.8rem', padding: '4px 10px', background: 'white', borderRadius: '16px', border: '1px solid #fed7aa', color: '#E87D1E', fontWeight: 600 }}>🎵 Worship Team</Link>
                    <Link to="/contact?dept=outreach" style={{ fontSize: '0.8rem', padding: '4px 10px', background: 'white', borderRadius: '16px', border: '1px solid #fed7aa', color: '#E87D1E', fontWeight: 600 }}>🔥 Mission Outreach</Link>
                  </div>
                </div>
              )}

              <div className="contact-social" style={{ marginTop: '24px' }}>
                <h4>Follow Our Ministries</h4>
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
                  <a href="https://www.facebook.com/share/1EXQmKx4QE/" target="_blank" rel="noopener noreferrer" className="social-btn facebook">
                    <i className="fab fa-facebook-f"></i> Facebook
                  </a>
                  <a href="#" className="social-btn instagram">
                    <i className="fab fa-instagram"></i> Instagram
                  </a>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="contact-form-col">
              <div className="contact-form-card" style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                  <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1.3rem', fontWeight: 700 }}>
                    {currentDept ? currentDept.title : 'Send Us a Message'}
                  </h3>
                  {currentDept && (
                    <span style={{
                      padding: '3px 10px',
                      borderRadius: '16px',
                      backgroundColor: 'rgba(232, 125, 30, 0.12)',
                      color: '#E87D1E',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      textTransform: 'uppercase'
                    }}>
                      {currentDept.category}
                    </span>
                  )}
                </div>

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
                    <h4 style={{ color: '#166534', margin: '0 0 8px', fontSize: '1.3rem', fontWeight: 700 }}>
                      {deptParam === 'prayer' ? 'Prayer Request Received!' : 'Submission Received!'}
                    </h4>
                    <p style={{ color: '#4b5563', fontSize: '0.95rem', margin: '0 0 20px' }}>
                      Thank you for reaching out. We have sent your details to{' '}
                      <strong>info@kingdomenlightenment.org</strong> and recorded them in the ministry dashboard.
                    </p>
                    <button
                      onClick={() => setStatus(null)}
                      className="btn btn-primary"
                      style={{ padding: '0.55rem 1.4rem', fontSize: '0.88rem' }}
                    >
                      Submit Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="contact-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label>Your Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handle}
                          placeholder="e.g. Everylne Mukami"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Email Address *</label>
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

                    <div className="form-row">
                      <div className="form-group">
                        <label>Phone Number (Optional / WhatsApp)</label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handle}
                          placeholder="e.g. +254 700 000 000"
                        />
                      </div>

                      {/* Customized Field based on Department */}
                      {deptParam === 'discipleship' && (
                        <div className="form-group">
                          <label>Residence / Area *</label>
                          <input
                            type="text"
                            name="residence"
                            value={form.residence}
                            onChange={handle}
                            placeholder="e.g. Meru Central / Nairobi / Machakos"
                            required
                          />
                        </div>
                      )}

                      {deptParam === 'digital' && (
                        <div className="form-group">
                          <label>Primary Skill / Interest *</label>
                          <select
                            name="skills"
                            value={form.skills}
                            onChange={handle}
                            required
                            style={{
                              width: '100%',
                              padding: '12px 14px',
                              borderRadius: '8px',
                              border: '1.5px solid #cbd5e1',
                              backgroundColor: 'white'
                            }}
                          >
                            <option value="">Select skill area...</option>
                            <option value="Video Editing & Livestream">Video Editing &amp; Livestream</option>
                            <option value="Photography & Graphics">Photography &amp; Graphics</option>
                            <option value="Audio & Sound Engineering">Audio &amp; Sound Engineering</option>
                            <option value="Social Media & Content">Social Media &amp; Content</option>
                            <option value="IT, Web & Infrastructure">IT, Web &amp; Infrastructure</option>
                          </select>
                        </div>
                      )}

                      {deptParam === 'worship' && (
                        <div className="form-group">
                          <label>Vocal Part / Instrument *</label>
                          <input
                            type="text"
                            name="skills"
                            value={form.skills}
                            onChange={handle}
                            placeholder="e.g. Soprano, Alto, Keyboard, Guitar, Drums"
                            required
                          />
                        </div>
                      )}

                      {deptParam === 'highschool' && (
                        <div className="form-group">
                          <label>School / Institution Name *</label>
                          <input
                            type="text"
                            name="institution"
                            value={form.institution}
                            onChange={handle}
                            placeholder="e.g. St. Kitheo Senior School"
                            required
                          />
                        </div>
                      )}

                      {deptParam === 'outreach' && (
                        <div className="form-group">
                          <label>Home County / Residence *</label>
                          <input
                            type="text"
                            name="residence"
                            value={form.residence}
                            onChange={handle}
                            placeholder="e.g. Meru, Nairobi, Makueni"
                            required
                          />
                        </div>
                      )}

                      {!deptParam && (
                        <div className="form-group">
                          <label>Inquiry Category</label>
                          <select
                            name="category"
                            value={form.category}
                            onChange={handle}
                            style={{
                              width: '100%',
                              padding: '12px 14px',
                              borderRadius: '8px',
                              border: '1.5px solid #cbd5e1',
                              backgroundColor: 'white'
                            }}
                          >
                            <option value="General Inquiry">General Inquiry</option>
                            <option value="Prayer Request">Prayer Request</option>
                            <option value="Bible Study">Bible Study Discipleship</option>
                            <option value="Media & Tech">Media &amp; Tech Volunteer</option>
                            <option value="Praise & Worship">Praise &amp; Worship</option>
                            <option value="Outreach">Mission Outreach</option>
                            <option value="High School">High School Ministry</option>
                          </select>
                        </div>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Subject / Purpose *</label>
                      <input
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handle}
                        placeholder={
                          deptParam === 'prayer'       ? 'e.g. Healing, Family Breakthrough, Guidance' :
                          deptParam === 'discipleship' ? 'e.g. Request to join weekly Bible study group' :
                          deptParam === 'digital'      ? 'e.g. Volunteer for Video Editing / Social Media / Sound' :
                          deptParam === 'worship'      ? 'e.g. Vocalist / Keyboardist / Instrumentalist Application' :
                          deptParam === 'outreach'     ? 'e.g. Volunteer for upcoming rural mission outreach' :
                          deptParam === 'highschool'   ? 'e.g. Invitation for Weekend Challenge / Student Mentorship' :
                          'How can we help?'
                        }
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>{deptParam === 'prayer' ? 'Prayer Points / Needs *' : 'Detailed Message *'}</label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handle}
                        rows={5}
                        placeholder={currentDept ? currentDept.messagePlaceholder : 'Write your message here...'}
                        required
                      ></textarea>
                    </div>

                    {deptParam === 'prayer' && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                        <input
                          type="checkbox"
                          id="isUrgent"
                          name="isUrgent"
                          checked={form.isUrgent}
                          onChange={handle}
                          style={{ width: '18px', height: '18px', accentColor: '#E87D1E' }}
                        />
                        <label htmlFor="isUrgent" style={{ color: '#c2410c', fontWeight: 600, fontSize: '0.88rem', margin: 0 }}>
                          Flag as Urgent Prayer Request
                        </label>
                      </div>
                    )}

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
                        <span style={{ flex: 1 }}>{errorMessage}</span>
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
                        padding: '13px',
                        fontWeight: 700
                      }}
                    >
                      {status === 'sending' ? (
                        <>
                          <RefreshCw size={16} className="fa-spin" />
                          <span>Delivering...</span>
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          <span>{deptParam === 'prayer' ? 'Submit Prayer Request' : 'Send Submission'}</span>
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
                  <a href="https://www.facebook.com/share/1EXQmKx4QE/" target="_blank" rel="noopener noreferrer" className="social-btn facebook">
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
