import { useState, useEffect, useRef } from 'react';
import { Search, Bell, MessageSquare, Sun, Moon, ChevronDown, User, Settings, LogOut, CheckCircle, Heart, Camera } from 'lucide-react';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'notifications', 'messages', 'profile'
  const dropdownRef = useRef(null);
  
  // Profile State
  const [profile, setProfile] = useState({
    name: 'Pastor John',
    role: 'Super Admin',
    profileImageUrl: 'https://i.pravatar.cc/150?img=11'
  });
  const fileInputRef = useRef(null);

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

  // Fetch Profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/profile');
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
        }
      } catch (err) {
        console.error('Failed to fetch profile', err);
      }
    };
    fetchProfile();
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, this would toggle a class on the body/html
    // document.documentElement.classList.toggle('dark');
  };

  const toggleDropdown = (dropdownName) => {
    if (activeDropdown === dropdownName) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdownName);
    }
  };

  const handleAvatarClick = (e) => {
    e.stopPropagation(); // Prevent dropdown from toggling when clicking avatar
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await fetch('http://localhost:5000/api/profile/upload', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        setProfile(updatedProfile);
      } else {
        alert("Failed to upload image");
      }
    } catch (err) {
      console.error('Error uploading profile picture:', err);
      alert("Error uploading image");
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // reset input
      }
    }
  };
  
  // Construct image URL safely
  const imageUrl = profile.profileImageUrl.startsWith('http') 
    ? profile.profileImageUrl 
    : `http://localhost:5000/${profile.profileImageUrl}`;

  return (
    <header className="admin-header">
      <div className="admin-header-search">
        <Search size={20} />
        <input type="text" placeholder="Type to search..." />
      </div>
      
      <div className="admin-header-actions" ref={dropdownRef}>
        <button className="admin-icon-btn" onClick={toggleDarkMode} title="Toggle Theme" style={{ borderColor: isDarkMode ? '#F59E0B' : 'transparent' }}>
          {isDarkMode ? (
            <Moon size={24} strokeWidth={2.5} color="#F59E0B" style={{ stroke: '#F59E0B', display: 'block', opacity: 1, visibility: 'visible' }} />
          ) : (
            <Sun size={24} strokeWidth={2.5} color="#1C2434" style={{ stroke: '#1C2434', display: 'block', opacity: 1, visibility: 'visible' }} />
          )}
        </button>
        
        <div style={{ position: 'relative' }}>
          <button className="admin-icon-btn" onClick={() => toggleDropdown('notifications')} style={{ borderColor: activeDropdown === 'notifications' ? '#3C50E0' : 'transparent' }}>
            <Bell size={24} strokeWidth={2.5} color={activeDropdown === 'notifications' ? '#3C50E0' : '#1C2434'} style={{ stroke: activeDropdown === 'notifications' ? '#3C50E0' : '#1C2434', display: 'block', opacity: 1, visibility: 'visible' }} />
            <span className="admin-notification-dot"></span>
          </button>
          
          {activeDropdown === 'notifications' && (
            <div className="admin-dropdown-menu">
              <div className="admin-dropdown-header">Notifications</div>
              <div className="admin-dropdown-item">
                <CheckCircle size={18} strokeWidth={2.5} color="#10B981" />
                <div>
                  <div style={{ fontWeight: 600 }}>New Member Registered</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>2 minutes ago</div>
                </div>
              </div>
              <div className="admin-dropdown-item">
                <Heart size={18} strokeWidth={2.5} color="#EF4444" />
                <div>
                  <div style={{ fontWeight: 600 }}>Urgent Prayer Request</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>1 hour ago</div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div style={{ position: 'relative' }}>
          <button className="admin-icon-btn" onClick={() => toggleDropdown('messages')} style={{ borderColor: activeDropdown === 'messages' ? '#3C50E0' : 'transparent' }}>
            <MessageSquare size={24} strokeWidth={2.5} color={activeDropdown === 'messages' ? '#3C50E0' : '#1C2434'} style={{ stroke: activeDropdown === 'messages' ? '#3C50E0' : '#1C2434', display: 'block', opacity: 1, visibility: 'visible' }} />
            <span className="admin-notification-dot"></span>
          </button>

          {activeDropdown === 'messages' && (
            <div className="admin-dropdown-menu">
              <div className="admin-dropdown-header">Pastoral Messages</div>
              <div className="admin-dropdown-item">
                <img src="https://i.pravatar.cc/150?img=32" alt="Avatar" style={{ width: 32, height: 32, borderRadius: '50%' }} />
                <div>
                  <div style={{ fontWeight: 600 }}>Sarah Jenkins</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Can we schedule counseling?</div>
                </div>
              </div>
              <div className="admin-dropdown-item">
                <img src="https://i.pravatar.cc/150?img=68" alt="Avatar" style={{ width: 32, height: 32, borderRadius: '50%' }} />
                <div>
                  <div style={{ fontWeight: 600 }}>Michael Brown</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Question about the youth event.</div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div style={{ position: 'relative' }}>
          <div className="admin-profile" onClick={() => toggleDropdown('profile')}>
            <div 
              style={{ position: 'relative', cursor: 'pointer' }}
              onClick={handleAvatarClick}
              title="Click to change profile picture"
              className="admin-avatar-container"
            >
              <img src={imageUrl} alt="Profile" className="admin-avatar" />
              <div className="admin-avatar-overlay">
                <Camera size={16} color="white" />
              </div>
            </div>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept="image/*"
              onChange={handleFileChange}
            />

            <ChevronDown size={16} color="var(--admin-text-muted)" />
          </div>

          {activeDropdown === 'profile' && (
            <div className="admin-dropdown-menu">
              <div className="admin-dropdown-header">My Account</div>
              <button className="admin-dropdown-item">
                <User size={16} />
                Profile Settings
              </button>
              <button className="admin-dropdown-item">
                <Settings size={16} />
                Account Settings
              </button>
              <button className="admin-dropdown-item" style={{ color: 'var(--admin-danger)', borderTop: '1px solid var(--admin-border-color)', marginTop: '4px', paddingTop: '12px' }}>
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
