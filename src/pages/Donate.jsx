import React, { useState } from 'react';

import bannerPhoto from '../assets/Ruanyage4.jpg';

const PRESETS = [100, 500, 1000, 2500, 5000];

const Donate = () => {
  const [amount, setAmount] = useState('');
  const [custom, setCustom] = useState(false);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error'
  const [message, setMessage] = useState('');

  const selectPreset = (val) => {
    setAmount(String(val));
    setCustom(false);
  };

  const handleCustom = (e) => {
    setAmount(e.target.value);
    setCustom(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !phone) return;
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('http://localhost:5000/api/donate/mpesa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, phone }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setMessage('A payment prompt has been sent to your phone. Enter your M-Pesa PIN to complete your gift to KEMT Ministries.');
      } else {
        setStatus('error');
        setMessage(data.message || 'Payment could not be initiated. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('Unable to reach the payment server. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { setStatus(null); setAmount(''); setPhone(''); setCustom(false); };

  return (
    <main className="donate-page">

      {/* Banner */}
      <section className="page-banner" style={{ backgroundImage: `url(${bannerPhoto})` }}>
        <div className="banner-overlay"></div>
        <div className="container">
          <div className="banner-content">
            <span className="banner-tag">Give</span>
            <h1>Support KEMT Ministries</h1>
            <p>"Each of you should give what you have decided in your heart to give." — 2 Corinthians 9:7</p>
          </div>
        </div>
      </section>

      {/* Why Give */}
      <section className="section donate-why-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Your Gift Matters</span>
            <h2 className="section-title">Why Your Support Changes Lives</h2>
          </div>
          <div className="donate-why-grid">
            <div className="donate-why-card">
              <i className="fas fa-globe-africa"></i>
              <h4>Fund Missions</h4>
              <p>Your giving sends our teams to unreached communities with the Gospel of Christ.</p>
            </div>
            <div className="donate-why-card">
              <i className="fas fa-hand-holding-heart"></i>
              <h4>Compassion Outreach</h4>
              <p>You help us provide food, clothing, and care to the vulnerable in every community we enter.</p>
            </div>
            <div className="donate-why-card">
              <i className="fas fa-graduation-cap"></i>
              <h4>Youth Ministry</h4>
              <p>Your support equips the next generation through school ministry, mentorship, and workshops.</p>
            </div>
            <div className="donate-why-card">
              <i className="fas fa-hands-praying"></i>
              <h4>Prayer & Discipleship</h4>
              <p>You sustain the prayer foundation and discipleship programmes that build lasting faith.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Form */}
      <section className="section donate-form-section">
        <div className="container">
          <div className="donate-form-wrap">

            <div className="donate-form-card">
              <div className="donate-form-header">
                <i className="fas fa-mobile-screen-button"></i>
                <h3>Give via M-Pesa</h3>
                <p>Enter your amount and phone number. You will receive an M-Pesa prompt on your phone to complete the payment to <strong>KEMT Ministries</strong>.</p>
              </div>

              {status === 'success' ? (
                <div className="donate-success">
                  <div className="donate-success-icon"><i className="fas fa-check-circle"></i></div>
                  <h3>Thank You for Your Gift!</h3>
                  <p>{message}</p>
                  <p className="donate-success-account">Account: <strong>KEMT Ministries</strong></p>
                  <button className="btn btn-primary" onClick={reset}>Give Again</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="donate-form">

                  {/* Amount Presets */}
                  <div className="form-group">
                    <label>Select Amount (KES)</label>
                    <div className="amount-presets">
                      {PRESETS.map(val => (
                        <button
                          type="button"
                          key={val}
                          className={`amount-btn ${amount === String(val) && !custom ? 'amount-btn--active' : ''}`}
                          onClick={() => selectPreset(val)}
                        >
                          {val.toLocaleString()}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      className={`amount-custom-input ${custom ? 'active' : ''}`}
                      placeholder="Or enter a custom amount"
                      min="10"
                      value={custom ? amount : ''}
                      onChange={handleCustom}
                      onClick={() => setCustom(true)}
                    />
                  </div>

                  {/* Phone */}
                  <div className="form-group">
                    <label>M-Pesa Phone Number</label>
                    <div className="phone-input-wrap">
                      <span className="phone-prefix">+254</span>
                      <input
                        type="tel"
                        placeholder="7XX XXX XXX"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        pattern="^(0|254|\+254)?[71]\d{8}$"
                        title="Enter a valid Safaricom number e.g. 0712345678"
                        required
                      />
                    </div>
                    <small>Enter the number registered with M-Pesa e.g. 0712 345 678</small>
                  </div>

                  {status === 'error' && (
                    <div className="form-error">
                      <i className="fas fa-exclamation-circle"></i> {message}
                    </div>
                  )}

                  <button type="submit" className="btn btn-primary btn-full donate-btn" disabled={loading || !amount || !phone}>
                    {loading ? (
                      <><i className="fas fa-spinner fa-spin"></i> Sending Prompt...</>
                    ) : (
                      <><i className="fas fa-heart"></i> Give KES {amount ? Number(amount).toLocaleString() : '—'} to KEMT Ministries</>
                    )}
                  </button>

                  <p className="donate-security">
                    <i className="fas fa-lock"></i> Secured by Safaricom M-Pesa
                  </p>
                </form>
              )}
            </div>

            {/* Side info */}
            <div className="donate-side-info">
              <div className="donate-impact-card">
                <h4><i className="fas fa-chart-bar"></i> Your Impact</h4>
                <div className="donate-impact-row"><span>KES 100</span><span>Supports a youth workshop session</span></div>
                <div className="donate-impact-row"><span>KES 500</span><span>Covers outreach materials for a team</span></div>
                <div className="donate-impact-row"><span>KES 1,000</span><span>Feeds families in a compassion outreach</span></div>
                <div className="donate-impact-row"><span>KES 2,500</span><span>Funds a day of mission activities</span></div>
                <div className="donate-impact-row"><span>KES 5,000</span><span>Sponsors a missioner for a trip</span></div>
              </div>
              <div className="donate-verse-card">
                <i className="fas fa-quote-left"></i>
                <p>"And whoever gives even a cup of cold water to one of these little ones in the name of a disciple — truly I tell you, none of these will lose their reward."</p>
                <span>— Matthew 10:42</span>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  );
};

export default Donate;
