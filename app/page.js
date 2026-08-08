'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { projects } from '@/lib/projects';
import { services } from '@/lib/services';

const WHATSAPP_URL = 'https://wa.me/919140588807?text=' + encodeURIComponent("Hi Risha! I found your portfolio and I'd like to discuss a website project.");

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const [heroEntered, setHeroEntered] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Modal states
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [serviceDrawerOpen, setServiceDrawerOpen] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  // Form states
  const [formState, setFormState] = useState('idle'); // idle | submitting | success | error
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: '', email: '', whatsapp: '', service: '',
    details: '', budget: '', timeline: '',
  });

  // Refs
  const heroRef = useRef(null);
  const heroBgRef = useRef(null);
  const heroBg2Ref = useRef(null);
  const portraitRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const cursorTextRef = useRef(null);
  const projectOverlayRef = useRef(null);
  const processLineRef = useRef(null);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Loader sequence
  useEffect(() => {
    const t1 = setTimeout(() => setLoaded(true), 1800);
    const t2 = setTimeout(() => setHeroEntered(true), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // Scroll reveal
  useEffect(() => {
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
  }, []);

  // Process timeline
  useEffect(() => {
    const steps = document.querySelectorAll('.process-step');
    const fill = processLineRef.current;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
      let count = 0;
      steps.forEach((s, i) => { if (s.classList.contains('active')) count = i + 1; });
      if (fill && count > 0) fill.style.height = `${(count / steps.length) * 100}%`;
    }, { threshold: 0.5, rootMargin: '-10% 0px -10% 0px' });
    steps.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Scroll parallax
  useEffect(() => {
    if (isMobile) return;
    let ticking = false;
    const onScroll = () => {
      const scroll = window.scrollY;
      const bg1 = heroBgRef.current;
      const bg2 = heroBg2Ref.current;
      const portrait = portraitRef.current;
      if (bg1) bg1.style.transform = `translate(calc(-50% + ${scroll * 0.09}px), calc(-50% + ${scroll * 0.15}px))`;
      if (bg2) bg2.style.transform = `translate(calc(-50% - ${scroll * 0.045}px), calc(-50% + ${scroll * 0.075}px))`;
      if (portrait) portrait.style.transform = `translateX(-50%) translateY(${scroll * 0.08}px)`;

      // Nav scroll
      const nav = document.getElementById('mainNav');
      if (nav) {
        if (scroll > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
      }
      ticking = false;
    };
    const handler = () => { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [isMobile]);

  // Custom cursor
  useEffect(() => {
    if (isMobile) return;
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    const text = cursorTextRef.current;
    if (!dot || !ring) return;
    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let ringX = mouseX, ringY = mouseY;
    let hovering = false;

    const onMouseMove = (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      if (hovering && text) text.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };
    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      requestAnimationFrame(animate);
    };
    document.addEventListener('mousemove', onMouseMove);
    requestAnimationFrame(animate);

    const cursorEls = document.querySelectorAll('[data-cursor]');
    cursorEls.forEach(el => {
      el.addEventListener('mouseenter', (e) => {
        hovering = true;
        ring.classList.add('hover');
        if (text) { text.classList.add('active'); text.innerText = e.target.closest('[data-cursor]')?.getAttribute('data-cursor') || ''; }
      });
      el.addEventListener('mouseleave', () => {
        hovering = false;
        ring.classList.remove('hover');
        if (text) text.classList.remove('active');
      });
    });

    return () => document.removeEventListener('mousemove', onMouseMove);
  }, [isMobile, loaded]);

  // Hero mouse parallax
  useEffect(() => {
    if (isMobile) return;
    const hero = heroRef.current;
    if (!hero) return;
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      const scroll = window.scrollY;
      const bg1 = heroBgRef.current;
      const bg2 = heroBg2Ref.current;
      const portrait = portraitRef.current;
      requestAnimationFrame(() => {
        if (bg1) bg1.style.transform = `translate(calc(-50% + ${scroll * 0.09 + x * 12}px), calc(-50% + ${scroll * 0.15 + y * 12}px))`;
        if (bg2) bg2.style.transform = `translate(calc(-50% + ${-scroll * 0.045 + x * 8}px), calc(-50% + ${scroll * 0.075 + y * 8}px))`;
        if (portrait) portrait.style.transform = `translateX(calc(-50% + ${x * 4}px)) translateY(${scroll * 0.08 + y * 4}px)`;
      });
    };
    hero.addEventListener('mousemove', onMove);
    return () => hero.removeEventListener('mousemove', onMove);
  }, [isMobile]);

  // Project image glow
  useEffect(() => {
    if (isMobile) return;
    document.querySelectorAll('.project-image-wrap').forEach(wrap => {
      wrap.addEventListener('mousemove', (e) => {
        const rect = wrap.getBoundingClientRect();
        wrap.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        wrap.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });
    });
  }, [isMobile]);

  // Magnetic buttons
  useEffect(() => {
    if (isMobile) return;
    document.querySelectorAll('.magnetic').forEach(btn => {
      const move = (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
      };
      const leave = () => { btn.style.transform = 'translate(0, 0)'; };
      btn.addEventListener('mousemove', move);
      btn.addEventListener('mouseleave', leave);
    });
  }, [isMobile]);

  // Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (inquiryOpen) setInquiryOpen(false);
        if (serviceDrawerOpen) { setServiceDrawerOpen(false); setActiveService(null); }
        if (projectModalOpen) setProjectModalOpen(false);
        if (menuOpen) setMenuOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [inquiryOpen, serviceDrawerOpen, projectModalOpen, menuOpen]);

  // Body scroll lock
  useEffect(() => {
    if (inquiryOpen || serviceDrawerOpen || projectModalOpen || menuOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [inquiryOpen, serviceDrawerOpen, projectModalOpen, menuOpen]);

  // Smooth scroll
  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Open inquiry
  const openInquiry = useCallback(() => {
    setFormState('idle');
    setFormErrors({});
    setInquiryOpen(true);
  }, []);

  // Service drawer
  const openService = useCallback((serviceId) => {
    const svc = services.find(s => s.id === serviceId);
    if (svc) { setActiveService(svc); setServiceDrawerOpen(true); }
  }, []);

  // Project detail
  const openProject = useCallback((index) => {
    setActiveProjectIndex(index);
    setProjectModalOpen(true);
    setTimeout(() => { if (projectOverlayRef.current) projectOverlayRef.current.scrollTop = 0; }, 10);
  }, []);

  // Form handling
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Please enter your name.';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Please enter a valid email.';
    if (!formData.service) errors.service = 'Please select a service.';
    if (!formData.details.trim() || formData.details.trim().length < 10) errors.details = 'Please describe your project.';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
    setFormState('submitting');
    setFormErrors({});
    try {
      const res = await fetch('https://formspree.io/f/meajekvr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.whatsapp,
          service: formData.service,
          description: formData.details,
          budget: formData.budget,
          timeline: formData.timeline,
        }),
      });
      if (res.ok) {
        setFormState('success');
        setFormData({ name: '', email: '', whatsapp: '', service: '', details: '', budget: '', timeline: '' });
      } else {
        setFormState('error');
      }
    } catch {
      setFormState('error');
    }
  };

  const activeProject = projects[activeProjectIndex];

  return (
    <>
      {/* LOADER */}
      <div className={`loader ${loaded ? 'loaded' : ''}`} id="loader">
        <div className="loader-content">
          <div className="loader-mark">RISHA SINGH</div>
          <div className="loader-sub">WEB DESIGNER</div>
          <div className="loader-line"><div className="loader-line-fill"></div></div>
        </div>
      </div>

      {/* CURSOR */}
      <div className="cursor-dot" ref={cursorDotRef}></div>
      <div className="cursor-ring" ref={cursorRingRef}></div>
      <div className="cursor-text" ref={cursorTextRef}></div>

      {/* NAV */}
      <nav className="nav" id="mainNav">
        <a href="#hero" className="nav-logo" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>RISHA<sup>®</sup></a>
        <button className={`nav-hamburger ${menuOpen ? 'active' : ''}`} aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span><span></span>
        </button>
        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li><a href="#work" onClick={(e) => { e.preventDefault(); scrollTo('work'); setMenuOpen(false); }}>WORK</a></li>
          <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); setMenuOpen(false); }}>SERVICES</a></li>
          <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); setMenuOpen(false); }}>ABOUT</a></li>
          <li><a href="#process" onClick={(e) => { e.preventDefault(); scrollTo('process'); setMenuOpen(false); }}>PROCESS</a></li>
        </ul>
        <a href="#" className="nav-cta" onClick={(e) => { e.preventDefault(); openInquiry(); }}>START A PROJECT <span className="arrow">↗</span></a>
      </nav>

      {/* HERO */}
      <section className="hero" id="hero" ref={heroRef}>
        <div className={`hero-bg-text ${heroEntered ? 'entered' : ''}`} ref={heroBgRef}>RISHA</div>
        <div className={`hero-bg-text hero-bg-text-2 ${heroEntered ? 'entered' : ''}`} ref={heroBg2Ref}>DESIGN</div>
        <div className="hero-ambient hero-ambient-1"></div>
        <div className="hero-ambient hero-ambient-2"></div>
        <img className={`hero-portrait ${heroEntered ? 'entered' : ''}`} ref={portraitRef} src="/assets/risha-portrait.jpg" alt="Risha Singh — Web Designer" />
        <div className={`hero-content ${heroEntered ? 'entered' : ''}`}>
          <div className="hero-label"><span>RISHA SINGH</span><span className="hero-label-sep">—</span><span>WEB DESIGNER</span></div>
          <h1 className="hero-title">I design websites that<br /><em>turn visitors into customers.</em></h1>
          <div className="hero-cta-group">
            <a href="#" className="btn-primary magnetic" data-cursor="START ↗" onClick={(e) => { e.preventDefault(); openInquiry(); }}>START A PROJECT <span className="arrow">↗</span></a>
            <a href="#work" className="btn-ghost" onClick={(e) => { e.preventDefault(); scrollTo('work'); }}>VIEW MY WORK <span className="arrow">↗</span></a>
          </div>
        </div>
        <div className={`hero-info-right ${heroEntered ? 'entered' : ''}`}>
          <div className="hero-status"><span className="status-dot"></span>AVAILABLE FOR PROJECTS</div>
        </div>
        <div className={`hero-scroll-indicator ${heroEntered ? 'entered' : ''}`}>
          <span>SCROLL</span><div className="scroll-line"></div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section" id="about">
        <div className="section-inner">
          <div className="section-label reveal">01 — ABOUT</div>
          <h2 className="section-heading reveal">Design<br /><em>with</em><br />Purpose.</h2>
          <div className="about-content">
            <div className="about-text reveal">
              <p>I design thoughtful digital experiences that combine strong visual direction, usability and conversion-focused thinking.</p>
            </div>
            <div className="about-stats reveal reveal-delay-1">
              <div className="about-stat"><div className="about-stat-number">5+</div><div className="about-stat-label">Years Experience</div></div>
              <div className="about-stat"><div className="about-stat-number">50+</div><div className="about-stat-label">Projects Delivered</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section" id="services">
        <div className="section-inner">
          <div className="section-label reveal">02 — SERVICES</div>
          <h2 className="section-heading reveal">What I<br /><em>Create.</em></h2>
          <div className="services-list">
            {services.map((svc, i) => (
              <div key={svc.id} className={`service-row reveal ${i > 0 ? `reveal-delay-${Math.min(i, 3)}` : ''}`} data-cursor="VIEW ↗" onClick={() => openService(svc.id)}>
                <span className="service-number">{svc.number}</span>
                <span className="service-name">{svc.name}</span>
                <span className="service-arrow">↗</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section className="section section-work" id="work">
        <div className="section-inner">
          <div className="section-label reveal">03 — SELECTED WORK</div>
          <h2 className="section-heading reveal">Selected<br /><em>Projects.</em></h2>
          {projects.map((project, i) => (
            <div key={project.id} className="project-item reveal" data-project={i}>
              <div className="project-image-wrap" data-cursor="VIEW ↗" onClick={() => openProject(i)} style={{ cursor: 'pointer' }}>
                <img className="project-image" src={project.image} alt={`${project.name} — ${project.category}`} loading="lazy" />
                <div className="project-glow"></div>
              </div>
              <div className="project-meta">
                <div className="project-number">{project.number}</div>
                <h3 className="project-title">{project.name}</h3>
                <div className="project-category">{project.category}</div>
                <p className="project-desc">{project.description}</p>
                <Link href={`/work/${project.id}`} className="project-link">VIEW CASE STUDY <span className="arrow">↗</span></Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="section" id="process">
        <div className="section-inner">
          <div className="section-label reveal">04 — PROCESS</div>
          <h2 className="section-heading reveal">From Idea<br /><em>to Experience.</em></h2>
          <div className="process-timeline">
            <div className="process-line-track"><div className="process-line-fill" ref={processLineRef}></div></div>
            {[
              { num: '01', name: 'Discover', text: 'Understanding your vision, goals, and audience to lay the foundation for a design that truly connects.' },
              { num: '02', name: 'Define', text: 'Crafting a strategic roadmap that aligns design decisions with your business objectives and user needs.' },
              { num: '03', name: 'Design', text: 'Bringing the strategy to life through carefully art-directed visual design that captivates and converts.' },
              { num: '04', name: 'Develop', text: 'Translating designs into pixel-perfect, responsive, and performant websites built for the real world.' },
              { num: '05', name: 'Deliver', text: 'Deploying your website with precision and providing ongoing support to ensure lasting success.' },
            ].map((step) => (
              <div key={step.num} className="process-step" data-step={step.num}>
                <div className="process-dot"></div>
                <div className="process-step-content">
                  <div className="process-number">{step.num}</div>
                  <h3 className="process-name">{step.name}</h3>
                  <p className="process-text">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact" id="contact">
        <div className="contact-inner">
          <h2 className="contact-heading reveal">Let&apos;s Make<br />Something<br /><em>Beautiful.</em></h2>
          <div className="contact-cta-group reveal">
            <a href="#" className="btn-primary btn-large" data-cursor="START ↗" onClick={(e) => { e.preventDefault(); openInquiry(); }}>START A PROJECT <span className="arrow">↗</span></a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost">CHAT ON WHATSAPP <span className="arrow">↗</span></a>
          </div>
          <div className="contact-info reveal">
            <div className="contact-method"><div className="contact-method-label">EMAIL</div><a href="mailto:workwithshiromani@gmail.com">workwithshiromani@gmail.com</a></div>
            <div className="contact-method"><div className="contact-method-label">PHONE</div><a href="tel:+919140588807">+91 9140588807</a></div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand-col">
            <a href="#hero" className="footer-brand" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>RISHA<sup>®</sup></a>
            <div className="footer-brand-sub">WEB DESIGNER</div>
          </div>
          <ul className="footer-links">
            <li><a href="#work" onClick={(e) => { e.preventDefault(); scrollTo('work'); }}>WORK</a></li>
            <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollTo('services'); }}>SERVICES</a></li>
            <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>ABOUT</a></li>
            <li><a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>CONTACT</a></li>
          </ul>
          <div className="footer-copy">© 2026 RISHA SINGH. ALL RIGHTS RESERVED.</div>
        </div>
      </footer>

      {/* WHATSAPP FLOAT */}
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="whatsapp-float" aria-label="Chat on WhatsApp">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true"><path d="M16.004 2.667A13.26 13.26 0 002.667 15.87a13.15 13.15 0 001.901 6.818L2.667 29.333l6.838-1.795a13.27 13.27 0 006.5 1.697h.006A13.27 13.27 0 0029.333 15.87 13.27 13.27 0 0016.004 2.667zm0 24.266a11 11 0 01-5.616-1.54l-.403-.24-4.178 1.096 1.115-4.073-.263-.418a10.93 10.93 0 01-1.684-5.888A11.01 11.01 0 0116.004 4.93a11.01 11.01 0 0111.029 10.94 11.01 11.01 0 01-11.03 11.063zm6.042-8.217c-.331-.166-1.96-.967-2.264-1.078-.304-.11-.526-.166-.748.166-.221.331-.858 1.078-1.052 1.3-.194.221-.388.249-.72.083-.331-.166-1.398-.515-2.664-1.642-.985-.877-1.65-1.96-1.843-2.291-.194-.331-.02-.51.145-.675.15-.148.331-.388.497-.582.166-.194.221-.331.331-.554.11-.221.055-.415-.028-.582-.083-.166-.748-1.804-1.025-2.47-.27-.649-.545-.56-.748-.571-.194-.01-.415-.012-.637-.012s-.582.083-.886.415c-.304.331-1.163 1.137-1.163 2.774s1.19 3.218 1.356 3.44c.166.221 2.342 3.574 5.675 5.012.793.342 1.412.547 1.894.7.796.253 1.521.217 2.094.131.639-.095 1.96-.802 2.236-1.577.276-.775.276-1.44.194-1.577-.083-.138-.304-.221-.637-.388z"/></svg>
      </a>

      {/* ============================================================
           INQUIRY MODAL
           ============================================================ */}
      <div className={`modal-overlay ${inquiryOpen ? 'active' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) setInquiryOpen(false); }}>
        <div className="inquiry-modal">
          <button className="modal-close" aria-label="Close inquiry" onClick={() => setInquiryOpen(false)}>
            <span className="modal-close-line"></span><span className="modal-close-line"></span>
          </button>

          {formState !== 'success' && (
            <div className="inquiry-form-wrap">
              <div className="inquiry-header">
                <div className="section-label">PROJECT INQUIRY</div>
                <h2 className="inquiry-title">Let&apos;s Build Something <em>Great.</em></h2>
                <p className="inquiry-subtitle">Tell me about your project and I&apos;ll get back to you.</p>
              </div>
              <form onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">01 — YOUR NAME</label>
                    <input type="text" className={`form-input ${formErrors.name ? 'error' : ''}`} name="name" placeholder="Your full name" value={formData.name} onChange={handleFormChange} required />
                    {formErrors.name && <div className="form-error">{formErrors.name}</div>}
                  </div>
                  <div className="form-group">
                    <label className="form-label">02 — EMAIL ADDRESS</label>
                    <input type="email" className={`form-input ${formErrors.email ? 'error' : ''}`} name="email" placeholder="you@example.com" value={formData.email} onChange={handleFormChange} required />
                    {formErrors.email && <div className="form-error">{formErrors.email}</div>}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">03 — WHATSAPP / PHONE</label>
                    <input type="tel" className="form-input" name="whatsapp" placeholder="+91 XXXXX XXXXX" value={formData.whatsapp} onChange={handleFormChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">04 — SERVICE NEEDED</label>
                    <select className={`form-select ${formErrors.service ? 'error' : ''}`} name="service" value={formData.service} onChange={handleFormChange} required>
                      <option value="" disabled>Select a service</option>
                      <option value="Website Design">Website Design</option>
                      <option value="Landing Page">Landing Page</option>
                      <option value="Business Website">Business Website</option>
                      <option value="E-Commerce">E-Commerce</option>
                      <option value="UI/UX">UI/UX</option>
                      <option value="Website Redesign">Website Redesign</option>
                      <option value="Other">Other</option>
                    </select>
                    {formErrors.service && <div className="form-error">{formErrors.service}</div>}
                  </div>
                </div>
                <div className="form-group" style={{ marginTop: 24 }}>
                  <label className="form-label">05 — PROJECT DETAILS</label>
                  <textarea className={`form-textarea ${formErrors.details ? 'error' : ''}`} name="details" placeholder="Tell me about your project, goals, and timeline..." rows="4" value={formData.details} onChange={handleFormChange}></textarea>
                  {formErrors.details && <div className="form-error">{formErrors.details}</div>}
                </div>
                <div className="form-row" style={{ marginTop: 24 }}>
                  <div className="form-group">
                    <label className="form-label">06 — BUDGET RANGE</label>
                    <select className="form-select" name="budget" value={formData.budget} onChange={handleFormChange}>
                      <option value="" disabled>Select your estimated investment</option>
                      <option value="$100 – $250">$100 – $250</option>
                      <option value="$250 – $500">$250 – $500</option>
                      <option value="$500 – $1,000">$500 – $1,000</option>
                      <option value="$1,000 – $2,500">$1,000 – $2,500</option>
                      <option value="$2,500 – $5,000">$2,500 – $5,000</option>
                      <option value="$5,000+">$5,000+</option>
                      <option value="Let's discuss">Not sure yet — Let&apos;s discuss</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">07 — TIMELINE</label>
                    <select className="form-select" name="timeline" value={formData.timeline} onChange={handleFormChange}>
                      <option value="" disabled>Select your timeline</option>
                      <option value="ASAP">ASAP</option>
                      <option value="1–2 weeks">1–2 weeks</option>
                      <option value="2–4 weeks">2–4 weeks</option>
                      <option value="1–2 months">1–2 months</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className={`btn-primary btn-full ${formState === 'submitting' ? 'form-submit-loading' : ''}`} style={{ marginTop: 32 }} disabled={formState === 'submitting'}>
                  {formState === 'submitting' ? 'SENDING...' : 'SEND PROJECT INQUIRY'} <span className="arrow">↗</span>
                </button>
                {formState === 'error' && (
                  <div style={{ textAlign: 'center', marginTop: 24 }}>
                    <p style={{ fontFamily: 'var(--sans)', fontSize: 14, color: '#f87171', marginBottom: 16 }}>Something went wrong. Please try again or contact me directly on WhatsApp.</p>
                    <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                      <button type="button" className="btn-ghost" onClick={() => setFormState('idle')}>TRY AGAIN <span className="arrow">↗</span></button>
                      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost">CHAT ON WHATSAPP <span className="arrow">↗</span></a>
                    </div>
                  </div>
                )}
              </form>
            </div>
          )}

          {formState === 'success' && (
            <div className="inquiry-success active">
              <h2 className="success-title">Thank <em>You.</em></h2>
              <p className="success-text">Your project inquiry has been received.<br />I&apos;ll get back to you as soon as possible.</p>
              <div className="success-actions">
                <button className="btn-primary" onClick={() => { setInquiryOpen(false); setFormState('idle'); }}>BACK TO HOME</button>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost">CHAT ON WHATSAPP <span className="arrow">↗</span></a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ============================================================
           SERVICE DRAWER
           ============================================================ */}
      <div className={`modal-overlay ${serviceDrawerOpen ? 'active' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) { setServiceDrawerOpen(false); setActiveService(null); } }}></div>
      <div className={`service-drawer ${serviceDrawerOpen ? 'active' : ''}`}>
        <button className="modal-close" aria-label="Close service details" onClick={() => { setServiceDrawerOpen(false); setActiveService(null); }}>
          <span className="modal-close-line"></span><span className="modal-close-line"></span>
        </button>
        {activeService && (
          <div className="service-drawer-scroll">
            <div className="service-drawer-number">{activeService.number} — SERVICE</div>
            <h2 className="service-drawer-title">{activeService.name}</h2>
            <p className="service-drawer-desc">{activeService.description}</p>
            <div className="service-drawer-section">
              <div className="service-drawer-section-label">WHAT&apos;S INCLUDED</div>
              <ul className="service-drawer-list">
                {activeService.includes.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
            <div className="service-drawer-section">
              <div className="service-drawer-section-label">BEST FOR</div>
              <div className="service-drawer-best"><em>{activeService.bestFor}</em></div>
            </div>
            <div className="service-drawer-ctas">
              <a href="#" className="btn-primary" onClick={(e) => { e.preventDefault(); setServiceDrawerOpen(false); setActiveService(null); setTimeout(openInquiry, 350); }}>{activeService.cta} <span className="arrow">↗</span></a>
              <Link href={`/services/${activeService.id}`} className="btn-ghost">VIEW FULL DETAILS <span className="arrow">↗</span></Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost">CHAT ON WHATSAPP <span className="arrow">↗</span></a>
            </div>
          </div>
        )}
      </div>

      {/* ============================================================
           PROJECT DETAIL MODAL
           ============================================================ */}
      <div className={`modal-overlay project-detail-overlay ${projectModalOpen ? 'active' : ''}`} ref={projectOverlayRef} onClick={(e) => { if (e.target === e.currentTarget) setProjectModalOpen(false); }}>
        {activeProject && (
          <div className="project-detail">
            <button className="modal-close" aria-label="Close project details" onClick={() => setProjectModalOpen(false)}>
              <span className="modal-close-line"></span><span className="modal-close-line"></span>
            </button>
            <div className="project-detail-header">
              <div className="project-detail-number">{activeProject.number}</div>
              <h2 className="project-detail-title">{activeProject.name}</h2>
              <div className="project-detail-category">{activeProject.category}</div>
            </div>
            <img className="project-detail-image" src={activeProject.image} alt={`${activeProject.name} — ${activeProject.category}`} />
            <div className="project-detail-grid">
              <div className="project-detail-section"><div className="project-detail-label">OVERVIEW</div><p className="project-detail-text">{activeProject.overview}</p></div>
              <div className="project-detail-section"><div className="project-detail-label">ROLE</div><p className="project-detail-text">{activeProject.role}</p></div>
              <div className="project-detail-section"><div className="project-detail-label">DESIGN APPROACH</div><p className="project-detail-text">{activeProject.approach}</p></div>
              <div className="project-detail-section"><div className="project-detail-label">TOOLS / TECHNOLOGY</div><p className="project-detail-text">{activeProject.tools}</p></div>
            </div>
            <div className="project-detail-ctas">
              <a href="#" className="btn-primary" onClick={(e) => { e.preventDefault(); setProjectModalOpen(false); setTimeout(openInquiry, 350); }}>START A PROJECT <span className="arrow">↗</span></a>
              <Link href={`/work/${activeProject.id}`} className="btn-ghost">VIEW FULL CASE STUDY <span className="arrow">↗</span></Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-ghost">CHAT ON WHATSAPP <span className="arrow">↗</span></a>
            </div>
            <div className="project-detail-nav">
              <a href="#" className={`project-nav-link ${activeProjectIndex <= 0 ? 'disabled' : ''}`} onClick={(e) => { e.preventDefault(); if (activeProjectIndex > 0) openProject(activeProjectIndex - 1); }}>
                <span className="arrow-left">←</span> PREVIOUS PROJECT
              </a>
              <a href="#work" className="project-nav-link project-nav-back" onClick={(e) => { e.preventDefault(); setProjectModalOpen(false); setTimeout(() => scrollTo('work'), 350); }}>
                BACK TO SELECTED WORK
              </a>
              <a href="#" className={`project-nav-link ${activeProjectIndex >= projects.length - 1 ? 'disabled' : ''}`} onClick={(e) => { e.preventDefault(); if (activeProjectIndex < projects.length - 1) openProject(activeProjectIndex + 1); }}>
                NEXT PROJECT <span className="arrow">→</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
