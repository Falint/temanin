'use client';

import { useEffect, useState } from 'react';
import styles from './UnavailableNotice.module.css';

function isUsableUrl(href) {
  return Boolean(href && href !== '#' && !href.includes('t.me/example'));
}

export default function UnavailableNotice({ href, className, children, title, message }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;
    const closeOnEscape = (event) => event.key === 'Escape' && setIsOpen(false);
    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  if (isUsableUrl(href)) {
    return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>;
  }

  return <>
    <button type="button" className={className} onClick={() => setIsOpen(true)}>{children}</button>
    {isOpen && <div className={styles.backdrop} role="presentation" onMouseDown={() => setIsOpen(false)}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="unavailable-title" onMouseDown={(event) => event.stopPropagation()}>
        <span className={styles.icon}>🛠️</span>
        <h2 id="unavailable-title">{title}</h2>
        <p>{message}</p>
        <button type="button" className="btn btn-primary" onClick={() => setIsOpen(false)}>Mengerti</button>
      </div>
    </div>}
  </>;
}
