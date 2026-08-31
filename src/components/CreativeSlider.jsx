import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './CreativeSlider.css';

import hero1 from '../assets/Ruanyage1.jpg';
import hero2 from '../assets/Tala mission1.jpg';
import hero3 from '../assets/Emali mission3.jpg'; 
import newsTala from '../assets/Tala mission2.jpg';
import handsTogether from '../assets/HANDS TOGETHER.jpg';

const slides = [
  {
    image: hero1,
    subtitle: "Welcome to",
    title: "KINGDOM ENLIGHTENMENT",
    text: "Spreading the Gospel, Transforming Lives, Building God's Kingdom",
    btn1: { text: "Learn More", link: "/about" },
    btn2: { text: "Join Us", link: "/contact" }
  },
  {
    image: hero2,
    subtitle: "Mark 16:15",
    title: "GO INTO ALL THE WORLD",
    text: "And preach the gospel to every creature.",
    btn1: { text: "Our Departments", link: "/ministries" },
    btn2: { text: "Support Us", link: "/donate" }
  },
  {
    image: hero3,
    subtitle: "Compassion Outreach",
    title: "TOUCHING LIVES",
    text: "Demonstrating Christ's love through feeding programs, medical camps, and community support.",
    btn1: { text: "Our Impact", link: "/about" },
    btn2: { text: "Get Involved", link: "/contact" }
  },
  {
    image: newsTala,
    subtitle: "Community Focus",
    title: "TRANSFORMING REGIONS",
    text: "Bringing hope and tangible assistance to marginalized communities.",
    btn1: { text: "Our Work", link: "/ministries" },
    btn2: { text: "Donate", link: "/donate" }
  }
];

const CreativeSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  // Touch variables
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000); 
    return () => clearInterval(interval);
  }, []); // Run constantly

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 75) {
      // Swipe left - next slide
      nextSlide();
    }
    if (touchStartX.current - touchEndX.current < -75) {
      // Swipe right - prev slide
      prevSlide();
    }
  };

  const finger1Img = slides[currentSlide].image;
  const finger2Img = slides[(currentSlide + 1) % slides.length].image;
  const finger3Img = slides[(currentSlide + 2) % slides.length].image;

  return (
    <section 
      className="creative-hero"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Dynamic Background Image (Full screen, but covered on the right) */}
      {slides.map((slide, index) => (
        <div 
          key={index} 
          className={`creative-bg-image ${index === currentSlide ? 'active' : ''}`}
        >
          <div 
            className="ken-burns-img"
            style={{ backgroundImage: `url(${slide.image})` }}
          ></div>
          <div className="bg-overlay"></div>
        </div>
      ))}

      {/* Static Background Image (Right half with diagonal split) */}
      <div className="creative-bg-right">
        <div 
          className="bg-right-img"
          style={{ backgroundImage: `url(${handsTogether})` }}
        ></div>
        <div className="bg-right-overlay"></div>
      </div>

      <div className="creative-container">
        {/* Left Side: Text Content */}
        <div className="creative-text-col">
          <div className="text-wrapper">
            {slides.map((slide, index) => (
              <div 
                key={index} 
                className={`text-slide ${index === currentSlide ? 'active' : ''}`}
              >
                <span className="slide-subtitle">{slide.subtitle}</span>
                <h1 className="slide-title">{slide.title}</h1>
                <p className="slide-desc">{slide.text}</p>
                <div className="slide-actions">
                  <Link to={slide.btn1.link} className="btn-modern-primary">{slide.btn1.text}</Link>
                  <Link to={slide.btn2.link} className="btn-modern-outline">
                    {slide.btn2.text}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="slider-controls-modern">
            <button className="ctrl-btn prev" onClick={prevSlide}>
               <i className="fas fa-chevron-left"></i>
            </button>
            <div className="dots-modern">
              {slides.map((_, i) => (
                <div 
                  key={i} 
                  className={`dot-m ${i === currentSlide ? 'active' : ''}`}
                  onClick={() => {
                    if (!isTransitioning) {
                      setCurrentSlide(i);
                    }
                  }}
                >
                  <div className="dot-progress"></div>
                </div>
              ))}
            </div>
            <button className="ctrl-btn next" onClick={nextSlide}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Right Side: The Visual "Fingers" Queue (Centered in the right half of screen) */}
      <div className="fingers-container">
        {/* Finger 1 */}
        <div className="finger finger-1">
          <div className="finger-img" key={finger1Img} style={{ backgroundImage: `url(${finger1Img})` }}></div>
        </div>
        {/* Finger 2 */}
        <div className="finger finger-2">
          <div className="finger-img" key={finger2Img} style={{ backgroundImage: `url(${finger2Img})` }}></div>
        </div>
        {/* Finger 3 */}
        <div className="finger finger-3">
          <div className="finger-img" key={finger3Img} style={{ backgroundImage: `url(${finger3Img})` }}></div>
        </div>
      </div>
    </section>
  );
};

export default CreativeSlider;
