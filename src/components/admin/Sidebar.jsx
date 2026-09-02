import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Heart,
  DollarSign,
  MessageSquare,
  Settings,
  PieChart,
  Globe
} from 'lucide-react';
import logoImg from '../../assets/logo Kingdom enightement.jpg';

const Sidebar = () => {
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(0);

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
    const interval = setInterval(fetchStats, 15000);
    return () => clearInterval(interval);
  }, [location.pathname]);

  const isCurrentPath = (path) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <div className="admin-sidebar-logo-icon">
          <img src={logoImg} alt="KEMT" />
        </div>
        <span>KEMT Admin</span>
      </div>
      
      <div className="admin-nav">
        <div className="admin-nav-category">Main Menu</div>
        
        <Link to="/admin" className={`admin-nav-item ${isCurrentPath('/admin') && location.pathname === '/admin' ? 'active' : ''}`}>
          <div className="admin-nav-item-left">
            <LayoutDashboard size={19} />
            Dashboard
          </div>
        </Link>
        
        <Link to="/admin/events" className={`admin-nav-item ${isCurrentPath('/admin/events') ? 'active' : ''}`}>
          <div className="admin-nav-item-left">
            <Calendar size={19} />
            Events & Missions
          </div>
        </Link>

        <Link to="/admin/messages" className={`admin-nav-item ${isCurrentPath('/admin/messages') ? 'active' : ''}`}>
          <div className="admin-nav-item-left">
            <MessageSquare size={19} />
            Contact Messages
          </div>
          {unreadCount > 0 && (
            <span className="admin-nav-badge">
              {unreadCount}
            </span>
          )}
        </Link>

        <Link to="/admin/users" className={`admin-nav-item ${isCurrentPath('/admin/users') ? 'active' : ''}`}>
          <div className="admin-nav-item-left">
            <Users size={19} />
            Leadership & Members
          </div>
        </Link>

        <div className="admin-nav-category">Quick Navigation</div>

        <Link to="/" className="admin-nav-item">
          <div className="admin-nav-item-left">
            <Globe size={19} />
            Live Website
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
