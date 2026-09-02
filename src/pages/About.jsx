import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import bannerPhoto from '../assets/Ruanyage2.jpg';
import storyPhoto1 from '../assets/Tala mission6.jpg';
import storyPhoto2 from '../assets/Emali mission6.jpg';
import storyPhoto3 from '../assets/Ruanyage7.jpg';

const values = [
  { icon: 'fas fa-bible',          label: 'Biblical Authority',  desc: 'Everything we do is rooted in and guided by the Word of God.' },
  { icon: 'fas fa-hands-praying',  label: 'Prayer',              desc: 'We seek God in prayer before and throughout every mission.' },
  { icon: 'fas fa-heart',          label: 'Compassion',          desc: 'We meet people at their point of need with the love of Christ.' },
  { icon: 'fas fa-star',           label: 'Excellence',          desc: 'We give our best to God in everything we do.' },
  { icon: 'fas fa-handshake',      label: 'Integrity',           desc: 'We uphold honesty and transparency in all our dealings.' },
  { icon: 'fas fa-users',          label: 'Unity',               desc: 'We work together as one body, honouring and serving one another.' },
];

const faith = [
  'We believe in one God, eternally existing in three Persons: Father, Son and Holy Spirit.',
  'We believe in the full inspiration and authority of the Holy Scriptures as the Word of God.',
  'We believe in the deity and humanity of Jesus Christ, His virgin birth, sinless life, atoning death, bodily resurrection and imminent return.',
  'We believe in salvation by grace through faith in Jesus Christ alone.',
  'We believe in the present ministry of the Holy Spirit, by whose indwelling the Christian is enabled to live a godly life.',
  'We believe in the resurrection of the dead and the eternal life of believers with God.',
  'We believe in the Great Commission — the call to make disciples of all nations.',
];

const timeline = [
  {
    date: 'Late 2024',
    icon: 'fas fa-users',
    title: 'Commission 2024 Conference',
    text: 'At the Commission 2024 Conference hosted by Focus Kenya at Kabarak University, the burden to reach the unreached and disciple nations was powerfully ignited in our hearts.',
  },
  {
    date: 'Early 2025',
    icon: 'fas fa-video',
    title: 'Humble Beginnings at Kisii University',
    text: 'The foundational steps began while Vincent Mwenda (Founder and Director) and Kennedy Mutuku (Head of Digital Infrastructure) were students at Kisii University. They started by shooting evangelism clips in Kennedy\'s house, inviting fellow students to discuss different biblical topics, and uploading them to Kingdom Enlightenment platforms.',
  },
  {
    date: '15th March 2025',
    icon: 'fas fa-mountain',
    title: 'Vision Confirmed at Karlo Prayer Mountain',
    text: 'Seeking clearer direction, Vincent and Kennedy dedicated time for prayer and fasting at Karlo Prayer Mountain. Following this profound spiritual encounter, the vision was fully confirmed and Kingdom Enlightenment Ministries was officially started to fulfill the Great Commission.',
  },
  {
    date: 'Ongoing from 2025',
    icon: 'fas fa-book-open',
    title: 'Monday Online Bible Study Fellowships',
    text: 'Regular Monday online Bible study fellowships nurtured spiritual growth, unity, prayer and a passion for evangelism — becoming a training ground that prepared the team for active mission work.',
  },
  {
    date: '18–24 August 2025',
    icon: 'fas fa-globe-africa',
    title: 'First Mission — Rwanyange, Meru County',
    text: 'The team held its very first field mission outreach at East Africa Pentecostal Church in Rwanyange, the home church of our founder, Vincent Mwenda. This milestone confirmed God\'s call upon the team and marked a powerful beginning to our field ministry.',
    souls: '145 Souls Won',
  },
  {
    date: '29 Dec 2025 – 4 Jan 2026',
    icon: 'fas fa-globe-africa',
    title: 'Second Mission — Gikumene, Meru County',
    text: 'At Deliverance Church International, Gikumene, we witnessed God\'s faithfulness through transformed lives, renewed faith and the continued advancement of the Gospel.',
    souls: '130 Souls Won',
  },
  {
    date: '20–26 April 2026',
    icon: 'fas fa-globe-africa',
    title: 'Tala Mission — Machakos County',
    text: 'The team ministered at Liberty Center, Tala, carrying the Gospel through evangelism, outreach, prayer and community engagement.',
    souls: '170 Souls Won',
  },
  {
    date: '10–16 August 2026',
    icon: 'fas fa-globe-africa',
    title: 'Emali Mission — Makueni & Kajiado',
    text: 'The team held a mission at Methodist Church of Kenya, Emali Town, reaching the community with the Gospel of Christ and demonstrating God\'s love through ministry and compassion.',
    souls: '76 Souls Won',
  },
  {
    date: '20–23 August 2026',
    icon: 'fas fa-globe-africa',
    title: 'Gaukene Mission — MCK Ntakira Circuit',
    text: 'The team continued its mission journey in Gaukene under the Methodist Church of Kenya Ntakira Circuit, proclaiming Christ, reaching communities and calling people to faith and transformation.',
  },
];

