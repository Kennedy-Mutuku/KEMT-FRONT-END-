import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    // Hero Slider State
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        { image: '/images/hero-1.jpg', title: 'Welcome to Kingdom Enlightenment', text: 'Spreading the Gospel, Transforming Lives, Building God\'s Kingdom', btn1: { text: 'Learn More', link: '/about' }, btn2: { text: 'Join Us', link: '/contact' } },
        { image: '/images/hero-2.jpg', title: 'Go Into All The World', text: 'And preach the gospel to every creature - Mark 16:15', btn1: { text: 'Our Ministries', link: '/ministries' }, btn2: { text: 'Support Us', link: '/donate' } },
        { image: '/images/hero-3.jpg', title: 'Making Disciples of All Nations', text: 'Teaching them to observe all things - Matthew 28:19-20', btn1: { text: 'Our Programs', link: '/programs' }, btn2: { text: 'Upcoming Events', link: '/events' } }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide(prev => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    const nextSlide = () => setCurrentSlide((currentSlide + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);

    // Testimonials Slider State
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const testimonials = [
        { quote: "Through Kingdom Enlightenment Missions Team, I came to know Jesus Christ as my Lord and Savior. My life has never been the same. Today, I am a pastor leading a congregation of over 200 believers.", author: "Pastor John Kamau", location: "Nakuru County" },
        { quote: "The youth ministry transformed my life completely. I was on the wrong path, but through the mentorship and discipleship programs, I found purpose and direction. Glory to God!", author: "Mary Wanjiku", location: "Nairobi County" },
        { quote: "The community outreach program brought medical services and the Gospel to our village. Many were healed physically and spiritually. We thank God for this ministry.", author: "Chief Joseph Mutua", location: "Machakos County" }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    // Stats Counter logic (simplified for React)
    const [stats, setStats] = useState({ churches: 0, lives: 0, counties: 0, leaders: 0 });
    const statsRef = useRef(null);
    const [statsVisible, setStatsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setStatsVisible(true);
                observer.disconnect();
            }
        });
        if (statsRef.current) observer.observe(statsRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (statsVisible) {
            // Animate stats
            const duration = 2000;
            const steps = 50;
            const stepTime = duration / steps;

            const targets = { churches: 50, lives: 5000, counties: 20, leaders: 200 };
            let currentStep = 0;

            const timer = setInterval(() => {
                currentStep++;
                const progress = currentStep / steps;

                setStats({
                    churches: Math.floor(targets.churches * progress),
                    lives: Math.floor(targets.lives * progress),
                    counties: Math.floor(targets.counties * progress),
                    leaders: Math.floor(targets.leaders * progress)
                });

                if (currentStep >= steps) clearInterval(timer);
            }, stepTime);
        }
    }, [statsVisible]);


    return (
        <main>
            {/* Hero Slider */}
            <section className="hero-slider">
                <div className="slider-container">
                    {slides.map((slide, index) => (
                        <div key={index} className={`slide ${index === currentSlide ? 'active' : ''}`} style={{ backgroundImage: `url(${slide.image})` }}>
                            <div className="slide-overlay"></div>
                            <div className="slide-content">
                                <h2>{slide.title}</h2>
                                <p>{slide.text}</p>
                                <div className="slide-buttons">
                                    <Link to={slide.btn1.link} className="btn btn-primary">{slide.btn1.text}</Link>
                                    <Link to={slide.btn2.link} className="btn btn-secondary">{slide.btn2.text}</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="slider-nav">
                    <button className="slider-prev" onClick={prevSlide}><i className="fas fa-chevron-left"></i></button>
                    <button className="slider-next" onClick={nextSlide}><i className="fas fa-chevron-right"></i></button>
                </div>
                <div className="slider-dots">
                    {slides.map((_, index) => (
                        <div key={index} className={`dot ${index === currentSlide ? 'active' : ''}`} onClick={() => setCurrentSlide(index)}></div>
                    ))}
                </div>
            </section>


            {/* About Section */}
            <section className="about-section section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-subtitle">Who We Are</span>
                        <h2 className="section-title">About Kingdom Enlightenment Missions Team</h2>
                    </div>
                    <div className="about-content">
                        <div className="about-text">
                            <p className="lead">Kingdom Enlightenment Missions Team is a Christ-centered missions organization dedicated to spreading the Gospel of Jesus Christ across Kenya and beyond.</p>
                            <p>Founded on the Great Commission, we are committed to reaching the unreached, discipling believers, and establishing vibrant Christian communities. Our team comprises passionate men and women who have answered God's call to serve in various capacities.</p>
                            <p>We believe in the power of the Gospel to transform lives and communities. Through our various ministries and programs, we seek to bring hope, healing, and the light of Christ to every corner of the land.</p>
                            <div className="about-features">
                                <div className="feature">
                                    <i className="fas fa-bible"></i>
                                    <span>Bible-Based Teaching</span>
                                </div>
                                <div className="feature">
                                    <i className="fas fa-hands-praying"></i>
                                    <span>Prayer Focused</span>
                                </div>
                                <div className="feature">
                                    <i className="fas fa-users"></i>
                                    <span>Community Driven</span>
                                </div>
                            </div>
                            <Link to="/about" className="btn btn-primary">Read More About Us</Link>
                        </div>
                        <div className="about-image">
                            <div className="image-placeholder">
                                <i className="fas fa-image"></i>
                                <span>About Image</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision Mission Section */}
            <section className="vision-mission-section">
                <div className="container">
                    <div className="vm-cards">
                        <div className="vm-card vision-card">
                            <div className="vm-icon">
                                <i className="fas fa-eye"></i>
                            </div>
                            <h3>Our Vision</h3>
                            <p>To see every person in Kenya and beyond encounter the transforming love of Jesus Christ and become a committed disciple who impacts their world for God's Kingdom.</p>
                        </div>
                        <div className="vm-card mission-card">
                            <div className="vm-icon">
                                <i className="fas fa-bullseye"></i>
                            </div>
                            <h3>Our Mission</h3>
                            <p>To glorify God by evangelizing the lost, discipling believers, equipping leaders, and planting churches that reproduce and multiply across nations.</p>
                        </div>
                        <div className="vm-card values-card">
                            <div className="vm-icon">
                                <i className="fas fa-heart"></i>
                            </div>
                            <h3>Our Values</h3>
                            <p>Faith in God, Biblical Authority, Prayer, Excellence, Integrity, Unity, Compassion, and Servant Leadership guide everything we do.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ministries Section */}
            <section className="ministries-section section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-subtitle">What We Do</span>
                        <h2 className="section-title">Our Ministries</h2>
                        <p className="section-description">We serve through various ministries designed to meet the spiritual and physical needs of people at every stage of life.</p>
                    </div>
                    <div className="ministries-grid">
                        <div className="ministry-card">
                            <div className="ministry-icon">
                                <i className="fas fa-globe-africa"></i>
                            </div>
                            <h3>Evangelism & Missions</h3>
                            <p>Reaching the unreached with the Gospel through crusades, door-to-door evangelism, and mission trips to remote areas.</p>
                            <Link to="/ministries#evangelism" className="ministry-link">Learn More <i className="fas fa-arrow-right"></i></Link>
                        </div>
                        <div className="ministry-card">
                            <div className="ministry-icon">
                                <i className="fas fa-book-open"></i>
                            </div>
                            <h3>Discipleship</h3>
                            <p>Building mature believers through systematic Bible study, mentorship programs, and spiritual growth initiatives.</p>
                            <Link to="/ministries#discipleship" className="ministry-link">Learn More <i className="fas fa-arrow-right"></i></Link>
                        </div>
                        <div className="ministry-card">
                            <div className="ministry-icon">
                                <i className="fas fa-child"></i>
                            </div>
                            <h3>Youth Ministry</h3>
                            <p>Empowering young people to know Christ and live purposefully through youth camps, conferences, and mentorship.</p>
                            <Link to="/ministries#youth-ministry" className="ministry-link">Learn More <i className="fas fa-arrow-right"></i></Link>
                        </div>
                        <div className="ministry-card">
                            <div className="ministry-icon">
                                <i className="fas fa-female"></i>
                            </div>
                            <h3>Women Ministry</h3>
                            <p>Equipping women to fulfill their God-given potential through fellowship, teaching, and empowerment programs.</p>
                            <Link to="/ministries#women-ministry" className="ministry-link">Learn More <i className="fas fa-arrow-right"></i></Link>
                        </div>
                        <div className="ministry-card">
                            <div className="ministry-icon">
                                <i className="fas fa-male"></i>
                            </div>
                            <h3>Men Ministry</h3>
                            <p>Building godly men who lead with integrity in their families, churches, and communities.</p>
                            <Link to="/ministries#men-ministry" className="ministry-link">Learn More <i className="fas fa-arrow-right"></i></Link>
                        </div>
                        <div className="ministry-card">
                            <div className="ministry-icon">
                                <i className="fas fa-hand-holding-heart"></i>
                            </div>
                            <h3>Community Outreach</h3>
                            <p>Demonstrating Christ's love through feeding programs, medical camps, education support, and community development.</p>
                            <Link to="/ministries#community-outreach" className="ministry-link">Learn More <i className="fas fa-arrow-right"></i></Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="stats-section" ref={statsRef}>
                <div className="stats-overlay"></div>
                <div className="container">
                    <div className="section-header light">
                        <span className="section-subtitle">Our Impact</span>
                        <h2 className="section-title">The Numbers Speak</h2>
                    </div>
                    <div className="stats-grid">
                        <div className="stat-item">
                            <div className="stat-icon">
                                <i className="fas fa-church"></i>
                            </div>
                            <div className="stat-number">{statsVisible ? stats.churches : 0}</div>
                            <div className="stat-label">Churches Planted</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon">
                                <i className="fas fa-users"></i>
                            </div>
                            <div className="stat-number">{statsVisible ? stats.lives : 0}</div>
                            <div className="stat-label">Lives Transformed</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon">
                                <i className="fas fa-map-marked-alt"></i>
                            </div>
                            <div className="stat-number">{statsVisible ? stats.counties : 0}</div>
                            <div className="stat-label">Counties Reached</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon">
                                <i className="fas fa-graduation-cap"></i>
                            </div>
                            <div className="stat-number">{statsVisible ? stats.leaders : 0}</div>
                            <div className="stat-label">Leaders Trained</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Events Section */}
            <section className="events-section section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-subtitle">Upcoming</span>
                        <h2 className="section-title">Events & Programs</h2>
                        <p className="section-description">Join us for our upcoming events and be part of what God is doing.</p>
                    </div>
                    <div className="events-grid">
                        <div className="event-card">
                            <div className="event-date">
                                <span className="day">15</span>
                                <span className="month">JAN</span>
                            </div>
                            <div className="event-content">
                                <h3>Annual Prayer Conference</h3>
                                <div className="event-meta">
                                    <span><i className="fas fa-clock"></i> 9:00 AM - 5:00 PM</span>
                                    <span><i className="fas fa-map-marker-alt"></i> Main Auditorium</span>
                                </div>
                                <p>A day of intense prayer and intercession for the nation and our ministries.</p>
                                <Link to="/events" className="event-link">Learn More</Link>
                            </div>
                        </div>
                        <div className="event-card">
                            <div className="event-date">
                                <span className="day">22</span>
                                <span className="month">JAN</span>
                            </div>
                            <div className="event-content">
                                <h3>Youth Revival Weekend</h3>
                                <div className="event-meta">
                                    <span><i className="fas fa-clock"></i> Friday - Sunday</span>
                                    <span><i className="fas fa-map-marker-alt"></i> Youth Center</span>
                                </div>
                                <p>A powerful weekend of worship, word, and fellowship for young people.</p>
                                <Link to="/events" className="event-link">Learn More</Link>
                            </div>
                        </div>
                        <div className="event-card">
                            <div className="event-date">
                                <span className="day">05</span>
                                <span className="month">FEB</span>
                            </div>
                            <div className="event-content">
                                <h3>Community Outreach Day</h3>
                                <div className="event-meta">
                                    <span><i className="fas fa-clock"></i> 8:00 AM - 4:00 PM</span>
                                    <span><i className="fas fa-map-marker-alt"></i> Various Locations</span>
                                </div>
                                <p>Join us as we serve our community with food, medical care, and the Gospel.</p>
                                <Link to="/events" className="event-link">Learn More</Link>
                            </div>
                        </div>
                    </div>
                    <div className="events-cta">
                        <Link to="/events" className="btn btn-primary">View All Events</Link>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials-section section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-subtitle">Testimonies</span>
                        <h2 className="section-title">Lives Transformed</h2>
                    </div>
                    <div className="testimonials-slider">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className={`testimonial-card ${index === currentTestimonial ? 'active' : ''}`}>
                                <div className="testimonial-content">
                                    <div className="quote-icon"><i className="fas fa-quote-left"></i></div>
                                    <p>"{testimonial.quote}"</p>
                                </div>
                                <div className="testimonial-author">
                                    <div className="author-image">
                                        <i className="fas fa-user"></i>
                                    </div>
                                    <div className="author-info">
                                        <h4>{testimonial.author}</h4>
                                        <span>{testimonial.location}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="testimonial-dots">
                        {testimonials.map((_, index) => (
                            <div key={index} className={`dot ${index === currentTestimonial ? 'active' : ''}`} onClick={() => setCurrentTestimonial(index)}></div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-content">
                        <h2>Partner With Us In Reaching The Lost</h2>
                        <p>Your prayers and generous giving enable us to continue spreading the Gospel and transforming lives.</p>
                        <div className="cta-buttons">
                            <Link to="/donate" className="btn btn-primary">Give Now</Link>
                            <Link to="/contact" className="btn btn-secondary">Get Involved</Link>
                        </div>
                    </div>
                </div>
            </section>
            {/* Latest News Section - simplified structure */}
            <section className="news-section section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-subtitle">News & Updates</span>
                        <h2 className="section-title">Latest From The Field</h2>
                    </div>
                    <div className="news-grid">
                        <div className="news-card">
                            <div className="news-image">
                                <div className="image-placeholder"><i className="fas fa-image"></i></div>
                                <div className="news-category">Missions</div>
                            </div>
                            <div className="news-content">
                                <div className="news-date">December 10, 2024</div>
                                <h3>Successful Mission Trip to Turkana County</h3>
                                <p>Our team returned from a two-week mission trip to Turkana where over 500 people gave their lives to Christ...</p>
                                <a href="#" className="news-link">Read More <i className="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                        <div className="news-card">
                            <div className="news-image">
                                <div className="image-placeholder"><i className="fas fa-image"></i></div>
                                <div className="news-category">Training</div>
                            </div>
                            <div className="news-content">
                                <div className="news-date">December 5, 2024</div>
                                <h3>Leadership Training Graduation Ceremony</h3>
                                <p>50 new leaders graduated from our intensive leadership training program ready to serve in their communities...</p>
                                <a href="#" className="news-link">Read More <i className="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                        <div className="news-card">
                            <div className="news-image">
                                <div className="image-placeholder"><i className="fas fa-image"></i></div>
                                <div className="news-category">Outreach</div>
                            </div>
                            <div className="news-content">
                                <div className="news-date">November 28, 2024</div>
                                <h3>Medical Camp Serves Over 1,000 People</h3>
                                <p>Our community outreach team organized a free medical camp that served over 1,000 people in rural Kitui...</p>
                                <a href="#" className="news-link">Read More <i className="fas fa-arrow-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;
