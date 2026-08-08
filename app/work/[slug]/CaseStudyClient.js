'use client';

import Link from 'next/link';
import { useEffect } from 'react';

const WHATSAPP_URL = 'https://wa.me/919140588807?text=' + encodeURIComponent("Hi Risha! I found your portfolio and I'd like to discuss a website project.");

export default function CaseStudyClient({ project, prev, next }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    // Scroll reveal
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
  }, [project.id]);

  return (
    <div className="case-study-page">
      {/* NAV */}
      <nav className="nav scrolled" id="caseStudyNav">
        <Link href="/" className="nav-logo">RISHA<sup>®</sup></Link>
        <ul className="nav-links">
          <li><Link href="/#work">WORK</Link></li>
          <li><Link href="/#services">SERVICES</Link></li>
          <li><Link href="/#about">ABOUT</Link></li>
          <li><Link href="/#process">PROCESS</Link></li>
        </ul>
        <Link href="/#contact" className="nav-cta">START A PROJECT <span className="arrow">↗</span></Link>
      </nav>

      {/* HERO */}
      <div className="case-study-hero">
        <Link href="/#work" className="case-study-back reveal">← BACK TO SELECTED WORK</Link>

        <div className="case-study-number reveal">{project.number}</div>
        <h1 className="case-study-title reveal">{project.name}</h1>
        <div className="case-study-category reveal">{project.category}</div>

        {project.tags && (
          <div className="case-study-tags reveal">
            {project.tags.map((tag, i) => (
              <span key={i} className="case-study-tag">{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* IMAGE */}
      <div className="case-study-image-wrap reveal">
        <img src={project.image} alt={`${project.name} — ${project.category}`} />
      </div>

      {/* CONTENT */}
      <div className="case-study-content">
        <div className="case-study-section reveal">
          <div className="case-study-label">OVERVIEW</div>
          <p className="case-study-text">{project.overview}</p>
        </div>
        <div className="case-study-section reveal">
          <div className="case-study-label">ROLE</div>
          <p className="case-study-text">{project.role}</p>
        </div>
        <div className="case-study-section reveal">
          <div className="case-study-label">DESIGN APPROACH</div>
          <p className="case-study-text">{project.approach}</p>
        </div>
        <div className="case-study-section reveal">
          <div className="case-study-label">TOOLS / TECHNOLOGY</div>
          <p className="case-study-text">{project.tools}</p>
        </div>
      </div>

      {/* CTAs */}
      <div className="case-study-ctas reveal">
        <Link href="/#contact" className="btn-primary">START A PROJECT <span className="arrow">↗</span></Link>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost">CHAT ON WHATSAPP <span className="arrow">↗</span></a>
      </div>

      {/* NAV */}
      <div className="case-study-nav">
        {prev ? (
          <Link href={`/work/${prev.id}`} className="case-study-nav-link">← PREVIOUS PROJECT</Link>
        ) : (
          <span className="case-study-nav-link disabled">← PREVIOUS PROJECT</span>
        )}
        <Link href="/#work" className="case-study-nav-center">BACK TO SELECTED WORK</Link>
        {next ? (
          <Link href={`/work/${next.id}`} className="case-study-nav-link">NEXT PROJECT →</Link>
        ) : (
          <span className="case-study-nav-link disabled">NEXT PROJECT →</span>
        )}
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
