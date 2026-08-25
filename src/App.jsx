import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Home from './pages/Home';
import Events from './pages/Events';
import Login from './pages/Login';

// Admin imports
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminEvents from './pages/admin/AdminEvents';

// Placeholder components for other pages
const Placeholder = ({ title }) => (
  <div className="container section">
    <div className="section-header">
      <h2 className="section-title">{title}</h2>
      <p>Content coming soon...</p>
    </div>
  </div>
);

// Layout for the main website
const MainLayout = () => (
  <div className="app">
    <Navbar />
    <Outlet />
    <Footer />
    <BackToTop />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="donations" element={<div style={{padding: '30px', color: 'var(--admin-text-main)'}}><h1 className="admin-page-title">Donations</h1><p>Donations management coming soon...</p></div>} />
          <Route path="messages" element={<div style={{padding: '30px', color: 'var(--admin-text-main)'}}><h1 className="admin-page-title">Pastoral Messages</h1><p>Messages interface coming soon...</p></div>} />
          <Route path="prayer-requests" element={<div style={{padding: '30px', color: 'var(--admin-text-main)'}}><h1 className="admin-page-title">Prayer Requests</h1><p>Prayer requests queue coming soon...</p></div>} />
          <Route path="analytics" element={<div style={{padding: '30px', color: 'var(--admin-text-main)'}}><h1 className="admin-page-title">Analytics</h1><p>Advanced system analytics coming soon...</p></div>} />
          <Route path="settings" element={<div style={{padding: '30px', color: 'var(--admin-text-main)'}}><h1 className="admin-page-title">Settings</h1><p>Settings coming soon...</p></div>} />
        </Route>

        {/* Main Site Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Placeholder title="About Us" />} />
          <Route path="/ministries" element={<Placeholder title="Ministries" />} />
          <Route path="/programs" element={<Placeholder title="Programs" />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Placeholder title="Gallery" />} />
          <Route path="/contact" element={<Placeholder title="Contact Us" />} />
          <Route path="/donate" element={<Placeholder title="Donate" />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
