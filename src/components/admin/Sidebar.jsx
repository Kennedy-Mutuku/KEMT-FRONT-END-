import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Calendar, 
  Heart,
  DollarSign,
  MessageSquare,
  Settings,
  PieChart,
  ChevronDown,
  Image
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();

  const isCurrentPath = (path) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-header">
        <div className="admin-sidebar-logo-icon">
          <BookOpen size={20} />
        </div>
        ChurchAdmin
      </div>
      
      <div className="admin-nav">
        <div className="admin-nav-category">Main Menu</div>
        
        <Link to="/admin" className={`admin-nav-item ${isCurrentPath('/admin') && location.pathname === '/admin' ? 'active' : ''}`}>
          <div className="admin-nav-item-left">
            <LayoutDashboard size={20} />
            Dashboard
          </div>
        </Link>
        
        <Link to="/admin/users" className={`admin-nav-item ${isCurrentPath('/admin/users') ? 'active' : ''}`}>
          <div className="admin-nav-item-left">
            <Users size={20} />
            Members
          </div>
        </Link>

        <Link to="/admin/events" className={`admin-nav-item ${isCurrentPath('/admin/events') ? 'active' : ''}`}>
          <div className="admin-nav-item-left">
            <Calendar size={20} />
            Events
          </div>
        </Link>

        <Link to="/admin/gallery" className={`admin-nav-item ${isCurrentPath('/admin/gallery') ? 'active' : ''}`}>
          <div className="admin-nav-item-left">
            <Image size={20} />
            Gallery
          </div>
        </Link>

        <Link to="/admin/donations" className={`admin-nav-item ${isCurrentPath('/admin/donations') ? 'active' : ''}`}>
          <div className="admin-nav-item-left">
            <DollarSign size={20} />
            Donations
          </div>
        </Link>

        <div className="admin-nav-category">Pastoral Care</div>

        <Link to="/admin/messages" className={`admin-nav-item ${isCurrentPath('/admin/messages') ? 'active' : ''}`}>
          <div className="admin-nav-item-left">
            <MessageSquare size={20} />
            Messages
          </div>
        </Link>

        <Link to="/admin/prayer-requests" className={`admin-nav-item ${isCurrentPath('/admin/prayer-requests') ? 'active' : ''}`}>
          <div className="admin-nav-item-left">
            <Heart size={20} />
            Prayer Requests
          </div>
          <span className="admin-nav-badge" style={{backgroundColor: '#EF4444'}}>12</span>
        </Link>

        <div className="admin-nav-category">System</div>

        <Link to="/admin/analytics" className={`admin-nav-item ${isCurrentPath('/admin/analytics') ? 'active' : ''}`}>
          <div className="admin-nav-item-left">
            <PieChart size={20} />
            Analytics
          </div>
        </Link>

        <Link to="/admin/settings" className={`admin-nav-item ${isCurrentPath('/admin/settings') ? 'active' : ''}`}>
          <div className="admin-nav-item-left">
            <Settings size={20} />
            Settings
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
