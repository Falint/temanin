'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import Logo from '@/components/shared/Logo';
import Icon from '@/components/shared/Icon';

const navLinks = [
  { href: '/', label: 'Beranda', icon: 'spark' },
  { href: '/tentang', label: 'Tentang', icon: 'people' },
  { href: '/edukasi', label: 'Edukasi', icon: 'book' },
  { href: '/games', label: 'Games', icon: 'game' },
  { href: '/kontak', label: 'Kontak', icon: 'chat' },
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

        <nav id="main-navigation" aria-label="Navigasi utama" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget) && event.relatedTarget !== menuButton.current) setIsOpen(false); }} onClick={() => setIsOpen(false)} className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href || (link.href !== '/' && pathname.startsWith(`${link.href}/`)) ? 'page' : undefined}
              className={`${styles.navItem} ${pathname === link.href || (link.href !== '/' && pathname.startsWith(`${link.href}/`)) ? styles.navItemActive : ''}`}
            >
              <Icon name={link.icon} size={15} />{link.label}
            </Link>
          ))}
          <Link href="/curhat" aria-current={pathname.startsWith('/curhat') ? 'page' : undefined} className={`btn btn-primary btn-sm ${styles.navCta}`}>
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
