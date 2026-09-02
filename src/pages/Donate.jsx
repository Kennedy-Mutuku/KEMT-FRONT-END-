import React, { useState } from 'react';

const PRESETS = [100, 500, 1000, 2500, 5000];

const Donate = () => {
  const [amount, setAmount] = useState('500');
  const [custom, setCustom] = useState(false);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');

  const selectPreset = (val) => {
    setAmount(String(val));
    setCustom(false);
  };

  const handleCustom = (e) => {
    setAmount(e.target.value);
    setCustom(true);
  };

  // Enforce valid digit lengths and strip excess numbers
  const handlePhoneChange = (e) => {
    let raw = e.target.value.replace(/[^\d\+]/g, '');

    if (raw.startsWith('+254')) {
      raw = '+254' + raw.slice(4).replace(/\D/g, '').slice(0, 9);
    } else if (raw.startsWith('254')) {
      raw = '254' + raw.slice(3).replace(/\D/g, '').slice(0, 9);
    } else if (raw.startsWith('0')) {
      raw = '0' + raw.slice(1).replace(/\D/g, '').slice(0, 9);
    } else {
      raw = raw.replace(/\D/g, '').slice(0, 9);
    }

    setPhone(raw);
    if (status === 'error') setStatus(null);
  };

  // Validate phone format for Safaricom / M-Pesa numbers
  const isPhoneValid = (val) => {
    if (!val) return false;
    const clean = val.replace(/[\s\+]/g, '');
    return /^0[71]\d{8}$/.test(clean) ||
           /^[71]\d{8}$/.test(clean) ||
           /^254[71]\d{8}$/.test(clean);
  };

  const formatDisplayPhone = (val) => {
    if (!val) return '';
    if (val.startsWith('+254')) return val;
    if (val.startsWith('254')) return `+${val}`;
    if (val.startsWith('0')) return `+254 ${val.slice(1)}`;
    return `+254 ${val}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !phone || !isPhoneValid(phone)) return;
    setLoading(true);
    setStatus(null);

    try {
      const rawApiUrl = import.meta.env.VITE_API_URL;
      const baseUrl = (rawApiUrl && !rawApiUrl.includes('your-backend-url.com'))
        ? rawApiUrl.replace(/\/$/, '')
        : '';
      const endpoint = `${baseUrl}/api/donate/mpesa`;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, phone }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setMessage(data.message || 'An M-Pesa STK push prompt has been sent to your phone. Enter your PIN to complete your gift.');
      } else {
        setStatus('error');
        setMessage(data.message || 'Payment initiation failed. Please check your phone number and try again.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Unable to connect to the payment gateway. Please verify your connection.');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => { 
    setStatus(null); 
    setAmount('500'); 
    setPhone(''); 
    setCustom(false); 
  };

  const numAmount = Number(amount);
  const isValidAmount = !isNaN(numAmount) && numAmount >= 10;
  const isFormValid = isValidAmount && isPhoneValid(phone);

  return (
    <main className="donate-page">
      <div className="donate-centered">
        <div className="donate-form-card">
          <div className="donate-form-header">
            <i className="fas fa-mobile-screen-button"></i>
            <h3>Give via M-Pesa</h3>
            <p>Support KEMT Ministries — account name: <strong>KEMT Ministries</strong></p>
          </div>

          {status === 'success' ? (
            <div className="donate-success">
              <div className="donate-success-icon">
                <i className="fas fa-mobile-screen-button pulse-icon"></i>
              </div>
              <h3>Check Your Phone Screen!</h3>
              <p className="donate-success-highlight">
                An M-Pesa payment prompt has been sent to <strong>{formatDisplayPhone(phone)}</strong>.
              </p>

              <div className="stk-steps-list">
                <div className="stk-step-item">
                  <span className="step-num">1</span>
                  <span>Unlock your phone screen</span>
                </div>
                <div className="stk-step-item">
                  <span className="step-num">2</span>
                  <span>Enter your <strong>M-Pesa PIN</strong> to authorize <strong>KES {numAmount.toLocaleString()}</strong></span>
                </div>
                <div className="stk-step-item">
                  <span className="step-num">3</span>
                  <span>You will receive an M-Pesa confirmation SMS receipt</span>
                </div>
              </div>

              <button className="btn btn-primary btn-full" onClick={reset}>
                <i className="fas fa-redo-alt"></i> Done / Give Again
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="donate-form">

              <div className="form-group">
                <label>Amount (KES)</label>
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
                  placeholder="Or enter custom amount (e.g. 200)"
                  min="10"
                  value={custom ? amount : ''}
                  onChange={handleCustom}
                  onClick={() => setCustom(true)}
                />
              </div>

              <div className="form-group">
                <label>M-Pesa Phone Number</label>
                <div className={`phone-input-wrap ${phone && !isPhoneValid(phone) ? 'phone-invalid' : ''}`}>
                  <span className="phone-prefix">+254</span>
                  <input
                    type="tel"
                    placeholder="7XX XXX XXX or 07XX XXX XXX"
                    value={phone}
                    onChange={handlePhoneChange}
                    maxLength={13}
                    required
                  />
                </div>
                <div className="phone-guidance-note">
                  <i className="fas fa-info-circle"></i>
                  <span>Enter <strong>07XX...</strong> or <strong>7XX...</strong>. An M-Pesa PIN prompt will pop up on your phone screen.</span>
                </div>
              </div>

              {status === 'error' && (
                <div className="form-error">
                  <i className="fas fa-exclamation-circle"></i> {message}
                </div>
              )}

              {loading && (
                <div className="stk-guidance-box">
                  <div className="stk-spinner-wrap">
                    <i className="fas fa-circle-notch fa-spin"></i>
                  </div>
                  <div className="stk-guidance-text">
                    <strong>Sending M-Pesa Prompt...</strong>
                    <p>Unlock your phone and enter your M-Pesa PIN when requested.</p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary btn-full donate-btn"
                disabled={loading || !isFormValid}
              >
                {loading ? (
                  <><i className="fas fa-spinner fa-spin"></i> Sending Prompt to Phone...</>
                ) : (
                  <><i className="fas fa-heart"></i> Give KES {isValidAmount ? numAmount.toLocaleString() : '—'}</>
                )}
              </button>

              <p className="donate-security">
                <i className="fas fa-lock"></i> Secured by Safaricom M-Pesa API
              </p>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};

export default Donate;
