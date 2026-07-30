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
          {/* --color-teal, not yet a semantic token - brand-color-in-context review is Phase 4 */}
          <div style={{ height: '100%', width: `${((idx + 1) / total) * 100}%`, background: 'var(--color-teal)', borderRadius: 3, transition: 'width 0.2s ease' }} />
        </div>
        <button
          type="button"
          className="carousel-shell-nav-btn"
          onClick={() => setIdx(i => Math.min(total - 1, i + 1))}
          style={{ padding: '0.35rem 0.9rem', borderRadius: '0.375rem', border: '2px solid var(--color-teal)', background: 'var(--color-teal)', color: 'white', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', visibility: idx === total - 1 ? 'hidden' : 'visible' }}
        >
          Next →
        </button>
      </div>
    </div>
  );
}
