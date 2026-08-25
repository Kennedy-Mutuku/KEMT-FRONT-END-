import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // In a real app, you would authenticate here.
    // For now, we just redirect to the admin dashboard.
    navigate('/admin');
  };

  return (
    <div className="container section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F1F5F9' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ color: '#1C2434', marginBottom: '10px' }}>Admin Login</h2>
          <p style={{ color: '#64748B' }}>Sign in to manage the church platform</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#1C2434', fontWeight: 600 }}>Email Address</label>
            <input 
              type="email" 
              required
              placeholder="admin@church.org"
              style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #E2E8F0', outline: 'none' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', color: '#1C2434', fontWeight: 600 }}>Password</label>
            <input 
              type="password" 
              required
              placeholder="••••••••"
              style={{ width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #E2E8F0', outline: 'none' }} 
            />
          </div>

          <button 
            type="submit" 
            style={{ 
              backgroundColor: '#3C50E0', 
              color: 'white', 
              padding: '12px', 
              border: 'none', 
              borderRadius: '6px', 
              fontWeight: 600, 
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
