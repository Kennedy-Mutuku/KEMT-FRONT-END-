import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="container">
                    <div className="footer-grid">
                        <div className="footer-col">
                            <div className="footer-logo">
                                <img src="/images/logo.png" alt="Kingdom Enlightenment Missions Team" className="footer-logo-img" />
                            </div>
                            <p>Spreading the Gospel, Transforming Lives, Building God's Kingdom across Kenya and beyond.</p>
                            <div className="footer-social">
                                <a href="#"><i className="fab fa-facebook-f"></i></a>
                                <a href="#"><i className="fab fa-twitter"></i></a>
                                <a href="https://www.youtube.com/@KingdomEnlightenmentMinistries" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
                                <a href="https://www.tiktok.com/@kingdom_enlightment?lang=en" target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok"></i></a>
                                <a href="#"><i className="fab fa-instagram"></i></a>
                            </div>
                        </div>
                        <div className="footer-col">
                            <h4>Quick Links</h4>
                            <ul>
                                <li><Link to="/">Home</Link></li>
                                <li><Link to="/about">About Us</Link></li>
                                <li><Link to="/ministries">Ministries</Link></li>
                                <li><Link to="/programs">Programs</Link></li>
                                <li><Link to="/events">Events</Link></li>
                                <li><Link to="/gallery">Gallery</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>Our Ministries</h4>
                            <ul>
                                <li><Link to="/ministries#evangelism">Evangelism & Missions</Link></li>
                                <li><Link to="/ministries#discipleship">Discipleship</Link></li>
                                <li><Link to="/ministries#youth-ministry">Youth Ministry</Link></li>
                                <li><Link to="/ministries#women-ministry">Women Ministry</Link></li>
                                <li><Link to="/ministries#men-ministry">Men Ministry</Link></li>
                                <li><Link to="/ministries#community-outreach">Community Outreach</Link></li>
                            </ul>
                        </div>
                        <div className="footer-col">
                            <h4>Contact Info</h4>
                            <ul className="contact-info">
                                <li>
                                    <i className="fas fa-map-marker-alt"></i>
                                    <span>P.O. Box 00000-00100<br />Nairobi, Kenya</span>
                                </li>
                                <li>
                                    <i className="fas fa-phone"></i>
                                    <span>+254 714 476 295</span>
                                </li>
                                <li>
                                    <i className="fas fa-envelope"></i>
                                    <span>info@kingdomenlightenment.org</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <div className="footer-bottom-content">
                        <p>&copy; 2024 Kingdom Enlightenment Missions Team. All Rights Reserved.</p>
                        <div className="footer-links">
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
                            <Link to="/login">Admin</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
