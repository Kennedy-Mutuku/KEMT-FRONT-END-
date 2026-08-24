import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Home from './pages/Home';
import Ministries from './pages/Ministries';
import Programs from './pages/Programs';
import Gallery from './pages/Gallery';

// Placeholder components for pages not yet built
const Placeholder = ({ title }) => (
  <div className="container section">
    <div className="section-header">
      <h2 className="section-title">{title}</h2>
      <p>Content coming soon...</p>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Placeholder title="About Us" />} />
          <Route path="/ministries" element={<Ministries />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/events" element={<Placeholder title="Events" />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Placeholder title="Contact Us" />} />
          <Route path="/donate" element={<Placeholder title="Donate" />} />
        </Routes>
        <Footer />
        <BackToTop />
      </div>
    </Router>
  );
}

export default App;