const About = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const timer = setTimeout(() => {
      const el = document.querySelector(hash);
      if (!el) return;
      const headerHeight = document.querySelector('.site-header-wrapper')?.offsetHeight || 80;
      const top = el.getBoundingClientRect().top + window.pageYOffset - headerHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    }, 120);
    return () => clearTimeout(timer);
  }, [hash]);

  return (
    <main className="about-page">

      {/* Banner */}
      <section className="page-banner" style={{ backgroundImage: `url(${bannerPhoto})` }}>
        <div className="banner-overlay"></div>
        <div className="container">
          <div className="banner-content">
            <span className="banner-tag">Who We Are</span>
            <h1>About KEMT</h1>
            <p>A Christ-centred team carrying the light of the Gospel to every community we enter.</p>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section id="who-we-are" className="section about-intro-section">
        <div className="container">
          <div className="dept-grid">
            <div className="dept-content">
              <span className="section-subtitle">Who We Are</span>
              <h2 className="section-title">Kingdom Enlightenment Missions Team</h2>
              <p className="lead">
                Kingdom Enlightenment Missions Team (KEMT) is a Christ-centred missions organisation
                dedicated to spreading the Gospel of Jesus Christ across Kenya and beyond.
              </p>
              <p>
                Founded on 22nd January 2025 by Vincent Mwenda following a divine calling to obey
                the Great Commission, KEMT began with fewer than 15 missionaries united by faith and
                a shared passion for the Gospel. From this small, humble beginning, the Lord has
                continued to grow and strengthen the ministry.
              </p>
              <p>
                We believe in the power of the Gospel to transform lives and communities. Through
                our departments and mission outreaches, we bring hope, healing and the light of
                Christ, reaching schools, churches, towns and villages across Kenya.
              </p>
              <div className="about-quick-stats">
                <div className="aq-stat"><strong>445+</strong><span>Souls Won</span></div>
                <div className="aq-stat"><strong>5</strong><span>Mission Trips</span></div>
                <div className="aq-stat"><strong>7</strong><span>Counties in Kenya</span></div>
                <div className="aq-stat"><strong>8</strong><span>Schools</span></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Our History — Timeline */}
      <section id="our-history" className="history-section">
        <div className="container">
          <div className="history-intro">
            <div className="section-header">
              <span className="section-subtitle">Our Story</span>
              <h2 className="section-title">Our History</h2>
            </div>
            <p>
              From a divine calling at a university conference to mission fields across Kenya, 
              this is the story of how God has led Kingdom Enlightenment Missions Team from humble
              beginnings to a growing movement for His glory.
            </p>
          </div>

          <div className="history-compact-list">
            {timeline.map((item, i) => (
              <div className="history-compact-item" key={i}>
                <div className="hc-date"><i className="fas fa-calendar-alt"></i> {item.date}</div>
                <div className="hc-content">
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                  {item.souls && <div className="hc-souls"><i className="fas fa-heart"></i> {item.souls}</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Mission Values */}
      <section id="vision-mission" className="vision-mission-section">
        <div className="container">
          <div className="vm-compact-list">
            <div className="vm-compact-item">
              <h3>Our Vision</h3>
              <p>To see every person in Kenya and beyond encounter the transforming love of Jesus Christ and become a committed disciple who impacts their world for God's Kingdom.</p>
            </div>
            <div className="vm-compact-item">
              <h3>Our Mission</h3>
              <p>To glorify God by evangelizing the lost, discipling believers, equipping leaders and establishing communities of faith that reproduce and multiply across nations.</p>
            </div>
            <div className="vm-compact-item">
              <h3>Our Mandate</h3>
              <p>The Great Commission — Go into all the world, preach the Gospel, make disciples of all nations, baptizing them and teaching them to observe all that Christ commanded. Matthew 28:19-20.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section values-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">What Drives Us</span>
            <h2 className="section-title">Our Core Values</h2>
          </div>
          <div className="values-compact-list">
            {values.map((v, i) => (
              <div className="value-compact-item" key={i}>
                <h4><i className={v.icon}></i> {v.label}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statement of Faith */}
      <section id="statement-of-faith" className="section faith-section">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">What We Believe</span>
            <h2 className="section-title">Statement of Faith</h2>
          </div>
          <div className="faith-list">
            {faith.map((point, i) => (
              <div className="faith-item" key={i}>
                <div className="faith-num">{String(i + 1).padStart(2, '0')}</div>
                <p>{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Join Us in This Mission</h2>
            <p>Whether through prayer, giving, or going — there is a place for you in what God is doing through KEMT.</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">Get in Touch</Link>
              <Link to="/donate" className="btn btn-secondary">Support Us</Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default About;
