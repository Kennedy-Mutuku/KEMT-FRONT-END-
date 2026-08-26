import React, { useState } from 'react';

const PRESETS = [100, 500, 1000, 2500, 5000];

const Donate = () => {
  const [amount, setAmount] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !phone) return;
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/donate/mpesa`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, phone }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setMessage('A payment prompt has been sent to your phone. Enter your M-Pesa PIN to complete your gift.');
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
      <div className="donate-centered">
        <div className="donate-form-card">
          <div className="donate-form-header">
            <i className="fas fa-mobile-screen-button"></i>
            <h3>Give via M-Pesa</h3>
            <p>Support KEMT Ministries — account name: <strong>KEMT Ministries</strong></p>
          </div>

          {status === 'success' ? (
            <div className="donate-success">
              <div className="donate-success-icon"><i className="fas fa-check-circle"></i></div>
              <h3>Thank You!</h3>
              <p>{message}</p>
              <button className="btn btn-primary" onClick={reset}>Give Again</button>
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
                  placeholder="Or enter a custom amount"
                  min="10"
                  value={custom ? amount : ''}
                  onChange={handleCustom}
                  onClick={() => setCustom(true)}
                />
              </div>

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
              </div>

              {status === 'error' && (
                <div className="form-error">
                  <i className="fas fa-exclamation-circle"></i> {message}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary btn-full donate-btn"
                disabled={loading || !amount || !phone}
              >
                {loading ? (
                  <><i className="fas fa-spinner fa-spin"></i> Sending Prompt...</>
                ) : (
                  <><i className="fas fa-heart"></i> Give KES {amount ? Number(amount).toLocaleString() : '—'}</>
                )}
              </button>

              <p className="donate-security">
                <i className="fas fa-lock"></i> Secured by Safaricom M-Pesa
              </p>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};

export default Donate;
