import React from 'react';

const bannerStyle: React.CSSProperties = {
  background: 'var(--hh-accent)',
  color: 'var(--hh-text-on-accent)',
  padding: '0.75rem 1.5rem',
  textAlign: 'center',
  fontFamily: 'var(--font-display)',
  fontSize: '0.95rem',
  fontWeight: 600,
};

const linkStyle: React.CSSProperties = {
  color: 'inherit',
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
