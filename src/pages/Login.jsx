import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import logoImg from '../assets/logo Kingdom enightement.jpg';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    try {
      // 1. Try backend API login
      let success = false;
      let userData = null;

      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword }),
        });
        const data = await res.json();
        if (res.ok && data.success) {
          success = true;
          userData = data.user;
          localStorage.setItem('kemt_admin_token', data.token);
        }
      } catch {
        // Fallback local check if backend is offline
        if (
          (trimmedEmail === 'info@kingdomenlightenment.org' || trimmedEmail.endsWith('@kingdomenlightenment.org')) &&
          trimmedPassword === 'KEMTkemt'
        ) {
          success = true;
          userData = {
            name: 'KEMT Administrator',
            email: trimmedEmail || 'info@kingdomenlightenment.org',
            role: 'Super Admin',
          };
          localStorage.setItem('kemt_admin_token', 'kemt_token_local_' + Date.now());
        }
      }

      if (success) {
        localStorage.setItem('kemt_admin_user', JSON.stringify(userData));
        navigate('/admin');
      } else {
        setError('Invalid credentials. Please enter the authorized KEMT email and password.');
      }
    } catch {
      setError('Unable to sign in at the moment. Please check your network connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container section"
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2.5rem 1rem',
      }}
    >
      <div
        style={{
          background: '#ffffff',
          padding: '40px 36px',
          borderRadius: '16px',
          boxShadow: '0 12px 36px rgba(232, 125, 30, 0.08), 0 2px 8px rgba(0,0,0,0.04)',
          width: '100%',
          maxWidth: '440px',
          border: '1.5px solid #fed7aa',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              background: '#fff7ed',
              border: '2px solid #fed7aa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 14px',
              overflow: 'hidden',
              padding: '6px'
            }}
          >
            <img 
              src={logoImg} 
              alt="KEMT Logo" 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
            />
          </div>

          <span
            style={{
              display: 'inline-block',
              padding: '3px 12px',
              borderRadius: '20px',
              backgroundColor: 'rgba(232, 125, 30, 0.12)',
              color: '#E87D1E',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              marginBottom: '8px'
            }}
          >
            Administrator Portal
          </span>

          <h2 style={{ color: '#1e293b', margin: '0 0 6px', fontSize: '1.65rem', fontWeight: 800 }}>
            Sign In to Dashboard
          </h2>
          <p style={{ color: '#64748b', margin: 0, fontSize: '0.88rem' }}>
            Manage mission events, contact inquiries, and records
          </p>
        </div>

        {/* Error notification banner */}
        {error && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 14px',
              marginBottom: '20px',
              borderRadius: '8px',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              color: '#dc2626',
              fontSize: '0.86rem',
              fontWeight: 500,
            }}
          >
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span style={{ flex: 1 }}>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '6px',
                color: '#334155',
                fontWeight: 600,
                fontSize: '0.88rem',
              }}
            >
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="info@kingdomenlightenment.org"
                autoComplete="off"
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 40px',
                  borderRadius: '8px',
                  border: '1.5px solid #cbd5e1',
                  outline: 'none',
                  fontSize: '0.92rem',
                  backgroundColor: '#ffffff',
                  color: '#1e293b',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#E87D1E';
                  e.target.style.boxShadow = '0 0 0 3px rgba(232, 125, 30, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#cbd5e1';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <Mail
                size={18}
                color="#94a3b8"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
          </div>

          <div>
            <label
              style={{
                display: 'block',
                marginBottom: '6px',
                color: '#334155',
                fontWeight: 600,
                fontSize: '0.88rem',
              }}
            >
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (KEMTkemt)"
                autoComplete="new-password"
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 40px',
                  borderRadius: '8px',
                  border: '1.5px solid #cbd5e1',
                  outline: 'none',
                  fontSize: '0.92rem',
                  backgroundColor: '#ffffff',
                  color: '#1e293b',
                  transition: 'all 0.2s ease',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#E87D1E';
                  e.target.style.boxShadow = '0 0 0 3px rgba(232, 125, 30, 0.15)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#cbd5e1';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <Lock
                size={18}
                color="#94a3b8"
                style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: '#E87D1E',
              color: 'white',
              padding: '13px',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.96rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(232, 125, 30, 0.35)',
              transition: 'all 0.2s ease',
              opacity: loading ? 0.8 : 1,
            }}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Authenticating...
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
          <Link
            to="/"
            style={{
              color: '#64748b',
              fontSize: '0.85rem',
              textDecoration: 'none',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            &larr; Return to Main Website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
