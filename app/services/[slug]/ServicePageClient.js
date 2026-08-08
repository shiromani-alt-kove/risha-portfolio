'use client';

import Link from 'next/link';
import { useEffect } from 'react';

const WHATSAPP_URL = 'https://wa.me/919140588807?text=' + encodeURIComponent("Hi Risha! I found your portfolio and I'd like to discuss a website project.");

export default function ServicePageClient({ service }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [service.id]);

  return (
    <div className="service-page">
      {/* NAV */}
      <nav className="nav scrolled" id="servicePageNav">
        <Link href="/" className="nav-logo">RISHA<sup>®</sup></Link>
        <ul className="nav-links">
          <li><Link href="/#work">WORK</Link></li>
          <li><Link href="/#services">SERVICES</Link></li>
          <li><Link href="/#about">ABOUT</Link></li>
          <li><Link href="/#process">PROCESS</Link></li>
        </ul>
        <Link href="/#contact" className="nav-cta">START A PROJECT <span className="arrow">↗</span></Link>
      </nav>

      <div className="service-page-inner">
        <Link href="/#services" className="case-study-back reveal">← BACK TO SERVICES</Link>

        <div className="service-page-number reveal">{service.number} — SERVICE</div>
        <h1 className="service-page-title reveal">{service.name}</h1>
        <p className="service-page-desc reveal">{service.description}</p>

        <div className="service-page-section reveal">
          <div className="service-page-label">WHAT&apos;S INCLUDED</div>
          <ul className="service-page-list">
            {service.includes.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="service-page-section reveal">
          <div className="service-page-label">BEST FOR</div>
          <p className="service-page-best">{service.bestFor}</p>
        </div>

        <div className="service-page-ctas reveal">
          <Link href="/#contact" className="btn-primary">{service.cta} <span className="arrow">↗</span></Link>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost">CHAT ON WHATSAPP <span className="arrow">↗</span></a>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand-col">
            <Link href="/" className="footer-brand">RISHA<sup>®</sup></Link>
            <div className="footer-brand-sub">WEB DESIGNER</div>
          </div>
          <ul className="footer-links">
            <li><Link href="/#work">WORK</Link></li>
            <li><Link href="/#services">SERVICES</Link></li>
            <li><Link href="/#about">ABOUT</Link></li>
            <li><Link href="/#contact">CONTACT</Link></li>
          </ul>
          <div className="footer-copy">© 2026 RISHA SINGH. ALL RIGHTS RESERVED.</div>
        </div>
      </footer>
    </div>
  );
}
