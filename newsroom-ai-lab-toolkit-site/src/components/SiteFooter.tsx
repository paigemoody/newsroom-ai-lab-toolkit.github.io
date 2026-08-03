import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';

const footerStyle: React.CSSProperties = {
  padding: '2rem 1.5rem',
  backgroundColor: 'var(--hh-inverse-surface)',
  color: 'color-mix(in oklch, var(--hh-text-inverse) 70%, transparent)',
  fontFamily: 'var(--font-ui)',
};


export default function SiteFooter() {
  const sponsorLogo = useBaseUrl('/img/sponsor-mcgovern.png');
  return (
    <footer style={footerStyle}>
      <style>{`
        /* --hh-accent-inverse, not --hh-accent - this link sits on the fixed-dark
           footer band, and --hh-accent alone doesn't clear 4.5:1 against it in light
           mode (verified via axe-core: 3.33:1). See the --hh-accent-inverse definition
           in custom.css for why the fixed-dark band needs its own accent token. */
        .site-footer-credit-link {
          color: var(--hh-accent-inverse);
          text-decoration: none;
          transition: color 0.2s;
        }
        .site-footer-credit-link:hover, .site-footer-credit-link:focus-visible {
          color: var(--hh-text-inverse);
        }
        .site-footer-credit-link:focus-visible {
          outline: 2px solid var(--hh-focus-ring);
          outline-offset: 2px;
        }
      `}</style>
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
          Copyright © {new Date().getFullYear()} <a href="https://www.hackshackers.com/" className="site-footer-credit-link">Hacks/Hackers</a>
        </p>
      </div>
    </footer>
  );
}
