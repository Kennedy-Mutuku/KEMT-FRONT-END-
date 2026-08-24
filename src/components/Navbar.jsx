import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
        setOpenDropdown(null);
    };

    const toggleDropdown = (name) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    return (
        <div className="site-header-wrapper">
            {mobileMenuOpen && (
                <div className="menu-backdrop" onClick={toggleMobileMenu}></div>
            )}
            {/* Top Bar */}
            <div className="top-bar">
                <div className="container">
                    <div className="top-bar-content">
                        <div className="top-bar-left">
                            <span><i className="fas fa-envelope"></i> info@kingdomenlightenment.org</span>
                            <span><i className="fas fa-phone"></i> +254 714 476 295</span>
                        </div>
                        <div className="top-bar-right">
                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="https://www.youtube.com/@KingdomEnlightenmentMinistries" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
                            <a href="https://www.tiktok.com/@kingdom_enlightment?lang=en" target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Header */}
            <header className="header">
                <div className="container">
                    <div className="header-content">
                        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <div className="logo">
                            <Link to="/">
                                <img src="/images/logo.png" alt="Kingdom Enlightenment Missions Team" className="logo-img" />
                                <div className="logo-name">
                                    <span className="logo-name-top">Kingdom Enlightenment</span>
                                    <span className="logo-name-bottom">Missions Team</span>
                                </div>
                            </Link>
                        </div>
                        <nav className={`main-nav ${mobileMenuOpen ? 'active' : ''}`}>
                            <ul className="nav-menu">
                                <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setMobileMenuOpen(false)}>Home</NavLink></li>
                                <li className={`dropdown ${openDropdown === 'about' ? 'active' : ''}`}>
                                    <NavLink to="/about" onClick={() => toggleDropdown('about')}>About Us <i className="fas fa-chevron-down"></i></NavLink>
                                    <ul className="dropdown-menu">
                                        <li><Link to="/about#who-we-are" onClick={() => setMobileMenuOpen(false)}>Who We Are</Link></li>
                                        <li><Link to="/about#our-history" onClick={() => setMobileMenuOpen(false)}>Our History</Link></li>
                                        <li><Link to="/about#vision-mission" onClick={() => setMobileMenuOpen(false)}>Vision & Mission</Link></li>
                                        <li><Link to="/about#leadership" onClick={() => setMobileMenuOpen(false)}>Leadership Team</Link></li>
                                        <li><Link to="/about#statement-of-faith" onClick={() => setMobileMenuOpen(false)}>Statement of Faith</Link></li>
                                    </ul>
                                </li>
                                <li className={`dropdown ${openDropdown === 'ministries' ? 'active' : ''}`}>
                                    <NavLink to="/ministries" onClick={() => toggleDropdown('ministries')}>Departments <i className="fas fa-chevron-down"></i></NavLink>
                                    <ul className="dropdown-menu">
                                        <li><Link to="/ministries#evangelism" onClick={() => setMobileMenuOpen(false)}>Evangelism &amp; Missions</Link></li>
                                        <li><Link to="/ministries#prayer" onClick={() => setMobileMenuOpen(false)}>Prayer Department</Link></li>
                                        <li><Link to="/ministries#compassion" onClick={() => setMobileMenuOpen(false)}>Compassion Ministry</Link></li>
                                        <li><Link to="/ministries#highschool" onClick={() => setMobileMenuOpen(false)}>High School Ministry</Link></li>
                                    </ul>
                                </li>
                                <li><NavLink to="/programs" onClick={() => setMobileMenuOpen(false)}>Outreach</NavLink></li>
                                <li><NavLink to="/events" onClick={() => setMobileMenuOpen(false)}>Events</NavLink></li>
                                <li><NavLink to="/gallery" onClick={() => setMobileMenuOpen(false)}>Gallery</NavLink></li>
                                <li><NavLink to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact Us</NavLink></li>
                            </ul>
                            <div className="nav-buttons">
                                <Link to="/donate" className="btn btn-primary">Donate</Link>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Navbar;
