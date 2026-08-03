import React from 'react';

// Part of the same fixed-dark band as SiteFooter (see src/theme/Footer/index.tsx, which
// renders them back to back). Per the brand design system, accent green is a 10%-rule
// color - it should not be a banner-wide fill. It appears only on the "get in touch" link.
const bannerStyle: React.CSSProperties = {
  background: 'var(--hh-inverse-surface)',
  color: 'var(--hh-text-inverse)',
  padding: '0.75rem 1.5rem',
  textAlign: 'center',
  fontFamily: 'var(--font-display)',
  fontSize: '0.95rem',
  fontWeight: 600,
};

const linkStyle: React.CSSProperties = {
  color: 'var(--hh-accent-inverse)',
  textDecoration: 'underline',
  fontWeight: 700,
};

export default function CtaBanner() {
  return (
    <div style={bannerStyle}>
      Questions, feedback, or ideas for the Playbook? Want to collaborate? {' '} Please {' '}
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSeiqcyjZCjhqbZzRbARe2NHfaS9PMqnjmEyYtmO23frYgmfXg/viewform"
        target="_blank"
        rel="noopener noreferrer"
        style={linkStyle}
      >
        get in touch
      </a>
      {' '}— we'd love to hear from you!
    </div>
  );
}
