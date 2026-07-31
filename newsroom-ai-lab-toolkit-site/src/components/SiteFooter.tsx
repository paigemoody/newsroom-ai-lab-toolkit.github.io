import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

const footerStyle: React.CSSProperties = {
  padding: '2rem 1.5rem',
  backgroundColor: 'var(--hh-inverse-surface)',
  color: 'color-mix(in oklch, var(--hh-text-inverse) 70%, transparent)',
  fontFamily: 'var(--font-ui)',
};


const accentLinkStyle: React.CSSProperties = {
  color: 'var(--hh-accent)',
  textDecoration: 'none',
  transition: 'color 0.2s',
};


export default function SiteFooter() {
  const sponsorLogo = useBaseUrl('/img/sponsor-mcgovern.png');
  return (
    <footer style={footerStyle}>
      <div style={{ maxWidth: '64rem', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'color-mix(in oklch, var(--hh-text-inverse) 45%, transparent)', display: 'block', marginBottom: '1rem' }}>
            Supported by
          </span>
          <a href="https://www.mcgovern.org" target="_blank" rel="noopener noreferrer">
            <img src={sponsorLogo} alt="McGovern Foundation" style={{ height: '4rem', width: 'auto', objectFit: 'contain', opacity: 0.9, filter: 'brightness(0) invert(1)' }} />
          </a>
        </div>
        <p style={{ marginTop: '1.5rem', fontSize: '0.875rem' }}>
          Copyright © {new Date().getFullYear()} <a href="https://www.hackshackers.com/" style={accentLinkStyle} onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--hh-text-inverse)'; }} onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--hh-accent)'; }}>Hacks/Hackers</a>
        </p>
      </div>
    </footer>
  );
}
