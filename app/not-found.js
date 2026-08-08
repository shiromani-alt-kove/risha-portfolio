'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="not-found">
      <div className="not-found-label">404 — PAGE NOT FOUND</div>
      <h1 className="not-found-title">Lost in the Interface.</h1>
      <p className="not-found-text">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="btn-primary">BACK HOME <span className="arrow">↗</span></Link>
    </main>
  );
}
