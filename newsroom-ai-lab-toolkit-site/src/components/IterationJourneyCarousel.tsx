import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import CarouselShell from './CarouselShell';
import ProblemStatement, { Statement } from './ProblemStatement';

export interface JourneyStep {
  image?: string;
  imageAlt?: string;
  emoji?: string;
  label: string;
  body?: string;
  statement?: Statement;
  feedback?: string;
}

function JourneyCard({ item }: { item: JourneyStep }) {
  const imageSrc = useBaseUrl(item.image ?? '');
  return (
    <div>
      {item.image && (
        // These diagrams are drawn on a white canvas with no dark-mode variant - framed
        // in a fixed light "mat" so they read as intentional rather than a broken white
        // rectangle on a dark page (background alone doesn't help once objectFit:contain
        // is filled edge-to-edge by the diagram's own opaque white pixels).
        <div style={{ background: 'var(--hh-image-frame-bg)', border: '1px solid var(--hh-border)', borderRadius: '0.5rem', padding: '0.75rem', marginBottom: '1rem' }}>
          <img
            src={imageSrc}
            alt={item.imageAlt ?? item.label}
            style={{ display: 'block', width: '100%', maxHeight: 220, objectFit: 'contain' }}
          />
        </div>
      )}
      {item.emoji && !item.image && (
        <div style={{ fontSize: 56, textAlign: 'center', marginBottom: '0.75rem' }}>{item.emoji}</div>
      )}
      <h3 style={{ marginTop: 0, marginBottom: '0.5rem', fontSize: '1.1rem', fontFamily: 'var(--font-ui)' }}>{item.label}</h3>
      {(item.statement || item.body) && (
        <div style={{ margin: item.feedback ? '0 0 1rem' : 0 }}>
          {item.statement ? (
            <ProblemStatement {...item.statement} />
          ) : (
            <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--hh-text-primary)' }}>{item.body}</p>
          )}
        </div>
      )}
      {item.feedback && (
        <div style={{ background: 'var(--hh-surface-secondary)', border: '1px solid var(--hh-border)', borderRadius: '0.5rem', padding: '0.75rem 1rem', fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--hh-text-primary)' }}>
          <strong>💬 Feedback:</strong> <em>{item.feedback}</em>
        </div>
      )}
    </div>
  );
}

export default function IterationJourneyCarousel({ items }: { items: JourneyStep[] }) {
  return <CarouselShell items={items} renderCard={(item) => <JourneyCard item={item} />} />;
}
