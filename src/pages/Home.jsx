import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import CreativeSlider from '../components/CreativeSlider';

// Hero photos
import hero1 from '../assets/Ruanyage1.jpg';
import hero2 from '../assets/Tala mission1.jpg';

// About section photos
import aboutMain from '../assets/Emali mission3.jpg';
import aboutThumb1 from '../assets/Tala mission3.jpg';
import aboutThumb2 from '../assets/Ruanyage5.jpg';

// News card photos
import newsNtakira from '../assets/Gaukene ntakira circuit mission1.jpg';
import newsEmali from '../assets/Emali mission2.jpg';
import newsTala from '../assets/Tala mission2.jpg';

const Home = () => {
    // Testimonials Slider State
    const [currentTestimonial, setCurrentTestimonial] = useState(0);
    const testimonials = [
        { quote: "Through Kingdom Enlightenment Missions Team, I came to know Jesus Christ as my Lord and Savior. My life has never been the same. Today, I am a pastor leading a congregation of over 200 believers.", author: "Pastor John Kamau", location: "Nakuru County", initials: "JK", color: "#e67e22" },
        { quote: "The youth ministry transformed my life completely. I was on the wrong path, but through the mentorship and discipleship programs, I found purpose and direction. Glory to God!", author: "Mary Wanjiku", location: "Nairobi County", initials: "MW", color: "#2980b9" },
        { quote: "The community outreach program brought medical services and the Gospel to our village. Many were healed physically and spiritually. We thank God for this ministry.", author: "Chief Joseph Mutua", location: "Machakos County", initials: "JM", color: "#27ae60" }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    // Stats Counter logic (simplified for React)
    const [stats, setStats] = useState({ souls: 0, missions: 0, counties: 0, schools: 0 });
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

            const targets = { souls: 445, missions: 5, counties: 4, schools: 3 };
            let currentStep = 0;

            const timer = setInterval(() => {
                currentStep++;
                const progress = currentStep / steps;

                setStats({
                    souls: Math.floor(targets.souls * progress),
                    missions: Math.floor(targets.missions * progress),
                    counties: Math.floor(targets.counties * progress),
                    schools: Math.floor(targets.schools * progress)
                });

                if (currentStep >= steps) clearInterval(timer);
            }, stepTime);
        }
    }, [statsVisible]);


    return (
        <main>
            <CreativeSlider />

            {/* Impact Ticker */}
            <div className="impact-ticker">
                <div className="ticker-wrap">
                    <div className="ticker-label">KEMT IMPACT</div>
                    <div className="ticker-track">
                        {[0, 1, 2].map(i => (
                            <React.Fragment key={i}>
                                <div className="ticker-item">MONDAY ONLINE FELLOWSHIPS</div>
                                <div className="ticker-item">MISSIONS</div>
                                <div className="ticker-item">THURSDAY ONLINE PRAYERS</div>
                                <div className="ticker-item">3 MISSIONS PER YEAR</div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

            {/* About Section — Redesigned */}
            <section className="about-section-v2">
                <div className="container">
                    <div className="about-v2-grid">
                        <div className="about-v2-text-side">
                            <div className="about-v2-eyebrow"><span>Who We Are</span></div>
                            <h2 className="about-v2-heading">
                                Carrying the <em>Light of Christ</em><br />Across Kenya &amp; Beyond
                            </h2>
                            <p className="about-v2-desc">
                                Kingdom Enlightenment Missions Team is a Christ-centered missions organization dedicated to spreading the Gospel of Jesus Christ. Founded on the Great Commission, we reach the unreached, disciple believers and establish vibrant Christian communities.
                            </p>
                            <p className="about-v2-desc">
                                Our team comprises passionate men and women who have answered God's call — bringing hope, healing and the light of Christ to every corner of the land through crusades, prayer walks, school missions and compassion outreach.
                            </p>
                            <div className="about-v2-pills">
                                <div className="about-v2-pill"><i className="fas fa-bible"></i> Bible-Based Teaching</div>
                                <div className="about-v2-pill"><i className="fas fa-hands-praying"></i> Prayer Focused</div>
                                <div className="about-v2-pill"><i className="fas fa-users"></i> Community Driven</div>
                            </div>
                            <Link to="/about" className="btn btn-primary">Read More About Us</Link>
                        </div>
                        <div className="about-v2-photo-side">
                            <div className="about-v2-photo-wrap">
                                <div className="about-v2-badge"><strong>445+</strong>Souls<br />Saved</div>
                                <img src={aboutMain} alt="KEMT in the field" className="about-v2-photo-main" />
                                <img src={aboutThumb1} alt="Mission outreach" className="about-v2-photo-accent" />
                                <div className="about-v2-deco-ring"></div>
                                <div className="about-v2-deco-dot"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision / Mission — Redesigned */}
            <section className="vision-mission-v2">
                <div className="container">
                    <div className="vm-v2-header">
                        <p className="vm-v2-verse">"Go into all the world and preach the gospel to all creation." — Mark 16:15</p>
                        <h2 className="vm-v2-title">Our <span>Purpose</span> &amp; Calling</h2>
                    </div>
                    <div className="vm-v2-cards">
                        <div className="vm-v2-card">
                            <span className="vm-v2-num">01</span>
                            <div className="vm-v2-icon"><i className="fas fa-eye"></i></div>
                            <h3>Our Vision</h3>
                            <p>To see every person in Kenya and beyond encounter the transforming love of Jesus Christ and become a committed disciple who impacts their world for God's Kingdom.</p>
                        </div>
                        <div className="vm-v2-card">
                            <span className="vm-v2-num">02</span>
                            <div className="vm-v2-icon"><i className="fas fa-bullseye"></i></div>
                            <h3>Our Mission</h3>
                            <p>To glorify God by evangelizing the lost, discipling believers, equipping leaders and planting churches that reproduce and multiply across nations.</p>
                        </div>
                        <div className="vm-v2-card">
                            <span className="vm-v2-num">03</span>
                            <div className="vm-v2-icon"><i className="fas fa-heart"></i></div>
                            <h3>Our Values</h3>
                            <p>Faith in God, Biblical Authority, Prayer, Excellence, Integrity, Unity, Compassion and Servant Leadership guide everything we do in every mission field.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Ministries — Redesigned */}
            <section className="ministries-v2">
                <div className="container">
                    <div className="section-header">
                        <span className="section-subtitle">What We Do</span>
                        <h2 className="section-title">Our Ministries</h2>
                        <p className="section-description">We serve through various ministries designed to meet the spiritual and physical needs of people at every stage of life.</p>
                    </div>
                    <div className="ministry-v2-grid">
                        {[
                            { icon: 'globe-africa',       title: 'Evangelism & Missions',  desc: 'Reaching the unreached with the Gospel through crusades, door-to-door evangelism and mission trips to remote areas.',                    link: '/ministries#evangelism' },
                            { icon: 'book-open',          title: 'Discipleship',            desc: 'Building mature believers through systematic Bible study, mentorship programs and spiritual growth initiatives.',                          link: '/ministries#discipleship' },
                            { icon: 'child',              title: 'Youth Ministry',          desc: 'Empowering young people to know Christ and live purposefully through youth camps, conferences and mentorship.',                            link: '/ministries#youth-ministry' },
                            { icon: 'female',             title: 'Women Ministry',          desc: 'Equipping women to fulfill their God-given potential through fellowship, teaching and empowerment programs.',                              link: '/ministries#women-ministry' },
                            { icon: 'male',               title: 'Men Ministry',            desc: 'Building godly men who lead with integrity in their families, churches and communities through targeted discipleship.',                    link: '/ministries#men-ministry' },
                            { icon: 'hand-holding-heart', title: 'Community Outreach',      desc: 'Demonstrating Christ\'s love through feeding programs, medical camps, education support and community development.',                      link: '/ministries#community-outreach' },
                        ].map((m, i) => (
                            <div className="ministry-v2-card" key={i}>
                                <div className="ministry-v2-icon-wrap">
                                    <i className={`fas fa-${m.icon}`}></i>
                                </div>
                                <h3>{m.title}</h3>
                                <p>{m.desc}</p>
                                <Link to={m.link} className="ministry-v2-link">Learn More <i className="fas fa-arrow-right"></i></Link>
                            </div>
                        ))}
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
                                <i className="fas fa-heart"></i>
                            </div>
                            <div className="stat-number">
                                {statsVisible ? stats.souls : 0}
                                {statsVisible && stats.souls >= 445 ? '+' : ''}
                            </div>
                            <div className="stat-label">Souls Won to Christ</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-icon">
                                <i className="fas fa-globe-africa"></i>
                            </div>
                            <div className="stat-number">{statsVisible ? stats.missions : 0}</div>
                            <div className="stat-label">Mission Trips</div>
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
                            <div className="stat-number">{statsVisible ? stats.schools : 0}</div>
                            <div className="stat-label">Schools Ministered</div>
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
                                <p>A powerful weekend of worship, word and fellowship for young people.</p>
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
                                <p>Join us as we serve our community with food, medical care and the Gospel.</p>
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
                                    <div className="author-image" style={{ background: `linear-gradient(135deg, ${testimonial.color}dd, ${testimonial.color}99)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '1.1rem', fontFamily: 'Poppins, sans-serif', letterSpacing: '0.5px' }}>
                                        {testimonial.initials}
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
                                <img src={newsNtakira} alt="Ntakira Mission" />
                                <div className="news-category">Missions</div>
                            </div>
                            <div className="news-content">
                                <div className="news-date">August 2026 — Meru</div>
                                <h3>Ntakira Mission: Carrying the Gospel to Meru</h3>
                                <p>The Ntakira mission brought the Gospel through crusades, revivals, street evangelism and youth mentorship at Methodist Church of Kenya, Ntakira Parish.</p>
                                <Link to="/programs" className="news-link">Read More <i className="fas fa-arrow-right"></i></Link>
                            </div>
                        </div>
                        <div className="news-card">
                            <div className="news-image">
                                <img src={newsEmali} alt="Emali Mission" />
                                <div className="news-category">Outreach</div>
                            </div>
                            <div className="news-content">
                                <div className="news-date">August 2026 — Makueni &amp; Kajiado</div>
                                <h3>Emali Mission: 76 Souls Give Their Lives to Christ</h3>
                                <p>The Emali mission at Methodist Church of Kenya saw 76 people surrender their lives to Christ through evangelism, prayer walks, crusades and compassion outreach.</p>
                                <Link to="/programs" className="news-link">Read More <i className="fas fa-arrow-right"></i></Link>
                            </div>
                        </div>
                        <div className="news-card">
                            <div className="news-image">
                                <img src={newsTala} alt="Tala Mission" />
                                <div className="news-category">Missions</div>
                            </div>
                            <div className="news-content">
                                <div className="news-date">April 2026 — Machakos</div>
                                <h3>Tala Mission: 170 Souls Saved in Machakos</h3>
                                <p>Liberty Church, Tala hosted a powerful week-long outreach that saw 170 people come to Christ through street evangelism, prayer walks, crusades and youth workshops.</p>
                                <Link to="/programs" className="news-link">Read More <i className="fas fa-arrow-right"></i></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Home;
