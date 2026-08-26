import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Ministries from './pages/Ministries';
import Programs from './pages/Programs';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Events from './pages/Events';
import Contact from './pages/Contact';
import Donate from './pages/Donate';
import Leadership from './pages/Leadership';
import Login from './pages/Login';

// Admin imports
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminEvents from './pages/admin/AdminEvents';

// Layout for the main website
const MainLayout = () => (
  <div className="app">
    <ScrollToTop />
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
          <Route path="/about" element={<About />} />
          <Route path="/ministries" element={<Ministries />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
