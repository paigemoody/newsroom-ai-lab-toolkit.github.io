import React, { useState } from 'react';

interface CarouselShellProps<T> {
  items: T[];
  renderCard: (item: T, idx: number) => React.ReactNode;
}

export default function CarouselShell<T>({ items, renderCard }: CarouselShellProps<T>) {
  const [idx, setIdx] = useState(0);
  if (!items?.length) return null;
  const total = items.length;

  return (
    <div style={{ border: '2px solid var(--hh-border)', borderRadius: '0.75rem', overflow: 'hidden', margin: '1.5rem 0' }}>
      <style>{`
        .carousel-shell-nav-btn:focus-visible {
          outline: 2px solid var(--hh-focus-ring);
          outline-offset: 2px;
        }
        /* Accent is a 10%-rule brand color, not a default button fill - ink by default,
           accent only on hover/focus (brand design system usage discipline). */
        .carousel-shell-next-btn {
          border-color: var(--hh-text-strong);
          background: var(--hh-text-strong);
          color: var(--hh-bg-page);
        }
        .carousel-shell-next-btn:hover, .carousel-shell-next-btn:focus-visible {
          border-color: var(--hh-accent);
          background: var(--hh-accent);
          color: var(--hh-text-on-accent);
        }
      `}</style>
      <div style={{ padding: '1.5rem', display: 'grid' }}>
        {items.map((item, i) => (
          <div key={i} style={{ gridColumn: 1, gridRow: 1, visibility: i !== idx ? 'hidden' : undefined, pointerEvents: i === idx ? 'auto' : 'none' }}>
            {renderCard(item, i)}
          </div>
        ))}
      </div>
      <div style={{ borderTop: '2px solid var(--hh-border)', padding: '0.75rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--hh-surface-secondary)' }}>
        <button
          type="button"
          className="carousel-shell-nav-btn"
          onClick={() => setIdx(i => Math.max(0, i - 1))}
          style={{ padding: '0.35rem 0.9rem', borderRadius: '0.375rem', border: '2px solid var(--hh-border)', background: 'var(--hh-surface-primary)', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', visibility: idx === 0 ? 'hidden' : 'visible' }}
        >
          ← Prev
        </button>
        <div style={{ flex: 1, margin: '0 1rem', height: 6, background: 'var(--hh-border)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${((idx + 1) / total) * 100}%`, background: 'var(--hh-accent)', borderRadius: 3, transition: 'width 0.2s ease' }} />
        </div>
        <button
          type="button"
          className="carousel-shell-nav-btn carousel-shell-next-btn"
          onClick={() => setIdx(i => Math.min(total - 1, i + 1))}
          style={{ padding: '0.35rem 0.9rem', borderRadius: '0.375rem', borderWidth: '2px', borderStyle: 'solid', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', visibility: idx === total - 1 ? 'hidden' : 'visible' }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
