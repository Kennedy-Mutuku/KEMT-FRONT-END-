import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, Bell, MessageSquare, Sun, Moon, ChevronDown, User, Settings, LogOut, CheckCircle, Heart, Mail } from 'lucide-react';
import logoImg from '../../assets/logo Kingdom enightement.jpg';

const Header = () => {
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch stats for live indicators
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/admin/stats');
        if (res.ok) {
          const data = await res.json();
          setUnreadCount(data.unreadMessages || 0);
        }
      } catch {}
    };
    fetchStats();
  }, []);

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const handleSignOut = () => {
    localStorage.removeItem('kemt_admin_token');
    localStorage.removeItem('kemt_admin_user');
    navigate('/login');
  };

  return (
    <header className="admin-header">
      <div className="admin-header-search">
        <Search size={18} color="#94a3b8" />
        <input type="text" placeholder="Search events, messages, members..." />
      </div>
      
      <div className="admin-header-actions" ref={dropdownRef}>
        {/* Messages Quick Access */}
        <Link 
          to="/admin/messages" 
          className="admin-icon-btn" 
          title="Contact Inquiries"
          style={{ textDecoration: 'none' }}
        >
          <Mail size={20} color="#475569" />
          {unreadCount > 0 && <span className="admin-notification-dot"></span>}
        </Link>
        
        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button 
            className="admin-icon-btn" 
            onClick={() => toggleDropdown('notifications')} 
            style={{ borderColor: activeDropdown === 'notifications' ? '#E87D1E' : '#e2e8f0' }}
          >
            <Bell size={20} color={activeDropdown === 'notifications' ? '#E87D1E' : '#475569'} />
          </button>
          
          {activeDropdown === 'notifications' && (
            <div className="admin-dropdown-menu">
              <div className="admin-dropdown-header">Notifications</div>
              <div className="admin-dropdown-item">
                <CheckCircle size={16} color="#10B981" />
                <div>
                  <div style={{ fontWeight: 600 }}>System Online</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Backend connected</div>
                </div>
              </div>
              <div className="admin-dropdown-item">
                <Mail size={16} color="#E87D1E" />
                <div>
                  <div style={{ fontWeight: 600 }}>{unreadCount} Inquiries</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>In contact inbox</div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Profile / Emblem */}
        <div style={{ position: 'relative' }}>
          <div className="admin-profile" onClick={() => toggleDropdown('profile')}>
            <div className="admin-avatar-container">
              <img 
                src={logoImg} 
                alt="KEMT Logo" 
                className="admin-avatar"
                style={{ objectFit: 'contain', padding: '2px' }}
              />
            </div>

            <div className="admin-profile-info">
              <span className="admin-profile-name">KEMT Admin</span>
              <span className="admin-profile-role">Super Admin</span>
            </div>

            <ChevronDown size={14} color="#94a3b8" />
          </div>

          {activeDropdown === 'profile' && (
            <div className="admin-dropdown-menu">
              <div className="admin-dropdown-header">Administrator Account</div>
              <Link to="/" className="admin-dropdown-item" style={{ textDecoration: 'none' }}>
                <User size={15} />
                <span>View Main Website</span>
              </Link>
              <Link to="/admin/events" className="admin-dropdown-item" style={{ textDecoration: 'none' }}>
                <Settings size={15} />
                <span>Manage Events</span>
              </Link>
              <button 
                className="admin-dropdown-item" 
                onClick={handleSignOut}
                style={{ color: '#EF4444', borderTop: '1px solid #f1f5f9', marginTop: '4px', paddingTop: '10px' }}
              >
                <LogOut size={15} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
