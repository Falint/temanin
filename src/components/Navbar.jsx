'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import Logo from '@/components/shared/Logo';

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/tentang', label: 'Tentang' },
  { href: '/edukasi', label: 'Edukasi' },
  { href: '/games', label: 'Games' },
  { href: '/kontak', label: 'Kontak' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuButton = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    document.querySelector('#main-navigation a')?.focus();
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.nav}`}>
        <Link href="/" className={styles.logo}>
          <Logo size={44} className={styles.logoIcon} />
          <span className={styles.logoText}>
            TEMAN<span className={styles.logoAccent}>IN</span>
          </span>
        </Link>

        <nav id="main-navigation" aria-label="Navigasi utama" onClick={() => setIsOpen(false)} className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href || (link.href !== '/' && pathname.startsWith(`${link.href}/`)) ? 'page' : undefined}
              className={`${styles.navItem} ${pathname === link.href || (link.href !== '/' && pathname.startsWith(`${link.href}/`)) ? styles.navItemActive : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/curhat" className={`btn btn-primary btn-sm ${styles.navCta}`}>
            Curhat Sekarang
          </Link>
        </nav>

        <button
          ref={menuButton}
          aria-controls="main-navigation"
          className={styles.mobileMenuBtn}
          onClick={toggleMenu}
          aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={isOpen}
        >
          <span className={`${styles.hamburger} ${isOpen ? styles.hamburgerOpen : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {/* Mobile overlay */}
      {isOpen && <div className={styles.overlay} onClick={() => setIsOpen(false)} aria-hidden="true" />}
    </header>
  );
}
