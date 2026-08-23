import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <>
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
                                <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink></li>
                                <li className="dropdown">
                                    <NavLink to="/about">About Us <i className="fas fa-chevron-down"></i></NavLink>
                                    <ul className="dropdown-menu">
                                        <li><Link to="/about#who-we-are">Who We Are</Link></li>
                                        <li><Link to="/about#our-history">Our History</Link></li>
                                        <li><Link to="/about#vision-mission">Vision & Mission</Link></li>
                                        <li><Link to="/about#leadership">Leadership Team</Link></li>
                                        <li><Link to="/about#statement-of-faith">Statement of Faith</Link></li>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <NavLink to="/ministries">Ministries <i className="fas fa-chevron-down"></i></NavLink>
                                    <ul className="dropdown-menu">
                                        <li><Link to="/ministries#evangelism">Evangelism</Link></li>
                                        <li><Link to="/ministries#discipleship">Discipleship</Link></li>
                                        <li><Link to="/ministries#youth-ministry">Youth Ministry</Link></li>
                                        <li><Link to="/ministries#women-ministry">Women Ministry</Link></li>
                                        <li><Link to="/ministries#men-ministry">Men Ministry</Link></li>
                                        <li><Link to="/ministries#children-ministry">Children Ministry</Link></li>
                                        <li><Link to="/ministries#community-outreach">Community Outreach</Link></li>
                                    </ul>
                                </li>
                                <li className="dropdown">
                                    <NavLink to="/programs">Programs <i className="fas fa-chevron-down"></i></NavLink>
                                    <ul className="dropdown-menu">
                                        <li><Link to="/programs#missions">Mission Trips</Link></li>
                                        <li><Link to="/programs#bible-study">Bible Study</Link></li>
                                        <li><Link to="/programs#prayer">Prayer Programs</Link></li>
                                        <li><Link to="/programs#training">Leadership Training</Link></li>
                                    </ul>
                                </li>
                                <li><NavLink to="/events">Events</NavLink></li>
                                <li><NavLink to="/gallery">Gallery</NavLink></li>
                                <li><NavLink to="/contact">Contact</NavLink></li>
                            </ul>
                            <div className="nav-buttons">
                                <Link to="/donate" className="btn btn-primary">Donate</Link>
                            </div>
                            <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Navbar;
